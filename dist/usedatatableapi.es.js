import * as m from "react";
import { getColumnId as b, getCellValue as F } from "./datatablemodel.es.js";
import { printDataTable as P } from "./datatableprint.es.js";
function B({
  runtime: a,
  editRef: y,
  configRef: R,
  updateEdit: c,
  setPatches: A,
  contentRef: d,
  viewportRef: i,
  setPrinting: p
}) {
  const g = m.useRef(0), I = m.useRef({ top: 0, left: 0 });
  return m.useMemo(() => {
    const w = (t) => a.current.table.getCoreRowModel().rowsById[String(t)], C = (t = !1) => {
      const e = y.current;
      if (!e) return !0;
      const n = R.current, r = { rowId: e.rowId, original: e.original, data: e.draft, changes: e.changes };
      if (t)
        return c(null), n.onEditCancel?.(r), !0;
      const l = [...Object.values(e.parseErrors), ...n.validateRow?.(e.draft, e.original) ?? []];
      for (const o of a.current.definitionsById.values())
        (typeof o.editable == "function" ? o.editable(e.original) : o.editable) && (!e.columnId || e.columnId === b(o)) && l.push(
          ...o.validate?.(F(e.draft, o, a.current.rowIndices.get(e.original) ?? 0), e.draft) ?? []
        );
      return l.length ? (c({ ...e, errors: l }), !1) : (Object.keys(e.changes).length && (n.readOnlyEdit ? n.onEditRequest?.(r) : (A((o) => ({ ...o, [e.rowId]: { source: e.source, data: e.draft } })), n.onEditCommit?.(r))), c(null), !0);
    }, h = (t, e) => {
      const n = String(t);
      requestAnimationFrame(
        () => requestAnimationFrame(() => {
          const r = Array.from(d.current?.querySelectorAll("[data-row-id][data-column-id]") ?? []).find(
            (o) => o.dataset.rowId === n && o.dataset.columnId === e
          );
          (Array.from(r?.querySelectorAll("input,button,[tabindex='0']") ?? []).find(
            (o) => !o.matches(":disabled, input[type='hidden']") && !o.closest("[hidden],[inert]") && o.getClientRects().length > 0
          ) ?? r)?.focus();
        })
      );
    }, M = (t, e = "center") => {
      const n = String(t), r = a.current, l = r.table.getPrePaginatedRowModel().rows.findIndex((f) => f.id === n), { pageIndex: o, pageSize: u } = r.table.atoms.pagination.get();
      let s = o;
      return l >= 0 && r.pagination && !r.table.options.manualPagination && (s = Math.floor(l / u), r.table.setPageIndex(s)), requestAnimationFrame(() => {
        const f = a.current, E = f.centerRows.findIndex((S) => S.id === n);
        E >= 0 && f.useVirtualRows ? f.virtualizer.scrollToIndex(E, { align: e }) : Array.from(d.current?.querySelectorAll("[role=row][data-row-id]") ?? []).find((S) => S.dataset.rowId === n)?.scrollIntoView({ block: e, inline: "nearest" });
      }), { pageIndex: s, pageSize: u };
    }, q = (t, e) => {
      const n = String(t);
      if (a.current.loading || !C()) return !1;
      const r = w(n);
      if (!r) return !1;
      const l = Array.from(a.current.definitionsById.values()).filter((s) => a.current.table.getColumn(b(s))?.getIsVisible() && (typeof s.editable == "function" ? s.editable(r.original) : s.editable) && (!!s.field || !!s.valueSetter)), o = e ? l.find((s) => b(s) === e) : l[0];
      if (!o) return !1;
      const u = M(n);
      return c({
        rowId: n,
        columnId: e,
        ...u,
        source: a.current.sourcesById.get(n),
        original: r.original,
        draft: r.original,
        changes: {},
        parseErrors: {},
        errors: []
      }), h(n, b(o)), !0;
    }, x = async () => {
      g.current === 0 && (I.current = { top: i.current?.scrollTop ?? 0, left: i.current?.scrollLeft ?? 0 }), g.current++, p(!0), await new Promise((e) => requestAnimationFrame(() => requestAnimationFrame(() => e())));
      let t = !1;
      return () => {
        t || (t = !0, g.current--, !(g.current > 0) && (p(!1), requestAnimationFrame(() => {
          i.current && (i.current.scrollTop = I.current.top, i.current.scrollLeft = I.current.left);
        })));
      };
    };
    return {
      get table() {
        return a.current.table;
      },
      getSelectedRows: () => a.current.table.getSelectedRowModel().rows.map((t) => t.original),
      setSelectedRowIds: (t) => {
        const e = t.map(w).filter((r) => r?.getCanSelect()), n = a.current.table.options.enableMultiRowSelection === !1 ? e.slice(0, 1) : e;
        a.current.table.setRowSelection(Object.fromEntries(n.map((r) => [r.id, !0])));
      },
      selectAll: (t = "filtered") => {
        const e = a.current.table, n = (t === "all" ? e.getCoreRowModel() : t === "currentPage" ? e.getRowModel() : e.getFilteredRowModel()).rows.filter((l) => l.getCanSelect()), r = Object.fromEntries(
          (e.options.enableMultiRowSelection === !1 ? n.slice(0, 1) : n).map((l) => [l.id, !0])
        );
        e.setRowSelection((l) => e.options.enableMultiRowSelection === !1 ? r : { ...l, ...r });
      },
      deselectAll: () => a.current.table.resetRowSelection(!0),
      pinRows: (t, e) => {
        const n = a.current.table, r = t.map(String);
        n.setRowPinning((l) => ({
          top: [...(l.top ?? []).filter((o) => !r.includes(o)), ...e === "top" ? r.filter((o) => !!w(o)) : []],
          bottom: [
            ...(l.bottom ?? []).filter((o) => !r.includes(o)),
            ...e === "bottom" ? r.filter((o) => !!w(o)) : []
          ]
        }));
      },
      startEditingCell: ({ rowId: t, columnId: e }) => q(t, e),
      startEditingRow: (t) => q(t),
      stopEditing: C,
      focusCell: h,
      scrollToRow: (t, e) => {
        M(t, e);
      },
      preparePrint: x,
      print: async () => {
        const t = await x();
        try {
          d.current && await P(d.current);
        } finally {
          t();
        }
      }
    };
  }, [R, d, y, a, A, p, c, i]);
}
export {
  B as useDataTableApi
};
//# sourceMappingURL=usedatatableapi.es.js.map
