import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { DataTable, DataTableActionBar, DataTableContent } from "../dist/datatable.es.js";
import { DataTableSearchAction } from "../dist/datatableactions.es.js";
import { getActiveDataTableCell, getCellValue, setCellValue, matchesFilter, getFlexSizes, moveDataTableColumn, parseDateInputValue, toDateInputValue } from "../dist/datatablemodel.es.js";

const rows = [
  { id: "a", name: "Alpha", price: 100, updated: "2026-10-01" },
  { id: "b", name: "Beta", price: 20, updated: "2026-10-02" },
  { id: "c", name: "Gamma", price: 3, updated: "2026-10-03" },
];
const columns = [
  { field: "name", headerName: "Name", width: 200, pinned: "start", filter: "text" },
  { field: "price", headerName: "Price", width: 120, cellDataType: "number", filter: "number" },
  { field: "updated", headerName: "Updated", width: 150, filter: "date", cellDataType: "dateString" },
];
const render = props =>
  renderToStaticMarkup(
    React.createElement(DataTable, null, React.createElement(DataTableContent, { rowData: rows, columnDefs: columns, virtualize: false, ...props })),
  );
const ids = html => Array.from(html.matchAll(/role="row"[^>]*data-row-id="([^"]+)"/g), match => match[1]);

test("normalizes custom numeric row IDs for renderers, selection and pinning, including zero", () => {
  const rowData = rows.map((row, index) => ({ ...row, key: index }));
  const renderedIds = [];
  const html = render({
    rowData,
    getRowId: row => row.key,
    rowSelection: { mode: "multiRow" },
    columnDefs: [
      {
        field: "name",
        cellRenderer: ({ rowId }) => {
          renderedIds.push(rowId);
          return null;
        },
      },
    ],
    tableOptions: { state: { rowSelection: { 0: true }, rowPinning: { top: ["2"] } } },
  });
  assert.deepEqual(ids(html), ["2", "0", "1"]);
  assert.deepEqual(renderedIds, ["2", "0", "1"]);
  assert.match(html, /aria-selected="true" data-row-id="0"/);
  assert.deepEqual(ids(render({ rowData: rows.map((row, index) => ({ ...row, id: index })) })), ["0", "1", "2"]);
});

test("row APIs accept numeric and string IDs for selection, pinning, editing and pagination", t => {
  const original = Object.getOwnPropertyDescriptor(globalThis, "requestAnimationFrame");
  globalThis.requestAnimationFrame = () => 0;
  t.after(() => {
    if (original) Object.defineProperty(globalThis, "requestAnimationFrame", original);
    else delete globalThis.requestAnimationFrame;
  });
  for (const numeric of [false, true]) {
    let api;
    const events = [];
    render({
      rowData: rows.map((row, index) => ({ ...row, id: numeric ? index : String(index) })),
      getRowId: row => row.id,
      rowSelection: { mode: "multiRow" },
      pagination: true,
      paginationPageSize: 1,
      onEditCancel: event => events.push(event),
      columnDefs: [
        {
          field: "name",
          editable: true,
          cellRenderer: params => {
            api = params.api;
            return null;
          },
        },
      ],
    });
    const id = index => (numeric ? index : String(index));
    api.setSelectedRowIds([id(0), id(2)]);
    assert.deepEqual(
      api.getSelectedRows().map(row => row.name),
      ["Alpha", "Gamma"],
    );
    api.pinRows([id(0)], "top");
    assert.deepEqual(api.table.atoms.rowPinning.get().top, ["0"]);
    api.pinRows([id(0)], "bottom");
    assert.deepEqual(api.table.atoms.rowPinning.get(), { top: [], bottom: ["0"] });
    api.pinRows([id(0)], false);
    assert.deepEqual(api.table.atoms.rowPinning.get(), { top: [], bottom: [] });
    assert.equal(api.startEditingRow(id(0)), true);
    assert.equal(api.stopEditing(true), true);
    assert.equal(events[0].rowId, "0");
    assert.equal(api.startEditingCell({ rowId: id(2), columnId: "name" }), true);
    assert.equal(api.table.atoms.pagination.get().pageIndex, 2);
    assert.equal(api.stopEditing(true), true);
    assert.equal(events[1].rowId, "2");
    api.scrollToRow(id(1));
    assert.equal(api.table.atoms.pagination.get().pageIndex, 1);
    api.deselectAll();
    assert.deepEqual(api.getSelectedRows(), []);
  }
});

