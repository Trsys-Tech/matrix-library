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

test("scrolls rows below the header while keeping columns aligned", async () => {
  const ref = React.createRef<DataTableApi<Item>>();
  mount(
    <DataTable style={{ height: 200, width: 240 }}>
      <DataTableContent
        ref={ref}
        rowData={Array.from({ length: 100 }, (_, id) => ({ id, name: `Item ${id}` }))}
        columnDefs={[
          { field: "id", width: 180 },
          { field: "name", headerName: "Name", width: 180 },
        ]}
        pinnedTopRowData={[{ id: -1, name: "Pinned" }]}
      />
    </DataTable>,
  );
  await expect.element(page.getByRole("gridcell", { name: "Item 0", exact: true })).toBeInTheDocument();
  const viewport = container.querySelector<HTMLElement>("[data-data-table-viewport]")!;
  const header = container.querySelector<HTMLElement>('[role="columnheader"][data-column-id="name"]')!;
  const headerTop = header.getBoundingClientRect().top;
  expect(viewport.getBoundingClientRect().top).toBeCloseTo(header.parentElement!.getBoundingClientRect().bottom, 0);
  viewport.scrollLeft = 100;
  viewport.scrollTop = 200;
  await expect.poll(() => header.parentElement!.parentElement!.scrollLeft).toBe(100);
  expect(header.getBoundingClientRect().top).toBeCloseTo(headerTop, 0);
  const pinned = container.querySelector<HTMLElement>('[data-row-id="__summary_top_0"]')!;
  expect(pinned.getBoundingClientRect().top).toBeCloseTo(viewport.getBoundingClientRect().top, 0);
  ref.current!.scrollToRow(90, "start");
  await expect.element(page.getByRole("gridcell", { name: "Item 90", exact: true })).toBeInTheDocument();
});

test("reverses the menu, sort indicator, and label for end-aligned headers", async () => {
  mount(
    <DataTable style={{ height: 200 }}>
      <DataTableContent rowData={[{ id: 1, name: "Example" }]} columnDefs={[{ field: "name", headerName: "Name", align: "end", filter: "text" }]} />
    </DataTable>,
  );
  const sort = page.getByRole("button", { name: "Sort Name" });
  await sort.click();
  await expect.element(page.getByRole("columnheader", { name: /Name/ })).toHaveAttribute("aria-sort", "ascending");
  const button = container.querySelector<HTMLElement>('[aria-label="Sort Name"]')!;
  const menu = container.querySelector<HTMLElement>('[aria-label="Column options name"]')!;
  const [label, indicator] = Array.from(button.children) as HTMLElement[];
  expect(menu.getBoundingClientRect().right).toBeLessThanOrEqual(indicator.getBoundingClientRect().left);
  expect(indicator.getBoundingClientRect().right).toBeLessThanOrEqual(label.getBoundingClientRect().left);
});

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
