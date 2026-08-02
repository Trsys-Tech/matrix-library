import { jsxs as v, jsx as n } from "react/jsx-runtime";
import * as N from "react";
import { tv as F } from "tailwind-variants";
import { cn as o } from "./utils.es.js";
const j = F({
  base: [
    "mtx-flex mtx-items-center mtx-w-full mtx-rounded-sm mtx-border mtx-border-input mtx-text-text mtx-bg-transparent mtx-p-0 mtx-text-xs [&_input]:mtx-text-xs mtx-font-medium mtx-transition-colors file:mtx-border-0 file:mtx-bg-transparent file:mtx-text-sm file:mtx-font-medium file:mtx-text-foreground",
    "placeholder:mtx-text-text-300 hover:mtx-border-primary-400 focus-within:mtx-border-primary-400 focus-within:mtx-outline-none focus-within:mtx-ring focus-within:mtx-ring-primary-100",
    "aria-disabled:mtx-text-text-300 aria-disabled:mtx-bg-gray-100 aria-disabled:mtx-border-gray-100"
  ],
  variants: {
    size: {
      sm: "mtx-h-7",
      md: "mtx-h-8",
      lg: "mtx-h-11"
    }
  },
  defaultVariants: {
    size: "md"
  }
}), z = N.forwardRef(
  ({
    className: s,
    slotProps: e,
    suffix: t,
    endAdornment: d,
    startAdornment: m,
    size: l,
    value: f,
    onChange: p,
    defaultValue: u,
    type: r,
    disabled: x,
    onWheel: i,
    id: b,
    "aria-describedby": c,
    "aria-invalid": h,
    ...g
  }, y) => {
    const w = (a) => {
      r === "number" && a.target.blur(), i && i(a);
    };
    return /* @__PURE__ */ v("div", { ...g, className: o(j({ size: l, className: s })), "aria-disabled": x, children: [
      m,
      /* @__PURE__ */ n(
        "input",
        {
          type: r,
          onWheel: w,
          ref: y,
          id: b,
          "aria-describedby": c,
          "aria-invalid": h,
          onChange: p,
          value: f,
          defaultValue: u,
          disabled: x,
          ...e?.inputProps ?? {},
          className: o(
            "focus:mtx-outline-none mtx-w-full mtx-h-full mtx-py-1 mtx-rounded-sm file:mtx-border-0 mtx-bg-transparent file:mtx-text-sm file:mtx-font-medium file:mtx-text-foreground placeholder:mtx-text-text-300",
            m ? "mtx-ps-1 mtx-pe-3" : "mtx-px-3",
            e?.inputProps?.className
          )
        }
      ),
      typeof t == "string" || typeof t == "number" ? /* @__PURE__ */ n("span", { className: "mtx-inline-flex mtx-items-center mtx-px-2 mtx-text-xs mtx-font-medium mtx-text-primary mtx-bg-primary-50 mtx-m-0.5 mtx-rounded-sm", children: t }) : t,
      d
    ] });
  }
);
z.displayName = "TextField";
export {
  z as TextField
};
//# sourceMappingURL=textfield.es.js.map
