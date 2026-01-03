import { jsxs as i, jsx as s } from "react/jsx-runtime";
import * as m from "react";
import { Slot as c } from "@radix-ui/react-slot";
import { cn as t } from "./utils.es.js";
import { Elipsis as n, ChevronRight as d } from "@trsys-tech/matrix-icons";
const l = m.forwardRef(({ ...r }, e) => /* @__PURE__ */ s("nav", { ref: e, "aria-label": "breadcrumb", ...r }));
l.displayName = "Breadcrumb";
const p = m.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ s("ol", { ref: a, className: t("flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5", r), ...e }));
p.displayName = "BreadcrumbList";
const u = m.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ s("li", { ref: a, className: t("inline-flex items-center gap-1.5", r), ...e }));
u.displayName = "BreadcrumbItem";
const f = m.forwardRef(({ asChild: r, className: e, ...a }, o) => /* @__PURE__ */ s(r ? c : "a", { ref: o, className: t("transition-colors hover:text-foreground", e), ...a }));
f.displayName = "BreadcrumbLink";
const b = m.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ s("span", { ref: a, role: "link", "aria-disabled": "true", "aria-current": "page", className: t("font-normal text-foreground", r), ...e }));
b.displayName = "BreadcrumbPage";
const N = ({ children: r, className: e, ...a }) => /* @__PURE__ */ s("li", { role: "presentation", "aria-hidden": "true", className: t("[&>svg]:w-3.5 [&>svg]:h-3", e), ...a, children: r ?? /* @__PURE__ */ s(d, {}) });
N.displayName = "BreadcrumbSeparator";
const B = ({ className: r, ...e }) => /* @__PURE__ */ i("span", { role: "presentation", "aria-hidden": "true", className: t("flex h-9 w-9 items-center justify-center", r), ...e, children: [
  /* @__PURE__ */ s(n, { className: "h-4 w-4" }),
  /* @__PURE__ */ s("span", { className: "sr-only", children: "More" })
] });
B.displayName = "BreadcrumbElipssis";
export {
  l as Breadcrumb,
  B as BreadcrumbEllipsis,
  u as BreadcrumbItem,
  f as BreadcrumbLink,
  p as BreadcrumbList,
  b as BreadcrumbPage,
  N as BreadcrumbSeparator
};
//# sourceMappingURL=breadcrumb.es.js.map
