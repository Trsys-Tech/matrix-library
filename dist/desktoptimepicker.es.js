import { jsxs as p, jsx as e } from "react/jsx-runtime";
import { useState as s } from "react";
import { cn as m } from "./utils.es.js";
import { Button as c } from "./button.es.js";
import { TimePickerContent as l } from "./timepickercontent.es.js";
import { Popover as u, PopoverTrigger as b, PopoverContent as f } from "./popover.es.js";
const $ = ({
  time: t,
  onTimeChange: a,
  className: n,
  slotsProps: r,
  placeholder: x = "Pick a Time",
  ...d
}) => {
  const [o, i] = s(!1);
  return /* @__PURE__ */ p(u, { open: o, onOpenChange: i, children: [
    /* @__PURE__ */ e(b, { asChild: !0, children: /* @__PURE__ */ e(
      c,
      {
        variant: "text",
        className: m(
          "mtx-flex mtx-h-8 mtx-w-full mtx-items-center mtx-justify-between mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-ps-3 mtx-pe-1 mtx-py-1.5 mtx-text-xs mtx-ring-offset-background data-[placeholder]:mtx-text-muted-foreground hover:mtx-border hover:mtx-border-primary hover:mtx-bg-transparent focus:mtx-border focus:mtx-border-primary focus:mtx-outline-none focus:mtx-ring focus:mtx-ring-primary-100 disabled:mtx-cursor-not-allowed disabled:mtx-bg-gray-100 disabled:mtx-text-text-300 disabled:mtx-border-gray-100 [&>span]:mtx-line-clamp-1 [&_svg]:disabled:mtx-text-text-300",
          n
        ),
        "data-placeholder": t ? void 0 : "",
        "aria-label": t?.hour ? `Selected time: ${t.hour}:${t.minute} ${t.ampm}` : x,
        ...d,
        type: "button",
        children: `${t?.hour?.toString()?.padStart(2, "0") ?? "--"} : ${t?.minute?.toString()?.padStart(2, "0") ?? "--"} ${t?.ampm ?? "--"}`
      }
    ) }),
    /* @__PURE__ */ e(f, { ...r?.content ?? {}, className: m("mtx-w-auto mtx-p-0", r?.content?.className), children: /* @__PURE__ */ e(l, { isOpen: o, onTimeChange: a, time: t, slotsProps: r }) })
  ] });
};
export {
  $ as DesktopTimePicker
};
//# sourceMappingURL=desktoptimepicker.es.js.map