test("renders semantic rows, named headers, pinned columns and an accessible loading state", () => {
  const html = render({ loading: true });
  assert.deepEqual(ids(html), ["a", "b", "c"]);
  assert.match(html, /role="grid"[^>]*aria-busy="true"/);
  assert.match(html, /aria-label="Sort Name"/);
  assert.match(html, /inset-inline-start:0/);
  assert.match(html, /role="status"[^>]*>Loading/);
  assert.doesNotMatch(html, /__external|NaN|columnDefs=|rowData=/);
});

test("sorts numeric values numerically and honors multi-column controlled sorting", () => {
  assert.deepEqual(ids(render({ tableOptions: { state: { sorting: [{ id: "price", desc: false }] } } })), ["c", "b", "a"]);
  assert.deepEqual(ids(render({ tableOptions: { state: { sorting: [{ id: "price", desc: true }] } } })), ["a", "b", "c"]);
});

test("combines global, column and external filters without mutating input records", () => {
  const html = render({
    quickFilterText: "a",
    externalFilter: row => row.id !== "b",
    tableOptions: { state: { columnFilters: [{ id: "price", value: { operator: "greaterThan", value: "10" } }] } },
  });
  assert.deepEqual(ids(html), ["a"]);
  assert.deepEqual(
    rows.map(row => row.id),
    ["a", "b", "c"],
  );
});

test("uses search accessors for formatted booleans and excludes display-only actions from search", () => {
  const html = render({
    columnDefs: [
      ...columns,
      { colId: "fuel", valueGetter: ({ data }) => data.id === "a", getQuickFilterText: ({ value }) => (value ? "Electric" : "Gasoline") },
      { colId: "actions", cellRenderer: () => React.createElement("button", null, "Electric") },
    ],
    quickFilterText: "electric",
  });
  assert.deepEqual(ids(html), ["a"]);
});

test("pinning renders each record once and keeps pinned records through filtering", () => {
  const html = render({ quickFilterText: "Gamma", tableOptions: { state: { rowPinning: { top: ["a"], bottom: ["b"] } } } });
  assert.deepEqual(ids(html), ["a", "c", "b"]);
  assert.match(html, /data-row-id="a" data-pinned="top"/);
  assert.match(html, /data-row-id="b" data-pinned="bottom"/);
});

test("keepPinnedRows false respects filters instead of forcing frozen records visible", () => {
  assert.deepEqual(ids(render({ quickFilterText: "Gamma", tableOptions: { keepPinnedRows: false, state: { rowPinning: { top: ["a"] } } } })), ["c"]);
});

test("pagination slices rows while print layout expands the complete filtered result and includes totals", () => {
  const options = { pagination: true, paginationPageSize: 1, tableOptions: { initialState: { pagination: { pageIndex: 1, pageSize: 1 } } } };
  assert.deepEqual(ids(render(options)), ["b"]);
  const html = render({ ...options, domLayout: "print", pinnedBottomRowData: [{ id: "total", name: "Total", price: 123, updated: "" }] });
  assert.deepEqual(ids(html), ["a", "b", "c", "__summary_bottom_0"]);
  assert.doesNotMatch(html, /Rows per page|Column options|Resize name|Select row/);
});

test("manual pagination trusts the supplied page and server total", () => {
  const html = render({
    pagination: true,
    rowData: [rows[1]],
    tableOptions: { manualPagination: true, rowCount: 100, state: { pagination: { pageIndex: 3, pageSize: 10 } } },
  });
  assert.deepEqual(ids(html), ["b"]);
  assert.match(html, /Page 4 of 10/);
});

test("native controlled global filtering is honored and quickFilterText takes precedence", () => {
  assert.deepEqual(ids(render({ tableOptions: { state: { globalFilter: "Beta" } } })), ["b"]);
  assert.deepEqual(ids(render({ quickFilterText: "Gamma", tableOptions: { state: { globalFilter: "Beta" } } })), ["c"]);
});

