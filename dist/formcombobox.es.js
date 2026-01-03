import { jsx as e, jsxs as a } from "react/jsx-runtime";
import { FormField as I, FormItem as j, FormLabel as v, FormControl as y, FormMessage as L } from "./form.es.js";
import { Combobox as M } from "./combobox.es.js";
const q = (s) => {
  const {
    name: n,
    control: t,
    clearable: m = !1,
    defaultValue: d,
    disabled: r,
    readOnly: i,
    rules: p,
    shouldUnregister: b,
    label: c,
    options: u,
    loading: h,
    loadingText: x,
    emptyOptionsText: g,
    showSearchInput: f,
    placeholder: F,
    slotProps: o,
    required: C,
    ...P
  } = s;
  return /* @__PURE__ */ e(
    I,
    {
      control: t,
      name: n,
      defaultValue: d,
      disabled: r,
      rules: p,
      shouldUnregister: b,
      render: ({ field: l }) => /* @__PURE__ */ a(j, { ...P, children: [
        /* @__PURE__ */ a(v, { ...o?.formLabelProps ?? {}, children: [
          c,
          C && /* @__PURE__ */ e("span", { className: "text-danger text-sm leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ e(y, { children: /* @__PURE__ */ e(
          M,
          {
            options: u,
            value: l.value,
            onValueChange: l.onChange,
            loading: h,
            loadingText: x,
            emptyOptionsText: g,
            placeholder: F,
            disabled: r || i,
            showSearchInput: f,
            clearable: m,
            ...o?.comboboxProps ?? {}
          }
        ) }),
        /* @__PURE__ */ e(L, { ...o?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  q as FormCombobox
};
//# sourceMappingURL=formcombobox.es.js.map
