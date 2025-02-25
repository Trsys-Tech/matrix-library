import { jsx as e, jsxs as m } from "react/jsx-runtime";
import { useController as P } from "react-hook-form";
import { FormField as M, FormItem as S, FormLabel as j, FormControl as q, FormMessage as v } from "./form.es.js";
import { MultiSelect as I } from "./multiselect.es.js";
const O = (u) => {
  const {
    name: t,
    control: n,
    defaultValue: a,
    disabled: r,
    readOnly: c,
    rules: s,
    shouldUnregister: i,
    label: p,
    options: f,
    loading: g,
    loadingText: h,
    placeholder: F,
    slotProps: o,
    required: d,
    ...x
  } = u, { field: b } = P({ name: t, control: n, rules: s, defaultValue: a, disabled: r, shouldUnregister: i }), C = (l) => {
    b.onChange(l);
  };
  return /* @__PURE__ */ e(
    M,
    {
      control: n,
      name: t,
      defaultValue: a,
      disabled: r,
      rules: s,
      shouldUnregister: i,
      render: ({ field: l }) => /* @__PURE__ */ m(S, { ...x, children: [
        /* @__PURE__ */ m(j, { ...o?.formLabelProps ?? {}, children: [
          p,
          d && /* @__PURE__ */ e("span", { className: "text-danger text-sm leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ e(q, { children: /* @__PURE__ */ e(
          I,
          {
            "aria-required": d,
            options: f,
            onValueChange: C,
            placeholder: F,
            value: l.value,
            loading: g,
            loadingText: h,
            disabled: r || c,
            ...o?.multiSelectProps ?? {}
          }
        ) }),
        /* @__PURE__ */ e(v, { ...o?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  O as FormMultiSelect
};
//# sourceMappingURL=formmultiselect.es.js.map
