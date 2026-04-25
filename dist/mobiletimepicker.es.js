import { jsxs as r, jsx as e } from "react/jsx-runtime";
import { useState as d } from "react";
import { VisuallyHidden as s } from "@radix-ui/react-visually-hidden";
import { cn as p } from "./utils.es.js";
import { Button as c } from "./button.es.js";
import { TimePickerContent as b } from "./timepickercontent.es.js";
import { SwipableDrawer as u, SwipableDrawerContent as f, SwipableDrawerHeader as h, SwipableDrawerTitle as g, SwipableDrawerDescription as w } from "./swipabledrawer.es.js";
const j = ({
  time: t,
  onTimeChange: a,
  className: n,
  slotsProps: i,
  placeholder: x = "Pick a time",
  ...l
}) => {
  const [m, o] = d(!1);
  return /* @__PURE__ */ r(u, { open: m, onOpenChange: o, children: [
    /* @__PURE__ */ e(
      c,
      {
        variant: "text",
        className: p(
          "mtx-flex mtx-h-8 mtx-w-full mtx-items-center mtx-justify-between mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-ps-3 mtx-pe-1 mtx-py-1.5 mtx-text-xs mtx-ring-offset-background data-[placeholder]:mtx-text-muted-foreground hover:mtx-border hover:mtx-border-primary hover:mtx-bg-transparent focus:mtx-border focus:mtx-border-primary focus:mtx-outline-none focus:mtx-ring focus:mtx-ring-primary-100 disabled:mtx-cursor-not-allowed disabled:mtx-bg-gray-100 disabled:mtx-text-text-300 disabled:mtx-border-gray-100 [&>span]:mtx-line-clamp-1 [&_svg]:disabled:mtx-text-text-300",
          n
        ),
        "data-placeholder": t ? void 0 : "",
        onClick: () => o(!0),
        "aria-label": t?.hour ? `Selected time: ${t.hour}:${t.minute} ${t.ampm}` : x,
        ...l,
        type: "button",
        children: `${t?.hour?.toString()?.padStart(2, "0") ?? "--"} : ${t?.minute?.toString()?.padStart(2, "0") ?? "--"} ${t?.ampm ?? "--"}`
      }
    ),
    /* @__PURE__ */ r(f, { children: [
      /* @__PURE__ */ e(h, { className: "mtx-p-0", children: /* @__PURE__ */ r(s, { children: [
        /* @__PURE__ */ e(g, { className: "mtx-text-primary mtx-text-lg mtx-font-bold mtx-text-start", children: " " }),
        /* @__PURE__ */ e(w, { children: " " })
      ] }) }),
      /* @__PURE__ */ e(b, { isOpen: m, onTimeChange: a, time: t, slotsProps: i })
    ] })
  ] });
};
export {
  j as MobileTimePicker
};
//# sourceMappingURL=mobiletimepicker.es.js.map
