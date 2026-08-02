import { jsx as a } from "react/jsx-runtime";
import * as i from "react";
import * as t from "@radix-ui/react-switch";
import { cn as m } from "./utils.es.js";
import { tv as x } from "tailwind-variants";
const o = x({
  base: "mtx-peer mtx-inline-flex mtx-h-4 mtx-w-7 mtx-shrink-0 mtx-cursor-pointer mtx-items-center mtx-rounded-full mtx-border-2 mtx-border-transparent mtx-shadow-sm mtx-transition-colors focus-visible:mtx-outline-none focus-visible:mtx-ring-2 focus-visible:mtx-ring-ring focus-visible:mtx-ring-offset-2 focus-visible:mtx-ring-offset-background disabled:mtx-cursor-not-allowed disabled:mtx-opacity-50 data-[state=checked]:mtx-bg-primary data-[state=unchecked]:mtx-bg-input",
  variants: {
    size: {
      sm: "mtx-h-4 mtx-w-7 [&>span]:mtx-h-3 [&>span]:mtx-w-3 [&>span]:data-[state=checked]:mtx-translate-x-3",
      md: "mtx-h-5 mtx-w-9 [&>span]:mtx-h-4 [&>span]:mtx-w-4 [&>span]:data-[state=checked]:mtx-translate-x-4",
      lg: "mtx-h-6 mtx-w-11 [&>span]:mtx-h-5 [&>span]:mtx-w-5 [&>span]:data-[state=checked]:mtx-translate-x-5"
    }
  },
  defaultVariants: {
    size: "md"
  }
}), c = i.forwardRef(({ className: s, size: e, ...r }, n) => /* @__PURE__ */ a(t.Root, { className: m(o({ size: e, className: s })), ...r, ref: n, children: /* @__PURE__ */ a(
  t.Thumb,
  {
    className: m(
      "mtx-pointer-events-none mtx-block mtx-rounded-full mtx-bg-background mtx-shadow-lg mtx-ring-0 mtx-transition-transform data-[state=unchecked]:mtx-translate-x-0"
    )
  }
) }));
c.displayName = t.Root.displayName;
export {
  c as Switch
};
//# sourceMappingURL=switch.es.js.map
