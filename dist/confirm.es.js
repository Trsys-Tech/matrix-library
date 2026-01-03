import { jsxs as b, jsx as a } from "react/jsx-runtime";
import s, { useCallback as u, useEffect as y } from "react";
import { Modal as I, ModalFooter as S } from "./modal.es.js";
import { Button as B } from "./button.es.js";
import { cn as v } from "./utils.es.js";
let j = 0;
const w = s.createContext(null), K = ({ children: n }) => {
  const [c, e] = s.useState(null), [r, i] = s.useState({
    buttonOrder: ["cancel", "confirm"],
    description: "",
    title: "Are you sure?"
  }), [l, C] = s.useState(0), m = u((t, o) => new Promise((P, x) => {
    C((p) => p + 1), i(o), e({ resolve: P, reject: x, parentId: t });
  }), []), f = u((t) => {
    e((o) => o?.parentId === t ? null : o);
  }, []), d = u(() => {
    e((t) => (t?.reject(), null));
  }, []), h = u(() => {
    e((t) => (t?.resolve(null), null));
  }, []);
  return /* @__PURE__ */ b(w.Provider, { value: { confirmBase: m, closeOnParentUnmount: f }, children: [
    n,
    /* @__PURE__ */ a(E, { open: c !== null, options: r, onCancel: d, onConfirm: h }, l)
  ] });
}, g = () => `confirm-${s.useMemo(() => j++, [])}`, R = () => {
  const n = g(), c = s.useContext(w);
  if (!c)
    throw new Error("useConfirm must be used within a ConfirmProvider");
  const { confirmBase: e, closeOnParentUnmount: r } = c, i = u(
    (l) => e(n, l),
    [n, e]
  );
  return y(() => () => {
    r(n);
  }, [n, r]), i;
}, E = ({ onConfirm: n, open: c, options: e, onCancel: r }) => {
  const {
    buttonOrder: i = ["cancel", "confirm"],
    description: l,
    title: C,
    cancelationText: m,
    confirmationText: f,
    hideCancelButton: d,
    modalProps: h,
    cancelButtonProps: t,
    confirmButtonProps: o,
    descriptionProps: P
  } = e, x = s.useMemo(
    () => i.map((p) => {
      const { className: N, ...O } = o ?? {}, { className: M, ...k } = t ?? {};
      if (p === "confirm")
        return /* @__PURE__ */ a(B, { onClick: n, variant: "primary", className: v("w-28", N), ...O, children: f || "Confirm" }, "confirm-button");
      if (p === "cancel" && !d)
        return /* @__PURE__ */ a(B, { onClick: r, variant: "text", className: v("w-28", M), ...k, children: m || "Cancel" }, "cancel-button");
    }),
    [d, i, f, m, o, t, n, r]
  );
  return /* @__PURE__ */ b(I, { open: c, onOpenChange: r, title: C, role: "alertdialog", ...h, children: [
    /* @__PURE__ */ a("p", { ...P, children: l }),
    /* @__PURE__ */ a(S, { children: x })
  ] });
};
export {
  K as ConfirmProvider,
  R as useConfirm
};
//# sourceMappingURL=confirm.es.js.map
