import { jsxs as x, jsx as i } from "react/jsx-runtime";
import * as c from "react";
import { tv as b } from "tailwind-variants";
import { cn as o } from "./utils.es.js";
const g = b({
  base: "flex items-center w-full rounded-sm border border-input text-gray-800 bg-transparent p-0 text-xs font-medium shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-text-300 hover:border-primary-400 focus-within:border-primary-400 focus-within:outline-none focus-within:ring focus-within:ring-primary-100  disabled:cursor-not-allowed disabled:text-text-300 disabled:bg-gray-100 disabled:border-gray-100",
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
}), h = c.forwardRef(
  ({ className: n, slotProps: t, suffix: e, endAdornment: s, startAdornment: r, size: a, value: l, onChange: d, defaultValue: m, type: p, ...f }, u) => /* @__PURE__ */ x("div", { ...f, className: o(g({ size: a, className: n })), children: [
    r,
    /* @__PURE__ */ i(
      "input",
      {
        type: p,
        ref: u,
        onChange: d,
        value: l,
        defaultValue: m,
        ...t?.inputProps ?? {},
        className: o(
          "focus:outline-none w-full h-full py-1 rounded-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-text-300",
          r ? "ps-1 pe-3" : "px-3",
          t?.inputProps?.className
        )
      }
    ),
    typeof e == "string" || typeof e == "number" ? /* @__PURE__ */ i("span", { className: "inline-flex items-center px-2 text-xs font-medium text-primary bg-primary-50 m-0.5 rounded-sm", children: e }) : e,
    s
  ] })
);
h.displayName = "TextField";
export {
  h as TextField
};
//# sourceMappingURL=textfield.es.js.map
