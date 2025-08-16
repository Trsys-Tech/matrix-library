import { jsxs as c, jsx as r } from "react/jsx-runtime";
import { useState as l } from "react";
import { cn as a } from "./utils.es.js";
import { Button as m } from "./button.es.js";
import { TimePickerContent as u } from "./timepickercontent.es.js";
import { Popover as b, PopoverTrigger as f, PopoverContent as g } from "./popover.es.js";
const $ = ({
  time: e,
  onTimeChange: n,
  className: d,
  slotsProps: o,
  placeholder: i = "Pick a Time",
  ...s
}) => {
  const [t, p] = l(!1);
  return /* @__PURE__ */ c(b, { open: t, onOpenChange: p, children: [
    /* @__PURE__ */ r(f, { asChild: !0, children: /* @__PURE__ */ r(
      m,
      {
        variant: "text",
        className: a(
          "flex h-8 w-full items-center justify-between whitespace-nowrap rounded-sm border border-input bg-transparent ps-3 pe-1 py-1.5 text-xs ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-gray-100 [&>span]:line-clamp-1 [&_svg]:disabled:text-text-300",
          d
        ),
        "data-placeholder": e ? void 0 : "",
        "aria-label": e?.hour ? `Selected time: ${e.hour}:${e.minute} ${e.ampm}` : i,
        ...s,
        children: `${e?.hour?.toString()?.padStart(2, "0") ?? "--"} : ${e?.minute?.toString()?.padStart(2, "0") ?? "--"} ${e?.ampm ?? "--"}`
      }
    ) }),
    /* @__PURE__ */ r(g, { ...o?.content ?? {}, className: a("w-auto p-0", o?.content?.className), children: /* @__PURE__ */ r(u, { isOpen: t, onTimeChange: n, time: e, slotsProps: o }) })
  ] });
};
export {
  $ as DesktopTimePicker
};
//# sourceMappingURL=desktoptimepicker.es.js.map
