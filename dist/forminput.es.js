import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { FormField as c, FormItem as f, FormLabel as x, FormControl as b, FormMessage as g } from "./form.es.js";
import { TextField as h } from "./textfield.es.js";
const C = (l) => {
  const { name: m, control: n, defaultValue: d, disabled: o, readOnly: i, rules: p, shouldUnregister: a, label: u, slotProps: r, required: s, ...P } = l;
  return /* @__PURE__ */ e(
    c,
    {
      control: n,
      name: m,
      defaultValue: d,
      disabled: o,
      rules: p,
      shouldUnregister: a,
      render: ({ field: F }) => /* @__PURE__ */ t(f, { ...P, children: [
        /* @__PURE__ */ t(x, { ...r?.formLabelProps ?? {}, children: [
          u,
          s && /* @__PURE__ */ e("span", { className: "text-danger text-sm leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ e(b, { ...r?.formControlProps ?? {}, children: /* @__PURE__ */ e(
          h,
          {
            ...r?.textFieldProps ?? {},
            disabled: o || i,
            slotProps: { inputProps: { ...r?.textFieldProps?.slotProps?.inputProps, ...F, "aria-required": s } }
          }
        ) }),
        /* @__PURE__ */ e(g, { ...r?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  C as FormInput
};
//# sourceMappingURL=forminput.es.js.map
