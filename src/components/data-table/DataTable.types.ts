import type * as React from "react";
import type { ColumnDef, Row, TableOptions, TableState, ReactTable } from "@tanstack/react-table";

import type { dataTableFeatures } from "./dataTableFeatures";

export type DataTableFeatures = typeof dataTableFeatures;
export type DataTableState = TableState<DataTableFeatures>;
export type DataTableInstance<T extends object> = ReactTable<DataTableFeatures, T>;
export type DataTableRow<T extends object> = Row<DataTableFeatures, T>;
export type DataTableFilterType = "text" | "number" | "date" | "select";
export type DataTableFilterOperator =
  | "contains"
  | "notContains"
  | "equals"
  | "notEqual"
  | "startsWith"
  | "endsWith"
  | "greaterThan"
  | "greaterThanOrEqual"
  | "lessThan"
  | "lessThanOrEqual"
  | "inRange"
  | "blank"
  | "notBlank";
export type DataTableFilter = { operator: DataTableFilterOperator; value?: string; valueTo?: string };
export type DataTableFilterOption = { value: string; label: string };

export type DataTableCellParams<T extends object> = {
  data: T;
  value: unknown;
  rowId: string;
  /** Original input index; identity and imperative actions use rowId instead. */
  rowIndex: number;
  columnId: string;
  api: DataTableApi<T>;
  /** True for every cell in the active edit row, including its action renderer. */
  isEditing: boolean;
  pinned?: "top" | "bottom";
};

export type DataTableEditorProps<T extends object> = DataTableCellParams<T> & {
  onValueChange: (value: unknown) => void;
  errors: readonly string[];
  commit: () => boolean;
  cancel: () => void;
};

export type DataTableColumn<T extends object> = {
  /** Stable id required for computed or action columns without a field. */
  colId?: string;
  field?: (keyof T & string) | (string & {});
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
  /** Select choices supplied by the caller, including values absent from loaded rows. An empty array disables inferred choices. */
  filterOptions?: readonly (string | DataTableFilterOption)[];
  cellDataType?: "text" | "number" | "date" | "dateString" | "boolean";
  editable?: boolean | ((data: T) => boolean);
  cellRenderer?: React.ComponentType<DataTableCellParams<T>>;
  cellEditor?: React.ComponentType<DataTableEditorProps<T>> | "text" | "number" | "date";
  valueGetter?: (params: { data: T; rowIndex: number }) => unknown;
  valueFormatter?: (params: { data: T; value: unknown }) => React.ReactNode;
  valueParser?: (params: { data: T; oldValue: unknown; newValue: unknown }) => unknown;
  /** Return an updated record for computed/nested fields. Defaults to assigning field. */
  valueSetter?: (data: T, value: unknown) => T;
  getQuickFilterText?: (params: { data: T; value: unknown }) => string;
  cellClass?: string | ((params: DataTableCellParams<T>) => string);
  align?: "start" | "center" | "end";
  /** Omit this column when printing (typically an actions column). */
  hideInPrint?: boolean;
  /** Prevent row selection/click callbacks for interactive content in this column. */
  suppressRowClick?: boolean;
  /** Call preventDefault to replace the table's Enter/Escape/arrow-key behavior. */
  onKeyDown?: (event: React.KeyboardEvent, params: DataTableCellParams<T>) => void;
  validate?: (value: unknown, draft: T) => readonly string[] | null;
  /** Native TanStack options. Hiding and pinning default to false; opt in with enableHiding/enablePinning. */
  tableOptions?: Partial<Omit<ColumnDef<DataTableFeatures, T, any>, "id" | "header" | "cell" | "footer" | "accessorKey" | "accessorFn" | "columns">>;
};

export type DataTableEditEvent<T extends object> = {
  rowId: string;
  original: T;
  data: T;
  changes: Readonly<Record<string, unknown>>;
};

