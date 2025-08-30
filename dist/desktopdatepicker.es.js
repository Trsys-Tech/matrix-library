import { jsxs as t, jsx as r } from "react/jsx-runtime";
import * as g from "react";
import { Calendar as x } from "@trsys-tech/matrix-icons";
import { cn as w } from "./utils.es.js";
import { Calendar as v } from "./calendar.es.js";
import { Button as C } from "./button.es.js";
import { Popover as D, PopoverTrigger as k, PopoverContent as M } from "./popover.es.js";
import { formatDate as n } from "./format.es.js";
const I = ({
  formatStr: a,
  selected: e,
  placeholder: s,
  className: d,
  calendarClassName: i,
  closeOnSelect: l = !0,
  onDayClick: p,
  disabled: m,
  ...c
}) => {
  const [f, o] = g.useState(!1), u = (y, b, h) => {
    p?.(y, b, h), l && o(!1);
  };
  return /* @__PURE__ */ t(D, { open: f, onOpenChange: o, children: [
    /* @__PURE__ */ r(k, { asChild: !0, children: /* @__PURE__ */ t(
      C,
      {
        variant: "text",
        className: w(
          "flex h-8 w-full items-center justify-between whitespace-nowrap rounded-sm border border-input bg-transparent ps-3 pe-1 py-1.5 text-xs ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-gray-100 [&>span]:line-clamp-1 [&_svg]:disabled:text-text-300",
          d
        ),
        "data-placeholder": e ? void 0 : "",
        "aria-label": e ? `Selected date: ${n(e, a ?? "yyyy/MM/dd")}` : "Pick a date",
        disabled: m,
        children: [
          e ? n(e, a ?? "yyyy/MM/dd") : /* @__PURE__ */ r("span", { children: s ?? "Pick a date" }),
          /* @__PURE__ */ r(x, { className: "mr-2 ms-auto" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(M, { className: "w-auto p-0", children: /* @__PURE__ */ r(
      v,
      {
        defaultMonth: e,
        startMonth: new Date(2e3, 0, 1),
        endMonth: new Date((/* @__PURE__ */ new Date()).getFullYear() + 2, 11, 31),
        ...c,
        mode: "single",
        selected: e,
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
