import { TableFeature, Table, RowModel, CreatedSortFn } from '@tanstack/table-core';
export declare const dataTableFeatures: {
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
};
//# sourceMappingURL=dataTableFeatures.d.ts.map