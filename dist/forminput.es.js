import { jsx as e, jsxs as l } from "react/jsx-runtime";
import { FormField as F, FormItem as c, FormLabel as f, FormControl as b, FormMessage as g } from "./form.es.js";
import { TextField as h } from "./textfield.es.js";
const C = (m) => {
  const { name: d, control: i, defaultValue: n, disabled: o, readOnly: s, rules: a, shouldUnregister: p, label: u, slotProps: r, required: t, ...x } = m;
  return /* @__PURE__ */ e(
    F,
    {
      control: i,
      name: d,
      defaultValue: n,
      disabled: o,
      rules: a,
      shouldUnregister: p,
      render: ({ field: P }) => /* @__PURE__ */ l(c, { ...x, children: [
        /* @__PURE__ */ l(f, { ...r?.formLabelProps ?? {}, children: [
          u,
          t && /* @__PURE__ */ e("span", { className: "mtx-text-danger mtx-text-sm mtx-leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ e(b, { ...r?.formControlProps ?? {}, children: /* @__PURE__ */ e(
          h,
          {
            ...r?.textFieldProps ?? {},
            disabled: o || s,
            slotProps: {
              inputProps: {
                ...r?.textFieldProps?.slotProps?.inputProps,
                ...P,
                "aria-required": t,
                disabled: o || s
              }
            }
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
