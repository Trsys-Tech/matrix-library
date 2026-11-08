import { jsxs as x, jsx as i } from "react/jsx-runtime";
import { Checkbox as C } from "./checkbox.es.js";
import { cn as f } from "./utils.es.js";
import { DataTableColumnHeader as S } from "./datatablecolumnheader.es.js";
import { DataTableColumnMenu as v } from "./datatablecolumnmenu.es.js";
function I({
  table: d,
  api: h,
  headerHeight: c,
  totalWidth: b,
  isPrinting: m,
  showExpanders: y,
  expanderWidth: n,
  showCheckboxes: p,
  rowSelection: o,
  selectionRows: s,
  selectedInScope: g,
  visibleColumns: u,
  definitionsById: k,
  columnStyle: w,
  widths: N
}) {
  return /* @__PURE__ */ x(
    "div",
    {
      role: "row",
      className: "mtx-sticky mtx-top-0 mtx-z-30 mtx-flex mtx-rounded-t-[inherit] mtx-border-b mtx-border-gray-200 mtx-bg-primary-50 mtx-font-bold",
      style: { height: c, width: b, minWidth: "100%", position: m ? "relative" : "sticky" },
      children: [
        y && /* @__PURE__ */ i(
          "div",
          {
            role: "columnheader",
            "aria-label": "Row details",
            className: "mtx-sticky mtx-start-0 mtx-z-10 mtx-shrink-0 mtx-bg-primary-50",
            style: { width: n }
          }
        ),
        p && /* @__PURE__ */ i(
          "div",
          {
            role: "columnheader",
            className: "mtx-sticky mtx-start-0 mtx-z-10 mtx-flex mtx-shrink-0 mtx-items-center mtx-justify-center mtx-bg-primary-50",
            style: { width: 44, insetInlineStart: n },
            children: o?.mode === "multiRow" && /* @__PURE__ */ i(
              C,
              {
                "aria-label": "Select all rows",
                className: "mtx-bg-gray-0",
                disabled: !s.length,
                checked: s.length > 0 && g === s.length ? !0 : g > 0 ? "indeterminate" : !1,
                onCheckedChange: (e) => {
                  e === !0 ? h.selectAll(o.selectAll) : d.setRowSelection(
                    (t) => Object.fromEntries(Object.entries(t).filter(([l]) => !s.some((a) => a.id === l)))
                  );
                }
              }
            )
          }
        ),
        u.map((e) => {
          const t = k.get(e.id), l = d.getFlatHeaders().find((r) => r.column.id === e.id), a = e.getIsSorted();
          return /* @__PURE__ */ x(
            S,
            {
              columnId: e.id,
              label: typeof t.headerName == "string" ? t.headerName : e.id,
              region: e.getIsPinned(),
              disabled: m,
              "aria-sort": a === "asc" ? "ascending" : a === "desc" ? "descending" : "none",
              className: f(
                "mtx-relative mtx-flex mtx-min-w-0 mtx-items-center mtx-gap-1 mtx-px-3",
                t.align === "end" && "mtx-flex-row-reverse"
              ),
              style: w(e, !0),
              children: [
                /* @__PURE__ */ x(
                  "button",
                  {
                    type: "button",
                    "data-column-sort": "",
                    disabled: m,
                    "aria-disabled": !e.getCanSort() || void 0,
                    onClick: (r) => {
                      !r.defaultPrevented && e.getCanSort() && e.getToggleSortingHandler()?.(r);
                    },
                    className: f(
                      "mtx-flex mtx-min-w-0 mtx-flex-1 mtx-cursor-inherit mtx-items-center mtx-gap-1 mtx-text-start disabled:mtx-cursor-default",
                      t.align === "end" && "mtx-flex-row-reverse mtx-text-end"
                    ),
                    "aria-label": `Sort ${typeof t.headerName == "string" ? t.headerName : e.id}`,
                    children: [
                      /* @__PURE__ */ i("span", { className: "mtx-truncate", children: t.headerName ?? e.id }),
                      a && /* @__PURE__ */ x("span", { "aria-hidden": "true", children: [
                        a === "asc" ? "↑" : "↓",
                        d.state.sorting.length > 1 ? e.getSortIndex() + 1 : ""
                      ] })
                    ]
                  }
                ),
                !m && /* @__PURE__ */ i(v, { table: d, column: e, definition: t }),
                !m && e.getCanResize() && /* @__PURE__ */ i(
                  "div",
                  {
                    role: "separator",
                    "data-column-drag-ignore": "",
                    "aria-label": `Resize ${e.id}`,
                    "aria-orientation": "vertical",
                    tabIndex: 0,
                    className: "mtx-absolute mtx-inset-y-3 mtx-end-0 mtx-w-2 mtx-cursor-col-resize mtx-touch-none after:mtx-bg-gray-400/70 after:mtx-w-0.5 after:mtx-h-full after:mtx-block after:mtx-absolute after:mtx-start-1/2 after:-mtx-translate-x-1/2",
                    onMouseDown: l.getResizeHandler(),
                    onTouchStart: l.getResizeHandler(),
                    onDoubleClick: () => e.resetSize(),
                    onKeyDown: (r) => {
                      (r.key === "ArrowRight" || r.key === "ArrowLeft") && (r.preventDefault(), d.setColumnSizing((z) => ({
                        ...z,
                        [e.id]: (N.get(e.id) ?? e.getSize()) + (r.key === "ArrowRight" ? 10 : -10)
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
  I as DataTableHeader
};
//# sourceMappingURL=datatableheader.es.js.map
