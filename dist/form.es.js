import { jsx as a } from "react/jsx-runtime";
import * as m from "react";
import { Slot as F } from "@radix-ui/react-slot";
import { FormProvider as u, Controller as p, useFormContext as x } from "react-hook-form";
import { Label as I } from "./label.es.js";
import { cn as i } from "./utils.es.js";
const D = u, l = m.createContext({}), M = ({
  ...e
}) => /* @__PURE__ */ a(l.Provider, { value: { name: e.name }, children: /* @__PURE__ */ a(p, { ...e }) }), d = () => {
  const e = m.useContext(l), o = m.useContext(f), { getFieldState: t, formState: r } = x(), n = t(e.name, r);
  if (!e)
    throw new Error("useFormField should be used within <FormField>");
  const { id: s } = o;
  return {
    id: s,
    name: e.name,
    formItemId: `${s}-form-item`,
    formDescriptionId: `${s}-form-item-description`,
    formMessageId: `${s}-form-item-message`,
    ...n
  };
}, f = m.createContext({}), g = m.forwardRef(({ className: e, ...o }, t) => {
  const r = m.useId();
  return /* @__PURE__ */ a(f.Provider, { value: { id: r }, children: /* @__PURE__ */ a("div", { ref: t, className: i("space-y-1", e), ...o }) });
});
g.displayName = "FormItem";
const b = m.forwardRef(({ className: e, ...o }, t) => {
  const { error: r, formItemId: n } = d();
  return /* @__PURE__ */ a(I, { ref: t, className: i(r && "text-danger", "block text-text-300", e), htmlFor: n, ...o });
});
b.displayName = "FormLabel";
const C = m.forwardRef(({ className: e, ...o }, t) => {
  const { error: r, formItemId: n, formDescriptionId: s, formMessageId: c } = d();
  return /* @__PURE__ */ a(
    F,
    {
      ref: t,
      id: n,
      "aria-describedby": r ? `${s} ${c}` : `${s}`,
      "aria-invalid": !!r,
      className: i(e, r && "border-danger hover:border-danger focus-visible:border-danger"),
      ...o
    }
  );
});
C.displayName = "FormControl";
const N = m.forwardRef(({ className: e, ...o }, t) => {
  const { formDescriptionId: r } = d();
  return /* @__PURE__ */ a("p", { ref: t, id: r, className: i("text-[0.8rem] text-muted-foreground", e), ...o });
});
N.displayName = "FormDescription";
const h = m.forwardRef(({ className: e, children: o, ...t }, r) => {
  const { error: n, formMessageId: s } = d(), c = n ? String(n?.message) : o;
  return /* @__PURE__ */ a("p", { ref: r, id: s, className: i("text-[0.625rem] font-medium text-danger h-4", e), ...t, children: c ?? " " });
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
