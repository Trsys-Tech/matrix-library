import { jsx as o, jsxs as s } from "react/jsx-runtime";
import { FormField as P, FormItem as I, FormLabel as j, FormControl as v, FormMessage as y } from "./form.es.js";
import { Combobox as L } from "./combobox.es.js";
const V = (n) => {
  const {
    name: a,
    control: t,
    defaultValue: m,
    disabled: r,
    readOnly: d,
    rules: i,
    shouldUnregister: p,
    label: b,
    options: c,
    loading: u,
    loadingText: h,
    emptyOptionsText: x,
    showSearchInput: g,
    placeholder: F,
    slotProps: e,
    required: f,
    ...C
  } = n;
  return /* @__PURE__ */ o(
    P,
    {
      control: t,
      name: a,
      defaultValue: m,
      disabled: r,
      rules: i,
      shouldUnregister: p,
      render: ({ field: l }) => /* @__PURE__ */ s(I, { ...C, children: [
        /* @__PURE__ */ s(j, { ...e?.formLabelProps ?? {}, children: [
          b,
          f && /* @__PURE__ */ o("span", { className: "text-danger text-sm leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ o(v, { children: /* @__PURE__ */ o(
          L,
          {
            options: c,
            value: l.value,
            onValueChange: l.onChange,
            loading: u,
            loadingText: h,
            emptyOptionsText: x,
            placeholder: F,
            disabled: r || d,
            showSearchInput: g,
            ...e?.comboboxProps ?? {}
          }
        ) }),
        /* @__PURE__ */ o(y, { ...e?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  V as FormCombobox
};
//# sourceMappingURL=formcombobox.es.js.map
