import { jsx as m } from "react/jsx-runtime";
import * as o from "react";
import { Root as n, Content as s, List as x, Trigger as i } from "@radix-ui/react-tabs";
import { cn as r } from "./utils.es.js";
const y = n, d = o.forwardRef(({ className: t, ...e }, a) => /* @__PURE__ */ m(
  x,
  {
    ref: a,
    className: r(
      "mtx-inline-flex mtx-h-12 mtx-w-full mtx-overflow-auto mtx-thin-scrollbar mtx-items-center mtx-justify-start mtx-bg-background mtx-p-0 mtx-text-muted-foreground md:mtx-[box-shadow:inset_0_-oklch(var(--gray-300))]",
      t
    ),
    ...e
  }
));
d.displayName = x.displayName;
const l = o.forwardRef(
  ({ className: t, ...e }, a) => /* @__PURE__ */ m(
    i,
    {
      ref: a,
      className: r(
        "mtx-inline-flex mtx-items-center mtx-justify-center mtx-whitespace-nowrap mtx-h-full mtx-px-3 mtx-py-1 mtx-text-sm mtx-font-medium disabled:mtx-pointer-events-none disabled:mtx-opacity-50 data-[state=active]:mtx-text-foreground data-[state=active]:mtx-font-bold data-[state=active]:mtx-border-b-2 data-[state=active]:mtx-border-primary",
        t
      ),
      ...e
    }
  )
);
l.displayName = i.displayName;
const c = o.forwardRef(
  ({ className: t, ...e }, a) => /* @__PURE__ */ m(s, { ref: a, className: r("mtx-mt-2", t), ...e })
);
c.displayName = s.displayName;
export {
  y as Tabs,
  c as TabsContent,
  d as TabsList,
  l as TabsTrigger
};
//# sourceMappingURL=tabs.es.js.map
