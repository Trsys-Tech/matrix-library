"use client";

import * as React from "react";
import type { Column } from "@tanstack/react-table";
import { Checkbox } from "../checkbox/Checkbox";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { DataTableColumnMenu } from "./DataTableColumnMenu";
import type { DataTableApi, DataTableColumnDef, DataTableContentProps, DataTableFeatures, DataTableInstance, DataTableRow } from "./DataTable.types";

type DataTableHeaderProps<T extends object> = Pick<DataTableContentProps<T>, "rowSelection"> & {
  table: DataTableInstance<T>;
  api: DataTableApi<T>;
  headerHeight: number;
  totalWidth: number;
  isPrinting: boolean;
  showExpanders: boolean;
  expanderWidth: number;
  showCheckboxes: boolean;
  selectionRows: DataTableRow<T>[];
  selectedInScope: number;
  visibleColumns: Column<DataTableFeatures, T>[];
  definitionsById: Map<string, DataTableColumnDef<T>>;
  columnStyle: (column: Column<DataTableFeatures, T>, header?: boolean) => React.CSSProperties;
  widths: Map<string, number>;
};

export function DataTableHeader<T extends object>({
  table,
  api,
  headerHeight,
  totalWidth,
  isPrinting,
  showExpanders,
  expanderWidth,
  showCheckboxes,
  rowSelection,
  selectionRows,
  selectedInScope,
  visibleColumns,
  definitionsById,
  columnStyle,
  widths,
}: DataTableHeaderProps<T>) {
  return (
    <div
      role="row"
      className="mtx-sticky mtx-top-0 mtx-z-30 mtx-flex mtx-rounded-t-[inherit] mtx-border-b mtx-border-gray-200 mtx-bg-primary-50 mtx-font-bold"
      style={{ height: headerHeight, width: totalWidth, minWidth: "100%", position: isPrinting ? "relative" : "sticky" }}
    >
      {showExpanders && (
        <div
          role="columnheader"
          aria-label="Row details"
          className="mtx-sticky mtx-start-0 mtx-z-10 mtx-shrink-0 mtx-bg-primary-50"
          style={{ width: expanderWidth }}
        />
      )}
      {showCheckboxes && (
        <div
          role="columnheader"
          className="mtx-sticky mtx-start-0 mtx-z-10 mtx-flex mtx-shrink-0 mtx-items-center mtx-justify-center mtx-bg-primary-50"
          style={{ width: 44, insetInlineStart: expanderWidth }}
        >
          {rowSelection?.mode === "multiRow" && (
            <Checkbox
              aria-label="Select all rows"
              disabled={!selectionRows.length}
              checked={selectionRows.length > 0 && selectedInScope === selectionRows.length ? true : selectedInScope > 0 ? "indeterminate" : false}
              onCheckedChange={checked => {
                if (checked === true) api.selectAll(rowSelection.selectAll);
                else
                  table.setRowSelection(previous =>
                    Object.fromEntries(Object.entries(previous).filter(([id]) => !selectionRows.some(row => row.id === id))),
                  );
              }}
            />
          )}
        </div>
      )}
      {visibleColumns.map(column => {
        const definition = definitionsById.get(column.id)!;
        const header = table.getFlatHeaders().find(item => item.column.id === column.id)!;
        const sorted = column.getIsSorted();
        return (
          <DataTableColumnHeader
            key={column.id}
            columnId={column.id}
            label={typeof definition.headerName === "string" ? definition.headerName : column.id}
            region={column.getIsPinned()}
            disabled={isPrinting}
            aria-sort={sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : "none"}
            className="mtx-relative mtx-flex mtx-min-w-0 mtx-items-center mtx-gap-1 mtx-px-3"
            style={columnStyle(column, true)}
          >
            <button
              type="button"
              data-column-sort=""
              disabled={isPrinting}
              aria-disabled={!column.getCanSort() || undefined}
              onClick={event => {
                if (!event.defaultPrevented && column.getCanSort()) column.getToggleSortingHandler()?.(event);
              }}
              className="mtx-flex mtx-min-w-0 mtx-flex-1 mtx-cursor-inherit mtx-items-center mtx-gap-1 mtx-text-start disabled:mtx-cursor-default"
              aria-label={`Sort ${typeof definition.headerName === "string" ? definition.headerName : column.id}`}
            >
              <span className="mtx-truncate">{definition.headerName ?? column.id}</span>
              {sorted && (
                <span aria-hidden="true">
                  {sorted === "asc" ? "↑" : "↓"}
                  {table.state.sorting.length > 1 ? column.getSortIndex() + 1 : ""}
                </span>
              )}
            </button>
            {!isPrinting && <DataTableColumnMenu table={table} column={column} definition={definition} />}
            {!isPrinting && column.getCanResize() && (
              <div
                role="separator"
                data-column-drag-ignore=""
                aria-label={`Resize ${column.id}`}
                aria-orientation="vertical"
                tabIndex={0}
                className="mtx-absolute mtx-inset-y-0 mtx-end-0 mtx-w-1 mtx-cursor-col-resize mtx-touch-none hover:mtx-bg-primary-300"
                onMouseDown={header.getResizeHandler()}
                onTouchStart={header.getResizeHandler()}
                onDoubleClick={() => column.resetSize()}
                onKeyDown={event => {
                  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                    event.preventDefault();
                    table.setColumnSizing(previous => ({
                      ...previous,
                      [column.id]: (widths.get(column.id) ?? column.getSize()) + (event.key === "ArrowRight" ? 10 : -10),
                    }));
                  }
                }}
              />
            )}
          </DataTableColumnHeader>
        );
      })}
    </div>
  );
}
