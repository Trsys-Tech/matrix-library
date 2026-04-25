import { jsxs as x, jsx as o } from "react/jsx-runtime";
import * as l from "react";
import * as t from "@radix-ui/react-dialog";
import { XMark as n } from "@trsys-tech/matrix-icons";
import { cn as s } from "./utils.es.js";
const b = t.Root, w = t.Trigger, r = t.Portal, h = t.Close, i = l.forwardRef(({ className: a, ...e }, m) => /* @__PURE__ */ o(
  t.Overlay,
  {
    ref: m,
    className: s(
      "mtx-fixed mtx-inset-0 mtx-z-50 mtx-bg-black/80  data-[state=open]:mtx-animate-in data-[state=closed]:mtx-animate-out data-[state=closed]:mtx-fade-out-0 data-[state=open]:mtx-fade-in-0",
      a
    ),
    ...e
  }
));
i.displayName = t.Overlay.displayName;
const c = l.forwardRef(({ className: a, children: e, ...m }, d) => /* @__PURE__ */ x(r, { children: [
  /* @__PURE__ */ o(i, {}),
  /* @__PURE__ */ x(
    t.Content,
    {
      ref: d,
      className: s(
        "mtx-fixed mtx-left-[50%] mtx-top-[50%] mtx-z-50 mtx-grid mtx-w-full mtx-max-w-lg mtx-translate-x-[-50%] mtx-translate-y-[-50%] mtx-gap-4 mtx-border mtx-bg-background mtx-p-6 mtx-shadow-lg mtx-duration-200 data-[state=open]:mtx-animate-in data-[state=closed]:mtx-animate-out data-[state=closed]:mtx-fade-out-0 data-[state=open]:mtx-fade-in-0 data-[state=closed]:mtx-zoom-out-95 data-[state=open]:mtx-zoom-in-95 data-[state=closed]:mtx-slide-out-to-left-1/2 data-[state=closed]:mtx-slide-out-to-top-[48%] data-[state=open]:mtx-slide-in-from-left-1/2 data-[state=open]:mtx-slide-in-from-top-[48%] sm:mtx-rounded-lg",
        a
      ),
      ...m,
      children: [
        e,
        /* @__PURE__ */ x(t.Close, { className: "mtx-absolute mtx-right-4 mtx-top-4 mtx-rounded-sm disabled:mtx-pointer-events-none data-[state=open]:mtx-bg-accent data-[state=open]:mtx-text-muted-foreground", children: [
          /* @__PURE__ */ o(n, { className: "mtx-h-5 mtx-w-5" }),
          /* @__PURE__ */ o("span", { className: "mtx-sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
c.displayName = t.Content.displayName;
const p = ({ className: a, ...e }) => /* @__PURE__ */ o("div", { className: s("mtx-flex mtx-flex-col mtx-space-y-1.5 mtx-text-left", a), ...e });
p.displayName = "DialogHeader";
const f = ({ className: a, ...e }) => /* @__PURE__ */ o("div", { className: s("mtx-flex mtx-flex-col-reverse sm:mtx-flex-row sm:mtx-justify-end sm:mtx-space-x-2", a), ...e });
f.displayName = "DialogFooter";
const g = l.forwardRef(
  ({ className: a, ...e }, m) => /* @__PURE__ */ o(t.Title, { ref: m, className: s("mtx-text-lg mtx-font-semibold mtx-leading-none mtx-tracking-tight", a), ...e })
);
g.displayName = t.Title.displayName;
const N = l.forwardRef(({ className: a, ...e }, m) => /* @__PURE__ */ o(t.Description, { ref: m, className: s("mtx-text-sm mtx-text-muted-foreground", a), ...e }));
N.displayName = t.Description.displayName;
export {
  b as Dialog,
  h as DialogClose,
  c as DialogContent,
  N as DialogDescription,
  f as DialogFooter,
  p as DialogHeader,
  i as DialogOverlay,
  r as DialogPortal,
  g as DialogTitle,
  w as DialogTrigger
};
//# sourceMappingURL=dialog.es.js.map
