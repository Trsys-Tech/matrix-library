import React from "react";
import { createRoot } from "react-dom/client";
import { afterEach, expect, test, vi } from "vitest";
import { page } from "vitest/browser";
import { DataTable, DataTableContent } from "../../src/components/data-table/DataTable";
import { DataTableAlignment } from "../../src/components/data-table/DataTableAlignment";
import { DataTableRefreshAction } from "../../src/components/data-table/DataTableActions";
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
  const row = container.querySelector<HTMLElement>('[data-row-id="0"]')!;
  const cell = row.querySelector<HTMLElement>('[data-column-id="name"]')!;
  const grid = viewport.closest('[role="grid"]')!;
  const horizontalGaps: number[] = [];
  const measureAlignment = () => horizontalGaps.push(header.getBoundingClientRect().left - cell.getBoundingClientRect().left);
  grid.addEventListener("scroll", measureAlignment, true);
  await page
    .getByRole("columnheader")
    .first()
    .wheel({ delta: { x: 10 }, times: 8 });
  await expect.poll(() => viewport.scrollLeft).toBe(80);
  grid.removeEventListener("scroll", measureAlignment, true);
  expect(horizontalGaps.length).toBeGreaterThan(0);
  expect(Math.max(...horizontalGaps.map(Math.abs))).toBeLessThan(1);
  viewport.scrollLeft = 100;
  viewport.scrollTop = 200;
  expect(header.getBoundingClientRect().left).toBeCloseTo(cell.getBoundingClientRect().left, 0);
  expect(header.getBoundingClientRect().top).toBeCloseTo(headerTop, 0);
  const pinned = container.querySelector<HTMLElement>('[data-row-id="__summary_top_0"]')!;
  expect(pinned.getBoundingClientRect().top).toBeCloseTo(header.closest('[role="row"]')!.getBoundingClientRect().bottom, 0);
  ref.current!.scrollToRow(90, "start");
  await expect.element(page.getByRole("gridcell", { name: "Item 90", exact: true })).toBeInTheDocument();
  const target = container.querySelector<HTMLElement>('[data-row-id="90"]')!;
  expect(target.getBoundingClientRect().top).toBeCloseTo(pinned.getBoundingClientRect().bottom, 0);
});

test("does not feed synchronized scroll events back into an actively scrolling table", async () => {
  mount(
    <DataTableAlignment>
      {[0, 1, 2].map(index => (
        <DataTable key={index} style={{ height: 150, width: 240 }}>
          <DataTableContent
            rowData={[{ id: index, name: `Item ${index}` }]}
            columnDefs={[
              { field: "id", width: 200 },
              { field: "name", width: 200 },
            ]}
          />
        </DataTable>
      ))}
    </DataTableAlignment>,
  );
  await expect.element(page.getByRole("gridcell", { name: "Item 0" })).toBeInTheDocument();
  const viewports = Array.from(container.querySelectorAll<HTMLDivElement>("[data-data-table-viewport]"));
  viewports[0].scrollLeft = 50;
  viewports[0].dispatchEvent(new Event("scroll"));
  expect(viewports.map(viewport => viewport.scrollLeft)).toEqual([50, 50, 50]);

  // The source has moved again before the browser delivers the follower events.
  viewports[0].scrollLeft = 80;
  viewports[1].dispatchEvent(new Event("scroll"));
  expect(viewports[0].scrollLeft).toBe(80);
  viewports[0].dispatchEvent(new Event("scroll"));
  expect(viewports.map(viewport => viewport.scrollLeft)).toEqual([80, 80, 80]);

  viewports[2].scrollLeft = 120;
  viewports[2].dispatchEvent(new Event("scroll"));
  expect(viewports.map(viewport => viewport.scrollLeft)).toEqual([120, 120, 120]);
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

test("discards drafts when navigating, resizing the page, or refreshing", async () => {
  const ref = React.createRef<DataTableApi<Item>>();
  const cancel = vi.fn();
  const commit = vi.fn();
  const refresh = vi.fn();
  mount(
    <DataTable style={{ height: 300 }}>
      <DataTableRefreshAction onRefresh={refresh} />
      <DataTableContent
        ref={ref}
        rowData={[
          { id: 1, name: "First" },
          { id: 2, name: "Second" },
        ]}
        columnDefs={columns}
        pagination
        paginationPageSize={1}
        paginationPageSizeSelector={[1, 2]}
        onEditCancel={cancel}
        onEditCommit={commit}
      />
    </DataTable>,
  );
  const editor = page.getByRole("textbox", { name: "Edit Name" });
  await expect.element(page.getByText("First", { exact: true })).toBeInTheDocument();
  expect(ref.current!.startEditingRow(1)).toBe(true);
  await editor.fill("First draft");
  await page.getByRole("button", { name: "Next page" }).click();
  await expect.element(page.getByText("Second", { exact: true })).toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "Save", exact: true })).not.toBeInTheDocument();

  expect(ref.current!.startEditingRow(2)).toBe(true);
  await editor.fill("Second draft");
  await page.getByRole("combobox", { name: "Rows per page" }).selectOptions("2");
  await expect.element(editor).not.toBeInTheDocument();

  expect(ref.current!.startEditingRow(1)).toBe(true);
  await editor.fill("Refresh draft");
  await page.getByRole("button", { name: "Refresh table" }).click();
  await expect.element(editor).not.toBeInTheDocument();
  expect(refresh).toHaveBeenCalledTimes(1);
  expect(cancel.mock.calls.map(([event]) => event.data.name)).toEqual(["First draft", "Second draft", "Refresh draft"]);
  expect(commit).not.toHaveBeenCalled();
});

