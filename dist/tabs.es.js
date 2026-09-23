import { jsx as m } from "react/jsx-runtime";
import * as o from "react";
import { Root as d, Content as x, List as i, Trigger as s } from "@radix-ui/react-tabs";
import { cn as r } from "./utils.es.js";
const y = d, b = o.forwardRef(({ className: t, ...e }, a) => /* @__PURE__ */ m(
  i,
  {
    ref: a,
    className: r(
      "mtx-inline-flex mtx-h-8 mtx-w-full mtx-overflow-auto mtx-thin-scrollbar mtx-items-center mtx-justify-start mtx-bg-background mtx-p-0 mtx-text-muted-foreground md:mtx-[box-shadow:inset_0_-oklch(var(--gray-300))] data-[orientation=horizontal]:mtx-border-b data-[orientation=horizontal]:mtx-border-b-gray-300",
      t
    ),
    ...e
  }
));
b.displayName = i.displayName;
const f = o.forwardRef(({ className: t, hasAlert: e, ...a }, n) => /* @__PURE__ */ m(
  s,
  {
    ref: n,
    className: r(
      "mtx-inline-flex mtx-items-center mtx-justify-center mtx-whitespace-nowrap mtx-h-full mtx-px-3 mtx-py-1 mtx-text-sm mtx-font-medium disabled:mtx-pointer-events-none disabled:mtx-opacity-50 data-[state=active]:mtx-text-foreground data-[state=active]:mtx-font-bold data-[state=active]:mtx-border-b-2 data-[state=active]:mtx-border-primary",
      t,
      e && "mtx-relative before:mtx-content-[''] before:mtx-block before:mtx-absolute before:mtx-top-0 before:mtx-right-0 before:mtx-z-10 before:mtx-bg-danger before:mtx-w-2 before:mtx-h-2 before:mtx-rounded"
    ),
    ...a
  }
));
f.displayName = s.displayName;
const l = o.forwardRef(
  ({ className: t, ...e }, a) => /* @__PURE__ */ m(x, { ref: a, className: r("mtx-mt-2", t), ...e })
);
l.displayName = x.displayName;
export {
  y as Tabs,
  l as TabsContent,
  b as TabsList,
  f as TabsTrigger
};
//# sourceMappingURL=tabs.es.js.map
