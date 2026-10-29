import * as l from "react";
import { useTable as K, functionalUpdate as r } from "@tanstack/react-table";
import { dataTableFeatures as W } from "./datatablefeatures.es.js";
import { getColumnId as o, getFlexSizes as X, matchesFilter as Y, filterType as Z, getCellValue as $ } from "./datatablemodel.es.js";
const E = [];
function ne({
  rowData: g,
  columnDefs: z,
  defaultColDef: V,
  getRowId: x,
  paginationPageSize: M,
  tableOptions: t,
  externalFilter: C,
  rowSelection: S,
  pagination: L,
  renderSubComponent: k,
  getRowCanExpand: q,
  onQuickFilterTextChange: B,
  patches: R,
  alignment: s,
  isPrinting: _,
  viewportWidth: v,
  selectionWidth: w,
  searchText: p,
  setSearch: H
}) {
  const [N, j] = l.useState(t?.initialState?.columnSizing ?? {}), [G, D] = l.useState({}), [I, Q] = l.useState(t?.initialState?.columnFilters ?? []), m = l.useCallback(
    (e, i) => String(x?.(e, i) ?? e?.id ?? i),
    [x]
  ), a = l.useMemo(() => {
    const e = z.map((n) => ({ ...V, ...n })), i = e.map(o);
    if (new Set(i).size !== i.length) throw new Error("DataTable column ids must be unique.");
    return e;
  }, [z, V]), b = l.useMemo(() => new Map(a.map((e) => [o(e), e])), [a]), U = l.useMemo(() => {
    const e = (g ?? E).map((i, n) => [m(i, n), i]);
    if (new Set(e.map(([i]) => i)).size !== e.length) throw new Error("DataTable row ids must be unique.");
    return new Map(e);
  }, [g, m]), f = l.useMemo(
    () => (g ?? E).map((e, i) => {
      const n = R[m(e, i)];
      return n?.source === e ? n.data : e;
    }),
    [g, R, m]
  ), d = l.useMemo(() => new Map(f.map((e, i) => [e, i])), [f]), h = l.useMemo(
    () => ({
      columnVisibility: Object.fromEntries(a.filter((e) => e.hide).map((e) => [o(e), !1])),
      columnPinning: {
        start: a.filter((e) => e.pinned === "left" || e.pinned === "start").map(o),
        end: a.filter((e) => e.pinned === "right" || e.pinned === "end").map(o)
      },
      pagination: { pageIndex: 0, pageSize: M },
      ...t?.initialState
    }),
    [a, M, t?.initialState]
  ), A = l.useMemo(
    () => [
      ...(t?.state?.columnFilters ?? I).filter((e) => e.id !== "__external"),
      ...C ? [{ id: "__external", value: C }] : []
    ],
    [t?.state?.columnFilters, I, C]
  ), F = l.useMemo(
    () => ({
      ...h.columnVisibility,
      ...G,
      ...s?.state.columnVisibility,
      ...t?.state?.columnVisibility,
      __external: !1
    }),
    [h.columnVisibility, G, s?.state.columnVisibility, t?.state?.columnVisibility]
  ), y = t?.state?.columnSizing ?? s?.state.columnSizing ?? N, P = l.useMemo(
    () => X(
      a.filter((e) => F[o(e)] !== !1 && (!_ || !e.hideInPrint)),
      Math.max(0, v - w),
      y
    ),
    [a, F, _, v, w, y]
  ), J = l.useMemo(
    () => [
      ...a.map((e) => ({
        id: o(e),
        header: typeof e.headerName == "string" ? e.headerName : o(e),
        accessorFn: (i, n) => $(i, e, d.get(i) ?? n),
        size: P[o(e)] ?? e.width ?? 150,
        minSize: e.minWidth ?? 60,
        maxSize: e.maxWidth,
        enableSorting: e.sortable !== !1 && (!!e.field || !!e.valueGetter),
        enableColumnFilter: !!e.filter,
        enableGlobalFilter: !!e.field || !!e.valueGetter,
        enableResizing: e.resizable !== !1,
        enableHiding: !1,
        enablePinning: !1,
        sortFn: e.cellDataType === "number" ? "basic" : e.cellDataType === "date" ? "datetime" : "alphanumeric",
        filterFn: (i, n, c) => Y(i.getValue(n), c, Z(e)),
        ...e.tableOptions
      })),
      {
        id: "__external",
        enableHiding: !1,
        enablePinning: !1,
        accessorFn: () => !0,
        enableGlobalFilter: !1,
        enableSorting: !1,
        filterFn: (e, i, n) => n(e.original)
      }
    ],
    [a, d, P]
  ), u = K({
    columnResizeMode: "onChange",
    sortDescFirst: !1,
    keepPinnedRows: !0,
    enableRowSelection: (e) => !!S && (S.isRowSelectable?.(e.original) ?? !0),
    enableMultiRowSelection: S?.mode === "multiRow",
    enableSubRowSelection: !1,
    manualPagination: !L,
    getColumnCanGlobalFilter: (e) => {
      const i = b.get(e.id);
      return !!i && (!!i.field || !!i.valueGetter);
    },
    globalFilterFn: (e, i, n) => {
      const c = b.get(i), T = e.getValue(i);
      return String(c?.getQuickFilterText?.({ data: e.original, value: T }) ?? T ?? "").toLocaleLowerCase().includes(String(n).toLocaleLowerCase());
    },
    ...t,
    getRowCanExpand: (e) => !!k && t?.enableExpanding !== !1 && (q?.(e) ?? t?.getRowCanExpand?.(e) ?? !0),
    features: W,
    columns: J,
    data: f,
    getRowId: (e, i) => m(e, d.get(e) ?? i),
    initialState: h,
    state: {
      ...s?.state,
      ...t?.state,
      columnSizing: y,
      columnVisibility: F,
      columnFilters: A,
      globalFilter: p
    },
    onColumnSizingChange: (e) => {
      const i = r(e, u.atoms.columnSizing.get());
      j(i), t?.onColumnSizingChange?.(e);
    },
    onColumnVisibilityChange: (e) => {
      const i = r(e, u.atoms.columnVisibility.get());
      D(i), t?.onColumnVisibilityChange?.(e);
    },
    onColumnFiltersChange: (e) => {
      const i = (n) => r(e, n).filter((c) => c.id !== "__external");
      t?.state?.columnFilters === void 0 && Q(i), t?.onColumnFiltersChange?.(i);
    },
    onGlobalFilterChange: (e) => {
      const i = r(e, p);
      H(i), B?.(i), t?.onGlobalFilterChange?.(e);
    },
    ...s ? {
      onColumnSizingChange: (e) => {
        const i = r(e, u.atoms.columnSizing.get());
        s.setState((n) => ({ ...n, columnSizing: i })), t?.onColumnSizingChange?.(e);
      },
      onColumnOrderChange: (e) => {
        const i = r(e, u.atoms.columnOrder.get());
        s.setState((n) => ({ ...n, columnOrder: i })), t?.onColumnOrderChange?.(e);
      },
      onColumnPinningChange: (e) => {
        const i = r(e, u.atoms.columnPinning.get());
        s.setState((n) => ({ ...n, columnPinning: i })), t?.onColumnPinningChange?.(e);
      },
      onColumnVisibilityChange: (e) => {
        const i = r(e, u.atoms.columnVisibility.get());
        s.setState((n) => ({ ...n, columnVisibility: i })), t?.onColumnVisibilityChange?.(e);
      }
    } : {}
  });
  return { table: u, definitionsById: b, sourcesById: U, data: f, rowIndices: d, resolveId: m };
}
export {
  ne as useDataTableInstance
};
//# sourceMappingURL=usedatatableinstance.es.js.map
