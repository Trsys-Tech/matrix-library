import { jsxs as c, jsx as r } from "react/jsx-runtime";
import g from "react";
import { Slot as b, Slottable as f } from "@radix-ui/react-slot";
import { tv as u } from "tailwind-variants";
import { cn as p } from "./utils.es.js";
import { Spinner as d } from "@trsys-tech/matrix-icons";
const v = u({
  base: "mtx-inline-flex mtx-items-center mtx-justify-center mtx-gap-1 mtx-p-2 mtx-rounded-sm mtx-text-xs mtx-font-normal mtx-transition-colors focus-visible:mtx-outline-none disabled:mtx-pointer-events-none disabled:mtx-bg-muted disabled:mtx-text-gray-500",
  variants: {
    variant: {
      table: "mtx-text-text hover:mtx-bg-primary-50 focus:mtx-bg-transparent focus:mtx-ring active:mtx-bg-primary-50 active:mtx-text-primary-700",
      toolbar: "mtx-text-primary hover:mtx-bg-primary-50 focus:mtx-bg-transparent focus:mtx-ring active:mtx-bg-primary-50 active:mtx-text-primary-700",
      form: "mtx-border mtx-border-gray-300 mtx-text-primary hover:mtx-border-none hover:mtx-bg-primary-50 focus:mtx-border-none focus:mtx-bg-transparent focus:mtx-ring active:mtx-border-none active:mtx-bg-primary-50 active:mtx-text-primary-700 disabled:mtx-border-none",
      danger: "mtx-text-danger hover:mtx-bg-danger-200 focus:mtx-bg-transparent focus:mtx-ring focus:mtx-ring-danger-400 active:mtx-bg-danger-300",
      warning: "mtx-text-warning hover:mtx-bg-warning-200 focus:mtx-bg-transparent focus:mtx-ring focus:mtx-ring-warning-400 active:mtx-bg-warning-300",
      success: "mtx-text-success hover:mtx-bg-success-200 focus:mtx-bg-transparent focus:mtx-ring focus:mtx-ring-success-400 active:mtx-bg-success-300",
      info: "mtx-text-info hover:mtx-bg-info-200 focus:mtx-bg-transparent focus:mtx-ring focus:mtx-ring-info-400 active:mtx-bg-info-300"
    },
    size: {
      md: "mtx-h-8 mtx-w-8.5",
      sm: "mtx-h-6 mtx-w-6 mtx-p-1 [&>svg]:mtx-h-4 [&>svg]:mtx-w-4",
      lg: "mtx-h-10 mtx-w-10 [&>svg]:mtx-h-6 [&>svg]:mtx-w-6"
    }
  },
  defaultVariants: {
    variant: "table",
    size: "md"
  }
}), B = g.forwardRef(
  ({ asChild: m, children: e, className: x, disabled: n, loading: t, variant: o, size: a, ...s }, i) => /* @__PURE__ */ c(m ? b : "button", { className: p(v({ variant: o, size: a, className: x })), disabled: n || t, ref: i, ...s, children: [
    t ? /* @__PURE__ */ r(d, {}) : null,
    /* @__PURE__ */ r(f, { children: e })
  ] })
);
export {
  B as IconButton
};
//# sourceMappingURL=iconbutton.es.js.map