test("initial global search filters the first render while controlled search takes precedence", () => {
  const initialState = { globalFilter: "Beta" };
  assert.deepEqual(ids(render({ tableOptions: { initialState } })), ["b"]);
  assert.deepEqual(ids(render({ tableOptions: { initialState, state: { globalFilter: "Alpha" } } })), ["a"]);
  assert.deepEqual(ids(render({ quickFilterText: "Gamma", tableOptions: { initialState, state: { globalFilter: "Alpha" } } })), ["c"]);
  assert.deepEqual(ids(render({ quickFilterText: "", tableOptions: { initialState } })), ["a", "b", "c"]);
});

test("queued column filter updates compose against the owner's latest state and omit the external predicate", () => {
  let table;
  const updates = [];
  const predicate = () => true;
  const initialFilters = [{ id: "__external", value: predicate }];
  render({
    externalFilter: predicate,
    columnDefs: columns.map(column => ({
      ...column,
      cellRenderer: ({ api }) => {
        table = api.table;
        return null;
      },
    })),
    tableOptions: { state: { columnFilters: initialFilters }, onColumnFiltersChange: updater => updates.push(updater) },
  });
  table.getColumn("name").setFilterValue({ operator: "contains", value: "a" });
  table.getColumn("price").setFilterValue({ operator: "greaterThan", value: "5" });
  const apply = (state, updater) => (typeof updater === "function" ? updater(state) : updater);
  assert.deepEqual(updates.reduce(apply, initialFilters), [
    { id: "name", value: { operator: "contains", value: "a" } },
    { id: "price", value: { operator: "greaterThan", value: "5" } },
  ]);
  table.getColumn("name").setFilterValue(undefined);
  assert.deepEqual(updates.reduce(apply, initialFilters), [{ id: "price", value: { operator: "greaterThan", value: "5" } }]);
  assert.deepEqual(initialFilters, [{ id: "__external", value: predicate }]);
});

test("external processing trusts supplied rows and emits controlled filter, sort, search and page requests", () => {
  let table;
  const requests = {};
  const state = {
    columnFilters: [{ id: "name", value: { operator: "equals", value: "not loaded" } }],
    globalFilter: "not loaded",
    sorting: [{ id: "price", desc: false }],
    pagination: { pageIndex: 2, pageSize: 10 },
  };
  const html = render({
    pagination: true,
    externalFilter: () => false,
    columnDefs: columns.map(column => ({
      ...column,
      cellRenderer: ({ api }) => {
        table = api.table;
        return null;
      },
    })),
    tableOptions: {
      manualFiltering: true,
      manualSorting: true,
      manualPagination: true,
      rowCount: 100,
      state,
      ...Object.fromEntries(
        [
          ["columnFilters", "onColumnFiltersChange"],
          ["globalFilter", "onGlobalFilterChange"],
          ["sorting", "onSortingChange"],
          ["pagination", "onPaginationChange"],
        ].map(([key, callback]) => [
          callback,
          updater => {
            requests[key] = typeof updater === "function" ? updater(state[key]) : updater;
          },
        ]),
      ),
    },
  });
  assert.deepEqual(ids(html), ["a", "b", "c"]);
  assert.match(html, /Page 3 of 10/);
  table.getColumn("name").setFilterValue({ operator: "equals", value: "Alpha" });
  assert.deepEqual(requests.columnFilters, [{ id: "name", value: { operator: "equals", value: "Alpha" } }]);
  table.getColumn("name").setFilterValue(undefined);
  assert.deepEqual(requests.columnFilters, []);
  table.getColumn("price").toggleSorting(true);
  assert.deepEqual(requests.sorting, [{ id: "price", desc: true }]);
  table.setGlobalFilter("new search");
  assert.equal(requests.globalFilter, "new search");
  table.nextPage();
  assert.deepEqual(requests.pagination, { pageIndex: 3, pageSize: 10 });
  table.setPageSize(25);
  assert.deepEqual(requests.pagination, { pageIndex: 0, pageSize: 25 });
  assert.deepEqual(table.atoms.pagination.get(), state.pagination);
  assert.deepEqual(table.atoms.sorting.get(), state.sorting);
});

