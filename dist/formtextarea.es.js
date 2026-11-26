import { jsx as r, jsxs as s } from "react/jsx-runtime";
import { FormField as P, FormItem as F, FormLabel as b, FormControl as g, FormMessage as h } from "./form.es.js";
import { Textarea as M } from "./textarea.es.js";
const j = (l) => {
  const { name: m, control: d, defaultValue: n, disabled: o, readOnly: t, voiceMode: i, rules: p, shouldUnregister: x, label: c, slotProps: e, required: a, ...f } = l;
  return /* @__PURE__ */ r(
    P,
    {
      control: d,
      name: m,
      defaultValue: n,
      disabled: o,
      rules: p,
      shouldUnregister: x,
      render: ({ field: u }) => /* @__PURE__ */ s(F, { ...f, children: [
        /* @__PURE__ */ s(b, { ...e?.formLabelProps ?? {}, children: [
          c,
          a && /* @__PURE__ */ r("span", { className: "mtx-text-danger mtx-text-sm mtx-leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ r(g, { ...e?.formControlProps ?? {}, children: /* @__PURE__ */ r(
          M,
          {
            "aria-required": a,
            disabled: o || t,
            ...e?.textareaProps ?? {},
            ...u,
            readOnly: t || e?.textareaProps?.readOnly,
            voiceMode: i ?? e?.textareaProps?.voiceMode
          }
        ) }),
        /* @__PURE__ */ r(h, { ...e?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  j as FormTextarea
};
//# sourceMappingURL=formtextarea.es.js.map
