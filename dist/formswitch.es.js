import { jsx as r, jsxs as d } from "react/jsx-runtime";
import { FormField as g, FormItem as C, FormControl as x, FormLabel as F, FormMessage as P } from "./form.es.js";
import { useController as b } from "react-hook-form";
import { useCallback as k } from "react";
import { cn as N } from "./utils.es.js";
import { Switch as j } from "./switch.es.js";
const S = (p) => {
  const { name: t, control: a, defaultValue: l, disabled: s, rules: m, shouldUnregister: n, label: f, slotProps: e, required: c, ...h } = p, { field: i } = b({ name: t, control: a, rules: m, defaultValue: l, disabled: s, shouldUnregister: n }), u = k(
    (o) => {
      i.onChange(o);
    },
    [i]
  );
  return /* @__PURE__ */ r(
    g,
    {
      control: a,
      name: t,
      defaultValue: l,
      disabled: s,
      rules: m,
      shouldUnregister: n,
      render: ({ field: o }) => /* @__PURE__ */ d(C, { ...h, className: "flex items-center gap-2 justify-start space-y-0", children: [
        /* @__PURE__ */ r(x, { ...e?.formControlProps ?? {}, children: /* @__PURE__ */ r(
          j,
          {
            ...e?.switchProps ?? {},
            ...o,
            checked: o.value,
            onCheckedChange: u,
            "aria-required": c,
            disabled: s
          }
        ) }),
        /* @__PURE__ */ d(F, { ...e?.formLabelProps ?? {}, className: N("text-text", e?.formLabelProps?.className), children: [
          f,
          c && /* @__PURE__ */ r("span", { className: "text-danger text-sm leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ r(P, { ...e?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  S as FormSwitch
};
//# sourceMappingURL=formswitch.es.js.map
