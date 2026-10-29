import { jsxs as z, jsx as l } from "react/jsx-runtime";
import * as ie from "react";
import { ChevronDown as re, ChevronRight as le } from "@trsys-tech/matrix-icons";
import { cn as O } from "./utils.es.js";
import { IconButton as ne } from "./iconbutton.es.js";
import { Checkbox as se } from "./checkbox.es.js";
import { getCellValue as B, parseDateInputValue as oe, toDateInputValue as de, setCellValue as ce } from "./datatablemodel.es.js";
import { dataTableInputClass as me } from "./datatablestyles.es.js";
function be({ data: o, rowId: i, index: g, row: a, pinned: y, ...P }) {
  const {
    edit: c,
    editRef: L,
    updateEdit: D,
    api: d,
    table: q,
    detailId: A,
    displayedIndices: S,
    rowSelection: N,
    rowHeight: G,
    totalWidth: R,
    getRowClass: J,
    rowClassRules: M,
    onRowClick: Q,
    showExpanders: b,
    expanderWidth: K,
    showCheckboxes: C,
    visibleColumns: T,
    definitionsById: U,
    activeCell: j,
    setFocusedCell: X,
    columnStyle: Y,
    handleCellKeyDown: Z,
    suppressClickEdit: _,
    editType: ee,
    renderSubComponent: te,
    isDetailExpanded: ae
  } = P, E = c?.rowId === i, m = a?.getIsSelected() ?? !1, x = !!a && ae(a), w = `${A}-${i}`;
  return /* @__PURE__ */ z(ie.Fragment, { children: [
    /* @__PURE__ */ z(
      "div",
      {
        role: "row",
        "aria-rowindex": (S.get(i) ?? g) + 2,
        "aria-selected": N && a ? m : void 0,
        "data-row-id": i,
        "data-pinned": y,
        "data-selected": m || void 0,
        className: O(
          "mtx-flex mtx-border-b mtx-border-gray-200 mtx-bg-gray-0 hover:mtx-bg-primary-25",
          m && "mtx-bg-primary-50",
          y && "mtx-bg-gray-50",
          J?.(o),
          ...Object.entries(M ?? {}).filter(([, t]) => t(o)).map(([t]) => t)
        ),
        style: { height: G, width: R, minWidth: "100%" },
        onClick: (t) => {
          const u = t.target, e = u.closest("[data-row-selection-cell]");
          u.closest("button,input,a,select,textarea,[data-row-action],[role=checkbox],[role=combobox]") || (a && N?.enableClickSelection && a.getCanSelect() && (a.getToggleSelectedHandler()({
            target: { checked: e || t.ctrlKey || t.metaKey ? !m : !0 },
            shiftKey: t.shiftKey,
            nativeEvent: t.nativeEvent
          }), !e && !t.ctrlKey && !t.metaKey && !t.shiftKey && q.setRowSelection({ [a.id]: !0 })), Q?.({ data: o, rowId: i, event: t, api: d }));
        },
        children: [
          b && /* @__PURE__ */ l(
            "div",
            {
              role: "gridcell",
              "data-row-expander-cell": "",
              className: "mtx-sticky mtx-start-0 mtx-z-10 mtx-flex mtx-shrink-0 mtx-items-center mtx-justify-center mtx-bg-inherit",
              style: { width: K },
              children: a?.getCanExpand() && /* @__PURE__ */ l(
                ne,
                {
                  type: "button",
                  size: "sm",
                  "aria-label": `${x ? "Collapse" : "Expand"} row ${i}`,
                  "aria-expanded": x,
                  "aria-controls": x ? w : void 0,
                  onClick: a.getToggleExpandedHandler(),
                  children: x ? /* @__PURE__ */ l(re, { "aria-hidden": "true" }) : /* @__PURE__ */ l(le, { "aria-hidden": "true", className: "rtl:mtx-rotate-180" })
                }
              )
            }
          ),
          C && /* @__PURE__ */ l(
            "div",
            {
              role: "gridcell",
              "data-row-selection-cell": "",
              className: "mtx-sticky mtx-start-0 mtx-z-10 mtx-flex mtx-shrink-0 mtx-items-center mtx-justify-center mtx-bg-inherit",
              style: { width: 44, insetInlineStart: K },
              children: a && /* @__PURE__ */ l(
                se,
                {
                  "aria-label": `Select row ${i}`,
                  checked: m,
                  disabled: !a.getCanSelect(),
                  onClick: (t) => a.getToggleSelectedHandler()({ target: { checked: !m }, shiftKey: t.shiftKey, nativeEvent: t.nativeEvent })
                }
              )
            }
          ),
          T.map((t, u) => {
            const e = U.get(t.id), n = B(E ? c.draft : o, e, g), v = !!E && (!c.columnId || c.columnId === t.id) && (typeof e.editable == "function" ? e.editable(o) : e.editable) && (!!e.field || !!e.valueSetter), f = { data: o, value: n, rowId: i, rowIndex: g, columnId: t.id, api: d, isEditing: !!E, pinned: y }, I = e.cellRenderer, V = e.cellEditor && typeof e.cellEditor != "string" ? e.cellEditor : void 0, $ = typeof e.cellEditor == "string" ? e.cellEditor : e.cellDataType === "number" ? "number" : e.cellDataType === "date" ? "date" : "text", F = e.cellEditor === "number" || e.cellDataType === "number", H = $ === "date" || !F && n instanceof Date, W = (r) => {
              const s = L.current;
              if (s)
                try {
                  const p = e.valueParser ? e.valueParser({ data: s.draft, oldValue: B(s.original, e, g), newValue: r }) : r, h = ce(s.draft, e, p), k = { ...s.parseErrors };
                  delete k[t.id], D({
                    ...s,
                    draft: h,
                    changes: { ...s.changes, [t.id]: p },
                    parseErrors: k,
                    errors: Object.values(k)
                  });
                } catch (p) {
                  const h = { ...s.parseErrors, [t.id]: p instanceof Error ? p.message : "Invalid value" };
                  D({ ...s, parseErrors: h, errors: Object.values(h) });
                }
            };
            return /* @__PURE__ */ l(
              "div",
              {
                role: "gridcell",
                tabIndex: j.rowId === i && j.columnId === t.id ? 0 : -1,
                "aria-colindex": u + 1 + (C ? 1 : 0) + (b ? 1 : 0),
                "data-column-id": t.id,
                "data-row-id": i,
                "data-editing": v || void 0,
                "data-row-action": e.suppressRowClick || t.id === "actions" || t.id === "action" ? "" : void 0,
                "aria-readonly": !e.editable || !a,
                "aria-invalid": v && c.errors.length > 0 || void 0,
                className: O(
                  "mtx-flex mtx-min-w-0 mtx-items-center mtx-overflow-hidden mtx-px-3 focus:mtx-outline-none focus:mtx-ring-1 focus:mtx-ring-inset focus:mtx-ring-primary",
                  e.align === "end" && "mtx-justify-end",
                  e.align === "center" && "mtx-justify-center",
                  typeof e.cellClass == "function" ? e.cellClass(f) : e.cellClass
                ),
                style: Y(t),
                onFocus: () => X((r) => r?.rowId === i && r.columnId === t.id ? r : { rowId: i, columnId: t.id }),
                onKeyDown: (r) => {
                  e.onKeyDown?.(r, f), a && Z(r, a, t);
                },
                onDoubleClick: (r) => {
                  a && !_ && !r.target.closest("button,a,input,select,[data-row-action]") && (ee === "fullRow" ? d.startEditingRow(i) : d.startEditingCell({ rowId: i, columnId: t.id }));
                },
                children: v ? V ? /* @__PURE__ */ l(
                  V,
                  {
                    ...f,
                    errors: c.errors,
                    onValueChange: W,
                    commit: () => d.stopEditing(),
                    cancel: () => d.stopEditing(!0)
                  }
                ) : /* @__PURE__ */ l(
                  "input",
                  {
                    "aria-label": `Edit ${typeof e.headerName == "string" ? e.headerName : t.id}`,
                    className: me,
                    type: $,
                    value: H ? de(n) : n == null ? "" : String(n),
                    onChange: (r) => W(
                      F ? r.target.value === "" ? null : Number(r.target.value) : H ? oe(r.target.value, n, e.cellDataType) : r.target.value
                    )
                  }
                ) : I ? /* @__PURE__ */ l(I, { ...f }) : e.valueFormatter ? e.valueFormatter({ data: o, value: n }) : /* @__PURE__ */ l("span", { className: "mtx-truncate", children: n instanceof Date ? n.toLocaleDateString() : String(n ?? "") })
              },
              t.id
            );
          })
        ]
      }
    ),
    x && a && /* @__PURE__ */ l(
      "div",
      {
        role: "row",
        "aria-rowindex": (S.get(i) ?? g) + 3,
        "data-expanded-row-id": i,
        className: "mtx-border-b mtx-border-gray-200 mtx-bg-gray-50",
        style: { width: R, minWidth: "100%" },
        children: /* @__PURE__ */ l(
          "div",
          {
            role: "gridcell",
            id: w,
            "aria-colspan": T.length + (C ? 1 : 0) + (b ? 1 : 0),
            className: "mtx-p-4",
            children: te?.({ row: a, api: d })
          }
        )
      }
    )
  ] }, i);
}
export {
  be as DataTableRowView
};
//# sourceMappingURL=datatablerowview.es.js.map
