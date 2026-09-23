import { jsxs as x, jsx as e } from "react/jsx-runtime";
import { useState as d } from "react";
import { VisuallyHidden as c } from "@radix-ui/react-visually-hidden";
import { cn as u } from "./utils.es.js";
import { Button as b } from "./button.es.js";
import { TimePickerContent as f } from "./timepickercontent.es.js";
import { SwipableDrawer as h, SwipableDrawerContent as g, SwipableDrawerHeader as w, SwipableDrawerTitle as S, SwipableDrawerDescription as y } from "./swipabledrawer.es.js";
const l = (t, m) => {
  const o = t.minute.toString().padStart(2, "0");
  if (m)
    return `${(t.ampm ? t.hour % 12 + (t.ampm === "PM" ? 12 : 0) : t.hour).toString().padStart(2, "0")} : ${o}`;
  const a = t.ampm ? t.hour % 12 + (t.ampm === "PM" ? 12 : 0) : t.hour, r = a % 12 || 12, n = t.ampm ?? (a >= 12 ? "PM" : "AM");
  return `${r.toString().padStart(2, "0")} : ${o} ${n}`;
}, j = ({
  time: t,
  onTimeChange: m,
  className: o,
  slotsProps: a,
  is24HourMode: r = !1,
  placeholder: n = "Pick a time",
  ...i
}) => {
  const [p, s] = d(!1);
  return /* @__PURE__ */ x(h, { open: p, onOpenChange: s, children: [
    /* @__PURE__ */ e(
      b,
      {
        variant: "text",
        className: u(
          "mtx-flex mtx-h-8 mtx-w-full mtx-items-center mtx-justify-between mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-ps-3 mtx-pe-1 mtx-py-1.5 mtx-text-xs mtx-ring-offset-background data-[placeholder]:mtx-text-muted-foreground hover:mtx-border hover:mtx-border-primary hover:mtx-bg-transparent focus:mtx-border focus:mtx-border-primary focus:mtx-outline-none focus:mtx-ring focus:mtx-ring-primary-100 disabled:mtx-cursor-not-allowed disabled:mtx-bg-gray-100 disabled:mtx-text-text-300 disabled:mtx-border-gray-100 [&>span]:mtx-line-clamp-1 [&_svg]:disabled:mtx-text-text-300",
          o
        ),
        "data-placeholder": t ? void 0 : "",
        onClick: () => s(!0),
        "aria-label": t ? `Selected time: ${l(t, r)}` : n,
        ...i,
        type: "button",
        children: t ? l(t, r) : "-- : --"
      }
    ),
    /* @__PURE__ */ x(g, { children: [
      /* @__PURE__ */ e(w, { className: "mtx-p-0", children: /* @__PURE__ */ x(c, { children: [
        /* @__PURE__ */ e(S, { className: "mtx-text-primary mtx-text-lg mtx-font-bold mtx-text-start", children: " " }),
        /* @__PURE__ */ e(y, { children: " " })
      ] }) }),
      /* @__PURE__ */ e(f, { isOpen: p, is24HourMode: r, onTimeChange: m, time: t, slotsProps: a })
    ] })
  ] });
};
export {
  j as MobileTimePicker
};
//# sourceMappingURL=mobiletimepicker.es.js.map
