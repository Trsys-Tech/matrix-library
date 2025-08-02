import { jsxs as t, jsx as r } from "react/jsx-runtime";
import { useState as p } from "react";
import { VisuallyHidden as c } from "@radix-ui/react-visually-hidden";
import { cn as m } from "./utils.es.js";
import { Button as b } from "./button.es.js";
import { TimePickerContent as u } from "./timepickercontent.es.js";
import { SwipableDrawer as f, SwipableDrawerContent as h, SwipableDrawerHeader as g, SwipableDrawerTitle as w, SwipableDrawerDescription as x } from "./swipabledrawer.es.js";
const j = ({
  time: e,
  onTimeChange: i,
  className: n,
  slotsProps: l,
  placeholder: d = "Pick a time",
  ...s
}) => {
  const [a, o] = p(!1);
  return /* @__PURE__ */ t(f, { open: a, onOpenChange: o, children: [
    /* @__PURE__ */ r(
      b,
      {
        variant: "text",
        className: m(
          "flex h-8 w-full items-center justify-between whitespace-nowrap rounded-sm border border-input bg-transparent ps-3 pe-1 py-1.5 text-xs ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-gray-100 [&>span]:line-clamp-1 [&_svg]:disabled:text-text-300",
          n
        ),
        "data-placeholder": e ? void 0 : "",
        onClick: () => o(!0),
        "aria-label": e?.hour ? `Selected time: ${e.hour}:${e.minute} ${e.ampm}` : d,
        ...s,
        children: `${e?.hour?.toString()?.padStart(2, "0") ?? "--"} : ${e?.minute?.toString()?.padStart(2, "0") ?? "--"} ${e?.ampm ?? "--"}`
      }
    ),
    /* @__PURE__ */ t(h, { children: [
      /* @__PURE__ */ r(g, { className: "p-0", children: /* @__PURE__ */ t(c, { children: [
        /* @__PURE__ */ r(w, { className: "text-primary text-lg font-bold text-start", children: " " }),
        /* @__PURE__ */ r(x, { children: " " })
      ] }) }),
      /* @__PURE__ */ r(u, { isOpen: a, onTimeChange: i, time: e, slotsProps: l })
    ] })
  ] });
};
export {
  j as MobileTimePicker
};
//# sourceMappingURL=mobiletimepicker.es.js.map
