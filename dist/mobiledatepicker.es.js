import { jsxs as a, Fragment as M, jsx as e } from "react/jsx-runtime";
import * as i from "react";
import { VisuallyHidden as N } from "@radix-ui/react-visually-hidden";
import { Calendar as C } from "@trsys-tech/matrix-icons";
import { cn as c } from "./utils.es.js";
import { Calendar as k } from "./calendar.es.js";
import { Button as n } from "./button.es.js";
import { Dialog as j, DialogContent as P, DialogHeader as S, DialogTitle as F, DialogDescription as O } from "./dialog.es.js";
import { format as o } from "./format.es.js";
const V = ({
  formatStr: r,
  selected: x,
  placeholder: p,
  className: h,
  calendarClassName: f,
  cancelText: u,
  applyText: b,
  onSelect: g,
  disabled: y,
  ...D
}) => {
  const [v, l] = i.useState(!1), t = x ? new Date(x) : void 0, [m, d] = i.useState(t), s = () => {
    l(!1), d(t);
  }, w = () => {
    g?.(m), l(!1);
  };
  return /* @__PURE__ */ a(M, { children: [
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
          /* @__PURE__ */ e(C, { className: "mtx-mr-2 mtx-h-5 mtx-w-5 mtx-ms-auto" })
        ]
      }
    ),
    /* @__PURE__ */ e(j, { open: v, onOpenChange: s, children: /* @__PURE__ */ a(P, { className: "mtx-h-dscreen mtx-w-screen mtx-p-0 mtx-flex mtx-flex-col mtx-gap-0 data-[state=open]:mtx-animate-slide-from-bottom data-[state=closed]:mtx-animate-slide-to-bottom mtx-overflow-auto mtx-max-w-screen-2xl sm:mtx-rounded-none", children: [
      /* @__PURE__ */ a(S, { className: "mtx-p-4 mtx-border-b mtx-border-b-gray-200", children: [
        /* @__PURE__ */ e(F, { asChild: !0, children: /* @__PURE__ */ a("div", { className: "mtx-text-sm mtx-font-bold mtx-space-y-1 mtx-mt-3", children: [
          /* @__PURE__ */ e("h5", { className: "mtx-text-text-300", children: m ? m.getFullYear() : /* @__PURE__ */ e("pre", { children: " " }) }),
          /* @__PURE__ */ e("h6", { className: "", children: m ? o(m, r ?? "eee, MMM dd") : /* @__PURE__ */ e("pre", { children: " " }) })
        ] }) }),
        /* @__PURE__ */ e(N, { children: /* @__PURE__ */ e(O, { children: "Date Picker" }) })
      ] }),
      /* @__PURE__ */ a("div", { className: "mtx-flex-1 mtx-flex mtx-flex-col mtx-items-center mtx-p-4", children: [
        /* @__PURE__ */ e(
          k,
          {
            defaultMonth: t,
            startMonth: new Date(2e3, 0, 1),
            endMonth: new Date((/* @__PURE__ */ new Date()).getFullYear() + 2, 11, 31),
            ...D,
            mode: "single",
            selected: m,
            onSelect: d,
            className: c("mtx-p-0", f)
          }
        ),
        /* @__PURE__ */ a("div", { className: "mtx-flex mtx-justify-center mtx-items-center mtx-gap-4 mtx-mt-auto mtx-w-full", children: [
          /* @__PURE__ */ e(n, { variant: "text", className: "mtx-flex-1 mtx-h-10", onClick: s, type: "button", children: u ?? "Cancel" }),
          /* @__PURE__ */ e(n, { variant: "primary", className: "mtx-flex-1 mtx-h-10", onClick: w, type: "button", children: b ?? "Apply" })
        ] })
      ] })
    ] }) })
  ] });
};
export {
  V as MobileDatePicker
};
//# sourceMappingURL=mobiledatepicker.es.js.map
