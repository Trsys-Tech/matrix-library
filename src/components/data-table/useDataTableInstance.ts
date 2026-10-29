import * as React from "react";
import { functionalUpdate, useTable, type ColumnDef } from "@tanstack/react-table";
import { DataTableAlignmentContext } from "./DataTableContext";
import { dataTableFeatures } from "./dataTableFeatures";
import { filterType, getCellValue, getColumnId, getFlexSizes, matchesFilter } from "./dataTableModel";
import type {
  DataTableColumnDef,
  DataTableContentProps,
  DataTableFeatures,
  DataTableFilter,
  DataTableInstance,
  DataTableRow,
  DataTableState,
} from "./DataTable.types";

const emptyRows: never[] = [];
type DataTableInstanceOptions<T extends object> = Pick<
  DataTableContentProps<T>,
  | "rowData"
  | "columnDefs"
  | "getRowId"
  | "tableOptions"
  | "externalFilter"
  | "rowSelection"
  | "renderSubComponent"
  | "getRowCanExpand"
  | "onQuickFilterTextChange"
> & {
  defaultColDef: NonNullable<DataTableContentProps<T>["defaultColDef"]>;
  paginationPageSize: number;
  pagination: boolean;
  patches: Record<string, { source: T; data: T }>;
  alignment: React.ContextType<typeof DataTableAlignmentContext>;
  isPrinting: boolean;
  viewportWidth: number;
  selectionWidth: number;
  searchText: string;
  setSearch: (value: string) => void;
};

/** Own TanStack configuration, controlled state precedence and stable row identities. */
export function useDataTableInstance<T extends object>({
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
}: DataTableInstanceOptions<T>) {
  const [columnSizing, setColumnSizing] = React.useState<DataTableState["columnSizing"]>(tableOptions?.initialState?.columnSizing ?? {});
  const [columnVisibility, setColumnVisibility] = React.useState<DataTableState["columnVisibility"]>({});
  const [columnFilters, setColumnFilters] = React.useState<DataTableState["columnFilters"]>(tableOptions?.initialState?.columnFilters ?? []);
  const resolveId = React.useCallback(
    (data: T, index: number) => String(getRowId?.(data, index) ?? (data as { id?: unknown } | null)?.id ?? index),
    [getRowId],
  );
  const definitions = React.useMemo(() => {
    // Column overrides preserve the field/renderer pairing that TypeScript loses through the spread.
    const result = columnDefs.map(column => ({ ...defaultColDef, ...column }) as DataTableColumnDef<T>);
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

  return { table, definitionsById, sourcesById, data, rowIndices, resolveId };
}
