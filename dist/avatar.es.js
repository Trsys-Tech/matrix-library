import { jsx as m } from "react/jsx-runtime";
import * as o from "react";
import * as a from "@radix-ui/react-avatar";
import { cn as s } from "./utils.es.js";
const t = o.forwardRef(
  ({ className: e, ...l }, r) => /* @__PURE__ */ m(a.Root, { ref: r, className: s("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", e), ...l })
);
t.displayName = a.Root.displayName;
const f = o.forwardRef(
  ({ className: e, ...l }, r) => /* @__PURE__ */ m(a.Image, { ref: r, className: s("aspect-square h-full w-full", e), ...l })
);
f.displayName = a.Image.displayName;
const i = o.forwardRef(({ className: e, ...l }, r) => /* @__PURE__ */ m(a.Fallback, { ref: r, className: s("flex h-full w-full items-center justify-center rounded-full bg-muted", e), ...l }));
i.displayName = a.Fallback.displayName;
export {
  t as Avatar,
  i as AvatarFallback,
  f as AvatarImage
};
//# sourceMappingURL=avatar.es.js.map
