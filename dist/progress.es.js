import { jsx as t } from "react/jsx-runtime";
import * as l from "react";
import * as r from "@radix-ui/react-progress";
import { cn as a } from "./utils.es.js";
import { tv as f } from "tailwind-variants";
const m = f({
  base: "",
  variants: {
    variant: {
      primary: "mtx-bg-primary",
      info: "mtx-bg-info",
      success: "mtx-bg-success",
      warning: "mtx-bg-warning",
      danger: "mtx-bg-danger"
    },
    size: {
      sm: "mtx-h-[3px]",
      md: "mtx-h-[4px]",
      lg: "mtx-h-[5px]"
    }
  },
  defaultVariants: {
    variant: "primary",
    size: "md"
  }
}), g = l.forwardRef(
  ({ className: s, value: i, variant: o, size: e, ...n }, x) => /* @__PURE__ */ t(
    r.Root,
    {
      ref: x,
      className: a(m({ size: e }), "mtx-relative mtx-w-full mtx-overflow-hidden mtx-bg-gray-300", s),
      ...n,
      children: /* @__PURE__ */ t(
        r.Indicator,
        {
          className: a("mtx-h-full mtx-w-full mtx-flex-1 mtx-transition-all", m({ variant: o })),
          style: { transform: `translateX(-${100 - (i || 0)}%)` }
        }
      )
    }
  )
);
g.displayName = r.Root.displayName;
export {
  g as Progress
};
//# sourceMappingURL=progress.es.js.map
