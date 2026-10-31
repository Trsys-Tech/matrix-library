import { DataTableContent, type DataTableCellParams, type DataTableColumnDef, type DataTableContentProps } from "../src";

type PriceListRow = {
  id: number;
  name: string;
  createdAt: string;
  modifiedAt: string;
  note?: string;
  status: "draft" | "published";
  active: boolean;
};
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
function expectType<T extends true>(value: T) {
  return value;
}
const renderDate = (date: string) => date;

export const columns: DataTableColumnDef<PriceListRow>[] = [
  {
    field: "createdAt",
    cellDataType: "date",
    cellRenderer: params => {
      expectType<Equal<typeof params.value, string>>(true);
      // @ts-expect-error Strings cannot be used as numbers.
      params.value.toFixed();
      return renderDate(params.value);
    },
  },
  { field: "modifiedAt", cellRenderer: ({ value }) => renderDate(value) },
  {
    field: "id",
    cellRenderer: params => {
      expectType<Equal<typeof params.value, number>>(true);
      // @ts-expect-error Numbers cannot be used as strings.
      renderDate(params.value);
      return params.value.toFixed();
    },
  },
  {
    field: "note",
    cellRenderer: params => {
      expectType<Equal<typeof params.value, string | undefined>>(true);
      return params.value?.toUpperCase();
    },
  },
  {
    field: "status",
    cellRenderer: params => {
      expectType<Equal<typeof params.value, "draft" | "published">>(true);
      return params.value;
    },
  },
  {
    field: "active",
    cellRenderer: params => {
      expectType<Equal<typeof params.value, boolean>>(true);
      return params.value ? "Yes" : "No";
    },
  },
  {
    colId: "actions",
    cellRenderer: params => {
      expectType<Equal<typeof params.data, PriceListRow>>(true);
      expectType<Equal<typeof params.value, unknown>>(true);
      return params.data.name;
    },
  },
];

export function checkUnboundParams(params: DataTableCellParams<PriceListRow>) {
  expectType<Equal<typeof params.value, unknown>>(true);
  return params.value;
}

const GenericRenderer = (params: DataTableCellParams) => {
  expectType<Equal<typeof params.value, unknown>>(true);
  return String(params.value);
};

export const genericRendererColumns: DataTableColumnDef<PriceListRow>[] = [
  { field: "modifiedAt", cellRenderer: GenericRenderer },
  { colId: "actions", cellRenderer: GenericRenderer },
];

const DateRenderer = (props: DataTableCellParams<PriceListRow, PriceListRow["modifiedAt"]>) => {
  expectType<Equal<typeof props.value, string>>(true);
  expectType<Equal<typeof props.data, PriceListRow>>(true);
  return renderDate(props.value);
};

export const reusableRendererColumns: DataTableColumnDef<PriceListRow>[] = [
  { field: "modifiedAt", cellRenderer: DateRenderer },
  // @ts-expect-error A string renderer cannot be attached to a numeric field.
  { field: "id", cellRenderer: DateRenderer },
];

export const computedColumns: DataTableColumnDef<PriceListRow>[] = [
  {
    field: "id",
    valueGetter: ({ data }) => data.id.toString(),
    cellRenderer: (params: DataTableCellParams<PriceListRow>) => {
      // A getter overrides the field, so its result must be checked before use.
      expectType<Equal<typeof params.value, unknown>>(true);
      return typeof params.value === "string" ? renderDate(params.value) : null;
    },
  },
];

export function InlineTable({ rows }: { rows: PriceListRow[] }) {
  return (
    <DataTableContent
      rowData={rows}
      columnDefs={[
        {
          field: "modifiedAt",
          cellRenderer: params => {
            expectType<Equal<typeof params.value, string>>(true);
            return renderDate(params.value);
          },
        },
      ]}
    />
  );
}

export const checkedColumns = [
  {
    field: "modifiedAt",
    cellRenderer: params => {
      expectType<Equal<typeof params.value, string>>(true);
      return renderDate(params.value);
    },
  },
] satisfies DataTableColumnDef<PriceListRow>[];

export const defaultColumn: DataTableContentProps<PriceListRow>["defaultColDef"] = {
  cellRenderer: params => {
    expectType<Equal<typeof params.value, unknown>>(true);
    return String(params.value);
  },
};

export const invalidDefaultColumn: DataTableContentProps<PriceListRow>["defaultColDef"] = {
  // @ts-expect-error Shared defaults cannot assume every column contains a string.
  cellRenderer: DateRenderer,
};
