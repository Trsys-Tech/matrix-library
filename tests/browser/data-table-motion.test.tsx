import React from "react";
import { createRoot } from "react-dom/client";
import { afterEach, expect, test, vi } from "vitest";
import { page } from "vitest/browser";
import { DataTable, DataTableContent } from "../../src/components/data-table/DataTable";

let root: ReturnType<typeof createRoot>;
let container: HTMLDivElement;
afterEach(() => {
  root?.unmount();
  container?.remove();
  vi.restoreAllMocks();
});
const rows = Array.from({ length: 100 }, (_, id) => ({ id, name: `Item ${String(id).padStart(3, "0")}` }));
const columns = [{ field: "name" as const, headerName: "Name" }];

for (const action of ["sort", "search", "filter"] as const) {
  test(`animates ${action} results even when no retained row moves`, async () => {
    const animate = vi.spyOn(HTMLElement.prototype, "animate");
    function Fixture() {
      const [active, setActive] = React.useState(false);
      return (
        <>
          <button onClick={() => setActive(value => !value)}>Change results</button>
          <DataTable style={{ height: 200 }}>
            <DataTableContent
              rowData={rows}
              columnDefs={columns}
              quickFilterText={action === "search" && active ? "Item 000" : ""}
              externalFilter={action === "filter" && active ? row => row.id === 0 : undefined}
              tableOptions={{ state: { sorting: action === "sort" && active ? [{ id: "name", desc: true }] : [] } }}
            />
          </DataTable>
        </>
      );
    }
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
    root.render(<Fixture />);
    await expect.element(page.getByRole("gridcell", { name: "Item 000", exact: true })).toBeInTheDocument();
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    animate.mockClear();
    await page.getByRole("button", { name: "Change results" }).click();
    await expect.poll(() => animate.mock.calls.length).toBeGreaterThan(0);
    await expect.element(page.getByRole("gridcell", { name: action === "sort" ? "Item 099" : "Item 000", exact: true })).toBeInTheDocument();
    expect(animate.mock.contexts.some(element => element instanceof HTMLElement && element.getAttribute("role") === "row")).toBe(true);
    animate.mockClear();
    await page.getByRole("button", { name: "Change results" }).click();
    await expect.poll(() => animate.mock.calls.length).toBeGreaterThan(0);
  });
}

test.each(["Item 000", "no matches"])("fades removed rows for %s and removes them when the fade finishes", async search => {
  const animate = vi.spyOn(HTMLElement.prototype, "animate");
  function Fixture() {
    const [filtered, setFiltered] = React.useState(false);
    return (
      <>
        <button onClick={() => setFiltered(true)}>Filter rows</button>
        <DataTable style={{ height: 200 }}>
          <DataTableContent rowData={rows} columnDefs={columns} quickFilterText={filtered ? search : ""} />
        </DataTable>
      </>
    );
  }
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  root.render(<Fixture />);
  await expect.element(page.getByRole("gridcell", { name: "Item 001", exact: true })).toBeInTheDocument();
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  await page.getByRole("button", { name: "Filter rows" }).click();
  const index = animate.mock.contexts.findIndex(element => element instanceof HTMLElement && element.hasAttribute("data-exiting-row"));
  expect(index).toBeGreaterThanOrEqual(0);
  const ghost = animate.mock.contexts[index] as HTMLElement;
  expect(ghost.closest('[aria-hidden="true"][inert]')).not.toBeNull();
  expect(animate.mock.calls[index][0]).toEqual([{ opacity: 1 }, { opacity: 0 }]);
  await expect.element(page.getByRole("gridcell", { name: "Item 001", exact: true })).not.toBeInTheDocument();
  await expect.poll(() => container.querySelectorAll("[data-exiting-row]").length).toBe(0);
});
