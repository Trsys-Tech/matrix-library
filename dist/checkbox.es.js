import { jsx as t, jsxs as i } from "react/jsx-runtime";
import * as s from "react";
import * as e from "@radix-ui/react-checkbox";
import { cn as a } from "./utils.es.js";
import { Check as o, Minus as x } from "@trsys-tech/matrix-icons";
const n = s.forwardRef(
  ({ className: r, ...m }, d) => /* @__PURE__ */ t(
    e.Root,
    {
      ref: d,
      className: a(
        "mtx-peer mtx-h-4 mtx-w-4 mtx-shrink-0 mtx-rounded-sm mtx-border mtx-border-gray-400 hover:mtx-border-primary hover:mtx-bg-primary-100 focus-visible:mtx-outline-none focus-visible:mtx-ring-1 focus-visible:mtx-ring-ring disabled:mtx-cursor-not-allowed data-[state=checked]:mtx-bg-primary data-[state=checked]:mtx-text-primary-foreground data-[state=checked]:mtx-border-primary data-[state=indeterminate]:mtx-border-primary data-[state=indeterminate]:mtx-bg-primary data-[state=indeterminate]:mtx-text-primary-foreground disabled:mtx-bg-muted disabled:mtx-border-muted disabled:data-[state=checked]:mtx-border-muted disabled:data-[state=checked]:mtx-bg-muted disabled:data-[state=checked]:mtx-text-muted-foreground disabled:data-[state=indeterminate]:mtx-border-muted disabled:data-[state=indeterminate]:mtx-bg-muted disabled:data-[state=indeterminate]:mtx-text-muted-foreground",
        r
      ),
      ...m,
      children: /* @__PURE__ */ i(e.Indicator, { className: a("mtx-flex mtx-items-center mtx-justify-center mtx-text-current mtx-group"), children: [
        /* @__PURE__ */ t(o, { className: "mtx-w-full mtx-h-full group-data-[state=indeterminate]:mtx-hidden" }),
        /* @__PURE__ */ t(x, { className: "mtx-w-full mtx-h-full group-data-[state=checked]:mtx-hidden" })
      ] })
    }
  )
);
n.displayName = e.Root.displayName;
export {
  n as Checkbox
};
//# sourceMappingURL=checkbox.es.js.map
