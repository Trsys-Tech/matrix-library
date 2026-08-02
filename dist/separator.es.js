import { jsx as x } from "react/jsx-runtime";
import * as l from "react";
import { Root as m } from "@radix-ui/react-separator";
import { cn as e } from "./utils.es.js";
const f = l.forwardRef(
  ({ className: o, orientation: r = "horizontal", decorative: t = !0, ...a }, p) => /* @__PURE__ */ x(
    m,
    {
      ref: p,
      decorative: t,
      orientation: r,
      className: e("mtx-shrink-0 mtx-bg-border", r === "horizontal" ? "mtx-h-[1px] mtx-w-full" : "mtx-h-full mtx-w-[1px]", o),
      ...a
    }
  )
);
f.displayName = m.displayName;
export {
  f as Separator
};
//# sourceMappingURL=separator.es.js.map
