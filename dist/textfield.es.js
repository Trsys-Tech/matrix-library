import { jsxs as I, jsx as r } from "react/jsx-runtime";
import * as i from "react";
import { tv as P } from "tailwind-variants";
import { cn as d } from "./utils.es.js";
import { useVoiceDictation as T, isDictationInputType as j, VoiceDictationButton as z } from "./voicedictationbutton.es.js";
const k = P({
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
}), B = i.forwardRef(
  ({
    className: p,
    slotProps: f,
    suffix: e,
    endAdornment: u,
    startAdornment: x,
    size: c,
    value: b,
    onChange: h,
    defaultValue: y,
    type: a,
    disabled: n,
    voiceMode: g,
    onWheel: o,
    id: w,
    "aria-describedby": v,
    "aria-invalid": N,
    ...R
  }, V) => {
    const { ref: D, ...t } = { ref: V, type: a, disabled: n, ...f?.inputProps }, m = i.useRef(null), s = T(g && j(t.type), t.disabled || t.readOnly, m);
    i.useImperativeHandle(D, () => m.current, []);
    const F = (l) => {
      a === "number" && l.target.blur(), o && o(l);
    };
    return /* @__PURE__ */ I("div", { ...R, className: d(k({ size: c, className: p })), "aria-disabled": n, children: [
      x,
      /* @__PURE__ */ r(
        "input",
        {
          onWheel: F,
          ref: m,
          id: w,
          "aria-describedby": v,
          "aria-invalid": N,
          onChange: h,
          value: b,
          defaultValue: y,
          ...t,
          className: d(
            "focus:mtx-outline-none mtx-w-full mtx-h-full mtx-py-1 mtx-rounded-sm file:mtx-border-0 mtx-bg-transparent file:mtx-text-sm file:mtx-font-medium file:mtx-text-foreground placeholder:mtx-text-text-300",
            x ? "mtx-ps-1 mtx-pe-3" : "mtx-px-3",
            t.className
          )
        }
      ),
      typeof e == "string" || typeof e == "number" ? /* @__PURE__ */ r("span", { className: "mtx-inline-flex mtx-items-center mtx-px-2 mtx-text-xs mtx-font-medium mtx-text-primary mtx-bg-primary-50 mtx-m-0.5 mtx-rounded-sm mtx-h-[calc(100%-4px)]", children: e }) : e,
      u,
      s && /* @__PURE__ */ r(z, { ...s, className: "mtx-me-1 mtx-shrink-0" })
    ] });
  }
);
B.displayName = "TextField";
export {
  B as TextField
};
//# sourceMappingURL=textfield.es.js.map
