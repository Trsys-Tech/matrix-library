import { jsx as r, jsxs as N } from "react/jsx-runtime";
import t from "react";
import { AgGridReact as A } from "ag-grid-react";
import { themeQuartz as T } from "ag-grid-community";
import { Magnifier as G, CircleXmark as k, Snowflake as F, Print as P, Refresh as z, Trashcan as I, ElipsisVertical as y } from "@trsys-tech/matrix-icons";
import { cn as w } from "./utils.es.js";
import { printHtml as H } from "./printhtml.es.js";
import { TextField as O } from "./textfield.es.js";
import { Button as E } from "./button.es.js";
import { IconButton as D } from "./iconbutton.es.js";
import { Popover as L, PopoverTrigger as Q, PopoverContent as B } from "./popover.es.js";
const M = T.withParams({
  fontFamily: "DMSans",
  fontSize: "12px",
  headerFontSize: "12px",
  headerFontWeight: 700
}), m = t.createContext(null), Z = () => {
  const o = t.useContext(m);
  if (!o)
    throw new Error("useDataGrid should be used within <DataGrid>");
  return o;
}, ee = ({ children: o }) => {
  const s = t.useId(), [a, n] = t.useState(null), [i, d] = t.useState([]), [c, l] = t.useState(0), [u, h] = t.useState(""), [e, p] = t.useState(!1);
  return /* @__PURE__ */ r(
    m.Provider,
    {
      value: {
        api: a,
        setApi: n,
        rowData: i,
        setRowData: d,
        gridId: s,
        quickFilterText: u,
        setQuickFilterText: h,
        actionbarExists: e,
        setActionbarExists: p,
        actionbarHeight: c,
        setActionbarHeight: l
      },
      children: o
    }
  );
}, te = ({
  theme: o,
  onGridReady: s,
  quickFilterText: a,
  rowData: n,
  containerStyle: i,
  ...d
}) => {
  const c = t.useContext(m);
  if (!c)
    throw new Error("DataGridContent should be used within <DataGrid>");
  const { rowData: l, setRowData: u, actionbarExists: h, setApi: e, setQuickFilterText: p, quickFilterText: x, gridId: g, actionbarHeight: C } = c, f = M.withParams({
    headerHeight: 40,
    wrapperBorderRadius: h ? "0px 0px 8px 8px" : "8px"
  }), v = (R) => {
    e(R.api), s?.(R);
  };
  return t.useEffect(() => {
    u(n);
  }, [n, u]), t.useEffect(() => {
    a !== void 0 && p(a ?? "");
  }, [a, p]), /* @__PURE__ */ r(
    A,
    {
      gridId: g,
      theme: o ?? f,
      rowData: l,
      quickFilterText: x,
      onGridReady: v,
      containerStyle: { height: `calc(100% - ${C}px)`, ...i },
      ...d
    }
  );
}, ne = ({ className: o, ...s }) => {
  const a = t.useContext(m);
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
}, re = ({ defaultOpen: o = !1, className: s, ...a }) => {
  const n = t.useContext(m);
  if (!n)
    throw new Error("SearchAction should be used within <DataGrid>");
  const { quickFilterText: i, setQuickFilterText: d } = n, [c, l] = t.useState(o), [u, h] = t.useState(!1), e = t.useRef(null), p = () => {
    n.setQuickFilterText(""), e.current && e.current.focus();
  }, x = () => {
    l(!0);
  };
  t.useEffect(() => {
    c && e?.current && e.current.focus();
  }, [c]);
  const g = () => {
    h(!0), n.setQuickFilterText(""), setTimeout(() => {
      l(!1), h(!1);
    }, 200);
  };
  return /* @__PURE__ */ r("div", { className: w("max-w-60", s), ...a, children: c || u ? /* @__PURE__ */ r(
    O,
    {
      ref: e,
      className: w("relative h-7.5", c && !u ? "animate-input-open" : "", u && "animate-input-close"),
      onChange: (C) => d(C.target.value),
      value: i,
      startAdornment: /* @__PURE__ */ r(D, { variant: "toolbar", className: "p-0.5 h-6 w-6 border-none mx-1", onClick: g, children: /* @__PURE__ */ r(G, { className: "w-5 h-5" }) }),
      endAdornment: i && /* @__PURE__ */ r(D, { variant: "toolbar", className: "p-0.5 w-6 h-6 border-none mx-1", onClick: p, children: /* @__PURE__ */ r(k, { className: "w-5 h-5" }) })
    }
  ) : /* @__PURE__ */ r(D, { variant: "toolbar", className: "p-0.5 w-6 h-6 m-1", onClick: x, children: /* @__PURE__ */ r(G, { className: "w-5 h-5" }) }) });
}, oe = ({ freezeText: o, unFreezeText: s, onClick: a, disabled: n, ...i }) => {
  const d = t.useContext(m);
  if (!d)
    throw new Error("FreezeAction should be used within <DataGrid>");
  const [c, l] = t.useState(0), [u, h] = t.useState(0), { api: e, rowData: p } = d, x = () => {
    if (!e) return;
    const f = e.getSelectedNodes();
    if (f.length > 0) {
      e.setGridOption(
        "pinnedTopRowData",
        f.map((b) => b.data)
      );
      const R = e.getRenderedNodes().filter((b) => !f.some((S) => S.id === b.id));
      e.setGridOption(
        "rowData",
        R.map((b) => b.data)
      );
    }
  }, g = () => {
    e && (e.setGridOption("pinnedTopRowData", []), e.setGridOption("rowData", p));
  }, C = (f) => {
    e && (e.getPinnedTopRowCount() > 0 ? g() : x()), a?.(f);
  };
  return t.useEffect(() => (e?.addEventListener("pinnedRowDataChanged", () => {
    l(e.getPinnedTopRowCount());
  }), e?.addEventListener("selectionChanged", () => {
    h(e.getSelectedNodes().length);
  }), () => {
    e?.removeEventListener("pinnedRowDataChanged", () => {
      l(e.getPinnedTopRowCount());
    }), e?.removeEventListener("selectionChanged", () => {
      h(e.getSelectedNodes().length);
    });
  }), [e]), /* @__PURE__ */ r(
    E,
    {
      variant: "text",
      onClick: C,
      startIcon: /* @__PURE__ */ r(F, { className: "w-4.5 h-4.5" }),
      disabled: !c && !u || n,
      ...i,
      children: c ? s ?? "Unfreeze" : o ?? "Freeze"
    }
  );
}, ae = ({ children: o, className: s, onClick: a, ...n }) => {
  const i = t.useContext(m);
  if (!i)
    throw new Error("PrintAction should be used within <DataGrid>");
  const d = (c) => {
    i.api && (i.api.setGridOption("domLayout", "print"), setTimeout(() => {
      const l = document.querySelector("[grid-id='" + i.gridId + "']"), h = `<html>
        ${document.head.innerHTML}
        ${l.outerHTML}
        </html>`;
      H(h), i?.api?.setGridOption("domLayout", void 0);
    })), a?.(c);
  };
  return /* @__PURE__ */ r(D, { variant: "toolbar", className: w("p-0.5 w-6 h-6", s), onClick: d, ...n, children: o ?? /* @__PURE__ */ r(P, { className: "w-5 h-5" }) });
}, ie = ({ className: o, onRefresh: s, children: a, loading: n, ...i }) => {
  if (!t.useContext(m))
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
      children: a ?? /* @__PURE__ */ r(z, { className: w("w-4.5 h-4.5", n && "animate-spin") })
    }
  );
}, se = ({ onDelete: o, children: s, ...a }) => /* @__PURE__ */ r(E, { variant: "danger", onClick: () => {
  o();
}, startIcon: /* @__PURE__ */ r(I, { className: "w-4.5 h-4.5" }), ...a, children: s }), ce = ({ children: o, slotProps: s, className: a, ...n }) => /* @__PURE__ */ N(L, { ...s?.popoverProps ?? {}, children: [
  /* @__PURE__ */ r(Q, { ...s?.triggerProps ?? {}, children: /* @__PURE__ */ r(y, { className: "w-4.5 h-4.5 text-primary" }) }),
  /* @__PURE__ */ r(B, { align: "end", className: w("w-40", a), ...n, children: o })
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
