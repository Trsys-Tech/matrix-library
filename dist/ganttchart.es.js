import { jsxs as a, jsx as t, Fragment as it } from "react/jsx-runtime";
import x from "react";
import { Plus as xt } from "@trsys-tech/matrix-icons";
import { cn as v } from "./utils.es.js";
import { GanttToolbar as ct } from "./gantttoolbar.es.js";
import { getTimelineRange as dt, createTimeline as ut, toDate as G, getMarkerPosition as ft, formatDateRange as O, includesDate as V, clampProgress as bt, getBarPosition as ht } from "./gantt-chart.es.js";
const pt = {
  week: "Weeks",
  month: "Month",
  quarter: "Quarter"
}, gt = {
  week: 72,
  month: 120,
  quarter: 220
}, M = 8, A = 12, z = 4, vt = 30, W = ({ markers: l, showLabels: s = !1 }) => {
  const u = x.useRef(null), c = x.useRef(/* @__PURE__ */ new Map()), f = x.useRef(/* @__PURE__ */ new Map());
  return x.useEffect(() => {
    const e = u.current;
    if (!e || !s) return;
    const r = () => {
      const m = e.clientWidth, $ = l.flatMap(({ marker: i, left: d }) => {
        const y = String(i.id), g = c.current.get(y);
        if (!g) return [];
        const N = d / 100 * m, w = g.offsetWidth;
        let b = N + A;
        return b + w > m - M && (b = N - w - A), b = Math.max(M, Math.min(b, m - w - M)), [{ key: y, label: g, labelLeft: b, labelRight: b + w }];
      }), p = [];
      $.sort((i, d) => i.labelLeft - d.labelLeft).forEach((i) => {
        let d = p.findIndex((N) => N + M <= i.labelLeft);
        d === -1 && (d = p.length), p[d] = i.labelRight;
        const y = z + d * vt;
        i.label.style.left = `${i.labelLeft}px`, i.label.style.top = `${y}px`;
        const g = f.current.get(i.key);
        g && (g.style.top = `${y + 8}px`);
      });
    };
    if (r(), typeof ResizeObserver > "u") return;
    const n = new ResizeObserver(r);
    return n.observe(e), c.current.forEach((m) => n.observe(m)), () => n.disconnect();
  }, [l, s]), /* @__PURE__ */ t("div", { ref: u, className: "mtx-pointer-events-none mtx-absolute mtx-inset-0 mtx-z-20", children: l.map(({ marker: e, left: r }) => {
    const n = String(e.id);
    return /* @__PURE__ */ a(x.Fragment, { children: [
      /* @__PURE__ */ t(
        "div",
        {
          className: v(
            "mtx-absolute mtx-inset-y-0 mtx-w-0.5 -mtx-translate-x-1/2 mtx-border mtx-border-dashed mtx-border-l",
            e.lineClassName
          ),
          style: { left: `${r}%`, borderColor: e.color },
          "aria-hidden": "true"
        }
      ),
      s ? /* @__PURE__ */ a(it, { children: [
        /* @__PURE__ */ t(
          "div",
          {
            ref: (m) => {
              m ? f.current.set(n, m) : f.current.delete(n);
            },
            className: v(
              "mtx-absolute mtx-z-20 mtx-h-2 mtx-w-2 -mtx-translate-x-1/2 mtx-rotate-45 mtx-border mtx-border-gray-0",
              e.diamondClassName
            ),
            style: { left: `${r}%`, top: z + 8, backgroundColor: e.color },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            ref: (m) => {
              m ? c.current.set(n, m) : c.current.delete(n);
            },
            className: v(
              "mtx-absolute mtx-z-20 mtx-max-w-48 mtx-truncate mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-bg-gray-0 mtx-px-2 mtx-py-0.5 mtx-text-xs mtx-font-semibold mtx-shadow-card",
              e.labelClassName
            ),
            style: { left: `calc(${r}% + ${A}px)`, top: z, borderColor: e.color, color: e.color },
            title: typeof e.label == "string" ? e.label : void 0,
            role: "note",
            children: e.label
          }
        )
      ] }) : null
    ] }, e.id);
  }) });
}, q = ({ intervals: l, highlightedDate: s }) => /* @__PURE__ */ t(
  "div",
  {
    "aria-hidden": "true",
    className: "mtx-pointer-events-none mtx-absolute mtx-inset-0 mtx-grid",
    style: { gridTemplateColumns: `repeat(${l.length}, minmax(0, 1fr))` },
    children: l.map((u, c) => /* @__PURE__ */ t(
      "div",
      {
        className: v(
          "mtx-border-l mtx-border-gray-200",
          c === l.length - 1 && "mtx-border-r",
          V(u, s) && "mtx-bg-gray-50"
        )
      },
      u.start.toISOString()
    ))
  }
), yt = ({ intervals: l, groups: s, highlightedDate: u, nameColumnHeader: c, nameColumnWidth: f, headerHeight: e }) => /* @__PURE__ */ a("div", { className: "mtx-bg-primary-50", role: "rowgroup", children: [
  /* @__PURE__ */ a(
    "div",
    {
      className: "mtx-grid mtx-border-b mtx-border-gray-200",
      style: { gridTemplateColumns: `${f}px repeat(${l.length}, minmax(0, 1fr))`, height: e / 2 },
      role: "row",
      children: [
        /* @__PURE__ */ t(
          "div",
          {
            className: "mtx-sticky mtx-left-0 mtx-z-20 mtx-flex mtx-items-center mtx-border-b mtx-border-r mtx-border-gray-200 mtx-bg-primary-50 mtx-px-4 mtx-text-xs mtx-font-semibold mtx-text-text-500",
            style: { gridColumn: 1, height: e },
            role: "columnheader",
            "aria-colindex": 1,
            "aria-rowspan": 2,
            children: c
          }
        ),
        s.map((r) => /* @__PURE__ */ t(
          "div",
          {
            className: "mtx-flex mtx-items-center mtx-justify-center mtx-border-l mtx-border-gray-200 mtx-text-xs mtx-font-medium mtx-text-text-500 mtx-text-center",
            style: { gridColumn: `${r.startIndex + 2} / span ${r.intervalCount}`, paddingBottom: e / 2 },
            role: "columnheader",
            "aria-colindex": r.startIndex + 2,
            "aria-colspan": r.intervalCount,
            children: r.label
          },
          r.key
        ))
      ]
    }
  ),
  /* @__PURE__ */ a(
    "div",
    {
      className: "mtx-grid",
      style: { gridTemplateColumns: `${f}px repeat(${l.length}, minmax(0, 1fr))`, height: e / 2 },
      role: "row",
      children: [
        /* @__PURE__ */ t("div", { "aria-hidden": "true" }),
        l.map((r, n) => /* @__PURE__ */ t(
          "div",
          {
            className: v(
              "mtx-flex mtx-items-center mtx-justify-center mtx-border-l mtx-border-gray-200 mtx-px-2 mtx-text-center mtx-text-xs mtx-font-medium mtx-text-text-500",
              V(r, u) && "mtx-bg-primary-100 mtx-font-semibold"
            ),
            role: "columnheader",
            "aria-colindex": n + 2,
            children: r.label
          },
          r.start.toISOString()
        ))
      ]
    }
  )
] }), I = ({ item: l, bar: s, intervals: u, formattedDateRange: c, renderBar: f }) => {
  const e = s ?? l, r = !s || s.progress !== void 0, n = bt(e.progress), m = ht(e, u);
  return m && m.width > 0 ? /* @__PURE__ */ a(
    "div",
    {
      className: v(
        "mtx-absolute mtx-top-1/2 mtx-z-10 mtx-h-6 -mtx-translate-y-1/2 mtx-rounded mtx-border mtx-border-secondary-300 mtx-bg-secondary-50",
        e.barClassName
      ),
      style: { left: `${m.left}%`, width: `${m.width}%` },
      title: r ? `${c}, ${n}% complete` : c,
      role: r ? "progressbar" : "img",
      "aria-label": s ? `${s.label}, ${c}` : typeof l.name == "string" ? l.name : void 0,
      "aria-valuemin": r ? 0 : void 0,
      "aria-valuemax": r ? 100 : void 0,
      "aria-valuenow": r ? n : void 0,
      children: [
        /* @__PURE__ */ t(
          "div",
          {
            className: v("mtx-bg-secondary-300 mtx-absolute -mtx-top-px -mtx-left-px mtx-h-[inherit] mtx-rounded-l", e.progressClassName),
            style: { width: `${n}%` },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            className: "mtx-absolute mtx-top-0 mtx-left-0 mtx-w-full mtx-text-center mtx-text-xs mtx-text-text-600 mtx-flex mtx-items-center mtx-h-full mtx-px-1",
            children: f ? f(s ? { item: l, progress: n, bar: s } : { item: l, progress: n }) : /* @__PURE__ */ a("div", { className: "mtx-w-full mtx-flex mtx-items-center mtx-justify-between mtx-gap-0.5 mtx-rounded-l mtx-overflow-hidden", children: [
              /* @__PURE__ */ t("span", { className: "mtx-truncate mtx-font-semibold mtx-block", children: s?.label ?? "Progress" }),
              r ? /* @__PURE__ */ a("strong", { className: "mtx-block mtx-text-xs", children: [
                n,
                "%"
              ] }) : null
            ] })
          }
        )
      ]
    }
  ) : null;
}, Nt = x.forwardRef(
  ({
    items: l,
    view: s,
    defaultView: u = "quarter",
    views: c = ["week", "month", "quarter"],
    viewLabels: f,
    onViewChange: e,
    startDate: r,
    endDate: n,
    markers: m = [],
    highlightedDate: $,
    locale: p = "en-US",
    nameColumnWidth: i = 320,
    minRowHeight: d = 56,
    headerHeight: y = 64,
    cellWidths: g,
    nameColumnHeader: N = "Name",
    addItemLabel: w = "New item",
    onAddItem: b,
    onRefresh: H,
    showFullscreen: K = !0,
    toolbarActions: U,
    renderItem: B,
    renderBar: D,
    formatDateRange: Q,
    className: J,
    "aria-label": k = "Gantt chart",
    ...X
  }, Y) => {
    const L = x.useRef(null), [Z, tt] = x.useState(!1), [et, rt] = x.useState(u), E = s ?? et, C = x.useMemo(() => dt(l, r, n), [n, l, r]), h = x.useMemo(() => ut(C.start, C.end, E, p), [E, p, C.end, C.start]), S = x.useMemo(() => $ === null ? null : G($ ?? /* @__PURE__ */ new Date()), [$]), lt = { ...pt, ...f }, P = x.useMemo(
      () => m.flatMap((o) => {
        const T = G(o.date), R = T ? ft(T, h.intervals) : null;
        return R === null ? [] : [{ marker: o, left: R }];
      }),
      [m, h.intervals]
    ), nt = g?.[E] ?? gt[E], _ = h.intervals.length * nt, st = i + _, mt = x.useCallback((o) => {
      L.current = o, o && typeof document < "u" && tt(
        document.fullscreenEnabled !== !1 && typeof o.requestFullscreen == "function" && typeof document.exitFullscreen == "function"
      );
    }, []);
    x.useImperativeHandle(Y, () => L.current);
    const ot = (o) => {
      s === void 0 && rt(o), e?.(o);
    }, at = () => {
      !L.current || typeof document > "u" || (document.fullscreenElement === L.current ? document.exitFullscreen().catch(() => {
      }) : L.current.requestFullscreen().catch(() => {
      }));
    };
    return /* @__PURE__ */ a(
      "div",
      {
        ref: mt,
        className: v(
          "mtx-overflow-hidden mtx-rounded-lg mtx-border mtx-border-gray-200 mtx-bg-gray-0 mtx-[font-family:DMSans] mtx-flex mtx-flex-col",
          J
        ),
        "aria-label": k,
        ...X,
        children: [
          /* @__PURE__ */ t(
            ct,
            {
              activeView: E,
              views: c,
              viewLabels: lt,
              onViewChange: ot,
              onRefresh: H,
              onToggleFullscreen: K && Z ? at : void 0,
              toolbarActions: U
            }
          ),
          /* @__PURE__ */ t("div", { className: "mtx-overflow-auto mtx-flex-1", children: /* @__PURE__ */ a("div", { style: { minWidth: st }, role: "table", "aria-label": k, children: [
            /* @__PURE__ */ t(
              yt,
              {
                intervals: h.intervals,
                groups: h.groups,
                highlightedDate: S,
                nameColumnHeader: N,
                nameColumnWidth: i,
                headerHeight: y
              }
            ),
            b ? /* @__PURE__ */ a("div", { className: "mtx-grid", style: { gridTemplateColumns: `${i}px minmax(${_}px, 1fr)` }, role: "row", children: [
              /* @__PURE__ */ t(
                "div",
                {
                  className: "mtx-sticky mtx-left-0 mtx-z-30 mtx-flex mtx-items-center mtx-border-b mtx-border-r mtx-border-gray-200 mtx-bg-gray-0 mtx-px-2",
                  style: { minHeight: d },
                  role: "cell",
                  children: /* @__PURE__ */ a(
                    "button",
                    {
                      type: "button",
                      className: "mtx-inline-flex mtx-items-center mtx-gap-2 mtx-text-xs mtx-font-medium mtx-text-primary hover:mtx-text-primary-700 focus-visible:mtx-outline-none focus-visible:mtx-ring focus-visible:mtx-ring-primary-300",
                      onClick: b,
                      children: [
                        /* @__PURE__ */ t(xt, { className: "mtx-h-4 mtx-w-4" }),
                        w
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ a("div", { className: "mtx-relative mtx-border-b mtx-border-gray-200", style: { minHeight: d }, role: "cell", children: [
                /* @__PURE__ */ t(q, { intervals: h.intervals, highlightedDate: S }),
                /* @__PURE__ */ t(W, { markers: P, showLabels: !0 })
              ] })
            ] }) : null,
            /* @__PURE__ */ t("div", { role: "rowgroup", children: l.map((o, T) => {
              const R = Q?.(o) ?? O(o, p), j = /* @__PURE__ */ t(I, { item: o, intervals: h.intervals, formattedDateRange: R, renderBar: D });
              return /* @__PURE__ */ a(
                "div",
                {
                  className: "mtx-grid",
                  style: { gridTemplateColumns: `${i}px minmax(${_}px, 1fr)` },
                  role: "row",
                  children: [
                    /* @__PURE__ */ t(
                      "div",
                      {
                        className: "mtx-sticky mtx-left-0 mtx-z-30 mtx-flex mtx-items-center mtx-border-b mtx-border-r mtx-border-gray-200 mtx-bg-gray-0 mtx-px-2",
                        style: { minHeight: d },
                        role: "rowheader",
                        children: B ? B({ item: o, formattedDateRange: R }) : /* @__PURE__ */ a("div", { className: "mtx-flex mtx-w-full mtx-min-w-0 mtx-items-center mtx-justify-between mtx-gap-3", children: [
                          /* @__PURE__ */ t("span", { className: "mtx-truncate mtx-text-xs mtx-font-semibold mtx-text-text-500", children: o.name }),
                          /* @__PURE__ */ t("span", { className: "mtx-shrink-0 mtx-text-xs mtx-text-text-300", children: R })
                        ] })
                      }
                    ),
                    /* @__PURE__ */ a(
                      "div",
                      {
                        className: "mtx-relative mtx-flex mtx-flex-col mtx-justify-center mtx-border-b mtx-border-gray-200",
                        style: { minHeight: d },
                        role: "cell",
                        children: [
                          /* @__PURE__ */ t(q, { intervals: h.intervals, highlightedDate: S }),
                          /* @__PURE__ */ t(W, { markers: P, showLabels: !b && T === 0 }),
                          o.additionalBars?.length ? /* @__PURE__ */ a("div", { className: "mtx-flex mtx-flex-col mtx-gap-1 mtx-py-2", children: [
                            /* @__PURE__ */ t("div", { className: "mtx-relative mtx-h-6", children: j }),
                            o.additionalBars.map((F) => /* @__PURE__ */ t("div", { className: "mtx-relative mtx-h-6", children: /* @__PURE__ */ t(
                              I,
                              {
                                item: o,
                                bar: F,
                                intervals: h.intervals,
                                formattedDateRange: O(F, p),
                                renderBar: D
                              }
                            ) }, F.id))
                          ] }) : j
                        ]
                      }
                    )
                  ]
                },
                o.id
              );
            }) })
          ] }) })
        ]
      }
    );
  }
);
Nt.displayName = "GanttChart";
export {
  Nt as GanttChart
};
//# sourceMappingURL=ganttchart.es.js.map
