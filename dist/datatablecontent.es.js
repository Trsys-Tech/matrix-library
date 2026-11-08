import { jsxs as C, jsx as d } from "react/jsx-runtime";
import * as n from "react";
import { DragDropProvider as ye, DragOverlay as ve } from "@dnd-kit/react";
import { useVirtualizer as Ie } from "@tanstack/react-virtual";
import { cn as kt } from "./utils.es.js";
import { Button as Et } from "./button.es.js";
import { useDataTable as Re, DataTableAlignmentContext as Ce } from "./datatablecontext.es.js";
import { dataTableColumnSensors as Se } from "./datatablecolumndrag.es.js";
import { getActiveDataTableCell as ke } from "./datatablemodel.es.js";
import { useDataTableInstance as Ee } from "./usedatatableinstance.es.js";
import { DataTableHeader as _e } from "./datatableheader.es.js";
import { DataTablePagination as Pe } from "./datatablepagination.es.js";
import { DataTableRowView as De } from "./datatablerowview.es.js";
import { useDataTableColumnDrag as ze } from "./usedatatablecolumndrag.es.js";
import { useDataTableMotion as Le } from "./usedatatablemotion.es.js";
import { useDataTableApi as Te } from "./usedatatableapi.es.js";
const _t = [], Ae = {};
function Ne({
  rowData: Pt,
  columnDefs: H,
  defaultColDef: Dt = Ae,
  getRowId: zt,
  onReady: et,
  rowSelection: h,
  renderSubComponent: T,
  getRowCanExpand: Lt,
  onSelectionChanged: rt,
  quickFilterText: Tt,
  onQuickFilterTextChange: At,
  externalFilter: Nt,
  loading: A = !1,
  emptyContent: jt = "No rows to display",
  loadingContent: Mt = "Loading…",
  rowHeight: O = 40,
  headerHeight: Vt = 40,
  getRowClass: Wt,
  rowClassRules: Ft,
  pinnedTopRowData: P = _t,
  pinnedBottomRowData: N = _t,
  pagination: j = !1,
  paginationPageSize: $t = 25,
  paginationPageSizeSelector: Ht = [10, 25, 50, 100],
  virtualize: Ot = !0,
  overscan: Jt = 8,
  domLayout: nt = "normal",
  suppressHorizontalScroll: Kt = !1,
  editType: st = "cell",
  suppressClickEdit: Ut = !1,
  readOnlyEdit: ot = !1,
  validateRow: it,
  onEditCommit: lt,
  onEditRequest: at,
  onEditCancel: ct,
  onRowClick: Xt,
  tableOptions: D,
  containerStyle: J,
  className: Bt,
  style: Yt,
  ...dt
}, Gt) {
  "use no memo";
  const { setApi: K, search: Qt, hasSearch: Zt, setSearch: qt, setCounts: mt } = Re(), x = n.useContext(Ce), te = n.useId(), g = n.useRef(null), ut = n.useRef(null), U = n.useRef(null), X = n.useRef(null), [ft, ee] = n.useState(0), [re, ne] = n.useState(!1), [B, se] = n.useState(null), [oe, ie] = n.useState(null), [le, gt] = n.useState({}), [z, ae] = n.useState(null), [ce] = n.useState(() => D?.initialState?.globalFilter ?? ""), b = n.useRef(z), pt = n.useRef({ columnDefs: H, validateRow: it, readOnlyEdit: ot, onEditCommit: lt, onEditRequest: at, onEditCancel: ct });
  pt.current = { columnDefs: H, validateRow: it, readOnlyEdit: ot, onEditCommit: lt, onEditRequest: at, onEditCancel: ct };
  const ht = n.useCallback((t) => {
    b.current = t, ae(t);
  }, []), s = re || nt === "print", xt = s || nt === "autoHeight", de = Tt ?? D?.state?.globalFilter ?? (Zt ? Qt : ce), M = !!h && h.checkboxes !== !1 && !s, V = !!T && !s, Y = V ? 44 : 0, G = (M ? 44 : 0) + Y, { table: a, definitionsById: S, sourcesById: w, data: me, rowIndices: W, resolveId: bt } = Ee({
    rowData: Pt,
    columnDefs: H,
    defaultColDef: Dt,
    getRowId: zt,
    paginationPageSize: $t,
    tableOptions: D,
    externalFilter: Nt,
    rowSelection: h,
    pagination: j,
    renderSubComponent: T,
    getRowCanExpand: Lt,
    onQuickFilterTextChange: At,
    patches: le,
    alignment: x,
    isPrinting: s,
    viewportWidth: ft,
    selectionWidth: G,
    searchText: de,
    setSearch: qt
  }), c = [...a.getStartVisibleLeafColumns(), ...a.getCenterVisibleLeafColumns(), ...a.getEndVisibleLeafColumns()].filter(
    (t) => t.id !== "__external" && (!s || !S.get(t.id)?.hideInPrint)
  );
  if (B) {
    const t = c.findIndex((r) => r.id === B.sourceId), e = c.findIndex((r) => r.id === B.targetId);
    t >= 0 && e >= 0 && c.splice(e, 0, c.splice(t, 1)[0]);
  }
  const L = new Map(c.map((t) => [t.id, t.getSize()])), Q = G + c.reduce((t, e) => t + L.get(e.id), 0), p = a.getTopRows(), y = a.getBottomRows(), wt = new Set([...p, ...y].map((t) => t.id)), m = (s ? a.getPrePaginatedRowModel().rows : a.getRowModel().rows).filter((t) => !wt.has(t.id)), Z = (t) => !!T && t.getCanExpand() && t.getIsExpanded(), ue = [...p, ...m, ...y].some(Z), k = Ot && !xt && !ue, yt = (p.length + P.length) * O, F = Ie({
    count: m.length,
    getScrollElement: () => g.current,
    estimateSize: () => O,
    getItemKey: (t) => m[t].id,
    overscan: Jt,
    scrollMargin: yt,
    enabled: k,
    useFlushSync: !1
  }), I = n.useRef({
    table: a,
    definitionsById: S,
    centerRows: m,
    virtualizer: F,
    resolveId: bt,
    rowIndices: W,
    sourcesById: w,
    useVirtualRows: k,
    pagination: j,
    serverPagination: D?.manualPagination === !0
  });
  I.current = {
    table: a,
    definitionsById: S,
    centerRows: m,
    virtualizer: F,
    resolveId: bt,
    rowIndices: W,
    sourcesById: w,
    useVirtualRows: k,
    pagination: j,
    serverPagination: D?.manualPagination === !0
  };
  const fe = ze({ runtime: I, viewportRef: g, contentRef: X, setColumnDrag: se }), o = Te({ runtime: I, editRef: b, configRef: pt, updateEdit: ht, setPatches: gt, contentRef: X, viewportRef: g, setPrinting: ne });
  n.useImperativeHandle(Gt, () => o, [o]), n.useEffect(() => (K(o), () => K((t) => t === o ? null : t)), [o, K]);
  const vt = n.useRef(et);
  vt.current = et, n.useEffect(() => {
    vt.current?.(o);
  }, [o]);
  const It = n.useRef(rt);
  It.current = rt, n.useEffect(() => {
    const t = I.current.table, e = t.getSelectedRowModel().rows.map((r) => r.original);
    It.current?.(e, t.getSelectedRowIds());
  }, [a.state.rowSelection, me]), n.useEffect(() => {
    const t = I.current.table, e = t.getSelectedRowIds().length, r = (t.state.rowPinning.top?.length ?? 0) + (t.state.rowPinning.bottom?.length ?? 0);
    mt(
      (i) => i.selectedCount === e && i.pinnedCount === r ? i : { selectedCount: e, pinnedCount: r }
    );
  }, [a.state.rowSelection, a.state.rowPinning, mt]), n.useEffect(() => {
    const t = g.current;
    if (!t) return;
    const e = () => ee(t.clientWidth);
    e();
    const r = new ResizeObserver(e);
    return r.observe(t), () => r.disconnect();
  }, []), n.useEffect(() => {
    const t = g.current, e = x?.viewports.current;
    if (!(!t || !e))
      return e.add(t), () => {
        e.delete(t);
      };
  }, [x?.viewports]), n.useEffect(() => {
    b.current && w.get(b.current.rowId) !== b.current.source && o.stopEditing(!0), gt((e) => {
      const r = Object.entries(e).filter(([i, l]) => w.get(i) === l.source);
      return r.length === Object.keys(e).length ? e : Object.fromEntries(r);
    });
    const t = I.current.table;
    if (!I.current.serverPagination) {
      const e = t.atoms.rowSelection.get(), r = Object.entries(e).filter(([u]) => w.has(u));
      r.length !== Object.keys(e).length && t.setRowSelection(Object.fromEntries(r));
      const i = t.atoms.rowPinning.get(), l = i.top?.filter((u) => w.has(u)), v = i.bottom?.filter((u) => w.has(u));
      (l?.length !== i.top?.length || v?.length !== i.bottom?.length) && t.setRowPinning({ top: l, bottom: v });
    }
  }, [w, o]);
  const $ = [...p, ...m, ...y], q = [
    ...P.map((t, e) => `__summary_top_${e}`),
    ...p.map((t) => t.id),
    ...m.map((t) => t.id),
    ...y.map((t) => t.id),
    ...N.map((t, e) => `__summary_bottom_${e}`)
  ], ge = new Set($.filter(Z).map((t) => t.id));
  let tt = 0;
  const pe = new Map(
    q.map((t) => {
      const e = tt;
      return tt += ge.has(t) ? 2 : 1, [t, e];
    })
  ), Rt = k ? F.getVirtualItems() : [], he = k ? [
    ...q.slice(0, P.length + p.length),
    ...Rt.map((t) => m[t.index].id),
    ...y.map((t) => t.id),
    ...N.map((t, e) => `__summary_bottom_${e}`)
  ] : q, xe = ke(
    oe,
    he,
    c.map((t) => t.id)
  );
  Le(g, JSON.stringify(m.map((t) => t.id)), JSON.stringify(c.map((t) => t.id)), s);
  const Ct = (t, e = !1) => {
    const r = s ? !1 : t.getIsPinned(), i = c.filter((f) => f.getIsPinned() === r), l = i.findIndex((f) => f.id === t.id), v = i.slice(0, l).reduce((f, _) => f + L.get(_.id), G), u = i.slice(l + 1).reduce((f, _) => f + L.get(_.id), 0);
    return {
      width: L.get(t.id),
      flexShrink: 0,
      position: r ? "sticky" : "relative",
      insetInlineStart: r === "start" ? v : void 0,
      insetInlineEnd: r === "end" ? u : void 0,
      zIndex: r ? 2 : void 0,
      background: r ? e ? "oklch(var(--mtx-primary-50))" : "inherit" : void 0
    };
  }, be = (t, e, r) => {
    if (t.defaultPrevented) return;
    if (t.key === "Escape" && b.current) {
      t.preventDefault(), o.stopEditing(!0);
      return;
    }
    if (t.key === "Enter" && b.current) {
      if (t.target.closest("button,select,textarea,[contenteditable=true],[role=combobox],[role=listbox]")) return;
      t.preventDefault(), o.stopEditing();
      return;
    }
    if (t.target.closest("input,select,textarea,button,[contenteditable=true]")) return;
    if (t.key === "Enter" || t.key === "F2") {
      t.preventDefault(), st === "fullRow" ? o.startEditingRow(e.id) : o.startEditingCell({ rowId: e.id, columnId: r.id });
      return;
    }
    const l = $.findIndex((R) => R.id === e.id), v = c.findIndex((R) => R.id === r.id), u = t.key === "ArrowDown" ? l + 1 : t.key === "ArrowUp" ? l - 1 : l, f = getComputedStyle(t.currentTarget).direction === "rtl" ? -1 : 1, _ = t.key === "ArrowRight" ? v + f : t.key === "ArrowLeft" ? v - f : v;
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(t.key) && $[u] && c[_]) {
      t.preventDefault();
      const R = $[u];
      wt.has(R.id) || o.scrollToRow(R.id), o.focusCell(R.id, c[_].id);
    }
  }, E = (t, e, r, i, l) => /* @__PURE__ */ d(
    De,
    {
      data: t,
      rowId: e,
      index: r,
      row: i,
      pinned: l,
      edit: z,
      editRef: b,
      updateEdit: ht,
      api: o,
      table: a,
      detailId: te,
      displayedIndices: pe,
      rowSelection: h,
      rowHeight: O,
      totalWidth: Q,
      getRowClass: Wt,
      rowClassRules: Ft,
      onRowClick: Xt,
      showExpanders: V,
      expanderWidth: Y,
      showCheckboxes: M,
      visibleColumns: c,
      definitionsById: S,
      activeCell: xe,
      setFocusedCell: ie,
      columnStyle: Ct,
      handleCellKeyDown: be,
      suppressClickEdit: Ut,
      editType: st,
      renderSubComponent: T,
      isDetailExpanded: Z
    },
    e
  ), St = (h?.selectAll === "all" ? a.getCoreRowModel() : h?.selectAll === "currentPage" ? a.getRowModel() : a.getFilteredRowModel()).rows.filter((t) => t.getCanSelect()), we = St.filter((t) => t.getIsSelected()).length;
  return /* @__PURE__ */ C(ye, { sensors: Se, ...fe, children: [
    /* @__PURE__ */ d(ve, { dropAnimation: null, style: { position: "fixed", pointerEvents: "none" }, children: (t) => {
      const e = S.get(t.data.columnId);
      return /* @__PURE__ */ d("div", { className: "mtx-rounded-sm mtx-border mtx-border-gray-200 mtx-bg-primary-50 mtx-px-3 mtx-py-2 mtx-text-xs mtx-font-bold mtx-shadow-md", children: e?.headerName ?? t.data.columnId });
    } }),
    /* @__PURE__ */ C(
      "div",
      {
        ref: X,
        "data-data-table-content": "",
        "data-print-layout": s || void 0,
        className: kt("mtx-relative mtx-flex mtx-min-h-0 mtx-flex-1 mtx-flex-col mtx-rounded-b-lg", Bt),
        style: Yt,
        ...dt,
        children: [
          z && /* @__PURE__ */ C("div", { "data-print-hidden": "", className: "mtx-flex mtx-shrink-0 mtx-items-center mtx-gap-2 mtx-border-b mtx-border-gray-200 mtx-p-2", children: [
            /* @__PURE__ */ d(Et, { type: "button", size: "sm", onClick: () => o.stopEditing(), children: "Save" }),
            /* @__PURE__ */ d(Et, { type: "button", size: "sm", variant: "text", onClick: () => o.stopEditing(!0), children: "Cancel" }),
            z.errors.length > 0 && /* @__PURE__ */ d("span", { role: "alert", className: "mtx-text-danger", children: z.errors.join(". ") })
          ] }),
          /* @__PURE__ */ C(
            "div",
            {
              role: "grid",
              "aria-label": dt["aria-label"] ?? "Data table",
              "aria-busy": A,
              "aria-rowcount": tt + 1,
              "aria-colcount": c.length + (M ? 1 : 0) + (V ? 1 : 0),
              "aria-multiselectable": h?.mode === "multiRow" || void 0,
              className: "mtx-flex mtx-min-h-0 mtx-flex-1 mtx-flex-col",
              children: [
                /* @__PURE__ */ d("div", { className: "mtx-shrink-0 mtx-bg-primary-50", children: /* @__PURE__ */ d(
                  "div",
                  {
                    ref: ut,
                    style: { overflow: s ? "visible" : "hidden", width: s ? "100%" : ft || "100%" },
                    onScroll: (t) => {
                      const e = U.current === t.currentTarget.scrollLeft;
                      U.current = null, !e && !s && g.current && (g.current.scrollLeft = t.currentTarget.scrollLeft);
                    },
                    children: /* @__PURE__ */ d(
                      _e,
                      {
                        table: a,
                        api: o,
                        headerHeight: Vt,
                        totalWidth: Q,
                        isPrinting: s,
                        showExpanders: V,
                        expanderWidth: Y,
                        showCheckboxes: M,
                        rowSelection: h,
                        selectionRows: St,
                        selectedInScope: we,
                        visibleColumns: c,
                        definitionsById: S,
                        columnStyle: Ct,
                        widths: L
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ C(
                  "div",
                  {
                    ref: g,
                    "data-data-table-viewport": "",
                    className: "mtx-relative mtx-min-h-0 mtx-flex-1 mtx-rounded-b-lg",
                    style: {
                      ...J,
                      overflow: xt ? "visible" : J?.overflow ?? "auto",
                      overflowX: s ? "visible" : Kt ? "hidden" : J?.overflowX
                    },
                    onScroll: (t) => {
                      const e = t.currentTarget, r = ut.current;
                      r && r.scrollLeft !== e.scrollLeft && (r.scrollLeft = e.scrollLeft, U.current = r.scrollLeft);
                      const i = x?.synchronizedScrolls.current.get(e) === e.scrollLeft;
                      if (x?.synchronizedScrolls.current.delete(e), x && !s && !i)
                        for (const l of x.viewports.current)
                          l !== e && l.scrollLeft !== e.scrollLeft && (l.scrollLeft = e.scrollLeft, x.synchronizedScrolls.current.set(l, l.scrollLeft));
                    },
                    children: [
                      (p.length > 0 || P.length > 0) && /* @__PURE__ */ C(
                        "div",
                        {
                          role: "rowgroup",
                          className: "mtx-sticky mtx-z-20",
                          style: { top: s ? void 0 : 0, position: s ? "relative" : "sticky" },
                          children: [
                            P.map((t, e) => E(t, `__summary_top_${e}`, e, void 0, "top")),
                            p.map((t) => E(t.original, t.id, t.index, t, "top"))
                          ]
                        }
                      ),
                      /* @__PURE__ */ d("div", { role: "rowgroup", children: k ? /* @__PURE__ */ d("div", { style: { height: F.getTotalSize(), position: "relative", width: Q, minWidth: "100%" }, children: Rt.map((t) => {
                        const e = m[t.index];
                        return /* @__PURE__ */ d("div", { style: { position: "absolute", top: 0, width: "100%", transform: `translateY(${t.start - yt}px)` }, children: E(e.original, e.id, W.get(e.original) ?? e.index, e) }, e.id);
                      }) }) : m.map((t) => E(t.original, t.id, W.get(t.original) ?? t.index, t)) }),
                      (y.length > 0 || N.length > 0) && /* @__PURE__ */ C("div", { role: "rowgroup", className: "mtx-sticky mtx-bottom-0 mtx-z-20", style: { position: s ? "relative" : "sticky" }, children: [
                        y.map((t) => E(t.original, t.id, t.index, t, "bottom")),
                        N.map((t, e) => E(t, `__summary_bottom_${e}`, e, void 0, "bottom"))
                      ] }),
                      (A || !m.length && !p.length && !y.length) && /* @__PURE__ */ d(
                        "div",
                        {
                          role: "status",
                          className: kt(
                            "mtx-flex mtx-items-center mtx-justify-center mtx-p-6 mtx-text-text-300",
                            A && "mtx-absolute mtx-top-0 mtx-start-0 mtx-z-50 mtx-h-full mtx-w-full mtx-bg-gray-100/25"
                          ),
                          children: A ? Mt : jt
                        }
                      )
                    ]
                  }
                )
              ]
            }
          ),
          j && !s && /* @__PURE__ */ d(Pe, { table: a, paginationPageSizeSelector: Ht })
        ]
      }
    )
  ] });
}
const je = n.forwardRef(Ne);
je.displayName = "DataTableContent";
export {
  je as DataTableContent
};
//# sourceMappingURL=datatablecontent.es.js.map
