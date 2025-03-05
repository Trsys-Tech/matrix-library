import { jsxs as _, jsx as s } from "react/jsx-runtime";
import f from "react";
import { cn as a } from "./utils.es.js";
import { tv as $ } from "tailwind-variants";
import { Star as C } from "@trsys-tech/matrix-icons";
const E = $({
  base: "flex items-center gap-0",
  variants: {
    variant: {
      default: "text-yellow-400",
      primary: "text-primary",
      secondary: "text-secondary",
      success: "text-success",
      danger: "text-danger",
      warning: "text-warning",
      info: "text-info"
    },
    size: {
      sm: "[&_*_svg]:h-5 [&_*_svg]:w-5",
      md: "[&_*_svg]:h-6 [&_*_svg]:w-6",
      lg: "[&_*_svg]:h-8 [&_*_svg]:w-8"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
}), P = f.forwardRef((o, t) => {
  const {
    precision: n = "full",
    variant: r,
    size: c,
    readOnly: u = !1,
    onValueChange: l,
    value: e = 0,
    className: k,
    children: y,
    max: m = 5,
    Icon: b = C,
    disabled: d,
    ...w
  } = o, [h, g] = f.useState(e), [N, x] = f.useState(null), v = N ?? h;
  f.useEffect(() => {
    g(e);
  }, [e]);
  const M = (i) => {
    u || (g(i), l?.(i));
  }, S = (i) => {
    u || x(i);
  };
  return /* @__PURE__ */ _(
    "div",
    {
      className: a(E({ variant: r, size: c, className: k })),
      role: "slider",
      "data-value": h,
      "aria-valuenow": v,
      "aria-valuemin": 0,
      "aria-valuemax": m,
      "aria-valuetext": `${v} out of ${m}`,
      ...w,
      ref: t,
      children: [
        Array.from({ length: m }).map((i, p) => /* @__PURE__ */ s(
          R,
          {
            Icon: b,
            index: p,
            displayedValue: v,
            onHover: S,
            onValueChange: M,
            precision: n,
            readOnly: u,
            disabled: d
          },
          p
        )),
        y
      ]
    }
  );
}), R = ({ Icon: o, index: t, displayedValue: n, onHover: r, onValueChange: c, precision: u, readOnly: l, disabled: e }) => u === "half" ? /* @__PURE__ */ _(
  "div",
  {
    className: a(
      "relative hover:scale-125 transition-transform px-0.5",
      l && "hover:scale-100",
      e && "hover:scale-100 opacity-70"
    ),
    children: [
      /* @__PURE__ */ s(o, { className: a("stroke-gray-500") }),
      /* @__PURE__ */ s(
        "button",
        {
          type: "button",
          className: a(
            "absolute top-0 w-[calc(50%+2px)] left-0 overflow-hidden h-full",
            l && "cursor-default",
            e && "cursor-default hover:scale-100 opacity-70"
          ),
          onClick: () => c(t + 0.5),
          onMouseEnter: () => r(t + 0.5),
          onMouseLeave: () => r(null),
          disabled: e,
          "aria-label": `Set rating to ${t + 0.5}`,
          children: /* @__PURE__ */ s(
            o,
            {
              className: a(
                "stroke-none absolute left-0.5 top-0 [mask-image:linear-gradient(to_right,_black_50%,_transparent_50%)]",
                n >= t + 0.5 && "stroke-current fill-current"
              )
            }
          )
        }
      ),
      /* @__PURE__ */ s(
        "button",
        {
          type: "button",
          className: a(
            "absolute top-0 w-[calc(50%+2px)] right-0 overflow-hidden h-full",
            l && "cursor-default",
            e && "cursor-default hover:scale-100 opacity-70"
          ),
          onClick: () => c(t + 1),
          onMouseEnter: () => r(t + 1),
          onMouseLeave: () => r(null),
          disabled: e,
          "aria-label": `Set rating to ${t + 1}`,
          children: /* @__PURE__ */ s(
            o,
            {
              className: a(
                "stroke-none absolute right-0.5 top-0 [mask-image:linear-gradient(to_left,_black_50%,_transparent_50%)]",
                n >= t + 1 && "stroke-current fill-current"
              )
            }
          )
        }
      )
    ]
  }
) : /* @__PURE__ */ s(
  "button",
  {
    type: "button",
    onClick: () => c(t + 1),
    onMouseEnter: () => r(t + 1),
    onMouseLeave: () => r(null),
    className: a(
      "hover:scale-125 px-0.5 transition-transform",
      l && "cursor-default hover:scale-100",
      e && "cursor-default hover:scale-100 opacity-70"
    ),
    disabled: e,
    "aria-label": `Set rating to ${t + 1}`,
    children: /* @__PURE__ */ s(o, { className: a("stroke-gray-500", n >= t + 1 && "stroke-current fill-current") })
  }
);
export {
  P as Rating
};
//# sourceMappingURL=rating.es.js.map
