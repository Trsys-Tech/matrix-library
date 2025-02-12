import { jsx as r, jsxs as s } from "react/jsx-runtime";
import { FormField as P, FormItem as f, FormLabel as g, FormControl as h, FormMessage as F } from "./form.es.js";
import { TimePicker as x } from "./timepicker.es.js";
const T = (t) => {
  const { name: n, control: l, defaultValue: a, disabled: o, rules: i, shouldUnregister: d, label: p, slotProps: e, required: c, ...u } = t;
  return /* @__PURE__ */ r(
    P,
    {
      control: l,
      name: n,
      defaultValue: a,
      disabled: o,
      rules: i,
      shouldUnregister: d,
      render: ({ field: m }) => /* @__PURE__ */ s(f, { ...u, children: [
        /* @__PURE__ */ s(g, { ...e?.formLabelProps ?? {}, children: [
          p,
          c && /* @__PURE__ */ r("span", { className: "text-danger text-sm leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ r(h, { ...e?.formControlProps ?? {}, children: /* @__PURE__ */ r(x, { ...e?.datepickerProps ?? {}, time: m.value, onTimeChange: m.onChange, disabled: o }) }),
        /* @__PURE__ */ r(F, { ...e?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  T as FormTimePicker
};
//# sourceMappingURL=formtimepicker.es.js.map
