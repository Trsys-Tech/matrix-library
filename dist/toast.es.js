import { jsxs as t, jsx as o } from "react/jsx-runtime";
import { useEffect as l } from "react";
import { ToastProvider as p, Toast as x, ToastTitle as d, ToastClose as T, ToastViewport as h } from "./toast-components.es.js";
import { useToasts as u, toastParams as w } from "./use-toast.es.js";
import { InfoCircleIcon as C } from "./infocircleicon.es.js";
import { SuccessCircleIcon as N } from "./successcircleicon.es.js";
import { WarningCircleIcon as g } from "./warningcircleicon.es.js";
import { DangerCircleIcon as I } from "./dangercircleicon.es.js";
function P({ limit: m = 3, duration: c = 5e3, slotProps: e }) {
  const { toasts: a, removeToast: n } = u();
  return l(() => {
    m !== void 0 && (w.limit = m);
  }, [m]), /* @__PURE__ */ t(p, { duration: c, ...e?.providerProps ?? {}, children: [
    Array.from(a).map(([s, { message: i, variant: r }]) => /* @__PURE__ */ t(
      x,
      {
        variant: r,
        onOpenChange: (f) => {
          f || setTimeout(() => n(s), 100);
        },
        ...e?.itemProps ?? {},
        children: [
          /* @__PURE__ */ t("div", { className: "mtx-flex mtx-gap-2 mtx-items-center", children: [
            /* @__PURE__ */ t("div", { children: [
              r === "danger" && /* @__PURE__ */ o(I, { className: "mtx-w-5 mtx-h-5" }),
              r === "success" && /* @__PURE__ */ o(N, { className: "mtx-w-5 mtx-h-5" }),
              r === "info" && /* @__PURE__ */ o(C, { className: "mtx-w-5 mtx-h-5" }),
              r === "warning" && /* @__PURE__ */ o(g, { className: "mtx-w-5 mtx-h-5" })
            ] }),
            i && /* @__PURE__ */ o(d, { ...e?.titleProps ?? {}, children: i })
          ] }),
          /* @__PURE__ */ o(T, { ...e?.closeProps ?? {} })
        ]
      },
      s
    )),
    /* @__PURE__ */ o(h, {})
  ] });
}
P.displayName = "Toast";
export {
  P as Toast
};
//# sourceMappingURL=toast.es.js.map
