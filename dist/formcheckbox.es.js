import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { FormField as C, FormItem as b, FormControl as g, FormLabel as k, FormMessage as F } from "./form.es.js";
import { useController as P } from "react-hook-form";
import { Checkbox as N } from "./checkbox.es.js";
import { useCallback as j } from "react";
import { cn as y } from "./utils.es.js";
const U = (x) => {
  const { name: m, control: s, defaultValue: a, disabled: t, readOnly: p, rules: l, shouldUnregister: n, label: f, slotProps: e, required: c, ...h } = x, { field: d } = P({ name: m, control: s, rules: l, defaultValue: a, disabled: t, shouldUnregister: n }), u = j(
    (o) => {
      d.onChange(o);
    },
    [d]
  );
  return /* @__PURE__ */ r(
    C,
    {
      control: s,
      name: m,
      defaultValue: a,
      disabled: t,
      rules: l,
      shouldUnregister: n,
      render: ({ field: o }) => /* @__PURE__ */ i(b, { ...h, className: "mtx-flex mtx-items-center mtx-gap-2 mtx-justify-start mtx-space-y-0", children: [
        /* @__PURE__ */ r(g, { ...e?.formControlProps ?? {}, children: /* @__PURE__ */ r(
          N,
          {
            ...e?.checkboxProps ?? {},
            ...o,
            checked: o.value,
            onCheckedChange: u,
            "aria-required": c,
            disabled: t || p
          }
        ) }),
        /* @__PURE__ */ i(k, { ...e?.formLabelProps ?? {}, className: y("mtx-text-text", e?.formLabelProps?.className), children: [
          f,
          c && /* @__PURE__ */ r("span", { className: "mtx-text-danger mtx-text-sm mtx-leading-4", children: "*" })
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
