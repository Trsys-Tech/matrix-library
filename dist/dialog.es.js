import { jsx as o, jsxs as d } from "react/jsx-runtime";
import * as i from "react";
import * as a from "@radix-ui/react-dialog";
import { XMark as m } from "@trsys-tech/matrix-icons";
import { cn as l } from "./utils.es.js";
const b = a.Root, w = a.Trigger, c = a.Portal, h = a.Close, n = i.forwardRef(({ className: e, ...t }, s) => /* @__PURE__ */ o(
  a.Overlay,
  {
    ref: s,
    className: l(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      e
    ),
    ...t
  }
));
n.displayName = a.Overlay.displayName;
const p = i.forwardRef(({ className: e, children: t, ...s }, r) => /* @__PURE__ */ d(c, { children: [
  /* @__PURE__ */ o(n, {}),
  /* @__PURE__ */ d(
    a.Content,
    {
      ref: r,
      className: l(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        e
      ),
      ...s,
      children: [
        t,
        /* @__PURE__ */ d(a.Close, { className: "absolute right-4 top-4 rounded-sm disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ o(m, { className: "h-5 w-5" }),
          /* @__PURE__ */ o("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
p.displayName = a.Content.displayName;
const f = ({ className: e, ...t }) => /* @__PURE__ */ o("div", { className: l("flex flex-col space-y-1.5 text-left", e), ...t });
f.displayName = "DialogHeader";
const g = ({ className: e, ...t }) => /* @__PURE__ */ o("div", { className: l("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", e), ...t });
g.displayName = "DialogFooter";
const N = i.forwardRef(
  ({ className: e, ...t }, s) => /* @__PURE__ */ o(a.Title, { ref: s, className: l("text-lg font-semibold leading-none tracking-tight", e), ...t })
);
N.displayName = a.Title.displayName;
const u = i.forwardRef(({ className: e, ...t }, s) => /* @__PURE__ */ o(a.Description, { ref: s, className: l("text-sm text-muted-foreground", e), ...t }));
u.displayName = a.Description.displayName;
export {
  b as Dialog,
  h as DialogClose,
  p as DialogContent,
  u as DialogDescription,
  g as DialogFooter,
  f as DialogHeader,
  n as DialogOverlay,
  c as DialogPortal,
  N as DialogTitle,
  w as DialogTrigger
};
//# sourceMappingURL=dialog.es.js.map
