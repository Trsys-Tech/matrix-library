import { jsx as r, jsxs as t } from "react/jsx-runtime";
import { FormField as u, FormItem as x, FormLabel as F, FormControl as P, FormMessage as g } from "./form.es.js";
import { Textarea as h } from "./textarea.es.js";
const C = (a) => {
  const { name: m, control: l, defaultValue: n, disabled: o, rules: d, shouldUnregister: i, label: p, slotProps: e, required: s, ...c } = a;
  return /* @__PURE__ */ r(
    u,
    {
      control: l,
      name: m,
      defaultValue: n,
      disabled: o,
      rules: d,
      shouldUnregister: i,
      render: ({ field: f }) => /* @__PURE__ */ t(x, { ...c, children: [
        /* @__PURE__ */ t(F, { ...e?.formLabelProps ?? {}, children: [
          p,
          s && /* @__PURE__ */ r("span", { className: "text-danger text-sm leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ r(P, { ...e?.formControlProps ?? {}, children: /* @__PURE__ */ r(h, { "aria-required": s, disabled: o, ...e?.textareaProps ?? {}, ...f }) }),
        /* @__PURE__ */ r(g, { ...e?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  C as FormTextarea
};
//# sourceMappingURL=formtextarea.es.js.map
