"use client";

import * as React from "react";
import type { Column } from "@tanstack/react-table";
import { ChevronDown, ChevronRight } from "@trsys-tech/matrix-icons";
import { cn } from "../../lib/utils";
import { IconButton } from "../icon-botton/IconButton";
import { Checkbox } from "../checkbox/Checkbox";
import { getCellValue, setCellValue, toDateInputValue, parseDateInputValue } from "./dataTableModel";
import { dataTableInputClass } from "./dataTableStyles";
import type {
  DataTableApi,
  DataTableCellParams,
  DataTableColumnDef,
  DataTableContentProps,
  DataTableFeatures,
  DataTableInstance,
  DataTableRow,
} from "./DataTable.types";
import type { DataTableEditSession } from "./dataTableEditing";

type DataTableRowViewProps<T extends object> = Pick<
  DataTableContentProps<T>,
  "rowSelection" | "getRowClass" | "rowClassRules" | "onRowClick" | "suppressClickEdit" | "renderSubComponent"
> & {
  data: T;
  rowId: string;
  index: number;
  row?: DataTableRow<T>;
  pinned?: "top" | "bottom";
  edit: DataTableEditSession<T> | null;
  editRef: React.MutableRefObject<DataTableEditSession<T> | null>;
  updateEdit: (next: DataTableEditSession<T> | null) => void;
  api: DataTableApi<T>;
  table: DataTableInstance<T>;
  detailId: string;
  displayedIndices: Map<string, number>;
  rowHeight: number;
  totalWidth: number;
  showExpanders: boolean;
  expanderWidth: number;
  showCheckboxes: boolean;
  visibleColumns: Column<DataTableFeatures, T>[];
  definitionsById: Map<string, DataTableColumnDef<T>>;
  activeCell: { rowId?: string; columnId?: string };
  setFocusedCell: React.Dispatch<React.SetStateAction<{ rowId: string; columnId: string } | null>>;
  columnStyle: (column: Column<DataTableFeatures, T>, header?: boolean) => React.CSSProperties;
  handleCellKeyDown: (event: React.KeyboardEvent, row: DataTableRow<T>, column: Column<DataTableFeatures, T>) => void;
  editType: "cell" | "fullRow";
  isDetailExpanded: (row: DataTableRow<T>) => boolean;
};

