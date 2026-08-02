import { jsx as m } from "react/jsx-runtime";
import * as r from "react";
import { cn as a } from "./utils.es.js";
const o = r.forwardRef(({ className: t, ...e }, x) => /* @__PURE__ */ m(
  "textarea",
  {
    className: a(
      "mtx-flex mtx-min-h-[60px] mtx-w-full mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-px-3 mtx-py-2 mtx-text-xs mtx-font-medium mtx-text-text",
      "placeholder:mtx-text-text-300 focus-visible:mtx-outline-none focus-visible:mtx-border-primary disabled:mtx-opacity-50 disabled:mtx-text-text-300 disabled:mtx-bg-gray-100 disabled:mtx-border-gray-100",
      t
    ),
    ref: x,
    ...e
  }
));
o.displayName = "Textarea";
export {
  o as Textarea
};
//# sourceMappingURL=textarea.es.js.map
