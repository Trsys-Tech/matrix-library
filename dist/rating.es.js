import { jsxs as p, jsx as m } from "react/jsx-runtime";
import u from "react";
import { cn as a } from "./utils.es.js";
import { tv as $ } from "tailwind-variants";
import { Star as C } from "@trsys-tech/matrix-icons";
const E = $({
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
}), P = u.forwardRef((s, t) => {
  const {
    precision: l = "full",
    variant: r,
    size: n,
    readOnly: x = !1,
    onValueChange: o,
    value: e = 0,
    className: _,
    children: k,
    max: i = 5,
    Icon: y = C,
    disabled: b,
    ...d
  } = s, [v, h] = u.useState(e), [w, N] = u.useState(null), f = w ?? v;
  u.useEffect(() => {
    h(e);
  }, [e]);
  const M = (c) => {
    x || (h(c), o?.(c));
  }, S = (c) => {
    x || N(c);
  };
  return /* @__PURE__ */ p(
    "div",
    {
      className: a(E({ variant: r, size: n, className: _ })),
      role: "slider",
      "data-value": v,
      "aria-valuenow": f,
      "aria-valuemin": 0,
      "aria-valuemax": i,
      "aria-valuetext": `${f} out of ${i}`,
      ...d,
      ref: t,
      children: [
        Array.from({ length: i }).map((c, g) => /* @__PURE__ */ m(
          R,
          {
            Icon: y,
            index: g,
            displayedValue: f,
            onHover: S,
            onValueChange: M,
            precision: l,
            readOnly: x,
            disabled: b
          },
          g
        )),
        k
      ]
    }
  );
}), R = ({ Icon: s, index: t, displayedValue: l, onHover: r, onValueChange: n, precision: x, readOnly: o, disabled: e }) => x === "half" ? /* @__PURE__ */ p(
  "div",
  {
    className: a(
      "mtx-relative hover:mtx-scale-125 mtx-transition-transform mtx-px-0.5",
      o && "hover:mtx-scale-100",
      e && "hover:mtx-scale-100 mtx-opacity-70"
    ),
    children: [
      /* @__PURE__ */ m(s, { className: a("mtx-stroke-gray-500") }),
      /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          className: a(
            "mtx-absolute mtx-top-0 mtx-w-[calc(50%+2px)] mtx-left-0 mtx-overflow-hidden mtx-h-full",
            o && "mtx-cursor-default",
            e && "mtx-cursor-default hover:mtx-scale-100 mtx-opacity-70"
          ),
          onClick: () => n(t + 0.5),
          onMouseEnter: () => r(t + 0.5),
          onMouseLeave: () => r(null),
          disabled: e,
          "aria-label": `Set rating to ${t + 0.5}`,
          children: /* @__PURE__ */ m(
            s,
            {
              className: a(
                "mtx-stroke-none mtx-absolute mtx-left-0.5 mtx-top-0 mtx-[mask-image:linear-gradient(to_right,_black_50%,_transparent_50%)]",
                l >= t + 0.5 && "mtx-stroke-current mtx-fill-current"
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
            o && "mtx-cursor-default",
            e && "mtx-cursor-default hover:mtx-scale-100 mtx-opacity-70"
          ),
          onClick: () => n(t + 1),
          onMouseEnter: () => r(t + 1),
          onMouseLeave: () => r(null),
          disabled: e,
          "aria-label": `Set rating to ${t + 1}`,
          children: /* @__PURE__ */ m(
            s,
            {
              className: a(
                "mtx-stroke-none mtx-absolute mtx-right-0.5 mtx-top-0 mtx-[mask-image:linear-gradient(to_left,_black_50%,_transparent_50%)]",
                l >= t + 1 && "mtx-stroke-current mtx-fill-current"
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
      o && "mtx-cursor-default hover:mtx-scale-100",
      e && "mtx-cursor-default hover:mtx-scale-100 mtx-opacity-70"
    ),
    disabled: e,
    "aria-label": `Set rating to ${t + 1}`,
    children: /* @__PURE__ */ m(s, { className: a("mtx-stroke-gray-500", l >= t + 1 && "mtx-stroke-current mtx-fill-current") })
  }
);
export {
  P as Rating
};
//# sourceMappingURL=rating.es.js.map
