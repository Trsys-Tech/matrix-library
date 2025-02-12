import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { FormField as P, FormItem as f, FormLabel as F, FormControl as g, FormMessage as h } from "./form.es.js";
import { DatePicker as x } from "./datepicker.es.js";
const j = (l) => {
  const { name: m, control: n, defaultValue: a, disabled: o, rules: d, shouldUnregister: i, label: c, slotProps: r, required: p, ...u } = l;
  return /* @__PURE__ */ e(
    P,
    {
      control: n,
      name: m,
      defaultValue: a,
      disabled: o,
      rules: d,
      shouldUnregister: i,
      render: ({ field: s }) => /* @__PURE__ */ t(f, { ...u, children: [
        /* @__PURE__ */ t(F, { ...r?.formLabelProps ?? {}, children: [
          c,
          p && /* @__PURE__ */ e("span", { className: "text-danger text-sm leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ e(g, { ...r?.formControlProps ?? {}, children: /* @__PURE__ */ e(x, { ...r?.datepickerProps ?? {}, selected: s.value, onSelect: s.onChange, disabled: o }) }),
        /* @__PURE__ */ e(h, { ...r?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  j as FormDatePicker
};
//# sourceMappingURL=formdatepicker.es.js.map
