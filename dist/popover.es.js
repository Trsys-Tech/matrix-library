import { jsx as o } from "react/jsx-runtime";
import * as i from "react";
import * as t from "@radix-ui/react-popover";
import { cn as n } from "./utils.es.js";
const f = t.Root, l = t.Trigger, c = t.Anchor, s = i.forwardRef(({ className: e, align: a = "center", sideOffset: m = 4, ...r }, d) => /* @__PURE__ */ o(t.Portal, { children: /* @__PURE__ */ o(
  t.Content,
  {
    ref: d,
    align: a,
    sideOffset: m,
    className: n(
      "mtx-z-50 mtx-w-72 mtx-rounded-md mtx-border mtx-border-gray-200 mtx-bg-popover mtx-p-4 mtx-text-popover-foreground mtx-shadow-md mtx-outline-none data-[state=open]:mtx-animate-in data-[state=closed]:mtx-animate-out data-[state=closed]:mtx-fade-out-0 data-[state=open]:mtx-fade-in-0 data-[state=closed]:mtx-zoom-out-95 data-[state=open]:mtx-zoom-in-95 data-[side=bottom]:mtx-slide-in-from-top-2 data-[side=left]:mtx-slide-in-from-right-2 data-[side=right]:mtx-slide-in-from-left-2 data-[side=top]:mtx-slide-in-from-bottom-2",
      e
    ),
    ...r
  }
) }));
s.displayName = t.Content.displayName;
export {
  f as Popover,
  c as PopoverAnchor,
  s as PopoverContent,
  l as PopoverTrigger
};
//# sourceMappingURL=popover.es.js.map
