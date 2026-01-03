import { jsx as s } from "react/jsx-runtime";
import * as o from "react";
import * as a from "@radix-ui/react-switch";
import { cn as e } from "./utils.es.js";
import { tv as c } from "tailwind-variants";
const d = c({
  base: "peer inline-flex h-4 w-7 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
  variants: {
    size: {
      sm: "h-4 w-7 [&>span]:h-3 [&>span]:w-3 [&>span]:data-[state=checked]:translate-x-3",
      md: "h-5 w-9 [&>span]:h-4 [&>span]:w-4 [&>span]:data-[state=checked]:translate-x-4",
      lg: "h-6 w-11 [&>span]:h-5 [&>span]:w-5 [&>span]:data-[state=checked]:translate-x-5"
    }
  },
  defaultVariants: {
    size: "md"
  }
}), l = o.forwardRef(({ className: t, size: r, ...n }, i) => /* @__PURE__ */ s(a.Root, { className: e(d({ size: r, className: t })), ...n, ref: i, children: /* @__PURE__ */ s(
  a.Thumb,
  {
    className: e(
      "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0"
    )
  }
) }));
l.displayName = a.Root.displayName;
export {
  l as Switch
};
//# sourceMappingURL=switch.es.js.map
