import * as React from "react";
// Refresh these snippets with node scripts/generate-data-table-story-sources.mjs after editing examples.
import storySources from "./dataTableStorySources.json";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within, waitFor } from "storybook/test";

import { Button } from "../button/Button";
import { Combobox } from "../combobox/Combobox";
import { DataTableAlignment } from "./DataTableAlignment";
import { DataTable, DataTableActionBar, DataTableContent } from "./DataTable";
import {
  DataTableSearchAction,
  DataTableFreezeAction,
  DataTablePrintAction,
  DataTableRefreshAction,
  DataTableColumnsAction,
  DataTableExtraActions,
} from "./DataTableActions";
import type { DataTableApi, DataTableColumnDef, DataTableEditorProps, DataTableFilter, DataTableState } from "./DataTable.types";
import { matchesFilter } from "./dataTableModel";
import { Chip } from "../chip/Chip";

const meta = {
  title: "Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof DataTable>;
export default meta;
type Story = StoryObj<typeof meta>;

type Vehicle = { id: number; make: string; model: string; price: number; electric: boolean; date: string };
type PriceType = "all" | "expensive" | "cheap";

const rows: Vehicle[] = [
  { id: 1, make: "Tesla", model: "Model Y", price: 64950, electric: true, date: "2026-10-01" },
  { id: 2, make: "Ford", model: "F-Series", price: 33850, electric: false, date: "2026-10-02" },
  { id: 3, make: "Toyota", model: "Corolla", price: 29600, electric: false, date: "2026-10-03" },
  { id: 4, make: "Mercedes", model: "EQA", price: 48890, electric: true, date: "2026-10-04" },
  { id: 5, make: "Fiat", model: "500", price: 15774, electric: false, date: "2026-10-05" },
  { id: 6, make: "Nissan", model: "Juke", price: 20675, electric: false, date: "2026-10-06" },
  { id: 11, make: "BMW", model: "i3", price: 44450, electric: true, date: "2026-10-06" },
  { id: 12, make: "Renault", model: "ZOE", price: 32990, electric: true, date: "2026-11-06" },
  { id: 13, make: "Peugeot", model: "e-208", price: 29900, electric: true, date: "2026-10-06" },
  { id: 14, make: "Opel", model: "Corsa-e", price: 29900, electric: true, date: "2026-08-01" },
  { id: 15, make: "Citroen", model: "C4", price: 29900, electric: true, date: "2026-10-06" },
  { id: 16, make: "Mazda", model: "mtx-30", price: 33990, electric: true, date: "2026-07-18" },
  { id: 17, make: "Mini", model: "Cooper SE", price: 32000, electric: true, date: "2025-02-11" },
  { id: 18, make: "Seat", model: "Mii Electric", price: 20990, electric: true, date: "2026-10-06" },
  { id: 19, make: "Skoda", model: "Citigo-e", price: 20990, electric: true, date: "2026-10-06" },
  { id: 20, make: "Smart", model: "EQ forfour", price: 22900, electric: true, date: "2026-10-06" },
  { id: 21, make: "Honda", model: "e", price: 34900, electric: true, date: "2026-10-06" },
  { id: 22, make: "DS", model: "3 Crossback E-Tense", price: 39900, electric: true, date: "2026-10-06" },
  { id: 23, make: "Lexus", model: "UX 300e", price: 49900, electric: true, date: "2026-10-06" },
  { id: 24, make: "Polestar", model: "2", price: 59900, electric: true, date: "2026-10-06" },
  { id: 25, make: "Volvo", model: "XC40 Recharge", price: 59900, electric: true, date: "2026-10-06" },
  { id: 26, make: "Jaguar", model: "I-Pace", price: 69900, electric: true, date: "2026-10-06" },
  { id: 27, make: "Porsche", model: "Taycan", price: 83950, electric: true, date: "2026-10-06" },
  { id: 28, make: "Audi", model: "e-tron GT", price: 99900, electric: true, date: "2026-10-06" },
  { id: 29, make: "Mercedes", model: "EQS", price: 106374, electric: true, date: "2026-10-06" },
  { id: 30, make: "Tesla", model: "Model S", price: 79490, electric: true, date: "2026-10-06" },
  { id: 31, make: "Tesla", model: "Model 3", price: 39990, electric: true, date: "2026-10-06" },
  { id: 32, make: "Porsche", model: "Taycan Cross Turismo", price: 93950, electric: true, date: "2026-10-06" },
];
const getVehicleRowId = (row: Vehicle) => row.id;
const columns: DataTableColumnDef<Vehicle>[] = [
  { field: "make", headerName: "Make", filter: "select", flex: 1, minWidth: 120 },
  {
    field: "model",
    headerName: "Model",
    filter: "text",
    flex: 1,
    minWidth: 140,
    editable: true,
    tableOptions: { enableHiding: true, enablePinning: true },
    cellRenderer: params => <span>{params.value}</span>,
  },
  {
    field: "price",
    headerName: "Price",
    filter: "number",
    cellDataType: "number",
    width: 130,
    align: "end",
    editable: true,
    valueFormatter: ({ value }) => Number(value).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }),
  },
  {
    field: "electric",
    headerName: "Fuel",
    width: 110,
    valueGetter: ({ data }) => (data.electric ? "Electric" : "Gasoline"),
    // we can also use below approach, but current one is better
    // valueFormatter: ({ value }) => (value ? "Electric" : "Gasoline"),
    // getQuickFilterText: ({ value }) => (value ? "Electric" : "Gasoline"),
  },
  { field: "date", headerName: "Updated", filter: "date", cellDataType: "dateString", width: 135 },
];

