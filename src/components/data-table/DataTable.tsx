"use client";

import * as React from "react";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { functionalUpdate, useTable, type Column, type ColumnDef } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ChevronDown, ChevronRight, Filter } from "@trsys-tech/matrix-icons";

import { cn } from "../../lib/utils";
import { Button } from "../button/Button";
import { IconButton } from "../icon-botton/IconButton";
import { Checkbox } from "../checkbox/Checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/Popover";
import { DataTableAlignmentContext, DataTableContext, useDataTable } from "./DataTableContext";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { dataTableColumnSensors } from "./dataTableColumnDrag";
import { dataTableFeatures } from "./dataTableFeatures";
import {
  filterType,
  getActiveDataTableCell,
  getCellValue,
  getColumnId,
  getFlexSizes,
  matchesFilter,
  moveDataTableColumn,
  parseDateInputValue,
  setCellValue,
  toDateInputValue,
} from "./dataTableModel";
import { printDataTable } from "./dataTablePrint";
import type {
  DataTableApi,
  DataTableCellParams,
  DataTableColumn,
  DataTableContentProps,
  DataTableEditEvent,
  DataTableFeatures,
  DataTableFilter,
  DataTableFilterOperator,
  DataTableRow,
  DataTableInstance,
  DataTableState,
} from "./DataTable.types";

export type DataTableProps = React.HTMLAttributes<HTMLDivElement>;

const DataTable = React.forwardRef<HTMLDivElement, DataTableProps>(({ children, className, style, ...props }, ref) => {
  const [api, setApi] = React.useState<DataTableApi<any> | null>(null);
  const [search, setSearch] = React.useState<string>();
  const [counts, setCounts] = React.useState({ selectedCount: 0, pinnedCount: 0 });
  const value = React.useMemo(() => ({ api, setApi, search, setSearch, ...counts, setCounts }), [api, search, counts]);
  return (
    <DataTableContext.Provider value={value}>
      <div
        ref={ref}
        data-data-table=""
        className={cn(
          "mtx-flex mtx-h-full mtx-min-h-0 mtx-flex-col mtx-rounded-lg mtx-border mtx-border-gray-200 mtx-bg-gray-0 mtx-font-sans mtx-text-xs mtx-text-text",
          className,
        )}
        {...props}
        style={{ fontFamily: "DMSans, sans-serif", ...style }}
      >
        {children}
      </div>
    </DataTableContext.Provider>
  );
});
DataTable.displayName = "DataTable";

export type DataTableActionBarProps = React.HTMLAttributes<HTMLDivElement>;
const DataTableActionBar = React.forwardRef<HTMLDivElement, DataTableActionBarProps>(({ className, ...props }, ref) => {
  useDataTable();
  return (
    <div
      ref={ref}
      data-print-hidden=""
      className={cn(
        "mtx-flex mtx-min-h-12 mtx-shrink-0 mtx-items-center mtx-gap-1 mtx-rounded-t-lg mtx-border-b mtx-border-gray-200 mtx-p-2",
        className,
      )}
      {...props}
    />
  );
});
DataTableActionBar.displayName = "DataTableActionBar";

const emptyRows: never[] = [];
const emptyColumn: Record<string, never> = {};
type EditSession<T extends object> = {
  rowId: string;
  columnId?: string;
  source: T;
  original: T;
  draft: T;
  changes: Record<string, unknown>;
  parseErrors: Record<string, string>;
  errors: readonly string[];
};
const inputClass =
  "mtx-h-7 mtx-w-full mtx-rounded-sm mtx-border mtx-border-gray-300 mtx-bg-gray-0 mtx-px-2 mtx-text-xs focus:mtx-outline-none focus:mtx-ring-1 focus:mtx-ring-primary";

