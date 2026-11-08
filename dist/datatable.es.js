import { jsx as s } from "react/jsx-runtime";
import * as t from "react";
import { cn as x } from "./utils.es.js";
import { DataTableContext as p, useDataTable as b } from "./datatablecontext.es.js";
const h = t.forwardRef(({ children: e, className: a, style: r, ...l }, i) => {
  const [m, d] = t.useState(null), [n, c] = t.useState(), [o, u] = t.useState({ selectedCount: 0, pinnedCount: 0 }), f = t.useMemo(() => ({ api: m, setApi: d, search: n, setSearch: c, ...o, setCounts: u }), [m, n, o]);
  return /* @__PURE__ */ s(p.Provider, { value: f, children: /* @__PURE__ */ s(
    "div",
    {
      ref: i,
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
const D = t.forwardRef(({ className: e, ...a }, r) => (b(), /* @__PURE__ */ s(
  "div",
  {
    ref: r,
    "data-print-hidden": "",
    className: x("mtx-flex mtx-min-h-12 mtx-shrink-0 mtx-items-center mtx-gap-1 mtx-rounded-t-lg mtx-p-2", e),
    ...a
  }
)));
D.displayName = "DataTableActionBar";
export {
  h as DataTable,
  D as DataTableActionBar
};
//# sourceMappingURL=datatable.es.js.map