test("confines loading to the rows and disables dimmed header and pagination controls", async () => {
  const ref = React.createRef<DataTableApi<Item>>();
  const cancel = vi.fn();
  const rows = [{ id: 1, name: "First" }];
  function Fixture() {
    const [loading, setLoading] = React.useState(false);
    return (
      <>
        <button onClick={() => setLoading(value => !value)}>Toggle loading</button>
        <DataTable style={{ height: 300 }}>
          <DataTableContent
            ref={ref}
            rowData={rows}
            columnDefs={[{ ...columns[0], filter: "text", resizable: true }]}
            onEditCancel={cancel}
            rowSelection={{ mode: "multiRow" }}
            pagination
            tableOptions={{ manualPagination: true, rowCount: 100 }}
            loading={loading}
          />
        </DataTable>
      </>
    );
  }
  mount(<Fixture />);
  const sort = page.getByRole("button", { name: "Sort Name" });
  const menu = page.getByRole("button", { name: "Column options name" });
  const next = page.getByRole("button", { name: "Next page" });
  const size = page.getByRole("combobox", { name: "Rows per page" });
  const toggle = page.getByRole("button", { name: "Toggle loading" });
  await expect.element(sort).toBeEnabled();
  expect(ref.current!.startEditingRow(1)).toBe(true);
  await page.getByRole("textbox", { name: "Edit Name" }).fill("Pending draft");
  await menu.click();
  await expect.element(page.getByRole("button", { name: "Apply" })).toBeInTheDocument();
  await toggle.click();

  await expect.element(page.getByRole("grid").getByRole("status")).toHaveTextContent("Loading…");
  await expect.element(page.getByRole("button", { name: "Save", exact: true })).not.toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "Apply" })).not.toBeInTheDocument();
  const resizeHandle = page.getByRole("separator", { name: "Resize name" });
  await expect.element(resizeHandle).toBeVisible();
  await expect.element(resizeHandle).toHaveAttribute("aria-disabled", "true");
  await expect.element(resizeHandle).toHaveAttribute("tabindex", "-1");
  for (const control of [sort, menu, next, size, page.getByRole("checkbox", { name: "Select all rows" })]) {
    await expect.element(control).toBeDisabled();
  }
  const overlay = container.querySelector('[role="status"]')!.getBoundingClientRect();
  const header = container.querySelector('[role="columnheader"][data-column-id="name"]')!.parentElement!;
  const pagination = container.querySelector('[aria-label="Next page"]')!.parentElement!;
  expect(overlay.top).toBeCloseTo(header.getBoundingClientRect().bottom, 0);
  expect(overlay.bottom).toBeLessThanOrEqual(pagination.getBoundingClientRect().top);
  expect(Number(getComputedStyle(header).opacity)).toBeLessThan(1);
  expect(Number(getComputedStyle(pagination).opacity)).toBeLessThan(1);
  expect(ref.current!.startEditingRow(1)).toBe(false);
  expect(cancel).toHaveBeenCalledWith(expect.objectContaining({ data: { id: 1, name: "Pending draft" } }));
  await toggle.click();
  for (const control of [sort, menu, next, size]) {
    await expect.element(control).toBeEnabled();
  }
});

const gestureColumns = [
  { field: "name" as const, headerName: "Name", width: 140, resizable: true },
  { field: "id" as const, headerName: "ID", width: 140 },
];
const gestureRows = [{ id: 1, name: "First" }];

