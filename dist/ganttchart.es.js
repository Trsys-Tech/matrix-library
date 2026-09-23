import { jsxs as l, jsx as t, Fragment as V } from "react/jsx-runtime";
import a from "react";
import { Plus as me } from "@trsys-tech/matrix-icons";
import { cn as v } from "./utils.es.js";
import { GanttToolbar as oe } from "./gantttoolbar.es.js";
import { getTimelineRange as ie, createTimeline as xe, toDate as W, getMarkerPosition as ce, clampProgress as de, getBarPosition as ue, formatDateRange as fe, includesDate as j } from "./gantt-chart.es.js";
const be = {
  week: "Weeks",
  month: "Month",
  quarter: "Quarter"
}, he = {
  week: 72,
  month: 120,
  quarter: 220
}, S = 8, D = 12, k = 4, ge = 30, q = ({ markers: n, showLabels: c = !1 }) => {
  const u = a.useRef(null), d = a.useRef(/* @__PURE__ */ new Map()), b = a.useRef(/* @__PURE__ */ new Map());
  return a.useEffect(() => {
    const e = u.current;
    if (!e || !c) return;
    const i = () => {
      const m = e.clientWidth, $ = n.flatMap(({ marker: s, left: o }) => {
        const w = String(s.id), h = d.current.get(w);
        if (!h) return [];
        const R = o / 100 * m, g = h.offsetWidth;
        let p = R + D;
        return p + g > m - S && (p = R - g - D), p = Math.max(S, Math.min(p, m - g - S)), [{ key: w, label: h, labelLeft: p, labelRight: p + g }];
      }), N = [];
      $.sort((s, o) => s.labelLeft - o.labelLeft).forEach((s) => {
        let o = N.findIndex((R) => R + S <= s.labelLeft);
        o === -1 && (o = N.length), N[o] = s.labelRight;
        const w = k + o * ge;
        s.label.style.left = `${s.labelLeft}px`, s.label.style.top = `${w}px`;
        const h = b.current.get(s.key);
        h && (h.style.top = `${w + 8}px`);
      });
    };
    if (i(), typeof ResizeObserver > "u") return;
    const x = new ResizeObserver(i);
    return x.observe(e), d.current.forEach((m) => x.observe(m)), () => x.disconnect();
  }, [n, c]), /* @__PURE__ */ t("div", { ref: u, className: "mtx-pointer-events-none mtx-absolute mtx-inset-0 mtx-z-20", children: n.map(({ marker: e, left: i }) => {
    const x = String(e.id);
    return /* @__PURE__ */ l(a.Fragment, { children: [
      /* @__PURE__ */ t(
        "div",
        {
          className: v("mtx-absolute mtx-inset-y-0 mtx-w-0.5 -mtx-translate-x-1/2", e.lineClassName),
          style: { left: `${i}%`, backgroundColor: e.color },
          "aria-hidden": "true"
        }
      ),
      c ? /* @__PURE__ */ l(V, { children: [
        /* @__PURE__ */ t(
          "div",
          {
            ref: (m) => {
              m ? b.current.set(x, m) : b.current.delete(x);
            },
            className: v(
              "mtx-absolute mtx-z-20 mtx-h-2 mtx-w-2 -mtx-translate-x-1/2 mtx-rotate-45 mtx-border mtx-border-gray-0",
              e.diamondClassName
            ),
            style: { left: `${i}%`, top: k + 8, backgroundColor: e.color },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            ref: (m) => {
              m ? d.current.set(x, m) : d.current.delete(x);
            },
            className: v(
              "mtx-absolute mtx-z-20 mtx-max-w-48 mtx-truncate mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-bg-gray-0 mtx-px-2 mtx-py-1 mtx-text-xs mtx-font-semibold mtx-shadow-card",
              e.labelClassName
            ),
            style: { left: `calc(${i}% + ${D}px)`, top: k, borderColor: e.color, color: e.color },
            title: typeof e.label == "string" ? e.label : void 0,
            role: "note",
            children: e.label
          }
        )
      ] }) : null
    ] }, e.id);
  }) });
}, I = ({ intervals: n, highlightedDate: c }) => /* @__PURE__ */ t(
  "div",
  {
    "aria-hidden": "true",
    className: "mtx-pointer-events-none mtx-absolute mtx-inset-0 mtx-grid",
    style: { gridTemplateColumns: `repeat(${n.length}, minmax(0, 1fr))` },
    children: n.map((u, d) => /* @__PURE__ */ t(
      "div",
      {
        className: v(
          "mtx-border-l mtx-border-gray-200",
          d === n.length - 1 && "mtx-border-r",
          j(u, c) && "mtx-bg-gray-50"
        )
      },
      u.start.toISOString()
    ))
  }
), pe = ({ intervals: n, groups: c, highlightedDate: u, nameColumnHeader: d, nameColumnWidth: b }) => /* @__PURE__ */ l("div", { className: "mtx-bg-primary-50", role: "rowgroup", children: [
  /* @__PURE__ */ l(
    "div",
    {
      className: "mtx-grid mtx-h-9 mtx-border-b mtx-border-gray-200",
      style: { gridTemplateColumns: `${b}px repeat(${n.length}, minmax(0, 1fr))` },
      role: "row",
      children: [
        /* @__PURE__ */ t(
          "div",
          {
            className: "mtx-sticky mtx-left-0 mtx-z-20 mtx-flex mtx-items-center mtx-border-b mtx-border-r mtx-border-gray-200 mtx-bg-primary-50 mtx-px-4 mtx-text-sm mtx-font-semibold mtx-text-text-500",
            style: { gridColumn: 1, height: 80 },
            role: "columnheader",
            "aria-colindex": 1,
            "aria-rowspan": 2,
            children: d
          }
        ),
        c.map((e) => /* @__PURE__ */ t(
          "div",
          {
            className: "mtx-flex mtx-items-start mtx-justify-center mtx-py-1.5 mtx-border-l mtx-border-gray-200 mtx-text-sm mtx-font-medium mtx-text-text-500",
            style: { gridColumn: `${e.startIndex + 2} / span ${e.intervalCount}` },
            role: "columnheader",
            "aria-colindex": e.startIndex + 2,
            "aria-colspan": e.intervalCount,
            children: e.label
          },
          e.key
        ))
      ]
    }
  ),
  /* @__PURE__ */ l("div", { className: "mtx-grid mtx-h-11", style: { gridTemplateColumns: `${b}px repeat(${n.length}, minmax(0, 1fr))` }, role: "row", children: [
    /* @__PURE__ */ t("div", { "aria-hidden": "true" }),
    n.map((e, i) => /* @__PURE__ */ t(
      "div",
      {
        className: v(
          "mtx-flex mtx-items-center mtx-justify-center mtx-border-l mtx-border-gray-200 mtx-px-2 mtx-text-center mtx-text-xs mtx-font-medium mtx-text-text-500",
          j(e, u) && "mtx-bg-primary-100 mtx-font-semibold"
        ),
        role: "columnheader",
        "aria-colindex": i + 2,
        children: e.label
      },
      e.start.toISOString()
    ))
  ] })
] }), ye = a.forwardRef(
  ({
    items: n,
    view: c,
    defaultView: u = "quarter",
    views: d = ["week", "month", "quarter"],
    viewLabels: b,
    onViewChange: e,
    startDate: i,
    endDate: x,
    markers: m = [],
    highlightedDate: $,
    locale: N = "en-US",
    nameColumnWidth: s = 320,
    rowHeight: o = 64,
    cellWidths: w,
    nameColumnHeader: h = "Name",
    addItemLabel: R = "New item",
    onAddItem: g,
    onRefresh: p,
    showFullscreen: B = !0,
    toolbarActions: K,
    renderItem: z,
    renderBar: P,
    formatDateRange: U,
    className: H,
    "aria-label": G = "Gantt chart",
    ...Q
  }, J) => {
    const L = a.useRef(null), [X, Y] = a.useState(!1), [Z, ee] = a.useState(u), E = c ?? Z, C = a.useMemo(() => ie(n, i, x), [x, n, i]), y = a.useMemo(() => xe(C.start, C.end, E, N), [E, N, C.end, C.start]), _ = a.useMemo(() => $ === null ? null : W($ ?? /* @__PURE__ */ new Date()), [$]), te = { ...be, ...b }, O = a.useMemo(
      () => m.flatMap((r) => {
        const M = W(r.date), f = M ? ce(M, y.intervals) : null;
        return f === null ? [] : [{ marker: r, left: f }];
      }),
      [m, y.intervals]
    ), re = w?.[E] ?? he[E], F = y.intervals.length * re, le = s + F, ne = a.useCallback((r) => {
      L.current = r, r && typeof document < "u" && Y(
        document.fullscreenEnabled !== !1 && typeof r.requestFullscreen == "function" && typeof document.exitFullscreen == "function"
      );
    }, []);
    a.useImperativeHandle(J, () => L.current);
    const se = (r) => {
      c === void 0 && ee(r), e?.(r);
    }, ae = () => {
      !L.current || typeof document > "u" || (document.fullscreenElement === L.current ? document.exitFullscreen().catch(() => {
      }) : L.current.requestFullscreen().catch(() => {
      }));
    };
    return /* @__PURE__ */ l(
      "div",
      {
        ref: ne,
        className: v("mtx-overflow-hidden mtx-rounded-lg mtx-border mtx-border-gray-200 mtx-bg-gray-0 mtx-[font-family:DMSans]", H),
        "aria-label": G,
        ...Q,
        children: [
          /* @__PURE__ */ t(
            oe,
            {
              activeView: E,
              views: d,
              viewLabels: te,
              onViewChange: se,
              onRefresh: p,
              onToggleFullscreen: B && X ? ae : void 0,
              toolbarActions: K
            }
          ),
          /* @__PURE__ */ t("div", { className: "mtx-overflow-auto", children: /* @__PURE__ */ l("div", { style: { minWidth: le }, role: "table", "aria-label": G, children: [
            /* @__PURE__ */ t(
              pe,
              {
                intervals: y.intervals,
                groups: y.groups,
                highlightedDate: _,
                nameColumnHeader: h,
                nameColumnWidth: s
              }
            ),
            g ? /* @__PURE__ */ l("div", { className: "mtx-grid", style: { gridTemplateColumns: `${s}px minmax(${F}px, 1fr)` }, role: "row", children: [
              /* @__PURE__ */ t(
                "div",
                {
                  className: "mtx-sticky mtx-left-0 mtx-z-30 mtx-flex mtx-items-center mtx-border-b mtx-border-r mtx-border-gray-200 mtx-bg-gray-0 mtx-px-2",
                  style: { height: o },
                  role: "cell",
                  children: /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      className: "mtx-inline-flex mtx-items-center mtx-gap-2 mtx-text-sm mtx-font-medium mtx-text-primary hover:mtx-text-primary-700 focus-visible:mtx-outline-none focus-visible:mtx-ring focus-visible:mtx-ring-primary-300",
                      onClick: g,
                      children: [
                        /* @__PURE__ */ t(me, { className: "mtx-h-4 mtx-w-4" }),
                        R
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ l("div", { className: "mtx-relative mtx-border-b mtx-border-gray-200", style: { height: o }, role: "cell", children: [
                /* @__PURE__ */ t(I, { intervals: y.intervals, highlightedDate: _ }),
                /* @__PURE__ */ t(q, { markers: O, showLabels: !0 })
              ] })
            ] }) : null,
            /* @__PURE__ */ t("div", { role: "rowgroup", children: n.map((r, M) => {
              const f = de(r.progress), T = ue(r, y.intervals), A = U?.(r) ?? fe(r, N);
              return /* @__PURE__ */ l(
                "div",
                {
                  className: "mtx-grid",
                  style: { gridTemplateColumns: `${s}px minmax(${F}px, 1fr)` },
                  role: "row",
                  children: [
                    /* @__PURE__ */ t(
                      "div",
                      {
                        className: "mtx-sticky mtx-left-0 mtx-z-30 mtx-flex mtx-items-center mtx-border-b mtx-border-r mtx-border-gray-200 mtx-bg-gray-0 mtx-px-2",
                        style: { height: o },
                        role: "rowheader",
                        children: z ? z({ item: r, formattedDateRange: A }) : /* @__PURE__ */ l("div", { className: "mtx-flex mtx-w-full mtx-min-w-0 mtx-items-center mtx-justify-between mtx-gap-3", children: [
                          /* @__PURE__ */ t("span", { className: "mtx-truncate mtx-text-sm mtx-font-semibold mtx-text-text-500", children: r.name }),
                          /* @__PURE__ */ t("span", { className: "mtx-shrink-0 mtx-text-xs mtx-text-text-300", children: A })
                        ] })
                      }
                    ),
                    /* @__PURE__ */ l("div", { className: "mtx-relative mtx-border-b mtx-border-gray-200", style: { height: o }, role: "cell", children: [
                      /* @__PURE__ */ t(I, { intervals: y.intervals, highlightedDate: _ }),
                      /* @__PURE__ */ t(q, { markers: O, showLabels: !g && M === 0 }),
                      T && T.width > 0 ? /* @__PURE__ */ l(
                        "div",
                        {
                          className: v(
                            "mtx-absolute mtx-top-1/2 mtx-z-10 mtx-h-10 -mtx-translate-y-1/2 mtx-overflow-hidden mtx-rounded mtx-border-r-2 mtx-border-secondary-800 mtx-bg-secondary-200",
                            r.barClassName
                          ),
                          style: { left: `${T.left}%`, width: `${T.width}%` },
                          title: `${A}, ${f}% complete`,
                          role: "progressbar",
                          "aria-valuemin": 0,
                          "aria-valuemax": 100,
                          "aria-valuenow": f,
                          children: [
                            /* @__PURE__ */ t(
                              "div",
                              {
                                className: v("mtx-h-full mtx-bg-secondary-500", r.progressClassName),
                                style: { width: `${f}%` },
                                "aria-hidden": "true"
                              }
                            ),
                            /* @__PURE__ */ t(
                              "div",
                              {
                                className: "mtx-absolute mtx-top-1/2 mtx-min-w-max -mtx-translate-x-1/2 -mtx-translate-y-1/2 mtx-text-center mtx-text-xs mtx-leading-4 mtx-text-text-600",
                                style: { left: `clamp(3rem, ${f / 2}%, calc(100% - 3rem))` },
                                children: P ? P({ item: r, progress: f }) : /* @__PURE__ */ l(V, { children: [
                                  /* @__PURE__ */ t("span", { className: "mtx-block", children: "Progress" }),
                                  /* @__PURE__ */ l("strong", { className: "mtx-block mtx-text-sm", children: [
                                    f,
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
                r.id
              );
            }) })
          ] }) })
        ]
      }
    );
  }
);
ye.displayName = "GanttChart";
export {
  ye as GanttChart
};
//# sourceMappingURL=ganttchart.es.js.map
