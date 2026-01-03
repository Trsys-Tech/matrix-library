import { jsxs as u, jsx as e } from "react/jsx-runtime";
import * as m from "react";
import { Spinner as p } from "@trsys-tech/matrix-icons";
import { Slot as b, Slottable as d } from "@radix-ui/react-slot";
import { tv as y } from "tailwind-variants";
import { cn as l } from "./utils.es.js";
const x = y({
  base: "inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-sm text-xs font-normal transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:bg-muted disabled:text-gray-500",
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground hover:bg-primary-600 focus:border-primary focus:ring focus:ring-primary-300 active:bg-primary active:ring active:ring-1 active:ring-primary active:ring-offset-2",
      outline: "border border-primary text-primary hover:bg-primary-50 focus:bg-primary-50 focus:border-primary-100 focus:ring focus:ring-primary-100 active:bg-primary-50 active:border-primary active:ring-1 active:ring-primary active:ring-offset-2 disabled:border-gray-400",
      text: "text-text [&>svg]:text-primary border border-transparent hover:bg-primary-50 focus:ring focus:ring-primary-100 active:ring-1 active:ring-primary disabled:text-text-300 [&>svg]:disabled:text-text-300 disabled:bg-transparent",
      danger: "bg-danger text-danger-foreground hover:bg-danger-600 focus:ring focus:ring-danger-400 active:bg-danger active:ring-1 active:ring-danger active:ring-offset-2",
      warning: "bg-warning text-warning-foreground hover:bg-warning-600 focus:ring focus:ring-warning-400 active:bg-warning active:ring-1 active:ring-warning active:ring-offset-2",
      success: "bg-success text-success-foreground hover:bg-success-600 focus:ring focus:ring-success-400 active:bg-success active:ring-1 active:ring-success active:ring-offset-2",
      info: "bg-info text-info-foreground hover:bg-info-600 focus:ring focus:ring-info-400 active:bg-info active:ring-1 active:ring-info active:ring-offset-2",
      "primary-on-dark": "bg-gray-0 text-primary hover:bg-primary-50 focus:bg-gray-0 focus:border-none focus:ring focus:ring-primary-100 active:ring-0 active:bg-gray-0 active:outline active:outline-2 active:outline-gray-0 active:outline-offset-1",
      "outline-on-dark": "border border-gray-0 text-gray-0 hover:bg-primary-100 hover:text-primary focus:text-primary focus:bg-primary-50 focus:border-primary-50 focus:ring focus:ring-primary-100 active:text-gray-0 active:bg-transparent active:border-gray-0 active:ring-0 active:outline active:outline-1 active:outline-gray-0 active:outline-offset-2",
      "text-on-dark": "text-gray-0 hover:bg-primary-50 hover:text-text [&>svg]:hover:text-primary focus:text-text focus:bg-transparent focus:border-none [&>svg]:focus:text-primary-100 focus:ring focus:ring-primary-100 active:ring-0 active:bg-primary-50 active:text-text [&>svg]:active:text-primary active:outline active:outline-1 active:outline-gray-0 active:outline-offset-1"
    },
    size: {
      md: "h-8 p-2 [&>svg]:h-5 [&>svg]:w-5",
      sm: "h-6 p-1 [&>svg]:h-4 [&>svg]:w-4",
      lg: "h-10 rounded-md p-4 text-sm [&>svg]:h-6 [&>svg]:w-6"
    }
  },
  defaultVariants: {
    variant: "primary",
    size: "md"
  }
}), h = m.forwardRef(
  ({ className: i, variant: t, size: a, asChild: n = !1, children: o, loading: r, disabled: g, startIcon: s, endIcon: c, ...v }, f) => /* @__PURE__ */ u(n ? b : "button", { className: l(x({ variant: t, size: a, className: i })), ref: f, disabled: g || r, ...v, children: [
    r ? /* @__PURE__ */ e(p, {}) : null,
    s,
    /* @__PURE__ */ e(d, { children: o }),
    c
  ] })
);
h.displayName = "Button";
export {
  h as Button,
  x as buttonVariants
};
//# sourceMappingURL=button.es.js.map
