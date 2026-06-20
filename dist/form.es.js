import { jsx as a } from "react/jsx-runtime";
import * as m from "react";
import { Slot as x } from "@radix-ui/react-slot";
import { FormProvider as F, Controller as u, useFormContext as p } from "react-hook-form";
import { Label as I } from "./label.es.js";
import { cn as i } from "./utils.es.js";
const D = F, l = m.createContext({}), M = ({
  ...e
}) => /* @__PURE__ */ a(l.Provider, { value: { name: e.name }, children: /* @__PURE__ */ a(u, { ...e }) }), d = () => {
  const e = m.useContext(l), t = m.useContext(f), { getFieldState: o, formState: r } = p(), n = o(e.name, r);
  if (!e)
    throw new Error("useFormField should be used within <FormField>");
  const { id: s } = t;
  return {
    id: s,
    name: e.name,
    formItemId: `${s}-form-item`,
    formDescriptionId: `${s}-form-item-description`,
    formMessageId: `${s}-form-item-message`,
    ...n
  };
}, f = m.createContext({}), g = m.forwardRef(({ className: e, ...t }, o) => {
  const r = m.useId();
  return /* @__PURE__ */ a(f.Provider, { value: { id: r }, children: /* @__PURE__ */ a("div", { ref: o, className: i("mtx-space-y-1", e), ...t }) });
});
g.displayName = "FormItem";
const b = m.forwardRef(({ className: e, ...t }, o) => {
  const { error: r, formItemId: n } = d();
  return /* @__PURE__ */ a(I, { ref: o, className: i(r && "mtx-text-danger", "mtx-block mtx-text-text-300", e), htmlFor: n, ...t });
});
b.displayName = "FormLabel";
const C = m.forwardRef(({ className: e, ...t }, o) => {
  const { error: r, formItemId: n, formDescriptionId: s, formMessageId: c } = d();
  return /* @__PURE__ */ a(
    x,
    {
      ref: o,
      id: n,
      "aria-describedby": r ? `${s} ${c}` : `${s}`,
      "aria-invalid": !!r,
      className: i(e, r && "mtx-border-danger hover:mtx-border-danger focus-visible:mtx-border-danger"),
      ...t
    }
  );
});
C.displayName = "FormControl";
const N = m.forwardRef(({ className: e, ...t }, o) => {
  const { formDescriptionId: r } = d();
  return /* @__PURE__ */ a("p", { ref: o, id: r, className: i("mtx-text-[0.8rem] mtx-text-muted-foreground", e), ...t });
});
N.displayName = "FormDescription";
const h = m.forwardRef(({ className: e, children: t, ...o }, r) => {
  const { error: n, formMessageId: s } = d(), c = n ? String(n?.message) : t;
  return /* @__PURE__ */ a("p", { ref: r, id: s, className: i("mtx-text-[0.625rem] mtx-font-medium mtx-text-danger mtx-h-4", e), ...o, children: c ?? " " });
});
h.displayName = "FormMessage";
export {
  D as Form,
  C as FormControl,
  N as FormDescription,
  M as FormField,
  g as FormItem,
  b as FormLabel,
  h as FormMessage
};
//# sourceMappingURL=form.es.js.map
