# DataTable

TanStack Table v9 with Matrix styling. `DataGrid` continues to use AG Grid; both components can coexist while screens migrate.

Import the library stylesheet as usual. Give the table a sized parent for virtualization:

```tsx
import {
  DataTable,
  DataTableActionBar,
  DataTableContent,
  DataTableSearchAction,
  DataTableFreezeAction,
  DataTableColumnsAction,
  DataTablePrintAction,
  type DataTableColumn,
} from "@trsys-tech/matrix-library";

type Vehicle = { id: string; model: string; price: number };

const columns: DataTableColumn<Vehicle>[] = [
  { field: "model", headerName: "Model", flex: 1, minWidth: 150, filter: "text", pinned: "start" },
  {
    field: "price",
    headerName: "Price",
    width: 130,
    cellDataType: "number",
    filter: "number",
    align: "end",
    tableOptions: { enableHiding: true, enablePinning: true },
  },
];

function Vehicles({ rows }: { rows: Vehicle[] }) {
  return (
    <div style={{ height: 400 }}>
      <DataTable>
        <DataTableActionBar>
          <DataTableSearchAction />
          <DataTableFreezeAction className="mtx-ms-auto" />
          <DataTableColumnsAction />
          <DataTablePrintAction />
        </DataTableActionBar>
        <DataTableContent
          rowData={rows}
          columnDefs={columns}
          rowSelection={{ mode: "multiRow", selectAll: "filtered" }}
          pagination
          paginationPageSize={25}
        />
      </DataTable>
    </div>
  );
}
```

Keep column definitions and derived row arrays stable with module constants, state, or `useMemo`. Use stable application row IDs. `getRowId(data, index)` accepts string or numeric IDs (use one type consistently per table), defaults to `data.id`, and falls back to the input index. IDs are normalized with `String(...)` internally, in renderers, and in callbacks; native `api.table` state also uses strings. The DataTable selection, pinning, editing, focus, and scrolling APIs accept either string or numeric IDs, so `getRowId={row => row.id}` and `api.startEditingRow(42)` work with numeric data. Index identity is suitable only for static data. IDs must be unique and immutable after normalization, each record object must appear at most once in `rowData`, and column IDs beginning with `__` are reserved.

## Migration from DataGrid

| Existing usage                                                                  | DataTable equivalent                                                                                                  |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `DataGrid`, `DataGridContent`, `DataGridActionBar`                              | `DataTable`, `DataTableContent`, `DataTableActionBar`                                                                 |
| `SearchAction`, `FreezeAction`, `PrintAction`, etc.                             | `DataTableSearchAction`, `DataTableFreezeAction`, `DataTablePrintAction`, etc.                                        |
| `ColDef<T>`                                                                     | `DataTableColumn<T>`; independent of AG Grid                                                                          |
| `rowData`, `columnDefs`, `defaultColDef`                                        | Same names                                                                                                            |
| `field`, `colId`, `headerName`, `width`, `minWidth`, `maxWidth`, `flex`, `hide` | Same names                                                                                                            |
| `pinned: "left" / "right"`                                                      | Accepted; prefer logical `"start" / "end"` for RTL                                                                    |
| `filter: "agTextColumnFilter"`, etc.                                            | `filter: "text" / "number" / "date" / "select"`; `true` uses `cellDataType` or text                                              |
| `valueGetter`, `valueFormatter`, `getQuickFilterText`                           | Same names with `{ data, value }` arguments as applicable                                                             |
| `cellRenderer` / `cellEditor`                                                   | React components with `DataTableCellParams<T>` / `DataTableEditorProps<T>`                                            |
| `params.node.rowIndex`, `params.data`, `params.api`                             | `params.rowIndex`, `params.data`, `params.api`; actions should use stable `rowId`                                     |
| `getRowId({ data })`                                                            | `getRowId(data, index)`                                                                                               |
| `onGridReady({ api })` / AG Grid ref                                            | `onReady(api)` / `ref<DataTableApi<T>>`                                                                               |
| `onSelectionChanged(event)`                                                     | `onSelectionChanged(selectedRows, selectedIds)`                                                                       |
| `isRowSelectable(node)`                                                         | `rowSelection.isRowSelectable(data)`                                                                                  |
| `isExternalFilterPresent` + `doesExternalFilterPass` + `api.onFilterChanged()`  | Reactive `externalFilter(data)` predicate; memoize it when possible                                                   |
| `getRowClass(params)` / `rowClassRules`                                         | Callbacks receive the row data directly                                                                               |
| `getFullRowEditValidationErrors`                                                | `validateRow(draft, original)` and/or `column.validate(value, draft)`                                                 |
| `onRowEditingStopped` / `onCellEditingStopped`                                  | `onEditCommit({ rowId, original, data, changes })`; cancellation has a separate `onEditCancel`                        |
| `readOnlyEdit` / `onCellEditRequest`                                            | `readOnlyEdit` / `onEditRequest`                                                                                      |
| `suppressKeyboardEvent`                                                         | `column.onKeyDown(event, params)`; call `event.preventDefault()`                                                      |
| `alignedGrids` refs                                                             | Wrap independent tables in `DataTableAlignment`                                                                       |
| AG Grid theme objects / `.ag-*` CSS                                             | Matrix tokens, root `style`/`className`, `containerStyle`, `cellClass`, `getRowClass`, and stable `data-*` attributes |

