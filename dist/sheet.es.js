import { jsx as o, jsxs as n } from "react/jsx-runtime";
import * as r from "react";
import * as e from "@radix-ui/react-dialog";
import { tv as c } from "tailwind-variants";
import { cn as i } from "./utils.es.js";
import { XMark as f } from "@trsys-tech/matrix-icons";
const C = e.Root, R = e.Trigger, T = e.Close, p = e.Portal, d = r.forwardRef(
  ({ className: t, ...a }, s) => /* @__PURE__ */ o(
    e.Overlay,
    {
      className: i(
        "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        t
      ),
      ...a,
      ref: s
    }
  )
);
d.displayName = e.Overlay.displayName;
const h = c({
  base: "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  variants: {
    side: {
      top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
      bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
      left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
      right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
    }
  },
  defaultVariants: {
    side: "right"
  }
}), g = r.forwardRef(
  ({ side: t = "right", className: a, children: s, ...l }, m) => /* @__PURE__ */ n(p, { children: [
    /* @__PURE__ */ o(d, {}),
    /* @__PURE__ */ n(e.Content, { ref: m, className: i(h({ side: t }), a), ...l, children: [
      /* @__PURE__ */ n(e.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
        /* @__PURE__ */ o(f, { className: "h-4 w-4" }),
        /* @__PURE__ */ o("span", { className: "sr-only", children: "Close" })
      ] }),
      s
    ] })
  ] })
);
g.displayName = e.Content.displayName;
const u = ({ className: t, ...a }) => /* @__PURE__ */ o("div", { className: i("flex flex-col space-y-2 text-center sm:text-left", t), ...a });
u.displayName = "SheetHeader";
const y = ({ className: t, ...a }) => /* @__PURE__ */ o("div", { className: i("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", t), ...a });
y.displayName = "SheetFooter";
const x = r.forwardRef(
  ({ className: t, ...a }, s) => /* @__PURE__ */ o(e.Title, { ref: s, className: i("text-lg font-semibold text-foreground", t), ...a })
);
x.displayName = e.Title.displayName;
const b = r.forwardRef(({ className: t, ...a }, s) => /* @__PURE__ */ o(e.Description, { ref: s, className: i("text-sm text-muted-foreground", t), ...a }));
b.displayName = e.Description.displayName;
export {
  C as Sheet,
  T as SheetClose,
  g as SheetContent,
  b as SheetDescription,
  y as SheetFooter,
  u as SheetHeader,
  d as SheetOverlay,
  p as SheetPortal,
  x as SheetTitle,
  R as SheetTrigger
};
//# sourceMappingURL=sheet.es.js.map
