import { jsx as m, jsxs as c } from "react/jsx-runtime";
import * as n from "react";
import * as r from "@radix-ui/react-accordion";
import { cn as i } from "./utils.es.js";
import { ChevronDown as s } from "@trsys-tech/matrix-icons";
const d = r.Root;
d.displayName = "Accordion";
const x = n.forwardRef(({ className: t, ...e }, o) => /* @__PURE__ */ m(r.Item, { ref: o, className: i("mtx-border-b", t), ...e }));
x.displayName = "AccordionItem";
const l = n.forwardRef(({ className: t, children: e, ...o }, a) => /* @__PURE__ */ m(r.Header, { className: "mtx-flex", children: /* @__PURE__ */ c(
  r.Trigger,
  {
    ref: a,
    className: i(
      "mtx-flex mtx-flex-1 mtx-items-center mtx-justify-between mtx-py-4 mtx-text-sm mtx-font-medium mtx-transition-all hover:mtx-underline mtx-text-left [&[data-state=open]>svg]:mtx-rotate-180",
      t
    ),
    ...o,
    children: [
      e,
      /* @__PURE__ */ m(s, { className: "mtx-h-4 mtx-w-4 mtx-shrink-0 mtx-text-muted-foreground mtx-transition-transform mtx-duration-200" })
    ]
  }
) }));
l.displayName = "AccordionTrigger";
const f = n.forwardRef(({ className: t, children: e, ...o }, a) => /* @__PURE__ */ m(
  r.Content,
  {
    ref: a,
    className: "mtx-overflow-hidden mtx-text-sm data-[state=closed]:mtx-animate-accordion-up data-[state=open]:mtx-animate-accordion-down",
    ...o,
    children: /* @__PURE__ */ m("div", { className: i("mtx-pb-4 mtx-pt-0", t), children: e })
  }
));
f.displayName = "AccordionContent";
export {
  d as Accordion,
  f as AccordionContent,
  x as AccordionItem,
  l as AccordionTrigger
};
//# sourceMappingURL=accordion.es.js.map
