import { jsx as o, jsxs as z } from "react/jsx-runtime";
import t, { forwardRef as H, useMemo as A } from "react";
import { AgGridReact as L } from "ag-grid-react";
import { themeQuartz as M, ModuleRegistry as B, AllCommunityModule as Q } from "ag-grid-community";
import { Trashcan as O, ElipsisVertical as q, Snowflake as $, Print as j, Refresh as _, CircleXmark as U, Magnifier as G } from "@trsys-tech/matrix-icons";
import { cn as C } from "./utils.es.js";
import { printHtml as V } from "./printhtml.es.js";
import { TextField as W } from "./textfield.es.js";
import { Button as N } from "./button.es.js";
import { IconButton as D } from "./iconbutton.es.js";
import { Popover as X, PopoverTrigger as J, PopoverContent as K } from "./popover.es.js";
B.registerModules([Q]);
const Y = M.withParams({
  fontFamily: "DMSans",
  fontSize: "12px",
  headerFontSize: "12px",
  headerFontWeight: 700,
  headerBackgroundColor: "oklch(var(--mtx-primary-50))",
  backgroundColor: "oklch(var(--mtx-gray-0))",
  accentColor: "oklch(var(--mtx-primary-300))",
  foregroundColor: "oklch(var(--mtx-text-500))",
  cellTextColor: "oklch(var(--mtx-text-500))"
}), w = t.createContext(null), mt = () => {
  const i = t.useContext(w);
  if (!i)
    throw new Error("useDataGrid should be used within <DataGrid>");
  return i;
}, ut = ({ children: i }) => {
  const s = t.useId(), [a, r] = t.useState(null), [n, c] = t.useState([]), [l, m] = t.useState(0), [x, d] = t.useState(/* @__PURE__ */ new Set()), [e, u] = t.useState(""), [h, p] = t.useState(!1);
  return /* @__PURE__ */ o(
    w.Provider,
    {
      value: {
        api: a,
        setApi: r,
        rowData: n,
        setRowData: c,
        gridId: s,
        quickFilterText: e,
        setQuickFilterText: u,
        actionbarExists: h,
        setActionbarExists: p,
        actionbarHeight: l,
        setActionbarHeight: m,
        pinnedRowIds: x,
        setPinnedRowIds: d
      },
      children: i
    }
  );
}, Z = H(
  ({ theme: i, onGridReady: s, quickFilterText: a, rowData: r, containerStyle: n, getRowId: c, ...l }, m) => {
    const x = t.useContext(w);
    if (!x)
      throw new Error("DataGridContent should be used within <DataGrid>");
    const { rowData: d, setRowData: e, actionbarExists: u, setApi: h, setQuickFilterText: p, quickFilterText: R, gridId: b, actionbarHeight: f, pinnedRowIds: g } = x, S = A(() => Y.withParams({
      headerHeight: 40,
      wrapperBorderRadius: u ? "0px 0px 8px 8px" : "8px"
    }), [u]), P = (v) => {
      h(v.api), s?.(v);
    };
    t.useEffect(() => {
      e(r);
    }, [r, e]), t.useEffect(() => {
      a !== void 0 && p(a ?? "");
    }, [a, p]);
    const { finalRowData: F, finalPinnedTopRowData: I } = A(() => {
      if (!d || g.size === 0)
        return { finalRowData: d, finalPinnedTopRowData: [] };
      const v = [], k = [];
      return d.forEach((E) => {
        const y = c ? c({ data: E, level: 0 }) : E.id, T = y != null ? String(y) : void 0;
        T !== void 0 && g.has(T) ? v.push(E) : k.push(E);
      }), { finalRowData: k, finalPinnedTopRowData: v };
    }, [d, g, c]);
    return /* @__PURE__ */ o(
      L,
      {
        gridId: b,
        theme: i ?? S,
        rowData: F,
        pinnedTopRowData: I,
        quickFilterText: R,
        onGridReady: P,
        containerStyle: { height: `calc(100% - ${f}px)`, ...n },
        getRowId: c,
        ...l,
        ref: m
      }
    );
  }
);
Z.displayName = "DataGridContent";
const xt = ({ className: i, ...s }) => {
  const a = t.useContext(w);
  if (!a)
    throw new Error("DataGridActionBar should be used within <DataGrid>");
  const r = t.useRef(null), { setActionbarExists: n, setActionbarHeight: c } = a, { children: l } = s;
  return t.useEffect(() => (n(!0), () => n(!1)), [n]), t.useEffect(() => {
    r.current && c(r.current.clientHeight);
  }, [c]), /* @__PURE__ */ o(
    "div",
    {
      className: C(
        "mtx-relative mtx-flex mtx-items-center mtx-p-2 mtx-h-12 mtx-w-full mtx-bg-gray-0 mtx-border mtx-border-gray-200 mtx-border-b-0 -mtx-mb-[1px] mtx-z-10 mtx-rounded-t-[8px]",
        i
      ),
      ref: r,
      children: l
    }
  );
}, ht = ({
  defaultOpen: i = !1,
  defaultOpenAutoFocus: s = !0,
  className: a,
  ...r
}) => {
  const n = t.useContext(w);
  if (!n)
    throw new Error("SearchAction should be used within <DataGrid>");
  const { quickFilterText: c, setQuickFilterText: l } = n, [m, x] = t.useState(i), [d, e] = t.useState(!1), u = t.useRef(null), h = t.useRef(!0), p = () => {
    n.setQuickFilterText(""), u.current && u.current.focus();
  }, R = () => {
    x(!0);
  };
  t.useEffect(() => {
    m && u?.current && (s || !h.current) && u.current.focus(), h.current = !1;
  }, [m, s]);
  const b = () => {
    e(!0), n.setQuickFilterText(""), setTimeout(() => {
      x(!1), e(!1);
    }, 200);
  };
  return /* @__PURE__ */ o("div", { className: C("mtx-max-w-60", a), ...r, children: m || d ? /* @__PURE__ */ o(
    W,
    {
      ref: u,
      className: C(
        "mtx-relative mtx-h-7.5",
        m && !d ? "mtx-animate-input-open" : "",
        d && "mtx-animate-input-close"
      ),
      onChange: (f) => l(f.target.value),
      value: c,
      startAdornment: /* @__PURE__ */ o(D, { variant: "toolbar", type: "button", className: "mtx-p-0.5 mtx-h-6 mtx-w-6 mtx-border-none mtx-mx-1", onClick: b, children: /* @__PURE__ */ o(G, { className: "mtx-w-5 mtx-h-5" }) }),
      endAdornment: c && /* @__PURE__ */ o(D, { variant: "toolbar", type: "button", className: "mtx-p-0.5 mtx-w-6 mtx-h-6 mtx-border-none mtx-mx-1", onClick: p, children: /* @__PURE__ */ o(U, { className: "mtx-w-5 mtx-h-5" }) })
    }
  ) : /* @__PURE__ */ o(D, { variant: "toolbar", type: "button", className: "mtx-p-0.5 mtx-w-6 mtx-h-6 mtx-m-1", onClick: R, children: /* @__PURE__ */ o(G, { className: "mtx-w-5 mtx-h-5" }) }) });
}, pt = ({
  freezeText: i,
  unFreezeText: s,
  onClick: a,
  disabled: r,
  ...n
}) => {
  const c = t.useContext(w);
  if (!c)
    throw new Error("FreezeAction should be used within <DataGrid>");
  const [l, m] = t.useState(0), [x, d] = t.useState(0), { api: e, pinnedRowIds: u, setPinnedRowIds: h } = c, p = () => {
    if (!e) return;
    const f = e.getSelectedNodes();
    if (f.length > 0) {
      const g = new Set(u);
      f.forEach((S) => {
        S.id !== void 0 && g.add(S.id);
      }), h(g), e.deselectAll();
    }
  }, R = () => {
    h(/* @__PURE__ */ new Set());
  }, b = (f) => {
    e && (e.getPinnedTopRowCount() > 0 ? R() : p()), a?.(f);
  };
  return t.useEffect(() => (e?.addEventListener("pinnedRowDataChanged", () => {
    m(e.getPinnedTopRowCount());
  }), e?.addEventListener("selectionChanged", () => {
    d(e.getSelectedNodes().length);
  }), () => {
    e?.isDestroyed() || (e?.removeEventListener("pinnedRowDataChanged", () => {
      m(e.getPinnedTopRowCount());
    }), e?.removeEventListener("selectionChanged", () => {
      d(e.getSelectedNodes().length);
    }));
  }), [e]), /* @__PURE__ */ o(
    N,
    {
      variant: "text",
      onClick: b,
      startIcon: /* @__PURE__ */ o($, { className: "mtx-w-4.5 mtx-h-4.5" }),
      disabled: !l && !x || r,
      type: "button",
      ...n,
      children: l ? s ?? "Unfreeze" : i ?? "Freeze"
    }
  );
}, ft = ({ children: i, className: s, onClick: a, ...r }) => {
  const n = t.useContext(w);
  if (!n)
    throw new Error("PrintAction should be used within <DataGrid>");
  const c = (l) => {
    n.api && (n.api.setGridOption("domLayout", "print"), setTimeout(() => {
      const m = document.querySelector("[grid-id='" + n.gridId + "']"), d = `<html>
        ${document.head.innerHTML}
        ${m.outerHTML}
        </html>`;
      V(d), n?.api?.setGridOption("domLayout", void 0);
    })), a?.(l);
  };
  return /* @__PURE__ */ o(D, { variant: "toolbar", type: "button", className: C("mtx-p-0.5 mtx-w-6 mtx-h-6", s), onClick: c, ...r, children: i ?? /* @__PURE__ */ o(j, { className: "mtx-w-5 mtx-h-5" }) });
}, wt = ({ className: i, onRefresh: s, children: a, loading: r, ...n }) => {
  if (!t.useContext(w))
    throw new Error("RefreshAction should be used within <DataGrid>");
  const l = () => {
    s();
  };
  return /* @__PURE__ */ o(
    D,
    {
      className: C("mtx-p-0.5 mtx-w-6 mtx-h-6", r && "disabled:mtx-bg-transparent", i),
      variant: "toolbar",
      type: "button",
      onClick: l,
      disabled: r,
      ...n,
      children: a ?? /* @__PURE__ */ o(_, { className: C("mtx-w-4.5 mtx-h-4.5", r && "mtx-animate-spin") })
    }
  );
}, gt = ({ onDelete: i, children: s, ...a }) => /* @__PURE__ */ o(N, { variant: "danger", type: "button", onClick: () => {
  i();
}, startIcon: /* @__PURE__ */ o(O, { className: "mtx-w-4.5 mtx-h-4.5" }), ...a, children: s }), Ct = ({ children: i, slotProps: s, className: a, ...r }) => /* @__PURE__ */ z(X, { ...s?.popoverProps ?? {}, children: [
  /* @__PURE__ */ o(J, { ...s?.triggerProps ?? {}, children: /* @__PURE__ */ o(q, { className: "mtx-w-4.5 mtx-h-4.5 mtx-text-primary" }) }),
  /* @__PURE__ */ o(K, { align: "end", className: C("mtx-w-40", a), ...r, children: i })
] });
export {
  ut as DataGrid,
  xt as DataGridActionBar,
  Z as DataGridContent,
  gt as DeleteAction,
  Ct as ExtraActions,
  pt as FreezeAction,
  ft as PrintAction,
  wt as RefreshAction,
  ht as SearchAction,
  Y as dataGridDefaultTheme,
  mt as useDataGrid
};
//# sourceMappingURL=datagrid.es.js.map
