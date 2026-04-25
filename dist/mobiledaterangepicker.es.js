import { jsxs as r, Fragment as F, jsx as m } from "react/jsx-runtime";
import * as c from "react";
import { VisuallyHidden as R } from "@radix-ui/react-visually-hidden";
import { Calendar as O } from "@trsys-tech/matrix-icons";
import { cn as f } from "./utils.es.js";
import { Calendar as P } from "./calendar.es.js";
import { Button as l } from "./button.es.js";
import { Dialog as $, DialogContent as A, DialogHeader as H, DialogTitle as B, DialogDescription as I } from "./dialog.es.js";
import { format as i } from "./format.es.js";
const K = ({
  formatStr: a,
  selected: e,
  placeholder: s,
  className: p,
  calendarClassName: h,
  onDayClick: g,
  cancelText: y,
  applyText: u,
  onSelect: b,
  fromText: M,
  toText: v,
  disabled: N,
  ...w
}) => {
  const [C, n] = c.useState(!1), [t, x] = c.useState(e), D = (o, k, j) => {
    g?.(o, k, j), !t || !t.from ? x({ from: o, to: void 0 }) : o < t.from ? t.to ? x({ from: o, to: t.to }) : x({ from: o, to: t.from }) : t?.from?.getTime() === o?.getTime() && (t?.from?.getTime() === t?.to?.getTime() || !t.to) ? x(void 0) : t?.from?.getTime() !== t?.to?.getTime() && (t.from?.getTime() === o?.getTime() || t?.to?.getTime() === o?.getTime()) ? x({ from: o, to: o }) : x({ ...t, to: o });
  }, d = () => {
    n(!1), x(e);
  }, T = () => {
    b?.(t), n(!1);
  };
  return /* @__PURE__ */ r(F, { children: [
    /* @__PURE__ */ r(
      l,
      {
        variant: "text",
        className: f(
          "mtx-flex mtx-h-8 mtx-w-full mtx-items-center mtx-justify-between mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-ps-3 mtx-pe-1 mtx-py-1.5 mtx-text-xs mtx-ring-offset-background data-[placeholder]:mtx-text-muted-foreground hover:mtx-border hover:mtx-border-primary hover:mtx-bg-transparent focus:mtx-border focus:mtx-border-primary focus:mtx-outline-none focus:mtx-ring focus:mtx-ring-primary-100 disabled:mtx-cursor-not-allowed disabled:mtx-bg-gray-100 disabled:mtx-text-text-300 disabled:mtx-border-gray-100 [&>span]:mtx-line-clamp-1 [&_svg]:disabled:mtx-text-text-300",
          p
        ),
        "data-placeholder": e ? void 0 : "",
        onClick: () => n(!0),
        "aria-label": e ? `Selected date: ${e?.from ? i(e.from, a ?? "yyyy/MM/dd") : ""} - ${e?.to ? i(e.to, a ?? "yyyy/MM/dd") : ""}` : s,
        disabled: N,
        type: "button",
        children: [
          e ? /* @__PURE__ */ r("div", { className: "mtx-grid mtx-grid-cols-2 mtx-flex-1 mtx-justify-items-start", children: [
            /* @__PURE__ */ r("span", { children: [
              M ?? "From",
              ": ",
              e?.from ? i(e.from, a ?? "yyyy/MM/dd") : "-"
            ] }),
            " ",
            /* @__PURE__ */ r("span", { children: [
              v ?? "To",
              ": ",
              e?.to ? i(e.to, a ?? "yyyy/MM/dd") : "-"
            ] })
          ] }) : /* @__PURE__ */ m("span", { children: s ?? "Pick a Range" }),
          /* @__PURE__ */ m(O, { className: "mtx-mr-2 mtx-h-5 mtx-w-4 mtx-ms-auto" })
        ]
      }
    ),
    /* @__PURE__ */ m($, { open: C, onOpenChange: d, children: /* @__PURE__ */ r(A, { className: "mtx-h-dscreen mtx-w-screen mtx-p-0 mtx-flex mtx-flex-col mtx-gap-0 data-[state=open]:mtx-animate-slide-from-bottom data-[state=closed]:mtx-animate-slide-to-bottom mtx-overflow-auto mtx-max-w-screen-2xl sm:mtx-rounded-none", children: [
      /* @__PURE__ */ r(H, { children: [
        /* @__PURE__ */ m(B, { asChild: !0, children: /* @__PURE__ */ r("div", { className: "mtx-grid mtx-grid-cols-2 mtx-border-b mtx-border-b-gray-200 mtx-mt-3", children: [
          /* @__PURE__ */ r("div", { className: "mtx-text-sm mtx-font-bold mtx-space-y-1 mtx-border-e mtx-border-e-gray-200 mtx-p-4", children: [
            /* @__PURE__ */ m("h5", { className: "mtx-text-text-300 mtx-font-medium mtx-text-xs", children: "From" }),
            /* @__PURE__ */ m("h6", { className: "", children: t?.from ? i(t.from, a ?? "eee, MMM dd") : /* @__PURE__ */ m("pre", { children: " " }) })
          ] }),
          /* @__PURE__ */ r("div", { className: "mtx-text-sm mtx-font-bold mtx-space-y-1 mtx-p-4 mtx-flex mtx-flex-col mtx-justify-center", children: [
            /* @__PURE__ */ m("h5", { className: "mtx-text-text-300 mtx-font-medium mtx-text-xs", children: "To" }),
            /* @__PURE__ */ m("h6", { className: "", children: t?.to ? i(t.to, a ?? "eee, MMM dd") : /* @__PURE__ */ m("pre", { children: " " }) })
          ] })
        ] }) }),
        /* @__PURE__ */ m(R, { children: /* @__PURE__ */ m(I, { children: "Date Picker" }) })
      ] }),
      /* @__PURE__ */ r("div", { className: "mtx-flex-1 mtx-flex mtx-flex-col mtx-items-center mtx-p-4", children: [
        /* @__PURE__ */ m(
          P,
          {
            defaultMonth: e?.from,
            startMonth: new Date(2e3, 0, 1),
            endMonth: new Date((/* @__PURE__ */ new Date()).getFullYear() + 2, 11, 31),
            ...w,
            mode: "range",
            selected: e,
            onDayClick: D,
            className: f("mtx-p-0", h)
          }
        ),
        /* @__PURE__ */ r("div", { className: "mtx-flex mtx-justify-center mtx-items-center mtx-gap-4 mtx-mt-auto mtx-w-full", children: [
          /* @__PURE__ */ m(l, { variant: "text", className: "mtx-flex-1 mtx-h-10", onClick: d, type: "button", children: y ?? "Cancel" }),
          /* @__PURE__ */ m(l, { variant: "primary", className: "mtx-flex-1 mtx-h-10", onClick: T, type: "button", children: u ?? "Apply" })
        ] })
      ] })
    ] }) })
  ] });
};
export {
  K as MobileDateRangePicker
};
//# sourceMappingURL=mobiledaterangepicker.es.js.map
