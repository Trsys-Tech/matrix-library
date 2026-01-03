import { jsx as s } from "react/jsx-runtime";
import * as r from "react";
import { Root as m, List as i, Trigger as n, Content as d } from "@radix-ui/react-tabs";
import { cn as o } from "./utils.es.js";
const u = m, l = r.forwardRef(({ className: t, ...e }, a) => /* @__PURE__ */ s(
  i,
  {
    ref: a,
    className: o(
      "inline-flex h-12 w-full overflow-auto thin-scrollbar items-center justify-start bg-background p-0 text-muted-foreground md:[box-shadow:inset_0_-1px_0_hsl(var(--gray-300))]",
      t
    ),
    ...e
  }
));
l.displayName = i.displayName;
const f = r.forwardRef(
  ({ className: t, ...e }, a) => /* @__PURE__ */ s(
    n,
    {
      ref: a,
      className: o(
        "inline-flex items-center justify-center whitespace-nowrap h-full px-3 py-1 text-sm font-medium disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground data-[state=active]:font-bold data-[state=active]:border-b-2 data-[state=active]:border-primary",
        t
      ),
      ...e
    }
  )
);
f.displayName = n.displayName;
const c = r.forwardRef(
  ({ className: t, ...e }, a) => /* @__PURE__ */ s(d, { ref: a, className: o("mt-2", t), ...e })
);
c.displayName = d.displayName;
export {
  u as Tabs,
  c as TabsContent,
  l as TabsList,
  f as TabsTrigger
};
//# sourceMappingURL=tabs.es.js.map
