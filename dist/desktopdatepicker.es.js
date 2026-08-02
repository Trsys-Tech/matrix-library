import { jsxs as m, jsx as e } from "react/jsx-runtime";
import * as v from "react";
import { Calendar as C } from "@trsys-tech/matrix-icons";
import { cn as k } from "./utils.es.js";
import { Calendar as M } from "./calendar.es.js";
import { toCalendarDate as P, toDateOnlyString as N } from "./datevalue.es.js";
import { Button as O } from "./button.es.js";
import { Popover as S, PopoverTrigger as j, PopoverContent as $ } from "./popover.es.js";
import { format as n } from "./format.es.js";
const q = ({
  formatStr: a,
  selected: d,
  placeholder: s,
  className: l,
  calendarClassName: i,
  closeOnSelect: x = !0,
  onSelect: p,
  onDayClick: c,
  disabled: u,
  disabledDates: f,
  ...y
}) => {
  const [b, o] = v.useState(!1), t = P(d), h = (r, w, D) => {
    c?.(r, w, D), x && o(!1);
  }, g = (r) => {
    p?.(N(r));
  };
  return /* @__PURE__ */ m(S, { open: b, onOpenChange: o, children: [
    /* @__PURE__ */ e(j, { asChild: !0, children: /* @__PURE__ */ m(
      O,
      {
        variant: "text",
        className: k(
          "mtx-flex mtx-h-8 mtx-w-full mtx-items-center mtx-justify-between mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-ps-3 mtx-pe-1 mtx-py-1.5 mtx-text-xs mtx-ring-offset-background data-[placeholder]:mtx-text-muted-foreground hover:mtx-border hover:mtx-border-primary hover:mtx-bg-transparent focus:mtx-border focus:mtx-border-primary focus:mtx-outline-none focus:mtx-ring focus:mtx-ring-primary-100 disabled:mtx-cursor-not-allowed disabled:mtx-bg-gray-100 disabled:mtx-text-text-300 disabled:mtx-border-gray-100 [&>span]:mtx-line-clamp-1 [&_svg]:disabled:mtx-text-text-300",
          l
        ),
        "data-placeholder": t ? void 0 : "",
        "aria-label": t ? `Selected date: ${n(t, a ?? "yyyy/MM/dd")}` : "Pick a date",
        "aria-haspopup": "dialog",
        disabled: u,
        type: "button",
        children: [
          t ? n(t, a ?? "yyyy/MM/dd") : /* @__PURE__ */ e("span", { children: s ?? "Pick a date" }),
          /* @__PURE__ */ e(C, { className: "mtx-mr-2 mtx-ms-auto" })
        ]
      }
    ) }),
    /* @__PURE__ */ e($, { className: "mtx-w-auto mtx-p-0", children: /* @__PURE__ */ e(
      M,
      {
        defaultMonth: t,
        startMonth: new Date(2e3, 0, 1),
        endMonth: new Date((/* @__PURE__ */ new Date()).getFullYear() + 2, 11, 31),
        ...y,
        mode: "single",
        selected: t,
        captionLayout: "dropdown-years",
        className: i,
        onSelect: g,
        onDayClick: h,
        disabled: f
      }
    ) })
  ] });
};
export {
  q as DesktopDatePicker
};
//# sourceMappingURL=desktopdatepicker.es.js.map
