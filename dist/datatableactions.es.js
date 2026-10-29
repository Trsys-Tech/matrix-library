import { jsxs as C, jsx as t, Fragment as M } from "react/jsx-runtime";
import * as o from "react";
import { ElipsisVertical as P, Trashcan as U, Snowflake as _, Print as G, Refresh as H, CircleXmark as L, Magnifier as A } from "@trsys-tech/matrix-icons";
import { cn as f } from "./utils.es.js";
import { Button as I } from "./button.es.js";
import { IconButton as x } from "./iconbutton.es.js";
import { TextField as W } from "./textfield.es.js";
import { Checkbox as X } from "./checkbox.es.js";
import { Popover as E, PopoverTrigger as F, PopoverContent as z } from "./popover.es.js";
import { useDataTable as g } from "./datatablecontext.es.js";
function et({
  value: r,
  defaultValue: n = "",
  onValueChange: i,
  defaultOpen: c = !1,
  defaultOpenAutoFocus: l = !0,
  placeholder: e = "Search…",
  label: a = "Search table",
  className: d,
  ...m
}) {
  const { api: u, search: h, setSearch: p } = g(), [N, B] = o.useState(n), [w, R] = o.useState(c), [y, k] = o.useState(!1), S = o.useRef(null), D = o.useRef(!0), b = o.useRef(null);
  o.useEffect(
    () => () => {
      b.current && clearTimeout(b.current);
    },
    []
  ), o.useEffect(() => {
    w && (!D.current || l) && S.current?.focus(), D.current = !1;
  }, [w, l]);
  const T = (s) => {
    if (i) {
      r === void 0 && B(s), i(s);
      return;
    }
    u ? u.table.setGlobalFilter(s) : p(s);
  }, V = () => {
    k(!0), T(""), b.current && clearTimeout(b.current), b.current = setTimeout(() => {
      R(!1), k(!1), b.current = null;
    }, 200);
  }, v = (s) => /* @__PURE__ */ t("div", { className: f("mtx-max-w-60", d), ...m, children: w || y ? /* @__PURE__ */ t(
    W,
    {
      ref: S,
      size: "sm",
      className: f("mtx-relative mtx-h-7.5", w && !y && "mtx-animate-input-open", y && "mtx-animate-input-close"),
      value: s,
      onChange: (j) => T(j.target.value),
      slotProps: { inputProps: { "aria-label": a, placeholder: e } },
      startAdornment: /* @__PURE__ */ t(
        x,
        {
          type: "button",
          variant: "toolbar",
          "aria-label": "Close search",
          className: "mtx-p-0.5 mtx-h-6 mtx-w-6 mtx-border-none mtx-mx-1",
          onClick: V,
          children: /* @__PURE__ */ t(A, { className: "mtx-w-5 mtx-h-5" })
        }
      ),
      endAdornment: s && /* @__PURE__ */ t(
        x,
        {
          type: "button",
          variant: "toolbar",
          "aria-label": "Clear search",
          className: "mtx-p-0.5 mtx-w-6 mtx-h-6 mtx-border-none mtx-mx-1",
          onClick: () => {
            T(""), S.current?.focus();
          },
          children: /* @__PURE__ */ t(L, { className: "mtx-w-5 mtx-h-5" })
        }
      )
    }
  ) : /* @__PURE__ */ t(x, { type: "button", variant: "toolbar", "aria-label": a, className: "mtx-p-0.5 mtx-w-6 mtx-h-6 mtx-m-1", onClick: () => R(!0), children: /* @__PURE__ */ t(A, { className: "mtx-w-5 mtx-h-5" }) }) });
  return i ? v(r ?? N) : u ? /* @__PURE__ */ t(u.table.Subscribe, { selector: (s) => s.globalFilter, children: (s) => v(String(s ?? "")) }) : v(h);
}
function at({
  freezeText: r = "Freeze",
  unFreezeText: n = "Unfreeze",
  position: i = "top",
  disabled: c,
  onClick: l,
  ...e
}) {
  const { api: a, selectedCount: d, pinnedCount: m } = g();
  return /* @__PURE__ */ t(
    I,
    {
      type: "button",
      variant: "text",
      startIcon: /* @__PURE__ */ t(_, { className: "mtx-h-4.5 mtx-w-4.5" }),
      ...e,
      disabled: c || !a || !d && !m,
      onClick: (u) => {
        a && (m ? a.table.setRowPinning({ top: [], bottom: [] }) : (a.pinRows(a.table.getSelectedRowIds(), i), a.deselectAll())), l?.(u);
      },
      children: m ? n : r
    }
  );
}
function rt({ onClick: r, children: n, disabled: i, onPrintError: c, className: l, ...e }) {
  const { api: a } = g(), [d, m] = o.useState(!1), [u, h] = o.useState(!1);
  return /* @__PURE__ */ C(M, { children: [
    /* @__PURE__ */ t(
      x,
      {
        type: "button",
        variant: "toolbar",
        "aria-label": "Print table",
        ...e,
        className: f("mtx-h-6 mtx-w-6 mtx-p-0.5", l),
        disabled: i || d || !a,
        onClick: async (p) => {
          if (r?.(p), !(p.defaultPrevented || !a)) {
            m(!0), h(!1);
            try {
              await a.print();
            } catch (N) {
              h(!0), c?.(N);
            } finally {
              m(!1);
            }
          }
        },
        children: n ?? /* @__PURE__ */ t(G, { className: "mtx-h-5 mtx-w-5" })
      }
    ),
    u && /* @__PURE__ */ t("span", { role: "alert", className: "mtx-text-danger", children: "Unable to print table" })
  ] });
}
function nt({ onRefresh: r, loading: n, children: i, disabled: c, className: l, ...e }) {
  return /* @__PURE__ */ t(
    x,
    {
      type: "button",
      variant: "toolbar",
      "aria-label": "Refresh table",
      ...e,
      className: f("mtx-h-6 mtx-w-6 mtx-p-0.5", l),
      disabled: c || n,
      onClick: r,
      children: i ?? /* @__PURE__ */ t(H, { className: f("mtx-h-4.5 mtx-w-4.5", n && "mtx-animate-spin") })
    }
  );
}
function it({ onDelete: r, ...n }) {
  return /* @__PURE__ */ t(I, { type: "button", variant: "danger", startIcon: /* @__PURE__ */ t(U, { className: "mtx-h-4.5 mtx-w-4.5" }), ...n, onClick: r });
}
function lt({ children: r, label: n = "More actions", ...i }) {
  return /* @__PURE__ */ C(E, { children: [
    /* @__PURE__ */ t(F, { asChild: !0, children: /* @__PURE__ */ t(x, { type: "button", variant: "toolbar", "aria-label": n, className: "mtx-h-6 mtx-w-6 mtx-p-0.5", children: /* @__PURE__ */ t(P, { className: "mtx-h-4.5 mtx-w-4.5" }) }) }),
    /* @__PURE__ */ t(z, { align: "end", ...i, children: r })
  ] });
}
function st({ children: r, disabled: n, className: i, ...c }) {
  const { api: l } = g();
  return /* @__PURE__ */ C(E, { children: [
    /* @__PURE__ */ t(F, { asChild: !0, children: /* @__PURE__ */ t(
      x,
      {
        type: "button",
        variant: "toolbar",
        "aria-label": "Show or hide columns",
        ...c,
        className: f("mtx-h-6 mtx-w-6 mtx-p-0.5", i),
        disabled: n || !l,
        children: r ?? /* @__PURE__ */ t(P, { className: "mtx-h-4.5 mtx-w-4.5" })
      }
    ) }),
    /* @__PURE__ */ t(z, { align: "end", className: "mtx-w-56 mtx-space-y-2", children: l && /* @__PURE__ */ t(l.table.Subscribe, { selector: (e) => e.columnVisibility, children: () => l.table.getAllLeafColumns().filter((e) => !e.id.startsWith("__")).map((e) => /* @__PURE__ */ C("label", { className: "mtx-flex mtx-items-center mtx-gap-2 mtx-text-xs", children: [
      /* @__PURE__ */ t(
        X,
        {
          checked: e.getIsVisible(),
          disabled: !e.getCanHide(),
          onCheckedChange: (a) => e.toggleVisibility(a === !0)
        }
      ),
      typeof e.columnDef.header == "string" ? e.columnDef.header : e.id
    ] }, e.id)) }) })
  ] });
}
export {
  st as DataTableColumnsAction,
  it as DataTableDeleteAction,
  lt as DataTableExtraActions,
  at as DataTableFreezeAction,
  rt as DataTablePrintAction,
  nt as DataTableRefreshAction,
  et as DataTableSearchAction
};
//# sourceMappingURL=datatableactions.es.js.map
