import { DataTableColumn, DataTableFilter, DataTableFilterType, DataTableInstance } from './DataTable.types';
/** Keep the roving tab stop on a mounted row when virtualization changes the viewport. */
export declare function getActiveDataTableCell(focused: {
    rowId: string;
    columnId: string;
} | null, renderedIds: readonly string[], columnIds: readonly string[]): {
    rowId: string;
    columnId: string;
};
/** Reorder within the current region without changing pinning or dropping hidden column IDs. */
export declare function moveDataTableColumn<T extends object>(table: DataTableInstance<T>, sourceId: string, targetId: string): boolean;
export declare function getColumnId<T extends object>(column: DataTableColumn<T>): string;
export declare function getCellValue<T extends object>(data: T, column: DataTableColumn<T>, rowIndex: number): unknown;
export declare function setCellValue<T extends object>(data: T, column: DataTableColumn<T>, value: unknown): T;
/** Native date inputs accept yyyy-MM-dd text only; serialize Date values locally and keep string dates. */
export declare function toDateInputValue(value: unknown): string;
/** Parse date input text back to a Date for date columns; text columns keep the typed string and clearing gives null. */
export declare function parseDateInputValue(rawValue: string, previousValue: unknown, cellDataType?: DataTableColumn<Record<string, unknown>>["cellDataType"]): unknown;
export declare function filterType<T extends object>(column: DataTableColumn<T>): DataTableFilterType;
export declare function matchesFilter(value: unknown, filter: DataTableFilter | string | undefined, type: DataTableFilterType): boolean;
/** Distribute surplus width without allowing pinned offsets to differ from rendered widths. */
export declare function getFlexSizes<T extends object>(columns: readonly DataTableColumn<T>[], available: number, sizes: Record<string, number>): Record<string, number>;
//# sourceMappingURL=dataTableModel.d.ts.map