test("selection respects disabled rows and supports a selected row outside the current filtered view", () => {
  const html = render({
    rowSelection: { mode: "multiRow", isRowSelectable: row => row.id !== "b" },
    tableOptions: { state: { rowSelection: { a: true } } },
  });
  assert.match(html.match(/<button[^>]*aria-label="Select row b"[^>]*>/)?.[0] ?? "", /\sdisabled=""/);
  assert.match(html, /aria-selected="true" data-row-id="a"/);
  assert.match(html, /aria-label="Select all rows"/);
});

test("select all preserves selected rows outside the filtered or current-page scope", () => {
  for (const scope of ["filtered", "currentPage"]) {
    let api;
    render({
      rowSelection: { mode: "multiRow" },
      quickFilterText: scope === "filtered" ? "Alpha" : undefined,
      pagination: scope === "currentPage",
      paginationPageSize: 1,
      tableOptions: { initialState: { rowSelection: { c: true } } },
      columnDefs: [
        {
          field: "name",
          cellRenderer: params => {
            api = params.api;
            return null;
          },
        },
      ],
    });
    api.selectAll(scope);
    assert.deepEqual(api.table.atoms.rowSelection.get(), { a: true, c: true });
  }
  let api;
  render({
    rowSelection: { mode: "multiRow" },
    pagination: true,
    tableOptions: { manualPagination: true, initialState: { rowSelection: { unloaded: true } } },
    columnDefs: [
      {
        field: "name",
        cellRenderer: params => {
          api = params.api;
          return null;
        },
      },
    ],
  });
  api.selectAll("currentPage");
  assert.equal(api.table.atoms.rowSelection.get().unloaded, true);
});

test("empty tables and filter misses show the configured empty content", () => {
  assert.match(render({ rowData: [] }), /No rows to display/);
  assert.match(render({ quickFilterText: "no match", emptyContent: "Nothing found" }), /Nothing found/);
  assert.doesNotMatch(render({ rowData: [], loading: true, emptyContent: "Nothing found" }), /Nothing found/);
});

test("the grid tab stop follows mounted virtual rows while preserving a visible focused cell", () => {
  assert.deepEqual(getActiveDataTableCell({ rowId: "a", columnId: "price" }, ["b", "c"], ["name", "price"]), { rowId: "b", columnId: "name" });
  assert.deepEqual(getActiveDataTableCell({ rowId: "c", columnId: "price" }, ["b", "c"], ["name", "price"]), { rowId: "c", columnId: "price" });
  assert.deepEqual(getActiveDataTableCell({ rowId: "c", columnId: "hidden" }, ["b", "c"], ["name"]), { rowId: "b", columnId: "name" });
});

test("custom renderers, nested/computed values, formatting and dynamic visibility compose", () => {
  const html = render({
    columnDefs: [
      ...columns,
      { colId: "hidden", hide: true, valueGetter: () => "secret" },
      { colId: "computed", valueGetter: ({ data }) => data.price * 2, valueFormatter: ({ value }) => `Double ${value}` },
      {
        colId: "actions",
        headerName: "Actions",
        hideInPrint: true,
        cellRenderer: ({ data }) => React.createElement("button", null, `Edit ${data.name}`),
      },
    ],
  });
  assert.match(html, /Double 200/);
  assert.match(html, /Edit Alpha/);
  assert.doesNotMatch(html, /secret|Sort hidden/);
  assert.doesNotMatch(render({ columnDefs: [{ colId: "actions", hideInPrint: true }], domLayout: "print" }), /Sort actions/);
});

test("invalid ids fail explicitly and compound parts require the provider", () => {
  assert.throws(() => render({ columnDefs: [{ colId: "x" }, { colId: "x" }] }), /column ids must be unique/);
  assert.throws(() => render({ rowData: [rows[0], rows[0]] }), /row ids must be unique/);
  assert.throws(() => render({ columnDefs: [{ colId: "__external" }] }), /reserved/);
  assert.throws(() => renderToStaticMarkup(React.createElement(DataTableContent, { rowData: rows, columnDefs: columns })), /within <DataTable>/);
  assert.throws(() => renderToStaticMarkup(React.createElement(DataTableSearchAction)), /within <DataTable>/);
  assert.match(
    renderToStaticMarkup(React.createElement(DataTable, null, React.createElement(DataTableActionBar, { "data-testid": "toolbar" }, "Tools"))),
    /data-testid="toolbar"/,
  );
});

