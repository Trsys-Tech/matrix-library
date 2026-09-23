import { jsx as e, jsxs as s } from "react/jsx-runtime";
import { FormField as x, FormItem as P, FormLabel as f, FormControl as F, FormMessage as h } from "./form.es.js";
import { DateRangePicker as b } from "./daterangepicker.es.js";
const D = (l) => {
  const { name: m, control: a, defaultValue: n, disabled: o, readOnly: d, rules: i, shouldUnregister: c, label: p, slotProps: r, required: g, ...u } = l;
  return /* @__PURE__ */ e(
    x,
    {
      control: a,
      name: m,
      defaultValue: n,
      disabled: o,
      rules: i,
      shouldUnregister: c,
      render: ({ field: t }) => /* @__PURE__ */ s(P, { ...u, children: [
        /* @__PURE__ */ s(f, { ...r?.formLabelProps ?? {}, children: [
          p,
          g && /* @__PURE__ */ e("span", { className: "mtx-text-danger mtx-text-sm mtx-leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ e(F, { ...r?.formControlProps ?? {}, children: /* @__PURE__ */ e(
          b,
          {
            ...r?.datepickerProps ?? {},
            selected: t.value,
            onSelect: t.onChange,
            disabled: o || d
          }
        ) }),
        /* @__PURE__ */ e(h, { ...r?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  D as FormDateRangePicker
};
//# sourceMappingURL=formdaterangepicker.es.js.map