AG Grid types, renderer hooks, node objects, and the full `GridApi` are not accepted. Custom renderers/editors and helpers that query `.ag-*` elements must be migrated. Action columns named `actions` or `action` suppress row-click selection; other interactive columns can set `suppressRowClick` or mark controls with `data-row-action`.

## Editing and form integration

Set `editable` on individual columns. Double-click or press Enter/F2 in a cell to edit; `suppressClickEdit` disables double-click initiation. `editType="fullRow"` starts a row transaction. The content supplies Save/Cancel controls. Custom row action buttons can call `api.startEditingRow(rowId)` or `api.startEditingCell({ rowId, columnId })`.

`api.stopEditing()` validates and returns `false` when validation blocks saving. `api.stopEditing(true)` cancels without calling a commit/request callback. `validateRow` receives both the draft and original record. Column validation runs for editable columns in the active transaction, including unchanged fields in full-row mode.

The default editing mode stores immutable local row patches and calls `onEditCommit`. A replacement input record supersedes its local patch. For form arrays, server-owned data, or explicit mutation requests, prefer `readOnlyEdit` and update the parent in `onEditRequest`:

```tsx
<DataTableContent
  rowData={rows}
  columnDefs={editableColumns}
  readOnlyEdit
  validateRow={draft => (draft.quantity > 0 ? null : ["Quantity must be positive"])}
  onEditRequest={({ rowId, data }) => {
    setRows(previous => previous.map(row => (row.id === rowId ? data : row)));
  }}
/>
```

Editors receive `value`, `data`, `onValueChange`, `errors`, `commit`, and `cancel`. Use `cellEditor="number"` or `cellDataType="number"` for numeric inputs. `cellDataType="date"` opens a native date picker, and built-in editors never round-trip values through `String(value)`: `Date` values render as `yyyy-MM-dd` and typed date input parses back to a local `Date` for `cellDataType="date"` columns or columns whose current value is a `Date`, while other columns keep the typed string. Use `valueParser` (or a custom `cellEditor`) for other date formats. A React editor can compose Matrix `Combobox` for lookup values. Use `valueParser` for normalization and `valueSetter` for computed/nested values. Editing never mutates the input records. Replacing/removing an input record cancels its active edit.

## Selection, pinning, and layout

Column hiding and pinning controls are disabled by default. Enable either per column with `tableOptions: { enableHiding: true, enablePinning: true }`. To opt in all columns, set these options on `defaultColDef.tableOptions`. Initial `hide` and `pinned` values still configure the layout independently of these controls.

Selection can be single or multiple, with optional checkboxes and click selection. Select-all supports `filtered`, `all` (all locally loaded records), and `currentPage`. Checkbox Shift-click supports ranges. Action controls do not trigger row selection. The ref exposes `getSelectedRows`, `setSelectedRowIds`, `selectAll`, and `deselectAll`; `api.table.getSelectedRowIds()` includes IDs that may not be loaded under manual pagination.

Freeze pins selected data records and clears selection. `DataTableFreezeAction position="bottom"` freezes at the bottom. `api.pinRows(ids, "top" | "bottom" | false)` controls records individually. Pinned records remain visible through search, filters, and pagination by default; set `tableOptions.keepPinnedRows=false` to limit them to the current model. `pinnedTopRowData` and `pinnedBottomRowData` render separate, non-editable/non-selectable summary records.

