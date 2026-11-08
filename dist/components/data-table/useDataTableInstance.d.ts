import { DataTableAlignmentContext } from './DataTableContext';
import { DataTableColumnDef, DataTableContentProps, DataTableInstance } from './DataTable.types';
import * as React from "react";
type DataTableInstanceOptions<T extends object> = Pick<DataTableContentProps<T>, "rowData" | "columnDefs" | "getRowId" | "tableOptions" | "externalFilter" | "rowSelection" | "renderSubComponent" | "getRowCanExpand" | "onQuickFilterTextChange"> & {
    defaultColDef: NonNullable<DataTableContentProps<T>["defaultColDef"]>;
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
    definitionsById: Map<string, DataTableColumnDef<T>>;
    sourcesById: Map<string, T>;
    data: T[];
    rowIndices: Map<T, number>;
    resolveId: (data: T, index: number) => string;
};
export {};
//# sourceMappingURL=useDataTableInstance.d.ts.map