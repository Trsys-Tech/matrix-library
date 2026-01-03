import { jsx as o, jsxs as s } from "react/jsx-runtime";
import * as m from "react";
import { Root as n, Trigger as l, Provider as p, Portal as f, Content as t, Arrow as c } from "@radix-ui/react-tooltip";
import { cn as g } from "./utils.es.js";
const y = p, w = n, N = l, x = m.forwardRef(({ className: a, sideOffset: e = 4, children: r, ...i }, d) => /* @__PURE__ */ o(f, { children: /* @__PURE__ */ s(
  t,
  {
    ref: d,
    sideOffset: e,
    className: g(
      "z-50 rounded-sm bg-primary-900 px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      a
    ),
    ...i,
    children: [
      r,
      /* @__PURE__ */ o(c, { "data-role": "arrow", className: "w-2 h-1.5" })
    ]
  }
) }));
x.displayName = t.displayName;
export {
  w as Tooltip,
  x as TooltipContent,
  y as TooltipProvider,
  N as TooltipTrigger
};
//# sourceMappingURL=tooltip.es.js.map
