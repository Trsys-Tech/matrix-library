import { jsxs as a, Fragment as R, jsx as r } from "react/jsx-runtime";
import * as f from "react";
import { VisuallyHidden as F } from "@radix-ui/react-visually-hidden";
import { Calendar as O } from "@trsys-tech/matrix-icons";
import { cn as p } from "./utils.es.js";
import { Calendar as P } from "./calendar.es.js";
import { Button as m } from "./button.es.js";
import { Dialog as $, DialogContent as A, DialogHeader as H, DialogTitle as B, DialogDescription as I } from "./dialog.es.js";
import { formatDate as l } from "./format.es.js";
const L = ({
  formatStr: n,
  selected: o,
  placeholder: d,
  className: h,
  calendarClassName: g,
  onDayClick: y,
  cancelText: x,
  applyText: u,
  onSelect: b,
  fromText: v,
  toText: N,
  disabled: M,
  ...C
}) => {
  const [T, s] = f.useState(!1), [e, i] = f.useState(o), D = (t, k, j) => {
    y?.(t, k, j), !e || !e.from ? i({ from: t, to: void 0 }) : t < e.from ? e.to ? i({ from: t, to: e.to }) : i({ from: t, to: e.from }) : e?.from?.getTime() === t?.getTime() && (e?.from?.getTime() === e?.to?.getTime() || !e.to) ? i(void 0) : e?.from?.getTime() !== e?.to?.getTime() && (e.from?.getTime() === t?.getTime() || e?.to?.getTime() === t?.getTime()) ? i({ from: t, to: t }) : i({ ...e, to: t });
  }, c = () => {
    s(!1), i(o);
  }, w = () => {
    b?.(e), s(!1);
  };
  return /* @__PURE__ */ a(R, { children: [
    /* @__PURE__ */ a(
      m,
      {
        variant: "text",
        className: p(
          "flex h-8 w-full items-center justify-between whitespace-nowrap rounded-sm border border-input bg-transparent ps-3 pe-1 py-1.5 text-sm ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-gray-100 [&>span]:line-clamp-1 [&_svg]:disabled:text-text-300",
          h
        ),
        "data-placeholder": o ? void 0 : "",
        onClick: () => s(!0),
        "aria-label": o ? `Selected date: ${o?.from ? l(o.from, n ?? "yyyy/MM/dd") : ""} - ${o?.to ? l(o.to, n ?? "yyyy/MM/dd") : ""}` : d,
        disabled: M,
        children: [
          o ? /* @__PURE__ */ a("div", { className: "grid grid-cols-2 flex-1 justify-items-start", children: [
            /* @__PURE__ */ a("span", { children: [
              v ?? "From",
              ": ",
              o?.from ? l(o.from, n ?? "yyyy/MM/dd") : "-"
            ] }),
            " ",
            /* @__PURE__ */ a("span", { children: [
              N ?? "To",
              ": ",
              o?.to ? l(o.to, n ?? "yyyy/MM/dd") : "-"
            ] })
          ] }) : /* @__PURE__ */ r("span", { children: d ?? "Pick a Range" }),
          /* @__PURE__ */ r(O, { className: "mr-2 h-5 w-4 ms-auto" })
        ]
      }
    ),
    /* @__PURE__ */ r($, { open: T, onOpenChange: c, children: /* @__PURE__ */ a(A, { className: "h-dscreen w-screen p-0 flex flex-col gap-0 data-[state=open]:animate-slide-from-bottom data-[state=closed]:animate-slide-to-bottom overflow-auto max-w-screen-2xl sm:rounded-none", children: [
      /* @__PURE__ */ a(H, { children: [
        /* @__PURE__ */ r(B, { asChild: !0, children: /* @__PURE__ */ a("div", { className: "grid grid-cols-2 border-b border-b-gray-200 mt-3", children: [
          /* @__PURE__ */ a("div", { className: "text-sm font-bold space-y-1 border-e border-e-gray-200 p-4", children: [
            /* @__PURE__ */ r("h5", { className: "text-text-300 font-medium text-xs", children: "From" }),
            /* @__PURE__ */ r("h6", { className: "", children: e?.from ? l(e.from, n ?? "eee, MMM dd") : /* @__PURE__ */ r("pre", { children: " " }) })
          ] }),
          /* @__PURE__ */ a("div", { className: "text-sm font-bold space-y-1 p-4 flex flex-col justify-center", children: [
            /* @__PURE__ */ r("h5", { className: "text-text-300 font-medium text-xs", children: "To" }),
            /* @__PURE__ */ r("h6", { className: "", children: e?.to ? l(e.to, n ?? "eee, MMM dd") : /* @__PURE__ */ r("pre", { children: " " }) })
          ] })
        ] }) }),
        /* @__PURE__ */ r(F, { children: /* @__PURE__ */ r(I, { children: "Date Picker" }) })
      ] }),
      /* @__PURE__ */ a("div", { className: "flex-1 flex flex-col items-center p-4", children: [
        /* @__PURE__ */ r(P, { ...C, mode: "range", selected: o, onDayClick: D, className: p("p-0", g) }),
        /* @__PURE__ */ a("div", { className: "flex justify-center items-center gap-4 mt-auto w-full", children: [
          /* @__PURE__ */ r(m, { variant: "text", className: "flex-1 h-10", onClick: c, children: x ?? "Cancel" }),
          /* @__PURE__ */ r(m, { variant: "primary", className: "flex-1 h-10", onClick: w, children: u ?? "Apply" })
        ] })
      ] })
    ] }) })
  ] });
};
export {
  L as MobileDateRangePicker
};
//# sourceMappingURL=mobiledaterangepicker.es.js.map
