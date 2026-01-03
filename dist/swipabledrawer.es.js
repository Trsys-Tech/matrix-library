import { jsx as r, jsxs as s } from "react/jsx-runtime";
import * as o from "react";
import { Drawer as t } from "vaul";
import { cn as i } from "./utils.es.js";
const d = ({ shouldScaleBackground: e = !0, ...a }) => /* @__PURE__ */ r(t.Root, { shouldScaleBackground: e, ...a });
d.displayName = "SwipableDrawer";
const m = t.Trigger;
m.displayName = "SwipableDrawerTrigger";
const n = t.Portal, c = t.Close;
c.displayName = "SwipableDrawerClose";
const w = o.forwardRef(({ className: e, ...a }, l) => /* @__PURE__ */ r(t.Overlay, { ref: l, className: i("fixed inset-0 z-50 bg-black/80", e), ...a }));
w.displayName = "SwipableDrawerOverlay";
const b = o.forwardRef(({ className: e, children: a, ...l }, p) => /* @__PURE__ */ s(n, { children: [
  /* @__PURE__ */ r(w, {}),
  /* @__PURE__ */ s(
    t.Content,
    {
      ref: p,
      className: i("fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background", e),
      ...l,
      children: [
        /* @__PURE__ */ r("div", { className: "mx-auto my-2 h-1.5 w-[100px] rounded-full bg-muted" }),
        a
      ]
    }
  )
] }));
b.displayName = "SwipableDrawerContent";
const D = ({ className: e, ...a }) => /* @__PURE__ */ r("div", { className: i("grid gap-1.5 p-4 text-center sm:text-left", e), ...a });
D.displayName = "SwipableDrawerHeader";
const f = ({ className: e, ...a }) => /* @__PURE__ */ r("div", { className: i("mt-auto flex flex-col gap-2 p-4", e), ...a });
f.displayName = "SwipableDrawerFooter";
const S = o.forwardRef(({ className: e, ...a }, l) => /* @__PURE__ */ r(t.Title, { ref: l, className: i("text-lg font-semibold leading-none tracking-tight", e), ...a }));
S.displayName = "SwipableDrawerTitle";
const g = o.forwardRef(({ className: e, ...a }, l) => /* @__PURE__ */ r(t.Description, { ref: l, className: i("text-sm text-muted-foreground", e), ...a }));
g.displayName = "SwipableDrawerDescription";
export {
  d as SwipableDrawer,
  c as SwipableDrawerClose,
  b as SwipableDrawerContent,
  g as SwipableDrawerDescription,
  f as SwipableDrawerFooter,
  D as SwipableDrawerHeader,
  S as SwipableDrawerTitle,
  m as SwipableDrawerTrigger
};
//# sourceMappingURL=swipabledrawer.es.js.map
