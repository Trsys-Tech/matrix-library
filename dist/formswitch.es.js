import { jsx as r, jsxs as d } from "react/jsx-runtime";
import { FormField as C, FormItem as x, FormControl as b, FormLabel as F, FormMessage as P } from "./form.es.js";
import { useController as k } from "react-hook-form";
import { useCallback as N } from "react";
import { cn as j } from "./utils.es.js";
import { Switch as w } from "./switch.es.js";
const v = (p) => {
  const { name: t, control: a, defaultValue: l, disabled: s, readOnly: f, rules: m, shouldUnregister: n, label: h, slotProps: e, required: c, ...u } = p, { field: i } = k({ name: t, control: a, rules: m, defaultValue: l, disabled: s, shouldUnregister: n }), g = N(
    (o) => {
      i.onChange(o);
    },
    [i]
  );
  return /* @__PURE__ */ r(
    C,
    {
      control: a,
      name: t,
      defaultValue: l,
      disabled: s,
      rules: m,
      shouldUnregister: n,
      render: ({ field: o }) => /* @__PURE__ */ d(x, { ...u, className: "flex items-center gap-2 justify-start space-y-0", children: [
        /* @__PURE__ */ r(b, { ...e?.formControlProps ?? {}, children: /* @__PURE__ */ r(
          w,
          {
            ...e?.switchProps ?? {},
            ...o,
            checked: o.value,
            onCheckedChange: g,
            "aria-required": c,
            disabled: s || f
          }
        ) }),
        /* @__PURE__ */ d(F, { ...e?.formLabelProps ?? {}, className: j("text-text", e?.formLabelProps?.className), children: [
          h,
          c && /* @__PURE__ */ r("span", { className: "text-danger text-sm leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ r(P, { ...e?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  v as FormSwitch
};
//# sourceMappingURL=formswitch.es.js.map
