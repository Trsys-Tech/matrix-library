import { jsx as r } from "react/jsx-runtime";
import * as s from "react";
import * as e from "@radix-ui/react-toast";
import { tv as d } from "tailwind-variants";
import { cn as n } from "./utils.es.js";
import { XMark as l } from "@trsys-tech/matrix-icons";
const y = e.Provider, c = s.forwardRef(({ className: a, ...t }, o) => /* @__PURE__ */ r(
  e.Viewport,
  {
    ref: o,
    className: n("fixed z-[100] flex flex-col-reverse gap-3 max-h-dscreen w-full p-4 top-0 right-0 md:max-w-[420px] ", a),
    ...t
  }
));
c.displayName = e.Viewport.displayName;
const p = d({
  base: "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-lg border p-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full",
  // data-[state=open]:sm:slide-in-from-bottom-full
  variants: {
    variant: {
      default: "border bg-background text-foreground",
      danger: "danger group border-danger bg-danger-400 text-danger-800",
      success: "success group border-success bg-success-400 text-success-800",
      warning: "warning group border-warning bg-warning-400 text-warning-800",
      info: "info group border-info bg-info-400 text-info-700"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), g = s.forwardRef(({ className: a, variant: t, ...o }, i) => /* @__PURE__ */ r(e.Root, { ref: i, className: n(p({ variant: t }), a), ...o }));
g.displayName = e.Root.displayName;
const m = s.forwardRef(
  ({ className: a, ...t }, o) => /* @__PURE__ */ r(
    e.Action,
    {
      ref: o,
      className: n(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.danger]:border-muted/40 group-[.danger]:hover:border-danger/30 group-[.danger]:hover:bg-danger group-[.danger]:hover:text-danger-foreground group-[.danger]:focus:ring-danger",
        a
      ),
      ...t
    }
  )
);
m.displayName = e.Action.displayName;
const f = s.forwardRef(
  ({ className: a, ...t }, o) => /* @__PURE__ */ r(e.Close, { ref: o, className: n("focus:outline-none focus:ring-none", a), "toast-close": "", ...t, children: /* @__PURE__ */ r(l, { className: "h-5 w-5" }) })
);
f.displayName = e.Close.displayName;
const u = s.forwardRef(
  ({ className: a, ...t }, o) => /* @__PURE__ */ r(e.Title, { ref: o, className: n("text-xs font-semibold leading-5 [&+div]:text-xs", a), ...t })
);
u.displayName = e.Title.displayName;
const x = s.forwardRef(({ className: a, ...t }, o) => /* @__PURE__ */ r(e.Description, { ref: o, className: n("text-sm opacity-90", a), ...t }));
x.displayName = e.Description.displayName;
export {
  g as Toast,
  m as ToastAction,
  f as ToastClose,
  x as ToastDescription,
  y as ToastProvider,
  u as ToastTitle,
  c as ToastViewport
};
//# sourceMappingURL=toast-components.es.js.map
