import { jsx as a } from "react/jsx-runtime";
import * as o from "react";
import { cn as d } from "./utils.es.js";
const i = o.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "textarea",
  {
    className: d(
      "flex min-h-[60px] w-full rounded-sm border border-input bg-transparent px-3 py-2 text-xs font-medium text-text",
      "placeholder:text-text-300 focus-visible:outline-none focus-visible:border-primary disabled:opacity-50 disabled:text-text-300 disabled:bg-gray-100 disabled:border-gray-100",
      e
    ),
    ref: r,
    ...t
  }
));
i.displayName = "Textarea";
export {
  i as Textarea
};
//# sourceMappingURL=textarea.es.js.map
