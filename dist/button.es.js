import { jsxs as v, jsx as r } from "react/jsx-runtime";
import * as f from "react";
import { Spinner as u } from "@trsys-tech/matrix-icons";
import { Slot as p, Slottable as b } from "@radix-ui/react-slot";
import { tv as d } from "tailwind-variants";
import { cn as y } from "./utils.es.js";
const l = d({
  base: "mtx-inline-flex mtx-items-center mtx-justify-center mtx-gap-1 mtx-whitespace-nowrap mtx-rounded-sm mtx-text-xs mtx-font-normal mtx-transition-colors focus-visible:mtx-outline-none disabled:mtx-pointer-events-none disabled:mtx-bg-muted disabled:mtx-text-gray-500",
  variants: {
    variant: {
      primary: "mtx-bg-primary mtx-text-primary-foreground hover:mtx-bg-primary-600 focus:mtx-border-primary focus:mtx-ring focus:mtx-ring-primary-300 active:mtx-bg-primary active:mtx-ring active:mtx-ring-1 active:mtx-ring-primary active:mtx-ring-offset-2",
      outline: "mtx-border mtx-border-primary mtx-text-primary hover:mtx-bg-primary-50 focus:mtx-bg-primary-50 focus:mtx-border-primary-100 focus:mtx-ring focus:mtx-ring-primary-100 active:mtx-bg-primary-50 active:mtx-border-primary active:mtx-ring-1 active:mtx-ring-primary active:mtx-ring-offset-2 disabled:mtx-border-gray-400",
      text: "mtx-text-text [&>svg]:mtx-text-primary mtx-border mtx-border-transparent hover:mtx-bg-primary-50 focus:mtx-ring focus:mtx-ring-primary-100 active:mtx-ring-1 active:mtx-ring-primary disabled:mtx-text-text-300 [&>svg]:disabled:mtx-text-text-300 disabled:mtx-bg-transparent",
      danger: "mtx-bg-danger mtx-text-danger-foreground hover:mtx-bg-danger-600 focus:mtx-ring focus:mtx-ring-danger-400 active:mtx-bg-danger active:mtx-ring-1 active:mtx-ring-danger active:mtx-ring-offset-2",
      warning: "mtx-bg-warning mtx-text-warning-foreground hover:mtx-bg-warning-600 focus:mtx-ring focus:mtx-ring-warning-400 active:mtx-bg-warning active:mtx-ring-1 active:mtx-ring-warning active:mtx-ring-offset-2",
      success: "mtx-bg-success mtx-text-success-foreground hover:mtx-bg-success-600 focus:mtx-ring focus:mtx-ring-success-400 active:mtx-bg-success active:mtx-ring-1 active:mtx-ring-success active:mtx-ring-offset-2",
      info: "mtx-bg-info mtx-text-info-foreground hover:mtx-bg-info-600 focus:mtx-ring focus:mtx-ring-info-400 active:mtx-bg-info active:mtx-ring-1 active:mtx-ring-info active:mtx-ring-offset-2",
      "primary-on-dark": "mtx-bg-gray-0 mtx-text-primary hover:mtx-bg-primary-50 focus:mtx-bg-gray-0 focus:mtx-border-none focus:mtx-ring focus:mtx-ring-primary-100 active:mtx-ring-0 active:mtx-bg-gray-0 active:mtx-outline active:mtx-outline-2 active:mtx-outline-gray-0 active:mtx-outline-offset-1",
      "outline-on-dark": "mtx-border mtx-border-gray-0 mtx-text-gray-0 hover:mtx-bg-primary-100 hover:mtx-text-primary focus:mtx-text-primary focus:mtx-bg-primary-50 focus:mtx-border-primary-50 focus:mtx-ring focus:mtx-ring-primary-100 active:mtx-text-gray-0 active:mtx-bg-transparent active:mtx-border-gray-0 active:mtx-ring-0 active:mtx-outline active:mtx-outline-1 active:mtx-outline-gray-0 active:mtx-outline-offset-2",
      "text-on-dark": "mtx-text-gray-0 hover:mtx-bg-primary-50 hover:mtx-text-text [&>svg]:hover:mtx-text-primary focus:mtx-text-text focus:mtx-bg-transparent focus:mtx-border-none [&>svg]:focus:mtx-text-primary-100 focus:mtx-ring focus:mtx-ring-primary-100 active:mtx-ring-0 active:mtx-bg-primary-50 active:mtx-text-text [&>svg]:active:mtx-text-primary active:mtx-outline active:mtx-outline-1 active:mtx-outline-gray-0 active:mtx-outline-offset-1"
    },
    size: {
      md: "mtx-h-8 mtx-p-2 [&>svg]:mtx-h-5 [&>svg]:mtx-w-5",
      sm: "mtx-h-6 mtx-p-1 [&>svg]:mtx-h-4 [&>svg]:mtx-w-4",
      lg: "mtx-h-10 mtx-rounded-md mtx-p-4 mtx-text-sm [&>svg]:mtx-h-6 [&>svg]:mtx-w-6"
    }
  },
  defaultVariants: {
    variant: "primary",
    size: "md"
  }
}), h = f.forwardRef(
  ({ className: m, variant: e, size: i, asChild: x = !1, children: a, loading: t, disabled: n, startIcon: o, endIcon: g, ...s }, c) => /* @__PURE__ */ v(x ? p : "button", { className: y(l({ variant: e, size: i, className: m })), ref: c, disabled: n || t, ...s, children: [
    t ? /* @__PURE__ */ r(u, {}) : null,
    o,
    /* @__PURE__ */ r(b, { children: a }),
    g
  ] })
);
h.displayName = "Button";
export {
  h as Button,
  l as buttonVariants
};
//# sourceMappingURL=button.es.js.map
