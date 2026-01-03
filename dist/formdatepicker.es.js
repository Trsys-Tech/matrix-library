import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { FormField as f, FormItem as F, FormLabel as g, FormControl as h, FormMessage as b } from "./form.es.js";
import { DatePicker as x } from "./datepicker.es.js";
const D = (l) => {
  const { name: a, control: m, defaultValue: n, disabled: o, readOnly: d, rules: i, shouldUnregister: c, label: p, slotProps: r, required: u, ...P } = l;
  return /* @__PURE__ */ e(
    f,
    {
      control: m,
      name: a,
      defaultValue: n,
      disabled: o,
      rules: i,
      shouldUnregister: c,
      render: ({ field: s }) => /* @__PURE__ */ t(F, { ...P, children: [
        /* @__PURE__ */ t(g, { ...r?.formLabelProps ?? {}, children: [
          p,
          u && /* @__PURE__ */ e("span", { className: "text-danger text-sm leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ e(h, { ...r?.formControlProps ?? {}, children: /* @__PURE__ */ e(x, { ...r?.datepickerProps ?? {}, selected: s.value, onSelect: s.onChange, disabled: o || d }) }),
        /* @__PURE__ */ e(b, { ...r?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  D as FormDatePicker
};
//# sourceMappingURL=formdatepicker.es.js.map
