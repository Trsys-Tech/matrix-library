import { jsx as r, jsxs as s } from "react/jsx-runtime";
import { FormField as f, FormItem as g, FormLabel as h, FormControl as F, FormMessage as b } from "./form.es.js";
import { TimePicker as C } from "./timepicker.es.js";
const j = (t) => {
  const { name: l, control: n, defaultValue: i, disabled: o, readOnly: a, rules: d, shouldUnregister: p, label: c, slotProps: e, required: u, is24HourMode: x, ...P } = t;
  return /* @__PURE__ */ r(
    f,
    {
      control: n,
      name: l,
      defaultValue: i,
      disabled: o,
      rules: d,
      shouldUnregister: p,
      render: ({ field: m }) => /* @__PURE__ */ s(g, { ...P, children: [
        /* @__PURE__ */ s(h, { ...e?.formLabelProps ?? {}, children: [
          c,
          u && /* @__PURE__ */ r("span", { className: "mtx-text-danger mtx-text-sm mtx-leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ r(F, { ...e?.formControlProps ?? {}, children: /* @__PURE__ */ r(
          C,
          {
            ...e?.timepickerProps ?? {},
            time: m.value,
            onTimeChange: m.onChange,
            disabled: o || a,
            is24HourMode: x
          }
        ) }),
        /* @__PURE__ */ r(b, { ...e?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  j as FormTimePicker
};
//# sourceMappingURL=formtimepicker.es.js.map
