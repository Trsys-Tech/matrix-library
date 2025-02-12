import { jsx as r, jsxs as d } from "react/jsx-runtime";
import { FormField as x, FormItem as C, FormControl as b, FormLabel as g, FormMessage as k } from "./form.es.js";
import { useController as F } from "react-hook-form";
import { Checkbox as P } from "./checkbox.es.js";
import { useCallback as N } from "react";
import { cn as j } from "./utils.es.js";
const U = (p) => {
  const { name: t, control: a, defaultValue: l, disabled: s, rules: m, shouldUnregister: n, label: f, slotProps: e, required: c, ...h } = p, { field: i } = F({ name: t, control: a, rules: m, defaultValue: l, disabled: s, shouldUnregister: n }), u = N(
    (o) => {
      i.onChange(o);
    },
    [i]
  );
  return /* @__PURE__ */ r(
    x,
    {
      control: a,
      name: t,
      defaultValue: l,
      disabled: s,
      rules: m,
      shouldUnregister: n,
      render: ({ field: o }) => /* @__PURE__ */ d(C, { ...h, className: "flex items-center gap-2 justify-start space-y-0", children: [
        /* @__PURE__ */ r(b, { ...e?.formControlProps ?? {}, children: /* @__PURE__ */ r(
          P,
          {
            ...e?.checkboxProps ?? {},
            ...o,
            checked: o.value,
            onCheckedChange: u,
            "aria-required": c,
            disabled: s
          }
        ) }),
        /* @__PURE__ */ d(g, { ...e?.formLabelProps ?? {}, className: j("text-text", e?.formLabelProps?.className), children: [
          f,
          c && /* @__PURE__ */ r("span", { className: "text-danger text-sm leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ r(k, { ...e?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  U as FormCheckbox
};
//# sourceMappingURL=formcheckbox.es.js.map
