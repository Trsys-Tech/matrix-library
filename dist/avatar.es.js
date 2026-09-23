import { jsx as e } from "react/jsx-runtime";
import * as r from "react";
import * as l from "@radix-ui/react-avatar";
import { cn as o } from "./utils.es.js";
const x = r.forwardRef(
  ({ className: a, ...t }, m) => /* @__PURE__ */ e(
    l.Root,
    {
      ref: m,
      className: o("mtx-relative mtx-flex mtx-h-10 mtx-w-10 mtx-shrink-0 mtx-overflow-hidden mtx-rounded-full", a),
      ...t
    }
  )
);
x.displayName = "Avatar";
const f = r.forwardRef(
  ({ className: a, ...t }, m) => /* @__PURE__ */ e(l.Image, { ref: m, className: o("mtx-aspect-square mtx-h-full mtx-w-full", a), ...t })
);
f.displayName = "AvatarImage";
const s = r.forwardRef(({ className: a, ...t }, m) => /* @__PURE__ */ e(
  l.Fallback,
  {
    ref: m,
    className: o("mtx-flex mtx-h-full mtx-w-full mtx-items-center mtx-justify-center mtx-rounded-full mtx-bg-muted", a),
    ...t
  }
));
s.displayName = "AvatarFallback";
export {
  x as Avatar,
  s as AvatarFallback,
  f as AvatarImage
};
//# sourceMappingURL=avatar.es.js.map