test("filters handle case, zero, blank, numeric ranges, dates and invalid numeric input", () => {
  assert.equal(matchesFilter("Alpha", { operator: "contains", value: "ALP" }, "text"), true);
  assert.equal(matchesFilter(0, { operator: "equals", value: "0" }, "number"), true);
  assert.equal(matchesFilter(null, { operator: "blank" }, "text"), true);
  assert.equal(matchesFilter(0, { operator: "notBlank" }, "number"), true);
  assert.equal(matchesFilter(20, { operator: "inRange", value: "10", valueTo: "20" }, "number"), true);
  assert.equal(matchesFilter(21, { operator: "inRange", value: "10", valueTo: "20" }, "number"), false);
  assert.equal(matchesFilter("2026-10-02T15:00:00Z", { operator: "equals", value: "2026-10-02" }, "date"), true);
  assert.equal(matchesFilter("n/a", { operator: "notEqual", value: "10" }, "number"), false);
});

test("nested edits and custom setters preserve source records and unrelated fields", () => {
  const original = { id: 1, nested: { name: "Before", count: 2 } };
  const column = { field: "nested.name" };
  const edited = setCellValue(original, column, "After");
  assert.equal(getCellValue(edited, column, 0), "After");
  assert.equal(edited.nested.count, 2);
  assert.equal(original.nested.name, "Before");
  assert.notEqual(edited.nested, original.nested);
  assert.deepEqual(setCellValue(original, { valueSetter: (row, value) => ({ ...row, id: value }) }, 10), { ...original, id: 10 });
});

test("nested edits preserve array ancestors, sibling entries and source records", () => {
  const original = { id: 1, items: [{ names: ["Before", "Sibling"], count: 2 }, { names: ["Other"] }] };
  const edited = setCellValue(original, { field: "items.0.names.0" }, "After");
  assert.deepEqual(edited.items, [{ names: ["After", "Sibling"], count: 2 }, { names: ["Other"] }]);
  assert.equal(original.items[0].names[0], "Before");
  assert.notEqual(edited.items, original.items);
  assert.notEqual(edited.items[0].names, original.items[0].names);
  assert.equal(edited.items[1], original.items[1]);
});

test("column validation runs for hidden editable columns when a row edit commits", t => {
  const original = Object.getOwnPropertyDescriptor(globalThis, "requestAnimationFrame");
  globalThis.requestAnimationFrame = () => 0;
  t.after(() => {
    if (original) Object.defineProperty(globalThis, "requestAnimationFrame", original);
    else delete globalThis.requestAnimationFrame;
  });
  let api;
  const commits = [];
  render({
    columnDefs: [
      {
        field: "name",
        editable: true,
        cellRenderer: params => {
          api = params.api;
          return null;
        },
      },
      { field: "price", editable: true, hide: true, validate: value => (value > 50 ? ["Price must be 50 or less"] : null) },
    ],
    onEditCommit: event => commits.push(event),
  });
  assert.equal(api.startEditingRow("a"), true);
  assert.equal(api.stopEditing(), false);
  assert.deepEqual(commits, []);
  assert.equal(api.stopEditing(true), true);
  assert.equal(api.startEditingRow("c"), true);
  assert.equal(api.stopEditing(), true);
});

test("date editors serialize Date values as yyyy-MM-dd and parse typed values back to Date", () => {
  const value = new Date(2026, 9, 5);
  assert.equal(toDateInputValue(value), "2026-10-05");
  assert.equal(toDateInputValue("2026-10-05T12:00:00"), "2026-10-05");
  assert.equal(toDateInputValue("not a date"), "");
  assert.equal(toDateInputValue(null), "");
  const parsed = parseDateInputValue("2026-11-01", value, "date");
  assert.ok(parsed instanceof Date);
  assert.deepEqual([parsed.getFullYear(), parsed.getMonth(), parsed.getDate()], [2026, 10, 1]);
  assert.equal(toDateInputValue(parsed), "2026-11-01");
  assert.ok(parseDateInputValue("2026-11-01", value) instanceof Date);
  assert.equal(parseDateInputValue("", value, "date"), null);
  assert.equal(parseDateInputValue("2026-11-01", "2026-10-05", "dateString"), "2026-11-01");
  assert.equal(parseDateInputValue("2026-02-31", value, "date"), "2026-02-31");
  assert.equal(parseDateInputValue("05/10/2026", value, "date"), "05/10/2026");
});

