import { jsxs as l, jsx as a } from "react/jsx-runtime";
import d from "react";
import { Slot as f } from "@radix-ui/react-slot";
import { tv as g } from "tailwind-variants";
import { cn as e } from "./utils.es.js";
import { XMark as x } from "@trsys-tech/matrix-icons";
const c = g({
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-xs font-medium",
  variants: {
    variant: {
      primary: "bg-primary-100 text-primary-700 border border-primary",
      neutral: "bg-gray-50 text-text-400 border border-gray-400",
      "table-primary": "bg-primary-25 text-primary font-bold",
      "table-neutral": "bg-gray-50 text-text-400 font-medium"
    },
    size: {
      sm: "px-2 h-6",
      md: "px-4 h-8",
      lg: "px-6 h-10 text-sm"
    }
  },
  defaultVariants: {
    variant: "primary",
    size: "md"
  }
}), b = d.forwardRef(({ className: m, variant: i, asChild: o = !1, children: p, onClose: t, size: r, ...s }, n) => /* @__PURE__ */ l(o ? f : "span", { className: e(c({ variant: i, size: r, className: m })), ref: n, ...s, children: [
  p,
  t ? /* @__PURE__ */ a(
    "button",
    {
      onClick: t,
      className: e(
        { "-me-3 [&>svg]:w-5 [&>svg]:h-5": r === "lg" },
        { "-me-2 [&>svg]:w-4.5 [&>svg]:h-4.5": r === "md" || r === void 0 },
        { "-me-1 [&>svg]:w-4 [&>svg]:h-4": r === "sm" }
      ),
      children: /* @__PURE__ */ a(x, {})
    }
  ) : null
] }));
b.displayName = "Chip";
export {
  b as Chip
};
//# sourceMappingURL=chip.es.js.map
