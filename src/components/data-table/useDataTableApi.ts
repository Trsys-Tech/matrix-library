import * as React from "react";
import type { Virtualizer } from "@tanstack/react-virtual";
import { getCellValue, getColumnId } from "./dataTableModel";
import { printDataTable } from "./dataTablePrint";
import type { DataTableApi, DataTableColumn, DataTableContentProps, DataTableEditEvent, DataTableInstance, DataTableRow } from "./DataTable.types";
import type { DataTableEditSession } from "./dataTableEditing";

export type DataTableRuntime<T extends object> = {
  table: DataTableInstance<T>;
  definitionsById: Map<string, DataTableColumn<T>>;
  centerRows: DataTableRow<T>[];
  virtualizer: Virtualizer<HTMLDivElement, Element>;
  resolveId: (data: T, index: number) => string;
  rowIndices: Map<T, number>;
  sourcesById: Map<string, T>;
  useVirtualRows: boolean;
  pagination: boolean;
  serverPagination: boolean;
};
type EditConfig<T extends object> = Pick<
  DataTableContentProps<T>,
  "columnDefs" | "validateRow" | "readOnlyEdit" | "onEditCommit" | "onEditRequest" | "onEditCancel"
>;
type DataTableApiOptions<T extends object> = {
  runtime: React.MutableRefObject<DataTableRuntime<T>>;
  editRef: React.MutableRefObject<DataTableEditSession<T> | null>;
  configRef: React.MutableRefObject<EditConfig<T>>;
  updateEdit: (next: DataTableEditSession<T> | null) => void;
  setPatches: React.Dispatch<React.SetStateAction<Record<string, { source: T; data: T }>>>;
  contentRef: React.RefObject<HTMLDivElement>;
  viewportRef: React.RefObject<HTMLDivElement>;
  setPrinting: React.Dispatch<React.SetStateAction<boolean>>;
};

