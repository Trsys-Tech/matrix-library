import { jsxs as a, jsx as t } from "react/jsx-runtime";
import { Refresh as f, ArrowsMaximize as u } from "@trsys-tech/matrix-icons";
import { cn as x } from "./utils.es.js";
import { IconButton as i } from "./iconbutton.es.js";
const v = ({
  activeView: e,
  views: o,
  viewLabels: n,
  onViewChange: s,
  onRefresh: m,
  onToggleFullscreen: l,
  toolbarActions: c,
  className: b,
  ...p
}) => /* @__PURE__ */ a(
  "div",
  {
    className: x(
      "mtx-flex mtx-min-h-16 mtx-items-center mtx-justify-between mtx-gap-4 mtx-border-b mtx-border-gray-200 mtx-bg-gray-0 mtx-p-3",
      b
    ),
    ...p,
    children: [
      /* @__PURE__ */ t("div", { className: "mtx-flex mtx-flex-wrap mtx-items-center mtx-gap-2", role: "group", "aria-label": "Timeline scale", children: o.map((r) => /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          "aria-pressed": e === r,
          className: x(
            "mtx-h-9 mtx-rounded-full mtx-px-4 mtx-text-sm mtx-font-medium mtx-transition-colors focus-visible:mtx-outline-none focus-visible:mtx-ring focus-visible:mtx-ring-primary-300",
            e === r ? "mtx-bg-primary-50 mtx-text-primary-600" : "mtx-bg-gray-50 mtx-text-text-400 hover:mtx-bg-gray-100"
          ),
          onClick: () => s(r),
          children: n[r]
        },
        r
      )) }),
      /* @__PURE__ */ a("div", { className: "mtx-flex mtx-items-center mtx-gap-1", children: [
        c,
        m ? /* @__PURE__ */ t(i, { type: "button", variant: "toolbar", "aria-label": "Refresh chart", title: "Refresh chart", onClick: m, children: /* @__PURE__ */ t(f, {}) }) : null,
        l ? /* @__PURE__ */ t(i, { type: "button", variant: "toolbar", "aria-label": "Toggle fullscreen", title: "Toggle fullscreen", onClick: l, children: /* @__PURE__ */ t(u, {}) }) : null
      ] })
    ]
  }
);
export {
  v as GanttToolbar
};
//# sourceMappingURL=gantttoolbar.es.js.map