export type DataTableSelection<T extends object> = {
  mode: "singleRow" | "multiRow";
  checkboxes?: boolean;
  enableClickSelection?: boolean;
  selectAll?: "filtered" | "all" | "currentPage";
  isRowSelectable?: (data: T) => boolean;
};

export type DataTableApi<T extends object> = {
  readonly table: DataTableInstance<T>;
  getSelectedRows: () => T[];
  setSelectedRowIds: (ids: readonly string[] | readonly number[]) => void;
  selectAll: (scope?: "filtered" | "all" | "currentPage") => void;
  deselectAll: () => void;
  pinRows: (ids: readonly string[] | readonly number[], position: "top" | "bottom" | false) => void;
  startEditingCell: (cell: { rowId: string | number; columnId: string }) => boolean;
  startEditingRow: (rowId: string | number) => boolean;
  /** Returns false when validation prevents commit. Cancel never commits. */
  stopEditing: (cancel?: boolean) => boolean;
  focusCell: (rowId: string | number, columnId: string) => void;
  scrollToRow: (rowId: string | number, align?: "start" | "center" | "end") => void;
  /** Expands all locally loaded filtered rows; call the returned restore function after capture. */
  preparePrint: () => Promise<() => void>;
  print: () => Promise<void>;
};

export type DataTableContentProps<T extends object> = Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onRowClick"> & {
  rowData: readonly T[] | null | undefined;
  columnDefs: readonly DataTableColumn<T>[];
  defaultColDef?: Partial<DataTableColumn<T>>;
  /** String or numeric application id. Normalized to a string internally and in callbacks. Defaults to data.id, then input index. */
  getRowId?: (data: T, index: number) => string | number;
  onReady?: (api: DataTableApi<T>) => void;
  rowSelection?: DataTableSelection<T>;
  /** Render a full-width detail panel beneath an expanded row. Enables disclosure controls. */
  renderSubComponent?: (params: { row: DataTableRow<T>; api: DataTableApi<T> }) => React.ReactNode;
  /** Detail rows are expandable by default when renderSubComponent is supplied. */
  getRowCanExpand?: (row: DataTableRow<T>) => boolean;
  onSelectionChanged?: (rows: T[], ids: readonly string[]) => void;
  quickFilterText?: string;
  onQuickFilterTextChange?: (value: string) => void;
  externalFilter?: (data: T) => boolean;
  loading?: boolean;
  emptyContent?: React.ReactNode;
  loadingContent?: React.ReactNode;
  rowHeight?: number;
  headerHeight?: number;
  getRowClass?: (data: T) => string;
  rowClassRules?: Record<string, (data: T) => boolean>;
  pinnedTopRowData?: readonly T[];
  pinnedBottomRowData?: readonly T[];
  pagination?: boolean;
  paginationPageSize?: number;
  paginationPageSizeSelector?: readonly number[];
  /** Set false for natural-height tables; print always renders without virtualization. */
  virtualize?: boolean;
  overscan?: number;
  domLayout?: "normal" | "autoHeight" | "print";
  suppressHorizontalScroll?: boolean;
  editType?: "cell" | "fullRow";
  suppressClickEdit?: boolean;
  /** Emit requests without changing local records. The caller owns rowData updates. */
  readOnlyEdit?: boolean;
  validateRow?: (draft: T, original: T) => readonly string[] | null;
  onEditCommit?: (event: DataTableEditEvent<T>) => void;
  onEditRequest?: (event: DataTableEditEvent<T>) => void;
  onEditCancel?: (event: DataTableEditEvent<T>) => void;
  onRowClick?: (params: { data: T; rowId: string; event: React.MouseEvent; api: DataTableApi<T> }) => void;
  /** Native controlled state/callbacks and manual server processing. Features, columns and data are owned by DataTable. */
  tableOptions?: Partial<Omit<TableOptions<DataTableFeatures, T>, "features" | "columns" | "data" | "getRowId">>;
  /** Styles on the scroll viewport, rather than the outer content wrapper. */
  containerStyle?: React.CSSProperties;
};
