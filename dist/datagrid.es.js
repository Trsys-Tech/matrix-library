import { jsx as o, jsxs as z } from "react/jsx-runtime";
import e, { forwardRef as H, useMemo as N } from "react";
import { AgGridReact as L } from "ag-grid-react";
import { themeQuartz as M, ModuleRegistry as B, AllCommunityModule as Q } from "ag-grid-community";
import { CircleXmark as O, Magnifier as k, Snowflake as q, Print as $, Refresh as j, ElipsisVertical as _, Trashcan as U } from "@trsys-tech/matrix-icons";
import { cn as g } from "./utils.es.js";
import { printHtml as V } from "./printhtml.es.js";
import { TextField as W } from "./textfield.es.js";
import { Button as P } from "./button.es.js";
import { IconButton as D } from "./iconbutton.es.js";
import { Popover as X, PopoverTrigger as J, PopoverContent as K } from "./popover.es.js";
B.registerModules([Q]);
const Y = M.withParams({
  fontFamily: "DMSans",
  fontSize: "12px",
  headerFontSize: "12px",
  headerFontWeight: 700,
  headerBackgroundColor: "hsl(var(--primary-50))",
  backgroundColor: "hsl(var(--gray-0))",
  accentColor: "hsl(var(--primary-300))",
  foregroundColor: "hsl(var(--text-500))",
  cellTextColor: "hsl(var(--text-500))"
}), w = e.createContext(null), ue = () => {
  const r = e.useContext(w);
  if (!r)
    throw new Error("useDataGrid should be used within <DataGrid>");
  return r;
}, he = ({ children: r }) => {
  const s = e.useId(), [i, n] = e.useState(null), [a, c] = e.useState([]), [d, u] = e.useState(0), [h, l] = e.useState(/* @__PURE__ */ new Set()), [t, f] = e.useState(""), [p, m] = e.useState(!1);
  return /* @__PURE__ */ o(
    w.Provider,
    {
      value: {
        api: i,
        setApi: n,
        rowData: a,
        setRowData: c,
        gridId: s,
        quickFilterText: t,
        setQuickFilterText: f,
        actionbarExists: p,
        setActionbarExists: m,
        actionbarHeight: d,
        setActionbarHeight: u,
        pinnedRowIds: h,
        setPinnedRowIds: l
      },
      children: r
    }
  );
}, Z = H(
  ({ theme: r, onGridReady: s, quickFilterText: i, rowData: n, containerStyle: a, getRowId: c, ...d }, u) => {
    const h = e.useContext(w);
    if (!h)
      throw new Error("DataGridContent should be used within <DataGrid>");
    const { rowData: l, setRowData: t, actionbarExists: f, setApi: p, setQuickFilterText: m, quickFilterText: R, gridId: E, actionbarHeight: C, pinnedRowIds: x } = h, b = N(() => Y.withParams({
      headerHeight: 40,
      wrapperBorderRadius: f ? "0px 0px 8px 8px" : "8px"
    }), [f]), y = (v) => {
      p(v.api), s?.(v);
    };
    e.useEffect(() => {
      t(n);
    }, [n, t]), e.useEffect(() => {
      i !== void 0 && m(i ?? "");
    }, [i, m]);
    const { finalRowData: F, finalPinnedTopRowData: I } = N(() => {
      if (!l || x.size === 0)
        return { finalRowData: l, finalPinnedTopRowData: [] };
      const v = [], T = [];
      return l.forEach((S) => {
        const A = c ? c({ data: S, level: 0 }) : S.id, G = A != null ? String(A) : void 0;
        G !== void 0 && x.has(G) ? v.push(S) : T.push(S);
      }), { finalRowData: T, finalPinnedTopRowData: v };
    }, [l, x, c]);
    return /* @__PURE__ */ o(
      L,
      {
        gridId: E,
        theme: r ?? b,
        rowData: F,
        pinnedTopRowData: I,
        quickFilterText: R,
        onGridReady: y,
        containerStyle: { height: `calc(100% - ${C}px)`, ...a },
        getRowId: c,
        ...d,
        ref: u
      }
    );
  }
);
Z.displayName = "DataGridContent";
const fe = ({ className: r, ...s }) => {
  const i = e.useContext(w);
  if (!i)
    throw new Error("DataGridActionBar should be used within <DataGrid>");
  const n = e.useRef(null), { setActionbarExists: a, setActionbarHeight: c } = i, { children: d } = s;
  return e.useEffect(() => (a(!0), () => a(!1)), [a]), e.useEffect(() => {
    n.current && c(n.current.clientHeight);
  }, [c]), /* @__PURE__ */ o(
    "div",
    {
      className: g(
        "relative flex items-center p-2 h-12 w-full bg-gray-0 border border-gray-200 border-b-0 -mb-[1px] z-10 rounded-t-[8px]",
        r
      ),
      ref: n,
      children: d
    }
  );
}, pe = ({ defaultOpen: r = !1, className: s, ...i }) => {
  const n = e.useContext(w);
  if (!n)
    throw new Error("SearchAction should be used within <DataGrid>");
  const { quickFilterText: a, setQuickFilterText: c } = n, [d, u] = e.useState(r), [h, l] = e.useState(!1), t = e.useRef(null), f = () => {
    n.setQuickFilterText(""), t.current && t.current.focus();
  }, p = () => {
    u(!0);
  };
  e.useEffect(() => {
    d && t?.current && t.current.focus();
  }, [d]);
  const m = () => {
    l(!0), n.setQuickFilterText(""), setTimeout(() => {
      u(!1), l(!1);
    }, 200);
  };
  return /* @__PURE__ */ o("div", { className: g("max-w-60", s), ...i, children: d || h ? /* @__PURE__ */ o(
    W,
    {
      ref: t,
      className: g("relative h-7.5", d && !h ? "animate-input-open" : "", h && "animate-input-close"),
      onChange: (R) => c(R.target.value),
      value: a,
      startAdornment: /* @__PURE__ */ o(D, { variant: "toolbar", className: "p-0.5 h-6 w-6 border-none mx-1", onClick: m, children: /* @__PURE__ */ o(k, { className: "w-5 h-5" }) }),
      endAdornment: a && /* @__PURE__ */ o(D, { variant: "toolbar", className: "p-0.5 w-6 h-6 border-none mx-1", onClick: f, children: /* @__PURE__ */ o(O, { className: "w-5 h-5" }) })
    }
  ) : /* @__PURE__ */ o(D, { variant: "toolbar", className: "p-0.5 w-6 h-6 m-1", onClick: p, children: /* @__PURE__ */ o(k, { className: "w-5 h-5" }) }) });
}, me = ({ freezeText: r, unFreezeText: s, onClick: i, disabled: n, ...a }) => {
  const c = e.useContext(w);
  if (!c)
    throw new Error("FreezeAction should be used within <DataGrid>");
  const [d, u] = e.useState(0), [h, l] = e.useState(0), { api: t, pinnedRowIds: f, setPinnedRowIds: p } = c, m = () => {
    if (!t) return;
    const C = t.getSelectedNodes();
    if (C.length > 0) {
      const x = new Set(f);
      C.forEach((b) => {
        b.id !== void 0 && x.add(b.id);
      }), p(x), t.deselectAll();
    }
  }, R = () => {
    p(/* @__PURE__ */ new Set());
  }, E = (C) => {
    t && (t.getPinnedTopRowCount() > 0 ? R() : m()), i?.(C);
  };
  return e.useEffect(() => (t?.addEventListener("pinnedRowDataChanged", () => {
    u(t.getPinnedTopRowCount());
  }), t?.addEventListener("selectionChanged", () => {
    l(t.getSelectedNodes().length);
  }), () => {
    t?.isDestroyed() || (t?.removeEventListener("pinnedRowDataChanged", () => {
      u(t.getPinnedTopRowCount());
    }), t?.removeEventListener("selectionChanged", () => {
      l(t.getSelectedNodes().length);
    }));
  }), [t]), /* @__PURE__ */ o(
    P,
    {
      variant: "text",
      onClick: E,
      startIcon: /* @__PURE__ */ o(q, { className: "w-4.5 h-4.5" }),
      disabled: !d && !h || n,
      ...a,
      children: d ? s ?? "Unfreeze" : r ?? "Freeze"
    }
  );
}, we = ({ children: r, className: s, onClick: i, ...n }) => {
  const a = e.useContext(w);
  if (!a)
    throw new Error("PrintAction should be used within <DataGrid>");
  const c = (d) => {
    a.api && (a.api.setGridOption("domLayout", "print"), setTimeout(() => {
      const u = document.querySelector("[grid-id='" + a.gridId + "']"), l = `<html>
        ${document.head.innerHTML}
        ${u.outerHTML}
        </html>`;
      V(l), a?.api?.setGridOption("domLayout", void 0);
    })), i?.(d);
  };
  return /* @__PURE__ */ o(D, { variant: "toolbar", className: g("p-0.5 w-6 h-6", s), onClick: c, ...n, children: r ?? /* @__PURE__ */ o($, { className: "w-5 h-5" }) });
}, xe = ({ className: r, onRefresh: s, children: i, loading: n, ...a }) => {
  if (!e.useContext(w))
    throw new Error("RefreshAction should be used within <DataGrid>");
  const d = () => {
    s();
  };
  return /* @__PURE__ */ o(
    D,
    {
      className: g("p-0.5 w-6 h-6", n && "disabled:bg-transparent", r),
      variant: "toolbar",
      onClick: d,
      disabled: n,
      ...a,
      children: i ?? /* @__PURE__ */ o(j, { className: g("w-4.5 h-4.5", n && "animate-spin") })
    }
  );
}, ge = ({ onDelete: r, children: s, ...i }) => /* @__PURE__ */ o(P, { variant: "danger", onClick: () => {
  r();
}, startIcon: /* @__PURE__ */ o(U, { className: "w-4.5 h-4.5" }), ...i, children: s }), Ce = ({ children: r, slotProps: s, className: i, ...n }) => /* @__PURE__ */ z(X, { ...s?.popoverProps ?? {}, children: [
  /* @__PURE__ */ o(J, { ...s?.triggerProps ?? {}, children: /* @__PURE__ */ o(_, { className: "w-4.5 h-4.5 text-primary" }) }),
  /* @__PURE__ */ o(K, { align: "end", className: g("w-40", i), ...n, children: r })
] });
export {
  he as DataGrid,
  fe as DataGridActionBar,
  Z as DataGridContent,
  ge as DeleteAction,
  Ce as ExtraActions,
  me as FreezeAction,
  we as PrintAction,
  xe as RefreshAction,
  pe as SearchAction,
  Y as dataGridDefaultTheme,
  ue as useDataGrid
};
//# sourceMappingURL=datagrid.es.js.map