function mountHeaderGestureTable(
  ref: React.RefObject<DataTableApi<Item>>,
  options?: React.ComponentProps<typeof DataTableContent<Item>>["tableOptions"],
) {
  const render = (loading: boolean) => (
    <DataTable style={{ width: 400, height: 200 }}>
      <DataTableContent ref={ref} rowData={gestureRows} columnDefs={gestureColumns} tableOptions={options} loading={loading} />
    </DataTable>
  );
  mount(render(false));
  return (loading: boolean) => root.render(render(loading));
}

test.each([
  { pointerType: "mouse", columnResizeMode: "onEnd", widthBeforeLoading: 140 },
  { pointerType: "touch", columnResizeMode: "onChange", widthBeforeLoading: 160 },
] as const)("cancels an active $pointerType resize in $columnResizeMode mode", async ({ pointerType, columnResizeMode, widthBeforeLoading }) => {
  const ref = React.createRef<DataTableApi<Item>>();
  const onColumnSizingChange = vi.fn();
  const setLoading = mountHeaderGestureTable(ref, { columnResizeMode, onColumnSizingChange });
  const handle = page.getByRole("separator", { name: "Resize name" });
  await expect.element(handle).toBeInTheDocument();
  const resize = (target: EventTarget, type: string, clientX: number) =>
    target.dispatchEvent(new PointerEvent(type, { bubbles: true, pointerId: 1, pointerType, isPrimary: true, clientX }));
  const size = () => ref.current!.table.getColumn("name")!.getSize();
  resize(handle.element(), "pointerdown", 140);
  expect(ref.current!.table.getColumn("name")!.getIsResizing()).toBe(true);
  resize(document, "pointermove", 160);
  await expect.poll(size).toBe(widthBeforeLoading);
  onColumnSizingChange.mockClear();
  setLoading(true);
  await expect.element(handle).toHaveAttribute("aria-disabled", "true");
  expect(ref.current!.table.getColumn("name")!.getIsResizing()).toBe(false);
  resize(document, "pointermove", 180);
  const disabledHandle = handle.element();
  resize(disabledHandle, "pointerdown", 140);
  expect(ref.current!.table.getColumn("name")!.getIsResizing()).toBe(false);
  disabledHandle.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
  disabledHandle.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
  setLoading(false);
  await expect.element(handle).not.toHaveAttribute("aria-disabled");
  resize(document, "pointerup", 200);
  expect(onColumnSizingChange).not.toHaveBeenCalled();
  expect(size()).toBe(widthBeforeLoading);
  resize(handle.element(), "pointerdown", 140);
  resize(document, "pointerup", 170);
  await expect.poll(size).toBe(widthBeforeLoading + 30);
});

test("clears an active pointer drag preview and discards the eventual drop", async () => {
  const ref = React.createRef<DataTableApi<Item>>();
  const setLoading = mountHeaderGestureTable(ref);
  const name = page.getByRole("columnheader", { name: "Name" });
  await expect.element(name).toBeInTheDocument();
  const header = name.element();
  const bounds = header.getBoundingClientRect();
  const x = bounds.left + bounds.width / 2;
  const dispatchPointer = (target: EventTarget, type: string, clientX: number) =>
    target.dispatchEvent(
      new PointerEvent(type, {
        bubbles: true,
        cancelable: true,
        pointerId: 1,
        pointerType: "mouse",
        isPrimary: true,
        clientX,
        clientY: bounds.top + bounds.height / 2,
      }),
    );
  const order = () => [...container.querySelectorAll("[role=columnheader]")].map(element => element.getAttribute("data-column-id"));
  // Synthetic pointer events have no browser-managed pointer to capture.
  const capture = vi.spyOn(document.body, "setPointerCapture").mockImplementation(() => {});
  try {
    dispatchPointer(header, "pointerdown", x);
    dispatchPointer(header, "pointermove", x + 10);
    await expect.element(name).toHaveAttribute("data-dragging", "true");
    dispatchPointer(header, "pointermove", x + bounds.width);
    await expect.poll(order).toEqual(["id", "name"]);
    setLoading(true);
    await expect.poll(order).toEqual(["name", "id"]);
    await expect.element(name).not.toHaveAttribute("data-dragging");
    setLoading(false);
    await expect.element(page.getByRole("button", { name: "Sort Name" })).toBeEnabled();
    dispatchPointer(document, "pointerup", x + bounds.width);
    expect(ref.current!.table.getVisibleLeafColumns().map(column => column.id)).toEqual(["name", "id"]);
  } finally {
    capture.mockRestore();
  }
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
