import { jsxs as o, jsx as a } from "react/jsx-runtime";
import * as h from "react";
import { Calendar as c } from "@trsys-tech/matrix-icons";
import { cn as i } from "./utils.es.js";
import { Calendar as b } from "./calendar.es.js";
import { Button as x } from "./button.es.js";
import { Popover as w, PopoverTrigger as M, PopoverContent as v } from "./popover.es.js";
import { formatDate as t } from "./format.es.js";
const R = ({
  formatStr: e,
  selected: r,
  placeholder: n,
  className: s,
  calendarClassName: d,
  fromText: m,
  toText: p,
  disabled: l,
  ...f
}) => {
  const [u, y] = h.useState(!1);
  return /* @__PURE__ */ o(
    w,
    {
      open: u,
      onOpenChange: (g) => {
        y(g);
      },
      children: [
        /* @__PURE__ */ a(M, { asChild: !0, children: /* @__PURE__ */ o(
          x,
          {
            variant: "text",
            className: i(
              "flex h-8 w-full items-center justify-between whitespace-nowrap rounded-sm border border-input bg-transparent ps-3 pe-1 py-1.5 text-xs ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-gray-100 [&>span]:line-clamp-1 [&_svg]:disabled:text-text-300",
              s
            ),
            "data-placeholder": r ? void 0 : "",
            "aria-label": r ? `Selected date: ${r?.from ? t(r.from, e ?? "yyyy/MM/dd") : ""} - ${r?.to ? t(r.to, e ?? "yyyy/MM/dd") : ""}` : n,
            disabled: l,
            children: [
              r ? /* @__PURE__ */ o("div", { className: "grid grid-cols-2 flex-1 justify-items-start", children: [
                /* @__PURE__ */ o("span", { children: [
                  m ?? "From",
                  ": ",
                  r?.from ? t(r.from, e ?? "yyyy/MM/dd") : "-"
                ] }),
                " ",
                /* @__PURE__ */ o("span", { children: [
                  p ?? "To",
                  ": ",
                  r?.to ? t(r.to, e ?? "yyyy/MM/dd") : "-"
                ] })
              ] }) : /* @__PURE__ */ a("span", { children: n ?? "Pick a Range" }),
              /* @__PURE__ */ a(c, { className: "mr-2 h-5 w-4 ms-auto" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(v, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ a(
          b,
          {
            defaultMonth: r?.from,
            startMonth: new Date(2e3, 0, 1),
            endMonth: new Date((/* @__PURE__ */ new Date()).getFullYear() + 2, 11, 31),
            ...f,
            mode: "range",
            selected: r,
            className: i(d, "md:max-w-full md:w-[36rem]"),
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
