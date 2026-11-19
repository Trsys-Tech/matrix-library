import { jsxs as n, jsx as r } from "react/jsx-runtime";
import { Button as i } from "./button.es.js";
import { cn as p } from "./utils.es.js";
import { dataTableInputClass as s } from "./datatablestyles.es.js";
function u({ table: e, paginationPageSizeSelector: o, disabled: a }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-print-hidden": "",
      className: p(
        "mtx-flex mtx-shrink-0 mtx-items-center mtx-justify-end mtx-gap-3 mtx-border-t mtx-border-gray-200 mtx-p-2",
        a && "mtx-opacity-60"
      ),
      children: [
        /* @__PURE__ */ n("label", { className: "mtx-flex mtx-items-center mtx-gap-2", children: [
          "Rows per page",
          /* @__PURE__ */ r(
            "select",
            {
              className: s,
              "aria-label": "Rows per page",
              disabled: a,
              value: e.state.pagination.pageSize,
              onChange: (t) => e.setPageSize(Number(t.target.value)),
              children: Array.from(/* @__PURE__ */ new Set([...o, e.state.pagination.pageSize])).sort((t, m) => t - m).map((t) => /* @__PURE__ */ r("option", { value: t, children: t }, t))
            }
          )
        ] }),
        /* @__PURE__ */ n("span", { children: [
          "Page ",
          e.state.pagination.pageIndex + 1,
          " of ",
          Math.max(1, e.getPageCount())
        ] }),
        /* @__PURE__ */ r(
          i,
          {
            type: "button",
            variant: "text",
            size: "sm",
            "aria-label": "Previous page",
            disabled: a || !e.getCanPreviousPage(),
            onClick: () => e.previousPage(),
            children: "Previous"
          }
        ),
        /* @__PURE__ */ r(
          i,
          {
            type: "button",
            variant: "text",
            size: "sm",
            "aria-label": "Next page",
            disabled: a || !e.getCanNextPage(),
            onClick: () => e.nextPage(),
            children: "Next"
          }
        )
      ]
    }
  );
}
export {
  u as DataTablePagination
};
//# sourceMappingURL=datatablepagination.es.js.map
