import { jsx as e, jsxs as a } from "react/jsx-runtime";
import { FormField as I, FormItem as j, FormLabel as v, FormControl as y, FormMessage as L } from "./form.es.js";
import { Combobox as M } from "./combobox.es.js";
const q = (s) => {
  const {
    name: t,
    control: m,
    clearable: n = !1,
    defaultValue: d,
    disabled: r,
    readOnly: i,
    rules: p,
    shouldUnregister: x,
    label: b,
    options: c,
    loading: u,
    loadingText: h,
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
      control: m,
      name: t,
      defaultValue: d,
      disabled: r,
      rules: p,
      shouldUnregister: x,
      render: ({ field: l }) => /* @__PURE__ */ a(j, { ...P, children: [
        /* @__PURE__ */ a(v, { ...o?.formLabelProps ?? {}, children: [
          b,
          C && /* @__PURE__ */ e("span", { className: "mtx-text-danger mtx-text-sm mtx-leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ e(y, { children: /* @__PURE__ */ e(
          M,
          {
            options: c,
            value: l.value,
            onValueChange: l.onChange,
            loading: u,
            loadingText: h,
            emptyOptionsText: g,
            placeholder: F,
            disabled: r || i,
            showSearchInput: f,
            clearable: n,
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
