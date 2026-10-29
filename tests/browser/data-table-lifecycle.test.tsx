import React from "react";
import { createRoot } from "react-dom/client";
import { afterEach, expect, test, vi } from "vitest";
import { page } from "vitest/browser";
import { DataTable, DataTableContent } from "../../src/components/data-table/DataTable";
import type { DataTableApi } from "../../src/components/data-table/DataTable.types";

let root: ReturnType<typeof createRoot>;
let container: HTMLDivElement;
afterEach(() => {
  root?.unmount();
  container?.remove();
});
const columns = [{ field: "name" as const, headerName: "Name", editable: true }];
type Item = { id: number; name: string };
function mount(content: React.ReactNode) {
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  root.render(content);
}

test("keeps the API stable and cancels a draft when its source record is replaced", async () => {
  const ref = React.createRef<DataTableApi<Item>>();
  const ready = vi.fn();
  const cancel = vi.fn();
  function Fixture() {
    const [rows, setRows] = React.useState([{ id: 1, name: "Original" }]);
    return (
      <>
        <button onClick={() => setRows([{ id: 1, name: "Replacement" }])}>Replace source</button>
        <DataTable style={{ height: 200 }}>
          <DataTableContent ref={ref} rowData={rows} columnDefs={columns} onReady={ready} onEditCancel={cancel} />
        </DataTable>
      </>
    );
  }
  mount(<Fixture />);
  await expect.element(page.getByRole("gridcell", { name: "Original", exact: true })).toBeInTheDocument();
  const api = ref.current!;
  expect(api.startEditingCell({ rowId: 1, columnId: "name" })).toBe(true);
  await page.getByRole("textbox", { name: "Edit Name" }).fill("Draft");
  await page.getByRole("button", { name: "Replace source" }).click();
  await expect.element(page.getByRole("gridcell", { name: "Replacement", exact: true })).toBeInTheDocument();
  await expect.element(page.getByRole("textbox", { name: "Edit Name" })).not.toBeInTheDocument();
  expect(ref.current).toBe(api);
  expect(ready).toHaveBeenCalledTimes(1);
  expect(cancel).toHaveBeenCalledWith(expect.objectContaining({ original: { id: 1, name: "Original" }, data: { id: 1, name: "Draft" } }));
  expect(api.table.getCoreRowModel().rows[0].original.name).toBe("Replacement");
});

test("retains print layout until every print session is restored and restores scrolling once", async () => {
  const ref = React.createRef<DataTableApi<Item>>();
  mount(
    <DataTable style={{ height: 200 }}>
      <DataTableContent ref={ref} rowData={Array.from({ length: 100 }, (_, id) => ({ id, name: `Item ${id}` }))} columnDefs={columns} />
    </DataTable>,
  );
  await expect.element(page.getByRole("gridcell", { name: "Item 0", exact: true })).toBeInTheDocument();
  const viewport = container.querySelector<HTMLElement>("[data-data-table-viewport]")!;
  viewport.scrollTop = 120;
  const restoreFirst = await ref.current!.preparePrint();
  const restoreSecond = await ref.current!.preparePrint();
  expect(container.querySelector("[data-print-layout]")).not.toBeNull();
  expect(container.querySelector('[data-row-id="99"]')).not.toBeNull();
  restoreFirst();
  restoreFirst();
  expect(container.querySelector("[data-print-layout]")).not.toBeNull();
  restoreSecond();
  await expect.poll(() => container.querySelector("[data-print-layout]")).toBeNull();
  await expect.poll(() => viewport.scrollTop).toBe(120);
});
