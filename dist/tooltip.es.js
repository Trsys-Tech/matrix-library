import { jsx as o, jsxs as s } from "react/jsx-runtime";
import * as m from "react";
import { Provider as n, Root as l, Trigger as p, Portal as f, Content as t, Arrow as c } from "@radix-ui/react-tooltip";
import { cn as g } from "./utils.es.js";
const y = n, N = l, b = p, x = m.forwardRef(
  ({ className: e, sideOffset: a = 4, children: i, ...r }, d) => /* @__PURE__ */ o(f, { children: /* @__PURE__ */ s(
    t,
    {
      ref: d,
      sideOffset: a,
      className: g(
        "z-50 rounded-sm bg-primary-900 px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        e
      ),
      ...r,
      children: [
        i,
        /* @__PURE__ */ o(c, { className: "w-2 h-1.5" })
      ]
    }
  ) })
);
x.displayName = t.displayName;
export {
  N as Tooltip,
  x as TooltipContent,
  y as TooltipProvider,
  b as TooltipTrigger
};
//# sourceMappingURL=tooltip.es.js.map
