import { Column } from '@tanstack/react-table';
import { DataTableApi, DataTableColumn, DataTableContentProps, DataTableFeatures, DataTableInstance, DataTableRow } from './DataTable.types';
import { DataTableEditSession } from './dataTableEditing';
import * as React from "react";
type DataTableRowViewProps<T extends object> = Pick<DataTableContentProps<T>, "rowSelection" | "getRowClass" | "rowClassRules" | "onRowClick" | "suppressClickEdit" | "renderSubComponent"> & {
    data: T;
    rowId: string;
    index: number;
    row?: DataTableRow<T>;
    pinned?: "top" | "bottom";
    edit: DataTableEditSession<T> | null;
    editRef: React.MutableRefObject<DataTableEditSession<T> | null>;
    updateEdit: (next: DataTableEditSession<T> | null) => void;
    api: DataTableApi<T>;
    table: DataTableInstance<T>;
    detailId: string;
    displayedIndices: Map<string, number>;
    rowHeight: number;
    totalWidth: number;
    showExpanders: boolean;
    expanderWidth: number;
    showCheckboxes: boolean;
    visibleColumns: Column<DataTableFeatures, T>[];
    definitionsById: Map<string, DataTableColumn<T>>;
    activeCell: {
        rowId?: string;
        columnId?: string;
    };
    setFocusedCell: React.Dispatch<React.SetStateAction<{
        rowId: string;
        columnId: string;
    } | null>>;
    columnStyle: (column: Column<DataTableFeatures, T>, header?: boolean) => React.CSSProperties;
    handleCellKeyDown: (event: React.KeyboardEvent, row: DataTableRow<T>, column: Column<DataTableFeatures, T>) => void;
    editType: "cell" | "fullRow";
    isDetailExpanded: (row: DataTableRow<T>) => boolean;
};
export declare function DataTableRowView<T extends object>({ data, rowId, index, row, pinned, ...view }: DataTableRowViewProps<T>): React.JSX.Element;
export {};
//# sourceMappingURL=DataTableRowView.d.ts.map