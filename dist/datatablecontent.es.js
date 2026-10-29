import { jsxs as S, jsx as m } from "react/jsx-runtime";
import * as r from "react";
import { DragDropProvider as be, DragOverlay as we } from "@dnd-kit/react";
import { useVirtualizer as ye } from "@tanstack/react-virtual";
import { cn as Ct } from "./utils.es.js";
import { Button as kt } from "./button.es.js";
import { useDataTable as Ie, DataTableAlignmentContext as ve } from "./datatablecontext.es.js";
import { dataTableColumnSensors as Re } from "./datatablecolumndrag.es.js";
import { getActiveDataTableCell as Ce } from "./datatablemodel.es.js";
import { useDataTableInstance as ke } from "./usedatatableinstance.es.js";
import { DataTableHeader as Ee } from "./datatableheader.es.js";
import { DataTablePagination as Se } from "./datatablepagination.es.js";
import { DataTableRowView as _e } from "./datatablerowview.es.js";
import { useDataTableColumnDrag as Pe } from "./usedatatablecolumndrag.es.js";
import { useDataTableMotion as De } from "./usedatatablemotion.es.js";
import { useDataTableApi as Te } from "./usedatatableapi.es.js";
const Et = [], Ae = {};
function ze({
  rowData: St,
  columnDefs: J,
  defaultColDef: _t = Ae,
  getRowId: Pt,
  onReady: et,
  rowSelection: p,
  renderSubComponent: z,
  getRowCanExpand: Dt,
  onSelectionChanged: nt,
  quickFilterText: Tt,
  onQuickFilterTextChange: At,
  externalFilter: zt,
  loading: N = !1,
  emptyContent: Nt = "No rows to display",
  loadingContent: jt = "Loading…",
  rowHeight: K = 36,
  headerHeight: j = 40,
  getRowClass: Mt,
  rowClassRules: Lt,
  pinnedTopRowData: _ = Et,
  pinnedBottomRowData: M = Et,
  pagination: L = !1,
  paginationPageSize: Vt = 25,
  paginationPageSizeSelector: Wt = [10, 25, 50, 100],
  virtualize: Ft = !0,
  overscan: $t = 8,
  domLayout: rt = "normal",
  suppressHorizontalScroll: Ot = !1,
  editType: st = "cell",
  suppressClickEdit: Jt = !1,
  readOnlyEdit: ot = !1,
  validateRow: it,
  onEditCommit: lt,
  onEditRequest: at,
  onEditCancel: ct,
  onRowClick: Kt,
  tableOptions: P,
  containerStyle: U,
  className: Ut,
  style: Xt,
  ...dt
}, Bt) {
  "use no memo";
  const { setApi: X, search: Ht, hasSearch: Yt, setSearch: Gt, setCounts: mt } = Ie(), D = r.useContext(ve), Qt = r.useId(), y = r.useRef(null), B = r.useRef(null), [Zt, qt] = r.useState(0), [te, ee] = r.useState(!1), [H, ne] = r.useState(null), [re, se] = r.useState(null), [oe, ut] = r.useState({}), [T, ie] = r.useState(null), [le] = r.useState(() => P?.initialState?.globalFilter ?? ""), x = r.useRef(T), ft = r.useRef({ columnDefs: J, validateRow: it, readOnlyEdit: ot, onEditCommit: lt, onEditRequest: at, onEditCancel: ct });
  ft.current = { columnDefs: J, validateRow: it, readOnlyEdit: ot, onEditCommit: lt, onEditRequest: at, onEditCancel: ct };
  const gt = r.useCallback((t) => {
    x.current = t, ie(t);
  }, []), l = te || rt === "print", pt = l || rt === "autoHeight", ae = Tt ?? P?.state?.globalFilter ?? (Yt ? Ht : le), V = !!p && p.checkboxes !== !1 && !l, W = !!z && !l, Y = W ? 44 : 0, G = (V ? 44 : 0) + Y, { table: o, definitionsById: R, sourcesById: h, data: ce, rowIndices: F, resolveId: xt } = ke({
    rowData: St,
    columnDefs: J,
    defaultColDef: _t,
    getRowId: Pt,
    paginationPageSize: Vt,
    tableOptions: P,
    externalFilter: zt,
    rowSelection: p,
    pagination: L,
    renderSubComponent: z,
    getRowCanExpand: Dt,
    onQuickFilterTextChange: At,
    patches: oe,
    alignment: D,
    isPrinting: l,
    viewportWidth: Zt,
    selectionWidth: G,
    searchText: ae,
    setSearch: Gt
  }), a = [...o.getStartVisibleLeafColumns(), ...o.getCenterVisibleLeafColumns(), ...o.getEndVisibleLeafColumns()].filter(
    (t) => t.id !== "__external" && (!l || !R.get(t.id)?.hideInPrint)
  );
  if (H) {
    const t = a.findIndex((n) => n.id === H.sourceId), e = a.findIndex((n) => n.id === H.targetId);
    t >= 0 && e >= 0 && a.splice(e, 0, a.splice(t, 1)[0]);
  }
  const A = new Map(a.map((t) => [t.id, t.getSize()])), Q = G + a.reduce((t, e) => t + A.get(e.id), 0), g = o.getTopRows(), b = o.getBottomRows(), ht = new Set([...g, ...b].map((t) => t.id)), d = (l ? o.getPrePaginatedRowModel().rows : o.getRowModel().rows).filter((t) => !ht.has(t.id)), Z = (t) => !!z && t.getCanExpand() && t.getIsExpanded(), de = [...g, ...d, ...b].some(Z), C = Ft && !pt && !de, bt = (g.length + _.length) * K, $ = ye({
    count: d.length,
    getScrollElement: () => y.current,
    estimateSize: () => K,
    getItemKey: (t) => d[t].id,
    overscan: $t,
    scrollMargin: j + bt,
    enabled: C,
    useFlushSync: !1
  }), I = r.useRef({
    table: o,
    definitionsById: R,
    centerRows: d,
    virtualizer: $,
    resolveId: xt,
    rowIndices: F,
    sourcesById: h,
    useVirtualRows: C,
    pagination: L,
    serverPagination: P?.manualPagination === !0
  });
  I.current = {
    table: o,
    definitionsById: R,
    centerRows: d,
    virtualizer: $,
    resolveId: xt,
    rowIndices: F,
    sourcesById: h,
    useVirtualRows: C,
    pagination: L,
    serverPagination: P?.manualPagination === !0
  };
  const me = Pe({ runtime: I, viewportRef: y, contentRef: B, setColumnDrag: ne }), s = Te({ runtime: I, editRef: x, configRef: ft, updateEdit: gt, setPatches: ut, contentRef: B, viewportRef: y, setPrinting: ee });
  r.useImperativeHandle(Bt, () => s, [s]), r.useEffect(() => (X(s), () => X((t) => t === s ? null : t)), [s, X]);
  const wt = r.useRef(et);
  wt.current = et, r.useEffect(() => {
    wt.current?.(s);
  }, [s]);
  const yt = r.useRef(nt);
  yt.current = nt, r.useEffect(() => {
    const t = I.current.table, e = t.getSelectedRowModel().rows.map((n) => n.original);
    yt.current?.(e, t.getSelectedRowIds());
  }, [o.state.rowSelection, ce]), r.useEffect(() => {
    const t = I.current.table, e = t.getSelectedRowIds().length, n = (t.state.rowPinning.top?.length ?? 0) + (t.state.rowPinning.bottom?.length ?? 0);
    mt(
      (i) => i.selectedCount === e && i.pinnedCount === n ? i : { selectedCount: e, pinnedCount: n }
    );
  }, [o.state.rowSelection, o.state.rowPinning, mt]), r.useEffect(() => {
    const t = y.current;
    if (!t) return;
    const e = () => qt(t.clientWidth);
    e();
    const n = new ResizeObserver(e);
    return n.observe(t), () => n.disconnect();
  }, []), r.useEffect(() => {
    const t = y.current, e = D?.viewports.current;
    if (!(!t || !e))
      return e.add(t), () => {
        e.delete(t);
      };
  }, [D?.viewports]), r.useEffect(() => {
    x.current && h.get(x.current.rowId) !== x.current.source && s.stopEditing(!0), ut((e) => {
      const n = Object.entries(e).filter(([i, c]) => h.get(i) === c.source);
      return n.length === Object.keys(e).length ? e : Object.fromEntries(n);
    });
    const t = I.current.table;
    if (!I.current.serverPagination) {
      const e = t.atoms.rowSelection.get(), n = Object.entries(e).filter(([u]) => h.has(u));
      n.length !== Object.keys(e).length && t.setRowSelection(Object.fromEntries(n));
      const i = t.atoms.rowPinning.get(), c = i.top?.filter((u) => h.has(u)), w = i.bottom?.filter((u) => h.has(u));
      (c?.length !== i.top?.length || w?.length !== i.bottom?.length) && t.setRowPinning({ top: c, bottom: w });
    }
  }, [h, s]);
  const O = [...g, ...d, ...b], q = [
    ..._.map((t, e) => `__summary_top_${e}`),
    ...g.map((t) => t.id),
    ...d.map((t) => t.id),
    ...b.map((t) => t.id),
    ...M.map((t, e) => `__summary_bottom_${e}`)
  ], ue = new Set(O.filter(Z).map((t) => t.id));
  let tt = 0;
  const fe = new Map(
    q.map((t) => {
      const e = tt;
      return tt += ue.has(t) ? 2 : 1, [t, e];
    })
  ), It = C ? $.getVirtualItems() : [], ge = C ? [
    ...q.slice(0, _.length + g.length),
    ...It.map((t) => d[t.index].id),
    ...b.map((t) => t.id),
    ...M.map((t, e) => `__summary_bottom_${e}`)
  ] : q, pe = Ce(
    re,
    ge,
    a.map((t) => t.id)
  );
  De(y, JSON.stringify(d.map((t) => t.id)), JSON.stringify(a.map((t) => t.id)), l);
  const vt = (t, e = !1) => {
    const n = l ? !1 : t.getIsPinned(), i = a.filter((f) => f.getIsPinned() === n), c = i.findIndex((f) => f.id === t.id), w = i.slice(0, c).reduce((f, E) => f + A.get(E.id), G), u = i.slice(c + 1).reduce((f, E) => f + A.get(E.id), 0);
    return {
      width: A.get(t.id),
      flexShrink: 0,
      position: n ? "sticky" : "relative",
      insetInlineStart: n === "start" ? w : void 0,
      insetInlineEnd: n === "end" ? u : void 0,
      zIndex: n ? 2 : void 0,
      background: n ? e ? "oklch(var(--mtx-primary-50))" : "inherit" : void 0
    };
  }, xe = (t, e, n) => {
    if (t.defaultPrevented) return;
    if (t.key === "Escape" && x.current) {
      t.preventDefault(), s.stopEditing(!0);
      return;
    }
    if (t.key === "Enter" && x.current) {
      if (t.target.closest("button,select,textarea,[contenteditable=true],[role=combobox],[role=listbox]")) return;
      t.preventDefault(), s.stopEditing();
      return;
    }
    if (t.target.closest("input,select,textarea,button,[contenteditable=true]")) return;
    if (t.key === "Enter" || t.key === "F2") {
      t.preventDefault(), st === "fullRow" ? s.startEditingRow(e.id) : s.startEditingCell({ rowId: e.id, columnId: n.id });
      return;
    }
    const c = O.findIndex((v) => v.id === e.id), w = a.findIndex((v) => v.id === n.id), u = t.key === "ArrowDown" ? c + 1 : t.key === "ArrowUp" ? c - 1 : c, f = getComputedStyle(t.currentTarget).direction === "rtl" ? -1 : 1, E = t.key === "ArrowRight" ? w + f : t.key === "ArrowLeft" ? w - f : w;
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(t.key) && O[u] && a[E]) {
      t.preventDefault();
      const v = O[u];
      ht.has(v.id) || s.scrollToRow(v.id), s.focusCell(v.id, a[E].id);
    }
  }, k = (t, e, n, i, c) => /* @__PURE__ */ m(
    _e,
    {
      data: t,
      rowId: e,
      index: n,
      row: i,
      pinned: c,
      edit: T,
      editRef: x,
      updateEdit: gt,
      api: s,
      table: o,
      detailId: Qt,
      displayedIndices: fe,
      rowSelection: p,
      rowHeight: K,
      totalWidth: Q,
      getRowClass: Mt,
      rowClassRules: Lt,
      onRowClick: Kt,
      showExpanders: W,
      expanderWidth: Y,
      showCheckboxes: V,
      visibleColumns: a,
      definitionsById: R,
      activeCell: pe,
      setFocusedCell: se,
      columnStyle: vt,
      handleCellKeyDown: xe,
      suppressClickEdit: Jt,
      editType: st,
      renderSubComponent: z,
      isDetailExpanded: Z
    },
    e
  ), Rt = (p?.selectAll === "all" ? o.getCoreRowModel() : p?.selectAll === "currentPage" ? o.getRowModel() : o.getFilteredRowModel()).rows.filter((t) => t.getCanSelect()), he = Rt.filter((t) => t.getIsSelected()).length;
  return /* @__PURE__ */ S(be, { sensors: Re, ...me, children: [
    /* @__PURE__ */ m(we, { dropAnimation: null, style: { position: "fixed", pointerEvents: "none" }, children: (t) => {
      const e = R.get(t.data.columnId);
      return /* @__PURE__ */ m("div", { className: "mtx-rounded-sm mtx-border mtx-border-gray-200 mtx-bg-primary-50 mtx-px-3 mtx-py-2 mtx-text-xs mtx-font-bold mtx-shadow-md", children: e?.headerName ?? t.data.columnId });
    } }),
    /* @__PURE__ */ S(
      "div",
      {
        ref: B,
        "data-data-table-content": "",
        "data-print-layout": l || void 0,
        className: Ct("mtx-relative mtx-flex mtx-min-h-0 mtx-flex-1 mtx-flex-col mtx-rounded-b-lg", Ut),
        style: Xt,
        ...dt,
        children: [
          T && /* @__PURE__ */ S("div", { "data-print-hidden": "", className: "mtx-flex mtx-shrink-0 mtx-items-center mtx-gap-2 mtx-border-b mtx-border-gray-200 mtx-p-2", children: [
            /* @__PURE__ */ m(kt, { type: "button", size: "sm", onClick: () => s.stopEditing(), children: "Save" }),
            /* @__PURE__ */ m(kt, { type: "button", size: "sm", variant: "text", onClick: () => s.stopEditing(!0), children: "Cancel" }),
            T.errors.length > 0 && /* @__PURE__ */ m("span", { role: "alert", className: "mtx-text-danger", children: T.errors.join(". ") })
          ] }),
          /* @__PURE__ */ S(
            "div",
            {
              ref: y,
              "data-data-table-viewport": "",
              role: "grid",
              "aria-label": dt["aria-label"] ?? "Data table",
              "aria-busy": N,
              "aria-rowcount": tt + 1,
              "aria-colcount": a.length + (V ? 1 : 0) + (W ? 1 : 0),
              "aria-multiselectable": p?.mode === "multiRow" || void 0,
              className: "mtx-relative mtx-min-h-0 mtx-flex-1 mtx-rounded-b-lg",
              style: {
                ...U,
                overflow: pt ? "visible" : U?.overflow ?? "auto",
                overflowX: l ? "visible" : Ot ? "hidden" : U?.overflowX
              },
              onScroll: (t) => {
                if (D && !l)
                  for (const e of D.viewports.current)
                    e !== t.currentTarget && e.scrollLeft !== t.currentTarget.scrollLeft && (e.scrollLeft = t.currentTarget.scrollLeft);
              },
              children: [
                /* @__PURE__ */ m(
                  Ee,
                  {
                    table: o,
                    api: s,
                    headerHeight: j,
                    totalWidth: Q,
                    isPrinting: l,
                    showExpanders: W,
                    expanderWidth: Y,
                    showCheckboxes: V,
                    rowSelection: p,
                    selectionRows: Rt,
                    selectedInScope: he,
                    visibleColumns: a,
                    definitionsById: R,
                    columnStyle: vt,
                    widths: A
                  }
                ),
                (g.length > 0 || _.length > 0) && /* @__PURE__ */ S(
                  "div",
                  {
                    role: "rowgroup",
                    className: "mtx-sticky mtx-z-20",
                    style: { top: l ? void 0 : j, position: l ? "relative" : "sticky" },
                    children: [
                      _.map((t, e) => k(t, `__summary_top_${e}`, e, void 0, "top")),
                      g.map((t) => k(t.original, t.id, t.index, t, "top"))
                    ]
                  }
                ),
                /* @__PURE__ */ m("div", { role: "rowgroup", children: C ? /* @__PURE__ */ m("div", { style: { height: $.getTotalSize(), position: "relative", width: Q, minWidth: "100%" }, children: It.map((t) => {
                  const e = d[t.index];
                  return /* @__PURE__ */ m(
                    "div",
                    {
                      style: { position: "absolute", top: 0, width: "100%", transform: `translateY(${t.start - j - bt}px)` },
                      children: k(e.original, e.id, F.get(e.original) ?? e.index, e)
                    },
                    e.id
                  );
                }) }) : d.map((t) => k(t.original, t.id, F.get(t.original) ?? t.index, t)) }),
                (b.length > 0 || M.length > 0) && /* @__PURE__ */ S("div", { role: "rowgroup", className: "mtx-sticky mtx-bottom-0 mtx-z-20", style: { position: l ? "relative" : "sticky" }, children: [
                  b.map((t) => k(t.original, t.id, t.index, t, "bottom")),
                  M.map((t, e) => k(t, `__summary_bottom_${e}`, e, void 0, "bottom"))
                ] }),
                (N || !d.length && !g.length && !b.length) && /* @__PURE__ */ m(
                  "div",
                  {
                    role: "status",
                    className: Ct(
                      "mtx-flex mtx-items-center mtx-justify-center mtx-p-6 mtx-text-text-300",
                      N && "mtx-absolute mtx-top-0 mtx-start-0 mtx-z-50 mtx-h-full mtx-w-full mtx-bg-gray-100/25"
                    ),
                    children: N ? jt : Nt
                  }
                )
              ]
            }
          ),
          L && !l && /* @__PURE__ */ m(Se, { table: o, paginationPageSizeSelector: Wt })
        ]
      }
    )
  ] });
}
const Ne = r.forwardRef(ze);
Ne.displayName = "DataTableContent";
export {
  Ne as DataTableContent
};
//# sourceMappingURL=datatablecontent.es.js.map
