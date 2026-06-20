import { jsx as i, jsxs as M } from "react/jsx-runtime";
import t, { forwardRef as L, useMemo as I } from "react";
import { AgGridReact as B } from "ag-grid-react";
import { themeQuartz as Q, ModuleRegistry as O, AllCommunityModule as q } from "ag-grid-community";
import { Trashcan as $, ElipsisVertical as j, Snowflake as _, Print as U, Refresh as V, CircleXmark as W, Magnifier as N } from "@trsys-tech/matrix-icons";
import { cn as C } from "./utils.es.js";
import { printHtml as X } from "./printhtml.es.js";
import { TextField as J } from "./textfield.es.js";
import { Button as P } from "./button.es.js";
import { IconButton as E } from "./iconbutton.es.js";
import { Popover as K, PopoverTrigger as Y, PopoverContent as Z } from "./popover.es.js";
O.registerModules([q]);
const tt = Q.withParams({
  fontFamily: "DMSans",
  fontSize: "12px",
  headerFontSize: "12px",
  headerFontWeight: 700,
  headerBackgroundColor: "oklch(var(--mtx-primary-50))",
  backgroundColor: "oklch(var(--mtx-gray-0))",
  accentColor: "oklch(var(--mtx-primary-300))",
  foregroundColor: "oklch(var(--mtx-text-500))",
  cellTextColor: "oklch(var(--mtx-text-500))"
}), y = (n) => {
  const e = n?.id;
  return e != null ? String(e) : void 0;
}, et = (n) => n ? (e) => {
  const o = n({ data: e, level: 0 });
  return o != null ? String(o) : y(e);
} : y, w = t.createContext(null), ht = () => {
  const n = t.useContext(w);
  if (!n)
    throw new Error("useDataGrid should be used within <DataGrid>");
  return n;
}, ft = ({ children: n }) => {
  const e = t.useId(), [o, a] = t.useState(null), [s, c] = t.useState([]), [l, u] = t.useState(0), [x, d] = t.useState(/* @__PURE__ */ new Set()), r = t.useRef(y), [m, h] = t.useState(""), [f, R] = t.useState(!1);
  return /* @__PURE__ */ i(
    w.Provider,
    {
      value: {
        api: o,
        setApi: a,
        rowData: s,
        setRowData: c,
        gridId: e,
        quickFilterText: m,
        setQuickFilterText: h,
        actionbarExists: f,
        setActionbarExists: R,
        actionbarHeight: l,
        setActionbarHeight: u,
        pinnedRowIds: x,
        setPinnedRowIds: d,
        resolveRowIdRef: r
      },
      children: n
    }
  );
}, nt = L(
  ({ theme: n, onGridReady: e, quickFilterText: o, rowData: a, containerStyle: s, getRowId: c, ...l }, u) => {
    const x = t.useContext(w);
    if (!x)
      throw new Error("DataGridContent should be used within <DataGrid>");
    const {
      rowData: d,
      setRowData: r,
      actionbarExists: m,
      setApi: h,
      setQuickFilterText: f,
      quickFilterText: R,
      gridId: b,
      actionbarHeight: D,
      pinnedRowIds: p,
      resolveRowIdRef: g
    } = x, v = t.useMemo(() => et(c), [c]), k = I(() => tt.withParams({
      headerHeight: 40,
      wrapperBorderRadius: m ? "0px 0px 8px 8px" : "8px"
    }), [m]);
    t.useEffect(() => (g.current = v, () => {
      g.current = y;
    }), [v, g]);
    const F = (S) => {
      h(S.api), e?.(S);
    };
    t.useEffect(() => {
      r(a);
    }, [a, r]), t.useEffect(() => {
      o !== void 0 && f(o ?? "");
    }, [o, f]);
    const { finalRowData: z, finalPinnedTopRowData: H } = I(() => {
      if (!d || p.size === 0)
        return { finalRowData: d, finalPinnedTopRowData: [] };
      const S = [], A = [];
      return d.forEach((T) => {
        const G = v(T);
        G !== void 0 && p.has(G) ? S.push(T) : A.push(T);
      }), { finalRowData: A, finalPinnedTopRowData: S };
    }, [d, p, v]);
    return /* @__PURE__ */ i(
      B,
      {
        gridId: b,
        theme: n ?? k,
        rowData: z,
        pinnedTopRowData: H,
        quickFilterText: R,
        onGridReady: F,
        containerStyle: { height: `calc(100% - ${D}px)`, ...s },
        getRowId: c,
        ...l,
        ref: u
      }
    );
  }
);
nt.displayName = "DataGridContent";
const pt = ({ className: n, ...e }) => {
  const o = t.useContext(w);
  if (!o)
    throw new Error("DataGridActionBar should be used within <DataGrid>");
  const a = t.useRef(null), { setActionbarExists: s, setActionbarHeight: c } = o, { children: l } = e;
  return t.useEffect(() => (s(!0), () => s(!1)), [s]), t.useEffect(() => {
    a.current && c(a.current.clientHeight);
  }, [c]), /* @__PURE__ */ i(
    "div",
    {
      className: C(
        "mtx-relative mtx-flex mtx-items-center mtx-p-2 mtx-h-12 mtx-w-full mtx-bg-gray-0 mtx-border mtx-border-gray-200 mtx-border-b-0 -mtx-mb-[1px] mtx-z-10 mtx-rounded-t-[8px]",
        n
      ),
      ref: a,
      children: l
    }
  );
}, wt = ({
  defaultOpen: n = !1,
  defaultOpenAutoFocus: e = !0,
  className: o,
  ...a
}) => {
  const s = t.useContext(w);
  if (!s)
    throw new Error("SearchAction should be used within <DataGrid>");
  const { quickFilterText: c, setQuickFilterText: l } = s, [u, x] = t.useState(n), [d, r] = t.useState(!1), m = t.useRef(null), h = t.useRef(!0), f = () => {
    s.setQuickFilterText(""), m.current && m.current.focus();
  }, R = () => {
    x(!0);
  };
  t.useEffect(() => {
    u && m?.current && (e || !h.current) && m.current.focus(), h.current = !1;
  }, [u, e]);
  const b = () => {
    r(!0), s.setQuickFilterText(""), setTimeout(() => {
      x(!1), r(!1);
    }, 200);
  };
  return /* @__PURE__ */ i("div", { className: C("mtx-max-w-60", o), ...a, children: u || d ? /* @__PURE__ */ i(
    J,
    {
      ref: m,
      className: C(
        "mtx-relative mtx-h-7.5",
        u && !d ? "mtx-animate-input-open" : "",
        d && "mtx-animate-input-close"
      ),
      onChange: (D) => l(D.target.value),
      value: c,
      startAdornment: /* @__PURE__ */ i(E, { variant: "toolbar", type: "button", className: "mtx-p-0.5 mtx-h-6 mtx-w-6 mtx-border-none mtx-mx-1", onClick: b, children: /* @__PURE__ */ i(N, { className: "mtx-w-5 mtx-h-5" }) }),
      endAdornment: c && /* @__PURE__ */ i(E, { variant: "toolbar", type: "button", className: "mtx-p-0.5 mtx-w-6 mtx-h-6 mtx-border-none mtx-mx-1", onClick: f, children: /* @__PURE__ */ i(W, { className: "mtx-w-5 mtx-h-5" }) })
    }
  ) : /* @__PURE__ */ i(E, { variant: "toolbar", type: "button", className: "mtx-p-0.5 mtx-w-6 mtx-h-6 mtx-m-1", onClick: R, children: /* @__PURE__ */ i(N, { className: "mtx-w-5 mtx-h-5" }) }) });
}, Rt = ({
  freezeText: n,
  unFreezeText: e,
  onClick: o,
  disabled: a,
  ...s
}) => {
  const c = t.useContext(w);
  if (!c)
    throw new Error("FreezeAction should be used within <DataGrid>");
  const [l, u] = t.useState(0), [x, d] = t.useState(0), { api: r, pinnedRowIds: m, setPinnedRowIds: h, resolveRowIdRef: f } = c, R = () => {
    if (!r) return;
    const p = r.getSelectedRows();
    if (p.length > 0) {
      const g = new Set(m);
      p.forEach((v) => {
        const k = f.current(v);
        k !== void 0 && g.add(k);
      }), h(g), r.deselectAll();
    }
  }, b = () => {
    h(/* @__PURE__ */ new Set());
  }, D = (p) => {
    r && (r.getPinnedTopRowCount() > 0 ? b() : R()), o?.(p);
  };
  return t.useEffect(() => (r?.addEventListener("pinnedRowDataChanged", () => {
    u(r.getPinnedTopRowCount());
  }), r?.addEventListener("selectionChanged", () => {
    d(r.getSelectedNodes().length);
  }), () => {
    r?.isDestroyed() || (r?.removeEventListener("pinnedRowDataChanged", () => {
      u(r.getPinnedTopRowCount());
    }), r?.removeEventListener("selectionChanged", () => {
      d(r.getSelectedNodes().length);
    }));
  }), [r]), /* @__PURE__ */ i(
    P,
    {
      variant: "text",
      onClick: D,
      startIcon: /* @__PURE__ */ i(_, { className: "mtx-w-4.5 mtx-h-4.5" }),
      disabled: !l && !x || a,
      type: "button",
      ...s,
      children: l ? e ?? "Unfreeze" : n ?? "Freeze"
    }
  );
}, gt = ({ children: n, className: e, onClick: o, ...a }) => {
  const s = t.useContext(w);
  if (!s)
    throw new Error("PrintAction should be used within <DataGrid>");
  const c = (l) => {
    s.api && (s.api.setGridOption("domLayout", "print"), setTimeout(() => {
      const u = document.querySelector("[grid-id='" + s.gridId + "']"), d = `<html>
        ${document.head.innerHTML}
        ${u.outerHTML}
        </html>`;
      X(d), s?.api?.setGridOption("domLayout", void 0);
    })), o?.(l);
  };
  return /* @__PURE__ */ i(E, { variant: "toolbar", type: "button", className: C("mtx-p-0.5 mtx-w-6 mtx-h-6", e), onClick: c, ...a, children: n ?? /* @__PURE__ */ i(U, { className: "mtx-w-5 mtx-h-5" }) });
}, Ct = ({ className: n, onRefresh: e, children: o, loading: a, ...s }) => {
  if (!t.useContext(w))
    throw new Error("RefreshAction should be used within <DataGrid>");
  const l = () => {
    e();
  };
  return /* @__PURE__ */ i(
    E,
    {
      className: C("mtx-p-0.5 mtx-w-6 mtx-h-6", a && "disabled:mtx-bg-transparent", n),
      variant: "toolbar",
      type: "button",
      onClick: l,
      disabled: a,
      ...s,
      children: o ?? /* @__PURE__ */ i(V, { className: C("mtx-w-4.5 mtx-h-4.5", a && "mtx-animate-spin") })
    }
  );
}, vt = ({ onDelete: n, children: e, ...o }) => /* @__PURE__ */ i(P, { variant: "danger", type: "button", onClick: () => {
  n();
}, startIcon: /* @__PURE__ */ i($, { className: "mtx-w-4.5 mtx-h-4.5" }), ...o, children: e }), bt = ({ children: n, slotProps: e, className: o, ...a }) => /* @__PURE__ */ M(K, { ...e?.popoverProps ?? {}, children: [
  /* @__PURE__ */ i(Y, { ...e?.triggerProps ?? {}, children: /* @__PURE__ */ i(j, { className: "mtx-w-4.5 mtx-h-4.5 mtx-text-primary" }) }),
  /* @__PURE__ */ i(Z, { align: "end", className: C("mtx-w-40", o), ...a, children: n })
] });
export {
  ft as DataGrid,
  pt as DataGridActionBar,
  nt as DataGridContent,
  vt as DeleteAction,
  bt as ExtraActions,
  Rt as FreezeAction,
  gt as PrintAction,
  Ct as RefreshAction,
  wt as SearchAction,
  tt as dataGridDefaultTheme,
  ht as useDataGrid
};
//# sourceMappingURL=datagrid.es.js.map
