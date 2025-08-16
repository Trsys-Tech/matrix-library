import { jsx as r } from "react/jsx-runtime";
import i from "react";
import * as o from "@radix-ui/react-collapsible";
import { cn as t } from "./utils.es.js";
const d = i.forwardRef(({ className: a, ...e }, l) => /* @__PURE__ */ r(o.Root, { ref: l, className: t("rounded-lg bg-card text-card-foreground shadow-card", a), ...e }));
d.displayName = "Collapsible";
const p = i.forwardRef(({ className: a, children: e, ...l }, s) => /* @__PURE__ */ r(
  o.CollapsibleContent,
  {
    ref: s,
    className: "overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down rounded-b-lg",
    ...l,
    children: /* @__PURE__ */ r("div", { className: t("p-4 pt-0", a), children: e })
  }
));
p.displayName = o.Content.displayName;
const m = i.forwardRef(({ className: a, children: e, ...l }, s) => /* @__PURE__ */ r(o.CollapsibleTrigger, { ref: s, className: t("p-4", a), ...l, children: e }));
m.displayName = o.Trigger.displayName;
export {
  d as Collapsible,
  p as CollapsibleContent,
  m as CollapsibleTrigger
};
//# sourceMappingURL=collapsible.es.js.map
