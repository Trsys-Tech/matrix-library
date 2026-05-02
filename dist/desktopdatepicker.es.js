import { jsxs as o, jsx as e } from "react/jsx-runtime";
import * as h from "react";
import { Calendar as g } from "@trsys-tech/matrix-icons";
import { cn as w } from "./utils.es.js";
import { Calendar as v } from "./calendar.es.js";
import { Button as C } from "./button.es.js";
import { Popover as k, PopoverTrigger as D, PopoverContent as M } from "./popover.es.js";
import { format as m } from "./format.es.js";
const I = ({
  formatStr: r,
  selected: t,
  placeholder: n,
  className: d,
  calendarClassName: i,
  closeOnSelect: s = !0,
  onDayClick: x,
  disabled: p,
  ...l
}) => {
  const [c, a] = h.useState(!1), u = (f, y, b) => {
    x?.(f, y, b), s && a(!1);
  };
  return /* @__PURE__ */ o(k, { open: c, onOpenChange: a, children: [
    /* @__PURE__ */ e(D, { asChild: !0, children: /* @__PURE__ */ o(
      C,
      {
        variant: "text",
        className: w(
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
          /* @__PURE__ */ e(g, { className: "mtx-mr-2 mtx-ms-auto" })
        ]
      }
    ) }),
    /* @__PURE__ */ e(M, { className: "mtx-w-auto mtx-p-0", children: /* @__PURE__ */ e(
      v,
      {
        defaultMonth: t,
        startMonth: new Date(2e3, 0, 1),
        endMonth: new Date((/* @__PURE__ */ new Date()).getFullYear() + 2, 11, 31),
        ...l,
        mode: "single",
        selected: t,
        captionLayout: "dropdown-years",
        className: i,
        onDayClick: u
      }
    ) })
  ] });
};
export {
  I as DesktopDatePicker
};
//# sourceMappingURL=desktopdatepicker.es.js.map
