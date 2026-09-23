import { jsx as r, jsxs as s } from "react/jsx-runtime";
import { FormField as u, FormItem as F, FormLabel as P, FormControl as b, FormMessage as g } from "./form.es.js";
import { Textarea as h } from "./textarea.es.js";
const I = (a) => {
  const { name: m, control: l, defaultValue: n, disabled: o, readOnly: d, rules: i, shouldUnregister: p, label: x, slotProps: e, required: t, ...c } = a;
  return /* @__PURE__ */ r(
    u,
    {
      control: l,
      name: m,
      defaultValue: n,
      disabled: o,
      rules: i,
      shouldUnregister: p,
      render: ({ field: f }) => /* @__PURE__ */ s(F, { ...c, children: [
        /* @__PURE__ */ s(P, { ...e?.formLabelProps ?? {}, children: [
          x,
          t && /* @__PURE__ */ r("span", { className: "mtx-text-danger mtx-text-sm mtx-leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ r(b, { ...e?.formControlProps ?? {}, children: /* @__PURE__ */ r(h, { "aria-required": t, disabled: o || d, ...e?.textareaProps ?? {}, ...f }) }),
        /* @__PURE__ */ r(g, { ...e?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  I as FormTextarea
};
//# sourceMappingURL=formtextarea.es.js.map
