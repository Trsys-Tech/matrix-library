import { DataTableInstance } from './DataTable.types';
type DataTablePaginationProps<T extends object> = {
    table: DataTableInstance<T>;
    paginationPageSizeSelector: readonly number[];
    disabled: boolean;
};
export declare function DataTablePagination<T extends object>({ table, paginationPageSizeSelector, disabled }: DataTablePaginationProps<T>): import("react").JSX.Element;
export {};
//# sourceMappingURL=DataTablePagination.d.ts.map