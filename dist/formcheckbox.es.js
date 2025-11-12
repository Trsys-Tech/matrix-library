import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { FormField as C, FormItem as b, FormControl as g, FormLabel as k, FormMessage as F } from "./form.es.js";
import { useController as P } from "react-hook-form";
import { Checkbox as N } from "./checkbox.es.js";
import { useCallback as j } from "react";
import { cn as y } from "./utils.es.js";
const U = (p) => {
  const { name: a, control: t, defaultValue: l, disabled: s, readOnly: f, rules: m, shouldUnregister: n, label: h, slotProps: e, required: c, ...u } = p, { field: d } = P({ name: a, control: t, rules: m, defaultValue: l, disabled: s, shouldUnregister: n }), x = j(
    (o) => {
      d.onChange(o);
    },
    [d]
  );
  return /* @__PURE__ */ r(
    C,
    {
      control: t,
      name: a,
      defaultValue: l,
      disabled: s,
      rules: m,
      shouldUnregister: n,
      render: ({ field: o }) => /* @__PURE__ */ i(b, { ...u, className: "flex items-center gap-2 justify-start space-y-0", children: [
        /* @__PURE__ */ r(g, { ...e?.formControlProps ?? {}, children: /* @__PURE__ */ r(
          N,
          {
            ...e?.checkboxProps ?? {},
            ...o,
            checked: o.value,
            onCheckedChange: x,
            "aria-required": c,
            disabled: s || f
          }
        ) }),
        /* @__PURE__ */ i(k, { ...e?.formLabelProps ?? {}, className: y("text-text", e?.formLabelProps?.className), children: [
          h,
          c && /* @__PURE__ */ r("span", { className: "text-danger text-sm leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ r(F, { ...e?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  U as FormCheckbox
};
//# sourceMappingURL=formcheckbox.es.js.map
