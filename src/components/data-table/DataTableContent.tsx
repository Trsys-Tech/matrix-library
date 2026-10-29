"use client";

import * as React from "react";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import type { Column } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

import { cn } from "../../lib/utils";
import { Button } from "../button/Button";
import { DataTableAlignmentContext, useDataTable } from "./DataTableContext";
import { dataTableColumnSensors } from "./dataTableColumnDrag";
import { getActiveDataTableCell } from "./dataTableModel";
import { useDataTableInstance } from "./useDataTableInstance";
import { DataTableHeader } from "./DataTableHeader";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableRowView } from "./DataTableRowView";
import { useDataTableColumnDrag } from "./useDataTableColumnDrag";
import { useDataTableMotion } from "./useDataTableMotion";
import { useDataTableApi, type DataTableRuntime } from "./useDataTableApi";
import type { DataTableEditSession } from "./dataTableEditing";
import type { DataTableApi, DataTableContentProps, DataTableFeatures, DataTableRow } from "./DataTable.types";

const emptyRows: never[] = [];
const emptyColumn: Record<string, never> = {};

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
  const [focusedCell, setFocusedCell] = React.useState<{ rowId: string; columnId: string } | null>(null);
  const [patches, setPatches] = React.useState<Record<string, { source: T; data: T }>>({});
  const [edit, setEdit] = React.useState<DataTableEditSession<T> | null>(null);
  const [initialSearch] = React.useState(() => tableOptions?.initialState?.globalFilter ?? "");
  const editRef = React.useRef(edit);
  const configRef = React.useRef({ columnDefs, validateRow, readOnlyEdit, onEditCommit, onEditRequest, onEditCancel });
  configRef.current = { columnDefs, validateRow, readOnlyEdit, onEditCommit, onEditRequest, onEditCancel };
  const updateEdit = React.useCallback((next: DataTableEditSession<T> | null) => {
    editRef.current = next;
    setEdit(next);
  }, []);
  const isPrinting = printing || domLayout === "print";
  const naturalHeight = isPrinting || domLayout === "autoHeight";
  const searchText = quickFilterText ?? tableOptions?.state?.globalFilter ?? (hasSearch ? search : initialSearch);
  const showCheckboxes = !!rowSelection && rowSelection.checkboxes !== false && !isPrinting;
  const showExpanders = !!renderSubComponent && !isPrinting;
  const expanderWidth = showExpanders ? 44 : 0;
  const selectionWidth = (showCheckboxes ? 44 : 0) + expanderWidth;
  const { table, definitionsById, sourcesById, data, rowIndices, resolveId } = useDataTableInstance({
    rowData,
    columnDefs,
    defaultColDef,
    getRowId,
    paginationPageSize,
    tableOptions,
    externalFilter,
    rowSelection,
    pagination,
    renderSubComponent,
    getRowCanExpand,
    onQuickFilterTextChange,
    patches,
    alignment,
    isPrinting,
    viewportWidth,
    selectionWidth,
    searchText,
    setSearch,
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

  const runtime = React.useRef<DataTableRuntime<T>>({
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
  const columnDragHandlers = useDataTableColumnDrag({ runtime, viewportRef, contentRef, setColumnDrag });
  const api = useDataTableApi({ runtime, editRef, configRef, updateEdit, setPatches, contentRef, viewportRef, setPrinting });
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

  useDataTableMotion(viewportRef, JSON.stringify(centerRows.map(row => row.id)), JSON.stringify(visibleColumns.map(column => column.id)), isPrinting);

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

  const renderRow = (data: T, rowId: string, index: number, row?: DataTableRow<T>, pinned?: "top" | "bottom") => (
    <DataTableRowView
      key={rowId}
      {...{
        data,
        rowId,
        index,
        row,
        pinned,
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
      }}
    />
  );

  const selectionRows = (
    rowSelection?.selectAll === "all"
      ? table.getCoreRowModel()
      : rowSelection?.selectAll === "currentPage"
        ? table.getRowModel()
        : table.getFilteredRowModel()
  ).rows.filter(row => row.getCanSelect());
  const selectedInScope = selectionRows.filter(row => row.getIsSelected()).length;
  return (
    <DragDropProvider sensors={dataTableColumnSensors} {...columnDragHandlers}>
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
          <DataTableHeader
            {...{
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
            }}
          />
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
        {pagination && !isPrinting && <DataTablePagination table={table} paginationPageSizeSelector={paginationPageSizeSelector} />}
      </div>
    </DragDropProvider>
  );
}

const DataTableContent = React.forwardRef(DataTableContentInner) as <T extends object>(
  props: DataTableContentProps<T> & { ref?: React.ForwardedRef<DataTableApi<T>> },
) => React.ReactElement;
(DataTableContent as { displayName?: string }).displayName = "DataTableContent";

export { DataTableContent };
