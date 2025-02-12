import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { FormField as F, FormItem as c, FormLabel as f, FormControl as x, FormMessage as g } from "./form.es.js";
import { TextField as h } from "./textfield.es.js";
const q = (l) => {
  const { name: m, control: n, defaultValue: i, disabled: o, rules: p, shouldUnregister: d, label: a, slotProps: r, required: s, ...u } = l;
  return /* @__PURE__ */ e(
    F,
    {
      control: n,
      name: m,
      defaultValue: i,
      disabled: o,
      rules: p,
      shouldUnregister: d,
      render: ({ field: P }) => /* @__PURE__ */ t(c, { ...u, children: [
        /* @__PURE__ */ t(f, { ...r?.formLabelProps ?? {}, children: [
          a,
          s && /* @__PURE__ */ e("span", { className: "text-danger text-sm leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ e(x, { ...r?.formControlProps ?? {}, children: /* @__PURE__ */ e(
          h,
          {
            ...r?.textFieldProps ?? {},
            slotProps: { inputProps: { ...r?.textFieldProps?.slotProps?.inputProps, ...P, disabled: o, "aria-required": s } }
          }
        ) }),
        /* @__PURE__ */ e(g, { ...r?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  q as FormInput
};
//# sourceMappingURL=forminput.es.js.map
