import { jsxs as n, jsx as i } from "react/jsx-runtime";
import { Checkbox as z } from "./checkbox.es.js";
import { DataTableColumnHeader as C } from "./datatablecolumnheader.es.js";
import { DataTableColumnMenu as S } from "./datatablecolumnmenu.es.js";
function j({
  table: d,
  api: g,
  headerHeight: c,
  totalWidth: f,
  isPrinting: s,
  showExpanders: b,
  expanderWidth: o,
  showCheckboxes: y,
  rowSelection: x,
  selectionRows: m,
  selectedInScope: h,
  visibleColumns: p,
  definitionsById: k,
  columnStyle: u,
  widths: w
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      role: "row",
      className: "mtx-sticky mtx-top-0 mtx-z-30 mtx-flex mtx-rounded-t-[inherit] mtx-border-b mtx-border-gray-200 mtx-bg-primary-50 mtx-font-bold",
      style: { height: c, width: f, minWidth: "100%", position: s ? "relative" : "sticky" },
      children: [
        b && /* @__PURE__ */ i(
          "div",
          {
            role: "columnheader",
            "aria-label": "Row details",
            className: "mtx-sticky mtx-start-0 mtx-z-10 mtx-shrink-0 mtx-bg-primary-50",
            style: { width: o }
          }
        ),
        y && /* @__PURE__ */ i(
          "div",
          {
            role: "columnheader",
            className: "mtx-sticky mtx-start-0 mtx-z-10 mtx-flex mtx-shrink-0 mtx-items-center mtx-justify-center mtx-bg-primary-50",
            style: { width: 44, insetInlineStart: o },
            children: x?.mode === "multiRow" && /* @__PURE__ */ i(
              z,
              {
                "aria-label": "Select all rows",
                disabled: !m.length,
                checked: m.length > 0 && h === m.length ? !0 : h > 0 ? "indeterminate" : !1,
                onCheckedChange: (e) => {
                  e === !0 ? g.selectAll(x.selectAll) : d.setRowSelection(
                    (r) => Object.fromEntries(Object.entries(r).filter(([l]) => !m.some((a) => a.id === l)))
                  );
                }
              }
            )
          }
        ),
        p.map((e) => {
          const r = k.get(e.id), l = d.getFlatHeaders().find((t) => t.column.id === e.id), a = e.getIsSorted();
          return /* @__PURE__ */ n(
            C,
            {
              columnId: e.id,
              label: typeof r.headerName == "string" ? r.headerName : e.id,
              region: e.getIsPinned(),
              disabled: s,
              "aria-sort": a === "asc" ? "ascending" : a === "desc" ? "descending" : "none",
              className: "mtx-relative mtx-flex mtx-min-w-0 mtx-items-center mtx-gap-1 mtx-px-3",
              style: u(e, !0),
              children: [
                /* @__PURE__ */ n(
                  "button",
                  {
                    type: "button",
                    "data-column-sort": "",
                    disabled: s,
                    "aria-disabled": !e.getCanSort() || void 0,
                    onClick: (t) => {
                      !t.defaultPrevented && e.getCanSort() && e.getToggleSortingHandler()?.(t);
                    },
                    className: "mtx-flex mtx-min-w-0 mtx-flex-1 mtx-cursor-inherit mtx-items-center mtx-gap-1 mtx-text-start disabled:mtx-cursor-default",
                    "aria-label": `Sort ${typeof r.headerName == "string" ? r.headerName : e.id}`,
                    children: [
                      /* @__PURE__ */ i("span", { className: "mtx-truncate", children: r.headerName ?? e.id }),
                      a && /* @__PURE__ */ n("span", { "aria-hidden": "true", children: [
                        a === "asc" ? "↑" : "↓",
                        d.state.sorting.length > 1 ? e.getSortIndex() + 1 : ""
                      ] })
                    ]
                  }
                ),
                !s && /* @__PURE__ */ i(S, { table: d, column: e, definition: r }),
                !s && e.getCanResize() && /* @__PURE__ */ i(
                  "div",
                  {
                    role: "separator",
                    "data-column-drag-ignore": "",
                    "aria-label": `Resize ${e.id}`,
                    "aria-orientation": "vertical",
                    tabIndex: 0,
                    className: "mtx-absolute mtx-inset-y-0 mtx-end-0 mtx-w-1 mtx-cursor-col-resize mtx-touch-none hover:mtx-bg-primary-300",
                    onMouseDown: l.getResizeHandler(),
                    onTouchStart: l.getResizeHandler(),
                    onDoubleClick: () => e.resetSize(),
                    onKeyDown: (t) => {
                      (t.key === "ArrowRight" || t.key === "ArrowLeft") && (t.preventDefault(), d.setColumnSizing((N) => ({
                        ...N,
                        [e.id]: (w.get(e.id) ?? e.getSize()) + (t.key === "ArrowRight" ? 10 : -10)
                      })));
                    }
                  }
                )
              ]
            },
            e.id
          );
        })
      ]
    }
  );
}
export {
  j as DataTableHeader
};
//# sourceMappingURL=datatableheader.es.js.map
