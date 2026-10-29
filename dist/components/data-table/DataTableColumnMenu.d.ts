import { Column } from '@tanstack/react-table';
import { DataTableInstance, DataTableFeatures, DataTableColumn } from './DataTable.types';
import * as React from "react";
export declare function DataTableColumnMenu<T extends object>({ table, column, definition, }: {
    table: DataTableInstance<T>;
    column: Column<DataTableFeatures, T>;
    definition: DataTableColumn<T>;
}): React.JSX.Element | null;
//# sourceMappingURL=DataTableColumnMenu.d.ts.map