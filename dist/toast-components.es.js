import { jsx as o } from "react/jsx-runtime";
import * as r from "react";
import * as t from "@radix-ui/react-toast";
import { tv as n } from "tailwind-variants";
import { cn as s } from "./utils.es.js";
import { XMark as i } from "@trsys-tech/matrix-icons";
const y = t.Provider, d = r.forwardRef(({ className: e, ...a }, m) => /* @__PURE__ */ o(
  t.Viewport,
  {
    ref: m,
    className: s(
      "mtx-fixed mtx-z-[100] mtx-flex mtx-flex-col-reverse mtx-gap-3 mtx-max-h-dscreen mtx-w-full mtx-p-4 mtx-top-0 mtx-right-0 md:mtx-max-w-[420px] ",
      e
    ),
    ...a
  }
));
d.displayName = t.Viewport.displayName;
const l = n({
  base: "mtx-group mtx-pointer-events-auto mtx-relative mtx-flex mtx-w-full mtx-items-center mtx-justify-between mtx-space-x-2 mtx-overflow-hidden mtx-rounded-lg mtx-border mtx-p-4 mtx-shadow-lg mtx-transition-all data-[swipe=cancel]:mtx-translate-x-0 data-[swipe=end]:mtx-translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:mtx-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:mtx-transition-none data-[state=open]:mtx-animate-in data-[state=closed]:mtx-animate-out data-[swipe=end]:mtx-animate-out data-[state=closed]:mtx-fade-out-80 data-[state=closed]:mtx-slide-out-to-right-full data-[state=open]:mtx-slide-in-from-top-full",
  // data-[state=open]:sm:slide-in-from-bottom-full
  variants: {
    variant: {
      default: "mtx-border mtx-bg-background mtx-text-foreground",
      danger: "mtx-danger mtx-group mtx-border-danger mtx-bg-danger-400 mtx-text-danger-800",
      success: "mtx-success mtx-group mtx-border-success mtx-bg-success-400 mtx-text-success-800",
      warning: "mtx-warning mtx-group mtx-border-warning mtx-bg-warning-400 mtx-text-warning-800",
      info: "mtx-info mtx-group mtx-border-info mtx-bg-info-400 mtx-text-info-700"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), c = r.forwardRef(({ className: e, variant: a, ...m }, x) => /* @__PURE__ */ o(t.Root, { ref: x, className: s(l({ variant: a }), e), ...m }));
c.displayName = t.Root.displayName;
const p = r.forwardRef(
  ({ className: e, ...a }, m) => /* @__PURE__ */ o(
    t.Action,
    {
      ref: m,
      className: s(
        "mtx-inline-flex mtx-h-8 mtx-shrink-0 mtx-items-center mtx-justify-center mtx-rounded-md mtx-border mtx-bg-transparent mtx-px-3 mtx-text-sm mtx-font-medium mtx-transition-colors hover:mtx-bg-secondary focus:mtx-outline-none focus:mtx-ring-1 focus:mtx-ring-ring disabled:mtx-pointer-events-none disabled:mtx-opacity-50 group-[.danger]:mtx-border-muted/40 group-[.danger]:hover:mtx-border-danger/30 group-[.danger]:hover:mtx-bg-danger group-[.danger]:hover:mtx-text-danger-foreground group-[.danger]:focus:mtx-ring-danger",
        e
      ),
      ...a
    }
  )
);
p.displayName = t.Action.displayName;
const g = r.forwardRef(
  ({ className: e, ...a }, m) => /* @__PURE__ */ o(t.Close, { ref: m, className: s("focus:mtx-outline-none focus:mtx-ring-none", e), "toast-close": "", ...a, children: /* @__PURE__ */ o(i, { className: "mtx-h-5 mtx-w-5" }) })
);
g.displayName = t.Close.displayName;
const f = r.forwardRef(
  ({ className: e, ...a }, m) => /* @__PURE__ */ o(t.Title, { ref: m, className: s("mtx-text-xs mtx-font-semibold mtx-leading-5 [&+div]:mtx-text-xs", e), ...a })
);
f.displayName = t.Title.displayName;
const u = r.forwardRef(({ className: e, ...a }, m) => /* @__PURE__ */ o(t.Description, { ref: m, className: s("mtx-text-sm mtx-opacity-90", e), ...a }));
u.displayName = t.Description.displayName;
export {
  c as Toast,
  p as ToastAction,
  g as ToastClose,
  u as ToastDescription,
  y as ToastProvider,
  f as ToastTitle,
  d as ToastViewport
};
//# sourceMappingURL=toast-components.es.js.map