test("row disclosure and selection cells stay pinned at the row start while columns scroll", () => {
  const html = render({ rowSelection: { mode: "multiRow" }, renderSubComponent: () => null });
  const tagWith = marker => {
    const start = html.indexOf(marker);
    assert.notEqual(start, -1, `missing ${marker}`);
    return html.slice(html.lastIndexOf("<", start), html.indexOf(">", start) + 1);
  };
  const expanderCell = tagWith("data-row-expander-cell");
  assert.match(expanderCell, /mtx-sticky/);
  assert.match(expanderCell, /mtx-start-0/);
  assert.match(expanderCell, /mtx-bg-inherit/);
  assert.match(tagWith("data-row-selection-cell"), /mtx-sticky/);
  const expanderHeader = tagWith('aria-label="Row details"');
  assert.match(expanderHeader, /mtx-sticky/);
  assert.match(expanderHeader, /mtx-start-0/);
  assert.match(expanderHeader, /mtx-bg-primary-50/);
});

test("headers and cells follow pinned regions and their explicit order, including print layout", () => {
  for (const domLayout of ["normal", "print"]) {
    const html = render({
      domLayout,
      tableOptions: { state: { columnPinning: { start: ["updated", "name"], end: ["price"] } } },
    });
    const headers = Array.from(html.matchAll(/role="columnheader"[^>]*data-column-id="([^"]+)"/g), match => match[1]);
    assert.deepEqual(headers, ["updated", "name", "price"]);
    const firstRow = html.match(/role="row"[^>]*data-row-id="a"[\s\S]*?(?=<div role="row"|$)/)[0];
    const cells = Array.from(firstRow.matchAll(/role="gridcell"[^>]*data-column-id="([^"]+)"/g), match => match[1]);
    assert.deepEqual(cells, headers);
  }
});

