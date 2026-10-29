import * as I from "react";
import { getColumnId as g, getCellValue as q } from "./datatablemodel.es.js";
import { printDataTable as x } from "./datatableprint.es.js";
function O({
  runtime: a,
  editRef: S,
  configRef: m,
  updateEdit: c,
  setPatches: y,
  contentRef: d,
  viewportRef: i,
  setPrinting: w
}) {
  const u = I.useRef(0), b = I.useRef({ top: 0, left: 0 });
  return I.useMemo(() => {
    const f = (o) => a.current.table.getCoreRowModel().rowsById[String(o)], A = (o = !1) => {
      const e = S.current;
      if (!e) return !0;
      const n = m.current, r = { rowId: e.rowId, original: e.original, data: e.draft, changes: e.changes };
      if (o)
        return c(null), n.onEditCancel?.(r), !0;
      const l = [...Object.values(e.parseErrors), ...n.validateRow?.(e.draft, e.original) ?? []];
      for (const t of a.current.definitionsById.values())
        (typeof t.editable == "function" ? t.editable(e.original) : t.editable) && (!e.columnId || e.columnId === g(t)) && l.push(
          ...t.validate?.(q(e.draft, t, a.current.rowIndices.get(e.original) ?? 0), e.draft) ?? []
        );
      return l.length ? (c({ ...e, errors: l }), !1) : (Object.keys(e.changes).length && (n.readOnlyEdit ? n.onEditRequest?.(r) : (y((t) => ({ ...t, [e.rowId]: { source: e.source, data: e.draft } })), n.onEditCommit?.(r))), c(null), !0);
    }, R = (o, e) => {
      const n = String(o);
      requestAnimationFrame(
        () => requestAnimationFrame(() => {
          const r = Array.from(d.current?.querySelectorAll("[data-row-id][data-column-id]") ?? []).find(
            (t) => t.dataset.rowId === n && t.dataset.columnId === e
          );
          (Array.from(r?.querySelectorAll("input,button,[tabindex='0']") ?? []).find(
            (t) => !t.matches(":disabled, input[type='hidden']") && !t.closest("[hidden],[inert]") && t.getClientRects().length > 0
          ) ?? r)?.focus();
        })
      );
    }, C = (o, e = "center") => {
      const n = String(o), r = a.current, l = r.table.getPrePaginatedRowModel().rows.findIndex((t) => t.id === n);
      l >= 0 && r.pagination && !r.table.options.manualPagination && r.table.setPageIndex(Math.floor(l / r.table.atoms.pagination.get().pageSize)), requestAnimationFrame(() => {
        const t = a.current, s = t.centerRows.findIndex((p) => p.id === n);
        s >= 0 && t.useVirtualRows ? t.virtualizer.scrollToIndex(s, { align: e }) : Array.from(d.current?.querySelectorAll("[role=row][data-row-id]") ?? []).find((p) => p.dataset.rowId === n)?.scrollIntoView({ block: e, inline: "nearest" });
      });
    }, h = (o, e) => {
      const n = String(o);
      if (!A()) return !1;
      const r = f(n);
      if (!r) return !1;
      const l = Array.from(a.current.definitionsById.values()).filter((s) => a.current.table.getColumn(g(s))?.getIsVisible() && (typeof s.editable == "function" ? s.editable(r.original) : s.editable) && (!!s.field || !!s.valueSetter)), t = e ? l.find((s) => g(s) === e) : l[0];
      return t ? (c({
        rowId: n,
        columnId: e,
        source: a.current.sourcesById.get(n),
        original: r.original,
        draft: r.original,
        changes: {},
        parseErrors: {},
        errors: []
      }), C(n), R(n, g(t)), !0) : !1;
    }, M = async () => {
      u.current === 0 && (b.current = { top: i.current?.scrollTop ?? 0, left: i.current?.scrollLeft ?? 0 }), u.current++, w(!0), await new Promise((e) => requestAnimationFrame(() => requestAnimationFrame(() => e())));
      let o = !1;
      return () => {
        o || (o = !0, u.current--, !(u.current > 0) && (w(!1), requestAnimationFrame(() => {
          i.current && (i.current.scrollTop = b.current.top, i.current.scrollLeft = b.current.left);
        })));
      };
    };
    return {
      get table() {
        return a.current.table;
      },
      getSelectedRows: () => a.current.table.getSelectedRowModel().rows.map((o) => o.original),
      setSelectedRowIds: (o) => {
        const e = o.map(f).filter((r) => r?.getCanSelect()), n = a.current.table.options.enableMultiRowSelection === !1 ? e.slice(0, 1) : e;
        a.current.table.setRowSelection(Object.fromEntries(n.map((r) => [r.id, !0])));
      },
      selectAll: (o = "filtered") => {
        const e = a.current.table, n = (o === "all" ? e.getCoreRowModel() : o === "currentPage" ? e.getRowModel() : e.getFilteredRowModel()).rows.filter((l) => l.getCanSelect()), r = Object.fromEntries(
          (e.options.enableMultiRowSelection === !1 ? n.slice(0, 1) : n).map((l) => [l.id, !0])
        );
        e.setRowSelection((l) => e.options.enableMultiRowSelection === !1 ? r : { ...l, ...r });
      },
      deselectAll: () => a.current.table.resetRowSelection(!0),
      pinRows: (o, e) => {
        const n = a.current.table, r = o.map(String);
        n.setRowPinning((l) => ({
          top: [...(l.top ?? []).filter((t) => !r.includes(t)), ...e === "top" ? r.filter((t) => !!f(t)) : []],
          bottom: [
            ...(l.bottom ?? []).filter((t) => !r.includes(t)),
            ...e === "bottom" ? r.filter((t) => !!f(t)) : []
          ]
        }));
      },
      startEditingCell: ({ rowId: o, columnId: e }) => h(o, e),
      startEditingRow: (o) => h(o),
      stopEditing: A,
      focusCell: R,
      scrollToRow: C,
      preparePrint: M,
      print: async () => {
        const o = await M();
        try {
          d.current && await x(d.current);
        } finally {
          o();
        }
      }
    };
  }, [m, d, S, a, y, w, c, i]);
}
export {
  O as useDataTableApi
};
//# sourceMappingURL=usedatatableapi.es.js.map
