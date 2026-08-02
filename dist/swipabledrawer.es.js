import { jsx as a, jsxs as o } from "react/jsx-runtime";
import * as i from "react";
import { Drawer as r } from "vaul";
import { cn as l } from "./utils.es.js";
const w = ({ shouldScaleBackground: e = !0, ...t }) => /* @__PURE__ */ a(r.Root, { shouldScaleBackground: e, ...t });
w.displayName = "SwipableDrawer";
const p = r.Trigger;
p.displayName = "SwipableDrawerTrigger";
const d = r.Portal, n = r.Close;
n.displayName = "SwipableDrawerClose";
const x = i.forwardRef(({ className: e, ...t }, m) => /* @__PURE__ */ a(r.Overlay, { ref: m, className: l("mtx-fixed mtx-inset-0 mtx-z-50 mtx-bg-black/80", e), ...t }));
x.displayName = "SwipableDrawerOverlay";
const c = i.forwardRef(({ className: e, children: t, ...m }, s) => /* @__PURE__ */ o(d, { children: [
  /* @__PURE__ */ a(x, {}),
  /* @__PURE__ */ o(
    r.Content,
    {
      ref: s,
      className: l(
        "mtx-fixed mtx-inset-x-0 mtx-bottom-0 mtx-z-50 mtx-mt-24 mtx-flex mtx-h-auto mtx-flex-col mtx-rounded-t-[10px] mtx-border mtx-bg-background",
        e
      ),
      ...m,
      children: [
        /* @__PURE__ */ a("div", { className: "mtx-mx-auto mtx-my-2 mtx-h-1.5 mtx-w-[100px] mtx-rounded-full mtx-bg-muted" }),
        t
      ]
    }
  )
] }));
c.displayName = "SwipableDrawerContent";
const b = ({ className: e, ...t }) => /* @__PURE__ */ a("div", { className: l("mtx-grid mtx-gap-1.5 mtx-p-4 mtx-text-center sm:mtx-text-left", e), ...t });
b.displayName = "SwipableDrawerHeader";
const D = ({ className: e, ...t }) => /* @__PURE__ */ a("div", { className: l("mtx-mt-auto mtx-flex mtx-flex-col mtx-gap-2 mtx-p-4", e), ...t });
D.displayName = "SwipableDrawerFooter";
const f = i.forwardRef(({ className: e, ...t }, m) => /* @__PURE__ */ a(r.Title, { ref: m, className: l("mtx-text-lg mtx-font-semibold mtx-leading-none mtx-tracking-tight", e), ...t }));
f.displayName = "SwipableDrawerTitle";
const S = i.forwardRef(({ className: e, ...t }, m) => /* @__PURE__ */ a(r.Description, { ref: m, className: l("mtx-text-sm mtx-text-muted-foreground", e), ...t }));
S.displayName = "SwipableDrawerDescription";
export {
  w as SwipableDrawer,
  n as SwipableDrawerClose,
  c as SwipableDrawerContent,
  S as SwipableDrawerDescription,
  D as SwipableDrawerFooter,
  b as SwipableDrawerHeader,
  f as SwipableDrawerTitle,
  p as SwipableDrawerTrigger
};
//# sourceMappingURL=swipabledrawer.es.js.map
