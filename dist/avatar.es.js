import { jsx as l } from "react/jsx-runtime";
import * as r from "react";
import * as a from "@radix-ui/react-avatar";
import { cn as o } from "./utils.es.js";
const s = r.forwardRef(
  ({ className: m, ...t }, e) => /* @__PURE__ */ l(
    a.Root,
    {
      ref: e,
      className: o("mtx-relative mtx-flex mtx-h-10 mtx-w-10 mtx-shrink-0 mtx-overflow-hidden mtx-rounded-full", m),
      ...t
    }
  )
);
s.displayName = a.Root.displayName;
const x = r.forwardRef(
  ({ className: m, ...t }, e) => /* @__PURE__ */ l(a.Image, { ref: e, className: o("mtx-aspect-square mtx-h-full mtx-w-full", m), ...t })
);
x.displayName = a.Image.displayName;
const f = r.forwardRef(({ className: m, ...t }, e) => /* @__PURE__ */ l(
  a.Fallback,
  {
    ref: e,
    className: o("mtx-flex mtx-h-full mtx-w-full mtx-items-center mtx-justify-center mtx-rounded-full mtx-bg-muted", m),
    ...t
  }
));
f.displayName = a.Fallback.displayName;
export {
  s as Avatar,
  f as AvatarFallback,
  x as AvatarImage
};
//# sourceMappingURL=avatar.es.js.map
