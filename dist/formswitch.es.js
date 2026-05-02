import { jsx as r, jsxs as d } from "react/jsx-runtime";
import { FormField as g, FormItem as C, FormControl as b, FormLabel as F, FormMessage as P } from "./form.es.js";
import { useController as k } from "react-hook-form";
import { useCallback as N } from "react";
import { cn as j } from "./utils.es.js";
import { Switch as w } from "./switch.es.js";
const v = (p) => {
  const { name: m, control: s, defaultValue: a, disabled: t, readOnly: x, rules: l, shouldUnregister: n, label: f, slotProps: e, required: c, ...h } = p, { field: i } = k({ name: m, control: s, rules: l, defaultValue: a, disabled: t, shouldUnregister: n }), u = N(
    (o) => {
      i.onChange(o);
    },
    [i]
  );
  return /* @__PURE__ */ r(
    g,
    {
      control: s,
      name: m,
      defaultValue: a,
      disabled: t,
      rules: l,
      shouldUnregister: n,
      render: ({ field: o }) => /* @__PURE__ */ d(C, { ...h, className: "mtx-flex mtx-items-center mtx-gap-2 mtx-justify-start mtx-space-y-0", children: [
        /* @__PURE__ */ r(b, { ...e?.formControlProps ?? {}, children: /* @__PURE__ */ r(
          w,
          {
            ...e?.switchProps ?? {},
            ...o,
            checked: o.value,
            onCheckedChange: u,
            "aria-required": c,
            disabled: t || x
          }
        ) }),
        /* @__PURE__ */ d(F, { ...e?.formLabelProps ?? {}, className: j("mtx-text-text", e?.formLabelProps?.className), children: [
          f,
          c && /* @__PURE__ */ r("span", { className: "mtx-text-danger mtx-text-sm mtx-leading-4", children: "*" })
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