function ListExample() {
  const [priceType, setPriceType] = React.useState<PriceType>("all");
  const [selected, setSelected] = React.useState<Vehicle[]>([]);
  const predicate = React.useCallback(
    (row: Vehicle) => {
      if (row.price === undefined) {
        return false;
      }

      switch (priceType) {
        case "expensive":
          return row.price > 30000;
        case "cheap":
          return row.price < 30000;
        default:
          return true;
      }
    },
    [priceType],
  );

  const externalFilterChanged = (newValue: PriceType) => {
    setPriceType(newValue);
  };

  return (
    <div className="mtx-space-y-2 mtx-p-4">
      <div className="mtx-h-96">
        <DataTable>
          <DataTableActionBar>
            {/* <Button type="button" size="sm" variant={electricOnly ? "primary" : "text"} onClick={() => setElectricOnly(value => !value)}>
              Electric only
            </Button> */}
            <DataTableSearchAction defaultOpen defaultOpenAutoFocus={false} />
            <div className="mtx-flex mtx-items-center mtx-gap-2 mtx-me-2">
              <Chip asChild className="mtx-h-6 mtx-cursor-pointer" variant={priceType === "all" ? "primary" : "neutral"}>
                <button type="button" onClick={() => externalFilterChanged("all")}>
                  All
                </button>
              </Chip>
              <Chip asChild className="mtx-h-6 mtx-cursor-pointer" variant={priceType === "expensive" ? "primary" : "neutral"}>
                <button type="button" onClick={() => externalFilterChanged("expensive")}>
                  Expensive Cars
                </button>
              </Chip>
              <Chip asChild className="mtx-h-6 mtx-cursor-pointer" variant={priceType === "cheap" ? "primary" : "neutral"}>
                <button type="button" onClick={() => externalFilterChanged("cheap")}>
                  Cheap Cars
                </button>
              </Chip>
            </div>
            <DataTableFreezeAction className="mtx-ms-auto" />
            <DataTableColumnsAction />
            <DataTablePrintAction />
            <DataTableRefreshAction onRefresh={() => {}} />
            <DataTableExtraActions>
              <Button type="button" variant="text">
                Custom report action
              </Button>
            </DataTableExtraActions>
          </DataTableActionBar>
          <DataTableContent
            rowData={rows}
            columnDefs={columns}
            externalFilter={predicate}
            getRowId={getVehicleRowId}
            rowSelection={{ mode: "multiRow", selectAll: "filtered", isRowSelectable: row => row.id !== 3 }}
            onSelectionChanged={setSelected}
            pagination
            paginationPageSize={5}
            paginationPageSizeSelector={[2, 5, 10]}
          />
        </DataTable>
      </div>
      <p className="mtx-text-xs" aria-live="polite">
        Selected: {selected.map(row => row.make).join(", ") || "none"}
      </p>
    </div>
  );
}

export const WithActionBar: Story = { parameters: { docs: { source: { code: storySources.WithActionBar } } }, render: () => <ListExample /> };

function ColumnDraggingExample() {
  return (
    <DataTableAlignment>
      <div className="mtx-space-y-4 mtx-p-4">
        {[rows.slice(0, 2), rows.slice(2, 4)].map((data, index) => (
          <div key={index} className="mtx-h-48">
            <DataTable>
              <DataTableContent rowData={data} columnDefs={columns} virtualize={false} />
            </DataTable>
          </div>
        ))}
      </div>
    </DataTableAlignment>
  );
}

