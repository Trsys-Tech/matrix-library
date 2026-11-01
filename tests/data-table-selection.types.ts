import type { DataTableContentProps, DataTableSelection } from "../src";

type Row = { id: number };

export const selection: DataTableSelection = {
  mode: "multiRow",
  isRowSelectable: row => typeof row === "object",
};

export const reusableSelection: DataTableContentProps<Row>["rowSelection"] = selection;

export const typedSelection: DataTableSelection<Row> = {
  mode: "singleRow",
  isRowSelectable: row => row.id > 0,
};
