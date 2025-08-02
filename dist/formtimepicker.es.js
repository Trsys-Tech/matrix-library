import { jsx as r, jsxs as s } from "react/jsx-runtime";
import { FormField as f, FormItem as g, FormLabel as h, FormControl as F, FormMessage as b } from "./form.es.js";
import { TimePicker as x } from "./timepicker.es.js";
const j = (l) => {
  const { name: n, control: t, defaultValue: a, disabled: o, readOnly: i, rules: d, shouldUnregister: p, label: c, slotProps: e, required: u, ...P } = l;
  return /* @__PURE__ */ r(
    f,
    {
      control: t,
      name: n,
      defaultValue: a,
      disabled: o,
      rules: d,
      shouldUnregister: p,
      render: ({ field: m }) => /* @__PURE__ */ s(g, { ...P, children: [
        /* @__PURE__ */ s(h, { ...e?.formLabelProps ?? {}, children: [
          c,
          u && /* @__PURE__ */ r("span", { className: "text-danger text-sm leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ r(F, { ...e?.formControlProps ?? {}, children: /* @__PURE__ */ r(x, { ...e?.datepickerProps ?? {}, time: m.value, onTimeChange: m.onChange, disabled: o || i }) }),
        /* @__PURE__ */ r(b, { ...e?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  j as FormTimePicker
};
//# sourceMappingURL=formtimepicker.es.js.map