export const ColumnDragAndDrop: Story = {
  parameters: { docs: { source: { code: storySources.ColumnDragAndDrop } } },
  render: () => <ColumnDraggingExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const grids = canvas.getAllByRole("grid");
    const first = within(grids[0]);
    // Keyboard input uses the same drag operation and drop handler as pointer/touch input.
    first.getByRole("columnheader", { name: "Model" }).focus();
    await userEvent.keyboard("[Space][ArrowRight][Space]");
    await waitFor(() => {
      for (const grid of grids) {
        expect(Array.from(grid.querySelectorAll('[role="columnheader"][data-column-id]'), header => header.getAttribute("data-column-id"))).toEqual([
          "make",
          "price",
          "model",
          "electric",
          "date",
        ]);
        const row = grid.querySelector('[role="row"][data-row-id]')!;
        expect(Array.from(row.querySelectorAll('[role="gridcell"]'), cell => cell.getAttribute("data-column-id"))).toEqual([
          "make",
          "price",
          "model",
          "electric",
          "date",
        ]);
      }
    });
    await expect(grids[0].querySelector('[role="columnheader"][data-column-id="model"]')).toHaveAttribute("aria-sort", "none");
    first.getByRole("columnheader", { name: "Model" }).focus();
    await userEvent.keyboard("[Space][ArrowLeft][Escape]");
    await waitFor(() =>
      expect(Array.from(grids[0].querySelectorAll('[role="columnheader"][data-column-id]'), header => header.getAttribute("data-column-id"))).toEqual(
        ["make", "price", "model", "electric", "date"],
      ),
    );
    await userEvent.click(first.getByRole("button", { name: "Sort Model" }));
    await expect(first.getByRole("columnheader", { name: "Model" })).toHaveAttribute("aria-sort", "ascending");
  },
};

export const SearchSelectionAndPinning: Story = {
  parameters: { docs: { source: { code: storySources.SearchSelectionAndPinning } } },
  render: () => <ListExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const search = canvas.getByRole("textbox", { name: "Search table" });
    await expect(canvas.getByRole("checkbox", { name: "Select row 3" })).toBeDisabled();
    await userEvent.type(search, "Ford");
    await waitFor(() => expect(canvas.getByText("F-Series")).toBeVisible());
    await waitFor(() => expect(canvas.queryByText("Model Y")).not.toBeInTheDocument());
    await userEvent.click(canvas.getByRole("checkbox", { name: "Select row 2" }));
    await waitFor(() => expect(canvas.getByText("Selected: Ford")).toBeVisible());
    await userEvent.click(canvas.getByRole("button", { name: "Freeze" }));
    await userEvent.clear(search);
    await expect(canvasElement.querySelector('[role="row"][data-row-id="2"]')).toHaveAttribute("data-pinned", "top");
    await userEvent.click(canvas.getByRole("button", { name: "Cheap Cars" }));
    // Frozen rows remain visible through external filtering and pagination.
    await waitFor(() => expect(canvas.getByText("F-Series")).toBeVisible());
    await userEvent.click(canvas.getByRole("button", { name: "Unfreeze" }));
    await waitFor(() => expect(canvas.queryByText("F-Series")).not.toBeInTheDocument());
    await userEvent.click(canvas.getByRole("button", { name: "All" }));
  },
};

function FuelEditor({ value, onValueChange }: DataTableEditorProps<Vehicle>) {
  return (
    <Combobox
      options={[
        { label: "Electric", value: "electric" },
        { label: "Gasoline", value: "gas" },
      ]}
      value={value ? "electric" : "gas"}
      onValueChange={next => onValueChange(next === "electric")}
      className="mtx-w-full"
    />
  );
}
const editingColumns: DataTableColumnDef<Vehicle>[] = [
  ...columns.map(column => (column.field === "electric" ? { ...column, editable: true, cellEditor: FuelEditor } : column)),
  {
    colId: "actions",
    headerName: "Actions",
    width: 100,
    pinned: "end",
    sortable: false,
    hideInPrint: true,
    cellRenderer: ({ data, api }) => (
      <Button type="button" variant="text" size="sm" aria-label={`Edit ${data.make}`} onClick={() => api.startEditingRow(data.id)}>
        Edit
      </Button>
    ),
  },
];

function EditingExample({ controlled = false }: { controlled?: boolean }) {
  const [data, setData] = React.useState(rows.slice(0, 3));
  const [message, setMessage] = React.useState("No changes");
  return (
    <div className="mtx-space-y-2 mtx-p-4">
      <div className="mtx-h-80">
        <DataTable>
          <DataTableContent
            rowData={data}
            columnDefs={editingColumns}
            editType="fullRow"
            readOnlyEdit={controlled}
            validateRow={draft => (!draft.model.trim() ? ["Model is required"] : draft.price <= 0 ? ["Price must be positive"] : null)}
            onEditCommit={event => setMessage(`Saved ${event.data.model}`)}
            onEditRequest={event => {
              setData(previous => previous.map(row => (row.id === event.original.id ? event.data : row)));
              setMessage(`Requested ${event.data.model}`);
            }}
          />
        </DataTable>
      </div>
      <p className="mtx-text-xs" aria-live="polite">
        {message}
      </p>
    </div>
  );
}

