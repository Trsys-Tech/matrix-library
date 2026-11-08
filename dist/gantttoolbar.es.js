import { jsxs as l, jsx as t } from "react/jsx-runtime";
import { Refresh as f, ArrowsOutward as u } from "@trsys-tech/matrix-icons";
import { cn as x } from "./utils.es.js";
import { IconButton as i } from "./iconbutton.es.js";
const N = ({
  activeView: m,
  views: o,
  viewLabels: s,
  onViewChange: n,
  onRefresh: r,
  onToggleFullscreen: a,
  toolbarActions: c,
  className: p,
  ...b
}) => /* @__PURE__ */ l(
  "div",
  {
    className: x(
      "mtx-flex mtx-min-h-12 mtx-items-center mtx-justify-between mtx-gap-4 mtx-border-b mtx-border-gray-200 mtx-bg-gray-0 mtx-p-3",
      p
    ),
    ...b,
    children: [
      /* @__PURE__ */ t("div", { className: "mtx-flex mtx-flex-wrap mtx-items-center mtx-gap-2", role: "group", "aria-label": "Timeline scale", children: o.map((e) => /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          "aria-pressed": m === e,
          className: x(
            "mtx-h-6 mtx-rounded-full mtx-px-4 mtx-text-xs mtx-font-medium mtx-transition-colors focus-visible:mtx-outline-none focus-visible:mtx-ring focus-visible:mtx-ring-primary-300",
            m === e ? "mtx-bg-primary-50 mtx-text-primary-600" : "mtx-bg-gray-50 mtx-text-text-400 hover:mtx-bg-gray-100"
          ),
          onClick: () => n(e),
          children: s[e]
        },
        e
      )) }),
      /* @__PURE__ */ l("div", { className: "mtx-flex mtx-items-center mtx-gap-1", children: [
        c,
        r ? /* @__PURE__ */ t(
          i,
          {
            type: "button",
            variant: "toolbar",
            "aria-label": "Refresh chart",
            title: "Refresh chart",
            className: "mtx-size-6 mtx-p-0.5",
            onClick: r,
            children: /* @__PURE__ */ t(f, {})
          }
        ) : null,
        a ? /* @__PURE__ */ t(
          i,
          {
            type: "button",
            variant: "toolbar",
            "aria-label": "Toggle fullscreen",
            title: "Toggle fullscreen",
            className: "mtx-size-6 mtx-p-0.5",
            onClick: a,
            children: /* @__PURE__ */ t(u, {})
          }
        ) : null
      ] })
    ]
  }
);
export {
  N as GanttToolbar
};
//# sourceMappingURL=gantttoolbar.es.js.map
