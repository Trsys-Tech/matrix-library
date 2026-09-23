import { jsxs as a, jsx as e, Fragment as B } from "react/jsx-runtime";
import k, { useMemo as b } from "react";
import { cn as f } from "./utils.es.js";
import { Skeleton as r } from "./skeleton.es.js";
const $ = ({ item: m, color: d, size: x }) => {
  const s = m.status ?? "pending";
  return /* @__PURE__ */ a(
    "span",
    {
      className: "mtx-block mtx-size-5 data-[size=sm]:mtx-size-4 data-[size=lg]:mtx-size-6",
      "data-size": x,
      "data-status": s,
      style: { color: d },
      children: [
        /* @__PURE__ */ a(
          "svg",
          {
            viewBox: "0 0 24 24",
            "aria-hidden": "true",
            focusable: "false",
            className: "mtx-block mtx-size-full mtx-fill-none mtx-stroke-current mtx-stroke-[1.25] mtx-stroke-linecap-round mtx-stroke-linejoin-round",
            children: [
              /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "10.5", className: "mtx-fill-background" }),
              s === "completed" && /* @__PURE__ */ e("path", { d: "m7 12 3 3 7-7" }),
              s === "error" && /* @__PURE__ */ e("path", { d: "m8 8 8 8m0-8-8 8" }),
              s === "active" && /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "6", fill: "currentColor", stroke: "none" })
            ]
          }
        ),
        /* @__PURE__ */ e("span", { className: "mtx-sr-only", children: m.statusLabel ?? s })
      ]
    }
  );
}, D = ({ items: m, visibleBranches: d, superRow: x, markerRow: s, size: g }) => {
  const z = b(() => g === "sm" ? "M1" : g === "lg" ? "M3" : "M2", [g]);
  return /* @__PURE__ */ a(B, { children: [
    m.map((n, i) => /* @__PURE__ */ a(
      "li",
      {
        className: "mtx-relative mtx-grid mtx-min-w-0 mtx-row-span-full mtx-grid-rows-[subgrid]",
        style: { gridColumn: i + 1 },
        "aria-hidden": "true",
        "data-slot": "timeline-skeleton-item",
        children: [
          /* @__PURE__ */ a("div", { className: "mtx-min-h-8 mtx-self-end mtx-pb-2 mtx-pt-1 mtx-pr-3", style: { gridRow: x }, children: [
            /* @__PURE__ */ e(r, { "aria-hidden": "true", className: "mtx-h-3 mtx-w-14" }),
            /* @__PURE__ */ e(r, { "aria-hidden": "true", className: "mtx-h-2 mtx-w-16 mtx-mt-1" })
          ] }),
          i > 0 && /* @__PURE__ */ e(
            "span",
            {
              className: "mtx-absolute mtx-top-2.5 group-data-[size=sm]:mtx-top-2 group-data-[size=lg]:mtx-top-3 mtx-w-[calc(100%-20px)] mtx-left-[calc(-100%+20px)] group-data-[size=sm]:mtx-w-[calc(100%-16px)] group-data-[size=sm]:mtx-left-[calc(-100%+16px)] group-data-[size=lg]:mtx-w-[calc(100%-24px)] group-data-[size=lg]:mtx-left-[calc(-100%+24px)] mtx-z-10 mtx-h-0.5 mtx-bg-primary/10 mtx-animate-pulse",
              style: { gridRow: s }
            }
          ),
          /* @__PURE__ */ e(
            r,
            {
              className: "mtx-z-20 mtx-rounded-full mtx-size-5 group-data-[size=sm]:mtx-size-4 group-data-[size=lg]:mtx-size-6",
              style: { gridRow: s },
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ a("div", { className: "mtx-pt-1 mtx-pr-3", style: { gridRow: s + 1 }, children: [
            /* @__PURE__ */ e(r, { "aria-hidden": "true", className: "mtx-h-2 mtx-w-16" }),
            /* @__PURE__ */ e(r, { "aria-hidden": "true", className: "mtx-h-2 mtx-w-12 mtx-mt-1" })
          ] }),
          /* @__PURE__ */ e("div", { className: "mtx-pr-3 mtx-pt-5", style: { gridRow: s + 2 }, children: /* @__PURE__ */ e(r, { "aria-hidden": "true", className: "mtx-h-2 mtx-w-16" }) })
        ]
      },
      `skeleton-item-${n.id}`
    )),
    d.map(({ branch: n, index: i }, u) => /* @__PURE__ */ a(
      "li",
      {
        className: "mtx-pointer-events-none mtx-grid mtx-min-w-0 mtx-row-span-full mtx-grid-cols-[subgrid] mtx-grid-rows-[subgrid]",
        style: { gridColumn: `${i + 1} / -1` },
        "aria-hidden": "true",
        "data-slot": "timeline-skeleton-branch",
        children: [
          /* @__PURE__ */ a("div", { className: "mtx-col-[-2_/_-1] mtx-self-end mtx-pb-2", style: { gridRow: u * 2 + 1 }, children: [
            /* @__PURE__ */ e(r, { "aria-hidden": "true", className: "mtx-h-3 mtx-w-14" }),
            /* @__PURE__ */ e(r, { "aria-hidden": "true", className: "mtx-h-2 mtx-w-16 mtx-mt-1" }),
            /* @__PURE__ */ e(r, { "aria-hidden": "true", className: "mtx-h-2 mtx-w-16 mtx-mt-1" })
          ] }),
          /* @__PURE__ */ e(
            "div",
            {
              className: "mtx-relative mtx-col-[1_/_-1] mtx-mb-[9px] group-data-[size=sm]:mtx-mb-[7px] group-data-[size=lg]:mtx-mb-[11px] mtx-ml-3 mtx-mt-2.5 group-data-[size=sm]:mtx-mt-2 group-data-[size=lg]:mtx-mt-3 mtx-overflow-visible mtx-fill-none mtx-stroke-2 mtx-stroke-current mtx-z-[-1]",
              style: {
                gridRow: `${u * 2 + 2} / ${s + 1}`,
                width: `calc(100% - 100% / ${m.length - i})`,
                color: "oklch(var(--mtx-primary) / 0.1)"
              },
              children: /* @__PURE__ */ e("svg", { focusable: "false", viewBox: "0 0 100 100", preserveAspectRatio: "none", className: "mtx-absolute mtx-size-full mtx-overflow-visible", children: /* @__PURE__ */ e(
                "path",
                {
                  d: `${z} 100 H${45 / (m.length - i - 1)} L${80 / (m.length - i - 1)} 0 H97`,
                  vectorEffect: "non-scaling-stroke"
                }
              ) })
            }
          ),
          /* @__PURE__ */ e(
            r,
            {
              className: "mtx-col-[-2_/_-1] mtx-z-[2] mtx-rounded-full mtx-size-5 group-data-[size=sm]:mtx-size-4 group-data-[size=lg]:mtx-size-6",
              style: { gridRow: u * 2 + 2 },
              "aria-hidden": "true"
            }
          )
        ]
      },
      `skeleton-branch-${n.id}`
    ))
  ] });
}, H = k.forwardRef(
  ({
    items: m,
    branches: d = [],
    title: x,
    loading: s = !1,
    activeColor: g,
    completedColor: z,
    errorColor: n,
    inactiveColor: i,
    minItemWidth: u = 112,
    size: c = "md",
    className: R,
    style: _,
    ...T
  }, C) => {
    const N = k.useId(), v = b(
      () => d.flatMap((t) => {
        const l = m.findIndex((o) => o.id === t.from);
        return l >= 0 && l < m.length - 1 ? [{ branch: t, index: l }] : [];
      }),
      [d, m]
    ), w = v.length * 2 + 1, p = w + 1, y = (t) => t.color ?? `var(--timeline-${t.status ?? "pending"})`, M = {
      "--timeline-active": g ?? "oklch(var(--mtx-primary))",
      "--timeline-completed": z ?? "oklch(var(--mtx-success))",
      "--timeline-error": n ?? "oklch(var(--mtx-danger))",
      "--timeline-pending": i ?? "oklch(var(--mtx-gray-400))",
      ..._
    }, S = b(() => {
      const t = v.length;
      switch (c) {
        case "sm":
          return `${"auto 16px ".repeat(t)}auto 16px auto auto`;
        case "lg":
          return `${"auto 24px ".repeat(t)}auto 24px auto auto`;
        default:
          return `${"auto 20px ".repeat(t)}auto 20px auto auto`;
      }
    }, [c, v.length]);
    return /* @__PURE__ */ a(
      "div",
      {
        ...T,
        ref: C,
        className: f("mtx-group mtx-text-foreground mtx-text-xs data-[size=sm]:mtx-text-ss data-[size=lg]:mtx-text-sm", R),
        "data-size": c,
        style: M,
        "aria-busy": s || void 0,
        children: [
          x != null && /* @__PURE__ */ e("div", { id: N, className: "mtx-mb-4 mtx-text-sm group-data-[size=sm]:mtx-text-xs group-data-[size=lg]:mtx-text-lg mtx-font-bold", children: x }),
          /* @__PURE__ */ e(
            "div",
            {
              className: "mtx-overflow-x-auto mtx-p-0.5 focus-visible:mtx-outline-2 focus-visible:mtx-outline-offset-2 focus-visible:mtx-outline-[var(--timeline-active)]",
              role: "region",
              "aria-label": "Timeline",
              tabIndex: 0,
              children: /* @__PURE__ */ a(
                "ol",
                {
                  className: "mtx-m-0 mtx-grid mtx-list-none mtx-isolate mtx-p-0",
                  "aria-labelledby": x != null ? N : void 0,
                  "aria-label": x == null ? "Timeline steps" : void 0,
                  "data-loading": s || void 0,
                  style: {
                    gridTemplateColumns: `repeat(${Math.max(1, m.length)}, minmax(0, 1fr))`,
                    gridTemplateRows: S,
                    minWidth: m.length * (Number.isFinite(u) ? Math.max(48, u) : 112)
                  },
                  children: [
                    s && /* @__PURE__ */ e(D, { items: m, visibleBranches: v, superRow: w, markerRow: p, size: c }),
                    !s && m.map((t, l) => {
                      const o = m[l - 1], h = t.connectorColor === !1 ? void 0 : t.connectorColor ?? (o?.status === "completed" && t.status !== "pending" && t.status !== void 0 ? y(o) : void 0);
                      return /* @__PURE__ */ a(
                        "li",
                        {
                          className: "mtx-relative mtx-grid mtx-min-w-0 mtx-row-span-full mtx-grid-rows-[subgrid] ",
                          style: { gridColumn: l + 1 },
                          "aria-current": t.status === "active" ? "step" : void 0,
                          children: [
                            /* @__PURE__ */ a(
                              "div",
                              {
                                className: "mtx-min-h-8 mtx-break-words mtx-self-end mtx-pb-2 mtx-mt-1 mtx-pr-3 mtx-text-ss group-data-[size=sm]:mtx-text-[0.5rem] group-data-[size=sm]:mtx-leading-3 group-data-[size=lg]:mtx-text-xs mtx-text-muted-foreground empty:mtx-p-0",
                                style: { gridRow: w },
                                children: [
                                  t.superTitle != null && /* @__PURE__ */ e("div", { children: t.superTitle }),
                                  t.superSubtitle != null && /* @__PURE__ */ e("div", { className: "mtx-font-semibold", children: t.superSubtitle })
                                ]
                              }
                            ),
                            l > 0 && /* @__PURE__ */ e(
                              "span",
                              {
                                "aria-hidden": "true",
                                className: "mtx-absolute mtx-top-2.5 group-data-[size=sm]:mtx-top-2 group-data-[size=lg]:mtx-top-3 mtx-left-[calc(-100%+12px)] mtx-z-10 mtx-h-0.5 mtx-w-full mtx-bg-[var(--timeline-pending)]",
                                style: { gridRow: p, backgroundColor: h }
                              }
                            ),
                            /* @__PURE__ */ e(
                              "div",
                              {
                                className: "mtx-z-20 mtx-size-5 group-data-[size=sm]:mtx-size-4 group-data-[size=lg]:mtx-size-6",
                                style: { gridRow: p },
                                children: /* @__PURE__ */ e($, { item: t, color: y(t), size: c })
                              }
                            ),
                            /* @__PURE__ */ a("div", { className: "mtx-break-words mtx-pt-1 mtx-pr-3 mtx-leading-[1.4]", style: { gridRow: p + 1 }, children: [
                              /* @__PURE__ */ e("div", { className: f("mtx-font-medium", (t.status ?? "pending") === "pending" && "mtx-text-text-400"), children: t.label }),
                              t.subData != null && /* @__PURE__ */ e("div", { className: "mtx-mt-0.5 mtx-text-ss group-data-[size=sm]:mtx-text-[0.5rem] group-data-[size=sm]:mtx-leading-3 group-data-[size=lg]:mtx-text-xs", children: t.subData })
                            ] }),
                            /* @__PURE__ */ e(
                              "div",
                              {
                                className: "mtx-break-words mtx-pr-3 mtx-pt-5 mtx-text-ss group-data-[size=sm]:mtx-text-[0.5rem] group-data-[size=sm]:mtx-leading-3 group-data-[size=lg]:mtx-text-xs mtx-font-medium mtx-text-muted-foreground empty:mtx-p-0",
                                style: { gridRow: p + 2 },
                                children: t.footer
                              }
                            )
                          ]
                        },
                        t.id
                      );
                    }),
                    !s && v.map(({ branch: t, index: l }, o) => {
                      const h = t.active ? t.activeColor ?? t.color ?? n ?? "var(--timeline-error)" : "var(--timeline-pending)";
                      return /* @__PURE__ */ a(
                        "li",
                        {
                          className: f(
                            "mtx-pointer-events-none mtx-grid mtx-min-w-0 mtx-row-span-full mtx-grid-cols-[subgrid] mtx-grid-rows-[subgrid]",
                            t.active && "mtx-z-10"
                          ),
                          "data-active": t.active || void 0,
                          style: { gridColumn: `${l + 1} / -1` },
                          "aria-current": t.status === "active" ? "step" : void 0,
                          children: [
                            /* @__PURE__ */ a("span", { className: "mtx-sr-only", children: [
                              "Branch from ",
                              m[l].label,
                              ": "
                            ] }),
                            /* @__PURE__ */ a(
                              "div",
                              {
                                className: "mtx-pointer-events-auto mtx-col-[-2_/_-1] mtx-self-end mtx-break-words mtx-pb-2",
                                style: { gridRow: o * 2 + 1, color: t.active ? h : void 0 },
                                children: [
                                  t.superTitle != null && /* @__PURE__ */ e("div", { className: "mtx-break-words mtx-text-ss group-data-[size=sm]:mtx-text-[0.5rem] group-data-[size=sm]:mtx-leading-3 group-data-[size=lg]:mtx-text-xs mtx-text-muted-foreground", children: t.superTitle }),
                                  t.superSubtitle != null && /* @__PURE__ */ e("div", { className: "mtx-break-words mtx-pb-2 mtx-pr-3 mtx-text-ss group-data-[size=sm]:mtx-text-[0.5rem] group-data-[size=sm]:mtx-leading-3 group-data-[size=lg]:mtx-text-xs mtx-font-semibold mtx-text-muted-foreground", children: t.superSubtitle }),
                                  /* @__PURE__ */ e("div", { className: f("mtx-font-medium", (t.status ?? "pending") === "pending" && "mtx-text-text-400"), children: t.label }),
                                  t.subData != null && /* @__PURE__ */ e("div", { className: "mtx-mt-0.5 mtx-text-ss group-data-[size=sm]:mtx-text-[0.5rem] group-data-[size=sm]:mtx-leading-3 group-data-[size=lg]:mtx-text-xs", children: t.subData }),
                                  t.footer != null && /* @__PURE__ */ e("div", { className: "mtx-break-words mtx-pr-3 mtx-pt-1 mtx-text-ss group-data-[size=sm]:mtx-text-[0.5rem] group-data-[size=sm]:mtx-leading-3 group-data-[size=lg]:mtx-text-xs mtx-font-bold mtx-text-muted-foreground", children: t.footer })
                                ]
                              }
                            ),
                            /* @__PURE__ */ e(
                              "div",
                              {
                                className: "mtx-relative mtx-col-[1_/_-1] mtx-mb-[9px] group-data-[size=sm]:mtx-mb-[7px] group-data-[size=lg]:mtx-mb-[11px] mtx-ml-3 mtx-mt-2.5 group-data-[size=sm]:mtx-mt-2 group-data-[size=lg]:mtx-mt-3 mtx-overflow-visible mtx-fill-none mtx-stroke-2 mtx-stroke-current mtx-z-[-1]",
                                "aria-hidden": "true",
                                style: {
                                  gridRow: `${o * 2 + 2} / ${p + 1}`,
                                  width: `calc(100% - 100% / ${m.length - l})`,
                                  color: h
                                },
                                children: /* @__PURE__ */ e(
                                  "svg",
                                  {
                                    focusable: "false",
                                    viewBox: "0 0 100 100",
                                    preserveAspectRatio: "none",
                                    className: "mtx-absolute mtx-size-full mtx-overflow-visible",
                                    children: /* @__PURE__ */ e(
                                      "path",
                                      {
                                        d: `M0 100 H${45 / (m.length - l - 1)} L${80 / (m.length - l - 1)} 0 H100`,
                                        vectorEffect: "non-scaling-stroke"
                                      }
                                    )
                                  }
                                )
                              }
                            ),
                            /* @__PURE__ */ e(
                              "div",
                              {
                                className: "mtx-col-[-2_/_-1] mtx-z-[2] mtx-size-5 group-data-[size=sm]:mtx-size-4 group-data-[size=lg]:mtx-size-6",
                                style: { gridRow: o * 2 + 2 },
                                children: /* @__PURE__ */ e($, { item: t, color: h, size: c })
                              }
                            )
                          ]
                        },
                        `branch-${t.id}`
                      );
                    })
                  ]
                }
              )
            }
          )
        ]
      }
    );
  }
);
H.displayName = "Timeline";
export {
  H as Timeline
};
//# sourceMappingURL=timeline.es.js.map
