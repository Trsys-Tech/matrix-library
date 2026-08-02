import { jsxs as v, jsx as a } from "react/jsx-runtime";
import s, { useCallback as u, useEffect as k } from "react";
import { Modal as I, ModalFooter as S } from "./modal.es.js";
import { Button as b } from "./button.es.js";
import { cn as B } from "./utils.es.js";
let j = 0;
const w = s.createContext(null), K = ({ children: n }) => {
  const [c, e] = s.useState(null), [o, i] = s.useState({
    buttonOrder: ["cancel", "confirm"],
    description: "",
    title: "Are you sure?"
  }), [l, C] = s.useState(0), m = u((t, r) => new Promise((x, P) => {
    C((p) => p + 1), i(r), e({ resolve: x, reject: P, parentId: t });
  }), []), f = u((t) => {
    e((r) => r?.parentId === t ? null : r);
  }, []), d = u(() => {
    e((t) => (t?.reject(), null));
  }, []), h = u(() => {
    e((t) => (t?.resolve(null), null));
  }, []);
  return /* @__PURE__ */ v(w.Provider, { value: { confirmBase: m, closeOnParentUnmount: f }, children: [
    n,
    /* @__PURE__ */ a(E, { open: c !== null, options: o, onCancel: d, onConfirm: h }, l)
  ] });
}, g = () => `confirm-${s.useMemo(() => j++, [])}`, R = () => {
  const n = g(), c = s.useContext(w);
  if (!c)
    throw new Error("useConfirm must be used within a ConfirmProvider");
  const { confirmBase: e, closeOnParentUnmount: o } = c, i = u(
    (l) => e(n, l),
    [n, e]
  );
  return k(() => () => {
    o(n);
  }, [n, o]), i;
}, E = ({ onConfirm: n, open: c, options: e, onCancel: o }) => {
  const {
    buttonOrder: i = ["cancel", "confirm"],
    description: l,
    title: C,
    cancelationText: m,
    confirmationText: f,
    hideCancelButton: d,
    modalProps: h,
    cancelButtonProps: t,
    confirmButtonProps: r,
    descriptionProps: x
  } = e, P = s.useMemo(
    () => i.map((p) => {
      const { className: y, ...N } = r ?? {}, { className: O, ...M } = t ?? {};
      if (p === "confirm")
        return /* @__PURE__ */ a(
          b,
          {
            type: "button",
            onClick: n,
            variant: "primary",
            className: B("mtx-w-28", y),
            ...N,
            children: f || "Confirm"
          },
          "confirm-button"
        );
      if (p === "cancel" && !d)
        return /* @__PURE__ */ a(
          b,
          {
            onClick: o,
            variant: "text",
            className: B("mtx-w-28", O),
            ...M,
            type: "button",
            children: m || "Cancel"
          },
          "cancel-button"
        );
    }),
    [d, i, f, m, r, t, n, o]
  );
  return /* @__PURE__ */ v(I, { open: c, onOpenChange: o, title: C, role: "alertdialog", ...h, children: [
    /* @__PURE__ */ a("p", { ...x, children: l }),
    /* @__PURE__ */ a(S, { children: P })
  ] });
};
export {
  K as ConfirmProvider,
  R as useConfirm
};
//# sourceMappingURL=confirm.es.js.map