Click and drag anywhere on a column header (including its label) to reorder it. A simple click on the label still sorts; column menus and resize controls do not start dragging. Mouse and touch input are supported. For keyboard input, focus the column header itself, press Space or Enter to pick it up, use the arrow keys to choose a target, and press Space or Enter to drop; Escape cancels. Columns move within their current pinned or unpinned section; use the column menu to change pinning. Reordering preserves hidden columns and synchronizes aligned tables. Controlled tables receive their normal `onColumnOrderChange` callback (or `onColumnPinningChange` for a pinned section).

Column menus provide filtering with operators and Apply/Reset, pinning, and hiding. Set `filter: "select"` to choose from sorted, distinct nonblank accessor values across all locally loaded rows (before filtering or pagination). Supply `filterOptions` to replace inferred choices with strings or `{ value: string, label: string }` objects; supplied order and labels are preserved, and `[]` gives no inferred choices. Use string values for numeric/boolean choices (e.g. `"0"`, `"false"`); the empty string is reserved for All. Select matching is exact and case-sensitive. Choose All or Reset to clear the value, or use Blank/Not blank for empty values. Every other operator, including Not equal and Does not contain, skips rows whose value is blank. Choices stay available when other filters are active. For server data, provide the complete options separately because loaded rows may contain only one page. Headers support sorting and Shift-click multi-sort. Resize with the resize handles or focus a resize handle and press Left/Right. Double-click a resize handle to reset. `DataTableColumnsAction` restores hidden columns. Dragging is disabled in print layout.

`DataTableAlignment` shares column sizing/order/pinning/visibility and horizontal scroll. Use matching column IDs and definitions across members; keep selection checkbox visibility and viewport widths consistent for exact alignment. Data, filters, sorting, editing, and selection stay independent. Provider `initialState` can define the shared layout. Avoid controlling the same layout slices individually when using this provider.

Rows are virtualized by default and have a fixed `rowHeight`. When a visible detail panel is expanded, row virtualization pauses so arbitrary-height content can flow naturally; it resumes after all visible details close. Set `virtualize=false` or `domLayout="autoHeight"` for small natural-height embedded tables. The ref provides `scrollToRow(rowId)` and `focusCell(rowId, columnId)`. Horizontal column virtualization and variable-height rows are not included.

## Expandable detail panels