function DataTableContentInner<T extends object>(
  {
    rowData,
    columnDefs,
    defaultColDef = emptyColumn,
    getRowId,
    onReady,
    rowSelection,
    renderSubComponent,
    getRowCanExpand,
    onSelectionChanged,
    quickFilterText,
    onQuickFilterTextChange,
    externalFilter,
    loading = false,
    emptyContent = "No rows to display",
    loadingContent = "Loading…",
    rowHeight = 36,
    headerHeight = 40,
    getRowClass,
    rowClassRules,
    pinnedTopRowData = emptyRows,
    pinnedBottomRowData = emptyRows,
    pagination = false,
    paginationPageSize = 25,
    paginationPageSizeSelector = [10, 25, 50, 100],
    virtualize = true,
    overscan = 8,
    domLayout = "normal",
    suppressHorizontalScroll = false,
    editType = "cell",
    suppressClickEdit = false,
    readOnlyEdit = false,
    validateRow,
    onEditCommit,
    onEditRequest,
    onEditCancel,
    onRowClick,
    tableOptions,
    containerStyle,
    className,
    style,
    ...props
  }: DataTableContentProps<T>,
  forwardedRef: React.ForwardedRef<DataTableApi<T>>,
) {
  "use no memo";
  const { setApi, search, hasSearch, setSearch, setCounts } = useDataTable<T>();
  const alignment = React.useContext(DataTableAlignmentContext);
  const detailId = React.useId();
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = React.useState(0);
  const [printing, setPrinting] = React.useState(false);
  const [columnDrag, setColumnDrag] = React.useState<{ sourceId: string; targetId: string } | null>(null);
  const columnDragRef = React.useRef<{
    sourceId: string;
    targetId: string;
    scrollLeft: number;
    columns: { id: string; left: number; right: number }[];
  } | null>(null);
  const printSessions = React.useRef(0);
  const printScroll = React.useRef({ top: 0, left: 0 });
  const [focusedCell, setFocusedCell] = React.useState<{ rowId: string; columnId: string } | null>(null);
  const [patches, setPatches] = React.useState<Record<string, { source: T; data: T }>>({});
  const [edit, setEdit] = React.useState<EditSession<T> | null>(null);
  const [columnSizing, setColumnSizing] = React.useState<DataTableState["columnSizing"]>(tableOptions?.initialState?.columnSizing ?? {});
  const [columnVisibility, setColumnVisibility] = React.useState<DataTableState["columnVisibility"]>({});
  const [columnFilters, setColumnFilters] = React.useState<DataTableState["columnFilters"]>(tableOptions?.initialState?.columnFilters ?? []);
  const [initialSearch] = React.useState(() => tableOptions?.initialState?.globalFilter ?? "");
  const editRef = React.useRef(edit);
  const configRef = React.useRef({ columnDefs, validateRow, readOnlyEdit, onEditCommit, onEditRequest, onEditCancel });
  configRef.current = { columnDefs, validateRow, readOnlyEdit, onEditCommit, onEditRequest, onEditCancel };
  const updateEdit = React.useCallback((next: EditSession<T> | null) => {
    editRef.current = next;
    setEdit(next);
  }, []);
  const isPrinting = printing || domLayout === "print";
  const naturalHeight = isPrinting || domLayout === "autoHeight";
  const searchText = quickFilterText ?? tableOptions?.state?.globalFilter ?? (hasSearch ? search : initialSearch);
  const resolveId = React.useCallback(
    (data: T, index: number) => String(getRowId?.(data, index) ?? (data as { id?: unknown } | null)?.id ?? index),
    [getRowId],
  );
  const definitions = React.useMemo(() => {
    const result = columnDefs.map(column => ({ ...defaultColDef, ...column }));
    const ids = result.map(getColumnId);
    if (new Set(ids).size !== ids.length) throw new Error("DataTable column ids must be unique.");
    return result;
  }, [columnDefs, defaultColDef]);
  const definitionsById = React.useMemo(() => new Map(definitions.map(column => [getColumnId(column), column])), [definitions]);
  const sourcesById = React.useMemo(() => {
    const entries = (rowData ?? emptyRows).map((row, index) => [resolveId(row, index), row] as const);
    if (new Set(entries.map(([id]) => id)).size !== entries.length) throw new Error("DataTable row ids must be unique.");
    return new Map(entries);
  }, [rowData, resolveId]);
  const data = React.useMemo(
    () =>
      (rowData ?? emptyRows).map((row, index) => {
        const patch = patches[resolveId(row, index)];
        return patch?.source === row ? patch.data : row;
      }),
    [rowData, patches, resolveId],
  );
  // Keep original indices/ids through external filtering; index ids must not shift when a chip changes.
  const rowIndices = React.useMemo(() => new Map(data.map((row, index) => [row, index])), [data]);
  const initialState = React.useMemo(
    () => ({
      columnVisibility: Object.fromEntries(definitions.filter(column => column.hide).map(column => [getColumnId(column), false])),
      columnPinning: {
        start: definitions.filter(column => column.pinned === "left" || column.pinned === "start").map(getColumnId),
        end: definitions.filter(column => column.pinned === "right" || column.pinned === "end").map(getColumnId),
      },
      pagination: { pageIndex: 0, pageSize: paginationPageSize },
      ...tableOptions?.initialState,
    }),
    [definitions, paginationPageSize, tableOptions?.initialState],
  );

  const effectiveFilters = React.useMemo(
    () => [
      ...(tableOptions?.state?.columnFilters ?? columnFilters).filter(filter => filter.id !== "__external"),
      ...(externalFilter ? [{ id: "__external", value: externalFilter }] : []),
    ],
    [tableOptions?.state?.columnFilters, columnFilters, externalFilter],
  );
  const effectiveVisibility = React.useMemo<DataTableState["columnVisibility"]>(
    () => ({
      ...initialState.columnVisibility,
      ...columnVisibility,
      ...alignment?.state.columnVisibility,
      ...tableOptions?.state?.columnVisibility,
      __external: false,
    }),
    [initialState.columnVisibility, columnVisibility, alignment?.state.columnVisibility, tableOptions?.state?.columnVisibility],
  );
  const showCheckboxes = !!rowSelection && rowSelection.checkboxes !== false && !isPrinting;
  const showExpanders = !!renderSubComponent && !isPrinting;
  const expanderWidth = showExpanders ? 44 : 0;
  const selectionWidth = (showCheckboxes ? 44 : 0) + expanderWidth;
  const effectiveSizing = tableOptions?.state?.columnSizing ?? alignment?.state.columnSizing ?? columnSizing;
  const flexSizes = React.useMemo(
    () =>
      getFlexSizes(
        definitions.filter(column => effectiveVisibility[getColumnId(column)] !== false && (!isPrinting || !column.hideInPrint)),
        Math.max(0, viewportWidth - selectionWidth),
        effectiveSizing,
      ),
    [definitions, effectiveVisibility, isPrinting, viewportWidth, selectionWidth, effectiveSizing],
  );
  const columns = React.useMemo<ColumnDef<DataTableFeatures, T, any>[]>(
    () => [
      ...definitions.map(column => ({
        id: getColumnId(column),
        header: typeof column.headerName === "string" ? column.headerName : getColumnId(column),
        accessorFn: (row: T, index: number) => getCellValue(row, column, rowIndices.get(row) ?? index),
        size: flexSizes[getColumnId(column)] ?? column.width ?? 150,
        minSize: column.minWidth ?? 60,
        maxSize: column.maxWidth,
        enableSorting: column.sortable !== false && (!!column.field || !!column.valueGetter),
        enableColumnFilter: !!column.filter,
        enableGlobalFilter: !!column.field || !!column.valueGetter,
        enableResizing: column.resizable !== false,
        enableHiding: false,
        enablePinning: false,
        sortFn:
          column.cellDataType === "number" ? ("basic" as const) : column.cellDataType === "date" ? ("datetime" as const) : ("alphanumeric" as const),
        filterFn: (row: DataTableRow<T>, id: string, value: DataTableFilter) => matchesFilter(row.getValue(id), value, filterType(column)),
        ...column.tableOptions,
      })),
      {
        id: "__external",
        enableHiding: false,
        enablePinning: false,
        accessorFn: () => true,
        enableGlobalFilter: false,
        enableSorting: false,
        filterFn: (row, _id, predicate: (data: T) => boolean) => predicate(row.original),
      },
    ],
    [definitions, rowIndices, flexSizes],
  );
  const table: DataTableInstance<T> = useTable<DataTableFeatures, T>({
    columnResizeMode: "onChange",
    sortDescFirst: false,
    keepPinnedRows: true,
    enableRowSelection: row => !!rowSelection && (rowSelection.isRowSelectable?.(row.original) ?? true),
    enableMultiRowSelection: rowSelection?.mode === "multiRow",
    enableSubRowSelection: false,
    manualPagination: !pagination,
    getColumnCanGlobalFilter: column => {
      const definition = definitionsById.get(column.id);
      return !!definition && (!!definition.field || !!definition.valueGetter);
    },
    globalFilterFn: (row, id, value) => {
      const column = definitionsById.get(id);
      const cellValue = row.getValue(id);
      return String(column?.getQuickFilterText?.({ data: row.original, value: cellValue }) ?? cellValue ?? "")
        .toLocaleLowerCase()
        .includes(String(value).toLocaleLowerCase());
    },
    ...tableOptions,
    getRowCanExpand: row =>
      !!renderSubComponent && tableOptions?.enableExpanding !== false && (getRowCanExpand?.(row) ?? tableOptions?.getRowCanExpand?.(row) ?? true),
    features: dataTableFeatures,
    columns,
    data,
    getRowId: (row, index) => resolveId(row, rowIndices.get(row) ?? index),
    initialState,
    state: {
      ...alignment?.state,
      ...tableOptions?.state,
      columnSizing: effectiveSizing,
      columnVisibility: effectiveVisibility,
      columnFilters: effectiveFilters,
      globalFilter: searchText,
    },
    onColumnSizingChange: updater => {
      const next = functionalUpdate(updater, table.atoms.columnSizing.get());
      setColumnSizing(next);
      tableOptions?.onColumnSizingChange?.(updater);
    },
    onColumnVisibilityChange: updater => {
      const next = functionalUpdate(updater, table.atoms.columnVisibility.get());
      setColumnVisibility(next);
      tableOptions?.onColumnVisibilityChange?.(updater);
    },
    onColumnFiltersChange: updater => {
      const update = (previous: DataTableState["columnFilters"]) => functionalUpdate(updater, previous).filter(filter => filter.id !== "__external");
      if (tableOptions?.state?.columnFilters === undefined) setColumnFilters(update);
      tableOptions?.onColumnFiltersChange?.(update);
    },
    onGlobalFilterChange: updater => {
      const value = functionalUpdate(updater, searchText) as string;
      setSearch(value);
      onQuickFilterTextChange?.(value);
      tableOptions?.onGlobalFilterChange?.(updater);
    },
    ...(alignment
      ? {
          onColumnSizingChange: updater => {
            const next = functionalUpdate(updater, table.atoms.columnSizing.get());
            alignment.setState(previous => ({ ...previous, columnSizing: next }));
            tableOptions?.onColumnSizingChange?.(updater);
          },
          onColumnOrderChange: updater => {
            const next = functionalUpdate(updater, table.atoms.columnOrder.get());
            alignment.setState(previous => ({ ...previous, columnOrder: next }));
            tableOptions?.onColumnOrderChange?.(updater);
          },
          onColumnPinningChange: updater => {
            const next = functionalUpdate(updater, table.atoms.columnPinning.get());
            alignment.setState(previous => ({ ...previous, columnPinning: next }));
            tableOptions?.onColumnPinningChange?.(updater);
          },
          onColumnVisibilityChange: updater => {
            const next = functionalUpdate(updater, table.atoms.columnVisibility.get());
            alignment.setState(previous => ({ ...previous, columnVisibility: next }));
            tableOptions?.onColumnVisibilityChange?.(updater);
          },
        }
      : {}),
  });

  const visibleColumns = [...table.getStartVisibleLeafColumns(), ...table.getCenterVisibleLeafColumns(), ...table.getEndVisibleLeafColumns()].filter(
    column => column.id !== "__external" && (!isPrinting || !definitionsById.get(column.id)?.hideInPrint),
  );
  // Preview locally so canceled drags never update controlled or aligned table state.
  if (columnDrag) {
    const from = visibleColumns.findIndex(column => column.id === columnDrag.sourceId);
    const to = visibleColumns.findIndex(column => column.id === columnDrag.targetId);
    if (from >= 0 && to >= 0) visibleColumns.splice(to, 0, visibleColumns.splice(from, 1)[0]);
  }
  const widths = new Map(visibleColumns.map(column => [column.id, column.getSize()]));
  const totalWidth = selectionWidth + visibleColumns.reduce((sum, column) => sum + widths.get(column.id)!, 0);
  const topRows = table.getTopRows();
  const bottomRows = table.getBottomRows();
  const pinnedIds = new Set([...topRows, ...bottomRows].map(row => row.id));
  const centerRows = (isPrinting ? table.getPrePaginatedRowModel().rows : table.getRowModel().rows).filter(row => !pinnedIds.has(row.id));
  const isDetailExpanded = (row: DataTableRow<T>) => !!renderSubComponent && row.getCanExpand() && row.getIsExpanded();
  // Detail panels can have arbitrary height. Resume fixed-height virtualization when all visible panels close.
  const hasExpandedDetails = [...topRows, ...centerRows, ...bottomRows].some(isDetailExpanded);
  const useVirtualRows = virtualize && !naturalHeight && !hasExpandedDetails;
  const topHeight = (topRows.length + pinnedTopRowData.length) * rowHeight;
  // This renderer opts out of React Compiler above; Virtual exposes a mutable measurement instance.
  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: centerRows.length,
    getScrollElement: () => viewportRef.current,
    estimateSize: () => rowHeight,
    getItemKey: index => centerRows[index].id,
    overscan,
    scrollMargin: headerHeight + topHeight,
    enabled: useVirtualRows,
    useFlushSync: false,
  });

  const runtime = React.useRef({
    table,
    definitionsById,
    centerRows,
    virtualizer,
    resolveId,
    rowIndices,
    sourcesById,
    useVirtualRows,
    pagination,
    serverPagination: tableOptions?.manualPagination === true,
  });
  runtime.current = {
    table,
    definitionsById,
    centerRows,
    virtualizer,
    resolveId,
    rowIndices,
    sourcesById,
    useVirtualRows,
    pagination,
    serverPagination: tableOptions?.manualPagination === true,
  };
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
  }, [updateEdit]);
  React.useImperativeHandle(forwardedRef, () => api, [api]);

  React.useEffect(() => {
    setApi(api);
    return () => setApi(previous => (previous === api ? null : previous));
  }, [api, setApi]);
  const readyRef = React.useRef(onReady);
  readyRef.current = onReady;
  React.useEffect(() => {
    readyRef.current?.(api);
  }, [api]);
  const selectionCallback = React.useRef(onSelectionChanged);
  selectionCallback.current = onSelectionChanged;
  React.useEffect(() => {
    const current = runtime.current.table;
    const selected = current.getSelectedRowModel().rows.map(row => row.original);
    selectionCallback.current?.(selected, current.getSelectedRowIds());
  }, [table.state.rowSelection, data]);
  React.useEffect(() => {
    const current = runtime.current.table;
    const selectedCount = current.getSelectedRowIds().length;
    const pinnedCount = (current.state.rowPinning.top?.length ?? 0) + (current.state.rowPinning.bottom?.length ?? 0);
    setCounts(previous =>
      previous.selectedCount === selectedCount && previous.pinnedCount === pinnedCount ? previous : { selectedCount, pinnedCount },
    );
  }, [table.state.rowSelection, table.state.rowPinning, setCounts]);
  React.useEffect(() => {
    const element = viewportRef.current;
    if (!element) return;
    const resize = () => setViewportWidth(element.clientWidth);
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  React.useEffect(() => {
    const element = viewportRef.current;
    const viewports = alignment?.viewports.current;
    if (!element || !viewports) return;
    viewports.add(element);
    return () => {
      viewports.delete(element);
    };
  }, [alignment?.viewports]);
  React.useEffect(() => {
    if (editRef.current && sourcesById.get(editRef.current.rowId) !== editRef.current.source) {
      api.stopEditing(true);
    }
    setPatches(previous => {
      const entries = Object.entries(previous).filter(([id, patch]) => sourcesById.get(id) === patch.source);
      return entries.length === Object.keys(previous).length ? previous : Object.fromEntries(entries);
    });
    const current = runtime.current.table;
    if (!runtime.current.serverPagination) {
      // Locally owned datasets can discard deleted identities. Server pages retain unloaded selection IDs.
      const selection = current.atoms.rowSelection.get();
      const entries = Object.entries(selection).filter(([id]) => sourcesById.has(id));
      if (entries.length !== Object.keys(selection).length) current.setRowSelection(Object.fromEntries(entries));
      const pinning = current.atoms.rowPinning.get();
      const top = pinning.top?.filter(id => sourcesById.has(id));
      const bottom = pinning.bottom?.filter(id => sourcesById.has(id));
      if (top?.length !== pinning.top?.length || bottom?.length !== pinning.bottom?.length) current.setRowPinning({ top, bottom });
    }
  }, [sourcesById, api]);

  const navigableRows = [...topRows, ...centerRows, ...bottomRows];
  const displayedIds = [
    ...pinnedTopRowData.map((_, index) => `__summary_top_${index}`),
    ...topRows.map(row => row.id),
    ...centerRows.map(row => row.id),
    ...bottomRows.map(row => row.id),
    ...pinnedBottomRowData.map((_, index) => `__summary_bottom_${index}`),
  ];
  const expandedIds = new Set(navigableRows.filter(isDetailExpanded).map(row => row.id));
  let displayedRowCount = 0;
  const displayedIndices = new Map(
    displayedIds.map(id => {
      const index = displayedRowCount;
      displayedRowCount += expandedIds.has(id) ? 2 : 1;
      return [id, index];
    }),
  );
  const virtualItems = useVirtualRows ? virtualizer.getVirtualItems() : [];
  const renderedIds = useVirtualRows
    ? [
        ...displayedIds.slice(0, pinnedTopRowData.length + topRows.length),
        ...virtualItems.map(item => centerRows[item.index].id),
        ...bottomRows.map(row => row.id),
        ...pinnedBottomRowData.map((_, index) => `__summary_bottom_${index}`),
      ]
    : displayedIds;
  const activeCell = getActiveDataTableCell(
    focusedCell,
    renderedIds,
    visibleColumns.map(column => column.id),
  );

  // Capture layout after each commit and animate retained elements when row or column order changes.
  // The virtualizer owns the outer row transform, so motion is applied to the inner row instead.
  const motionSnapshot = React.useRef<{
    rows: string;
    columns: string;
    scrollTop: number;
    scrollLeft: number;
    positions: Map<Element, DOMRect>;
    animations: Animation[];
    rowCopies: Map<HTMLElement, HTMLElement>;
  }>();
  const exitLayer = React.useRef<HTMLDivElement>();
  const rowOrder = JSON.stringify(centerRows.map(row => row.id));
  const columnOrder = JSON.stringify(visibleColumns.map(column => column.id));
  React.useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const previous = motionSnapshot.current;
    if (
      previous &&
      previous.rows === rowOrder &&
      previous.columns === columnOrder &&
      previous.scrollTop === viewport.scrollTop &&
      previous.scrollLeft === viewport.scrollLeft &&
      previous.animations.some(animation => animation.playState === "running")
    )
      return;
    // Read the current visual offset before canceling an interrupted transition.
    const offsets = new Map<Element, DOMMatrix>();
    if (previous)
      for (const element of previous.positions.keys()) {
        if (element.isConnected) offsets.set(element, new DOMMatrix(getComputedStyle(element).transform));
      }
    previous?.animations.forEach(animation => animation.cancel());
    const elements = Array.from(
      viewport.querySelectorAll<HTMLElement>('[role="row"][data-row-id], [role="gridcell"][data-column-id], [role="columnheader"][data-column-id]'),
    ).filter(element => !element.closest("[data-exiting-row]"));
    const positions = new Map(elements.map(element => [element, element.getBoundingClientRect()]));
    const animations: Animation[] = [];
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (previous && !isPrinting && !reducedMotion) {
      const rowsChanged = previous.rows !== rowOrder;
      const columnsChanged = previous.columns !== columnOrder;
      if (rowsChanged) {
        exitLayer.current?.remove();
        const bounds = viewport.getBoundingClientRect();
        const layer = document.createElement("div");
        layer.setAttribute("aria-hidden", "true");
        layer.inert = true;
        Object.assign(layer.style, {
          position: "absolute",
          top: `${viewport.scrollTop}px`,
          left: `${viewport.scrollLeft}px`,
          width: `${viewport.clientWidth}px`,
          height: `${viewport.clientHeight}px`,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: "15",
        });
        for (const [element, copy] of previous.rowCopies) {
          if (positions.has(element)) continue;
          const rect = previous.positions.get(element)!;
          copy.setAttribute("data-exiting-row", "");
          // Copies are decorative and must not introduce duplicate document ids.
          copy.removeAttribute("id");
          copy.querySelectorAll("[id]").forEach(child => child.removeAttribute("id"));
          Object.assign(copy.style, {
            position: "absolute",
            margin: "0",
            minWidth: "0",
            transform: "none",
            top: `${rect.top - bounds.top - viewport.clientTop}px`,
            left: `${rect.left - bounds.left - viewport.clientLeft}px`,
            width: `${rect.width}px`,
          });
          layer.append(copy);
        }
        if (layer.childElementCount) {
          viewport.append(layer);
          exitLayer.current = layer;
          const fades = Array.from(layer.children, child =>
            child.animate([{ opacity: 1 }, { opacity: 0 }], {
              duration: 220,
              easing: "ease-out",
              fill: "forwards",
            }),
          );
          void Promise.all(fades.map(fade => fade.finished)).then(() => layer.remove());
        }
      }
      for (const element of elements) {
        const isRow = element.getAttribute("role") === "row";
        if (!(isRow ? rowsChanged : columnsChanged) || element.hasAttribute("data-dragging")) continue;
        const before = previous.positions.get(element);
        const after = positions.get(element)!;
        if (typeof element.animate !== "function") continue;
        const offset = offsets.get(element);
        const sameScroll = previous.scrollTop === viewport.scrollTop && previous.scrollLeft === viewport.scrollLeft;
        const x = !isRow && before && sameScroll ? before.left - after.left + (offset?.m41 ?? 0) : 0;
        const y = isRow && before && sameScroll ? before.top - after.top + (offset?.m42 ?? 0) : 0;
        const moved = Math.abs(x) >= 1 || Math.abs(y) >= 1;
        if (!moved && !isRow) continue;
        // Virtualization can replace every visible row; filters can retain a row at the same position.
        // Give those results an entrance transition as well as animating rows that change position.
        const frames = moved
          ? [{ transform: `translate(${x}px, ${y}px)` }, { transform: "translate(0, 0)" }]
          : [{ opacity: before ? 0.6 : 0 }, { opacity: 1 }];
        animations.push(
          element.animate(frames, {
            duration: 220,
            easing: "ease-out",
          }),
        );
      }
    }
    motionSnapshot.current = {
      rows: rowOrder,
      columns: columnOrder,
      scrollTop: viewport.scrollTop,
      scrollLeft: viewport.scrollLeft,
      positions,
      animations,
      rowCopies: new Map(
        elements
          .filter(element => {
            const rect = positions.get(element)!;
            const bounds = viewport.getBoundingClientRect();
            return element.getAttribute("role") === "row" && rect.bottom > bounds.top && rect.top < bounds.bottom;
          })
          .map(element => [element, element.cloneNode(true) as HTMLElement]),
      ),
    };
  });
  React.useEffect(
    () => () => {
      motionSnapshot.current?.animations.forEach(animation => animation.cancel());
      exitLayer.current?.remove();
    },
    [],
  );

  const columnStyle = (column: Column<DataTableFeatures, T>, header = false): React.CSSProperties => {
    const pinned = isPrinting ? false : column.getIsPinned();
    const region = visibleColumns.filter(item => item.getIsPinned() === pinned);
    const index = region.findIndex(item => item.id === column.id);
    const start = region.slice(0, index).reduce((sum, item) => sum + widths.get(item.id)!, selectionWidth);
    const end = region.slice(index + 1).reduce((sum, item) => sum + widths.get(item.id)!, 0);
    return {
      width: widths.get(column.id),
      flexShrink: 0,
      position: pinned ? "sticky" : "relative",
      insetInlineStart: pinned === "start" ? start : undefined,
      insetInlineEnd: pinned === "end" ? end : undefined,
      zIndex: pinned ? 2 : undefined,
      background: pinned ? (header ? "oklch(var(--mtx-primary-50))" : "inherit") : undefined,
    };
  };

  const handleCellKeyDown = (event: React.KeyboardEvent, row: DataTableRow<T>, column: Column<DataTableFeatures, T>) => {
    if (event.defaultPrevented) return;
    if (event.key === "Escape" && editRef.current) {
      event.preventDefault();
      api.stopEditing(true);
      return;
    }
    if (event.key === "Enter" && editRef.current) {
      // Editors own activation and multiline input; plain text/number inputs still commit on Enter.
      if ((event.target as HTMLElement).closest("button,select,textarea,[contenteditable=true],[role=combobox],[role=listbox]")) return;
      event.preventDefault();
      api.stopEditing();
      return;
    }
    const target = event.target as HTMLElement;
    if (target.closest("input,select,textarea,button,[contenteditable=true]")) return;
    if (event.key === "Enter" || event.key === "F2") {
      event.preventDefault();
      if (editType === "fullRow") api.startEditingRow(row.id);
      else api.startEditingCell({ rowId: row.id, columnId: column.id });
      return;
    }
    const rowIndex = navigableRows.findIndex(item => item.id === row.id);
    const columnIndex = visibleColumns.findIndex(item => item.id === column.id);
    const nextRow = event.key === "ArrowDown" ? rowIndex + 1 : event.key === "ArrowUp" ? rowIndex - 1 : rowIndex;
    const horizontalStep = getComputedStyle(event.currentTarget).direction === "rtl" ? -1 : 1;
    const nextColumn =
      event.key === "ArrowRight" ? columnIndex + horizontalStep : event.key === "ArrowLeft" ? columnIndex - horizontalStep : columnIndex;
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key) && navigableRows[nextRow] && visibleColumns[nextColumn]) {
      event.preventDefault();
      const targetRow = navigableRows[nextRow];
      if (!pinnedIds.has(targetRow.id)) api.scrollToRow(targetRow.id);
      api.focusCell(targetRow.id, visibleColumns[nextColumn].id);
    }
  };

  const renderRow = (data: T, rowId: string, index: number, row?: DataTableRow<T>, pinned?: "top" | "bottom") => {
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
            const params: DataTableCellParams<T> = { data, value, rowId, rowIndex: index, columnId: column.id, api, isEditing: !!editing, pinned };
            const Renderer = definition.cellRenderer;
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
                  setFocusedCell(previous =>
                    previous?.rowId === rowId && previous.columnId === column.id ? previous : { rowId, columnId: column.id },
                  )
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
                      className={inputClass}
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
  };

  const selectionRows = (
    rowSelection?.selectAll === "all"
      ? table.getCoreRowModel()
      : rowSelection?.selectAll === "currentPage"
        ? table.getRowModel()
        : table.getFilteredRowModel()
  ).rows.filter(row => row.getCanSelect());
  const selectedInScope = selectionRows.filter(row => row.getIsSelected()).length;
  return (
    <DragDropProvider
      sensors={dataTableColumnSensors}
      onDragStart={event => {
        const sourceId = event.operation.source?.data.columnId;
        if (typeof sourceId !== "string" || !event.nativeEvent?.type.startsWith("pointer")) return;
        const region = runtime.current.table.getColumn(sourceId)?.getIsPinned();
        columnDragRef.current = {
          sourceId,
          targetId: sourceId,
          scrollLeft: viewportRef.current?.scrollLeft ?? 0,
          columns: Array.from(contentRef.current?.querySelectorAll<HTMLElement>('[role="columnheader"][data-column-id]') ?? [])
            .filter(element => runtime.current.table.getColumn(element.dataset.columnId!)?.getIsPinned() === region)
            .map(element => {
              const rect = element.getBoundingClientRect();
              return { id: element.dataset.columnId!, left: rect.left, right: rect.right };
            }),
        };
        setColumnDrag({ sourceId, targetId: sourceId });
      }}
      onDragMove={event => {
        const drag = columnDragRef.current;
        if (!drag || !event.to) return;
        const pinned = runtime.current.table.getColumn(drag.sourceId)?.getIsPinned();
        const x = event.to.x + (pinned ? 0 : (viewportRef.current?.scrollLeft ?? 0) - drag.scrollLeft);
        // Initial slots remain stable while the rendered columns move underneath the pointer.
        const target = drag.columns.find(column => x >= column.left && x <= column.right);
        if (!target || target.id === drag.targetId) return;
        drag.targetId = target.id;
        setColumnDrag({ sourceId: drag.sourceId, targetId: target.id });
      }}
      onDragEnd={event => {
        const { source, target } = event.operation;
        const drag = columnDragRef.current;
        const targetId = drag?.targetId ?? target?.data.columnId;
        if (!event.canceled && typeof source?.data.columnId === "string" && typeof targetId === "string") {
          moveDataTableColumn(runtime.current.table, source.data.columnId, targetId);
        }
        columnDragRef.current = null;
        setColumnDrag(null);
      }}
    >
      <DragOverlay dropAnimation={null} style={{ position: "fixed", pointerEvents: "none" }}>
        {source => {
          const definition = definitionsById.get(source.data.columnId);
          return (
            <div className="mtx-rounded-sm mtx-border mtx-border-gray-200 mtx-bg-primary-50 mtx-px-3 mtx-py-2 mtx-text-xs mtx-font-bold mtx-shadow-md">
              {definition?.headerName ?? source.data.columnId}
            </div>
          );
        }}
      </DragOverlay>
      <div
        ref={contentRef}
        data-data-table-content=""
        data-print-layout={isPrinting || undefined}
        className={cn("mtx-relative mtx-flex mtx-min-h-0 mtx-flex-1 mtx-flex-col mtx-rounded-b-lg", className)}
        style={style}
        {...props}
      >
        {edit && (
          <div data-print-hidden="" className="mtx-flex mtx-shrink-0 mtx-items-center mtx-gap-2 mtx-border-b mtx-border-gray-200 mtx-p-2">
            <Button type="button" size="sm" onClick={() => api.stopEditing()}>
              Save
            </Button>
            <Button type="button" size="sm" variant="text" onClick={() => api.stopEditing(true)}>
              Cancel
            </Button>
            {edit.errors.length > 0 && (
              <span role="alert" className="mtx-text-danger">
                {edit.errors.join(". ")}
              </span>
            )}
          </div>
        )}
        <div
          ref={viewportRef}
          data-data-table-viewport=""
          role="grid"
          aria-label={props["aria-label"] ?? "Data table"}
          aria-busy={loading}
          aria-rowcount={displayedRowCount + 1}
          aria-colcount={visibleColumns.length + (showCheckboxes ? 1 : 0) + (showExpanders ? 1 : 0)}
          aria-multiselectable={rowSelection?.mode === "multiRow" || undefined}
          className="mtx-relative mtx-min-h-0 mtx-flex-1 mtx-rounded-b-lg"
          style={{
            ...containerStyle,
            overflow: naturalHeight ? "visible" : (containerStyle?.overflow ?? "auto"),
            overflowX: isPrinting ? "visible" : suppressHorizontalScroll ? "hidden" : containerStyle?.overflowX,
          }}
          onScroll={event => {
            if (alignment && !isPrinting)
              for (const element of alignment.viewports.current) {
                if (element !== event.currentTarget && element.scrollLeft !== event.currentTarget.scrollLeft)
                  element.scrollLeft = event.currentTarget.scrollLeft;
              }
          }}
        >
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
                    checked={
                      selectionRows.length > 0 && selectedInScope === selectionRows.length ? true : selectedInScope > 0 ? "indeterminate" : false
                    }
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
                  {!isPrinting && <ColumnMenu table={table} column={column} definition={definition} />}
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
          {(topRows.length > 0 || pinnedTopRowData.length > 0) && (
            <div
              role="rowgroup"
              className="mtx-sticky mtx-z-20"
              style={{ top: isPrinting ? undefined : headerHeight, position: isPrinting ? "relative" : "sticky" }}
            >
              {pinnedTopRowData.map((row, index) => renderRow(row, `__summary_top_${index}`, index, undefined, "top"))}
              {topRows.map(row => renderRow(row.original, row.id, row.index, row, "top"))}
            </div>
          )}
          <div role="rowgroup">
            {useVirtualRows ? (
              <div style={{ height: virtualizer.getTotalSize(), position: "relative", width: totalWidth, minWidth: "100%" }}>
                {virtualItems.map(item => {
                  const row = centerRows[item.index];
                  return (
                    <div
                      key={row.id}
                      style={{ position: "absolute", top: 0, width: "100%", transform: `translateY(${item.start - headerHeight - topHeight}px)` }}
                    >
                      {renderRow(row.original, row.id, rowIndices.get(row.original) ?? row.index, row)}
                    </div>
                  );
                })}
              </div>
            ) : (
              centerRows.map(row => renderRow(row.original, row.id, rowIndices.get(row.original) ?? row.index, row))
            )}
          </div>
          {(bottomRows.length > 0 || pinnedBottomRowData.length > 0) && (
            <div role="rowgroup" className="mtx-sticky mtx-bottom-0 mtx-z-20" style={{ position: isPrinting ? "relative" : "sticky" }}>
              {bottomRows.map(row => renderRow(row.original, row.id, row.index, row, "bottom"))}
              {pinnedBottomRowData.map((row, index) => renderRow(row, `__summary_bottom_${index}`, index, undefined, "bottom"))}
            </div>
          )}
          {(loading || (!centerRows.length && !topRows.length && !bottomRows.length)) && (
            <div
              role="status"
              className={cn(
                "mtx-flex mtx-items-center mtx-justify-center mtx-p-6 mtx-text-text-300",
                loading && "mtx-absolute mtx-top-0 mtx-start-0 mtx-z-50 mtx-h-full mtx-w-full mtx-bg-gray-100/25",
              )}
            >
              {loading ? loadingContent : emptyContent}
            </div>
          )}
        </div>
        {pagination && !isPrinting && (
          <div
            data-print-hidden=""
            className="mtx-flex mtx-shrink-0 mtx-items-center mtx-justify-end mtx-gap-3 mtx-border-t mtx-border-gray-200 mtx-p-2"
          >
            <label className="mtx-flex mtx-items-center mtx-gap-2">
              Rows per page
              <select
                className={inputClass}
                aria-label="Rows per page"
                value={table.state.pagination.pageSize}
                onChange={event => table.setPageSize(Number(event.target.value))}
              >
                {Array.from(new Set([...paginationPageSizeSelector, table.state.pagination.pageSize]))
                  .sort((a, b) => a - b)
                  .map(size => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
              </select>
            </label>
            <span>
              Page {table.state.pagination.pageIndex + 1} of {Math.max(1, table.getPageCount())}
            </span>
            <Button
              type="button"
              variant="text"
              size="sm"
              aria-label="Previous page"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              Previous
            </Button>
            <Button type="button" variant="text" size="sm" aria-label="Next page" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
              Next
            </Button>
          </div>
        )}
      </div>
    </DragDropProvider>
  );
}

function ColumnMenu<T extends object>({
  table,
  column,
  definition,
}: {
  table: DataTableInstance<T>;
  column: Column<DataTableFeatures, T>;
  definition: DataTableColumn<T>;
}) {
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState<DataTableFilter>({ operator: filterType(definition) === "text" ? "contains" : "equals", value: "" });
  const type = filterType(definition);
  const coreRows = table.getCoreRowModel().rows;
  const selectOptions = React.useMemo(
    () =>
      open && type === "select"
        ? (definition.filterOptions?.map(option => (typeof option === "string" ? { value: option, label: option } : option)) ??
          Array.from(
            new Set(
              coreRows
                .map(row => row.getValue(column.id))
                .filter(value => value !== null && value !== undefined && value !== "")
                .map(String),
            ),
          )
            .sort()
            .map(value => ({ value, label: value })))
        : [],
    [open, type, coreRows, column.id, definition.filterOptions],
  );
  const operators: DataTableFilterOperator[] =
    type === "text"
      ? ["contains", "notContains", "equals", "notEqual", "startsWith", "endsWith", "blank", "notBlank"]
      : type === "select"
        ? ["equals", "notEqual", "blank", "notBlank"]
        : ["equals", "notEqual", "greaterThan", "greaterThanOrEqual", "lessThan", "lessThanOrEqual", "inRange", "blank", "notBlank"];
  const labels: Record<DataTableFilterOperator, string> = {
    contains: "Contains",
    notContains: "Does not contain",
    equals: "Equals",
    notEqual: "Does not equal",
    startsWith: "Starts with",
    endsWith: "Ends with",
    greaterThan: "Greater than",
    greaterThanOrEqual: "Greater than or equal",
    lessThan: "Less than",
    lessThanOrEqual: "Less than or equal",
    inRange: "Between",
    blank: "Blank",
    notBlank: "Not blank",
  };
  const canPin = column.getCanPin();
  const canHide = column.getCanHide();
  if (!column.getCanFilter() && !canPin && !canHide) return null;

  return (
    <Popover
      open={open}
      onOpenChange={next => {
        if (next) setDraft((column.getFilterValue() as DataTableFilter) ?? { operator: type === "text" ? "contains" : "equals", value: "" });
        setOpen(next);
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`Column options ${column.id}`}
          className={cn("mtx-shrink-0 mtx-rounded-sm mtx-p-0.5 hover:mtx-bg-primary-100/80", column.getIsFiltered() && "mtx-text-primary")}
        >
          <Filter className="mtx-h-4.5 mtx-w-4.5" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="mtx-w-56 mtx-space-y-2 mtx-text-xs mtx-font-normal">
        {column.getCanFilter() && (
          <>
            <label className="mtx-block">
              Filter {typeof definition.headerName === "string" ? definition.headerName : column.id}
              <select
                aria-label="Filter operator"
                className={inputClass}
                value={draft.operator}
                onChange={event => setDraft({ ...draft, operator: event.target.value as DataTableFilterOperator })}
              >
                {operators.map(operator => (
                  <option key={operator} value={operator}>
                    {labels[operator]}
                  </option>
                ))}
              </select>
            </label>
            {draft.operator !== "blank" &&
              draft.operator !== "notBlank" &&
              (type === "select" ? (
                <select
                  aria-label="Filter value"
                  className={inputClass}
                  value={draft.value ?? ""}
                  onChange={event => setDraft({ ...draft, value: event.target.value })}
                >
                  <option value="">All</option>
                  {draft.value && !selectOptions.some(option => option.value === draft.value) && <option value={draft.value}>{draft.value}</option>}
                  {selectOptions.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  aria-label="Filter value"
                  className={inputClass}
                  type={type === "text" ? "text" : type}
                  value={draft.value ?? ""}
                  onChange={event => setDraft({ ...draft, value: event.target.value })}
                />
              ))}
            {type !== "select" && draft.operator === "inRange" && (
              <input
                aria-label="Filter upper value"
                className={inputClass}
                type={type === "text" ? "text" : type}
                value={draft.valueTo ?? ""}
                onChange={event => setDraft({ ...draft, valueTo: event.target.value })}
              />
            )}
            <div className="mtx-flex mtx-gap-2">
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  column.setFilterValue(
                    type === "select" && !draft.value && draft.operator !== "blank" && draft.operator !== "notBlank" ? undefined : draft,
                  );
                  setOpen(false);
                }}
              >
                Apply
              </Button>
              <Button
                type="button"
                size="sm"
                variant="text"
                onClick={() => {
                  column.setFilterValue(undefined);
                  setOpen(false);
                }}
              >
                Reset
              </Button>
            </div>
            {(canPin || canHide) && <hr className="mtx-border-gray-200" />}
          </>
        )}
        {(canPin || canHide) && (
          <div className="mtx-flex mtx-flex-wrap mtx-gap-1">
            {canPin && (
              <>
                <Button
                  type="button"
                  size="sm"
                  variant="text"
                  onClick={() => {
                    column.pin("start");
                    setOpen(false);
                  }}
                >
                  Pin start
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="text"
                  onClick={() => {
                    column.pin("end");
                    setOpen(false);
                  }}
                >
                  Pin end
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="text"
                  onClick={() => {
                    column.pin(false);
                    setOpen(false);
                  }}
                >
                  Unpin
                </Button>
              </>
            )}
            {canHide && (
              <Button
                type="button"
                size="sm"
                variant="text"
                onClick={() => {
                  column.toggleVisibility(false);
                  setOpen(false);
                }}
              >
                Hide column
              </Button>
            )}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

const DataTableContent = React.forwardRef(DataTableContentInner) as <T extends object>(
  props: DataTableContentProps<T> & { ref?: React.ForwardedRef<DataTableApi<T>> },
) => React.ReactElement;
(DataTableContent as { displayName?: string }).displayName = "DataTableContent";

export { DataTable, DataTableActionBar, DataTableContent };
