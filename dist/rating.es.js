import { jsxs as g, jsx as m } from "react/jsx-runtime";
import f from "react";
import { cn as a } from "./utils.es.js";
import { tv as R } from "tailwind-variants";
import { Star as z } from "@trsys-tech/matrix-icons";
const E = R({
  base: "mtx-flex mtx-items-center mtx-gap-0",
  variants: {
    variant: {
      default: "mtx-text-yellow-400",
      primary: "mtx-text-primary",
      secondary: "mtx-text-secondary",
      success: "mtx-text-success",
      danger: "mtx-text-danger",
      warning: "mtx-text-warning",
      info: "mtx-text-info"
    },
    size: {
      sm: "[&_*_svg]:mtx-h-5 [&_*_svg]:mtx-w-5",
      md: "[&_*_svg]:mtx-h-6 [&_*_svg]:mtx-w-6",
      lg: "[&_*_svg]:mtx-h-8 [&_*_svg]:mtx-w-8"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
}), D = f.forwardRef((o, t) => {
  const {
    precision: s = "full",
    variant: r,
    size: n,
    readOnly: x = !1,
    onValueChange: l,
    value: e,
    defaultValue: p = 0,
    className: _,
    children: d,
    max: u = 5,
    Icon: k = z,
    disabled: y,
    ...b
  } = o, w = e !== void 0, [N, V] = f.useState(p), v = e !== void 0 ? e : N, [M, S] = f.useState(null), i = M ?? v, C = (c) => {
    x || (w || V(c), l?.(c));
  }, $ = (c) => {
    x || S(c);
  };
  return /* @__PURE__ */ g(
    "div",
    {
      className: a(E({ variant: r, size: n, className: _ })),
      role: "slider",
      "data-value": v,
      "aria-valuenow": i,
      "aria-valuemin": 0,
      "aria-valuemax": u,
      "aria-valuetext": `${i} out of ${u}`,
      ...b,
      ref: t,
      children: [
        Array.from({ length: u }).map((c, h) => /* @__PURE__ */ m(
          L,
          {
            Icon: k,
            index: h,
            displayedValue: i,
            onHover: $,
            onValueChange: C,
            precision: s,
            readOnly: x,
            disabled: y
          },
          h
        )),
        d
      ]
    }
  );
}), L = ({ Icon: o, index: t, displayedValue: s, onHover: r, onValueChange: n, precision: x, readOnly: l, disabled: e }) => x === "half" ? /* @__PURE__ */ g(
  "div",
  {
    className: a(
      "mtx-relative hover:mtx-scale-125 mtx-transition-transform mtx-px-0.5",
      l && "hover:mtx-scale-100",
      e && "hover:mtx-scale-100 mtx-opacity-70"
    ),
    children: [
      /* @__PURE__ */ m(o, { className: a("mtx-stroke-gray-500") }),
      /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          className: a(
            "mtx-absolute mtx-top-0 mtx-w-[calc(50%+2px)] mtx-left-0 mtx-overflow-hidden mtx-h-full",
            l && "mtx-cursor-default",
            e && "mtx-cursor-default hover:mtx-scale-100 mtx-opacity-70"
          ),
          onClick: () => n(t + 0.5),
          onMouseEnter: () => r(t + 0.5),
          onMouseLeave: () => r(null),
          disabled: e,
          "aria-label": `Set rating to ${t + 0.5}`,
          children: /* @__PURE__ */ m(
            o,
            {
              className: a(
                "mtx-stroke-none mtx-absolute mtx-left-0.5 mtx-top-0 mtx-[mask-image:linear-gradient(to_right,_black_50%,_transparent_50%)]",
                s >= t + 0.5 && "mtx-stroke-current mtx-fill-current"
              )
            }
          )
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          className: a(
            "mtx-absolute mtx-top-0 mtx-w-[calc(50%+2px)] mtx-right-0 mtx-overflow-hidden mtx-h-full",
            l && "mtx-cursor-default",
            e && "mtx-cursor-default hover:mtx-scale-100 mtx-opacity-70"
          ),
          onClick: () => n(t + 1),
          onMouseEnter: () => r(t + 1),
          onMouseLeave: () => r(null),
          disabled: e,
          "aria-label": `Set rating to ${t + 1}`,
          children: /* @__PURE__ */ m(
            o,
            {
              className: a(
                "mtx-stroke-none mtx-absolute mtx-right-0.5 mtx-top-0 mtx-[mask-image:linear-gradient(to_left,_black_50%,_transparent_50%)]",
                s >= t + 1 && "mtx-stroke-current mtx-fill-current"
              )
            }
          )
        }
      )
    ]
  }
) : /* @__PURE__ */ m(
  "button",
  {
    type: "button",
    onClick: () => n(t + 1),
    onMouseEnter: () => r(t + 1),
    onMouseLeave: () => r(null),
    className: a(
      "hover:mtx-scale-125 mtx-px-0.5 mtx-transition-transform",
      l && "mtx-cursor-default hover:mtx-scale-100",
      e && "mtx-cursor-default hover:mtx-scale-100 mtx-opacity-70"
    ),
    disabled: e,
    "aria-label": `Set rating to ${t + 1}`,
    children: /* @__PURE__ */ m(o, { className: a("mtx-stroke-gray-500", s >= t + 1 && "mtx-stroke-current mtx-fill-current") })
  }
);
export {
  D as Rating
};
//# sourceMappingURL=rating.es.js.map
