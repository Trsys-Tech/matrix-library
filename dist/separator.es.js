import { jsx as l } from "react/jsx-runtime";
import * as e from "react";
import { Root as o } from "@radix-ui/react-separator";
import { cn as f } from "./utils.es.js";
const s = e.forwardRef(
  ({ className: a, orientation: r = "horizontal", decorative: m = !0, ...p }, t) => /* @__PURE__ */ l(
    o,
    {
      ref: t,
      decorative: m,
      orientation: r,
      className: f("shrink-0 bg-border", r === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", a),
      ...p
    }
  )
);
s.displayName = o.displayName;
export {
  s as Separator
};
//# sourceMappingURL=separator.es.js.map
