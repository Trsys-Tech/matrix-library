import { jsx as t, jsxs as i } from "react/jsx-runtime";
import * as s from "react";
import { Slot as c } from "@radix-ui/react-slot";
import { cn as m } from "./utils.es.js";
import { Elipsis as n, ChevronRight as d } from "@trsys-tech/matrix-icons";
const l = s.forwardRef(({ ...r }, e) => /* @__PURE__ */ t("nav", { ref: e, "aria-label": "breadcrumb", ...r }));
l.displayName = "Breadcrumb";
const x = s.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "ol",
  {
    ref: a,
    className: m(
      "mtx-flex mtx-flex-wrap mtx-items-center mtx-gap-1.5 mtx-break-words mtx-text-sm mtx-text-muted-foreground sm:mtx-gap-2.5",
      r
    ),
    ...e
  }
));
x.displayName = "BreadcrumbList";
const p = s.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t("li", { ref: a, className: m("mtx-inline-flex mtx-items-center mtx-gap-1.5", r), ...e }));
p.displayName = "BreadcrumbItem";
const u = s.forwardRef(({ asChild: r, className: e, ...a }, o) => /* @__PURE__ */ t(r ? c : "a", { ref: o, className: m("mtx-transition-colors hover:mtx-text-foreground", e), ...a }));
u.displayName = "BreadcrumbLink";
const f = s.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t("span", { ref: a, role: "link", "aria-disabled": "true", "aria-current": "page", className: m("mtx-font-normal mtx-text-foreground", r), ...e }));
f.displayName = "BreadcrumbPage";
const b = ({ children: r, className: e, ...a }) => /* @__PURE__ */ t("li", { role: "presentation", "aria-hidden": "true", className: m("[&>svg]:mtx-w-3.5 [&>svg]:mtx-h-3", e), ...a, children: r ?? /* @__PURE__ */ t(d, {}) });
b.displayName = "BreadcrumbSeparator";
const N = ({ className: r, ...e }) => /* @__PURE__ */ i("span", { role: "presentation", "aria-hidden": "true", className: m("mtx-flex mtx-h-9 mtx-w-9 mtx-items-center mtx-justify-center", r), ...e, children: [
  /* @__PURE__ */ t(n, { className: "mtx-h-4 mtx-w-4" }),
  /* @__PURE__ */ t("span", { className: "mtx-sr-only", children: "More" })
] });
N.displayName = "BreadcrumbElipssis";
export {
  l as Breadcrumb,
  N as BreadcrumbEllipsis,
  p as BreadcrumbItem,
  u as BreadcrumbLink,
  x as BreadcrumbList,
  f as BreadcrumbPage,
  b as BreadcrumbSeparator
};
//# sourceMappingURL=breadcrumb.es.js.map
