import { jsxs as r, jsx as m } from "react/jsx-runtime";
import * as g from "react";
import { Calendar as h } from "@trsys-tech/matrix-icons";
import { cn as n } from "./utils.es.js";
import { Calendar as b } from "./calendar.es.js";
import { Button as c } from "./button.es.js";
import { Popover as w, PopoverTrigger as M, PopoverContent as v } from "./popover.es.js";
import { format as a } from "./format.es.js";
const R = ({
  formatStr: o,
  selected: t,
  placeholder: e,
  className: x,
  calendarClassName: i,
  fromText: d,
  toText: s,
  disabled: p,
  ...l
}) => {
  const [f, u] = g.useState(!1);
  return /* @__PURE__ */ r(
    w,
    {
      open: f,
      onOpenChange: (y) => {
        u(y);
      },
      children: [
        /* @__PURE__ */ m(M, { asChild: !0, children: /* @__PURE__ */ r(
          c,
          {
            variant: "text",
            className: n(
              "mtx-flex mtx-h-8 mtx-w-full mtx-items-center mtx-justify-between mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-ps-3 mtx-pe-1 mtx-py-1.5 mtx-text-xs mtx-ring-offset-background data-[placeholder]:mtx-text-muted-foreground hover:mtx-border hover:mtx-border-primary hover:mtx-bg-transparent focus:mtx-border focus:mtx-border-primary focus:mtx-outline-none focus:mtx-ring focus:mtx-ring-primary-100 disabled:mtx-cursor-not-allowed disabled:mtx-bg-gray-100 disabled:mtx-text-text-300 disabled:mtx-border-gray-100 [&>span]:mtx-line-clamp-1 [&_svg]:disabled:mtx-text-text-300",
              x
            ),
            "data-placeholder": t ? void 0 : "",
            "aria-label": t ? `Selected date: ${t?.from ? a(t.from, o ?? "yyyy/MM/dd") : ""} - ${t?.to ? a(t.to, o ?? "yyyy/MM/dd") : ""}` : e,
            disabled: p,
            type: "button",
            children: [
              t ? /* @__PURE__ */ r("div", { className: "mtx-grid mtx-grid-cols-2 mtx-flex-1 mtx-justify-items-start", children: [
                /* @__PURE__ */ r("span", { children: [
                  d ?? "From",
                  ": ",
                  t?.from ? a(t.from, o ?? "yyyy/MM/dd") : "-"
                ] }),
                " ",
                /* @__PURE__ */ r("span", { children: [
                  s ?? "To",
                  ": ",
                  t?.to ? a(t.to, o ?? "yyyy/MM/dd") : "-"
                ] })
              ] }) : /* @__PURE__ */ m("span", { children: e ?? "Pick a Range" }),
              /* @__PURE__ */ m(h, { className: "mtx-mr-2 mtx-h-5 mtx-w-4 mtx-ms-auto" })
            ]
          }
        ) }),
        /* @__PURE__ */ m(v, { className: "mtx-w-auto mtx-p-0", align: "start", children: /* @__PURE__ */ m(
          b,
          {
            defaultMonth: t?.from,
            startMonth: new Date(2e3, 0, 1),
            endMonth: new Date((/* @__PURE__ */ new Date()).getFullYear() + 2, 11, 31),
            ...l,
            mode: "range",
            selected: t,
            className: n(i, "md:mtx-max-w-full md:mtx-w-[36rem]"),
            numberOfMonths: 2
          }
        ) })
      ]
    }
  );
};
export {
  R as DesktopDateRangePicker
};
//# sourceMappingURL=desktopdaterangepicker.es.js.map
