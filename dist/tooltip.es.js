import { jsx as t, jsxs as d } from "react/jsx-runtime";
import * as s from "react";
import { Root as x, Provider as n, Trigger as l, Portal as p, Content as o, Arrow as f } from "@radix-ui/react-tooltip";
import { cn as c } from "./utils.es.js";
const y = n, w = x, N = l, g = s.forwardRef(({ className: m, sideOffset: a = 4, children: e, ...r }, i) => /* @__PURE__ */ t(p, { children: /* @__PURE__ */ d(
  o,
  {
    ref: i,
    sideOffset: a,
    className: c(
      "mtx-z-50 mtx-rounded-sm mtx-bg-primary-900 mtx-px-3 mtx-py-1.5 mtx-text-xs mtx-text-primary-foreground mtx-animate-in mtx-fade-in-0 mtx-zoom-in-95 data-[state=closed]:mtx-animate-out data-[state=closed]:mtx-fade-out-0 data-[state=closed]:mtx-zoom-out-95 data-[side=bottom]:mtx-slide-in-from-top-2 data-[side=left]:mtx-slide-in-from-right-2 data-[side=right]:mtx-slide-in-from-left-2 data-[side=top]:mtx-slide-in-from-bottom-2",
      m
    ),
    ...r,
    children: [
      e,
      /* @__PURE__ */ t(f, { "data-role": "arrow", className: "mtx-w-2 mtx-h-1.5" })
    ]
  }
) }));
g.displayName = o.displayName;
export {
  w as Tooltip,
  g as TooltipContent,
  y as TooltipProvider,
  N as TooltipTrigger
};
//# sourceMappingURL=tooltip.es.js.map
