import { jsx as r, jsxs as d } from "react/jsx-runtime";
import { FormField as b, FormItem as f, FormLabel as g, FormControl as h, FormMessage as M } from "./form.es.js";
import { TextField as v } from "./textfield.es.js";
const C = (i) => {
  const { name: m, control: n, defaultValue: a, disabled: o, readOnly: p, voiceMode: c, rules: x, shouldUnregister: P, label: u, slotProps: e, required: s, ...F } = i;
  return /* @__PURE__ */ r(
    b,
    {
      control: n,
      name: m,
      defaultValue: a,
      disabled: o,
      rules: x,
      shouldUnregister: P,
      render: ({ field: t }) => {
        const l = t.disabled || o || p;
        return /* @__PURE__ */ d(f, { ...F, children: [
          /* @__PURE__ */ d(g, { ...e?.formLabelProps ?? {}, children: [
            u,
            s && /* @__PURE__ */ r("span", { className: "mtx-text-danger mtx-text-sm mtx-leading-4", children: "*" })
          ] }),
          /* @__PURE__ */ r(h, { ...e?.formControlProps ?? {}, children: /* @__PURE__ */ r(
            v,
            {
              ...e?.textFieldProps ?? {},
              disabled: l,
              voiceMode: c ?? e?.textFieldProps?.voiceMode,
              slotProps: {
                inputProps: {
                  ...e?.textFieldProps?.slotProps?.inputProps,
                  ...t,
                  "aria-required": s,
                  disabled: l
                }
              }
            }
          ) }),
          /* @__PURE__ */ r(M, { ...e?.formMessageProps ?? {} })
        ] });
      }
    }
  );
};
export {
  C as FormInput
};
//# sourceMappingURL=forminput.es.js.map