test("print layout removes the sticky top offset from frozen and summary rows", () => {
  const html = render({
    domLayout: "print",
    pinnedTopRowData: [{ id: "summary", name: "Summary" }],
    tableOptions: { state: { rowPinning: { top: ["a"] } } },
  });
  const topGroup = html.match(/<div role="rowgroup"[^>]*>/)[0];
  assert.match(topGroup, /position:relative/);
  assert.doesNotMatch(topGroup, /(?:style="|;)top:/);
});

test("flex columns share remaining space and honor min/max constraints and manual widths", () => {
  const definitions = [
    { field: "fixed", width: 100 },
    { field: "a", flex: 1, minWidth: 80, maxWidth: 120 },
    { field: "b", flex: 2, minWidth: 80 },
  ];
  assert.deepEqual(getFlexSizes(definitions, 500, {}), { a: 120, b: 280 });
  assert.deepEqual(getFlexSizes(definitions, 500, { a: 100 }), { b: 300 });
  assert.deepEqual(getFlexSizes(definitions, 500, { a: 150 }), { b: 280 });
  assert.deepEqual(getFlexSizes(definitions, 100, {}), { a: 80, b: 80 });
});

test("flex allocation redistributes mixed min/max constraints independently of column order", () => {
  const definitions = [
    { field: "a", flex: 1, minWidth: 300 },
    { field: "b", flex: 1, maxWidth: 200 },
  ];
  for (const columns of [definitions, [...definitions].reverse()]) {
    assert.deepEqual(getFlexSizes(columns, 500, {}), { a: 300, b: 200 });
    assert.deepEqual(getFlexSizes(columns, 450, {}), { a: 300, b: 150 });
    assert.deepEqual(getFlexSizes(columns, 600, {}), { a: 400, b: 200 });
    assert.deepEqual(getFlexSizes(columns, 100, {}), { a: 300, b: 60 });
  }
  assert.deepEqual(
    getFlexSizes(
      [
        { field: "a", flex: 1, maxWidth: 100 },
        { field: "b", flex: 1, maxWidth: 100 },
      ],
      500,
      {},
    ),
    { a: 100, b: 100 },
  );
});

function orderingTable(columnDefs, tableOptions) {
  let table;
  render({
    columnDefs: columnDefs.map(column => ({
      ...column,
      cellRenderer: params => {
        table = params.api.table;
        return null;
      },
    })),
    tableOptions,
  });
  return table;
}

test("column dragging changes header/body order without losing hidden or dynamically appended columns", () => {
  const table = orderingTable([{ field: "name" }, { colId: "hidden", hide: true }, { field: "price" }, { field: "updated" }], {
    initialState: { columnOrder: ["price", "name"] },
  });
  assert.equal(moveDataTableColumn(table, "price", "updated"), true);
  assert.deepEqual(
    table.getVisibleLeafColumns().map(column => column.id),
    ["name", "updated", "price"],
  );
  assert.ok(table.atoms.columnOrder.get().includes("hidden"));
  assert.ok(table.atoms.columnOrder.get().includes("__external"));
  assert.deepEqual(
    table
      .getRowModel()
      .rows[0].getVisibleCells()
      .map(cell => cell.column.id),
    ["name", "updated", "price"],
  );
});

test("column dragging reorders pinned sections while preserving their pinning", () => {
  for (const region of ["start", "end"]) {
    const table = orderingTable([{ field: "name", pinned: region }, { field: "price", pinned: region }, { field: "updated" }]);
    assert.equal(moveDataTableColumn(table, "name", "price"), true);
    assert.deepEqual(table.atoms.columnPinning.get()[region], ["price", "name"]);
    assert.deepEqual(table.atoms.columnOrder.get(), []);
    assert.equal(table.getColumn("name").getIsPinned(), region);
    assert.equal(moveDataTableColumn(table, "name", "updated"), false);
  }
});

test("self/invalid/hidden targets cannot reorder columns; controlled order emits a replacement without mutating the owner", () => {
  const initial = ["name", "price", "updated"];
  let requested;
  const table = orderingTable([{ field: "name" }, { field: "price" }, { field: "updated", hide: true }], {
    state: { columnOrder: initial },
    onColumnOrderChange: value => {
      requested = typeof value === "function" ? value(initial) : value;
    },
  });
  assert.equal(moveDataTableColumn(table, "name", "name"), false);
  assert.equal(moveDataTableColumn(table, "name", "updated"), false);
  assert.equal(moveDataTableColumn(table, "__external", "price"), false);
  assert.equal(moveDataTableColumn(table, "name", "price"), true);
  assert.deepEqual(requested, ["price", "name", "updated", "__external"]);
  assert.deepEqual(initial, ["name", "price", "updated"]);
  assert.deepEqual(
    table.getVisibleLeafColumns().map(column => column.id),
    ["name", "price"],
  );
});

test("whole headers support keyboard dragging without grip buttons and print omits drag instructions", () => {
  assert.match(render(), /role="columnheader" tabindex="0" aria-label="Name"/);
  assert.match(render(), /Drag to reorder/);
  assert.doesNotMatch(render(), /aria-label="Move column/);
  assert.doesNotMatch(render({ domLayout: "print" }), /Drag to reorder|role="columnheader" tabindex="0"/);
});

test("select filters match whole case-sensitive values, including numeric zero and booleans", () => {
  assert.equal(matchesFilter("Alpha", "Alpha", "select"), true);
  assert.equal(matchesFilter("Alphabet", "Alpha", "select"), false);
  assert.equal(matchesFilter("alpha", "Alpha", "select"), false);
  assert.equal(matchesFilter(0, { operator: "equals", value: "0" }, "select"), true);
  assert.equal(matchesFilter(false, { operator: "equals", value: "false" }, "select"), true);
  assert.equal(matchesFilter(null, { operator: "blank" }, "select"), true);
  assert.equal(matchesFilter("", { operator: "blank" }, "select"), true);
  assert.equal(matchesFilter("Alpha", { operator: "equals", value: "" }, "select"), true);
  assert.equal(matchesFilter("Alpha", { operator: "notEqual", value: "Beta" }, "select"), true);
});

test("select filters integrate with nested/computed accessors, search, and pagination", () => {
  const columnDefs = [
    { field: "nested.status", filter: "select" },
    { colId: "computed", filter: "select", valueGetter: ({ data }) => data.nested.status },
  ];
  const rowData = [
    { id: "a", nested: { status: "Active" } },
    { id: "b", nested: { status: "Inactive" } },
    { id: "c", nested: { status: "Active" } },
  ];
  for (const id of ["nested.status", "computed"]) {
    assert.deepEqual(
      ids(
        render({
          rowData,
          columnDefs,
          quickFilterText: "active",
          pagination: true,
          paginationPageSize: 1,
          tableOptions: { state: { columnFilters: [{ id, value: { operator: "equals", value: "Active" } }] } },
        }),
      ),
      ["a"],
    );
  }
});

test("detail panels are opt-in, respect eligibility and span the visible columns", () => {
  const renderSubComponent = ({ row }) => React.createElement("p", null, `Details for ${row.original.name}`);
  assert.doesNotMatch(render(), /Expand row|Row details|data-expanded-row-id/);
  const options = {
    renderSubComponent,
    getRowCanExpand: row => row.id !== "b",
    rowSelection: { mode: "multiRow" },
    tableOptions: { state: { expanded: true, columnVisibility: { updated: false } } },
  };
  const html = render(options);
  assert.match(html, /Details for Alpha/);
  assert.match(html, /Details for Gamma/);
  assert.doesNotMatch(html, /Details for Beta|Collapse row b/);
  assert.match(html, /aria-label="Collapse row a" aria-expanded="true" aria-controls=/);
  assert.match(html, /aria-colspan="4"/);
  assert.match(html, /aria-rowcount="6"/);
  assert.match(html, /aria-rowindex="4"[^>]*data-row-id="b"/);
  assert.doesNotMatch(render({ ...options, tableOptions: { enableExpanding: false, state: { expanded: true } } }), /Details for|Collapse row/);
});

test("expanded details follow their parent through sorting, pagination, pinning and print", () => {
  const renderSubComponent = ({ row }) => `Details for ${row.original.name}`;
  const options = {
    renderSubComponent,
    pagination: true,
    paginationPageSize: 1,
    tableOptions: { initialState: { expanded: { a: true, b: true }, rowPinning: { top: ["a"] }, sorting: [{ id: "price", desc: false }] } },
  };
  const html = render(options);
  assert.deepEqual(ids(html), ["a", "c"]);
  assert.match(html, /Details for Alpha/);
  assert.doesNotMatch(html, /Details for Beta/);
  const printed = render({ ...options, domLayout: "print" });
  assert.match(printed, /Details for Alpha/);
  assert.match(printed, /Details for Beta/);
  assert.doesNotMatch(printed, /Expand row|Collapse row|Row details/);
});

test("native expansion APIs update internal state and emit controlled requests", () => {
  const table = orderingTable(columns, { initialState: { expanded: { a: true } } });
  assert.equal(table.getRow("a").getIsExpanded(), true);
  // Eligibility and disclosure are enabled by the detail renderer.
  let detailTable;
  render({
    renderSubComponent: () => null,
    columnDefs: [
      {
        field: "name",
        cellRenderer: ({ api }) => {
          detailTable = api.table;
          return null;
        },
      },
    ],
  });
  const row = detailTable.getRow("a");
  row.getToggleExpandedHandler()();
  assert.equal(row.getIsExpanded(), true);
  row.toggleExpanded(false);
  assert.equal(row.getIsExpanded(), false);
  let requested;
  const controlled = orderingTable(columns, {
    state: { expanded: {} },
    onExpandedChange: updater => {
      requested = typeof updater === "function" ? updater({}) : updater;
    },
  });
  controlled.setExpanded({ a: true });
  assert.deepEqual(requested, { a: true });
  assert.equal(controlled.getRow("a").getIsExpanded(), false);
});
