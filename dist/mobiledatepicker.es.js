import { jsxs as r, Fragment as v, jsx as e } from "react/jsx-runtime";
import * as c from "react";
import { VisuallyHidden as M } from "@radix-ui/react-visually-hidden";
import { Calendar as N } from "@trsys-tech/matrix-icons";
import { cn as m } from "./utils.es.js";
import { Calendar as C } from "./calendar.es.js";
import { Button as o } from "./button.es.js";
import { Dialog as k, DialogContent as j, DialogHeader as P, DialogTitle as F, DialogDescription as O } from "./dialog.es.js";
import { formatDate as s } from "./format.es.js";
const T = ({
  formatStr: l,
  selected: a,
  placeholder: p,
  className: h,
  calendarClassName: f,
  cancelText: u,
  applyText: b,
  onSelect: x,
  disabled: g,
  ...y
}) => {
  const [D, n] = c.useState(!1), [t, i] = c.useState(a), d = () => {
    n(!1), i(a);
  }, w = () => {
    x?.(t), n(!1);
  };
  return /* @__PURE__ */ r(v, { children: [
    /* @__PURE__ */ r(
      o,
      {
        variant: "text",
        className: m(
          "flex h-8 w-full items-center justify-between whitespace-nowrap rounded-sm border border-input bg-transparent ps-3 pe-1 py-1.5 text-xs ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-gray-100 [&>span]:line-clamp-1 [&_svg]:disabled:text-text-300",
          h
        ),
        "data-placeholder": a ? void 0 : "",
        onClick: () => n(!0),
        "aria-label": a ? `Selected date: ${s(a, l ?? "yyyy/MM/dd")}` : "Pick a date",
        disabled: g,
        children: [
          a ? s(a, l ?? "eee, MMM dd") : /* @__PURE__ */ e("span", { children: p ?? "Pick a date" }),
          /* @__PURE__ */ e(N, { className: "mr-2 h-5 w-5 ms-auto" })
        ]
      }
    ),
    /* @__PURE__ */ e(k, { open: D, onOpenChange: d, children: /* @__PURE__ */ r(j, { className: "h-dscreen w-screen p-0 flex flex-col gap-0 data-[state=open]:animate-slide-from-bottom data-[state=closed]:animate-slide-to-bottom overflow-auto max-w-screen-2xl sm:rounded-none", children: [
      /* @__PURE__ */ r(P, { className: "p-4 border-b border-b-gray-200", children: [
        /* @__PURE__ */ e(F, { asChild: !0, children: /* @__PURE__ */ r("div", { className: "text-sm font-bold space-y-1 mt-3", children: [
          /* @__PURE__ */ e("h5", { className: "text-text-300", children: t?.getFullYear() ?? /* @__PURE__ */ e("pre", { children: " " }) }),
          /* @__PURE__ */ e("h6", { className: "", children: t ? s(t, l ?? "eee, MMM dd") : /* @__PURE__ */ e("pre", { children: " " }) })
        ] }) }),
        /* @__PURE__ */ e(M, { children: /* @__PURE__ */ e(O, { children: "Date Picker" }) })
      ] }),
      /* @__PURE__ */ r("div", { className: "flex-1 flex flex-col items-center p-4", children: [
        /* @__PURE__ */ e(
          C,
          {
            defaultMonth: a,
            startMonth: new Date(2e3, 0, 1),
            endMonth: new Date((/* @__PURE__ */ new Date()).getFullYear() + 2, 11, 31),
            ...y,
            mode: "single",
            selected: t,
            onSelect: i,
            className: m("p-0", f)
          }
        ),
        /* @__PURE__ */ r("div", { className: "flex justify-center items-center gap-4 mt-auto w-full", children: [
          /* @__PURE__ */ e(o, { variant: "text", className: "flex-1 h-10", onClick: d, children: u ?? "Cancel" }),
          /* @__PURE__ */ e(o, { variant: "primary", className: "flex-1 h-10", onClick: w, children: b ?? "Apply" })
        ] })
      ] })
    ] }) })
  ] });
};
export {
  T as MobileDatePicker
};
//# sourceMappingURL=mobiledatepicker.es.js.map
