import * as s from "react";
import { moveDataTableColumn as I } from "./datatablemodel.es.js";
function D({
  loading: g,
  runtime: o,
  viewportRef: i,
  contentRef: f,
  setColumnDrag: u
}) {
  const d = s.useRef(null);
  s.useLayoutEffect(() => {
    g && d.current?.();
  }, [g]);
  const l = s.useRef(null);
  return {
    onBeforeDragStart: (e) => {
      o.current.loading && e.preventDefault();
    },
    onDragStart: (e, t) => {
      d.current = () => t.actions.stop({ canceled: !0 });
      const n = e.operation.source?.data.columnId;
      if (typeof n != "string" || !e.nativeEvent?.type.startsWith("pointer")) return;
      const c = o.current.table.getColumn(n)?.getIsPinned();
      l.current = {
        sourceId: n,
        targetId: n,
        scrollLeft: i.current?.scrollLeft ?? 0,
        columns: Array.from(f.current?.querySelectorAll('[role="columnheader"][data-column-id]') ?? []).filter((r) => o.current.table.getColumn(r.dataset.columnId)?.getIsPinned() === c).map((r) => {
          const a = r.getBoundingClientRect();
          return { id: r.dataset.columnId, left: a.left, right: a.right };
        })
      }, u({ sourceId: n, targetId: n });
    },
    onDragMove: (e) => {
      const t = l.current;
      if (!t || !e.to) return;
      const n = o.current.table.getColumn(t.sourceId)?.getIsPinned(), c = e.to.x + (n ? 0 : (i.current?.scrollLeft ?? 0) - t.scrollLeft), r = t.columns.find((a) => c >= a.left && c <= a.right);
      !r || r.id === t.targetId || (t.targetId = r.id, u({ sourceId: t.sourceId, targetId: r.id }));
    },
    onDragEnd: (e) => {
      d.current = null;
      const { source: t, target: n } = e.operation, r = l.current?.targetId ?? n?.data.columnId;
      !o.current.loading && !e.canceled && typeof t?.data.columnId == "string" && typeof r == "string" && I(o.current.table, t.data.columnId, r), l.current = null, u(null);
    }
  };
}
export {
  D as useDataTableColumnDrag
};
//# sourceMappingURL=usedatatablecolumndrag.es.js.map
