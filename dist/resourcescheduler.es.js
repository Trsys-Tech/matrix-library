import { jsxs as K, jsx as p } from "react/jsx-runtime";
import { forwardRef as xe, useState as q, useEffect as ee, useRef as Z, useId as pe, useMemo as ce, createElement as ye } from "react";
import { DragDropProvider as he, DragOverlay as be, PointerSensor as ie, useDroppable as De, useDraggable as ve } from "@dnd-kit/react";
import { cn as B } from "./utils.es.js";
import { toDateOnlyString as G, toCalendarDate as Y } from "./datevalue.es.js";
const we = [
  ie.configure({
    preventActivation: (a, m) => a.pointerType !== "touch" || !!ie.defaults.preventActivation?.(a, m)
  })
], Ie = ({
  today: a,
  days: m,
  dayKeys: g,
  formatter: f,
  resourceHeading: l,
  resourceColumnWidth: y,
  dayColumnWidth: T,
  slotProps: i
}) => /* @__PURE__ */ K("div", { role: "row", className: "mtx-flex", children: [
  /* @__PURE__ */ p(
    "div",
    {
      role: "columnheader",
      className: "mtx-sticky mtx-left-0 mtx-z-20 mtx-flex mtx-shrink-0 mtx-items-center mtx-border-b mtx-border-r mtx-border-gray-200 mtx-bg-gray-0 mtx-px-4 mtx-py-2",
      style: { width: y },
      children: l
    }
  ),
  m.map((b, s) => /* @__PURE__ */ ye(
    "div",
    {
      ...i?.day,
      key: g[s],
      role: "columnheader",
      "data-date": g[s],
      "data-today": g[s] === a || void 0,
      "aria-current": g[s] === a ? "date" : void 0,
      className: B(
        "mtx-flex mtx-flex-1 mtx-items-center mtx-justify-center mtx-border-b mtx-border-r mtx-border-gray-200 mtx-px-2 mtx-py-2",
        g[s] === a && "mtx-bg-primary-50",
        i?.day?.className
      ),
      style: { minWidth: T, ...i?.day?.style }
    },
    f(b)
  ))
] }), ke = ({
  item: a,
  index: m,
  count: g,
  resourceId: f,
  day: l,
  cardWidth: y,
  stackOffset: T,
  slotProps: i,
  interaction: b
}) => {
  const { disabled: s, instructionsId: D, activeMove: h, draggedItemRef: v, cardRefs: w, setActiveMove: N, handleKeyDown: J } = b, [X, H] = q(!1), { ref: u } = ve({
    id: a.id,
    disabled: s || a.draggable === !1 || !!h?.keyboard,
    data: { resourceId: f, day: l }
  }), S = Z(null);
  ee(() => () => S.current?.remove(), []);
  const L = h?.itemId === a.id;
  return /* @__PURE__ */ p(
    "div",
    {
      ...i?.card,
      ref: (o) => {
        u(o), o ? w.current.set(a.id, o) : w.current.delete(a.id);
      },
      "data-item-id": a.id,
      "data-moving": L || void 0,
      role: "group",
      "aria-label": a.label ?? String(a.id),
      "aria-describedby": D,
      tabIndex: s || a.draggable === !1 ? void 0 : 0,
      draggable: !s && a.draggable !== !1,
      className: B(
        "mtx-relative focus-visible:mtx-outline-none focus-visible:mtx-ring-2 focus-visible:mtx-ring-primary-300",
        !s && a.draggable !== !1 && "mtx-cursor-grab active:mtx-cursor-grabbing",
        i?.card?.className
      ),
      style: {
        gridArea: "1 / 1",
        marginLeft: m * T,
        width: y,
        touchAction: "manipulation",
        ...i?.card?.style,
        zIndex: X || L ? g : m
      },
      onFocus: (o) => {
        H(!0), i?.card?.onFocus?.(o);
      },
      onBlur: (o) => {
        o.currentTarget.contains(o.relatedTarget) || H(!1), i?.card?.onBlur?.(o);
      },
      onDragStart: (o) => {
        if (i?.card?.onDragStart?.(o), o.defaultPrevented || s || a.draggable === !1) {
          o.preventDefault();
          return;
        }
        v.current = a.id, o.dataTransfer.effectAllowed = "move", o.dataTransfer.setData("text/plain", String(a.id)), S.current?.remove();
        const $ = o.currentTarget, A = $.getBoundingClientRect(), d = $.cloneNode(!0);
        d.setAttribute("aria-hidden", "true"), d.removeAttribute("id"), d.querySelectorAll("[id]").forEach((O) => O.removeAttribute("id")), Object.assign(d.style, { position: "fixed", top: "0", left: "-10000px", margin: "0", width: `${A.width}px` }), $.ownerDocument.body.appendChild(d), S.current = d, o.dataTransfer.setDragImage(d, o.clientX - A.left, o.clientY - A.top), N({ itemId: a.id, keyboard: !1, target: { resourceId: f, day: l } });
      },
      onDragEnd: (o) => {
        S.current?.remove(), S.current = null, v.current = null, N(null), i?.card?.onDragEnd?.(o);
      },
      onKeyDown: (o) => {
        i?.card?.onKeyDown?.(o), o.defaultPrevented || J(o, a);
      },
      children: a.content
    }
  );
}, Te = ({
  resource: a,
  today: m,
  renderCellButton: g,
  showCellButton: f,
  day: l,
  cellItems: y,
  dayColumnWidth: T,
  rowMinHeight: i,
  cardWidth: b,
  stackOffset: s,
  slotProps: D,
  interaction: h
}) => {
  const { disabled: v, activeMove: w, draggedItemRef: N, items: J, setActiveMove: X, handleMove: H } = h, u = a.id, { ref: S, isDropTarget: L } = De({
    id: JSON.stringify([typeof u, u, l]),
    data: { resourceId: u, day: l },
    disabled: v,
    accept: (d) => d.data.resourceId === u
  }), o = { resource: a, date: l, items: y }, $ = !v && g && (typeof f == "function" ? f(o) : f) ? g(o) : null, A = !v && (L || !w?.touch && w?.target.resourceId === u && w.target.day === l);
  return /* @__PURE__ */ K(
    "div",
    {
      ...D?.cell,
      ref: S,
      role: "cell",
      "data-resource-id": u,
      "data-date": l,
      "data-today": l === m || void 0,
      "data-drop-target": A || void 0,
      className: B(
        "mtx-group/cell mtx-relative mtx-isolate mtx-flex-1 mtx-border-b mtx-border-r mtx-border-gray-200 mtx-p-1.5",
        l === m && "mtx-bg-gray-50",
        A && "mtx-bg-primary-50 mtx-ring-2 mtx-ring-inset mtx-ring-primary-300",
        D?.cell?.className
      ),
      style: { minWidth: T, minHeight: i, ...D?.cell?.style },
      onDragOver: (d) => {
        D?.cell?.onDragOver?.(d), !(d.defaultPrevented || v || N.current === null || J.find((O) => O.id === N.current)?.resourceId !== u) && (d.preventDefault(), d.dataTransfer.dropEffect = "move", X({ itemId: N.current, keyboard: !1, target: { resourceId: u, day: l } }));
      },
      onDrop: (d) => {
        D?.cell?.onDrop?.(d), !(d.defaultPrevented || v || N.current === null) && (d.preventDefault(), H(N.current, { resourceId: u, day: l }));
      },
      children: [
        /* @__PURE__ */ p("div", { className: "mtx-overflow-x-auto", children: /* @__PURE__ */ p(
          "div",
          {
            className: "mtx-grid mtx-items-start",
            style: {
              gridTemplateColumns: "minmax(0, 1fr)",
              minWidth: y.length ? b + (y.length - 1) * s : void 0
            },
            children: y.map((d, O) => /* @__PURE__ */ p(
              ke,
              {
                item: d,
                index: O,
                count: y.length,
                resourceId: u,
                day: l,
                cardWidth: b,
                stackOffset: s,
                slotProps: D,
                interaction: h
              },
              `${typeof d.id}:${d.id}`
            ))
          }
        ) }),
        $ != null && /* @__PURE__ */ p("div", { className: "mtx-pointer-events-none mtx-absolute mtx-bottom-1.5 mtx-right-1.5 mtx-z-10 mtx-opacity-0 group-hover/cell:mtx-pointer-events-auto group-hover/cell:mtx-opacity-100 group-focus-within/cell:mtx-pointer-events-auto group-focus-within/cell:mtx-opacity-100 [@media(hover:none)]:mtx-pointer-events-auto [@media(hover:none)]:mtx-opacity-100", children: $ })
      ]
    }
  );
}, Ne = ({
  today: a,
  renderCellButton: m,
  showCellButton: g,
  resource: f,
  dayKeys: l,
  groupedItems: y,
  resourceColumnWidth: T,
  dayColumnWidth: i,
  rowMinHeight: b,
  cardWidth: s,
  stackOffset: D,
  slotProps: h,
  interaction: v
}) => /* @__PURE__ */ K("div", { role: "row", className: "mtx-flex", children: [
  /* @__PURE__ */ p(
    "div",
    {
      ...h?.resource,
      role: "rowheader",
      className: B(
        "mtx-sticky mtx-left-0 mtx-z-20 mtx-flex mtx-shrink-0 mtx-items-center mtx-border-b mtx-border-r mtx-border-gray-200 mtx-bg-gray-0 mtx-px-4 mtx-font-semibold",
        h?.resource?.className
      ),
      style: { width: T, ...h?.resource?.style },
      children: f.label
    }
  ),
  l.map((w) => /* @__PURE__ */ p(
    Te,
    {
      resource: f,
      today: a,
      renderCellButton: m,
      showCellButton: g,
      day: w,
      cellItems: y.get(f.id)?.get(w) ?? [],
      dayColumnWidth: i,
      rowMinHeight: b,
      cardWidth: s,
      stackOffset: D,
      slotProps: h,
      interaction: v
    },
    w
  ))
] }), Q = (a) => {
  if (a instanceof Date || /^\d{4}-\d{2}-\d{2}$/.test(a)) return Y(a);
  if (!/^\d{4}-\d{2}-\d{2}T/.test(a) || !Y(a.slice(0, 10))) return;
  const m = new Date(a);
  return Number.isNaN(m.getTime()) ? void 0 : m;
}, R = (a) => G(Q(a)), Se = xe(
  ({
    resources: a,
    from: m,
    to: g,
    items: f,
    defaultItems: l = [],
    onItemsChange: y,
    onItemDrop: T,
    disabled: i = !1,
    resourceColumnWidth: b = 164,
    dayColumnWidth: s = 268,
    rowMinHeight: D = 124,
    cardWidth: h = 192,
    stackOffset: v = 32,
    locale: w = "en-US",
    formatter: N,
    resourceHeading: J = "Resource",
    renderCellButton: X,
    showCellButton: H = !0,
    slotProps: u,
    className: S,
    style: L,
    ...o
  }, $) => {
    const [A, d] = q(() => G(/* @__PURE__ */ new Date()));
    ee(() => {
      let e;
      const t = () => {
        const r = /* @__PURE__ */ new Date();
        d(G(r));
        const n = new Date(r);
        n.setHours(24, 0, 0, 0), e = setTimeout(t, n.getTime() - r.getTime());
      };
      return t(), () => clearTimeout(e);
    }, []);
    const [O, se] = q(l), I = f ?? O, [M, U] = q(null), [le, F] = q(""), te = Z(null), V = Z(/* @__PURE__ */ new Map()), _ = Z(null), [C, ue] = q([]);
    ee(() => {
      const e = _.current;
      if (!e) return;
      const t = I.find((r) => r.id === e.itemId);
      t && t.resourceId === e.target.resourceId && R(t.date) === e.target.day && (V.current.get(t.id)?.focus(), _.current = null);
    }, [I, C]);
    const re = pe(), ae = R(m), oe = R(g), W = ce(() => {
      const e = Y(ae), t = Y(oe);
      if (!e || !t || e > t) return [];
      const r = [];
      for (const n = new Date(e); n <= t; n.setDate(n.getDate() + 1)) r.push(new Date(n));
      return r;
    }, [ae, oe]), j = W.map((e) => G(e)), me = N ?? new Intl.DateTimeFormat(w, { weekday: "short", month: "short", day: "numeric" }).format, ne = ce(() => {
      const e = /* @__PURE__ */ new Map();
      for (const r of I) {
        const n = R(r.date);
        if (!n) continue;
        let c = e.get(r.resourceId);
        c || (c = /* @__PURE__ */ new Map(), e.set(r.resourceId, c));
        const x = c.get(n) ?? [];
        x.push(r), c.set(n, x);
      }
      const t = new Map(
        C.map((r, n) => {
          const c = I.find((k) => k.id === r.itemId), x = c?.resourceId === r.target.resourceId && R(c.date) === r.target.day;
          return [r.itemId, x ? n + 1 : 0];
        })
      );
      for (const r of e.values())
        for (const n of r.values())
          n.sort(
            (c, x) => Q(c.date).getTime() - Q(x.date).getTime() || (t.get(c.id) ?? 0) - (t.get(x.id) ?? 0)
          );
      return e;
    }, [I, C]), P = (e, t) => {
      const r = I.find((E) => E.id === e);
      if (U(null), te.current = null, i || !r || r.draggable === !1 || !a.some((E) => E.id === t.resourceId) || !j.includes(t.day) || r.resourceId !== t.resourceId || !T && R(r.date) === t.day) return;
      const n = Q(r.date);
      if (!n) return;
      const c = Y(t.day);
      c.setHours(n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds());
      let x = c;
      typeof r.date == "string" && (r.date.includes("T") ? /(?:Z|[+-]\d{2}:?\d{2})$/i.test(r.date) ? x = c.toISOString() : x = t.day + r.date.slice(10) : x = t.day);
      const k = { ...r, resourceId: t.resourceId, date: x };
      if (M?.keyboard && (_.current = { itemId: e, target: t }), ue((E) => [...E.filter((de) => de.itemId !== e && I.some((ge) => ge.id === de.itemId)), { itemId: e, target: t }]), T) {
        T({ previousItem: r, item: k }), F(`Move requested for ${k.label ?? k.id} to ${t.day}.`);
        return;
      }
      const z = I.map((E) => E.id === e ? k : E);
      f === void 0 && se(z), y?.(z, { previousItem: r, item: k }), F(`Move requested for ${k.label ?? k.id} to ${t.day}, resource ${t.resourceId}.`);
    }, fe = {
      items: I,
      disabled: i,
      instructionsId: re,
      activeMove: M,
      draggedItemRef: te,
      cardRefs: V,
      setActiveMove: U,
      handleMove: P,
      handleKeyDown: (e, t) => {
        if (!(e.target !== e.currentTarget || i || t.draggable === !1)) {
          if (!M) {
            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
              const c = (ne.get(t.resourceId)?.get(R(t.date)) ?? []).filter((z) => z.draggable !== !1), x = c.findIndex((z) => z.id === t.id), k = c[(x + (e.key === "ArrowDown" ? 1 : -1) + c.length) % c.length];
              k && (e.preventDefault(), V.current.get(k.id)?.focus());
              return;
            }
            if (e.key !== " " && e.key !== "Enter") return;
            e.preventDefault();
            const r = R(t.date);
            U({ itemId: t.id, keyboard: !0, target: { resourceId: t.resourceId, day: r } }), F(`Picked up ${t.label ?? t.id}. Use arrow keys to choose a cell, Enter to drop, Escape to cancel.`);
            return;
          }
          if (!(!M.keyboard || M.itemId !== t.id)) {
            if (e.key === "Escape")
              e.preventDefault(), U(null), F("Move cancelled.");
            else if (e.key === "Enter" || e.key === " ")
              e.preventDefault(), P(t.id, M.target);
            else if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
              e.preventDefault();
              const r = j.indexOf(M.target.day), n = Math.max(0, Math.min(j.length - 1, r + (e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0))), c = { resourceId: t.resourceId, day: j[n] };
              U({ ...M, target: c }), F(`Target ${c.day}, resource ${c.resourceId}.`);
            }
          }
        }
      }
    };
    return /* @__PURE__ */ K(
      he,
      {
        sensors: we,
        onBeforeDragStart: (e) => {
          const t = e.operation.source, r = I.find((n) => n.id === t?.id);
          (i || M || !r || r.draggable === !1) && e.preventDefault();
        },
        onDragStart: (e) => {
          const t = e.operation.source, r = I.find((n) => n.id === t?.id);
          r && (U({ itemId: r.id, keyboard: !1, touch: !0, target: { resourceId: r.resourceId, day: R(r.date) } }), F(`Picked up ${r.label ?? r.id}. Drag to another day and release to drop.`));
        },
        onDragEnd: (e) => {
          const { source: t, target: r } = e.operation;
          if (U(null), e.canceled || !t || !r) {
            F("Move cancelled.");
            return;
          }
          P(t.id, r.data);
        },
        children: [
          /* @__PURE__ */ K(
            "div",
            {
              ...o,
              ref: $,
              className: B("mtx-relative mtx-overflow-auto mtx-border mtx-border-gray-200 mtx-bg-gray-0 mtx-text-sm mtx-text-text-500", S),
              style: L,
              children: [
                /* @__PURE__ */ p("p", { id: re, className: "mtx-sr-only", children: "On touch devices, press and hold a card, then drag to another day and release. Use Tab or Up/Down to select a card. Press Space or Enter to pick it up, Left/Right to move, Enter to drop, or Escape to cancel." }),
                /* @__PURE__ */ p("div", { "aria-live": "polite", className: "mtx-sr-only", children: le }),
                /* @__PURE__ */ K("div", { role: "table", "aria-label": "Resource scheduler", style: { minWidth: b + s * W.length }, children: [
                  /* @__PURE__ */ p(
                    Ie,
                    {
                      today: A,
                      days: W,
                      dayKeys: j,
                      formatter: me,
                      resourceHeading: J,
                      resourceColumnWidth: b,
                      dayColumnWidth: s,
                      slotProps: u
                    }
                  ),
                  a.map((e) => /* @__PURE__ */ p(
                    Ne,
                    {
                      today: A,
                      renderCellButton: X,
                      showCellButton: H,
                      resource: e,
                      dayKeys: j,
                      groupedItems: ne,
                      resourceColumnWidth: b,
                      dayColumnWidth: s,
                      rowMinHeight: D,
                      cardWidth: h,
                      stackOffset: v,
                      slotProps: u,
                      interaction: fe
                    },
                    `${typeof e.id}:${e.id}`
                  ))
                ] })
              ]
            }
          ),
          /* @__PURE__ */ p(be, { dropAnimation: null, children: (e) => /* @__PURE__ */ p(
            "div",
            {
              "aria-hidden": "true",
              className: B("mtx-pointer-events-none mtx-text-sm mtx-text-text-500", u?.card?.className),
              style: { width: h, ...u?.card?.style, margin: 0 },
              children: I.find((t) => t.id === e.id)?.content
            }
          ) })
        ]
      }
    );
  }
);
Se.displayName = "ResourceScheduler";
export {
  Se as ResourceScheduler
};
//# sourceMappingURL=resourcescheduler.es.js.map
