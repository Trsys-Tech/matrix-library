import { jsxs as g, jsx as s } from "react/jsx-runtime";
import * as y from "react";
import { tv as w } from "tailwind-variants";
import { cn as l } from "./utils.es.js";
const N = w({
  base: [
    "flex items-center w-full rounded-sm border border-input text-text bg-transparent p-0 text-xs [&_input]:text-xs font-medium transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
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
}), v = y.forwardRef(
  ({ className: d, slotProps: t, suffix: e, endAdornment: m, startAdornment: r, size: f, value: p, onChange: u, defaultValue: x, type: i, disabled: a, onWheel: n, ...c }, b) => {
    const h = (o) => {
      i === "number" && o.target.blur(), n && n(o);
    };
    return /* @__PURE__ */ g("div", { ...c, className: l(N({ size: f, className: d })), "aria-disabled": a, children: [
      r,
      /* @__PURE__ */ s(
        "input",
        {
          type: i,
          onWheel: h,
          ref: b,
          onChange: u,
          value: p,
          defaultValue: x,
          disabled: a,
          ...t?.inputProps ?? {},
          className: l(
            "focus:outline-none w-full h-full py-1 rounded-sm file:border-0 bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-text-300",
            r ? "ps-1 pe-3" : "px-3",
            t?.inputProps?.className
          )
        }
      ),
      typeof e == "string" || typeof e == "number" ? /* @__PURE__ */ s("span", { className: "inline-flex items-center px-2 text-xs font-medium text-primary bg-primary-50 m-0.5 rounded-sm", children: e }) : e,
      m
    ] });
  }
);
v.displayName = "TextField";
export {
  v as TextField
};
//# sourceMappingURL=textfield.es.js.map
