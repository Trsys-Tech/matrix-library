import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { FormField as P, FormItem as f, FormLabel as F, FormControl as h, FormMessage as b } from "./form.es.js";
import { DateRangePicker as x } from "./daterangepicker.es.js";
const D = (l) => {
  const { name: a, control: n, defaultValue: m, disabled: o, readOnly: d, rules: i, shouldUnregister: c, label: p, slotProps: r, required: g, ...u } = l;
  return /* @__PURE__ */ e(
    P,
    {
      control: n,
      name: a,
      defaultValue: m,
      disabled: o,
      rules: i,
      shouldUnregister: c,
      render: ({ field: s }) => /* @__PURE__ */ t(f, { ...u, children: [
        /* @__PURE__ */ t(F, { ...r?.formLabelProps ?? {}, children: [
          p,
          g && /* @__PURE__ */ e("span", { className: "text-danger text-sm leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ e(h, { ...r?.formControlProps ?? {}, children: /* @__PURE__ */ e(
          x,
          {
            ...r?.datepickerProps ?? {},
            selected: s.value,
            onSelect: s.onChange,
            disabled: o || d
          }
        ) }),
        /* @__PURE__ */ e(b, { ...r?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  D as FormDateRangePicker
};
//# sourceMappingURL=formdaterangepicker.es.js.map
