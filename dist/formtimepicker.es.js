import { jsx as r, jsxs as s } from "react/jsx-runtime";
import { FormField as P, FormItem as f, FormLabel as g, FormControl as h, FormMessage as F } from "./form.es.js";
import { TimePicker as b } from "./timepicker.es.js";
const j = (t) => {
  const { name: l, control: n, defaultValue: a, disabled: o, readOnly: i, rules: d, shouldUnregister: p, label: c, slotProps: e, required: u, ...x } = t;
  return /* @__PURE__ */ r(
    P,
    {
      control: n,
      name: l,
      defaultValue: a,
      disabled: o,
      rules: d,
      shouldUnregister: p,
      render: ({ field: m }) => /* @__PURE__ */ s(f, { ...x, children: [
        /* @__PURE__ */ s(g, { ...e?.formLabelProps ?? {}, children: [
          c,
          u && /* @__PURE__ */ r("span", { className: "mtx-text-danger mtx-text-sm mtx-leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ r(h, { ...e?.formControlProps ?? {}, children: /* @__PURE__ */ r(b, { ...e?.datepickerProps ?? {}, time: m.value, onTimeChange: m.onChange, disabled: o || i }) }),
        /* @__PURE__ */ r(F, { ...e?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  j as FormTimePicker
};
//# sourceMappingURL=formtimepicker.es.js.map
