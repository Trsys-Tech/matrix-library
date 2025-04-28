import { jsxs as t, jsx as e } from "react/jsx-runtime";
import * as h from "react";
import { Calendar as x } from "@trsys-tech/matrix-icons";
import { cn as v } from "./utils.es.js";
import { Calendar as C } from "./calendar.es.js";
import { Button as k } from "./button.es.js";
import { Popover as w, PopoverTrigger as P, PopoverContent as D } from "./popover.es.js";
import { formatDate as n } from "./format.es.js";
const L = ({
  formatStr: a,
  selected: r,
  placeholder: s,
  className: d,
  calendarClassName: i,
  closeOnSelect: p = !0,
  onDayClick: l,
  disabled: m,
  ...c
}) => {
  const [f, o] = h.useState(!1), u = (y, b, g) => {
    l?.(y, b, g), p && o(!1);
  };
  return /* @__PURE__ */ t(w, { open: f, onOpenChange: o, children: [
    /* @__PURE__ */ e(P, { asChild: !0, children: /* @__PURE__ */ t(
      k,
      {
        variant: "text",
        className: v(
          "flex h-8 w-full items-center justify-between whitespace-nowrap rounded-sm border border-input bg-transparent ps-3 pe-1 py-1.5 text-sm ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-gray-100 [&>span]:line-clamp-1 [&_svg]:disabled:text-text-300",
          d
        ),
        "data-placeholder": r ? void 0 : "",
        "aria-label": r ? `Selected date: ${n(r, a ?? "yyyy/MM/dd")}` : "Pick a date",
        disabled: m,
        children: [
          r ? n(r, a ?? "yyyy/MM/dd") : /* @__PURE__ */ e("span", { children: s ?? "Pick a date" }),
          /* @__PURE__ */ e(x, { className: "mr-2 ms-auto" })
        ]
      }
    ) }),
    /* @__PURE__ */ e(D, { className: "w-auto p-0", children: /* @__PURE__ */ e(
      C,
      {
        ...c,
        mode: "single",
        selected: r,
        captionLayout: "dropdown-years",
        className: i,
        onDayClick: u
      }
    ) })
  ] });
};
export {
  L as DesktopDatePicker
};
//# sourceMappingURL=desktopdatepicker.es.js.map
