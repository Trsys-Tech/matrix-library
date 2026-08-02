import { jsx as o } from "react/jsx-runtime";
import r from "react";
import * as t from "@radix-ui/react-collapsible";
import { cn as s } from "./utils.es.js";
const i = r.forwardRef(({ className: a, ...e }, l) => /* @__PURE__ */ o(t.Root, { ref: l, className: s("mtx-rounded-lg mtx-bg-card mtx-text-card-foreground mtx-shadow-card", a), ...e }));
i.displayName = "Collapsible";
const d = r.forwardRef(({ className: a, children: e, ...l }, m) => /* @__PURE__ */ o(
  t.CollapsibleContent,
  {
    ref: m,
    className: "mtx-overflow-hidden data-[state=closed]:mtx-animate-collapsible-up data-[state=open]:mtx-animate-collapsible-down mtx-rounded-b-lg",
    ...l,
    children: /* @__PURE__ */ o("div", { className: s("mtx-p-4 mtx-pt-0", a), children: e })
  }
));
d.displayName = t.Content.displayName;
const p = r.forwardRef(({ className: a, children: e, ...l }, m) => /* @__PURE__ */ o(t.CollapsibleTrigger, { ref: m, className: s("mtx-p-4", a), ...l, children: e }));
p.displayName = t.Trigger.displayName;
export {
  i as Collapsible,
  d as CollapsibleContent,
  p as CollapsibleTrigger
};
//# sourceMappingURL=collapsible.es.js.map
