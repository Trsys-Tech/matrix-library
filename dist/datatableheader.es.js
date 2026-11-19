import { jsxs as n, jsx as s } from "react/jsx-runtime";
import { Checkbox as D } from "./checkbox.es.js";
import { cn as o } from "./utils.es.js";
import { DataTableColumnHeader as R } from "./datatablecolumnheader.es.js";
import { DataTableColumnMenu as j } from "./datatablecolumnmenu.es.js";
import { useDataTableColumnResize as A } from "./usedatatablecolumnresize.es.js";
function F({
  table: m,
  api: b,
  headerHeight: y,
  totalWidth: p,
  isPrinting: d,
  loading: r,
  showExpanders: u,
  expanderWidth: h,
  showCheckboxes: k,
  rowSelection: c,
  selectionRows: x,
  selectedInScope: g,
  visibleColumns: w,
  definitionsById: N,
  columnStyle: C,
  widths: z
}) {
  const l = d || r, S = A(l);
  return /* @__PURE__ */ n(
    "div",
    {
      role: "row",
      className: o(
        "mtx-sticky mtx-top-0 mtx-z-30 mtx-flex mtx-rounded-t-[inherit] mtx-border-b mtx-border-gray-200 mtx-bg-primary-50 mtx-font-bold",
        r && "mtx-opacity-80"
      ),
      style: { height: y, width: p, minWidth: "100%", position: d ? "relative" : "sticky" },
      children: [
        u && /* @__PURE__ */ s(
          "div",
          {
            role: "columnheader",
            "aria-label": "Row details",
            className: "mtx-sticky mtx-start-0 mtx-z-10 mtx-shrink-0 mtx-bg-primary-50",
            style: { width: h }
          }
        ),
        k && /* @__PURE__ */ s(
          "div",
          {
            role: "columnheader",
            className: "mtx-sticky mtx-start-0 mtx-z-10 mtx-flex mtx-shrink-0 mtx-items-center mtx-justify-center mtx-bg-primary-50",
            style: { width: 44, insetInlineStart: h },
            children: c?.mode === "multiRow" && /* @__PURE__ */ s(
              D,
              {
                "aria-label": "Select all rows",
                className: "mtx-bg-gray-0",
                disabled: r || !x.length,
                checked: x.length > 0 && g === x.length ? !0 : g > 0 ? "indeterminate" : !1,
                onCheckedChange: (e) => {
                  e === !0 ? b.selectAll(c.selectAll) : m.setRowSelection(
                    (a) => Object.fromEntries(Object.entries(a).filter(([f]) => !x.some((i) => i.id === f)))
                  );
                }
              }
            )
          }
        ),
        w.map((e) => {
          const a = N.get(e.id), f = m.getFlatHeaders().find((t) => t.column.id === e.id), i = e.getIsSorted();
          return /* @__PURE__ */ n(
            R,
            {
              columnId: e.id,
              label: typeof a.headerName == "string" ? a.headerName : e.id,
              region: e.getIsPinned(),
              disabled: l,
              "aria-sort": i === "asc" ? "ascending" : i === "desc" ? "descending" : "none",
              className: o(
                "mtx-relative mtx-flex mtx-min-w-0 mtx-items-center mtx-gap-1 mtx-px-3",
                a.align === "end" && "mtx-flex-row-reverse"
              ),
              style: C(e, !0),
              children: [
                /* @__PURE__ */ n(
                  "button",
                  {
                    type: "button",
                    "data-column-sort": "",
                    disabled: l,
                    "aria-disabled": l || !e.getCanSort() || void 0,
                    onClick: (t) => {
                      !t.defaultPrevented && e.getCanSort() && e.getToggleSortingHandler()?.(t);
                    },
                    className: o(
                      "mtx-flex mtx-min-w-0 mtx-flex-1 mtx-cursor-inherit mtx-items-center mtx-gap-1 mtx-text-start disabled:mtx-cursor-default",
                      a.align === "end" && "mtx-flex-row-reverse mtx-text-end"
                    ),
                    "aria-label": `Sort ${typeof a.headerName == "string" ? a.headerName : e.id}`,
                    children: [
                      /* @__PURE__ */ s("span", { className: "mtx-truncate", children: a.headerName ?? e.id }),
                      i && /* @__PURE__ */ n("span", { "aria-hidden": "true", children: [
                        i === "asc" ? "↑" : "↓",
                        m.state.sorting.length > 1 ? e.getSortIndex() + 1 : ""
                      ] })
                    ]
                  }
                ),
                !d && /* @__PURE__ */ s(j, { table: m, column: e, definition: a, disabled: r }, String(r)),
                !d && e.getCanResize() && /* @__PURE__ */ s(
                  "div",
                  {
                    role: "separator",
                    "data-column-drag-ignore": "",
                    "aria-label": `Resize ${e.id}`,
                    "aria-orientation": "vertical",
                    "aria-disabled": r || void 0,
                    tabIndex: r ? -1 : 0,
                    className: o(
                      "mtx-absolute mtx-inset-y-3 mtx-end-0 mtx-w-2 after:mtx-bg-gray-400/70 after:mtx-w-0.5 after:mtx-h-full after:mtx-block after:mtx-absolute after:mtx-start-1/2 after:-mtx-translate-x-1/2",
                      !r && "mtx-cursor-col-resize mtx-touch-none"
                    ),
                    onPointerDown: (t) => S(f, t),
                    onDoubleClick: r ? void 0 : () => e.resetSize(),
                    onKeyDown: (t) => {
                      !r && (t.key === "ArrowRight" || t.key === "ArrowLeft") && (t.preventDefault(), m.setColumnSizing((v) => ({
                        ...v,
                        [e.id]: (z.get(e.id) ?? e.getSize()) + (t.key === "ArrowRight" ? 10 : -10)
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
  F as DataTableHeader
};
//# sourceMappingURL=datatableheader.es.js.map