/** Stable public API; methods read current rows, callbacks and layout through refs. */
export function useDataTableApi<T extends object>({
  runtime,
  editRef,
  configRef,
  updateEdit,
  setPatches,
  contentRef,
  viewportRef,
  setPrinting,
}: DataTableApiOptions<T>) {
  const printSessions = React.useRef(0);
  const printScroll = React.useRef({ top: 0, left: 0 });
  const api = React.useMemo<DataTableApi<T>>(() => {
    const getRow = (id: string | number) => runtime.current.table.getCoreRowModel().rowsById[String(id)];
    const stopEditing = (cancel = false): boolean => {
      const session = editRef.current;
      if (!session) return true;
      const config = configRef.current;
      const event: DataTableEditEvent<T> = { rowId: session.rowId, original: session.original, data: session.draft, changes: session.changes };
      if (cancel) {
        updateEdit(null);
        config.onEditCancel?.(event);
        return true;
      }
      const errors = [...Object.values(session.parseErrors), ...(config.validateRow?.(session.draft, session.original) ?? [])];
      for (const column of runtime.current.definitionsById.values()) {
        const editable = typeof column.editable === "function" ? column.editable(session.original) : column.editable;
        if (editable && (!session.columnId || session.columnId === getColumnId(column))) {
          errors.push(
            ...(column.validate?.(getCellValue(session.draft, column, runtime.current.rowIndices.get(session.original) ?? 0), session.draft) ?? []),
          );
        }
      }
      if (errors.length) {
        updateEdit({ ...session, errors });
        return false;
      }
      if (Object.keys(session.changes).length) {
        if (config.readOnlyEdit) config.onEditRequest?.(event);
        else {
          setPatches(previous => ({ ...previous, [session.rowId]: { source: session.source, data: session.draft } }));
          config.onEditCommit?.(event);
        }
      }
      updateEdit(null);
      return true;
    };
    const focusCell = (id: string | number, columnId: string) => {
      const rowId = String(id);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const cell = Array.from(contentRef.current?.querySelectorAll<HTMLElement>("[data-row-id][data-column-id]") ?? []).find(
            element => element.dataset.rowId === rowId && element.dataset.columnId === columnId,
          );
          const control = Array.from(cell?.querySelectorAll<HTMLElement>("input,button,[tabindex='0']") ?? []).find(
            element =>
              !element.matches(":disabled, input[type='hidden']") && !element.closest("[hidden],[inert]") && element.getClientRects().length > 0,
          );
          (control ?? cell)?.focus();
        }),
      );
    };
    const scrollToRow = (id: string | number, align: "start" | "center" | "end" = "center") => {
      const rowId = String(id);
      const current = runtime.current;
      const allIndex = current.table.getPrePaginatedRowModel().rows.findIndex(row => row.id === rowId);
      if (allIndex >= 0 && current.pagination && !current.table.options.manualPagination) {
        current.table.setPageIndex(Math.floor(allIndex / current.table.atoms.pagination.get().pageSize));
      }
      requestAnimationFrame(() => {
        const latest = runtime.current;
        const index = latest.centerRows.findIndex(row => row.id === rowId);
        if (index >= 0 && latest.useVirtualRows) latest.virtualizer.scrollToIndex(index, { align });
        else
          Array.from(contentRef.current?.querySelectorAll<HTMLElement>("[role=row][data-row-id]") ?? [])
            .find(element => element.dataset.rowId === rowId)
            ?.scrollIntoView({ block: align, inline: "nearest" });
      });
    };
    const start = (id: string | number, columnId?: string) => {
      const rowId = String(id);
      if (!stopEditing()) return false;
      const row = getRow(rowId);
      if (!row) return false;
      const editable = Array.from(runtime.current.definitionsById.values()).filter(column => {
        return (
          runtime.current.table.getColumn(getColumnId(column))?.getIsVisible() &&
          (typeof column.editable === "function" ? column.editable(row.original) : column.editable) &&
          (!!column.field || !!column.valueSetter)
        );
      });
      const column = columnId ? editable.find(item => getColumnId(item) === columnId) : editable[0];
      if (!column) return false;
      updateEdit({
        rowId,
        columnId,
        source: runtime.current.sourcesById.get(rowId)!,
        original: row.original,
        draft: row.original,
        changes: {},
        parseErrors: {},
        errors: [],
      });
      scrollToRow(rowId);
      focusCell(rowId, getColumnId(column));
      return true;
    };
    const preparePrint = async () => {
      if (printSessions.current === 0) printScroll.current = { top: viewportRef.current?.scrollTop ?? 0, left: viewportRef.current?.scrollLeft ?? 0 };
      printSessions.current++;
      setPrinting(true);
      await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      let restored = false;
      return () => {
        if (restored) return;
        restored = true;
        printSessions.current--;
        if (printSessions.current > 0) return;
        setPrinting(false);
        requestAnimationFrame(() => {
          if (viewportRef.current) {
            viewportRef.current.scrollTop = printScroll.current.top;
            viewportRef.current.scrollLeft = printScroll.current.left;
          }
        });
      };
    };
    return {
      get table() {
        return runtime.current.table;
      },
      getSelectedRows: () => runtime.current.table.getSelectedRowModel().rows.map(row => row.original),
      setSelectedRowIds: ids => {
        const rows = ids.map(getRow).filter(row => row?.getCanSelect());
        const selected = runtime.current.table.options.enableMultiRowSelection === false ? rows.slice(0, 1) : rows;
        runtime.current.table.setRowSelection(Object.fromEntries(selected.map(row => [row.id, true])));
      },
      selectAll: (scope = "filtered") => {
        const current = runtime.current.table;
        const rows = (
          scope === "all" ? current.getCoreRowModel() : scope === "currentPage" ? current.getRowModel() : current.getFilteredRowModel()
        ).rows.filter(row => row.getCanSelect());
        const selected = Object.fromEntries(
          (current.options.enableMultiRowSelection === false ? rows.slice(0, 1) : rows).map(row => [row.id, true as const]),
        );
        current.setRowSelection(previous => (current.options.enableMultiRowSelection === false ? selected : { ...previous, ...selected }));
      },
      deselectAll: () => runtime.current.table.resetRowSelection(true),
      pinRows: (ids, position) => {
        const current = runtime.current.table;
        const rowIds = ids.map(String);
        current.setRowPinning(previous => ({
          top: [...(previous.top ?? []).filter(id => !rowIds.includes(id)), ...(position === "top" ? rowIds.filter(id => !!getRow(id)) : [])],
          bottom: [
            ...(previous.bottom ?? []).filter(id => !rowIds.includes(id)),
            ...(position === "bottom" ? rowIds.filter(id => !!getRow(id)) : []),
          ],
        }));
      },
      startEditingCell: ({ rowId, columnId }) => start(rowId, columnId),
      startEditingRow: rowId => start(rowId),
      stopEditing,
      focusCell,
      scrollToRow,
      preparePrint,
      print: async () => {
        const restore = await preparePrint();
        try {
          if (contentRef.current) await printDataTable(contentRef.current);
        } finally {
          restore();
        }
      },
    };
  }, [configRef, contentRef, editRef, runtime, setPatches, setPrinting, updateEdit, viewportRef]);
  return api;
}
