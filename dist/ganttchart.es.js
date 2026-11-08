import { jsxs as n, jsx as e, Fragment as me } from "react/jsx-runtime";
import m from "react";
import { Plus as oe } from "@trsys-tech/matrix-icons";
import { cn as y } from "./utils.es.js";
import { GanttToolbar as ie } from "./gantttoolbar.es.js";
import { getTimelineRange as xe, createTimeline as ce, toDate as W, getMarkerPosition as de, clampProgress as ue, getBarPosition as fe, formatDateRange as be, includesDate as I } from "./gantt-chart.es.js";
const he = {
  week: "Weeks",
  month: "Month",
  quarter: "Quarter"
}, ge = {
  week: 72,
  month: 120,
  quarter: 220
}, S = 8, D = 12, z = 4, pe = 30, q = ({ markers: s, showLabels: c = !1 }) => {
  const f = m.useRef(null), d = m.useRef(/* @__PURE__ */ new Map()), h = m.useRef(/* @__PURE__ */ new Map());
  return m.useEffect(() => {
    const t = f.current;
    if (!t || !c) return;
    const r = () => {
      const o = t.clientWidth, $ = s.flatMap(({ marker: a, left: x }) => {
        const N = String(a.id), g = d.current.get(N);
        if (!g) return [];
        const w = x / 100 * o, R = g.offsetWidth;
        let u = w + D;
        return u + R > o - S && (u = w - R - D), u = Math.max(S, Math.min(u, o - R - S)), [{ key: N, label: g, labelLeft: u, labelRight: u + R }];
      }), v = [];
      $.sort((a, x) => a.labelLeft - x.labelLeft).forEach((a) => {
        let x = v.findIndex((w) => w + S <= a.labelLeft);
        x === -1 && (x = v.length), v[x] = a.labelRight;
        const N = z + x * pe;
        a.label.style.left = `${a.labelLeft}px`, a.label.style.top = `${N}px`;
        const g = h.current.get(a.key);
        g && (g.style.top = `${N + 8}px`);
      });
    };
    if (r(), typeof ResizeObserver > "u") return;
    const i = new ResizeObserver(r);
    return i.observe(t), d.current.forEach((o) => i.observe(o)), () => i.disconnect();
  }, [s, c]), /* @__PURE__ */ e("div", { ref: f, className: "mtx-pointer-events-none mtx-absolute mtx-inset-0 mtx-z-20", children: s.map(({ marker: t, left: r }) => {
    const i = String(t.id);
    return /* @__PURE__ */ n(m.Fragment, { children: [
      /* @__PURE__ */ e(
        "div",
        {
          className: y(
            "mtx-absolute mtx-inset-y-0 mtx-w-0.5 -mtx-translate-x-1/2 mtx-border mtx-border-dashed mtx-border-l",
            t.lineClassName
          ),
          style: { left: `${r}%`, borderColor: t.color },
          "aria-hidden": "true"
        }
      ),
      c ? /* @__PURE__ */ n(me, { children: [
        /* @__PURE__ */ e(
          "div",
          {
            ref: (o) => {
              o ? h.current.set(i, o) : h.current.delete(i);
            },
            className: y(
              "mtx-absolute mtx-z-20 mtx-h-2 mtx-w-2 -mtx-translate-x-1/2 mtx-rotate-45 mtx-border mtx-border-gray-0",
              t.diamondClassName
            ),
            style: { left: `${r}%`, top: z + 8, backgroundColor: t.color },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ e(
          "div",
          {
            ref: (o) => {
              o ? d.current.set(i, o) : d.current.delete(i);
            },
            className: y(
              "mtx-absolute mtx-z-20 mtx-max-w-48 mtx-truncate mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-bg-gray-0 mtx-px-2 mtx-py-0.5 mtx-text-xs mtx-font-semibold mtx-shadow-card",
              t.labelClassName
            ),
            style: { left: `calc(${r}% + ${D}px)`, top: z, borderColor: t.color, color: t.color },
            title: typeof t.label == "string" ? t.label : void 0,
            role: "note",
            children: t.label
          }
        )
      ] }) : null
    ] }, t.id);
  }) });
}, B = ({ intervals: s, highlightedDate: c }) => /* @__PURE__ */ e(
  "div",
  {
    "aria-hidden": "true",
    className: "mtx-pointer-events-none mtx-absolute mtx-inset-0 mtx-grid",
    style: { gridTemplateColumns: `repeat(${s.length}, minmax(0, 1fr))` },
    children: s.map((f, d) => /* @__PURE__ */ e(
      "div",
      {
        className: y(
          "mtx-border-l mtx-border-gray-200",
          d === s.length - 1 && "mtx-border-r",
          I(f, c) && "mtx-bg-gray-50"
        )
      },
      f.start.toISOString()
    ))
  }
), ye = ({ intervals: s, groups: c, highlightedDate: f, nameColumnHeader: d, nameColumnWidth: h, headerHeight: t }) => /* @__PURE__ */ n("div", { className: "mtx-bg-primary-50", role: "rowgroup", children: [
  /* @__PURE__ */ n(
    "div",
    {
      className: "mtx-grid mtx-border-b mtx-border-gray-200",
      style: { gridTemplateColumns: `${h}px repeat(${s.length}, minmax(0, 1fr))`, height: t / 2 },
      role: "row",
      children: [
        /* @__PURE__ */ e(
          "div",
          {
            className: "mtx-sticky mtx-left-0 mtx-z-20 mtx-flex mtx-items-center mtx-border-b mtx-border-r mtx-border-gray-200 mtx-bg-primary-50 mtx-px-4 mtx-text-xs mtx-font-semibold mtx-text-text-500",
            style: { gridColumn: 1, height: t },
            role: "columnheader",
            "aria-colindex": 1,
            "aria-rowspan": 2,
            children: d
          }
        ),
        c.map((r) => /* @__PURE__ */ e(
          "div",
          {
            className: "mtx-flex mtx-items-center mtx-justify-center mtx-border-l mtx-border-gray-200 mtx-text-xs mtx-font-medium mtx-text-text-500 mtx-text-center",
            style: { gridColumn: `${r.startIndex + 2} / span ${r.intervalCount}`, paddingBottom: t / 2 },
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
  /* @__PURE__ */ n(
    "div",
    {
      className: "mtx-grid",
      style: { gridTemplateColumns: `${h}px repeat(${s.length}, minmax(0, 1fr))`, height: t / 2 },
      role: "row",
      children: [
        /* @__PURE__ */ e("div", { "aria-hidden": "true" }),
        s.map((r, i) => /* @__PURE__ */ e(
          "div",
          {
            className: y(
              "mtx-flex mtx-items-center mtx-justify-center mtx-border-l mtx-border-gray-200 mtx-px-2 mtx-text-center mtx-text-xs mtx-font-medium mtx-text-text-500",
              I(r, f) && "mtx-bg-primary-100 mtx-font-semibold"
            ),
            role: "columnheader",
            "aria-colindex": i + 2,
            children: r.label
          },
          r.start.toISOString()
        ))
      ]
    }
  )
] }), ve = m.forwardRef(
  ({
    items: s,
    view: c,
    defaultView: f = "quarter",
    views: d = ["week", "month", "quarter"],
    viewLabels: h,
    onViewChange: t,
    startDate: r,
    endDate: i,
    markers: o = [],
    highlightedDate: $,
    locale: v = "en-US",
    nameColumnWidth: a = 320,
    minRowHeight: x = 56,
    headerHeight: N = 64,
    cellWidths: g,
    nameColumnHeader: w = "Name",
    addItemLabel: R = "New item",
    onAddItem: u,
    onRefresh: V,
    showFullscreen: j = !0,
    toolbarActions: H,
    renderItem: k,
    renderBar: P,
    formatDateRange: K,
    className: U,
    "aria-label": G = "Gantt chart",
    ...Q
  }, J) => {
    const L = m.useRef(null), [X, Y] = m.useState(!1), [Z, ee] = m.useState(f), E = c ?? Z, C = m.useMemo(() => xe(s, r, i), [i, s, r]), p = m.useMemo(() => ce(C.start, C.end, E, v), [E, v, C.end, C.start]), _ = m.useMemo(() => $ === null ? null : W($ ?? /* @__PURE__ */ new Date()), [$]), te = { ...he, ...h }, O = m.useMemo(
      () => o.flatMap((l) => {
        const M = W(l.date), b = M ? de(M, p.intervals) : null;
        return b === null ? [] : [{ marker: l, left: b }];
      }),
      [o, p.intervals]
    ), re = g?.[E] ?? ge[E], F = p.intervals.length * re, le = a + F, ne = m.useCallback((l) => {
      L.current = l, l && typeof document < "u" && Y(
        document.fullscreenEnabled !== !1 && typeof l.requestFullscreen == "function" && typeof document.exitFullscreen == "function"
      );
    }, []);
    m.useImperativeHandle(J, () => L.current);
    const se = (l) => {
      c === void 0 && ee(l), t?.(l);
    }, ae = () => {
      !L.current || typeof document > "u" || (document.fullscreenElement === L.current ? document.exitFullscreen().catch(() => {
      }) : L.current.requestFullscreen().catch(() => {
      }));
    };
    return /* @__PURE__ */ n(
      "div",
      {
        ref: ne,
        className: y("mtx-overflow-hidden mtx-rounded-lg mtx-border mtx-border-gray-200 mtx-bg-gray-0 mtx-[font-family:DMSans]", U),
        "aria-label": G,
        ...Q,
        children: [
          /* @__PURE__ */ e(
            ie,
            {
              activeView: E,
              views: d,
              viewLabels: te,
              onViewChange: se,
              onRefresh: V,
              onToggleFullscreen: j && X ? ae : void 0,
              toolbarActions: H
            }
          ),
          /* @__PURE__ */ e("div", { className: "mtx-overflow-auto", children: /* @__PURE__ */ n("div", { style: { minWidth: le }, role: "table", "aria-label": G, children: [
            /* @__PURE__ */ e(
              ye,
              {
                intervals: p.intervals,
                groups: p.groups,
                highlightedDate: _,
                nameColumnHeader: w,
                nameColumnWidth: a,
                headerHeight: N
              }
            ),
            u ? /* @__PURE__ */ n("div", { className: "mtx-grid", style: { gridTemplateColumns: `${a}px minmax(${F}px, 1fr)` }, role: "row", children: [
              /* @__PURE__ */ e(
                "div",
                {
                  className: "mtx-sticky mtx-left-0 mtx-z-30 mtx-flex mtx-items-center mtx-border-b mtx-border-r mtx-border-gray-200 mtx-bg-gray-0 mtx-px-2",
                  style: { minHeight: x },
                  role: "cell",
                  children: /* @__PURE__ */ n(
                    "button",
                    {
                      type: "button",
                      className: "mtx-inline-flex mtx-items-center mtx-gap-2 mtx-text-xs mtx-font-medium mtx-text-primary hover:mtx-text-primary-700 focus-visible:mtx-outline-none focus-visible:mtx-ring focus-visible:mtx-ring-primary-300",
                      onClick: u,
                      children: [
                        /* @__PURE__ */ e(oe, { className: "mtx-h-4 mtx-w-4" }),
                        R
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ n("div", { className: "mtx-relative mtx-border-b mtx-border-gray-200", style: { minHeight: x }, role: "cell", children: [
                /* @__PURE__ */ e(B, { intervals: p.intervals, highlightedDate: _ }),
                /* @__PURE__ */ e(q, { markers: O, showLabels: !0 })
              ] })
            ] }) : null,
            /* @__PURE__ */ e("div", { role: "rowgroup", children: s.map((l, M) => {
              const b = ue(l.progress), T = fe(l, p.intervals), A = K?.(l) ?? be(l, v);
              return /* @__PURE__ */ n(
                "div",
                {
                  className: "mtx-grid",
                  style: { gridTemplateColumns: `${a}px minmax(${F}px, 1fr)` },
                  role: "row",
                  children: [
                    /* @__PURE__ */ e(
                      "div",
                      {
                        className: "mtx-sticky mtx-left-0 mtx-z-30 mtx-flex mtx-items-center mtx-border-b mtx-border-r mtx-border-gray-200 mtx-bg-gray-0 mtx-px-2",
                        style: { minHeight: x },
                        role: "rowheader",
                        children: k ? k({ item: l, formattedDateRange: A }) : /* @__PURE__ */ n("div", { className: "mtx-flex mtx-w-full mtx-min-w-0 mtx-items-center mtx-justify-between mtx-gap-3", children: [
                          /* @__PURE__ */ e("span", { className: "mtx-truncate mtx-text-xs mtx-font-semibold mtx-text-text-500", children: l.name }),
                          /* @__PURE__ */ e("span", { className: "mtx-shrink-0 mtx-text-xs mtx-text-text-300", children: A })
                        ] })
                      }
                    ),
                    /* @__PURE__ */ n("div", { className: "mtx-relative mtx-border-b mtx-border-gray-200", style: { minHeight: x }, role: "cell", children: [
                      /* @__PURE__ */ e(B, { intervals: p.intervals, highlightedDate: _ }),
                      /* @__PURE__ */ e(q, { markers: O, showLabels: !u && M === 0 }),
                      T && T.width > 0 ? /* @__PURE__ */ n(
                        "div",
                        {
                          className: y(
                            "mtx-absolute mtx-top-1/2 mtx-z-10 mtx-h-6 -mtx-translate-y-1/2 mtx-overflow-hidden mtx-rounded mtx-border-r-2 mtx-border-secondary-800 mtx-bg-secondary-200",
                            l.barClassName
                          ),
                          style: { left: `${T.left}%`, width: `${T.width}%` },
                          title: `${A}, ${b}% complete`,
                          role: "progressbar",
                          "aria-valuemin": 0,
                          "aria-valuemax": 100,
                          "aria-valuenow": b,
                          children: [
                            /* @__PURE__ */ e(
                              "div",
                              {
                                className: y("mtx-h-full mtx-bg-secondary-500", l.progressClassName),
                                style: { width: `${b}%` },
                                "aria-hidden": "true"
                              }
                            ),
                            /* @__PURE__ */ e(
                              "div",
                              {
                                className: "mtx-absolute mtx-top-1/2 mtx-min-w-max -mtx-translate-x-1/2 -mtx-translate-y-1/2 mtx-text-center mtx-text-xs mtx-text-text-600",
                                style: { left: `clamp(3rem, ${b / 2}%, calc(100% - 3rem))` },
                                children: P ? P({ item: l, progress: b }) : /* @__PURE__ */ n("div", { className: "mtx-flex mtx-items-center mtx-gap-0.5", children: [
                                  /* @__PURE__ */ e("span", { className: "mtx-block", children: "Progress" }),
                                  /* @__PURE__ */ n("strong", { className: "mtx-block mtx-text-xs", children: [
                                    b,
                                    "%"
                                  ] })
                                ] })
                              }
                            )
                          ]
                        }
                      ) : null
                    ] })
                  ]
                },
                l.id
              );
            }) })
          ] }) })
        ]
      }
    );
  }
);
ve.displayName = "GanttChart";
export {
  ve as GanttChart
};
//# sourceMappingURL=ganttchart.es.js.map
