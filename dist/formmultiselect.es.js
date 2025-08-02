import { jsx as e, jsxs as a } from "react/jsx-runtime";
import { FormField as f, FormItem as M, FormLabel as P, FormControl as S, FormMessage as C } from "./form.es.js";
import { MultiSelect as j } from "./multiselect.es.js";
const I = (n) => {
  const {
    name: s,
    control: m,
    defaultValue: d,
    disabled: l,
    readOnly: i,
    rules: u,
    shouldUnregister: c,
    label: p,
    options: g,
    loading: h,
    loadingText: F,
    placeholder: x,
    slotProps: r,
    required: t,
    ...b
  } = n;
  return /* @__PURE__ */ e(
    f,
    {
      control: m,
      name: s,
      defaultValue: d,
      disabled: l,
      rules: u,
      shouldUnregister: c,
      render: ({ field: o }) => /* @__PURE__ */ a(M, { ...b, children: [
        /* @__PURE__ */ a(P, { ...r?.formLabelProps ?? {}, children: [
          p,
          t && /* @__PURE__ */ e("span", { className: "text-danger text-sm leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ e(S, { children: /* @__PURE__ */ e(
          j,
          {
            "aria-required": t,
            options: g,
            onValueChange: o.onChange,
            onBlur: o.onBlur,
            placeholder: x,
            value: o.value,
            loading: h,
            loadingText: F,
            disabled: l || i,
            ...r?.multiSelectProps ?? {}
          }
        ) }),
        /* @__PURE__ */ e(C, { ...r?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  I as FormMultiSelect
};
//# sourceMappingURL=formmultiselect.es.js.map
