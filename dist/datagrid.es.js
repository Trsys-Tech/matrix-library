import { jsx as r, jsxs as S } from "react/jsx-runtime";
import t, { forwardRef as A, useMemo as T } from "react";
import { AgGridReact as k } from "ag-grid-react";
import { themeQuartz as y, ModuleRegistry as F, AllCommunityModule as P } from "ag-grid-community";
import { CircleXmark as z, Magnifier as G, Snowflake as I, Print as H, Refresh as O, ElipsisVertical as L, Trashcan as M } from "@trsys-tech/matrix-icons";
import { cn as x } from "./utils.es.js";
import { printHtml as B } from "./printhtml.es.js";
import { TextField as Q } from "./textfield.es.js";
import { Button as E } from "./button.es.js";
import { IconButton as b } from "./iconbutton.es.js";
import { Popover as q, PopoverTrigger as $, PopoverContent as j } from "./popover.es.js";
F.registerModules([P]);
const _ = y.withParams({
  fontFamily: "DMSans",
  fontSize: "12px",
  headerFontSize: "12px",
  headerFontWeight: 700,
  headerBackgroundColor: "hsl(var(--primary-50))",
  backgroundColor: "hsl(var(--gray-0))",
  accentColor: "hsl(var(--primary-300))",
  foregroundColor: "hsl(var(--text-500))",
  cellTextColor: "hsl(var(--text-500))"
}), p = t.createContext(null), oe = () => {
  const o = t.useContext(p);
  if (!o)
    throw new Error("useDataGrid should be used within <DataGrid>");
  return o;
}, ae = ({ children: o }) => {
  const s = t.useId(), [a, n] = t.useState(null), [i, d] = t.useState([]), [c, l] = t.useState(0), [h, u] = t.useState(""), [e, f] = t.useState(!1);
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
        setQuickFilterText: u,
        actionbarExists: e,
        setActionbarExists: f,
        actionbarHeight: c,
        setActionbarHeight: l
      },
      children: o
    }
  );
}, U = A(
  ({ theme: o, onGridReady: s, quickFilterText: a, rowData: n, containerStyle: i, ...d }, c) => {
    const l = t.useContext(p);
    if (!l)
      throw new Error("DataGridContent should be used within <DataGrid>");
    const { rowData: h, setRowData: u, actionbarExists: e, setApi: f, setQuickFilterText: g, quickFilterText: C, gridId: D, actionbarHeight: w } = l, R = T(() => _.withParams({
      headerHeight: 40,
      wrapperBorderRadius: e ? "0px 0px 8px 8px" : "8px"
    }), [e]), v = (m) => {
      f(m.api), s?.(m);
    };
    return t.useEffect(() => {
      u(n);
    }, [n, u]), t.useEffect(() => {
      a !== void 0 && g(a ?? "");
    }, [a, g]), /* @__PURE__ */ r(
      k,
      {
        gridId: D,
        theme: o ?? R,
        rowData: h,
        quickFilterText: C,
        onGridReady: v,
        containerStyle: { height: `calc(100% - ${w}px)`, ...i },
        ...d,
        ref: c
      }
    );
  }
);
U.displayName = "DataGridContent";
const ie = ({ className: o, ...s }) => {
  const a = t.useContext(p);
  if (!a)
    throw new Error("DataGridActionBar should be used within <DataGrid>");
  const n = t.useRef(null), { setActionbarExists: i, setActionbarHeight: d } = a, { children: c } = s;
  return t.useEffect(() => (i(!0), () => i(!1)), [i]), t.useEffect(() => {
    n.current && d(n.current.clientHeight);
  }, [d]), /* @__PURE__ */ r(
    "div",
    {
      className: x(
        "relative flex items-center p-2 h-12 w-full bg-gray-0 border border-gray-200 border-b-0 -mb-[1px] z-10 rounded-t-[8px]",
        o
      ),
      ref: n,
      children: c
    }
  );
}, se = ({ defaultOpen: o = !1, className: s, ...a }) => {
  const n = t.useContext(p);
  if (!n)
    throw new Error("SearchAction should be used within <DataGrid>");
  const { quickFilterText: i, setQuickFilterText: d } = n, [c, l] = t.useState(o), [h, u] = t.useState(!1), e = t.useRef(null), f = () => {
    n.setQuickFilterText(""), e.current && e.current.focus();
  }, g = () => {
    l(!0);
  };
  t.useEffect(() => {
    c && e?.current && e.current.focus();
  }, [c]);
  const C = () => {
    u(!0), n.setQuickFilterText(""), setTimeout(() => {
      l(!1), u(!1);
    }, 200);
  };
  return /* @__PURE__ */ r("div", { className: x("max-w-60", s), ...a, children: c || h ? /* @__PURE__ */ r(
    Q,
    {
      ref: e,
      className: x("relative h-7.5", c && !h ? "animate-input-open" : "", h && "animate-input-close"),
      onChange: (D) => d(D.target.value),
      value: i,
      startAdornment: /* @__PURE__ */ r(b, { variant: "toolbar", className: "p-0.5 h-6 w-6 border-none mx-1", onClick: C, children: /* @__PURE__ */ r(G, { className: "w-5 h-5" }) }),
      endAdornment: i && /* @__PURE__ */ r(b, { variant: "toolbar", className: "p-0.5 w-6 h-6 border-none mx-1", onClick: f, children: /* @__PURE__ */ r(z, { className: "w-5 h-5" }) })
    }
  ) : /* @__PURE__ */ r(b, { variant: "toolbar", className: "p-0.5 w-6 h-6 m-1", onClick: g, children: /* @__PURE__ */ r(G, { className: "w-5 h-5" }) }) });
}, ce = ({ freezeText: o, unFreezeText: s, onClick: a, disabled: n, ...i }) => {
  const d = t.useContext(p);
  if (!d)
    throw new Error("FreezeAction should be used within <DataGrid>");
  const [c, l] = t.useState(0), [h, u] = t.useState(0), { api: e, rowData: f } = d, g = () => {
    if (!e) return;
    const w = e.getSelectedNodes();
    if (w.length > 0) {
      e.setGridOption(
        "pinnedTopRowData",
        w.map((m) => m.data)
      );
      const v = e.getRenderedNodes().filter((m) => !w.some((N) => N.id === m.id));
      e.setGridOption(
        "rowData",
        v.map((m) => m.data)
      );
    }
  }, C = () => {
    e && (e.setGridOption("pinnedTopRowData", []), e.setGridOption("rowData", f));
  }, D = (w) => {
    e && (e.getPinnedTopRowCount() > 0 ? C() : g()), a?.(w);
  };
  return t.useEffect(() => (e?.addEventListener("pinnedRowDataChanged", () => {
    l(e.getPinnedTopRowCount());
  }), e?.addEventListener("selectionChanged", () => {
    u(e.getSelectedNodes().length);
  }), () => {
    e?.isDestroyed() || (e?.removeEventListener("pinnedRowDataChanged", () => {
      l(e.getPinnedTopRowCount());
    }), e?.removeEventListener("selectionChanged", () => {
      u(e.getSelectedNodes().length);
    }));
  }), [e]), /* @__PURE__ */ r(
    E,
    {
      variant: "text",
      onClick: D,
      startIcon: /* @__PURE__ */ r(I, { className: "w-4.5 h-4.5" }),
      disabled: !c && !h || n,
      ...i,
      children: c ? s ?? "Unfreeze" : o ?? "Freeze"
    }
  );
}, de = ({ children: o, className: s, onClick: a, ...n }) => {
  const i = t.useContext(p);
  if (!i)
    throw new Error("PrintAction should be used within <DataGrid>");
  const d = (c) => {
    i.api && (i.api.setGridOption("domLayout", "print"), setTimeout(() => {
      const l = document.querySelector("[grid-id='" + i.gridId + "']"), u = `<html>
        ${document.head.innerHTML}
        ${l.outerHTML}
        </html>`;
      B(u), i?.api?.setGridOption("domLayout", void 0);
    })), a?.(c);
  };
  return /* @__PURE__ */ r(b, { variant: "toolbar", className: x("p-0.5 w-6 h-6", s), onClick: d, ...n, children: o ?? /* @__PURE__ */ r(H, { className: "w-5 h-5" }) });
}, le = ({ className: o, onRefresh: s, children: a, loading: n, ...i }) => {
  if (!t.useContext(p))
    throw new Error("RefreshAction should be used within <DataGrid>");
  const c = () => {
    s();
  };
  return /* @__PURE__ */ r(
    b,
    {
      className: x("p-0.5 w-6 h-6", n && "disabled:bg-transparent", o),
      variant: "toolbar",
      onClick: c,
      disabled: n,
      ...i,
      children: a ?? /* @__PURE__ */ r(O, { className: x("w-4.5 h-4.5", n && "animate-spin") })
    }
  );
}, ue = ({ onDelete: o, children: s, ...a }) => /* @__PURE__ */ r(E, { variant: "danger", onClick: () => {
  o();
}, startIcon: /* @__PURE__ */ r(M, { className: "w-4.5 h-4.5" }), ...a, children: s }), he = ({ children: o, slotProps: s, className: a, ...n }) => /* @__PURE__ */ S(q, { ...s?.popoverProps ?? {}, children: [
  /* @__PURE__ */ r($, { ...s?.triggerProps ?? {}, children: /* @__PURE__ */ r(L, { className: "w-4.5 h-4.5 text-primary" }) }),
  /* @__PURE__ */ r(j, { align: "end", className: x("w-40", a), ...n, children: o })
] });
export {
  ae as DataGrid,
  ie as DataGridActionBar,
  U as DataGridContent,
  ue as DeleteAction,
  he as ExtraActions,
  ce as FreezeAction,
  de as PrintAction,
  le as RefreshAction,
  se as SearchAction,
  _ as dataGridDefaultTheme,
  oe as useDataGrid
};
//# sourceMappingURL=datagrid.es.js.map
