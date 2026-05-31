import { jsx as r, jsxs as s } from "react/jsx-runtime";
import { FormField as P, FormItem as F, FormLabel as g, FormControl as h, FormMessage as b } from "./form.es.js";
import { DatePicker as k } from "./datepicker.es.js";
const I = (m) => {
  const { name: l, control: a, defaultValue: n, disabled: o, readOnly: d, rules: i, shouldUnregister: c, label: p, slotProps: e, required: f, formatStr: u, ...x } = m;
  return /* @__PURE__ */ r(
    P,
    {
      control: a,
      name: l,
      defaultValue: n,
      disabled: o,
      rules: i,
      shouldUnregister: c,
      render: ({ field: t }) => /* @__PURE__ */ s(F, { ...x, children: [
        /* @__PURE__ */ s(g, { ...e?.formLabelProps ?? {}, children: [
          p,
          f && /* @__PURE__ */ r("span", { className: "mtx-text-danger mtx-text-sm mtx-leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ r(h, { ...e?.formControlProps ?? {}, children: /* @__PURE__ */ r(
          k,
          {
            formatStr: u,
            ...e?.datepickerProps ?? {},
            selected: t.value,
            onSelect: t.onChange,
            disabled: o || d
          }
        ) }),
        /* @__PURE__ */ r(b, { ...e?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  I as FormDatePicker
};
//# sourceMappingURL=formdatepicker.es.js.map
