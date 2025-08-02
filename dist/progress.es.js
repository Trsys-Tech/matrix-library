import { jsx as a } from "react/jsx-runtime";
import * as f from "react";
import * as r from "@radix-ui/react-progress";
import { cn as s } from "./utils.es.js";
import { tv as g } from "tailwind-variants";
const i = g({
  base: "",
  variants: {
    variant: {
      primary: "bg-primary",
      info: "bg-info",
      success: "bg-success",
      warning: "bg-warning",
      danger: "bg-danger"
    },
    size: {
      sm: "h-[3px]",
      md: "h-[4px]",
      lg: "h-[5px]"
    }
  },
  defaultVariants: {
    variant: "primary",
    size: "md"
  }
}), p = f.forwardRef(
  ({ className: o, value: e, variant: t, size: n, ...m }, l) => /* @__PURE__ */ a(r.Root, { ref: l, className: s(i({ size: n }), "relative w-full overflow-hidden bg-gray-300", o), ...m, children: /* @__PURE__ */ a(
    r.Indicator,
    {
      className: s("h-full w-full flex-1 transition-all", i({ variant: t })),
      style: { transform: `translateX(-${100 - (e || 0)}%)` }
    }
  ) })
);
p.displayName = r.Root.displayName;
export {
  p as Progress
};
//# sourceMappingURL=progress.es.js.map
