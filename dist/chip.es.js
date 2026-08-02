import { jsxs as n, jsx as r } from "react/jsx-runtime";
import l from "react";
import { Slot as d } from "@radix-ui/react-slot";
import { tv as f } from "tailwind-variants";
import { cn as x } from "./utils.es.js";
import { XMark as g } from "@trsys-tech/matrix-icons";
const c = f({
  base: "mtx-inline-flex mtx-items-center mtx-justify-center mtx-gap-2 mtx-whitespace-nowrap mtx-rounded-full mtx-text-xs mtx-font-medium",
  variants: {
    variant: {
      primary: "mtx-bg-primary-100 mtx-text-primary-700 mtx-border mtx-border-primary",
      neutral: "mtx-bg-gray-50 mtx-text-text-400 mtx-border mtx-border-gray-400",
      "table-primary": "mtx-bg-primary-25 mtx-text-primary mtx-font-bold",
      "table-neutral": "mtx-bg-gray-50 mtx-text-text-400 mtx-font-medium"
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
}), b = l.forwardRef(({ className: a, variant: e, asChild: i = !1, children: o, onClose: m, size: t, ...p }, s) => /* @__PURE__ */ n(i ? d : "span", { className: x(c({ variant: e, size: t, className: a })), ref: s, ...p, children: [
  o,
  m ? /* @__PURE__ */ r(
    "button",
    {
      onClick: m,
      className: x(
        { "-mtx-me-3 [&>svg]:mtx-w-5 [&>svg]:mtx-h-5": t === "lg" },
        { "-mtx-me-2 [&>svg]:mtx-w-4.5 [&>svg]:mtx-h-4.5": t === "md" || t === void 0 },
        { "-mtx-me-1 [&>svg]:mtx-w-4 [&>svg]:mtx-h-4": t === "sm" }
      ),
      children: /* @__PURE__ */ r(g, {})
    }
  ) : null
] }));
b.displayName = "Chip";
export {
  b as Chip
};
//# sourceMappingURL=chip.es.js.map
