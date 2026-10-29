import { jsx as m } from "react/jsx-runtime";
import * as t from "react";
import { cn as x } from "./utils.es.js";
import { DataTableContext as b, useDataTable as p } from "./datatablecontext.es.js";
const h = t.forwardRef(({ children: e, className: a, style: r, ...l }, d) => {
  const [s, i] = t.useState(null), [o, c] = t.useState(), [n, u] = t.useState({ selectedCount: 0, pinnedCount: 0 }), f = t.useMemo(() => ({ api: s, setApi: i, search: o, setSearch: c, ...n, setCounts: u }), [s, o, n]);
  return /* @__PURE__ */ m(b.Provider, { value: f, children: /* @__PURE__ */ m(
    "div",
    {
      ref: d,
      "data-data-table": "",
      className: x(
        "mtx-flex mtx-h-full mtx-min-h-0 mtx-flex-col mtx-rounded-lg mtx-border mtx-border-gray-200 mtx-bg-gray-0 mtx-font-sans mtx-text-xs mtx-text-text",
        a
      ),
      ...l,
      style: { fontFamily: "DMSans, sans-serif", ...r },
      children: e
    }
  ) });
});
h.displayName = "DataTable";
const g = t.forwardRef(({ className: e, ...a }, r) => (p(), /* @__PURE__ */ m(
  "div",
  {
    ref: r,
    "data-print-hidden": "",
    className: x(
      "mtx-flex mtx-min-h-12 mtx-shrink-0 mtx-items-center mtx-gap-1 mtx-rounded-t-lg mtx-border-b mtx-border-gray-200 mtx-p-2",
      e
    ),
    ...a
  }
)));
g.displayName = "DataTableActionBar";
export {
  h as DataTable,
  g as DataTableActionBar
};
//# sourceMappingURL=datatable.es.js.map
