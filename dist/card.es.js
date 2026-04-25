import { jsx as r } from "react/jsx-runtime";
import d from "react";
import { cn as m } from "./utils.es.js";
const o = d.forwardRef(({ className: t, ...a }, e) => /* @__PURE__ */ r("div", { ref: e, className: m("mtx-rounded-lg mtx-bg-card mtx-text-card-foreground mtx-shadow-card", t), ...a }));
o.displayName = "Card";
const s = d.forwardRef(({ className: t, ...a }, e) => /* @__PURE__ */ r("div", { ref: e, className: m("mtx-flex mtx-flex-col mtx-space-y-1.5 mtx-p-4", t), ...a }));
s.displayName = "CardHeader";
const x = d.forwardRef(({ className: t, ...a }, e) => /* @__PURE__ */ r("h3", { ref: e, className: m("mtx-font-semibold mtx-leading-none mtx-tracking-tight", t), ...a }));
x.displayName = "CardTitle";
const i = d.forwardRef(({ className: t, ...a }, e) => /* @__PURE__ */ r("p", { ref: e, className: m("mtx-text-sm mtx-text-muted-foreground", t), ...a }));
i.displayName = "CardDescription";
const c = d.forwardRef(({ className: t, ...a }, e) => /* @__PURE__ */ r("div", { ref: e, className: m("mtx-p-4 mtx-pt-0", t), ...a }));
c.displayName = "CardContent";
const f = d.forwardRef(({ className: t, ...a }, e) => /* @__PURE__ */ r("div", { ref: e, className: m("mtx-flex mtx-items-center mtx-p-4 mtx-pt-0", t), ...a }));
f.displayName = "CardFooter";
export {
  o as Card,
  c as CardContent,
  i as CardDescription,
  f as CardFooter,
  s as CardHeader,
  x as CardTitle
};
//# sourceMappingURL=card.es.js.map
