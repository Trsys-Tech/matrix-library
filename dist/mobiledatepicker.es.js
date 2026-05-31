import { jsxs as a, Fragment as N, jsx as e } from "react/jsx-runtime";
import * as i from "react";
import { VisuallyHidden as C } from "@radix-ui/react-visually-hidden";
import { Calendar as k } from "@trsys-tech/matrix-icons";
import { cn as c } from "./utils.es.js";
import { Calendar as j } from "./calendar.es.js";
import { Button as n } from "./button.es.js";
import { Dialog as P, DialogContent as S, DialogHeader as F, DialogTitle as O, DialogDescription as A } from "./dialog.es.js";
import { format as o } from "./format.es.js";
const _ = ({
  formatStr: r,
  selected: x,
  placeholder: p,
  className: h,
  calendarClassName: f,
  cancelText: u,
  applyText: b,
  onSelect: g,
  disabled: y,
  disabledDates: D,
  ...v
}) => {
  const [w, l] = i.useState(!1), t = x ? new Date(x) : void 0, [m, d] = i.useState(t), s = () => {
    l(!1), d(t);
  }, M = () => {
    g?.(m), l(!1);
  };
  return /* @__PURE__ */ a(N, { children: [
    /* @__PURE__ */ a(
      n,
      {
        variant: "text",
        className: c(
          "mtx-flex mtx-h-8 mtx-w-full mtx-items-center mtx-justify-between mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-ps-3 mtx-pe-1 mtx-py-1.5 mtx-text-xs mtx-ring-offset-background data-[placeholder]:mtx-text-muted-foreground hover:mtx-border hover:mtx-border-primary hover:mtx-bg-transparent focus:mtx-border focus:mtx-border-primary focus:mtx-outline-none focus:mtx-ring focus:mtx-ring-primary-100 disabled:mtx-cursor-not-allowed disabled:mtx-bg-gray-100 disabled:mtx-text-text-300 disabled:mtx-border-gray-100 [&>span]:mtx-line-clamp-1 [&_svg]:disabled:mtx-text-text-300",
          h
        ),
        "data-placeholder": t ? void 0 : "",
        onClick: () => l(!0),
        "aria-label": t ? `Selected date: ${o(t, r ?? "yyyy/MM/dd")}` : "Pick a date",
        disabled: y,
        type: "button",
        children: [
          t ? o(t, r ?? "eee, MMM dd") : /* @__PURE__ */ e("span", { children: p ?? "Pick a date" }),
          /* @__PURE__ */ e(k, { className: "mtx-mr-2 mtx-h-5 mtx-w-5 mtx-ms-auto" })
        ]
      }
    ),
    /* @__PURE__ */ e(P, { open: w, onOpenChange: s, children: /* @__PURE__ */ a(S, { className: "mtx-h-dscreen mtx-w-screen mtx-p-0 mtx-flex mtx-flex-col mtx-gap-0 data-[state=open]:mtx-animate-slide-from-bottom data-[state=closed]:mtx-animate-slide-to-bottom mtx-overflow-auto mtx-max-w-screen-2xl sm:mtx-rounded-none", children: [
      /* @__PURE__ */ a(F, { className: "mtx-p-4 mtx-border-b mtx-border-b-gray-200", children: [
        /* @__PURE__ */ e(O, { asChild: !0, children: /* @__PURE__ */ a("div", { className: "mtx-text-sm mtx-font-bold mtx-space-y-1 mtx-mt-3", children: [
          /* @__PURE__ */ e("h5", { className: "mtx-text-text-300", children: m ? m.getFullYear() : /* @__PURE__ */ e("pre", { children: " " }) }),
          /* @__PURE__ */ e("h6", { className: "", children: m ? o(m, r ?? "eee, MMM dd") : /* @__PURE__ */ e("pre", { children: " " }) })
        ] }) }),
        /* @__PURE__ */ e(C, { children: /* @__PURE__ */ e(A, { children: "Date Picker" }) })
      ] }),
      /* @__PURE__ */ a("div", { className: "mtx-flex-1 mtx-flex mtx-flex-col mtx-items-center mtx-p-4", children: [
        /* @__PURE__ */ e(
          j,
          {
            defaultMonth: t,
            startMonth: new Date(2e3, 0, 1),
            endMonth: new Date((/* @__PURE__ */ new Date()).getFullYear() + 2, 11, 31),
            ...v,
            mode: "single",
            selected: m,
            onSelect: d,
            className: c("mtx-p-0", f),
            disabled: D
          }
        ),
        /* @__PURE__ */ a("div", { className: "mtx-flex mtx-justify-center mtx-items-center mtx-gap-4 mtx-mt-auto mtx-w-full", children: [
          /* @__PURE__ */ e(n, { variant: "text", className: "mtx-flex-1 mtx-h-10", onClick: s, type: "button", children: u ?? "Cancel" }),
          /* @__PURE__ */ e(n, { variant: "primary", className: "mtx-flex-1 mtx-h-10", onClick: M, type: "button", children: b ?? "Apply" })
        ] })
      ] })
    ] }) })
  ] });
};
export {
  _ as MobileDatePicker
};
//# sourceMappingURL=mobiledatepicker.es.js.map