export const ValidatedRowEditing: Story = {
  parameters: { docs: { source: { code: storySources.ValidatedRowEditing } } },
  render: () => <EditingExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Edit Tesla" }));
    await waitFor(() => expect(canvas.getByRole("textbox", { name: "Edit Model" })).toHaveFocus());
    const fuel = canvas.getByRole("combobox");
    fuel.focus();
    await userEvent.keyboard("{Enter}");
    await waitFor(() => expect(canvas.getByRole("combobox")).toHaveAttribute("aria-expanded", "true"));
    await userEvent.click(within(canvasElement.ownerDocument.body).getByRole("option", { name: "Gasoline" }));
    await expect(canvas.getByRole("button", { name: "Save" })).toBeVisible();
    await userEvent.clear(canvas.getByRole("textbox", { name: "Edit Model" }));
    await userEvent.click(canvas.getByRole("button", { name: "Save" }));
    await expect(canvas.getByRole("alert")).toHaveTextContent("Model is required");
    await userEvent.click(canvas.getByRole("button", { name: "Cancel" }));
    await expect(canvas.getByText("Model Y")).toBeVisible();
    for (const model of ["Model Z", "Model Z2"]) {
      await userEvent.click(canvas.getByRole("button", { name: "Edit Tesla" }));
      await userEvent.clear(canvas.getByRole("textbox", { name: "Edit Model" }));
      await userEvent.type(canvas.getByRole("textbox", { name: "Edit Model" }), model);
      await userEvent.click(canvas.getByRole("button", { name: "Save" }));
      await expect(canvas.getByText(model, { exact: true })).toBeVisible();
      await expect(canvas.getByText(`Saved ${model}`)).toBeVisible();
    }
  },
};

export const ControlledEditRequests: Story = {
  parameters: { docs: { source: { code: storySources.ControlledEditRequests } } },
  render: () => <EditingExample controlled />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Edit Ford" }));
    await userEvent.clear(canvas.getByRole("textbox", { name: "Edit Model" }));
    await userEvent.type(canvas.getByRole("textbox", { name: "Edit Model" }), "Updated by parent");
    await userEvent.click(canvas.getByRole("button", { name: "Save" }));
    await expect(canvas.getByText("Requested Updated by parent")).toBeVisible();
    await expect(canvas.getByText("Updated by parent", { exact: true })).toBeVisible();
  },
};

export const ColumnFilters: Story = {
  parameters: { docs: { source: { code: storySources.ColumnFilters } } },
  render: () => <ListExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Column options price" }));
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.selectOptions(body.getByRole("combobox", { name: "Filter operator" }), "greaterThan");
    await userEvent.type(body.getByRole("spinbutton", { name: "Filter value" }), "40000");
    await userEvent.click(body.getByRole("button", { name: "Apply" }));
    await waitFor(() => expect(canvas.getByText("Model Y")).toBeVisible());
    await waitFor(() => expect(canvas.getByText("EQA")).toBeVisible());
    // Exit copies stay in the DOM until the fade finishes. Verify removal after that transition.
    await waitFor(() => expect(canvas.queryByText("F-Series")).not.toBeInTheDocument());
    await userEvent.click(canvas.getByRole("button", { name: "Sort Price" }));
    const dataRows = canvasElement.querySelectorAll('[role="row"][data-row-id]');
    await expect(dataRows[0]).toHaveAttribute("data-row-id", "11");
    await userEvent.click(canvas.getByRole("button", { name: "Column options price" }));
    await userEvent.clear(body.getByRole("spinbutton", { name: "Filter value" }));
    await userEvent.type(body.getByRole("spinbutton", { name: "Filter value" }), "999999999");
    await userEvent.click(body.getByRole("button", { name: "Apply" }));
    await waitFor(() => expect(canvas.getByText("No rows to display")).toBeVisible());
    await userEvent.click(canvas.getByRole("button", { name: "Column options price" }));
    await userEvent.click(body.getByRole("button", { name: "Reset" }));
    await expect(canvas.queryByText("No rows to display")).not.toBeInTheDocument();
    await waitFor(() => expect(canvas.getByText("500", { exact: true })).toBeVisible());
  },
};

