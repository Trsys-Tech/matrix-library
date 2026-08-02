import { jsxs as a, Fragment as N, jsx as e } from "react/jsx-runtime";
import * as x from "react";
import { VisuallyHidden as k } from "@radix-ui/react-visually-hidden";
import { Calendar as S } from "@trsys-tech/matrix-icons";
import { cn as p } from "./utils.es.js";
import { Calendar as j } from "./calendar.es.js";
import { toCalendarDateFromKey as F, toDateOnlyString as O } from "./datevalue.es.js";
import { Button as s } from "./button.es.js";
import { Dialog as P, DialogContent as A, DialogHeader as H, DialogTitle as K, DialogDescription as T } from "./dialog.es.js";
import { format as d } from "./format.es.js";
const E = ({
  formatStr: r,
  selected: l,
  placeholder: f,
  className: h,
  calendarClassName: u,
  cancelText: b,
  applyText: g,
  onSelect: y,
  disabled: D,
  disabledDates: v,
  ...w
}) => {
  const [M, o] = x.useState(!1), i = l instanceof Date ? l.getTime() : l, t = x.useMemo(() => F(i), [i]), [m, n] = x.useState(t), c = () => {
    o(!1), n(t);
  }, C = () => {
    y?.(O(m)), o(!1);
  };
  return /* @__PURE__ */ a(N, { children: [
    /* @__PURE__ */ a(
      s,
      {
        variant: "text",
        className: p(
          "mtx-flex mtx-h-8 mtx-w-full mtx-items-center mtx-justify-between mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-ps-3 mtx-pe-1 mtx-py-1.5 mtx-text-xs mtx-ring-offset-background data-[placeholder]:mtx-text-muted-foreground hover:mtx-border hover:mtx-border-primary hover:mtx-bg-transparent focus:mtx-border focus:mtx-border-primary focus:mtx-outline-none focus:mtx-ring focus:mtx-ring-primary-100 disabled:mtx-cursor-not-allowed disabled:mtx-bg-gray-100 disabled:mtx-text-text-300 disabled:mtx-border-gray-100 [&>span]:mtx-line-clamp-1 [&_svg]:disabled:mtx-text-text-300",
          h
        ),
        "data-placeholder": t ? void 0 : "",
        onClick: () => {
          n(t), o(!0);
        },
        "aria-label": t ? `Selected date: ${d(t, r ?? "yyyy/MM/dd")}` : "Pick a date",
        disabled: D,
        type: "button",
        children: [
          t ? d(t, r ?? "eee, MMM dd") : /* @__PURE__ */ e("span", { children: f ?? "Pick a date" }),
          /* @__PURE__ */ e(S, { className: "mtx-mr-2 mtx-h-5 mtx-w-5 mtx-ms-auto" })
        ]
      }
    ),
    /* @__PURE__ */ e(P, { open: M, onOpenChange: c, children: /* @__PURE__ */ a(A, { className: "mtx-h-dscreen mtx-w-screen mtx-p-0 mtx-flex mtx-flex-col mtx-gap-0 data-[state=open]:mtx-animate-slide-from-bottom data-[state=closed]:mtx-animate-slide-to-bottom mtx-overflow-auto mtx-max-w-screen-2xl sm:mtx-rounded-none", children: [
      /* @__PURE__ */ a(H, { className: "mtx-p-4 mtx-border-b mtx-border-b-gray-200", children: [
        /* @__PURE__ */ e(K, { asChild: !0, children: /* @__PURE__ */ a("div", { className: "mtx-text-sm mtx-font-bold mtx-space-y-1 mtx-mt-3", children: [
          /* @__PURE__ */ e("h5", { className: "mtx-text-text-300", children: m ? m.getFullYear() : /* @__PURE__ */ e("pre", { children: " " }) }),
          /* @__PURE__ */ e("h6", { className: "", children: m ? d(m, r ?? "eee, MMM dd") : /* @__PURE__ */ e("pre", { children: " " }) })
        ] }) }),
        /* @__PURE__ */ e(k, { children: /* @__PURE__ */ e(T, { children: "Date Picker" }) })
      ] }),
      /* @__PURE__ */ a("div", { className: "mtx-flex-1 mtx-flex mtx-flex-col mtx-items-center mtx-p-4", children: [
        /* @__PURE__ */ e(
          j,
          {
            defaultMonth: t,
            startMonth: new Date(2e3, 0, 1),
            endMonth: new Date((/* @__PURE__ */ new Date()).getFullYear() + 2, 11, 31),
            ...w,
            mode: "single",
            selected: m,
            onSelect: n,
            className: p("mtx-p-0", u),
            disabled: v
          }
        ),
        /* @__PURE__ */ a("div", { className: "mtx-flex mtx-justify-center mtx-items-center mtx-gap-4 mtx-mt-auto mtx-w-full", children: [
          /* @__PURE__ */ e(s, { variant: "text", className: "mtx-flex-1 mtx-h-10", onClick: c, type: "button", children: b ?? "Cancel" }),
          /* @__PURE__ */ e(s, { variant: "primary", className: "mtx-flex-1 mtx-h-10", onClick: C, type: "button", children: g ?? "Apply" })
        ] })
      ] })
    ] }) })
  ] });
};
export {
  E as MobileDatePicker
};
//# sourceMappingURL=mobiledatepicker.es.js.map
