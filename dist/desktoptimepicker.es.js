import { jsxs as i, jsx as m } from "react/jsx-runtime";
import { useState as u } from "react";
import { cn as s } from "./utils.es.js";
import { Button as l } from "./button.es.js";
import { Popover as f, PopoverTrigger as h, PopoverContent as b } from "./popover.es.js";
import { TimePickerContent as g } from "./timepickercontent.es.js";
const d = (t, a) => {
  const o = t.minute.toString().padStart(2, "0");
  if (a)
    return `${(t.ampm ? t.hour % 12 + (t.ampm === "PM" ? 12 : 0) : t.hour).toString().padStart(2, "0")} : ${o}`;
  const r = t.ampm ? t.hour % 12 + (t.ampm === "PM" ? 12 : 0) : t.hour, e = r % 12 || 12, n = t.ampm ?? (r >= 12 ? "PM" : "AM");
  return `${e.toString().padStart(2, "0")} : ${o} ${n}`;
}, k = ({
  time: t,
  onTimeChange: a,
  className: o,
  slotsProps: r,
  is24HourMode: e = !1,
  placeholder: n = "Pick a Time",
  ...x
}) => {
  const [p, c] = u(!1);
  return /* @__PURE__ */ i(f, { open: p, onOpenChange: c, children: [
    /* @__PURE__ */ m(h, { asChild: !0, children: /* @__PURE__ */ m(
      l,
      {
        variant: "text",
        className: s(
          "mtx-flex mtx-h-8 mtx-w-full mtx-items-center mtx-justify-between mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-ps-3 mtx-pe-1 mtx-py-1.5 mtx-text-xs mtx-ring-offset-background data-[placeholder]:mtx-text-muted-foreground hover:mtx-border hover:mtx-border-primary hover:mtx-bg-transparent focus:mtx-border focus:mtx-border-primary focus:mtx-outline-none focus:mtx-ring focus:mtx-ring-primary-100 disabled:mtx-cursor-not-allowed disabled:mtx-bg-gray-100 disabled:mtx-text-text-300 disabled:mtx-border-gray-100 [&>span]:mtx-line-clamp-1 [&_svg]:disabled:mtx-text-text-300",
          o
        ),
        "data-placeholder": t ? void 0 : "",
        "aria-label": t ? `Selected time: ${d(t, e)}` : n,
        ...x,
        type: "button",
        children: t ? d(t, e) : "-- : --"
      }
    ) }),
    /* @__PURE__ */ m(b, { ...r?.content ?? {}, className: s("mtx-w-auto mtx-p-0", r?.content?.className), children: /* @__PURE__ */ m(g, { isOpen: p, is24HourMode: e, onTimeChange: a, time: t, slotsProps: r }) })
  ] });
};
export {
  k as DesktopTimePicker
};
//# sourceMappingURL=desktoptimepicker.es.js.map
