import { jsx as e, jsxs as s } from "react/jsx-runtime";
import * as o from "react";
import * as t from "@radix-ui/react-checkbox";
import { cn as a } from "./utils.es.js";
import { Check as m, Minus as n } from "@trsys-tech/matrix-icons";
const c = o.forwardRef(
  ({ className: r, ...d }, i) => /* @__PURE__ */ e(
    t.Root,
    {
      ref: i,
      className: a(
        "peer h-4 w-4 shrink-0 rounded-sm border border-gray-400 hover:border-primary hover:bg-primary-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground disabled:bg-muted disabled:border-muted disabled:data-[state=checked]:border-muted disabled:data-[state=checked]:bg-muted disabled:data-[state=checked]:text-muted-foreground disabled:data-[state=indeterminate]:border-muted disabled:data-[state=indeterminate]:bg-muted disabled:data-[state=indeterminate]:text-muted-foreground",
        r
      ),
      ...d,
      children: /* @__PURE__ */ s(t.Indicator, { className: a("flex items-center justify-center text-current group"), children: [
        /* @__PURE__ */ e(m, { className: "w-full h-full group-data-[state=indeterminate]:hidden" }),
        /* @__PURE__ */ e(n, { className: "w-full h-full group-data-[state=checked]:hidden" })
      ] })
    }
  )
);
c.displayName = t.Root.displayName;
export {
  c as Checkbox
};
//# sourceMappingURL=checkbox.es.js.map
