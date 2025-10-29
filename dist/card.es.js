import { jsx as d } from "react/jsx-runtime";
import o from "react";
import { cn as t } from "./utils.es.js";
const s = o.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d("div", { ref: r, className: t("rounded-lg bg-card text-card-foreground shadow-card", a), ...e }));
s.displayName = "Card";
const i = o.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d("div", { ref: r, className: t("flex flex-col space-y-1.5 p-4", a), ...e }));
i.displayName = "CardHeader";
const c = o.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d("h3", { ref: r, className: t("font-semibold leading-none tracking-tight", a), ...e }));
c.displayName = "CardTitle";
const f = o.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d("p", { ref: r, className: t("text-sm text-muted-foreground", a), ...e }));
f.displayName = "CardDescription";
const l = o.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d("div", { ref: r, className: t("p-4 pt-0", a), ...e }));
l.displayName = "CardContent";
const m = o.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d("div", { ref: r, className: t("flex items-center p-4 pt-0", a), ...e }));
m.displayName = "CardFooter";
export {
  s as Card,
  l as CardContent,
  f as CardDescription,
  m as CardFooter,
  i as CardHeader,
  c as CardTitle
};
//# sourceMappingURL=card.es.js.map
