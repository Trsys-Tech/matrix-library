import * as p from "react";
function T(A, u, d, C) {
  const m = p.useRef(), g = p.useRef();
  p.useLayoutEffect(() => {
    const e = A.current;
    if (!e) return;
    const o = m.current;
    if (o && o.rows === u && o.columns === d && o.scrollTop === e.scrollTop && o.scrollLeft === e.scrollLeft && o.animations.some((t) => t.playState === "running"))
      return;
    const w = /* @__PURE__ */ new Map();
    if (o)
      for (const t of o.positions.keys())
        t.isConnected && w.set(t, new DOMMatrix(getComputedStyle(t).transform));
    o?.animations.forEach((t) => t.cancel());
    const h = Array.from(
      e.querySelectorAll('[role="row"][data-row-id], [role="gridcell"][data-column-id], [role="columnheader"][data-column-id]')
    ).filter((t) => !t.closest("[data-exiting-row]")), a = new Map(h.map((t) => [t, t.getBoundingClientRect()])), b = [], L = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (o && !C && !L) {
      const t = o.rows !== u, l = o.columns !== d;
      if (t) {
        g.current?.remove();
        const s = e.getBoundingClientRect(), n = document.createElement("div");
        n.setAttribute("aria-hidden", "true"), n.inert = !0, Object.assign(n.style, {
          position: "absolute",
          top: `${e.scrollTop}px`,
          left: `${e.scrollLeft}px`,
          width: `${e.clientWidth}px`,
          height: `${e.clientHeight}px`,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: "15"
        });
        for (const [r, i] of o.rowCopies) {
          if (a.has(r)) continue;
          const c = o.positions.get(r);
          i.setAttribute("data-exiting-row", ""), i.removeAttribute("id"), i.querySelectorAll("[id]").forEach((f) => f.removeAttribute("id")), Object.assign(i.style, {
            position: "absolute",
            margin: "0",
            minWidth: "0",
            transform: "none",
            top: `${c.top - s.top - e.clientTop}px`,
            left: `${c.left - s.left - e.clientLeft}px`,
            width: `${c.width}px`
          }), n.append(i);
        }
        if (n.childElementCount) {
          e.append(n), g.current = n;
          const r = Array.from(
            n.children,
            (i) => i.animate([{ opacity: 1 }, { opacity: 0 }], {
              duration: 220,
              easing: "ease-out",
              fill: "forwards"
            })
          );
          Promise.all(r.map((i) => i.finished)).then(() => n.remove());
        }
      }
      for (const s of h) {
        const n = s.getAttribute("role") === "row";
        if (!(n ? t : l) || s.hasAttribute("data-dragging")) continue;
        const r = o.positions.get(s), i = a.get(s);
        if (typeof s.animate != "function") continue;
        const c = w.get(s), f = o.scrollTop === e.scrollTop && o.scrollLeft === e.scrollLeft, y = !n && r && f ? r.left - i.left + (c?.m41 ?? 0) : 0, x = n && r && f ? r.top - i.top + (c?.m42 ?? 0) : 0, v = Math.abs(y) >= 1 || Math.abs(x) >= 1;
        if (!v && !n) continue;
        const M = v ? [{ transform: `translate(${y}px, ${x}px)` }, { transform: "translate(0, 0)" }] : [{ opacity: r ? 0.6 : 0 }, { opacity: 1 }];
        b.push(
          s.animate(M, {
            duration: 220,
            easing: "ease-out"
          })
        );
      }
    }
    m.current = {
      rows: u,
      columns: d,
      scrollTop: e.scrollTop,
      scrollLeft: e.scrollLeft,
      positions: a,
      animations: b,
      rowCopies: new Map(
        h.filter((t) => {
          const l = a.get(t), s = e.getBoundingClientRect();
          return t.getAttribute("role") === "row" && l.bottom > s.top && l.top < s.bottom;
        }).map((t) => [t, t.cloneNode(!0)])
      )
    };
  }), p.useEffect(
    () => () => {
      m.current?.animations.forEach((e) => e.cancel()), g.current?.remove();
    },
    []
  );
}
export {
  T as useDataTableMotion
};
//# sourceMappingURL=usedatatablemotion.es.js.map
