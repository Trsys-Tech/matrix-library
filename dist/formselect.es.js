import { jsx as r, jsxs as t } from "react/jsx-runtime";
import { createElement as T } from "react";
import { Spinner as V } from "@trsys-tech/matrix-icons";
import { useController as y } from "react-hook-form";
import { cn as k } from "./utils.es.js";
import { FormField as L, FormItem as j, FormLabel as q, FormControl as M, FormMessage as O } from "./form.es.js";
import { Select as E, SelectTrigger as U, SelectValue as _, SelectContent as w, SelectItem as s } from "./select.es.js";
const K = (b) => {
  const {
    name: m,
    control: c,
    defaultValue: i,
    disabled: o,
    readOnly: x,
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
  } = b, { field: h } = y({ name: m, control: c, rules: d, defaultValue: i, disabled: o, shouldUnregister: p }), F = typeof n[0]?.value == "number", I = (l) => {
    F ? h.onChange(Number(l)) : h.onChange(l);
  };
  return /* @__PURE__ */ r(
    L,
    {
      control: c,
      name: m,
      defaultValue: i,
      disabled: o,
      rules: d,
      shouldUnregister: p,
      render: ({ field: l }) => /* @__PURE__ */ t(j, { ...C, children: [
        /* @__PURE__ */ t(q, { ...e?.formLabelProps ?? {}, children: [
          a,
          g && /* @__PURE__ */ r("span", { className: "mtx-text-danger mtx-text-sm mtx-leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ t(
          E,
          {
            ...e?.selectProps ?? {},
            disabled: o || x,
            onValueChange: I,
            value: l.value !== void 0 ? String(l.value) : void 0,
            children: [
              /* @__PURE__ */ r(M, { children: /* @__PURE__ */ r(
                U,
                {
                  "aria-required": g,
                  disabled: o,
                  ...e?.selectTriggerProps ?? {},
                  className: k("*:mtx-truncate [&>span]:mtx-inline-block", e?.selectTriggerProps?.className),
                  children: /* @__PURE__ */ r(_, { ...e?.selectValueProps ?? {}, placeholder: S ?? a })
                }
              ) }),
              /* @__PURE__ */ t(w, { ...e?.selectContentProps ?? {}, children: [
                u && /* @__PURE__ */ t(s, { ...e?.selectItemProps ?? {}, value: "-1", disabled: !0, children: [
                  /* @__PURE__ */ r(V, { className: "mtx-inline-block mtx-mb-0.5" }),
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
