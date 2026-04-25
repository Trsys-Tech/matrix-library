import { jsx as r, jsxs as s } from "react/jsx-runtime";
import * as n from "react";
import * as t from "@radix-ui/react-accordion";
import { cn as i } from "./utils.es.js";
import { ChevronDown as x } from "@trsys-tech/matrix-icons";
const g = t.Root, d = n.forwardRef(({ className: e, ...m }, o) => /* @__PURE__ */ r(t.Item, { ref: o, className: i("mtx-border-b", e), ...m }));
d.displayName = "AccordionItem";
const c = n.forwardRef(({ className: e, children: m, ...o }, a) => /* @__PURE__ */ r(t.Header, { className: "mtx-flex", children: /* @__PURE__ */ s(
  t.Trigger,
  {
    ref: a,
    className: i(
      "mtx-flex mtx-flex-1 mtx-items-center mtx-justify-between mtx-py-4 mtx-text-sm mtx-font-medium mtx-transition-all hover:mtx-underline mtx-text-left [&[data-state=open]>svg]:mtx-rotate-180",
      e
    ),
    ...o,
    children: [
      m,
      /* @__PURE__ */ r(x, { className: "mtx-h-4 mtx-w-4 mtx-shrink-0 mtx-text-muted-foreground mtx-transition-transform mtx-duration-200" })
    ]
  }
) }));
c.displayName = t.Trigger.displayName;
const l = n.forwardRef(({ className: e, children: m, ...o }, a) => /* @__PURE__ */ r(
  t.Content,
  {
    ref: a,
    className: "mtx-overflow-hidden mtx-text-sm data-[state=closed]:mtx-animate-accordion-up data-[state=open]:mtx-animate-accordion-down",
    ...o,
    children: /* @__PURE__ */ r("div", { className: i("mtx-pb-4 mtx-pt-0", e), children: m })
  }
));
l.displayName = t.Content.displayName;
export {
  g as Accordion,
  l as AccordionContent,
  d as AccordionItem,
  c as AccordionTrigger
};
//# sourceMappingURL=accordion.es.js.map