export function DataTableRowView<T extends object>({ data, rowId, index, row, pinned, ...view }: DataTableRowViewProps<T>) {
  const {
    edit,
    editRef,
    updateEdit,
    api,
    table,
    detailId,
    displayedIndices,
    rowSelection,
    rowHeight,
    totalWidth,
    getRowClass,
    rowClassRules,
    onRowClick,
    showExpanders,
    expanderWidth,
    showCheckboxes,
    visibleColumns,
    definitionsById,
    activeCell,
    setFocusedCell,
    columnStyle,
    handleCellKeyDown,
    suppressClickEdit,
    editType,
    renderSubComponent,
    isDetailExpanded,
  } = view;
  const editing = edit?.rowId === rowId;
  const selected = row?.getIsSelected() ?? false;
  const expanded = !!row && isDetailExpanded(row);
  const panelId = `${detailId}-${rowId}`;
  return (
    <React.Fragment key={rowId}>
      <div
        role="row"
        aria-rowindex={(displayedIndices.get(rowId) ?? index) + 2}
        aria-selected={rowSelection && row ? selected : undefined}
        data-row-id={rowId}
        data-pinned={pinned}
        data-selected={selected || undefined}
        className={cn(
          "mtx-flex mtx-border-b mtx-border-gray-200 mtx-bg-gray-0 hover:mtx-bg-primary-25",
          selected && "mtx-bg-primary-50",
          pinned && "mtx-bg-gray-50",
          getRowClass?.(data),
          ...Object.entries(rowClassRules ?? {})
            .filter(([, test]) => test(data))
            .map(([name]) => name),
        )}
        style={{ height: rowHeight, width: totalWidth, minWidth: "100%" }}
        onClick={event => {
          const target = event.target as HTMLElement;
          const selectionCell = target.closest("[data-row-selection-cell]");
          if (target.closest("button,input,a,select,textarea,[data-row-action],[role=checkbox],[role=combobox]")) return;
          if (row && rowSelection?.enableClickSelection && row.getCanSelect()) {
            row.getToggleSelectedHandler()({
              target: { checked: selectionCell || event.ctrlKey || event.metaKey ? !selected : true },
              shiftKey: event.shiftKey,
              nativeEvent: event.nativeEvent,
            });
            if (!selectionCell && !event.ctrlKey && !event.metaKey && !event.shiftKey) table.setRowSelection({ [row.id]: true });
          }
          onRowClick?.({ data, rowId, event, api });
        }}
      >
        {showExpanders && (
          <div
            role="gridcell"
            data-row-expander-cell=""
            className="mtx-sticky mtx-start-0 mtx-z-10 mtx-flex mtx-shrink-0 mtx-items-center mtx-justify-center mtx-bg-inherit"
            style={{ width: expanderWidth }}
          >
            {row?.getCanExpand() && (
              <IconButton
                type="button"
                size="sm"
                aria-label={`${expanded ? "Collapse" : "Expand"} row ${rowId}`}
                aria-expanded={expanded}
                aria-controls={expanded ? panelId : undefined}
                onClick={row.getToggleExpandedHandler()}
              >
                {expanded ? <ChevronDown aria-hidden="true" /> : <ChevronRight aria-hidden="true" className="rtl:mtx-rotate-180" />}
              </IconButton>
            )}
          </div>
        )}
        {showCheckboxes && (
          <div
            role="gridcell"
            data-row-selection-cell=""
            className="mtx-sticky mtx-start-0 mtx-z-10 mtx-flex mtx-shrink-0 mtx-items-center mtx-justify-center mtx-bg-inherit"
            style={{ width: 44, insetInlineStart: expanderWidth }}
          >
            {row && (
              <Checkbox
                aria-label={`Select row ${rowId}`}
                checked={selected}
                disabled={!row.getCanSelect()}
                onClick={event =>
                  row.getToggleSelectedHandler()({ target: { checked: !selected }, shiftKey: event.shiftKey, nativeEvent: event.nativeEvent })
                }
              />
            )}
          </div>
        )}
        {visibleColumns.map((column, colIndex) => {
          const definition = definitionsById.get(column.id)!;
          const value = getCellValue(editing ? edit.draft : data, definition, index);
          const isEditing =
            !!editing &&
            (!edit.columnId || edit.columnId === column.id) &&
            (typeof definition.editable === "function" ? definition.editable(data) : definition.editable) &&
            (!!definition.field || !!definition.valueSetter);
          const params: DataTableCellParams<T> = {
            data,
            value,
            rowId,
            rowIndex: index,
            columnId: column.id,
            api,
            isEditing: !!editing,
            pinned,
          };
          // The definition and value were resolved together; erase the field only at this runtime dispatch boundary.
          const Renderer = definition.cellRenderer as React.ComponentType<DataTableCellParams<T>> | undefined;
          const Editor = definition.cellEditor && typeof definition.cellEditor !== "string" ? definition.cellEditor : undefined;
          const editorType =
            typeof definition.cellEditor === "string"
              ? definition.cellEditor
              : definition.cellDataType === "number"
                ? "number"
                : definition.cellDataType === "date"
                  ? "date"
                  : "text";
          const coerceNumber = definition.cellEditor === "number" || definition.cellDataType === "number";
          const parseDate = editorType === "date" || (!coerceNumber && value instanceof Date);
          const setValue = (newValue: unknown) => {
            const session = editRef.current;
            if (!session) return;
            try {
              const parsed = definition.valueParser
                ? definition.valueParser({ data: session.draft, oldValue: getCellValue(session.original, definition, index), newValue })
                : newValue;
              const draft = setCellValue(session.draft, definition, parsed);
              const parseErrors = { ...session.parseErrors };
              delete parseErrors[column.id];
              updateEdit({
                ...session,
                draft,
                changes: { ...session.changes, [column.id]: parsed },
                parseErrors,
                errors: Object.values(parseErrors),
              });
            } catch (error) {
              const parseErrors = { ...session.parseErrors, [column.id]: error instanceof Error ? error.message : "Invalid value" };
              updateEdit({ ...session, parseErrors, errors: Object.values(parseErrors) });
            }
          };
          return (
            <div
              key={column.id}
              role="gridcell"
              tabIndex={activeCell.rowId === rowId && activeCell.columnId === column.id ? 0 : -1}
              aria-colindex={colIndex + 1 + (showCheckboxes ? 1 : 0) + (showExpanders ? 1 : 0)}
              data-column-id={column.id}
              data-row-id={rowId}
              data-editing={isEditing || undefined}
              data-row-action={definition.suppressRowClick || column.id === "actions" || column.id === "action" ? "" : undefined}
              aria-readonly={!definition.editable || !row}
              aria-invalid={(isEditing && edit.errors.length > 0) || undefined}
              className={cn(
                "mtx-flex mtx-min-w-0 mtx-items-center mtx-overflow-hidden mtx-px-3 focus:mtx-outline-none focus:mtx-ring-1 focus:mtx-ring-inset focus:mtx-ring-primary",
                definition.align === "end" && "mtx-justify-end",
                definition.align === "center" && "mtx-justify-center",
                typeof definition.cellClass === "function" ? definition.cellClass(params) : definition.cellClass,
              )}
              style={columnStyle(column)}
              onFocus={() =>
                setFocusedCell(previous => (previous?.rowId === rowId && previous.columnId === column.id ? previous : { rowId, columnId: column.id }))
              }
              onKeyDown={event => {
                definition.onKeyDown?.(event, params);
                if (row) handleCellKeyDown(event, row, column);
              }}
              onDoubleClick={event => {
                if (row && !suppressClickEdit && !(event.target as HTMLElement).closest("button,a,input,select,[data-row-action]")) {
                  if (editType === "fullRow") api.startEditingRow(rowId);
                  else api.startEditingCell({ rowId, columnId: column.id });
                }
              }}
            >
              {isEditing ? (
                Editor ? (
                  <Editor
                    {...params}
                    errors={edit.errors}
                    onValueChange={setValue}
                    commit={() => api.stopEditing()}
                    cancel={() => api.stopEditing(true)}
                  />
                ) : (
                  <input
                    aria-label={`Edit ${typeof definition.headerName === "string" ? definition.headerName : column.id}`}
                    className={dataTableInputClass}
                    type={editorType}
                    value={parseDate ? toDateInputValue(value) : value === null || value === undefined ? "" : String(value)}
                    onChange={event =>
                      setValue(
                        coerceNumber
                          ? event.target.value === ""
                            ? null
                            : Number(event.target.value)
                          : parseDate
                            ? parseDateInputValue(event.target.value, value, definition.cellDataType)
                            : event.target.value,
                      )
                    }
                  />
                )
              ) : Renderer ? (
                <Renderer {...params} />
              ) : definition.valueFormatter ? (
                definition.valueFormatter({ data, value })
              ) : (
                <span className="mtx-truncate">{value instanceof Date ? value.toLocaleDateString() : String(value ?? "")}</span>
              )}
            </div>
          );
        })}
      </div>
      {expanded && row && (
        <div
          role="row"
          aria-rowindex={(displayedIndices.get(rowId) ?? index) + 3}
          data-expanded-row-id={rowId}
          className="mtx-border-b mtx-border-gray-200 mtx-bg-gray-50"
          style={{ width: totalWidth, minWidth: "100%" }}
        >
          <div
            role="gridcell"
            id={panelId}
            aria-colspan={visibleColumns.length + (showCheckboxes ? 1 : 0) + (showExpanders ? 1 : 0)}
            className="mtx-p-4"
          >
            {renderSubComponent?.({ row, api })}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
