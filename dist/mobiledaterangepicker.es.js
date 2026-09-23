import { jsxs as o, Fragment as B, jsx as t } from "react/jsx-runtime";
import * as d from "react";
import { VisuallyHidden as H } from "@radix-ui/react-visually-hidden";
import { Calendar as I } from "@trsys-tech/matrix-icons";
import { cn as u } from "./utils.es.js";
import { Calendar as V } from "./calendar.es.js";
import { toCalendarDateRangeFromKeys as Y, toDateOnlyRange as _ } from "./datevalue.es.js";
import { Button as c } from "./button.es.js";
import { Dialog as q, DialogContent as z, DialogHeader as E, DialogTitle as G, DialogDescription as J } from "./dialog.es.js";
import { format as l } from "./format.es.js";
const me = ({
  formatStr: n,
  selected: x,
  placeholder: f,
  className: b,
  calendarClassName: M,
  onDayClick: v,
  cancelText: D,
  applyText: N,
  onSelect: T,
  fromText: w,
  toText: C,
  disabled: k,
  disabledDates: R,
  labelSeparator: p = ": ",
  fromToSeparator: j = "",
  ...F
}) => {
  const [O, i] = d.useState(!1), h = x?.from instanceof Date ? x.from.getTime() : x?.from, g = x?.to instanceof Date ? x.to.getTime() : x?.to, m = d.useMemo(() => Y(h, g), [h, g]), [e, a] = d.useState(m), s = !!(m?.from || m?.to), K = (r, $, A) => {
    v?.(r, $, A), !e || !e.from ? a({ from: r, to: void 0 }) : r < e.from ? e.to ? a({ from: r, to: e.to }) : a({ from: r, to: e.from }) : e?.from?.getTime() === r?.getTime() && (e?.from?.getTime() === e?.to?.getTime() || !e.to) ? a(void 0) : e?.from?.getTime() !== e?.to?.getTime() && (e.from?.getTime() === r?.getTime() || e?.to?.getTime() === r?.getTime()) ? a({ from: r, to: r }) : a({ ...e, to: r });
  }, y = () => {
    i(!1), a(m);
  }, P = () => {
    T?.(_(e)), i(!1);
  };
  return /* @__PURE__ */ o(B, { children: [
    /* @__PURE__ */ o(
      c,
      {
        variant: "text",
        className: u(
          "mtx-flex mtx-h-8 mtx-w-full mtx-items-center mtx-justify-between mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-ps-3 mtx-pe-1 mtx-py-1.5 mtx-text-xs mtx-ring-offset-background data-[placeholder]:mtx-text-muted-foreground hover:mtx-border hover:mtx-border-primary hover:mtx-bg-transparent focus:mtx-border focus:mtx-border-primary focus:mtx-outline-none focus:mtx-ring focus:mtx-ring-primary-100 disabled:mtx-cursor-not-allowed disabled:mtx-bg-gray-100 disabled:mtx-text-text-300 disabled:mtx-border-gray-100 [&>span]:mtx-line-clamp-1 [&_svg]:disabled:mtx-text-text-300",
          b
        ),
        "data-placeholder": s ? void 0 : "",
        onClick: () => {
          a(m), i(!0);
        },
        "aria-label": s ? `Selected date: ${m?.from ? l(m.from, n ?? "yyyy/MM/dd") : ""} - ${m?.to ? l(m.to, n ?? "yyyy/MM/dd") : ""}` : f,
        disabled: k,
        type: "button",
        children: [
          s ? /* @__PURE__ */ o("div", { className: "mtx-flex mtx-flex-row mtx-gap-1 mtx-flex-1 mtx-justify-items-start", children: [
            /* @__PURE__ */ o("span", { children: [
              w ?? "From",
              p,
              m?.from ? l(m.from, n ?? "yyyy/MM/dd") : "-"
            ] }),
            j,
            /* @__PURE__ */ o("span", { children: [
              C ?? "To",
              p,
              m?.to ? l(m.to, n ?? "yyyy/MM/dd") : "-"
            ] })
          ] }) : /* @__PURE__ */ t("span", { children: f ?? "Pick a Range" }),
          /* @__PURE__ */ t(I, { className: "mtx-mr-2 mtx-h-5 mtx-w-4 mtx-ms-auto" })
        ]
      }
    ),
    /* @__PURE__ */ t(q, { open: O, onOpenChange: y, children: /* @__PURE__ */ o(z, { className: "mtx-h-dscreen mtx-w-screen mtx-p-0 mtx-flex mtx-flex-col mtx-gap-0 data-[state=open]:mtx-animate-slide-from-bottom data-[state=closed]:mtx-animate-slide-to-bottom mtx-overflow-auto mtx-max-w-screen-2xl sm:mtx-rounded-none", children: [
      /* @__PURE__ */ o(E, { children: [
        /* @__PURE__ */ t(G, { asChild: !0, children: /* @__PURE__ */ o("div", { className: "mtx-grid mtx-grid-cols-2 mtx-border-b mtx-border-b-gray-200 mtx-mt-3", children: [
          /* @__PURE__ */ o("div", { className: "mtx-text-sm mtx-font-bold mtx-space-y-1 mtx-border-e mtx-border-e-gray-200 mtx-p-4", children: [
            /* @__PURE__ */ t("h5", { className: "mtx-text-text-300 mtx-font-medium mtx-text-xs", children: "From" }),
            /* @__PURE__ */ t("h6", { className: "", children: e?.from ? l(e.from, n ?? "eee, MMM dd") : /* @__PURE__ */ t("pre", { children: " " }) })
          ] }),
          /* @__PURE__ */ o("div", { className: "mtx-text-sm mtx-font-bold mtx-space-y-1 mtx-p-4 mtx-flex mtx-flex-col mtx-justify-center", children: [
            /* @__PURE__ */ t("h5", { className: "mtx-text-text-300 mtx-font-medium mtx-text-xs", children: "To" }),
            /* @__PURE__ */ t("h6", { className: "", children: e?.to ? l(e.to, n ?? "eee, MMM dd") : /* @__PURE__ */ t("pre", { children: " " }) })
          ] })
        ] }) }),
        /* @__PURE__ */ t(H, { children: /* @__PURE__ */ t(J, { children: "Date Picker" }) })
      ] }),
      /* @__PURE__ */ o("div", { className: "mtx-flex-1 mtx-flex mtx-flex-col mtx-items-center mtx-p-4", children: [
        /* @__PURE__ */ t(
          V,
          {
            defaultMonth: e?.from,
            startMonth: new Date(2e3, 0, 1),
            endMonth: new Date((/* @__PURE__ */ new Date()).getFullYear() + 2, 11, 31),
            ...F,
            mode: "range",
            selected: e,
            onDayClick: K,
            className: u("mtx-p-0", M),
            disabled: R
          }
        ),
        /* @__PURE__ */ o("div", { className: "mtx-flex mtx-justify-center mtx-items-center mtx-gap-4 mtx-mt-auto mtx-w-full", children: [
          /* @__PURE__ */ t(c, { variant: "text", className: "mtx-flex-1 mtx-h-10", onClick: y, type: "button", children: D ?? "Cancel" }),
          /* @__PURE__ */ t(c, { variant: "primary", className: "mtx-flex-1 mtx-h-10", onClick: P, type: "button", children: N ?? "Apply" })
        ] })
      ] })
    ] }) })
  ] });
};
export {
  me as MobileDateRangePicker
};
//# sourceMappingURL=mobiledaterangepicker.es.js.map
