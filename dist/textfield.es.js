import { jsxs as c, jsx as a } from "react/jsx-runtime";
import * as b from "react";
import { tv as h } from "tailwind-variants";
import { cn as n } from "./utils.es.js";
const g = h({
  base: [
    "flex items-center w-full rounded-sm border border-input text-text bg-transparent p-0 text-xs font-medium shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
    "placeholder:text-text-300 hover:border-primary-400 focus-within:border-primary-400 focus-within:outline-none focus-within:ring focus-within:ring-primary-100",
    "aria-disabled:text-text-300 aria-disabled:bg-gray-100 aria-disabled:border-gray-100"
  ],
  variants: {
    size: {
      sm: "h-7",
      md: "h-8",
      lg: "h-11"
    }
  },
  defaultVariants: {
    size: "md"
  }
}), y = b.forwardRef(
  ({ className: o, slotProps: t, suffix: e, endAdornment: s, startAdornment: r, size: l, value: d, onChange: m, defaultValue: p, type: f, disabled: i, ...x }, u) => /* @__PURE__ */ c("div", { ...x, className: n(g({ size: l, className: o })), "aria-disabled": i, children: [
    r,
    /* @__PURE__ */ a(
      "input",
      {
        type: f,
        ref: u,
        onChange: m,
        value: d,
        defaultValue: p,
        disabled: i,
        ...t?.inputProps ?? {},
        className: n(
          "focus:outline-none w-full h-full py-1 rounded-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-text-300",
          r ? "ps-1 pe-3" : "px-3",
          t?.inputProps?.className
        )
      }
    ),
    typeof e == "string" || typeof e == "number" ? /* @__PURE__ */ a("span", { className: "inline-flex items-center px-2 text-xs font-medium text-primary bg-primary-50 m-0.5 rounded-sm", children: e }) : e,
    s
  ] })
);
y.displayName = "TextField";
export {
  y as TextField
};
//# sourceMappingURL=textfield.es.js.map
