import { jsxs as C, jsx as u } from "react/jsx-runtime";
import * as s from "react";
import { DragDropProvider as ke, DragOverlay as Pe } from "@dnd-kit/react";
import { useVirtualizer as _e } from "@tanstack/react-virtual";
import { cn as _t } from "./utils.es.js";
import { Button as zt } from "./button.es.js";
import { useDataTable as ze, DataTableAlignmentContext as De } from "./datatablecontext.es.js";
import { dataTableColumnSensors as Ae } from "./datatablecolumndrag.es.js";
import { getActiveDataTableCell as Te } from "./datatablemodel.es.js";
import { useDataTableInstance as Ne } from "./usedatatableinstance.es.js";
import { DataTableHeader as Le } from "./datatableheader.es.js";
import { DataTablePagination as je } from "./datatablepagination.es.js";
import { DataTableRowView as Me } from "./datatablerowview.es.js";
import { useDataTableColumnDrag as Ve } from "./usedatatablecolumndrag.es.js";
import { useDataTableMotion as Oe } from "./usedatatablemotion.es.js";
import { useDataTableApi as We } from "./usedatatableapi.es.js";
const Dt = [], Fe = {};
function $e({
  rowData: At,
  columnDefs: K,
  defaultColDef: Tt = Fe,
  getRowId: Nt,
  onReady: rt,
  rowSelection: b,
  renderSubComponent: L,
  getRowCanExpand: Lt,
  onSelectionChanged: ot,
  quickFilterText: jt,
  onQuickFilterTextChange: Mt,
  externalFilter: Vt,
  loading: a = !1,
  emptyContent: Ot = "No rows to display",
  loadingContent: Wt = "Loading…",
  rowHeight: j = 40,
  headerHeight: M = 40,
  getRowClass: Ft,
  rowClassRules: $t,
  pinnedTopRowData: S = Dt,
  pinnedBottomRowData: E = Dt,
  pagination: V = !1,
  paginationPageSize: Xt = 25,
  paginationPageSizeSelector: Jt = [10, 25, 50, 100],
  virtualize: Kt = !0,
  overscan: Ut = 8,
  domLayout: it = "normal",
  suppressHorizontalScroll: Gt = !1,
  editType: lt = "cell",
  suppressClickEdit: Ht = !1,
  readOnlyEdit: at = !1,
  validateRow: ct,
  onEditCommit: dt,
  onEditRequest: mt,
  onEditCancel: ut,
  onRowClick: Yt,
  tableOptions: A,
  containerStyle: U,
  className: Bt,
  style: Qt,
  ...ft
}, Zt) {
  "use no memo";
  const { setApi: G, search: qt, hasSearch: te, setSearch: ee, setCounts: gt } = ze(), w = s.useContext(De), ne = s.useId(), v = s.useRef(null), H = s.useRef(null), [se, re] = s.useState(0), [oe, ie] = s.useState(!1), [Y, le] = s.useState(null), [ae, ce] = s.useState(null), [de, pt] = s.useState({}), [T, me] = s.useState(null), [ue] = s.useState(() => A?.initialState?.globalFilter ?? ""), k = s.useRef(T), xt = s.useRef({ columnDefs: K, validateRow: ct, readOnlyEdit: at, onEditCommit: dt, onEditRequest: mt, onEditCancel: ut });
  xt.current = { columnDefs: K, validateRow: ct, readOnlyEdit: at, onEditCommit: dt, onEditRequest: mt, onEditCancel: ut };
  const ht = s.useCallback((t) => {
    k.current = t, me(t);
  }, []), l = oe || it === "print", B = l || it === "autoHeight", fe = B ? "visible" : U?.overflow ?? "auto", ge = l ? "visible" : Gt ? "hidden" : U?.overflowX, pe = jt ?? A?.state?.globalFilter ?? (te ? qt : ue), O = !!b && b.checkboxes !== !1 && !l, W = !!L && !l, Q = W ? 44 : 0, Z = (O ? 44 : 0) + Q, { table: i, definitionsById: P, sourcesById: h, data: xe, rowIndices: F, resolveId: bt } = Ne({
    rowData: At,
    columnDefs: K,
    defaultColDef: Tt,
    getRowId: Nt,
    paginationPageSize: Xt,
    tableOptions: A,
    externalFilter: Vt,
    rowSelection: b,
    pagination: V,
    renderSubComponent: L,
    getRowCanExpand: Lt,
    onQuickFilterTextChange: Mt,
    patches: de,
    alignment: w,
    isPrinting: l,
    viewportWidth: se,
    selectionWidth: Z,
    searchText: pe,
    setSearch: ee
  }), c = [...i.getStartVisibleLeafColumns(), ...i.getCenterVisibleLeafColumns(), ...i.getEndVisibleLeafColumns()].filter(
    (t) => t.id !== "__external" && (!l || !P.get(t.id)?.hideInPrint)
  );
  if (Y) {
    const t = c.findIndex((n) => n.id === Y.sourceId), e = c.findIndex((n) => n.id === Y.targetId);
    t >= 0 && e >= 0 && c.splice(e, 0, c.splice(t, 1)[0]);
  }
  const N = new Map(c.map((t) => [t.id, t.getSize()])), q = Z + c.reduce((t, e) => t + N.get(e.id), 0), f = i.getTopRows(), g = i.getBottomRows(), wt = new Set([...f, ...g].map((t) => t.id)), d = (l ? i.getPrePaginatedRowModel().rows : i.getRowModel().rows).filter((t) => !wt.has(t.id)), he = d.length + f.length + g.length + S.length + E.length > 0, yt = a && (!B || he), { pageIndex: vt, pageSize: It } = i.state.pagination, tt = s.useCallback(
    (t) => {
      t && (t.inert = a);
    },
    [a]
  ), et = (t) => !!L && t.getCanExpand() && t.getIsExpanded(), be = [...f, ...d, ...g].some(et), _ = Kt && !B && !be, we = (f.length + S.length) * j, Rt = (g.length + E.length) * j, $ = M + we, X = _e({
    count: d.length,
    getScrollElement: () => v.current,
    estimateSize: () => j,
    getItemKey: (t) => d[t].id,
    overscan: Ut,
    scrollMargin: $,
    scrollPaddingStart: $,
    scrollPaddingEnd: Rt,
    enabled: _,
    useFlushSync: !1
  }), I = s.useRef({
    table: i,
    definitionsById: P,
    centerRows: d,
    virtualizer: X,
    resolveId: bt,
    rowIndices: F,
    sourcesById: h,
    useVirtualRows: _,
    loading: a,
    pagination: V,
    serverPagination: A?.manualPagination === !0
  });
  I.current = {
    table: i,
    definitionsById: P,
    centerRows: d,
    virtualizer: X,
    resolveId: bt,
    rowIndices: F,
    sourcesById: h,
    useVirtualRows: _,
    loading: a,
    pagination: V,
    serverPagination: A?.manualPagination === !0
  };
  const ye = Ve({ loading: a, runtime: I, viewportRef: v, contentRef: H, setColumnDrag: le }), o = We({ runtime: I, editRef: k, configRef: xt, updateEdit: ht, setPatches: pt, contentRef: H, viewportRef: v, setPrinting: ie });
  s.useImperativeHandle(Zt, () => o, [o]), s.useEffect(() => (G(o), () => G((t) => t === o ? null : t)), [o, G]);
  const Ct = s.useRef(rt);
  Ct.current = rt, s.useEffect(() => {
    Ct.current?.(o);
  }, [o]);
  const St = s.useRef(ot);
  St.current = ot, s.useEffect(() => {
    const t = I.current.table, e = t.getSelectedRowModel().rows.map((n) => n.original);
    St.current?.(e, t.getSelectedRowIds());
  }, [i.state.rowSelection, xe]), s.useEffect(() => {
    const t = I.current.table, e = t.getSelectedRowIds().length, n = (t.state.rowPinning.top?.length ?? 0) + (t.state.rowPinning.bottom?.length ?? 0);
    gt(
      (r) => r.selectedCount === e && r.pinnedCount === n ? r : { selectedCount: e, pinnedCount: n }
    );
  }, [i.state.rowSelection, i.state.rowPinning, gt]), s.useEffect(() => {
    const t = v.current;
    if (!t) return;
    const e = () => re(t.clientWidth);
    e();
    const n = new ResizeObserver(e);
    return n.observe(t), () => n.disconnect();
  }, []), s.useEffect(() => {
    const t = v.current, e = w?.viewports.current;
    if (!(!t || !e))
      return e.add(t), () => {
        e.delete(t);
      };
  }, [w?.viewports]), s.useLayoutEffect(() => {
    const t = k.current;
    t && (a || vt !== t.pageIndex || It !== t.pageSize || h.get(t.rowId) !== t.source) && o.stopEditing(!0);
  }, [o, a, vt, It, h]), s.useEffect(() => {
    pt((e) => {
      const n = Object.entries(e).filter(([r, m]) => h.get(r) === m.source);
      return n.length === Object.keys(e).length ? e : Object.fromEntries(n);
    });
    const t = I.current.table;
    if (!I.current.serverPagination) {
      const e = t.atoms.rowSelection.get(), n = Object.entries(e).filter(([p]) => h.has(p));
      n.length !== Object.keys(e).length && t.setRowSelection(Object.fromEntries(n));
      const r = t.atoms.rowPinning.get(), m = r.top?.filter((p) => h.has(p)), y = r.bottom?.filter((p) => h.has(p));
      (m?.length !== r.top?.length || y?.length !== r.bottom?.length) && t.setRowPinning({ top: m, bottom: y });
    }
  }, [h, o]);
  const J = [...f, ...d, ...g], nt = [
    ...S.map((t, e) => `__summary_top_${e}`),
    ...f.map((t) => t.id),
    ...d.map((t) => t.id),
    ...g.map((t) => t.id),
    ...E.map((t, e) => `__summary_bottom_${e}`)
  ], ve = new Set(J.filter(et).map((t) => t.id));
  let st = 0;
  const Ie = new Map(
    nt.map((t) => {
      const e = st;
      return st += ve.has(t) ? 2 : 1, [t, e];
    })
  ), Et = _ ? X.getVirtualItems() : [], Re = _ ? [
    ...nt.slice(0, S.length + f.length),
    ...Et.map((t) => d[t.index].id),
    ...g.map((t) => t.id),
    ...E.map((t, e) => `__summary_bottom_${e}`)
  ] : nt, Ce = Te(
    ae,
    Re,
    c.map((t) => t.id)
  );
  Oe(v, JSON.stringify(d.map((t) => t.id)), JSON.stringify(c.map((t) => t.id)), l);
  const kt = (t, e = !1) => {
    const n = l ? !1 : t.getIsPinned(), r = c.filter((x) => x.getIsPinned() === n), m = r.findIndex((x) => x.id === t.id), y = r.slice(0, m).reduce((x, D) => x + N.get(D.id), Z), p = r.slice(m + 1).reduce((x, D) => x + N.get(D.id), 0);
    return {
      width: N.get(t.id),
      flexShrink: 0,
      position: n ? "sticky" : "relative",
      insetInlineStart: n === "start" ? y : void 0,
      insetInlineEnd: n === "end" ? p : void 0,
      zIndex: n ? 2 : void 0,
      background: n ? e ? "oklch(var(--mtx-primary-50))" : "inherit" : void 0
    };
  }, Se = (t, e, n) => {
    if (t.defaultPrevented) return;
    if (t.key === "Escape" && k.current) {
      t.preventDefault(), o.stopEditing(!0);
      return;
    }
    if (t.key === "Enter" && k.current) {
      if (t.target.closest("button,select,textarea,[contenteditable=true],[role=combobox],[role=listbox]")) return;
      t.preventDefault(), o.stopEditing();
      return;
    }
    if (t.target.closest("input,select,textarea,button,[contenteditable=true]")) return;
    if (t.key === "Enter" || t.key === "F2") {
      t.preventDefault(), lt === "fullRow" ? o.startEditingRow(e.id) : o.startEditingCell({ rowId: e.id, columnId: n.id });
      return;
    }
    const m = J.findIndex((R) => R.id === e.id), y = c.findIndex((R) => R.id === n.id), p = t.key === "ArrowDown" ? m + 1 : t.key === "ArrowUp" ? m - 1 : m, x = getComputedStyle(t.currentTarget).direction === "rtl" ? -1 : 1, D = t.key === "ArrowRight" ? y + x : t.key === "ArrowLeft" ? y - x : y;
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(t.key) && J[p] && c[D]) {
      t.preventDefault();
      const R = J[p];
      wt.has(R.id) || o.scrollToRow(R.id), o.focusCell(R.id, c[D].id);
    }
  }, z = (t, e, n, r, m) => /* @__PURE__ */ u(
    Me,
    {
      data: t,
      rowId: e,
      index: n,
      row: r,
      pinned: m,
      edit: T,
      editRef: k,
      updateEdit: ht,
      api: o,
      table: i,
      detailId: ne,
      displayedIndices: Ie,
      rowSelection: b,
      rowHeight: j,
      totalWidth: q,
      getRowClass: Ft,
      rowClassRules: $t,
      onRowClick: Yt,
      showExpanders: W,
      expanderWidth: Q,
      showCheckboxes: O,
      visibleColumns: c,
      definitionsById: P,
      activeCell: Ce,
      setFocusedCell: ce,
      columnStyle: kt,
      handleCellKeyDown: Se,
      suppressClickEdit: Ht,
      editType: lt,
      renderSubComponent: L,
      isDetailExpanded: et
    },
    e
  ), Pt = (b?.selectAll === "all" ? i.getCoreRowModel() : b?.selectAll === "currentPage" ? i.getRowModel() : i.getFilteredRowModel()).rows.filter((t) => t.getCanSelect()), Ee = Pt.filter((t) => t.getIsSelected()).length;
  return /* @__PURE__ */ C(ke, { sensors: a ? [] : Ae, ...ye, children: [
    /* @__PURE__ */ u(Pe, { dropAnimation: null, style: { position: "fixed", pointerEvents: "none" }, children: (t) => {
      const e = P.get(t.data.columnId);
      return /* @__PURE__ */ u("div", { className: "mtx-rounded-sm mtx-border mtx-border-gray-200 mtx-bg-primary-50 mtx-px-3 mtx-py-2 mtx-text-xs mtx-font-bold mtx-shadow-md", children: e?.headerName ?? t.data.columnId });
    } }),
    /* @__PURE__ */ C(
      "div",
      {
        ref: H,
        "data-data-table-content": "",
        "data-print-layout": l || void 0,
        className: _t("mtx-relative mtx-flex mtx-min-h-0 mtx-flex-1 mtx-flex-col mtx-rounded-b-lg", Bt),
        style: Qt,
        ...ft,
        children: [
          T && /* @__PURE__ */ C("div", { "data-print-hidden": "", className: "mtx-flex mtx-shrink-0 mtx-items-center mtx-gap-2 mtx-border-b mtx-border-gray-200 mtx-p-2", children: [
            /* @__PURE__ */ u(zt, { type: "button", size: "sm", onClick: () => o.stopEditing(), children: "Save" }),
            /* @__PURE__ */ u(zt, { type: "button", size: "sm", variant: "text", onClick: () => o.stopEditing(!0), children: "Cancel" }),
            T.errors.length > 0 && /* @__PURE__ */ u("span", { role: "alert", className: "mtx-text-danger", children: T.errors.join(". ") })
          ] }),
          /* @__PURE__ */ C(
            "div",
            {
              role: "grid",
              "aria-label": ft["aria-label"] ?? "Data table",
              "aria-busy": a,
              "aria-rowcount": st + 1,
              "aria-colcount": c.length + (O ? 1 : 0) + (W ? 1 : 0),
              "aria-multiselectable": b?.mode === "multiRow" || void 0,
              className: "mtx-relative mtx-isolate mtx-flex mtx-min-h-0 mtx-flex-1 mtx-flex-col",
              children: [
                /* @__PURE__ */ C(
                  "div",
                  {
                    ref: v,
                    "data-data-table-viewport": "",
                    className: "mtx-relative mtx-min-h-0 mtx-flex-1 mtx-rounded-b-lg",
                    style: {
                      scrollPaddingTop: l ? void 0 : $,
                      scrollPaddingBottom: l ? void 0 : Rt,
                      ...U,
                      overflow: fe,
                      overflowX: ge
                    },
                    onScroll: (t) => {
                      const e = t.currentTarget, n = w?.synchronizedScrolls.current.get(e) === e.scrollLeft;
                      if (w?.synchronizedScrolls.current.delete(e), w && !l && !n)
                        for (const r of w.viewports.current)
                          r !== e && r.scrollLeft !== e.scrollLeft && (r.scrollLeft = e.scrollLeft, w.synchronizedScrolls.current.set(r, r.scrollLeft));
                    },
                    children: [
                      /* @__PURE__ */ u(
                        Le,
                        {
                          table: i,
                          api: o,
                          headerHeight: M,
                          totalWidth: q,
                          isPrinting: l,
                          loading: a,
                          showExpanders: W,
                          expanderWidth: Q,
                          showCheckboxes: O,
                          rowSelection: b,
                          selectionRows: Pt,
                          selectedInScope: Ee,
                          visibleColumns: c,
                          definitionsById: P,
                          columnStyle: kt,
                          widths: N
                        }
                      ),
                      (f.length > 0 || S.length > 0) && /* @__PURE__ */ C(
                        "div",
                        {
                          role: "rowgroup",
                          ref: tt,
                          className: "mtx-sticky mtx-z-20",
                          style: { top: l ? void 0 : M, position: l ? "relative" : "sticky" },
                          children: [
                            S.map((t, e) => z(t, `__summary_top_${e}`, e, void 0, "top")),
                            f.map((t) => z(t.original, t.id, t.index, t, "top"))
                          ]
                        }
                      ),
                      /* @__PURE__ */ u("div", { role: "rowgroup", ref: tt, children: _ ? /* @__PURE__ */ u("div", { style: { height: X.getTotalSize(), position: "relative", width: q, minWidth: "100%" }, children: Et.map((t) => {
                        const e = d[t.index];
                        return /* @__PURE__ */ u(
                          "div",
                          {
                            style: { position: "absolute", top: 0, width: "100%", transform: `translateY(${t.start - $}px)` },
                            children: z(e.original, e.id, F.get(e.original) ?? e.index, e)
                          },
                          e.id
                        );
                      }) }) : d.map((t) => z(t.original, t.id, F.get(t.original) ?? t.index, t)) }),
                      (g.length > 0 || E.length > 0) && /* @__PURE__ */ C(
                        "div",
                        {
                          ref: tt,
                          role: "rowgroup",
                          className: "mtx-sticky mtx-bottom-0 mtx-z-20",
                          style: { position: l ? "relative" : "sticky" },
                          children: [
                            g.map((t) => z(t.original, t.id, t.index, t, "bottom")),
                            E.map((t, e) => z(t, `__summary_bottom_${e}`, e, void 0, "bottom"))
                          ]
                        }
                      )
                    ]
                  }
                ),
                (a || !d.length && !f.length && !g.length) && /* @__PURE__ */ u(
                  "div",
                  {
                    role: "status",
                    style: yt ? { top: M } : void 0,
                    className: _t(
                      "mtx-flex mtx-items-center mtx-justify-center mtx-p-6 mtx-text-text-300",
                      a && "mtx-bg-gray-300/25",
                      yt && "mtx-absolute mtx-inset-x-0 mtx-bottom-0 mtx-z-30"
                    ),
                    children: a ? Wt : Ot
                  }
                )
              ]
            }
          ),
          V && !l && /* @__PURE__ */ u(je, { table: i, paginationPageSizeSelector: Jt, disabled: a })
        ]
      }
    )
  ] });
}
const Xe = s.forwardRef($e);
Xe.displayName = "DataTableContent";
export {
  Xe as DataTableContent
};
//# sourceMappingURL=datatablecontent.es.js.map
