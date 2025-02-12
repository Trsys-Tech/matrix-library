import { jsx as e, jsxs as n } from "react/jsx-runtime";
import { FormField as f, FormItem as C, FormLabel as P, FormControl as j, FormMessage as v } from "./form.es.js";
import { Combobox as I } from "./combobox.es.js";
const V = (s) => {
  const {
    name: t,
    control: m,
    defaultValue: a,
    disabled: o,
    rules: d,
    shouldUnregister: i,
    label: p,
    options: u,
    loading: c,
    loadingText: g,
    emptyOptionsText: x,
    placeholder: b,
    slotProps: r,
    required: h,
    ...F
  } = s;
  return /* @__PURE__ */ e(
    f,
    {
      control: m,
      name: t,
      defaultValue: a,
      disabled: o,
      rules: d,
      shouldUnregister: i,
      render: ({ field: l }) => /* @__PURE__ */ n(C, { ...F, children: [
        /* @__PURE__ */ n(P, { ...r?.formLabelProps ?? {}, children: [
          p,
          h && /* @__PURE__ */ e("span", { className: "text-danger text-sm leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ e(j, { children: /* @__PURE__ */ e(
          I,
          {
            options: u,
            value: l.value,
            onValueChange: l.onChange,
            loading: c,
            loadingText: g,
            emptyOptionsText: x,
            placeholder: b,
            disabled: o
          }
        ) }),
        /* @__PURE__ */ e(v, { ...r?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  V as FormCombobox
};
//# sourceMappingURL=formcombobox.es.js.map
