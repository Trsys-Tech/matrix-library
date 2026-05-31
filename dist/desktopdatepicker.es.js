import { jsxs as o, jsx as e } from "react/jsx-runtime";
import * as g from "react";
import { Calendar as w } from "@trsys-tech/matrix-icons";
import { cn as v } from "./utils.es.js";
import { Calendar as C } from "./calendar.es.js";
import { Button as k } from "./button.es.js";
import { Popover as D, PopoverTrigger as M, PopoverContent as P } from "./popover.es.js";
import { format as m } from "./format.es.js";
const L = ({
  formatStr: r,
  selected: t,
  placeholder: n,
  className: d,
  calendarClassName: i,
  closeOnSelect: s = !0,
  onDayClick: x,
  disabled: p,
  disabledDates: l,
  ...c
}) => {
  const [u, a] = g.useState(!1), f = (b, y, h) => {
    x?.(b, y, h), s && a(!1);
  };
  return /* @__PURE__ */ o(D, { open: u, onOpenChange: a, children: [
    /* @__PURE__ */ e(M, { asChild: !0, children: /* @__PURE__ */ o(
      k,
      {
        variant: "text",
        className: v(
          "mtx-flex mtx-h-8 mtx-w-full mtx-items-center mtx-justify-between mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-ps-3 mtx-pe-1 mtx-py-1.5 mtx-text-xs mtx-ring-offset-background data-[placeholder]:mtx-text-muted-foreground hover:mtx-border hover:mtx-border-primary hover:mtx-bg-transparent focus:mtx-border focus:mtx-border-primary focus:mtx-outline-none focus:mtx-ring focus:mtx-ring-primary-100 disabled:mtx-cursor-not-allowed disabled:mtx-bg-gray-100 disabled:mtx-text-text-300 disabled:mtx-border-gray-100 [&>span]:mtx-line-clamp-1 [&_svg]:disabled:mtx-text-text-300",
          d
        ),
        "data-placeholder": t ? void 0 : "",
        "aria-label": t ? `Selected date: ${m(t, r ?? "yyyy/MM/dd")}` : "Pick a date",
        disabled: p,
        "aria-haspopup": "dialog",
        type: "button",
        children: [
          t ? m(t, r ?? "yyyy/MM/dd") : /* @__PURE__ */ e("span", { children: n ?? "Pick a date" }),
          /* @__PURE__ */ e(w, { className: "mtx-mr-2 mtx-ms-auto" })
        ]
      }
    ) }),
    /* @__PURE__ */ e(P, { className: "mtx-w-auto mtx-p-0", children: /* @__PURE__ */ e(
      C,
      {
        defaultMonth: t,
        startMonth: new Date(2e3, 0, 1),
        endMonth: new Date((/* @__PURE__ */ new Date()).getFullYear() + 2, 11, 31),
        ...c,
        mode: "single",
        selected: t,
        captionLayout: "dropdown-years",
        className: i,
        onDayClick: f,
        disabled: l
      }
    ) })
  ] });
};
export {
  L as DesktopDatePicker
};
//# sourceMappingURL=desktopdatepicker.es.js.map
