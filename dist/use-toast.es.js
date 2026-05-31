import o from "react";
import { v4 as i } from "uuid";
const c = {
  limit: 3
}, e = /* @__PURE__ */ new Map(), n = { setState: () => {
} }, a = (t) => (e.size >= c.limit && e.delete(e.keys().next().value), e.set(i(), t), n.setState(new Map(e)), e), u = (t) => {
  e.delete(t), n.setState(new Map(e));
}, s = (t) => a({ message: t, variant: "default" });
s.success = (t) => a({ message: t, variant: "success" });
s.danger = (t) => a({ message: t, variant: "danger" });
s.warning = (t) => a({ message: t, variant: "warning" });
s.info = (t) => a({ message: t, variant: "info" });
const l = () => {
  const [t, r] = o.useState(e);
  return o.useEffect(() => (n.setState = r, () => {
    n.setState = () => {
    };
  }), [t]), { toast: s, toasts: t, addToast: a, removeToast: u };
};
export {
  s as toast,
  c as toastParams,
  l as useToasts
};
//# sourceMappingURL=use-toast.es.js.map