function FilterStateExample({ controlled }: { controlled: boolean }) {
  const ref = React.useRef<DataTableApi<Vehicle>>(null);
  const [columnFilters, setColumnFilters] = React.useState<DataTableState["columnFilters"]>([]);
  return (
    <div className="mtx-h-96 mtx-p-4">
      <DataTable>
        <DataTableActionBar>
          <DataTableSearchAction defaultOpen defaultOpenAutoFocus={false} />
          <Button
            type="button"
            onClick={() => {
              ref.current?.table.getColumn("make")?.setFilterValue({ operator: "equals", value: "Tesla" });
              ref.current?.table.getColumn("price")?.setFilterValue({ operator: "greaterThan", value: "70000" });
            }}
          >
            Apply filter preset
          </Button>
          <Button type="button" onClick={() => ref.current?.table.resetColumnFilters(true)}>
            Clear column filters
          </Button>
        </DataTableActionBar>
        <DataTableContent
          ref={ref}
          rowData={rows}
          columnDefs={columns}
          virtualize={false}
          tableOptions={{
            initialState: { globalFilter: "Tesla" },
            ...(controlled ? { state: { columnFilters }, onColumnFiltersChange: setColumnFilters } : {}),
          }}
        />
      </DataTable>
    </div>
  );
}

export const FilterState: Story = {
  parameters: { docs: { source: { code: storySources.FilterState } } },
  render: () => (
    <>
      <FilterStateExample controlled={false} />
      <FilterStateExample controlled />
    </>
  ),
  play: async ({ canvasElement }) => {
    const tables = canvasElement.querySelectorAll<HTMLElement>("[data-data-table]");
    for (const table of tables) {
      const canvas = within(table);
      await expect(canvas.getByRole("textbox", { name: "Search table" })).toHaveValue("Tesla");
      await waitFor(() => expect(canvas.getByText("Model Y", { exact: true })).toBeVisible());
      await waitFor(() => expect(canvas.queryByText("F-Series", { exact: true })).not.toBeInTheDocument());
      await userEvent.click(canvas.getByRole("button", { name: "Apply filter preset" }));
      await userEvent.click(canvas.getByRole("button", { name: "Clear search" }));
      await waitFor(() => expect(canvas.getByText("Model S", { exact: true })).toBeVisible());
      await waitFor(() => expect(canvas.queryByText("Model Y", { exact: true })).not.toBeInTheDocument());
      await waitFor(() => expect(canvas.queryByText("EQS", { exact: true })).not.toBeInTheDocument());
      await userEvent.click(canvas.getByRole("button", { name: "Clear column filters" }));
      await waitFor(() => expect(canvas.getByText("Model Y", { exact: true })).toBeVisible());
      await waitFor(() => expect(canvas.getByText("F-Series", { exact: true })).toBeVisible());
      await userEvent.type(canvas.getByRole("textbox", { name: "Search table" }), "Ford");
      await waitFor(() => expect(canvas.queryByText("Model Y", { exact: true })).not.toBeInTheDocument());
      await userEvent.click(canvas.getByRole("button", { name: "Clear search" }));
      await waitFor(() => expect(canvas.getByText("Model Y", { exact: true })).toBeVisible());
    }
  },
};

export const SelectFilters: Story = {
  parameters: { docs: { source: { code: storySources.SelectFilters } } },
  render: () => (
    <div className="mtx-h-96 mtx-p-4">
      <DataTable>
        <DataTableContent
          rowData={rows}
          columnDefs={columns.map(column => (column.field === "make" ? { ...column, filter: "select" } : column))}
          virtualize={false}
        />
      </DataTable>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole("button", { name: "Column options make" }));
    await userEvent.selectOptions(body.getByRole("combobox", { name: "Filter value" }), "Tesla");
    await userEvent.click(body.getByRole("button", { name: "Apply" }));
    await waitFor(() => expect(canvas.getByText("Model Y")).toBeVisible());
    await waitFor(() => expect(canvas.queryByText("F-Series")).not.toBeInTheDocument());
    await userEvent.click(canvas.getByRole("button", { name: "Column options make" }));
    await expect(body.getByRole("option", { name: "Ford" })).toBeInTheDocument();
    await userEvent.selectOptions(body.getByRole("combobox", { name: "Filter value" }), "Ford");
    await userEvent.click(body.getByRole("button", { name: "Apply" }));
    await waitFor(() => expect(canvas.getByText("F-Series")).toBeVisible());
    await waitFor(() => expect(canvas.queryByText("Model Y")).not.toBeInTheDocument());
    await userEvent.click(canvas.getByRole("button", { name: "Column options make" }));
    await userEvent.click(body.getByRole("button", { name: "Reset" }));
    await waitFor(() => expect(canvas.getByText("Model Y")).toBeVisible());
    await waitFor(() => expect(canvas.getByText("F-Series")).toBeVisible());
  },
};

