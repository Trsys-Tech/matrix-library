import * as React from "react";

/** Animate committed row/column order changes within the viewport. */
export function useDataTableMotion(viewportRef: React.RefObject<HTMLDivElement>, rowOrder: string, columnOrder: string, isPrinting: boolean) {
  // Capture layout after each commit and animate retained elements when row or column order changes.
  // The virtualizer owns the outer row transform, so motion is applied to the inner row instead.
  const motionSnapshot = React.useRef<{
    rows: string;
    columns: string;
    scrollTop: number;
    scrollLeft: number;
    positions: Map<Element, DOMRect>;
    animations: Animation[];
    rowCopies: Map<HTMLElement, HTMLElement>;
  }>();
  const exitLayer = React.useRef<HTMLDivElement>();
  React.useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const previous = motionSnapshot.current;
    if (
      previous &&
      previous.rows === rowOrder &&
      previous.columns === columnOrder &&
      previous.scrollTop === viewport.scrollTop &&
      previous.scrollLeft === viewport.scrollLeft &&
      previous.animations.some(animation => animation.playState === "running")
    )
      return;
    // Read the current visual offset before canceling an interrupted transition.
    const offsets = new Map<Element, DOMMatrix>();
    if (previous)
      for (const element of previous.positions.keys()) {
        if (element.isConnected) offsets.set(element, new DOMMatrix(getComputedStyle(element).transform));
      }
    previous?.animations.forEach(animation => animation.cancel());
    const elements = Array.from(
      viewport.querySelectorAll<HTMLElement>('[role="row"][data-row-id], [role="gridcell"][data-column-id], [role="columnheader"][data-column-id]'),
    ).filter(element => !element.closest("[data-exiting-row]"));
    const positions = new Map(elements.map(element => [element, element.getBoundingClientRect()]));
    const animations: Animation[] = [];
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (previous && !isPrinting && !reducedMotion) {
      const rowsChanged = previous.rows !== rowOrder;
      const columnsChanged = previous.columns !== columnOrder;
      if (rowsChanged) {
        exitLayer.current?.remove();
        const bounds = viewport.getBoundingClientRect();
        const layer = document.createElement("div");
        layer.setAttribute("aria-hidden", "true");
        layer.inert = true;
        Object.assign(layer.style, {
          position: "absolute",
          top: `${viewport.scrollTop}px`,
          left: `${viewport.scrollLeft}px`,
          width: `${viewport.clientWidth}px`,
          height: `${viewport.clientHeight}px`,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: "15",
        });
        for (const [element, copy] of previous.rowCopies) {
          if (positions.has(element)) continue;
          const rect = previous.positions.get(element)!;
          copy.setAttribute("data-exiting-row", "");
          // Copies are decorative and must not introduce duplicate document ids.
          copy.removeAttribute("id");
          copy.querySelectorAll("[id]").forEach(child => child.removeAttribute("id"));
          Object.assign(copy.style, {
            position: "absolute",
            margin: "0",
            minWidth: "0",
            transform: "none",
            top: `${rect.top - bounds.top - viewport.clientTop}px`,
            left: `${rect.left - bounds.left - viewport.clientLeft}px`,
            width: `${rect.width}px`,
          });
          layer.append(copy);
        }
        if (layer.childElementCount) {
          viewport.append(layer);
          exitLayer.current = layer;
          const fades = Array.from(layer.children, child =>
            child.animate([{ opacity: 1 }, { opacity: 0 }], {
              duration: 220,
              easing: "ease-out",
              fill: "forwards",
            }),
          );
          void Promise.all(fades.map(fade => fade.finished)).then(() => layer.remove());
        }
      }
      for (const element of elements) {
        const isRow = element.getAttribute("role") === "row";
        if (!(isRow ? rowsChanged : columnsChanged) || element.hasAttribute("data-dragging")) continue;
        const before = previous.positions.get(element);
        const after = positions.get(element)!;
        if (typeof element.animate !== "function") continue;
        const offset = offsets.get(element);
        const sameScroll = previous.scrollTop === viewport.scrollTop && previous.scrollLeft === viewport.scrollLeft;
        const x = !isRow && before && sameScroll ? before.left - after.left + (offset?.m41 ?? 0) : 0;
        const y = isRow && before && sameScroll ? before.top - after.top + (offset?.m42 ?? 0) : 0;
        const moved = Math.abs(x) >= 1 || Math.abs(y) >= 1;
        if (!moved && !isRow) continue;
        // Virtualization can replace every visible row; filters can retain a row at the same position.
        // Give those results an entrance transition as well as animating rows that change position.
        const frames = moved
          ? [{ transform: `translate(${x}px, ${y}px)` }, { transform: "translate(0, 0)" }]
          : [{ opacity: before ? 0.6 : 0 }, { opacity: 1 }];
        animations.push(
          element.animate(frames, {
            duration: 220,
            easing: "ease-out",
          }),
        );
      }
    }
    motionSnapshot.current = {
      rows: rowOrder,
      columns: columnOrder,
      scrollTop: viewport.scrollTop,
      scrollLeft: viewport.scrollLeft,
      positions,
      animations,
      rowCopies: new Map(
        elements
          .filter(element => {
            const rect = positions.get(element)!;
            const bounds = viewport.getBoundingClientRect();
            return element.getAttribute("role") === "row" && rect.bottom > bounds.top && rect.top < bounds.bottom;
          })
          .map(element => [element, element.cloneNode(true) as HTMLElement]),
      ),
    };
  });
  React.useEffect(
    () => () => {
      motionSnapshot.current?.animations.forEach(animation => animation.cancel());
      exitLayer.current?.remove();
    },
    [],
  );
}
