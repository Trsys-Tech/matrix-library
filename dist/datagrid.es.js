import { jsx as r, jsxs as N } from "react/jsx-runtime";
import e from "react";
import { AgGridReact as A } from "ag-grid-react";
import { themeQuartz as T } from "ag-grid-community";
import { Magnifier as G, CircleXmark as k, Snowflake as F, Print as P, Refresh as z, Trashcan as I, ElipsisVertical as y } from "@trsys-tech/matrix-icons";
import { cn as w } from "./utils.es.js";
import { printHtml as H } from "./printhtml.es.js";
import { TextField as O } from "./textfield.es.js";
import { Button as E } from "./button.es.js";
import { IconButton as C } from "./iconbutton.es.js";
import { Popover as L, PopoverTrigger as Q, PopoverContent as B } from "./popover.es.js";
const M = T.withParams({
  fontFamily: "DMSans",
  fontSize: "12px",
  headerFontSize: "12px",
  headerFontWeight: 700
}), m = e.createContext(null), Z = () => {
  const s = e.useContext(m);
  if (!s)
    throw new Error("useDataGrid should be used within <DataGrid>");
  return s;
}, ee = ({ children: s }) => {
  const o = e.useId(), [a, i] = e.useState(null), [n, d] = e.useState([]), [c, u] = e.useState(0), [l, h] = e.useState(""), [t, p] = e.useState(!1);
  return /* @__PURE__ */ r(
    m.Provider,
    {
      value: {
        api: a,
        setApi: i,
        rowData: n,
        setRowData: d,
        gridId: o,
        quickFilterText: l,
        setQuickFilterText: h,
        actionbarExists: t,
        setActionbarExists: p,
        actionbarHeight: c,
        setActionbarHeight: u
      },
      children: s
    }
  );
}, te = ({
  theme: s,
  onGridReady: o,
  quickFilterText: a,
  rowData: i,
  containerStyle: n,
  ...d
}) => {
  const c = e.useContext(m);
  if (!c)
    throw new Error("DataGridContent should be used within <DataGrid>");
  const { rowData: u, setRowData: l, actionbarExists: h, setApi: t, setQuickFilterText: p, quickFilterText: x, gridId: D, actionbarHeight: R } = c, f = M.withParams({
    headerHeight: 40,
    wrapperBorderRadius: h ? "0px 0px 8px 8px" : "8px"
  }), v = (b) => {
    t(b.api), o?.(b);
  };
  return e.useEffect(() => {
    l(i);
  }, [i, l]), e.useEffect(() => {
    a !== void 0 && p(a ?? "");
  }, [a, p]), /* @__PURE__ */ r(
    A,
    {
      gridId: D,
      theme: s ?? f,
      rowData: u,
      quickFilterText: x,
      onGridReady: v,
      containerStyle: { height: `calc(100% - ${R}px)`, ...n },
      ...d
    }
  );
}, ne = ({ className: s, ...o }) => {
  const a = e.useContext(m);
  if (!a)
    throw new Error("DataGridActionBar should be used within <DataGrid>");
  const i = e.useRef(null), { setActionbarExists: n, setActionbarHeight: d } = a, { children: c } = o;
  return e.useEffect(() => (n(!0), () => n(!1)), [n]), e.useEffect(() => {
    i.current && d(i.current.clientHeight);
  }, [d]), /* @__PURE__ */ r(
    "div",
    {
      className: w(
        "relative flex items-center p-2 h-12 w-full bg-gray-0 border border-gray-200 border-b-0 -mb-[1px] z-10 rounded-t-[8px]",
        s
      ),
      ref: i,
      children: c
    }
  );
}, re = ({ defaultOpen: s = !1 }) => {
  const o = e.useContext(m);
  if (!o)
    throw new Error("SearchAction should be used within <DataGrid>");
  const { quickFilterText: a, setQuickFilterText: i } = o, [n, d] = e.useState(s), [c, u] = e.useState(!1), l = e.useRef(null), h = () => {
    o.setQuickFilterText(""), l.current && l.current.focus();
  }, t = () => {
    d(!0);
  };
  e.useEffect(() => {
    n && l?.current && l.current.focus();
  }, [n]);
  const p = () => {
    u(!0), o.setQuickFilterText(""), setTimeout(() => {
      d(!1), u(!1);
    }, 200);
  };
  return /* @__PURE__ */ r("div", { className: "max-w-60", children: n || c ? /* @__PURE__ */ r(
    O,
    {
      ref: l,
      className: w("relative h-7.5", n && !c ? "animate-input-open" : "", c && "animate-input-close"),
      onChange: (x) => i(x.target.value),
      value: a,
      startAdornment: /* @__PURE__ */ r(C, { variant: "toolbar", className: "p-0.5 h-6 w-6 border-none mx-1", onClick: p, children: /* @__PURE__ */ r(G, { className: "w-5 h-5" }) }),
      endAdornment: a && /* @__PURE__ */ r(C, { variant: "toolbar", className: "p-0.5 w-6 h-6 border-none mx-1", onClick: h, children: /* @__PURE__ */ r(k, { className: "w-5 h-5" }) })
    }
  ) : /* @__PURE__ */ r(C, { variant: "toolbar", className: "p-0.5 w-6 h-6 m-1", onClick: t, children: /* @__PURE__ */ r(G, { className: "w-5 h-5" }) }) });
}, oe = ({ freezeText: s, unFreezeText: o, onClick: a, disabled: i, ...n }) => {
  const d = e.useContext(m);
  if (!d)
    throw new Error("FreezeAction should be used within <DataGrid>");
  const [c, u] = e.useState(0), [l, h] = e.useState(0), { api: t, rowData: p } = d, x = () => {
    if (!t) return;
    const f = t.getSelectedNodes();
    if (f.length > 0) {
      t.setGridOption(
        "pinnedTopRowData",
        f.map((g) => g.data)
      );
      const b = t.getRenderedNodes().filter((g) => !f.some((S) => S.id === g.id));
      t.setGridOption(
        "rowData",
        b.map((g) => g.data)
      );
    }
  }, D = () => {
    t && (t.setGridOption("pinnedTopRowData", []), t.setGridOption("rowData", p));
  }, R = (f) => {
    t && (t.getPinnedTopRowCount() > 0 ? D() : x()), a?.(f);
  };
  return e.useEffect(() => (t?.addEventListener("pinnedRowDataChanged", () => {
    u(t.getPinnedTopRowCount());
  }), t?.addEventListener("selectionChanged", () => {
    h(t.getSelectedNodes().length);
  }), () => {
    t?.removeEventListener("pinnedRowDataChanged", () => {
      u(t.getPinnedTopRowCount());
    }), t?.removeEventListener("selectionChanged", () => {
      h(t.getSelectedNodes().length);
    });
  }), [t]), /* @__PURE__ */ r(
    E,
    {
      variant: "text",
      onClick: R,
      startIcon: /* @__PURE__ */ r(F, { className: "w-4.5 h-4.5" }),
      disabled: !c && !l || i,
      ...n,
      children: c ? o ?? "Unfreeze" : s ?? "Freeze"
    }
  );
}, ae = ({ children: s, className: o, onClick: a, ...i }) => {
  const n = e.useContext(m);
  if (!n)
    throw new Error("PrintAction should be used within <DataGrid>");
  const d = (c) => {
    n.api && (n.api.setGridOption("domLayout", "print"), setTimeout(() => {
      const u = document.querySelector("[grid-id='" + n.gridId + "']"), h = `<html>
        ${document.head.innerHTML}
        ${u.outerHTML}
        </html>`;
      H(h), n?.api?.setGridOption("domLayout", void 0);
    })), a?.(c);
  };
  return /* @__PURE__ */ r(C, { variant: "toolbar", className: w("p-0.5 w-6 h-6", o), onClick: d, ...i, children: s ?? /* @__PURE__ */ r(P, { className: "w-5 h-5" }) });
}, ie = ({ className: s, refreshRowData: o, children: a, loading: i, ...n }) => {
  if (!e.useContext(m))
    throw new Error("RefreshAction should be used within <DataGrid>");
  const c = () => {
    o();
  };
  return /* @__PURE__ */ r(
    C,
    {
      className: w("p-0.5 w-6 h-6", i && "disabled:bg-transparent", s),
      variant: "toolbar",
      onClick: c,
      disabled: i,
      ...n,
      children: a ?? /* @__PURE__ */ r(z, { className: w("w-4.5 h-4.5", i && "animate-spin") })
    }
  );
}, se = ({ onDelete: s, children: o, ...a }) => /* @__PURE__ */ r(E, { variant: "danger", onClick: () => {
  s();
}, startIcon: /* @__PURE__ */ r(I, { className: "w-4.5 h-4.5" }), ...a, children: o }), ce = ({ children: s, slotProps: o, className: a, ...i }) => /* @__PURE__ */ N(L, { ...o?.popoverProps ?? {}, children: [
  /* @__PURE__ */ r(Q, { ...o?.triggerProps ?? {}, children: /* @__PURE__ */ r(y, { className: "w-4.5 h-4.5 text-primary" }) }),
  /* @__PURE__ */ r(B, { align: "end", className: w("w-40", a), ...i, children: s })
] });
export {
  ee as DataGrid,
  ne as DataGridActionBar,
  te as DataGridContent,
  se as DeleteAction,
  ce as ExtraActions,
  oe as FreezeAction,
  ae as PrintAction,
  ie as RefreshAction,
  re as SearchAction,
  Z as useDataGrid
};
//# sourceMappingURL=datagrid.es.js.map