const externalColumns: DataTableColumnDef<Vehicle>[] = columns.map(column =>
  column.field === "make"
    ? { ...column, filterOptions: [...new Set(rows.map(row => row.make))].sort().map(value => ({ value, label: `${value} vehicles` })) }
    : column,
);

function ExternalDataExample() {
  const [columnFilters, setColumnFilters] = React.useState<DataTableState["columnFilters"]>([]);
  const [sorting, setSorting] = React.useState<DataTableState["sorting"]>([]);
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 5 });
  const [search, setSearch] = React.useState("");
  const [result, setResult] = React.useState({ rows: rows.slice(0, 5), total: rows.length });
  const [loading, setLoading] = React.useState(false);
  console.log(sorting);

  React.useEffect(() => {
    const loadingTimer = setTimeout(() => setLoading(true), 0);
    // Simulated API boundary: DataTable receives only the externally processed page.
    const timer = setTimeout(() => {
      const filtered = rows.filter(
        row =>
          `${row.make} ${row.model}`.toLowerCase().includes(search.toLowerCase()) &&
          columnFilters.every(({ id, value }) =>
            matchesFilter(
              row[id as keyof Vehicle],
              value as DataTableFilter,
              id === "price" ? "number" : id === "date" ? "date" : id === "make" ? "select" : "text",
            ),
          ),
      );
      filtered.sort((a, b) => {
        for (const { id, desc } of sorting) {
          const left = a[id as keyof Vehicle];
          const right = b[id as keyof Vehicle];
          const order = typeof left === "number" && typeof right === "number" ? left - right : String(left).localeCompare(String(right));
          if (order) return desc ? -order : order;
        }
        return 0;
      });
      const start = pagination.pageIndex * pagination.pageSize;
      setResult({ rows: filtered.slice(start, start + pagination.pageSize), total: filtered.length });
      setLoading(false);
    }, 500);
    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(timer);
    };
  }, [columnFilters, sorting, pagination, search]);

  const resetPage = () => setPagination(previous => ({ ...previous, pageIndex: 0 }));
  return (
    <div className="mtx-h-96 mtx-p-4">
      <DataTable>
        <DataTableActionBar>
          <DataTableSearchAction
            value={search}
            onValueChange={value => {
              setSearch(value);
              resetPage();
            }}
            defaultOpen
          />
        </DataTableActionBar>
        <DataTableContent
          rowData={result.rows}
          columnDefs={externalColumns}
          loading={loading}
          virtualize={false}
          pagination
          paginationPageSizeSelector={[5, 10, 25]}
          tableOptions={{
            manualFiltering: true,
            manualSorting: true,
            manualPagination: true,
            rowCount: result.total,
            state: { columnFilters, sorting, pagination },
            onColumnFiltersChange: updater => {
              setColumnFilters(updater);
              resetPage();
            },
            onSortingChange: updater => {
              setSorting(updater);
              resetPage();
            },
            onPaginationChange: setPagination,
          }}
        />
      </DataTable>
    </div>
  );
}

export const ExternalData: Story = {
  parameters: { docs: { source: { code: storySources.ExternalData } } },
  render: () => <ExternalDataExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() => expect(canvas.getByText("Model Y")).toBeVisible());
    await userEvent.click(canvas.getByRole("button", { name: "Next page" }));
    await waitFor(() => expect(canvas.getByText("Juke")).toBeVisible());
    await userEvent.click(canvas.getByRole("button", { name: "Sort Price" }));
    await waitFor(() => expect(canvas.getByText("500")).toBeVisible());
    await expect(canvas.getByText("Page 1 of 6")).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Column options make" }));
    await expect(body.getByRole("option", { name: "Tesla vehicles" })).toBeInTheDocument();
    await userEvent.selectOptions(body.getByRole("combobox", { name: "Filter value" }), "Tesla");
    await userEvent.click(body.getByRole("button", { name: "Apply" }));
    await waitFor(() => expect(canvas.getByText("Model 3")).toBeVisible());
    await waitFor(() => expect(canvas.queryByText("500")).not.toBeInTheDocument());
    await userEvent.click(canvas.getByRole("button", { name: "Column options make" }));
    await userEvent.click(body.getByRole("button", { name: "Reset" }));
    await waitFor(() => expect(canvas.getByText("500")).toBeVisible());
    await userEvent.type(canvas.getByRole("textbox", { name: "Search table" }), "Corolla");
    await waitFor(() => expect(canvas.getByText("Corolla")).toBeVisible());
    await waitFor(() => expect(canvas.queryByText("500")).not.toBeInTheDocument());
    await userEvent.clear(canvas.getByRole("textbox", { name: "Search table" }));
    await userEvent.type(canvas.getByRole("textbox", { name: "Search table" }), "no matching vehicle");
    await waitFor(() => expect(canvas.getByText("No rows to display")).toBeVisible());
    await userEvent.click(canvas.getByRole("button", { name: "Clear search" }));
    await waitFor(() => expect(canvas.getByText("500")).toBeVisible());
    await userEvent.selectOptions(canvas.getByRole("combobox", { name: "Rows per page" }), "10");
    await waitFor(() => expect(canvas.getByText("Page 1 of 3")).toBeVisible());
  },
};

