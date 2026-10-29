import { jsxs as h, jsx as y } from "react/jsx-runtime";
import * as a from "react";
import { useDragDropMonitor as R, useDraggable as T, useDroppable as E } from "@dnd-kit/react";
import { cn as k } from "./utils.es.js";
function j({
  columnId: t,
  label: l,
  region: g,
  disabled: e,
  className: d,
  children: x,
  onClickCapture: b,
  ...v
}) {
  const c = `data-table-column:${g || "center"}`, n = a.useId(), o = a.useRef(!1), i = a.useRef();
  a.useEffect(() => () => clearTimeout(i.current), []), R({
    onDragStart: (r) => {
      r.operation.source?.data.columnId === t && r.nativeEvent?.type.startsWith("pointer") && (clearTimeout(i.current), o.current = !0);
    },
    onDragEnd: (r) => {
      r.operation.source?.data.columnId === t && o.current && (i.current = setTimeout(() => {
        o.current = !1;
      }, 300));
    }
  });
  const {
    ref: s,
    handleRef: u,
    isDragSource: p
  } = T({
    id: `column:${t}`,
    type: c,
    data: { columnId: t },
    disabled: e
  }), { ref: m, isDropTarget: f } = E({
    id: `column:${t}`,
    accept: c,
    data: { columnId: t },
    disabled: e
  }), D = a.useCallback(
    (r) => {
      s(r), m(r), u(r);
    },
    [s, m, u]
  );
  return /* @__PURE__ */ h(
    "div",
    {
      ...v,
      ref: D,
      role: "columnheader",
      tabIndex: e ? void 0 : 0,
      "aria-label": l,
      "aria-describedby": e ? void 0 : n,
      "data-column-id": t,
      "data-dragging": p || void 0,
      "data-drop-target": f || void 0,
      className: k(
        d,
        !e && "mtx-cursor-grab mtx-touch-pan-y active:mtx-cursor-grabbing focus-visible:mtx-outline-none focus-visible:mtx-ring-1 focus-visible:mtx-ring-inset focus-visible:mtx-ring-primary",
        p && "mtx-opacity-50",
        f && "mtx-ring-2 mtx-ring-inset mtx-ring-primary-300"
      ),
      onClickCapture: (r) => {
        if (o.current) {
          o.current = !1, clearTimeout(i.current), r.preventDefault(), r.stopPropagation();
          return;
        }
        b?.(r);
      },
      children: [
        !e && /* @__PURE__ */ y("span", { id: n, className: "mtx-sr-only", children: "Drag to reorder. With this header focused, press Space or Enter to pick up, Left or Right to move, Space or Enter to drop, or Escape to cancel." }),
        x
      ]
    }
  );
}
export {
  j as DataTableColumnHeader
};
//# sourceMappingURL=datatablecolumnheader.es.js.map
