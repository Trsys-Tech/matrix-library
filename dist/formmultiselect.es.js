import { jsx as e, jsxs as d } from "react/jsx-runtime";
import { useController as P } from "react-hook-form";
import { FormField as b, FormItem as M, FormLabel as S, FormControl as j, FormMessage as q } from "./form.es.js";
import { MultiSelect as v } from "./multiselect.es.js";
const T = (u) => {
  const {
    name: t,
    control: n,
    defaultValue: s,
    disabled: r,
    rules: a,
    shouldUnregister: i,
    label: c,
    options: p,
    loading: f,
    loadingText: g,
    placeholder: h,
    slotProps: o,
    required: m,
    ...F
  } = u, { field: x } = P({ name: t, control: n, rules: a, defaultValue: s, disabled: r, shouldUnregister: i }), C = (l) => {
    x.onChange(l);
  };
  return /* @__PURE__ */ e(
    b,
    {
      control: n,
      name: t,
      defaultValue: s,
      disabled: r,
      rules: a,
      shouldUnregister: i,
      render: ({ field: l }) => /* @__PURE__ */ d(M, { ...F, children: [
        /* @__PURE__ */ d(S, { ...o?.formLabelProps ?? {}, children: [
          c,
          m && /* @__PURE__ */ e("span", { className: "text-danger text-sm leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ e(j, { children: /* @__PURE__ */ e(
          v,
          {
            "aria-required": m,
            options: p,
            onValueChange: C,
            placeholder: h,
            value: l.value,
            loading: f,
            loadingText: g,
            disabled: r,
            ...o?.multiSelectProps ?? {}
          }
        ) }),
        /* @__PURE__ */ e(q, { ...o?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  T as FormMultiSelect
};
//# sourceMappingURL=formmultiselect.es.js.map
