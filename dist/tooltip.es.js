import { jsx as t, jsxs as i } from "react/jsx-runtime";
import * as d from "react";
import { Root as s, Provider as x, Trigger as n, Portal as l, Content as p, Arrow as f } from "@radix-ui/react-tooltip";
import { cn as c } from "./utils.es.js";
const w = x, N = s, g = n;
g.displayName = "TooltipTrigger";
const T = d.forwardRef(({ className: o, sideOffset: m = 4, children: e, ...r }, a) => /* @__PURE__ */ t(l, { children: /* @__PURE__ */ i(
  p,
  {
    ref: a,
    sideOffset: m,
    className: c(
      "mtx-z-50 mtx-rounded-sm mtx-bg-primary-900 mtx-px-3 mtx-py-1.5 mtx-text-xs mtx-text-primary-foreground mtx-animate-in mtx-fade-in-0 mtx-zoom-in-95 data-[state=closed]:mtx-animate-out data-[state=closed]:mtx-fade-out-0 data-[state=closed]:mtx-zoom-out-95 data-[side=bottom]:mtx-slide-in-from-top-2 data-[side=left]:mtx-slide-in-from-right-2 data-[side=right]:mtx-slide-in-from-left-2 data-[side=top]:mtx-slide-in-from-bottom-2",
      o
    ),
    ...r,
    children: [
      e,
      /* @__PURE__ */ t(f, { "data-role": "arrow", className: "mtx-w-2 mtx-h-1.5" })
    ]
  }
) }));
T.displayName = "TooltipContent";
export {
  N as Tooltip,
  T as TooltipContent,
  w as TooltipProvider,
  g as TooltipTrigger
};
//# sourceMappingURL=tooltip.es.js.map
