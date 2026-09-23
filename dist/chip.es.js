import { jsxs as l, jsx as m } from "react/jsx-runtime";
import d from "react";
import { Slot as b, Slottable as f } from "@radix-ui/react-slot";
import { tv as c } from "tailwind-variants";
import { cn as x } from "./utils.es.js";
import { XMark as g } from "@trsys-tech/matrix-icons";
import { useIsMobile as u } from "./use-mobile.es.js";
const y = c({
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
}), h = d.forwardRef(({ className: e, variant: a, asChild: o = !1, children: i, onClose: r, size: t, ...p }, s) => {
  const n = !u();
  return /* @__PURE__ */ l(o ? b : "span", { className: x(n ? "mtx-border-none" : "", y({ variant: a, size: t, className: e })), ref: s, ...p, children: [
    /* @__PURE__ */ m(f, { children: i }),
    r ? /* @__PURE__ */ m(
      "button",
      {
        type: "button",
        "aria-label": "Remove chip",
        onClick: r,
        className: x(
          { "-mtx-me-3 [&>svg]:mtx-w-5 [&>svg]:mtx-h-5": t === "lg" },
          { "-mtx-me-2 [&>svg]:mtx-w-4.5 [&>svg]:mtx-h-4.5": t === "md" || t === void 0 },
          { "-mtx-me-1 [&>svg]:mtx-w-4 [&>svg]:mtx-h-4": t === "sm" }
        ),
        children: /* @__PURE__ */ m(g, {})
      }
    ) : null
  ] });
});
h.displayName = "Chip";
export {
  h as Chip
};
//# sourceMappingURL=chip.es.js.map
