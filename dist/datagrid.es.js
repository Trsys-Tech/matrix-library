import { jsx as r, jsxs as A } from "react/jsx-runtime";
import t, { useMemo as N } from "react";
import { AgGridReact as T } from "ag-grid-react";
import { ModuleRegistry as k, AllCommunityModule as y, themeQuartz as F } from "ag-grid-community";
import { Magnifier as G, CircleXmark as P, Snowflake as z, Print as I, Refresh as H, Trashcan as O, ElipsisVertical as L } from "@trsys-tech/matrix-icons";
import { cn as w } from "./utils.es.js";
import { printHtml as M } from "./printhtml.es.js";
import { TextField as B } from "./textfield.es.js";
import { Button as E } from "./button.es.js";
import { IconButton as D } from "./iconbutton.es.js";
import { Popover as Q, PopoverTrigger as q, PopoverContent as $ } from "./popover.es.js";
k.registerModules([y]);
const j = F.withParams({
  fontFamily: "DMSans",
  fontSize: "12px",
  headerFontSize: "12px",
  headerFontWeight: 700,
  headerBackgroundColor: "hsl(var(--primary-50))",
  backgroundColor: "hsl(var(--gray-0))",
  accentColor: "hsl(var(--primary-300))",
  foregroundColor: "hsl(var(--text-500))",
  cellTextColor: "hsl(var(--text-500))"
}), p = t.createContext(null), ne = () => {
  const o = t.useContext(p);
  if (!o)
    throw new Error("useDataGrid should be used within <DataGrid>");
  return o;
}, re = ({ children: o }) => {
  const s = t.useId(), [a, n] = t.useState(null), [i, d] = t.useState([]), [c, u] = t.useState(0), [h, l] = t.useState(""), [e, m] = t.useState(!1);
  return /* @__PURE__ */ r(
    p.Provider,
    {
      value: {
        api: a,
        setApi: n,
        rowData: i,
        setRowData: d,
        gridId: s,
        quickFilterText: h,
        setQuickFilterText: l,
        actionbarExists: e,
        setActionbarExists: m,
        actionbarHeight: c,
        setActionbarHeight: u
      },
      children: o
    }
  );
}, oe = ({
  theme: o,
  onGridReady: s,
  quickFilterText: a,
  rowData: n,
  containerStyle: i,
  ...d
}) => {
  const c = t.useContext(p);
  if (!c)
    throw new Error("DataGridContent should be used within <DataGrid>");
  const { rowData: u, setRowData: h, actionbarExists: l, setApi: e, setQuickFilterText: m, quickFilterText: x, gridId: g, actionbarHeight: C } = c, f = N(() => j.withParams({
    headerHeight: 40,
    wrapperBorderRadius: l ? "0px 0px 8px 8px" : "8px"
  }), [l]), R = (v) => {
    e(v.api), s?.(v);
  };
  return t.useEffect(() => {
    h(n);
  }, [n, h]), t.useEffect(() => {
    a !== void 0 && m(a ?? "");
  }, [a, m]), /* @__PURE__ */ r(
    T,
    {
      gridId: g,
      theme: o ?? f,
      rowData: u,
      quickFilterText: x,
      onGridReady: R,
      containerStyle: { height: `calc(100% - ${C}px)`, ...i },
      ...d
    }
  );
}, ae = ({ className: o, ...s }) => {
  const a = t.useContext(p);
  if (!a)
    throw new Error("DataGridActionBar should be used within <DataGrid>");
  const n = t.useRef(null), { setActionbarExists: i, setActionbarHeight: d } = a, { children: c } = s;
  return t.useEffect(() => (i(!0), () => i(!1)), [i]), t.useEffect(() => {
    n.current && d(n.current.clientHeight);
  }, [d]), /* @__PURE__ */ r(
    "div",
    {
      className: w(
        "relative flex items-center p-2 h-12 w-full bg-gray-0 border border-gray-200 border-b-0 -mb-[1px] z-10 rounded-t-[8px]",
        o
      ),
      ref: n,
      children: c
    }
  );
}, ie = ({ defaultOpen: o = !1, className: s, ...a }) => {
  const n = t.useContext(p);
  if (!n)
    throw new Error("SearchAction should be used within <DataGrid>");
  const { quickFilterText: i, setQuickFilterText: d } = n, [c, u] = t.useState(o), [h, l] = t.useState(!1), e = t.useRef(null), m = () => {
    n.setQuickFilterText(""), e.current && e.current.focus();
  }, x = () => {
    u(!0);
  };
  t.useEffect(() => {
    c && e?.current && e.current.focus();
  }, [c]);
  const g = () => {
    l(!0), n.setQuickFilterText(""), setTimeout(() => {
      u(!1), l(!1);
    }, 200);
  };
  return /* @__PURE__ */ r("div", { className: w("max-w-60", s), ...a, children: c || h ? /* @__PURE__ */ r(
    B,
    {
      ref: e,
      className: w("relative h-7.5", c && !h ? "animate-input-open" : "", h && "animate-input-close"),
      onChange: (C) => d(C.target.value),
      value: i,
      startAdornment: /* @__PURE__ */ r(D, { variant: "toolbar", className: "p-0.5 h-6 w-6 border-none mx-1", onClick: g, children: /* @__PURE__ */ r(G, { className: "w-5 h-5" }) }),
      endAdornment: i && /* @__PURE__ */ r(D, { variant: "toolbar", className: "p-0.5 w-6 h-6 border-none mx-1", onClick: m, children: /* @__PURE__ */ r(P, { className: "w-5 h-5" }) })
    }
  ) : /* @__PURE__ */ r(D, { variant: "toolbar", className: "p-0.5 w-6 h-6 m-1", onClick: x, children: /* @__PURE__ */ r(G, { className: "w-5 h-5" }) }) });
}, se = ({ freezeText: o, unFreezeText: s, onClick: a, disabled: n, ...i }) => {
  const d = t.useContext(p);
  if (!d)
    throw new Error("FreezeAction should be used within <DataGrid>");
  const [c, u] = t.useState(0), [h, l] = t.useState(0), { api: e, rowData: m } = d, x = () => {
    if (!e) return;
    const f = e.getSelectedNodes();
    if (f.length > 0) {
      e.setGridOption(
        "pinnedTopRowData",
        f.map((b) => b.data)
      );
      const v = e.getRenderedNodes().filter((b) => !f.some((S) => S.id === b.id));
      e.setGridOption(
        "rowData",
        v.map((b) => b.data)
      );
    }
  }, g = () => {
    e && (e.setGridOption("pinnedTopRowData", []), e.setGridOption("rowData", m));
  }, C = (f) => {
    e && (e.getPinnedTopRowCount() > 0 ? g() : x()), a?.(f);
  };
  return t.useEffect(() => (e?.addEventListener("pinnedRowDataChanged", () => {
    u(e.getPinnedTopRowCount());
  }), e?.addEventListener("selectionChanged", () => {
    l(e.getSelectedNodes().length);
  }), () => {
    e?.removeEventListener("pinnedRowDataChanged", () => {
      u(e.getPinnedTopRowCount());
    }), e?.removeEventListener("selectionChanged", () => {
      l(e.getSelectedNodes().length);
    });
  }), [e]), /* @__PURE__ */ r(
    E,
    {
      variant: "text",
      onClick: C,
      startIcon: /* @__PURE__ */ r(z, { className: "w-4.5 h-4.5" }),
      disabled: !c && !h || n,
      ...i,
      children: c ? s ?? "Unfreeze" : o ?? "Freeze"
    }
  );
}, ce = ({ children: o, className: s, onClick: a, ...n }) => {
  const i = t.useContext(p);
  if (!i)
    throw new Error("PrintAction should be used within <DataGrid>");
  const d = (c) => {
    i.api && (i.api.setGridOption("domLayout", "print"), setTimeout(() => {
      const u = document.querySelector("[grid-id='" + i.gridId + "']"), l = `<html>
        ${document.head.innerHTML}
        ${u.outerHTML}
        </html>`;
      M(l), i?.api?.setGridOption("domLayout", void 0);
    })), a?.(c);
  };
  return /* @__PURE__ */ r(D, { variant: "toolbar", className: w("p-0.5 w-6 h-6", s), onClick: d, ...n, children: o ?? /* @__PURE__ */ r(I, { className: "w-5 h-5" }) });
}, de = ({ className: o, onRefresh: s, children: a, loading: n, ...i }) => {
  if (!t.useContext(p))
    throw new Error("RefreshAction should be used within <DataGrid>");
  const c = () => {
    s();
  };
  return /* @__PURE__ */ r(
    D,
    {
      className: w("p-0.5 w-6 h-6", n && "disabled:bg-transparent", o),
      variant: "toolbar",
      onClick: c,
      disabled: n,
      ...i,
      children: a ?? /* @__PURE__ */ r(H, { className: w("w-4.5 h-4.5", n && "animate-spin") })
    }
  );
}, le = ({ onDelete: o, children: s, ...a }) => /* @__PURE__ */ r(E, { variant: "danger", onClick: () => {
  o();
}, startIcon: /* @__PURE__ */ r(O, { className: "w-4.5 h-4.5" }), ...a, children: s }), ue = ({ children: o, slotProps: s, className: a, ...n }) => /* @__PURE__ */ A(Q, { ...s?.popoverProps ?? {}, children: [
  /* @__PURE__ */ r(q, { ...s?.triggerProps ?? {}, children: /* @__PURE__ */ r(L, { className: "w-4.5 h-4.5 text-primary" }) }),
  /* @__PURE__ */ r($, { align: "end", className: w("w-40", a), ...n, children: o })
] });
export {
  re as DataGrid,
  ae as DataGridActionBar,
  oe as DataGridContent,
  le as DeleteAction,
  ue as ExtraActions,
  se as FreezeAction,
  ce as PrintAction,
  de as RefreshAction,
  ie as SearchAction,
  j as dataGridDefaultTheme,
  ne as useDataGrid
};
//# sourceMappingURL=datagrid.es.js.map
