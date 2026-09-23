import { jsx as o, jsxs as l } from "react/jsx-runtime";
import { Duration as h } from "./duration.es.js";
import { FormField as b, FormItem as g, FormLabel as j, FormControl as q, FormMessage as C } from "./form.es.js";
const M = (n) => {
  const { name: m, control: a, defaultValue: e, disabled: s, readOnly: i, showSeconds: d, rules: p, shouldUnregister: u, label: P, slotProps: r, required: t, ...c } = n;
  return /* @__PURE__ */ o(
    b,
    {
      control: a,
      name: m,
      defaultValue: e,
      disabled: s,
      rules: p,
      shouldUnregister: u,
      render: ({ field: { onChange: f, value: x, ...F } }) => /* @__PURE__ */ l(g, { ...c, children: [
        /* @__PURE__ */ l(j, { ...r?.formLabelProps ?? {}, children: [
          P,
          t && /* @__PURE__ */ o("span", { className: "mtx-text-danger mtx-text-sm mtx-leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ o(q, { ...r?.formControlProps ?? {}, children: /* @__PURE__ */ o(
          h,
          {
            ...r?.durationProps ?? {},
            disabled: s || i,
            value: x,
            defaultValue: e,
            showSeconds: d,
            onChange: f,
            slotProps: { inputProps: { ...r?.durationProps?.slotProps?.inputProps, ...F, "aria-required": t } }
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
