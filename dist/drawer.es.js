import { jsx as r, Fragment as v, jsxs as w } from "react/jsx-runtime";
import * as p from "react";
import { Slot as b } from "@radix-ui/react-slot";
import { ChevronsRight as C } from "@trsys-tech/matrix-icons";
import { createContextScope as D } from "@radix-ui/react-context";
import { cn as a } from "./utils.es.js";
import { Modal as M } from "./modal.es.js";
import { IconButton as R } from "./iconbutton.es.js";
import { useIsMobile as E } from "./use-mobile.es.js";
const u = "Drawer", [A] = D(u), [_, g] = A(u), j = p.forwardRef((o, t) => {
  const { asChild: x, anchor: m = "right", children: e, open: n, width: i = 240, className: l, onClose: s, __scopeDrawer: c, ...d } = o, f = x ? b : "div", h = E();
  return /* @__PURE__ */ r(f, { ref: t, className: a("mtx-flex", l), ...d, children: /* @__PURE__ */ r(_, { anchor: m, onClose: s, open: n, width: i, isMobile: h, scope: c, children: e }) });
});
j.displayName = u;
const N = "DrawerMain", k = p.forwardRef(
  ({ asChild: o, children: t, className: x, style: m, __scopeDrawer: e, ...n }, i) => {
    const l = o ? b : "div", { anchor: s, open: c, width: d, isMobile: f } = g(N, e), h = p.useMemo(() => f ? {} : s === "left" ? { marginInlineStart: c ? d : 0 } : { marginInlineEnd: c ? d : 0 }, [s, c, d, f]);
    return /* @__PURE__ */ r(l, { ref: i, className: a("mtx-flex-grow mtx-overflow-hidden", x), style: { ...m, ...h }, ...n, children: t });
  }
);
k.displayName = N;
const y = "DrawerContent", I = p.forwardRef(({ children: o, title: t, __scopeDrawer: x }, m) => {
  const { anchor: e, open: n, width: i, onClose: l, isMobile: s } = g(y, x);
  return /* @__PURE__ */ r(v, { children: s ? /* @__PURE__ */ r(M, { title: t, open: n, onOpenChange: l, ref: m, fullScreen: !0, children: o }) : /* @__PURE__ */ r("div", { className: a("mtx-hidden md:mtx-block mtx-overflow-hidden"), style: { width: i }, ref: m, children: /* @__PURE__ */ w(
    "div",
    {
      className: a(
        "mtx-overflow-y-auto mtx-flex mtx-flex-col mtx-h-full mtx-top-0 mtx-z-[120] mtx-bg-background mtx-transition-all mtx-border-gray-200",
        n ? "" : e === "left" ? "-mtx-translate-x-full rtl:mtx-translate-x-full mtx-invisible" : "mtx-translate-x-full rtl:-mtx-translate-x-full mtx-invisible",
        e === "left" ? "mtx-border-r" : "mtx-border-l"
      ),
      children: [
        /* @__PURE__ */ w(
          "div",
          {
            className: a(
              "mtx-h-9 mtx-flex mtx-items-center mtx-gap-2 mtx-p-2 mtx-bg-background mtx-w-full mtx-sticky mtx-top-0 mtx-border-b mtx-border-gray-200",
              e === "right" ? "mtx-justify-start rtl:mtx-justify-end" : "mtx-justify-end rtl:mtx-justify-start"
            ),
            children: [
              /* @__PURE__ */ r(R, { type: "button", onClick: l, className: "mtx-w-5 mtx-h-5 mtx-p-0", children: /* @__PURE__ */ r(C, { className: a("mtx-w-5 mtx-h-5", e === "right" ? "rtl:-mtx-scale-100" : "-mtx-scale-100 rtl:mtx-scale-100") }) }),
              typeof t == "string" || typeof t == "number" ? /* @__PURE__ */ r("h2", { className: "mtx-text-lg mtx-font-bold mtx-text-text", children: t }) : t
            ]
          }
        ),
        o
      ]
    }
  ) }) });
});
I.displayName = y;
export {
  j as Drawer,
  I as DrawerContent,
  k as DrawerMain
};
//# sourceMappingURL=drawer.es.js.map
