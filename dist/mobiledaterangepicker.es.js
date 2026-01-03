import { jsxs as t, Fragment as F, jsx as o } from "react/jsx-runtime";
import * as f from "react";
import { VisuallyHidden as R } from "@radix-ui/react-visually-hidden";
import { Calendar as O } from "@trsys-tech/matrix-icons";
import { cn as p } from "./utils.es.js";
import { Calendar as P } from "./calendar.es.js";
import { Button as m } from "./button.es.js";
import { Dialog as $, DialogContent as A, DialogHeader as H, DialogTitle as B, DialogDescription as I } from "./dialog.es.js";
import { formatDate as l } from "./format.es.js";
const K = ({
  formatStr: n,
  selected: r,
  placeholder: d,
  className: h,
  calendarClassName: g,
  onDayClick: x,
  cancelText: y,
  applyText: u,
  onSelect: b,
  fromText: M,
  toText: v,
  disabled: N,
  ...D
}) => {
  const [w, s] = f.useState(!1), [e, i] = f.useState(r), C = (a, k, j) => {
    x?.(a, k, j), !e || !e.from ? i({ from: a, to: void 0 }) : a < e.from ? e.to ? i({ from: a, to: e.to }) : i({ from: a, to: e.from }) : e?.from?.getTime() === a?.getTime() && (e?.from?.getTime() === e?.to?.getTime() || !e.to) ? i(void 0) : e?.from?.getTime() !== e?.to?.getTime() && (e.from?.getTime() === a?.getTime() || e?.to?.getTime() === a?.getTime()) ? i({ from: a, to: a }) : i({ ...e, to: a });
  }, c = () => {
    s(!1), i(r);
  }, T = () => {
    b?.(e), s(!1);
  };
  return /* @__PURE__ */ t(F, { children: [
    /* @__PURE__ */ t(
      m,
      {
        variant: "text",
        className: p(
          "flex h-8 w-full items-center justify-between whitespace-nowrap rounded-sm border border-input bg-transparent ps-3 pe-1 py-1.5 text-xs ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-gray-100 [&>span]:line-clamp-1 [&_svg]:disabled:text-text-300",
          h
        ),
        "data-placeholder": r ? void 0 : "",
        onClick: () => s(!0),
        "aria-label": r ? `Selected date: ${r?.from ? l(r.from, n ?? "yyyy/MM/dd") : ""} - ${r?.to ? l(r.to, n ?? "yyyy/MM/dd") : ""}` : d,
        disabled: N,
        children: [
          r ? /* @__PURE__ */ t("div", { className: "grid grid-cols-2 flex-1 justify-items-start", children: [
            /* @__PURE__ */ t("span", { children: [
              M ?? "From",
              ": ",
              r?.from ? l(r.from, n ?? "yyyy/MM/dd") : "-"
            ] }),
            " ",
            /* @__PURE__ */ t("span", { children: [
              v ?? "To",
              ": ",
              r?.to ? l(r.to, n ?? "yyyy/MM/dd") : "-"
            ] })
          ] }) : /* @__PURE__ */ o("span", { children: d ?? "Pick a Range" }),
          /* @__PURE__ */ o(O, { className: "mr-2 h-5 w-4 ms-auto" })
        ]
      }
    ),
    /* @__PURE__ */ o($, { open: w, onOpenChange: c, children: /* @__PURE__ */ t(A, { className: "h-dscreen w-screen p-0 flex flex-col gap-0 data-[state=open]:animate-slide-from-bottom data-[state=closed]:animate-slide-to-bottom overflow-auto max-w-screen-2xl sm:rounded-none", children: [
      /* @__PURE__ */ t(H, { children: [
        /* @__PURE__ */ o(B, { asChild: !0, children: /* @__PURE__ */ t("div", { className: "grid grid-cols-2 border-b border-b-gray-200 mt-3", children: [
          /* @__PURE__ */ t("div", { className: "text-sm font-bold space-y-1 border-e border-e-gray-200 p-4", children: [
            /* @__PURE__ */ o("h5", { className: "text-text-300 font-medium text-xs", children: "From" }),
            /* @__PURE__ */ o("h6", { className: "", children: e?.from ? l(e.from, n ?? "eee, MMM dd") : /* @__PURE__ */ o("pre", { children: " " }) })
          ] }),
          /* @__PURE__ */ t("div", { className: "text-sm font-bold space-y-1 p-4 flex flex-col justify-center", children: [
            /* @__PURE__ */ o("h5", { className: "text-text-300 font-medium text-xs", children: "To" }),
            /* @__PURE__ */ o("h6", { className: "", children: e?.to ? l(e.to, n ?? "eee, MMM dd") : /* @__PURE__ */ o("pre", { children: " " }) })
          ] })
        ] }) }),
        /* @__PURE__ */ o(R, { children: /* @__PURE__ */ o(I, { children: "Date Picker" }) })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex-1 flex flex-col items-center p-4", children: [
        /* @__PURE__ */ o(
          P,
          {
            defaultMonth: r?.from,
            startMonth: new Date(2e3, 0, 1),
            endMonth: new Date((/* @__PURE__ */ new Date()).getFullYear() + 2, 11, 31),
            ...D,
            mode: "range",
            selected: r,
            onDayClick: C,
            className: p("p-0", g)
          }
        ),
        /* @__PURE__ */ t("div", { className: "flex justify-center items-center gap-4 mt-auto w-full", children: [
          /* @__PURE__ */ o(m, { variant: "text", className: "flex-1 h-10", onClick: c, children: y ?? "Cancel" }),
          /* @__PURE__ */ o(m, { variant: "primary", className: "flex-1 h-10", onClick: T, children: u ?? "Apply" })
        ] })
      ] })
    ] }) })
  ] });
};
export {
  K as MobileDateRangePicker
};
//# sourceMappingURL=mobiledaterangepicker.es.js.map
