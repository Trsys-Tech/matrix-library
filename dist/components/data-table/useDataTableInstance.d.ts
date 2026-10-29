import { ColumnDef } from '@tanstack/react-table';
import { DataTableAlignmentContext } from './DataTableContext';
import { DataTableColumn, DataTableContentProps, DataTableInstance, DataTableFilterType, DataTableFilterOption, DataTableCellParams, DataTableEditorProps } from './DataTable.types';
import { TableFeature, Table, RowModel, CreatedSortFn } from '@tanstack/table-core';
import * as React from "react";
type DataTableInstanceOptions<T extends object> = Pick<DataTableContentProps<T>, "rowData" | "columnDefs" | "getRowId" | "tableOptions" | "externalFilter" | "rowSelection" | "renderSubComponent" | "getRowCanExpand" | "onQuickFilterTextChange"> & {
    defaultColDef: Partial<DataTableColumn<T>>;
    paginationPageSize: number;
    pagination: boolean;
    patches: Record<string, {
        source: T;
        data: T;
    }>;
    alignment: React.ContextType<typeof DataTableAlignmentContext>;
    isPrinting: boolean;
    viewportWidth: number;
    selectionWidth: number;
    searchText: string;
    setSearch: (value: string) => void;
};
/** Own TanStack configuration, controlled state precedence and stable row identities. */
export declare function useDataTableInstance<T extends object>({ rowData, columnDefs, defaultColDef, getRowId, paginationPageSize, tableOptions, externalFilter, rowSelection, pagination, renderSubComponent, getRowCanExpand, onQuickFilterTextChange, patches, alignment, isPrinting, viewportWidth, selectionWidth, searchText, setSearch, }: DataTableInstanceOptions<T>): {
    table: DataTableInstance<T>;
    definitionsById: Map<string, {
        colId?: string;
        field?: (string & {}) | (keyof T & string) | undefined;
        headerName?: React.ReactNode;
        width?: number;
        minWidth?: number;
        maxWidth?: number;
        flex?: number;
        sortable?: boolean;
        resizable?: boolean;
        hide?: boolean;
        pinned?: "start" | "end" | "left" | "right";
        filter?: boolean | DataTableFilterType;
        filterOptions?: readonly (string | DataTableFilterOption)[];
        cellDataType?: "text" | "number" | "date" | "dateString" | "boolean";
        editable?: boolean | ((data: T) => boolean) | undefined;
        cellRenderer?: React.ComponentType< DataTableCellParams<T>> | undefined;
        cellEditor?: "number" | "text" | "date" | React.ComponentType< DataTableEditorProps<T>> | undefined;
        valueGetter?: ((params: {
            data: T;
            rowIndex: number;
        }) => unknown) | undefined;
        valueFormatter?: ((params: {
            data: T;
            value: unknown;
        }) => React.ReactNode) | undefined;
        valueParser?: ((params: {
            data: T;
            oldValue: unknown;
            newValue: unknown;
        }) => unknown) | undefined;
        valueSetter?: ((data: T, value: unknown) => T) | undefined;
        getQuickFilterText?: ((params: {
            data: T;
            value: unknown;
        }) => string) | undefined;
        cellClass?: string | ((params: DataTableCellParams<T>) => string) | undefined;
        align?: "start" | "center" | "end";
        hideInPrint?: boolean;
        suppressRowClick?: boolean;
        onKeyDown?: ((event: React.KeyboardEvent, params: DataTableCellParams<T>) => void) | undefined;
        validate?: ((value: unknown, draft: T) => readonly string[] | null) | undefined;
        tableOptions?: Partial<Omit<ColumnDef<{
            columnFilteringFeature: TableFeature;
            globalFilteringFeature: TableFeature;
            columnOrderingFeature: TableFeature;
            columnPinningFeature: TableFeature;
            columnSizingFeature: TableFeature;
            columnResizingFeature: TableFeature;
            columnVisibilityFeature: TableFeature;
            rowExpandingFeature: TableFeature;
            rowPaginationFeature: TableFeature;
            rowPinningFeature: TableFeature;
            rowSelectionFeature: TableFeature;
            rowSortingFeature: TableFeature;
            filteredRowModel: (table: Table<any, any>) => () => RowModel<any, any>;
            sortedRowModel: (table: Table<any, any>) => () => RowModel<any, any>;
            expandedRowModel: (table: Table<any, any>) => () => RowModel<any, any>;
            paginatedRowModel: (table: Table<any, any>) => () => RowModel<any, any>;
            sortFns: {
                alphanumeric: CreatedSortFn<any, any>;
                datetime: CreatedSortFn<any, any>;
                basic: CreatedSortFn<any, any>;
            };
        }, T, any>, "columns" | "footer" | "header" | "id" | "cell" | "accessorKey" | "accessorFn">> | undefined;
    }>;
    sourcesById: Map<string, T>;
    data: T[];
    rowIndices: Map<T, number>;
    resolveId: (data: T, index: number) => string;
};
export {};
//# sourceMappingURL=useDataTableInstance.d.ts.map