Supply `renderSubComponent` to show a disclosure button and a full-width detail panel beneath each expanded record, following [TanStack's sub-components example](https://github.com/tanstack/table/tree/main/examples/react/sub-components). Summary rows do not expand. Optionally limit eligibility with `getRowCanExpand`:

```tsx
<DataTableContent
  rowData={rows}
  columnDefs={columns}
  getRowCanExpand={row => row.original.hasDetails}
  renderSubComponent={({ row, api }) => <RecordDetails record={row.original} />}
  tableOptions={{ initialState: { expanded: { "record-1": true } } }}
/>
```

The renderer receives the typed TanStack `row` and Matrix `api`. Expansion is internally managed by default. Control it with `tableOptions.state.expanded` and `tableOptions.onExpandedChange`, or call `api.table.getRow(id).toggleExpanded()` / `api.table.toggleAllRowsExpanded()`. `tableOptions.enableExpanding=false` disables detail expansion. Disclosure buttons support keyboard activation and do not trigger row selection or row-click callbacks. Details follow their parent through sorting, filtering, pagination, and pinning. Print includes currently expanded panels and omits disclosure controls. This API renders custom detail content; hierarchical child records are outside this feature's scope.

## Controlled state and server data

`api.table` exposes the native instance for registered sorting, filtering, expansion, selection, pagination, pinning, sizing, ordering, and visibility features. Use `tableOptions.state` with the matching `on…Change` callback to control native state. Global search uses `quickFilterText` with `onQuickFilterTextChange`. Callbacks that receive TanStack updaters must support both values and functions.

`DataTableSearchAction` filters the current rows automatically by default. Pass `onValueChange` to handle search externally instead: it receives the text on typing and `""` on clear or close, without updating the table's global filter. Replace `rowData` with your API results or externally filtered records. The action manages its input text, or you can control it with `value`; `defaultValue` sets the initial text in external mode. Debouncing, fetching, and handling stale responses belong to the caller.

```tsx
const [query, setQuery] = React.useState("");
// Fetch using query (for example, with your query library) and pass results as rowData.
<DataTable>
  <DataTableActionBar>
    <DataTableSearchAction value={query} onValueChange={setQuery} />
  </DataTableActionBar>
  <DataTableContent rowData={results} columnDefs={columns} />
</DataTable>;
```

External action search does not require `manualFiltering`; column filters continue to work locally. Existing `quickFilterText` or native global-filter state still applies independently, so leave it empty when the API handles global search.

For server pages, set `pagination`, `tableOptions.manualPagination=true`, and supply `rowCount` or `pageCount`; return only the fetched page in `rowData`. Server sorting/filtering through native table state also require `manualSorting`/`manualFiltering` and the corresponding controlled state/callbacks to drive your fetches. Manual modes trust the supplied records and never fetch data themselves. Pinned/selected row objects and printed data can only materialize records currently loaded in the client.

Use the existing native callbacks to call your API or update the query state used by your fetching library:

```tsx
const [columnFilters, setColumnFilters] = React.useState<DataTableState["columnFilters"]>([]);
const [sorting, setSorting] = React.useState<DataTableState["sorting"]>([]);
const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 25 });
const [search, setSearch] = React.useState("");
const resetPage = () => setPagination(previous => ({ ...previous, pageIndex: 0 }));
// A selection column can include choices absent from result.rows:
const serverColumns: DataTableColumn<Vehicle>[] = [
  { field: "model", filter: "select", filterOptions: [{ value: "Model Y", label: "Tesla Model Y" }, "Corolla"] },
];

// Fetch using { columnFilters, sorting, pagination, search }.
// result.rows is the requested page; result.total is the count after filtering.
// Keep previous results or provide [] while loading, and handle stale responses/errors in the caller.

<DataTable>
  <DataTableActionBar>
    <DataTableSearchAction value={search} onValueChange={value => { setSearch(value); resetPage(); }} />
  </DataTableActionBar>
  <DataTableContent
    rowData={result.rows}
    columnDefs={serverColumns}
    loading={loading}
    pagination
    tableOptions={{
      manualFiltering: true,
      manualSorting: true,
      manualPagination: true,
      rowCount: result.total,
      state: { columnFilters, sorting, pagination },
      onColumnFiltersChange: updater => { setColumnFilters(updater); resetPage(); },
      onSortingChange: updater => { setSorting(updater); resetPage(); },
      onPaginationChange: setPagination,
    }}
  />
</DataTable>;
```

Import `DataTableState` for the controlled state types. Filter callbacks receive `{ id, value }[]`, with `value` containing `{ operator, value?, valueTo? }`; Reset removes that column's entry. Sorting is `{ id, desc }[]`, including multi-sort; pagination is `{ pageIndex, pageSize }` with a zero-based index. Each manual flag can be enabled independently, but local processing can see only loaded records. Server pagination does not automatically reset on filter/sort changes, so the example resets it in the caller. `externalFilter(data)` remains a local predicate and is bypassed by `manualFiltering` too.

Alternatively, use `tableOptions.state.globalFilter` and `onGlobalFilterChange` with the default search action; `quickFilterText` takes precedence when supplied. See the `ExternalData` story for a runnable example with a simulated asynchronous API.

## Printing and reports

`DataTablePrintAction` and `api.print()` expand the loaded filtered result across client pages, omit selection/menu controls, and print a cloned document with Matrix styles. Columns marked `hideInPrint` are omitted. The original layout is restored, including scroll position.

To capture a composed report with several tables:

```tsx
const restores = await Promise.all(tableApis.map(api => api.preparePrint()));
try {
  captureOrPrintReport(reportElement);
} finally {
  restores.forEach(restore => restore());
}
```

The returned restore functions are idempotent. `domLayout="print"` also supports a parent-controlled report flow. Update Remap's print readiness checks and `.ag-*` styles to use `[data-print-layout="true"]`, `[data-data-table]`, `[data-data-table-content]`, `[data-data-table-viewport]`, `[data-row-id]`, `[data-column-id]`, `[data-pinned]`, and `[data-print-hidden]`. Whole-report printing should expand sized ancestors and wait for the report layout before capturing. Server pages are not fetched automatically for printing.

## Scope and verification

This first implementation targets the inspected Remap usages. Grouping/aggregation engines, hierarchical subrows, faceted filter controls, cell ranges/spanning, row drag-and-drop, clipboard/export, and variable-height/column virtualization are not exposed by this renderer. Add those as explicit capabilities rather than assuming every TanStack feature is rendered automatically.

Storybook includes ordinary lists, search/selection/pinning, validated row editing, controlled edit requests, column filters, totals, aligned tables, 10,000 virtualized rows, and print layout. Interaction stories cover representative migration flows. `npm test` includes the DataTable model/rendering regression suite.
