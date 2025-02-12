import { jsx as r, jsxs as o } from "react/jsx-runtime";
import { createElement as N } from "react";
import { Spinner as T } from "@trsys-tech/matrix-icons";
import { useController as V } from "react-hook-form";
import { cn as k } from "./utils.es.js";
import { FormField as y, FormItem as L, FormLabel as j, FormControl as q, FormMessage as M } from "./form.es.js";
import { Select as E, SelectTrigger as O, SelectValue as U, SelectContent as _, SelectItem as s } from "./select.es.js";
const J = (b) => {
  const {
    name: c,
    control: i,
    defaultValue: m,
    disabled: t,
    rules: d,
    shouldUnregister: p,
    label: a,
    options: n,
    loading: u,
    loadingText: P,
    emptyOptionsText: v,
    placeholder: S,
    slotProps: e,
    required: g,
    ...C
  } = b, { field: h } = V({ name: c, control: i, rules: d, defaultValue: m, disabled: t, shouldUnregister: p }), x = typeof n[0]?.value == "number", F = (l) => {
    x ? h.onChange(Number(l)) : h.onChange(l);
  };
  return /* @__PURE__ */ r(
    y,
    {
      control: i,
      name: c,
      defaultValue: m,
      disabled: t,
      rules: d,
      shouldUnregister: p,
      render: ({ field: l }) => /* @__PURE__ */ o(L, { ...C, children: [
        /* @__PURE__ */ o(j, { ...e?.formLabelProps ?? {}, children: [
          a,
          g && /* @__PURE__ */ r("span", { className: "text-danger text-sm leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ o(
          E,
          {
            ...e?.selectProps ?? {},
            disabled: t,
            onValueChange: F,
            value: l.value !== void 0 ? String(l.value) : void 0,
            children: [
              /* @__PURE__ */ r(q, { children: /* @__PURE__ */ r(
                O,
                {
                  "aria-required": g,
                  disabled: t,
                  ...e?.selectTriggerProps ?? {},
                  className: k("*:truncate [&>span]:inline-block", e?.selectTriggerProps?.className),
                  children: /* @__PURE__ */ r(U, { ...e?.selectValueProps ?? {}, placeholder: S ?? a })
                }
              ) }),
              /* @__PURE__ */ o(_, { ...e?.selectContentProps ?? {}, children: [
                u && /* @__PURE__ */ o(s, { ...e?.selectItemProps ?? {}, value: "-1", disabled: !0, children: [
                  /* @__PURE__ */ r(T, { className: "inline-block mb-0.5" }),
                  " ",
                  P || "Loading..."
                ] }),
                !u && !n.length ? /* @__PURE__ */ r(
                  s,
                  {
                    ...e?.selectItemProps ?? {},
                    value: "8fdcaeb67c8ad943c80fe54c3b1059b700d9254389a38a4a1fc39a6eee728623",
                    disabled: !0,
                    children: v || "No Items"
                  }
                ) : null,
                n?.map((f, I) => /* @__PURE__ */ N(s, { ...e?.selectItemProps ?? {}, value: String(f.value), key: I + "_" + a }, f.label))
              ] })
            ]
          }
        ),
        /* @__PURE__ */ r(M, { ...e?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  J as FormSelect
};
//# sourceMappingURL=formselect.es.js.map
