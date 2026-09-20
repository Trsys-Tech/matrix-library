import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import type {
  ColDef,
  DoesExternalFilterPass,
  GetRowIdFunc,
  GridApi,
  GridReadyEvent,
  ICellRendererParams,
  ITextFilterParams,
} from "ag-grid-community";

import { Button } from "../button/Button";
import { Chip } from "../chip/Chip";
import { DataGrid, DataGridActionBar, DataGridContent, ExtraActions, FreezeAction, PrintAction, RefreshAction, SearchAction } from "./DataGrid";

const meta = {
  title: "Components/DataGrid",
  component: DataGrid,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    children: null,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof DataGrid>;

type Story = StoryObj<typeof meta>;

type Row = { id: number; make: string; model: string; price: number; electric: boolean };
type PriceType = "all" | "expensive" | "cheap";

const onEdit = fn();
const onRefresh = fn();

const getRowId: GetRowIdFunc<Row> = ({ data }) => String(data.id);

const colDefs: ColDef<Row>[] = [
  {
    field: "make",
    filter: true,
    filterParams: {
      buttons: ["reset", "apply"],
    } as ITextFilterParams,
    flex: 1,
  },
  { field: "model", editable: true, flex: 1 },
  {
    field: "price",
    cellRenderer: (params: ICellRendererParams<Row, number>) => <strong>{params.value}</strong>,
    filter: "agNumberColumnFilter",
    flex: 1,
  },
  { field: "electric", editable: true, getQuickFilterText: params => (params.value ? "Electric" : "Gasoline"), flex: 1 },
];

const rowData: Row[] = [
  { id: 1, make: "Tesla", model: "Model Y", price: 64950, electric: true },
  { id: 2, make: "Ford", model: "F-Series", price: 33850, electric: false },
  { id: 3, make: "Toyota", model: "Corolla", price: 29600, electric: false },
  { id: 4, make: "Mercedes", model: "EQA", price: 48890, electric: true },
  { id: 5, make: "Fiat", model: "500", price: 15774, electric: false },
  { id: 6, make: "Nissan", model: "Juke", price: 20675, electric: false },
  { id: 7, make: "Volkswagen", model: "ID.4", price: 39995, electric: true },
  { id: 8, make: "Audi", model: "Q4 e-tron", price: 45000, electric: true },
  { id: 9, make: "Hyundai", model: "Kona", price: 20990, electric: true },
  { id: 10, make: "Kia", model: "Soul", price: 17300, electric: true },
  { id: 11, make: "BMW", model: "i3", price: 44450, electric: true },
  { id: 12, make: "Renault", model: "ZOE", price: 32990, electric: true },
  { id: 13, make: "Peugeot", model: "e-208", price: 29900, electric: true },
  { id: 14, make: "Opel", model: "Corsa-e", price: 29900, electric: true },
  { id: 15, make: "Citroen", model: "C4", price: 29900, electric: true },
  { id: 16, make: "Mazda", model: "mtx-30", price: 33990, electric: true },
  { id: 17, make: "Mini", model: "Cooper SE", price: 32000, electric: true },
  { id: 18, make: "Seat", model: "Mii Electric", price: 20990, electric: true },
  { id: 19, make: "Skoda", model: "Citigo-e", price: 20990, electric: true },
  { id: 20, make: "Smart", model: "EQ forfour", price: 22900, electric: true },
  { id: 21, make: "Honda", model: "e", price: 34900, electric: true },
  { id: 22, make: "DS", model: "3 Crossback E-Tense", price: 39900, electric: true },
  { id: 23, make: "Lexus", model: "UX 300e", price: 49900, electric: true },
  { id: 24, make: "Polestar", model: "2", price: 59900, electric: true },
  { id: 25, make: "Volvo", model: "XC40 Recharge", price: 59900, electric: true },
  { id: 26, make: "Jaguar", model: "I-Pace", price: 69900, electric: true },
  { id: 27, make: "Porsche", model: "Taycan", price: 83950, electric: true },
  { id: 28, make: "Audi", model: "e-tron GT", price: 99900, electric: true },
  { id: 29, make: "Mercedes", model: "EQS", price: 106374, electric: true },
  { id: 30, make: "Tesla", model: "Model S", price: 79490, electric: true },
  { id: 31, make: "Tesla", model: "Model 3", price: 39990, electric: true },
  { id: 32, make: "Porsche", model: "Taycan Cross Turismo", price: 93950, electric: true },
];

const totalRow = {
  make: "Total",
  model: "",
  price: rowData.reduce((total, row) => total + row.price, 0),
} satisfies Partial<Row>;

export const WithActionBar: Story = {
  render: () => {
    const [api, setApi] = useState<GridApi<Row> | null>(null);
    const [priceType, setPriceType] = useState<PriceType>("all");

    const isExternalFilterPresent = () => priceType !== "all";

    const doesExternalFilterPass: DoesExternalFilterPass<Row> = node => {
      const price = node.data?.price;

      if (price === undefined) {
        return false;
      }

      switch (priceType) {
        case "expensive":
          return price > 30000;
        case "cheap":
          return price < 30000;
        default:
          return true;
      }
    };

    const externalFilterChanged = (newValue: PriceType) => {
      setPriceType(newValue);
    };

    const handleGridReady = (params: GridReadyEvent<Row>) => {
      setApi(params.api);
    };

    useEffect(() => {
      api?.onFilterChanged();
    }, [api, priceType]);

    return (
      <div className="mtx-h-96 mtx-p-4">
        <DataGrid>
          <DataGridActionBar>
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
            <SearchAction />
            <FreezeAction className="mtx-ms-auto" />
            <PrintAction aria-label="Print data" />
            <RefreshAction aria-label="Refresh data" onRefresh={onRefresh} />
            <ExtraActions slotProps={{ triggerProps: { "aria-label": "More actions" } }}>
              <Button variant="text" className="mtx-w-full" onClick={onEdit}>
                Edit
              </Button>
            </ExtraActions>
          </DataGridActionBar>
          <DataGridContent
            rowData={rowData}
            columnDefs={colDefs}
            rowSelection={{ mode: "multiRow" }}
            getRowId={getRowId}
            onGridReady={handleGridReady}
            isExternalFilterPresent={isExternalFilterPresent}
            doesExternalFilterPass={doesExternalFilterPass}
          />
        </DataGrid>
      </div>
    );
  },
};

export const WithPagination: Story = {
  render: () => (
    <div className="mtx-h-96 mtx-p-4">
      <DataGrid>
        <DataGridActionBar>
          <SearchAction />
          <FreezeAction className="mtx-ms-auto" />
          <PrintAction aria-label="Print data" />
          <RefreshAction aria-label="Refresh data" onRefresh={onRefresh} />
          <ExtraActions slotProps={{ triggerProps: { "aria-label": "More actions" } }}>
            <Button variant="text" className="mtx-w-full" onClick={onEdit}>
              Edit
            </Button>
          </ExtraActions>
        </DataGridActionBar>
        <DataGridContent
          rowData={rowData}
          columnDefs={colDefs}
          rowSelection={{ mode: "multiRow" }}
          getRowId={getRowId}
          paginationPageSizeSelector={[5, 10, 25]}
          paginationPageSize={5}
          pagination
        />
      </DataGrid>
    </div>
  ),
};

export const RowTotalTrick: Story = {
  render: () => {
    return (
      <div className="mtx-h-96 mtx-p-4">
        <DataGrid>
          <DataGridContent rowData={rowData} columnDefs={colDefs} getRowId={getRowId} pinnedBottomRowData={[totalRow]} />
        </DataGrid>
      </div>
    );
  },
};

export default meta;
