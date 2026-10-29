import { jsxs as r, jsx as a, Fragment as g } from "react/jsx-runtime";
import * as d from "react";
import { Filter as q } from "@trsys-tech/matrix-icons";
import { cn as N } from "./utils.es.js";
import { Button as i } from "./button.es.js";
import { Popover as T, PopoverTrigger as F, PopoverContent as w } from "./popover.es.js";
import { filterType as b } from "./datatablemodel.es.js";
import { dataTableInputClass as c } from "./datatablestyles.es.js";
function V({
  table: f,
  column: l,
  definition: o
}) {
  const [h, s] = d.useState(!1), [t, p] = d.useState({ operator: b(o) === "text" ? "contains" : "equals", value: "" }), n = b(o), v = f.getCoreRowModel().rows, x = d.useMemo(
    () => h && n === "select" ? o.filterOptions?.map((e) => typeof e == "string" ? { value: e, label: e } : e) ?? Array.from(
      new Set(
        v.map((e) => e.getValue(l.id)).filter((e) => e != null && e !== "").map(String)
      )
    ).sort().map((e) => ({ value: e, label: e })) : [],
    [h, n, v, l.id, o.filterOptions]
  ), C = n === "text" ? ["contains", "notContains", "equals", "notEqual", "startsWith", "endsWith", "blank", "notBlank"] : n === "select" ? ["equals", "notEqual", "blank", "notBlank"] : ["equals", "notEqual", "greaterThan", "greaterThanOrEqual", "lessThan", "lessThanOrEqual", "inRange", "blank", "notBlank"], k = {
    contains: "Contains",
    notContains: "Does not contain",
    equals: "Equals",
    notEqual: "Does not equal",
    startsWith: "Starts with",
    endsWith: "Ends with",
    greaterThan: "Greater than",
    greaterThanOrEqual: "Greater than or equal",
    lessThan: "Less than",
    lessThanOrEqual: "Less than or equal",
    inRange: "Between",
    blank: "Blank",
    notBlank: "Not blank"
  }, u = l.getCanPin(), m = l.getCanHide();
  return !l.getCanFilter() && !u && !m ? null : /* @__PURE__ */ r(
    T,
    {
      open: h,
      onOpenChange: (e) => {
        e && p(l.getFilterValue() ?? { operator: n === "text" ? "contains" : "equals", value: "" }), s(e);
      },
      children: [
        /* @__PURE__ */ a(F, { asChild: !0, children: /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            "aria-label": `Column options ${l.id}`,
            className: N("mtx-shrink-0 mtx-rounded-sm mtx-p-0.5 hover:mtx-bg-primary-100/80", l.getIsFiltered() && "mtx-text-primary"),
            children: /* @__PURE__ */ a(q, { className: "mtx-h-4.5 mtx-w-4.5" })
          }
        ) }),
        /* @__PURE__ */ r(w, { align: "end", className: "mtx-w-56 mtx-space-y-2 mtx-text-xs mtx-font-normal", children: [
          l.getCanFilter() && /* @__PURE__ */ r(g, { children: [
            /* @__PURE__ */ r("label", { className: "mtx-block", children: [
              "Filter ",
              typeof o.headerName == "string" ? o.headerName : l.id,
              /* @__PURE__ */ a(
                "select",
                {
                  "aria-label": "Filter operator",
                  className: c,
                  value: t.operator,
                  onChange: (e) => p({ ...t, operator: e.target.value }),
                  children: C.map((e) => /* @__PURE__ */ a("option", { value: e, children: k[e] }, e))
                }
              )
            ] }),
            t.operator !== "blank" && t.operator !== "notBlank" && (n === "select" ? /* @__PURE__ */ r(
              "select",
              {
                "aria-label": "Filter value",
                className: c,
                value: t.value ?? "",
                onChange: (e) => p({ ...t, value: e.target.value }),
                children: [
                  /* @__PURE__ */ a("option", { value: "", children: "All" }),
                  t.value && !x.some((e) => e.value === t.value) && /* @__PURE__ */ a("option", { value: t.value, children: t.value }),
                  x.map(({ value: e, label: y }) => /* @__PURE__ */ a("option", { value: e, children: y }, e))
                ]
              }
            ) : /* @__PURE__ */ a(
              "input",
              {
                "aria-label": "Filter value",
                className: c,
                type: n === "text" ? "text" : n,
                value: t.value ?? "",
                onChange: (e) => p({ ...t, value: e.target.value })
              }
            )),
            n !== "select" && t.operator === "inRange" && /* @__PURE__ */ a(
              "input",
              {
                "aria-label": "Filter upper value",
                className: c,
                type: n === "text" ? "text" : n,
                value: t.valueTo ?? "",
                onChange: (e) => p({ ...t, valueTo: e.target.value })
              }
            ),
            /* @__PURE__ */ r("div", { className: "mtx-flex mtx-gap-2", children: [
              /* @__PURE__ */ a(
                i,
                {
                  type: "button",
                  size: "sm",
                  onClick: () => {
                    l.setFilterValue(
                      n === "select" && !t.value && t.operator !== "blank" && t.operator !== "notBlank" ? void 0 : t
                    ), s(!1);
                  },
                  children: "Apply"
                }
              ),
              /* @__PURE__ */ a(
                i,
                {
                  type: "button",
                  size: "sm",
                  variant: "text",
                  onClick: () => {
                    l.setFilterValue(void 0), s(!1);
                  },
                  children: "Reset"
                }
              )
            ] }),
            (u || m) && /* @__PURE__ */ a("hr", { className: "mtx-border-gray-200" })
          ] }),
          (u || m) && /* @__PURE__ */ r("div", { className: "mtx-flex mtx-flex-wrap mtx-gap-1", children: [
            u && /* @__PURE__ */ r(g, { children: [
              /* @__PURE__ */ a(
                i,
                {
                  type: "button",
                  size: "sm",
                  variant: "text",
                  onClick: () => {
                    l.pin("start"), s(!1);
                  },
                  children: "Pin start"
                }
              ),
              /* @__PURE__ */ a(
                i,
                {
                  type: "button",
                  size: "sm",
                  variant: "text",
                  onClick: () => {
                    l.pin("end"), s(!1);
                  },
                  children: "Pin end"
                }
              ),
              /* @__PURE__ */ a(
                i,
                {
                  type: "button",
                  size: "sm",
                  variant: "text",
                  onClick: () => {
                    l.pin(!1), s(!1);
                  },
                  children: "Unpin"
                }
              )
            ] }),
            m && /* @__PURE__ */ a(
              i,
              {
                type: "button",
                size: "sm",
                variant: "text",
                onClick: () => {
                  l.toggleVisibility(!1), s(!1);
                },
                children: "Hide column"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  V as DataTableColumnMenu
};
//# sourceMappingURL=datatablecolumnmenu.es.js.map
