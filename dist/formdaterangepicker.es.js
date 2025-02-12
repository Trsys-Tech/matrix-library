import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { FormField as u, FormItem as P, FormLabel as f, FormControl as F, FormMessage as h } from "./form.es.js";
import { DateRangePicker as x } from "./daterangepicker.es.js";
const j = (l) => {
  const { name: n, control: a, defaultValue: m, disabled: o, rules: d, shouldUnregister: i, label: c, slotProps: r, required: p, ...g } = l;
  return /* @__PURE__ */ e(
    u,
    {
      control: a,
      name: n,
      defaultValue: m,
      disabled: o,
      rules: d,
      shouldUnregister: i,
      render: ({ field: s }) => /* @__PURE__ */ t(P, { ...g, children: [
        /* @__PURE__ */ t(f, { ...r?.formLabelProps ?? {}, children: [
          c,
          p && /* @__PURE__ */ e("span", { className: "text-danger text-sm leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ e(F, { ...r?.formControlProps ?? {}, children: /* @__PURE__ */ e(x, { ...r?.datepickerProps ?? {}, selected: s.value, onSelect: s.onChange, disabled: o }) }),
        /* @__PURE__ */ e(h, { ...r?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  j as FormDateRangePicker
};
//# sourceMappingURL=formdaterangepicker.es.js.map
