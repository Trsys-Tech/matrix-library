import { jsxs as l, jsx as t } from "react/jsx-runtime";
import d from "react";
import { Slot as f } from "@radix-ui/react-slot";
import { tv as c } from "tailwind-variants";
import { cn as a } from "./utils.es.js";
import { XMark as g } from "@trsys-tech/matrix-icons";
const x = c({
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-xs font-medium",
  variants: {
    variant: {
      primary: "bg-primary-100 text-primary-700 border border-primary",
      neutral: "bg-gray-50 text-text-400 border border-gray-400"
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
}), h = d.forwardRef(({ className: e, variant: m, asChild: o = !1, children: s, onClose: i, size: r, ...p }, n) => /* @__PURE__ */ l(o ? f : "span", { className: a(x({ variant: m, size: r, className: e })), ref: n, ...p, children: [
  s,
  i ? /* @__PURE__ */ t(
    "button",
    {
      className: a(
        { "-me-3 [&>svg]:w-5 [&>svg]:h-5": r === "lg" },
        { "-me-2 [&>svg]:w-4.5 [&>svg]:h-4.5": r === "md" || r === void 0 },
        { "-me-1 [&>svg]:w-4 [&>svg]:h-4": r === "sm" }
      ),
      children: /* @__PURE__ */ t(g, {})
    }
  ) : null
] }));
h.displayName = "Chip";
export {
  h as Chip
};
//# sourceMappingURL=chip.es.js.map
