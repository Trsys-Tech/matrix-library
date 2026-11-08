import { Column } from '@tanstack/react-table';
import { DataTableApi, DataTableColumnDef, DataTableContentProps, DataTableFeatures, DataTableInstance, DataTableRow } from './DataTable.types';
import * as React from "react";
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
export declare function DataTableHeader<T extends object>({ table, api, headerHeight, totalWidth, isPrinting, showExpanders, expanderWidth, showCheckboxes, rowSelection, selectionRows, selectedInScope, visibleColumns, definitionsById, columnStyle, widths, }: DataTableHeaderProps<T>): React.JSX.Element;
export {};
//# sourceMappingURL=DataTableHeader.d.ts.map