import { jsx as a, jsxs as d } from "react/jsx-runtime";
import * as i from "react";
import * as e from "@radix-ui/react-accordion";
import { cn as s } from "./utils.es.js";
import { ChevronDown as m } from "@trsys-tech/matrix-icons";
const g = e.Root, c = i.forwardRef(({ className: o, ...t }, r) => /* @__PURE__ */ a(e.Item, { ref: r, className: s("border-b", o), ...t }));
c.displayName = "AccordionItem";
const l = i.forwardRef(({ className: o, children: t, ...r }, n) => /* @__PURE__ */ a(e.Header, { className: "flex", children: /* @__PURE__ */ d(
  e.Trigger,
  {
    ref: n,
    className: s(
      "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
      o
    ),
    ...r,
    children: [
      t,
      /* @__PURE__ */ a(m, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })
    ]
  }
) }));
l.displayName = e.Trigger.displayName;
const f = i.forwardRef(({ className: o, children: t, ...r }, n) => /* @__PURE__ */ a(
  e.Content,
  {
    ref: n,
    className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...r,
    children: /* @__PURE__ */ a("div", { className: s("pb-4 pt-0", o), children: t })
  }
));
f.displayName = e.Content.displayName;
export {
  g as Accordion,
  f as AccordionContent,
  c as AccordionItem,
  l as AccordionTrigger
};
//# sourceMappingURL=accordion.es.js.map