const summary: Vehicle = { id: 0, make: "Total", model: "", price: rows.reduce((sum, row) => sum + row.price, 0), electric: false, date: "" };
export const SummaryRows: Story = {
  parameters: { docs: { source: { code: storySources.SummaryRows } } },
  render: () => (
    <div className="mtx-h-96 mtx-p-4">
      <DataTable>
        <DataTableActionBar>
          <DataTablePrintAction />
        </DataTableActionBar>
        <DataTableContent
          rowData={rows}
          columnDefs={columns}
          pinnedBottomRowData={[summary]}
          getRowClass={row => (row.id === summary.id ? "mtx-font-bold" : "")}
        />
      </DataTable>
    </div>
  ),
};

const keyboardRows = rows.slice(0, 6);
export const CellKeyboardNavigation: Story = {
  parameters: { docs: { source: { code: storySources.CellKeyboardNavigation } } },
  render: () => (
    <div className="mtx-space-y-4 mtx-p-4">
      {(["ltr", "rtl"] as const).map(direction => (
        <DataTable key={direction} dir={direction}>
          <DataTableContent
            aria-label={`${direction} keyboard navigation`}
            rowData={keyboardRows.slice(0, 1)}
            virtualize={false}
            columnDefs={[
              { field: "make" },
              {
                colId: "disabled",
                cellRenderer: () => (
                  <button type="button" disabled>
                    Unavailable
                  </button>
                ),
              },
              {
                colId: "mixed",
                cellRenderer: () => (
                  <>
                    <button type="button" disabled>
                      Unavailable
                    </button>
                    <button type="button">Available</button>
                  </>
                ),
              },
            ]}
          />
        </DataTable>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    for (const direction of ["ltr", "rtl"]) {
      const grid = within(canvasElement).getByRole("grid", { name: `${direction} keyboard navigation` });
      const cell = (columnId: string) => grid.querySelector<HTMLElement>(`[role="gridcell"][data-column-id="${columnId}"]`)!;
      const forward = direction === "rtl" ? "ArrowLeft" : "ArrowRight";
      const backward = direction === "rtl" ? "ArrowRight" : "ArrowLeft";
      cell("make").focus();
      await userEvent.keyboard(`{${forward}}`);
      await waitFor(() => expect(cell("disabled")).toHaveFocus());
      await userEvent.keyboard(`{${backward}}`);
      await waitFor(() => expect(cell("make")).toHaveFocus());
      await userEvent.keyboard(`{${forward}}`);
      await waitFor(() => expect(cell("disabled")).toHaveFocus());
      await userEvent.keyboard(`{${forward}}`);
      await waitFor(() => expect(within(cell("mixed")).getByRole("button", { name: "Available" })).toHaveFocus());
    }
  },
};

export const PinnedRowKeyboardNavigation: Story = {
  parameters: { docs: { source: { code: storySources.PinnedRowKeyboardNavigation } } },
  render: () => (
    <div className="mtx-h-96 mtx-p-4">
      <DataTable>
        <DataTableContent
          rowData={keyboardRows}
          columnDefs={columns}
          getRowId={getVehicleRowId}
          tableOptions={{ initialState: { rowPinning: { top: ["1", "2"], bottom: ["5", "6"] } } }}
        />
      </DataTable>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const cell = (rowId: string, columnId: string) =>
      canvasElement.querySelector<HTMLElement>(`[role="gridcell"][data-row-id="${rowId}"][data-column-id="${columnId}"]`)!;
    await expect(cell("1", "make").closest('[role="row"]')).toHaveAttribute("data-pinned", "top");
    await expect(cell("5", "make").closest('[role="row"]')).toHaveAttribute("data-pinned", "bottom");
    cell("1", "make").focus();
    for (const [key, rowId, columnId] of [
      ["ArrowRight", "1", "model"],
      ["ArrowLeft", "1", "make"],
      ["ArrowDown", "2", "make"],
      ["ArrowDown", "3", "make"],
      ["ArrowUp", "2", "make"],
      ["ArrowDown", "3", "make"],
      ["ArrowDown", "4", "make"],
      ["ArrowDown", "5", "make"],
      ["ArrowDown", "6", "make"],
      ["ArrowUp", "5", "make"],
      ["ArrowUp", "4", "make"],
    ]) {
      await userEvent.keyboard(`{${key}}`);
      await waitFor(() => expect(cell(rowId, columnId)).toHaveFocus());
    }
  },
};

const reportColumns: DataTableColumnDef<Vehicle>[] = [
  ...columns,
  ...Array.from({ length: 6 }, (_, index) => ({
    colId: `period-${index}`,
    headerName: `Period ${index + 1}`,
    width: 140,
    valueGetter: ({ data }: { data: Vehicle }) => data.price * (index + 1),
  })),
];
export const AlignedTables: Story = {
  parameters: { docs: { source: { code: storySources.AlignedTables } } },
  render: () => (
    <DataTableAlignment>
      <div className="mtx-space-y-4 mtx-p-4">
        {[rows.slice(0, 2), rows.slice(2), [summary]].map((data, index) => (
          <div key={index} className="mtx-h-48">
            <DataTable>
              <DataTableContent rowData={data} columnDefs={reportColumns} />
            </DataTable>
          </div>
        ))}
      </div>
    </DataTableAlignment>
  ),
  play: async ({ canvasElement }) => {
    const grids = within(canvasElement).getAllByRole("grid");
    const first = within(grids[0]);
    await userEvent.click(first.getByRole("button", { name: "Column options model" }));
    await userEvent.click(within(canvasElement.ownerDocument.body).getByRole("button", { name: "Hide column" }));
    for (const grid of grids) await expect(within(grid).queryByRole("button", { name: "Sort Model" })).not.toBeInTheDocument();
  },
};

const manyRows: Vehicle[] = Array.from({ length: 10_000 }, (_, index) => ({ ...rows[index % rows.length], id: index, model: `Vehicle ${index}` }));
function VirtualExample() {
  const ref = React.useRef<DataTableApi<Vehicle>>(null);
  return (
    <div className="mtx-h-[500px] mtx-p-4">
      <DataTable>
        <DataTableActionBar>
          <DataTableSearchAction />
          <Button type="button" variant="text" onClick={() => ref.current?.scrollToRow(9999)}>
            Go to last row
          </Button>
        </DataTableActionBar>
        <DataTableContent ref={ref} rowData={manyRows} columnDefs={columns} />
      </DataTable>
    </div>
  );
}
export const Virtualized: Story = {
  parameters: { docs: { source: { code: storySources.Virtualized } } },
  render: () => <VirtualExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Go to last row" }));
    await expect(await canvas.findByText("Vehicle 9999")).toBeVisible();
    await expect(canvasElement.querySelectorAll('[role="row"][data-row-id]').length).toBeLessThan(80);
  },
};

export const PrintLayout: Story = {
  parameters: { docs: { source: { code: storySources.PrintLayout } } },
  render: () => (
    <div className="mtx-p-4">
      <DataTable style={{ height: "auto" }}>
        <DataTableContent
          rowData={rows}
          columnDefs={editingColumns}
          domLayout="print"
          pagination
          paginationPageSize={2}
          pinnedBottomRowData={[summary]}
        />
      </DataTable>
    </div>
  ),
};

export const ExpandableRows: Story = {
  parameters: { docs: { source: { code: storySources.ExpandableRows } } },
  render: () => (
    <div className="mtx-h-96 mtx-p-4">
      <DataTable>
        <DataTableContent
          rowData={rows}
          columnDefs={columns}
          getRowId={getVehicleRowId}
          rowSelection={{ mode: "multiRow", enableClickSelection: true }}
          getRowCanExpand={row => row.original.electric}
          renderSubComponent={({ row }) => (
            <div className="mtx-space-y-2">
              <p className="mtx-font-bold">
                {row.original.make} {row.original.model} details
              </p>
              <p>Electric vehicle · Updated {row.original.date}</p>
              <Button type="button" size="sm" variant="text" onClick={() => row.toggleExpanded(false)}>
                Close details
              </Button>
            </div>
          )}
          pagination
          paginationPageSize={5}
        />
      </DataTable>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("button", { name: "Expand row 1" });
    await userEvent.click(toggle);
    await expect(canvas.getByText("Tesla Model Y details")).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Collapse row 1" })).toHaveAttribute("aria-expanded", "true");
    await expect(canvas.getByRole("checkbox", { name: "Select row 1" })).toHaveAttribute("aria-checked", "false");
    await expect(canvas.queryByRole("button", { name: "Expand row 2" })).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Close details" }));
    await expect(canvas.queryByText("Tesla Model Y details")).not.toBeInTheDocument();
    await userEvent.tab();
    canvas.getByRole("button", { name: "Expand row 1" }).focus();
    await userEvent.keyboard("{Enter}");
    await expect(canvas.getByText("Tesla Model Y details")).toBeVisible();
  },
};
