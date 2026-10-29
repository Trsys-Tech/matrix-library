import { PointerSensor as u, KeyboardSensor as m } from "@dnd-kit/react";
import { PointerActivationConstraints as d } from "@dnd-kit/dom";
class f extends m {
  choosingTarget = !1;
  constructor(n) {
    super(n, { preventActivation: (r, a) => r.target !== a.element });
  }
  handleMove(n, r) {
    if (r.preventDefault(), n !== "left" && n !== "right") return;
    const { source: a, target: h } = this.manager.dragOperation, l = h ?? a;
    if (!a || !l?.element) return;
    const c = l.element.getBoundingClientRect(), o = c.left + c.width / 2, s = Array.from(this.manager.registry.droppables).filter((e) => !e.disabled && e.id !== l.id && e.accepts(a) && e.element).map((e) => ({ item: e, rect: e.element.getBoundingClientRect() })).filter(
      ({ rect: e }) => e.width > 0 && (n === "left" ? e.left + e.width / 2 < o - 1 : e.left + e.width / 2 > o + 1)
    ).sort((e, g) => Math.abs(e.rect.left + e.rect.width / 2 - o) - Math.abs(g.rect.left + g.rect.width / 2 - o))[0]?.item;
    if (!s?.element) return;
    this.manager.collisionObserver.disable(), this.choosingTarget = !0, this.manager.actions.setDropTarget(s.id), s.element.scrollIntoView({ block: "nearest", inline: "nearest" });
    const i = s.element.getBoundingClientRect();
    this.manager.actions.move({ event: r, to: { x: i.left + i.width / 2, y: i.top + i.height / 2 } });
  }
  cleanup() {
    this.choosingTarget && (this.manager.collisionObserver.enable(), this.choosingTarget = !1), super.cleanup();
  }
}
const w = [
  u.configure({
    preventActivation: (t) => t.target instanceof Element && !!t.target.closest("[data-column-drag-ignore],button:not([data-column-sort]),a,input,select,textarea,[role=separator]"),
    activationConstraints: (t) => t.pointerType === "touch" ? [new d.Delay({ value: 250, tolerance: 5 })] : [new d.Distance({ value: 5 })]
  }),
  f
];
export {
  w as dataTableColumnSensors
};
//# sourceMappingURL=datatablecolumndrag.es.js.map
