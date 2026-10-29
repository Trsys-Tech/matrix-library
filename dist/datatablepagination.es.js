import { jsxs as i, jsx as t } from "react/jsx-runtime";
import { Button as n } from "./button.es.js";
import { dataTableInputClass as s } from "./datatablestyles.es.js";
function x({ table: e, paginationPageSizeSelector: r }) {
  return /* @__PURE__ */ i("div", { "data-print-hidden": "", className: "mtx-flex mtx-shrink-0 mtx-items-center mtx-justify-end mtx-gap-3 mtx-border-t mtx-border-gray-200 mtx-p-2", children: [
    /* @__PURE__ */ i("label", { className: "mtx-flex mtx-items-center mtx-gap-2", children: [
      "Rows per page",
      /* @__PURE__ */ t(
        "select",
        {
          className: s,
          "aria-label": "Rows per page",
          value: e.state.pagination.pageSize,
          onChange: (a) => e.setPageSize(Number(a.target.value)),
          children: Array.from(/* @__PURE__ */ new Set([...r, e.state.pagination.pageSize])).sort((a, o) => a - o).map((a) => /* @__PURE__ */ t("option", { value: a, children: a }, a))
        }
      )
    ] }),
    /* @__PURE__ */ i("span", { children: [
      "Page ",
      e.state.pagination.pageIndex + 1,
      " of ",
      Math.max(1, e.getPageCount())
    ] }),
    /* @__PURE__ */ t(
      n,
      {
        type: "button",
        variant: "text",
        size: "sm",
        "aria-label": "Previous page",
        disabled: !e.getCanPreviousPage(),
        onClick: () => e.previousPage(),
        children: "Previous"
      }
    ),
    /* @__PURE__ */ t(n, { type: "button", variant: "text", size: "sm", "aria-label": "Next page", disabled: !e.getCanNextPage(), onClick: () => e.nextPage(), children: "Next" })
  ] });
}
export {
  x as DataTablePagination
};
//# sourceMappingURL=datatablepagination.es.js.map
