import { jsx as e, Fragment as v, jsxs as b } from "react/jsx-runtime";
import * as h from "react";
import { Slot as g } from "@radix-ui/react-slot";
import { ChevronsRight as C } from "@trsys-tech/matrix-icons";
import { createContextScope as D } from "@radix-ui/react-context";
import { cn as i } from "./utils.es.js";
import { Modal as M } from "./modal.es.js";
import { IconButton as R } from "./iconbutton.es.js";
import { useIsMobile as E } from "./use-mobile.es.js";
const w = "Drawer", [A] = D(w), [_, N] = A(w), j = h.forwardRef((t, r) => {
  const { asChild: c, anchor: n = "right", children: o, open: l, width: d = 240, className: s, onClose: a, __scopeDrawer: f, ...m } = t, p = c ? g : "div", u = E();
  return /* @__PURE__ */ e(p, { ref: r, className: i("flex", s), ...m, children: /* @__PURE__ */ e(_, { anchor: n, onClose: a, open: l, width: d, isMobile: u, scope: f, children: o }) });
});
j.displayName = w;
const x = "DrawerMain", k = h.forwardRef(
  ({ asChild: t, children: r, className: c, style: n, __scopeDrawer: o, ...l }, d) => {
    const s = t ? g : "div", { anchor: a, open: f, width: m, isMobile: p } = N(x, o), u = h.useMemo(() => p ? {} : a === "left" ? { marginInlineStart: f ? m : 0 } : { marginInlineEnd: f ? m : 0 }, [a, f, m, p]);
    return /* @__PURE__ */ e(s, { ref: d, className: i("flex-grow overflow-hidden", c), style: { ...n, ...u }, ...l, children: r });
  }
);
k.displayName = x;
const y = "DrawerContent", I = h.forwardRef(({ children: t, title: r, __scopeDrawer: c }, n) => {
  const { anchor: o, open: l, width: d, onClose: s, isMobile: a } = N(y, c);
  return /* @__PURE__ */ e(v, { children: a ? /* @__PURE__ */ e(M, { title: r, open: l, onOpenChange: s, ref: n, fullScreen: !0, children: t }) : /* @__PURE__ */ e("div", { className: i("hidden md:block overflow-hidden"), style: { width: d }, ref: n, children: /* @__PURE__ */ b(
    "div",
    {
      className: i(
        "overflow-y-auto flex flex-col h-full top-0 z-[120] bg-background transition-all border-gray-200",
        l ? "" : o === "left" ? "-translate-x-full rtl:translate-x-full invisible" : "translate-x-full rtl:-translate-x-full invisible",
        o === "left" ? "border-r" : "border-l"
      ),
      children: [
        /* @__PURE__ */ b(
          "div",
          {
            className: i(
              "h-9 flex items-center gap-2 p-2 bg-background w-full sticky top-0 border-b border-gray-200",
              o === "right" ? "justify-start rtl:justify-end" : "justify-end rtl:justify-start"
            ),
            children: [
              /* @__PURE__ */ e(R, { onClick: s, className: "w-5 h-5 p-0", children: /* @__PURE__ */ e(C, { className: i("w-5 h-5", o === "right" ? "rtl:-scale-100" : "-scale-100 rtl:scale-100") }) }),
              typeof r == "string" || typeof r == "number" ? /* @__PURE__ */ e("h2", { className: "text-lg font-bold text-text", children: r }) : r
            ]
          }
        ),
        t
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
