import { jsx as o, jsxs as l } from "react/jsx-runtime";
import { Duration as b } from "./duration.es.js";
import { FormField as g, FormItem as x, FormLabel as j, FormControl as q, FormMessage as C } from "./form.es.js";
const M = (n) => {
  const { name: a, control: i, defaultValue: e, disabled: s, readOnly: d, showSeconds: m, rules: p, shouldUnregister: u, label: P, slotProps: r, required: t, ...c } = n;
  return /* @__PURE__ */ o(
    g,
    {
      control: i,
      name: a,
      defaultValue: e,
      disabled: s,
      rules: p,
      shouldUnregister: u,
      render: ({ field: { onChange: f, value: F, ...h } }) => /* @__PURE__ */ l(x, { ...c, children: [
        /* @__PURE__ */ l(j, { ...r?.formLabelProps ?? {}, children: [
          P,
          t && /* @__PURE__ */ o("span", { className: "text-danger text-sm leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ o(q, { ...r?.formControlProps ?? {}, children: /* @__PURE__ */ o(
          b,
          {
            ...r?.durationProps ?? {},
            disabled: s || d,
            value: F,
            defaultValue: e,
            showSeconds: m,
            onChange: f,
            slotProps: { inputProps: { ...r?.durationProps?.slotProps?.inputProps, ...h, "aria-required": t } }
          }
        ) }),
        /* @__PURE__ */ o(C, { ...r?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  M as FormDuration
};
//# sourceMappingURL=formduration.es.js.map
