import type { DataTableCellParams, DataTableColumnDef } from "../src";

type Row = { createdAt: Date; name: string };
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type Assert<T extends true> = T;
type DefaultValue = Assert<Equal<DataTableCellParams["value"], unknown>>;
type RowValue = Assert<Equal<DataTableCellParams<Row>["value"], Date | string>>;
type FieldValue = Assert<Equal<DataTableCellParams<Row, "createdAt">["value"], Date>>;
export type CellTypeChecks = [DefaultValue, RowValue, FieldValue, DataTableColumnDef<Row>];
