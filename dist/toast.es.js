import { jsxs as s, jsx as o } from "react/jsx-runtime";
import { useEffect as l } from "react";
import { ToastProvider as p, Toast as d, ToastTitle as T, ToastClose as h, ToastViewport as u } from "./toast-components.es.js";
import { useToasts as w, toastParams as C } from "./use-toast.es.js";
import { InfoCircleIcon as N } from "./infocircleicon.es.js";
import { SuccessCircleIcon as g } from "./successcircleicon.es.js";
import { WarningCircleIcon as I } from "./warningcircleicon.es.js";
import { DangerCircleIcon as x } from "./dangercircleicon.es.js";
function P({ limit: i = 3, duration: m = 5e3, slotProps: e }) {
  const { toasts: a, removeToast: n } = w();
  return l(() => {
    i !== void 0 && (C.limit = i);
  }, [i]), /* @__PURE__ */ s(p, { duration: m, ...e?.providerProps ?? {}, children: [
    Array.from(a).map(([t, { message: c, variant: r }]) => /* @__PURE__ */ s(
      d,
      {
        variant: r,
        onOpenChange: (f) => {
          f || setTimeout(() => n(t), 100);
        },
        ...e?.itemProps ?? {},
        children: [
          /* @__PURE__ */ s("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ s("div", { children: [
              r === "danger" && /* @__PURE__ */ o(x, { className: "w-5 h-5" }),
              r === "success" && /* @__PURE__ */ o(g, { className: "w-5 h-5" }),
              r === "info" && /* @__PURE__ */ o(N, { className: "w-5 h-5" }),
              r === "warning" && /* @__PURE__ */ o(I, { className: "w-5 h-5" })
            ] }),
            c && /* @__PURE__ */ o(T, { ...e?.titleProps ?? {}, children: c })
          ] }),
          /* @__PURE__ */ o(h, { ...e?.closeProps ?? {} })
        ]
      },
      t
    )),
    /* @__PURE__ */ o(u, {})
  ] });
}
P.displayName = "Toast";
export {
  P as Toast
};
//# sourceMappingURL=toast.es.js.map
