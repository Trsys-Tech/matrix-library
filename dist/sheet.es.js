import { jsxs as i, jsx as m } from "react/jsx-runtime";
import * as x from "react";
import * as t from "@radix-ui/react-dialog";
import { tv as l } from "tailwind-variants";
import { cn as s } from "./utils.es.js";
import { XMark as c } from "@trsys-tech/matrix-icons";
const C = t.Root, R = t.Trigger, T = t.Close, f = t.Portal, r = x.forwardRef(
  ({ className: e, ...a }, o) => /* @__PURE__ */ m(
    t.Overlay,
    {
      className: s(
        "mtx-fixed mtx-inset-0 mtx-z-50 mtx-bg-black/80  data-[state=open]:mtx-animate-in data-[state=closed]:mtx-animate-out data-[state=closed]:mtx-fade-out-0 data-[state=open]:mtx-fade-in-0",
        e
      ),
      ...a,
      ref: o
    }
  )
);
r.displayName = t.Overlay.displayName;
const p = l({
  base: "mtx-fixed mtx-z-50 mtx-gap-4 mtx-bg-background mtx-p-6 mtx-shadow-lg mtx-transition mtx-ease-in-out data-[state=closed]:mtx-duration-300 data-[state=open]:mtx-duration-500 data-[state=open]:mtx-animate-in data-[state=closed]:mtx-animate-out",
  variants: {
    side: {
      top: "mtx-inset-x-0 mtx-top-0 mtx-border-b data-[state=closed]:mtx-slide-out-to-top data-[state=open]:mtx-slide-in-from-top",
      bottom: "mtx-inset-x-0 mtx-bottom-0 mtx-border-t data-[state=closed]:mtx-slide-out-to-bottom data-[state=open]:mtx-slide-in-from-bottom",
      left: "mtx-inset-y-0 mtx-left-0 mtx-h-full mtx-w-3/4 mtx-border-r data-[state=closed]:mtx-slide-out-to-left data-[state=open]:mtx-slide-in-from-left sm:mtx-max-w-sm",
      right: "mtx-inset-y-0 mtx-right-0 mtx-h-full mtx-w-3/4 mtx-border-l data-[state=closed]:mtx-slide-out-to-right data-[state=open]:mtx-slide-in-from-right sm:mtx-max-w-sm"
    }
  },
  defaultVariants: {
    side: "right"
  }
}), h = x.forwardRef(
  ({ side: e = "right", className: a, children: o, ...n }, d) => /* @__PURE__ */ i(f, { children: [
    /* @__PURE__ */ m(r, {}),
    /* @__PURE__ */ i(t.Content, { ref: d, className: s(p({ side: e }), a), ...n, children: [
      /* @__PURE__ */ i(t.Close, { className: "mtx-absolute mtx-right-4 mtx-top-4 mtx-rounded-sm mtx-opacity-70 mtx-ring-offset-background mtx-transition-opacity hover:mtx-opacity-100 focus:mtx-outline-none focus:mtx-ring-2 focus:mtx-ring-ring focus:mtx-ring-offset-2 disabled:mtx-pointer-events-none data-[state=open]:mtx-bg-secondary", children: [
        /* @__PURE__ */ m(c, { className: "mtx-h-4 mtx-w-4" }),
        /* @__PURE__ */ m("span", { className: "mtx-sr-only", children: "Close" })
      ] }),
      o
    ] })
  ] })
);
h.displayName = t.Content.displayName;
const g = ({ className: e, ...a }) => /* @__PURE__ */ m("div", { className: s("mtx-flex mtx-flex-col mtx-space-y-2 mtx-text-center sm:mtx-text-left", e), ...a });
g.displayName = "SheetHeader";
const u = ({ className: e, ...a }) => /* @__PURE__ */ m("div", { className: s("mtx-flex mtx-flex-col-reverse sm:mtx-flex-row sm:mtx-justify-end sm:mtx-space-x-2", e), ...a });
u.displayName = "SheetFooter";
const y = x.forwardRef(
  ({ className: e, ...a }, o) => /* @__PURE__ */ m(t.Title, { ref: o, className: s("mtx-text-lg mtx-font-semibold mtx-text-foreground", e), ...a })
);
y.displayName = t.Title.displayName;
const b = x.forwardRef(({ className: e, ...a }, o) => /* @__PURE__ */ m(t.Description, { ref: o, className: s("mtx-text-sm mtx-text-muted-foreground", e), ...a }));
b.displayName = t.Description.displayName;
export {
  C as Sheet,
  T as SheetClose,
  h as SheetContent,
  b as SheetDescription,
  u as SheetFooter,
  g as SheetHeader,
  r as SheetOverlay,
  f as SheetPortal,
  y as SheetTitle,
  R as SheetTrigger
};
//# sourceMappingURL=sheet.es.js.map
