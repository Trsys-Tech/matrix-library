import { jsx as o } from "react/jsx-runtime";
import p from "react";
import { Slot as s } from "@radix-ui/react-slot";
import { tv as n } from "tailwind-variants";
import { cn as d } from "./utils.es.js";
const f = n({
  base: "mtx-inline-flex mtx-items-center mtx-justify-center mtx-gap-2 mtx-whitespace-nowrap mtx-rounded-sm mtx-text-xs mtx-font-medium",
  variants: {
    variant: {
      primary: "mtx-bg-primary-25 mtx-text-primary-300 mtx-border mtx-border-primary-300",
      outline: "mtx-bg-gray-0 mtx-text-primary-300 mtx-border mtx-border-primary-200"
    },
    size: {
      sm: "mtx-px-2 mtx-h-6",
      md: "mtx-px-4 mtx-h-8",
      lg: "mtx-px-6 mtx-h-10 mtx-text-sm"
    }
  },
  defaultVariants: {
    variant: "primary",
    size: "md"
  }
}), l = p.forwardRef(({ className: t, variant: m, asChild: r = !1, children: a, size: e, ...x }, i) => /* @__PURE__ */ o(r ? s : "span", { className: d(f({ variant: m, size: e, className: t })), ref: i, ...x, children: a }));
l.displayName = "Badge";
export {
  l as Badge
};
//# sourceMappingURL=badge.es.js.map
