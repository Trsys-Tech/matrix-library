import { jsxs as e, jsx as r } from "react/jsx-runtime";
import * as C from "react";
import { Calendar as D } from "@trsys-tech/matrix-icons";
import { cn as x } from "./utils.es.js";
import { Calendar as R } from "./calendar.es.js";
import { toCalendarDateRange as N, toDateOnlyRange as O } from "./datevalue.es.js";
import { Button as P } from "./button.es.js";
import { Popover as j, PopoverTrigger as k, PopoverContent as $ } from "./popover.es.js";
import { format as o } from "./format.es.js";
const z = ({
  formatStr: m,
  selected: l,
  placeholder: s,
  className: i,
  labelSeparator: d = ": ",
  fromToSeparator: c = "",
  calendarClassName: p,
  fromText: f,
  toText: u,
  onSelect: y,
  disabled: g,
  disabledDates: h,
  ...b
}) => {
  const [w, M] = C.useState(!1), t = N(l), a = !!(t?.from || t?.to), v = (n) => {
    y?.(O(n));
  };
  return /* @__PURE__ */ e(
    j,
    {
      open: w,
      onOpenChange: (n) => {
        M(n);
      },
      children: [
        /* @__PURE__ */ r(k, { asChild: !0, children: /* @__PURE__ */ e(
          P,
          {
            variant: "text",
            className: x(
              "mtx-flex mtx-h-8 mtx-w-full mtx-items-center mtx-justify-between mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-ps-3 mtx-pe-1 mtx-py-1.5 mtx-text-xs mtx-ring-offset-background data-[placeholder]:mtx-text-muted-foreground hover:mtx-border hover:mtx-border-primary hover:mtx-bg-transparent focus:mtx-border focus:mtx-border-primary focus:mtx-outline-none focus:mtx-ring focus:mtx-ring-primary-100 disabled:mtx-cursor-not-allowed disabled:mtx-bg-gray-100 disabled:mtx-text-text-300 disabled:mtx-border-gray-100 [&>span]:mtx-line-clamp-1 [&_svg]:disabled:mtx-text-text-300",
              i
            ),
            "data-placeholder": a ? void 0 : "",
            "aria-label": a ? `Selected date: ${t?.from ? o(t.from, m ?? "yyyy/MM/dd") : ""} - ${t?.to ? o(t.to, m ?? "yyyy/MM/dd") : ""}` : s,
            disabled: g,
            type: "button",
            children: [
              a ? /* @__PURE__ */ e("div", { className: "mtx-flex mtx-flex-row mtx-gap-1 mtx-flex-1 mtx-justify-items-start", children: [
                /* @__PURE__ */ e("span", { children: [
                  f ?? "From",
                  d,
                  t?.from ? o(t.from, m ?? "yyyy/MM/dd") : "-"
                ] }),
                c,
                /* @__PURE__ */ e("span", { children: [
                  u ?? "To",
                  d,
                  t?.to ? o(t.to, m ?? "yyyy/MM/dd") : "-"
                ] })
              ] }) : /* @__PURE__ */ r("span", { children: s ?? "Pick a Range" }),
              /* @__PURE__ */ r(D, { className: "mtx-mr-2 mtx-h-5 mtx-w-4 mtx-ms-auto" })
            ]
          }
        ) }),
        /* @__PURE__ */ r($, { className: "mtx-w-auto mtx-p-0", align: "start", children: /* @__PURE__ */ r(
          R,
          {
            defaultMonth: t?.from,
            startMonth: new Date(2e3, 0, 1),
            endMonth: new Date((/* @__PURE__ */ new Date()).getFullYear() + 2, 11, 31),
            ...b,
            mode: "range",
            selected: t,
            className: x(p, "md:mtx-max-w-full md:mtx-w-[36rem]"),
            numberOfMonths: 2,
            onSelect: v,
            disabled: h
          }
        ) })
      ]
    }
  );
};
export {
  z as DesktopDateRangePicker
};
//# sourceMappingURL=desktopdaterangepicker.es.js.map
