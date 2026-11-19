import { Column } from '@tanstack/react-table';
import { DataTableInstance, DataTableFeatures, DataTableColumnDef } from './DataTable.types';
import * as React from "react";
export declare function DataTableColumnMenu<T extends object>({ table, column, definition, disabled, }: {
    table: DataTableInstance<T>;
    column: Column<DataTableFeatures, T>;
    definition: DataTableColumnDef<T>;
    disabled: boolean;
}): React.JSX.Element | null;
//# sourceMappingURL=DataTableColumnMenu.d.ts.map