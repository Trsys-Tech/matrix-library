import { jsx as r, jsxs as a } from "react/jsx-runtime";
import { FormField as x, FormItem as F, FormLabel as P, FormControl as b, FormMessage as g } from "./form.es.js";
import { Textarea as h } from "./textarea.es.js";
const I = (t) => {
  const { name: l, control: m, defaultValue: n, disabled: o, readOnly: d, rules: i, shouldUnregister: p, label: c, slotProps: e, required: s, ...f } = t;
  return /* @__PURE__ */ r(
    x,
    {
      control: m,
      name: l,
      defaultValue: n,
      disabled: o,
      rules: i,
      shouldUnregister: p,
      render: ({ field: u }) => /* @__PURE__ */ a(F, { ...f, children: [
        /* @__PURE__ */ a(P, { ...e?.formLabelProps ?? {}, children: [
          c,
          s && /* @__PURE__ */ r("span", { className: "text-danger text-sm leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ r(b, { ...e?.formControlProps ?? {}, children: /* @__PURE__ */ r(h, { "aria-required": s, disabled: o || d, ...e?.textareaProps ?? {}, ...u }) }),
        /* @__PURE__ */ r(g, { ...e?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  I as FormTextarea
};
//# sourceMappingURL=formtextarea.es.js.map
