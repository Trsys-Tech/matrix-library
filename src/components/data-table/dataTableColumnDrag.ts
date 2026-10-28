import { KeyboardSensor, PointerSensor } from "@dnd-kit/react";
import { PointerActivationConstraints } from "@dnd-kit/dom";

/** Move by a whole column rather than the default sensor's fixed pixel step. */
class DataTableColumnKeyboardSensor extends KeyboardSensor {
  private choosingTarget = false;

  constructor(manager: ConstructorParameters<typeof KeyboardSensor>[0]) {
    super(manager, { preventActivation: (event, source) => event.target !== source.element });
  }

  protected handleMove(direction: "up" | "down" | "left" | "right", event: KeyboardEvent) {
    event.preventDefault();
    if (direction !== "left" && direction !== "right") return;
    const { source, target } = this.manager.dragOperation;
    const current = target ?? source;
    if (!source || !current?.element) return;
    const bounds = current.element.getBoundingClientRect();
    const center = bounds.left + bounds.width / 2;
    const candidates = Array.from(this.manager.registry.droppables)
      .filter(item => !item.disabled && item.id !== current.id && item.accepts(source) && item.element)
      .map(item => ({ item, rect: item.element!.getBoundingClientRect() }))
      .filter(
        ({ rect }) => rect.width > 0 && (direction === "left" ? rect.left + rect.width / 2 < center - 1 : rect.left + rect.width / 2 > center + 1),
      )
      .sort((a, b) => Math.abs(a.rect.left + a.rect.width / 2 - center) - Math.abs(b.rect.left + b.rect.width / 2 - center));
    const next = candidates[0]?.item;
    if (!next?.element) return;
    // Keyboard targets are semantic column choices; geometry must not override them mid-animation.
    this.manager.collisionObserver.disable();
    this.choosingTarget = true;
    void this.manager.actions.setDropTarget(next.id);
    next.element.scrollIntoView({ block: "nearest", inline: "nearest" });
    const rect = next.element.getBoundingClientRect();
    this.manager.actions.move({ event, to: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } });
  }

  protected cleanup() {
    if (this.choosingTarget) {
      this.manager.collisionObserver.enable();
      this.choosingTarget = false;
    }
    super.cleanup();
  }
}

export const dataTableColumnSensors = [
  PointerSensor.configure({
    preventActivation: event =>
      event.target instanceof Element &&
      !!event.target.closest("[data-column-drag-ignore],button:not([data-column-sort]),a,input,select,textarea,[role=separator]"),
    activationConstraints: event =>
      event.pointerType === "touch"
        ? [new PointerActivationConstraints.Delay({ value: 250, tolerance: 5 })]
        : [new PointerActivationConstraints.Distance({ value: 5 })],
  }),
  DataTableColumnKeyboardSensor,
];
