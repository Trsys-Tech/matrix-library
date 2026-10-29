import * as g from "react";
import { moveDataTableColumn as i } from "./datatablemodel.es.js";
function m({
  runtime: a,
  viewportRef: d,
  contentRef: s,
  setColumnDrag: l
}) {
  const c = g.useRef(null);
  return {
    onDragStart: (e) => {
      const t = e.operation.source?.data.columnId;
      if (typeof t != "string" || !e.nativeEvent?.type.startsWith("pointer")) return;
      const o = a.current.table.getColumn(t)?.getIsPinned();
      c.current = {
        sourceId: t,
        targetId: t,
        scrollLeft: d.current?.scrollLeft ?? 0,
        columns: Array.from(s.current?.querySelectorAll('[role="columnheader"][data-column-id]') ?? []).filter((n) => a.current.table.getColumn(n.dataset.columnId)?.getIsPinned() === o).map((n) => {
          const r = n.getBoundingClientRect();
          return { id: n.dataset.columnId, left: r.left, right: r.right };
        })
      }, l({ sourceId: t, targetId: t });
    },
    onDragMove: (e) => {
      const t = c.current;
      if (!t || !e.to) return;
      const o = a.current.table.getColumn(t.sourceId)?.getIsPinned(), n = e.to.x + (o ? 0 : (d.current?.scrollLeft ?? 0) - t.scrollLeft), r = t.columns.find((u) => n >= u.left && n <= u.right);
      !r || r.id === t.targetId || (t.targetId = r.id, l({ sourceId: t.sourceId, targetId: r.id }));
    },
    onDragEnd: (e) => {
      const { source: t, target: o } = e.operation, r = c.current?.targetId ?? o?.data.columnId;
      !e.canceled && typeof t?.data.columnId == "string" && typeof r == "string" && i(a.current.table, t.data.columnId, r), c.current = null, l(null);
    }
  };
}
export {
  m as useDataTableColumnDrag
};
//# sourceMappingURL=usedatatablecolumndrag.es.js.map
