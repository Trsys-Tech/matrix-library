import { jsx as r, jsxs as o } from "react/jsx-runtime";
import { createElement as T } from "react";
import { Spinner as V } from "@trsys-tech/matrix-icons";
import { useController as y } from "react-hook-form";
import { cn as k } from "./utils.es.js";
import { FormField as L, FormItem as j, FormLabel as q, FormControl as M, FormMessage as O } from "./form.es.js";
import { Select as E, SelectTrigger as U, SelectValue as _, SelectContent as w, SelectItem as s } from "./select.es.js";
const K = (b) => {
  const {
    name: c,
    control: i,
    defaultValue: m,
    disabled: t,
    readOnly: P,
    rules: d,
    shouldUnregister: p,
    label: a,
    options: n,
    loading: u,
    loadingText: v,
    emptyOptionsText: S,
    placeholder: C,
    slotProps: e,
    required: g,
    ...x
  } = b, { field: h } = y({ name: c, control: i, rules: d, defaultValue: m, disabled: t, shouldUnregister: p }), F = typeof n[0]?.value == "number", I = (l) => {
    F ? h.onChange(Number(l)) : h.onChange(l);
  };
  return /* @__PURE__ */ r(
    L,
    {
      control: i,
      name: c,
      defaultValue: m,
      disabled: t,
      rules: d,
      shouldUnregister: p,
      render: ({ field: l }) => /* @__PURE__ */ o(j, { ...x, children: [
        /* @__PURE__ */ o(q, { ...e?.formLabelProps ?? {}, children: [
          a,
          g && /* @__PURE__ */ r("span", { className: "text-danger text-sm leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ o(
          E,
          {
            ...e?.selectProps ?? {},
            disabled: t || P,
            onValueChange: I,
            value: l.value !== void 0 ? String(l.value) : void 0,
            children: [
              /* @__PURE__ */ r(M, { children: /* @__PURE__ */ r(
                U,
                {
                  "aria-required": g,
                  disabled: t,
                  ...e?.selectTriggerProps ?? {},
                  className: k("*:truncate [&>span]:inline-block", e?.selectTriggerProps?.className),
                  children: /* @__PURE__ */ r(_, { ...e?.selectValueProps ?? {}, placeholder: C ?? a })
                }
              ) }),
              /* @__PURE__ */ o(w, { ...e?.selectContentProps ?? {}, children: [
                u && /* @__PURE__ */ o(s, { ...e?.selectItemProps ?? {}, value: "-1", disabled: !0, children: [
                  /* @__PURE__ */ r(V, { className: "inline-block mb-0.5" }),
                  " ",
                  v || "Loading..."
                ] }),
                !u && !n.length ? /* @__PURE__ */ r(
                  s,
                  {
                    ...e?.selectItemProps ?? {},
                    value: "8fdcaeb67c8ad943c80fe54c3b1059b700d9254389a38a4a1fc39a6eee728623",
                    disabled: !0,
                    children: S || "No Items"
                  }
                ) : null,
                n?.map((f, N) => /* @__PURE__ */ T(s, { ...e?.selectItemProps ?? {}, value: String(f.value), key: N + "_" + a }, f.label))
              ] })
            ]
          }
        ),
        /* @__PURE__ */ r(O, { ...e?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  K as FormSelect
};
//# sourceMappingURL=formselect.es.js.map
