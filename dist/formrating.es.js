import { jsx as r, jsxs as n } from "react/jsx-runtime";
import { Star as F } from "@trsys-tech/matrix-icons";
import { Rating as x } from "./rating.es.js";
import { FormField as P, FormItem as b, FormLabel as C, FormControl as I, FormMessage as j } from "./form.es.js";
const V = (s) => {
  const {
    name: t,
    control: l,
    defaultValue: m,
    disabled: o,
    readOnly: i,
    rules: d,
    shouldUnregister: p,
    label: g,
    slotProps: e,
    required: u,
    Icon: c = F,
    max: f = 5,
    ...h
  } = s;
  return /* @__PURE__ */ r(
    P,
    {
      control: l,
      name: t,
      defaultValue: m,
      disabled: o,
      rules: d,
      shouldUnregister: p,
      render: ({ field: a }) => /* @__PURE__ */ n(b, { ...h, children: [
        /* @__PURE__ */ n(C, { ...e?.formLabelProps ?? {}, children: [
          g,
          u && /* @__PURE__ */ r("span", { className: "text-danger text-sm leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ r(I, { ...e?.formControlProps ?? {}, children: /* @__PURE__ */ r(
          x,
          {
            ...e?.ratingProps ?? {},
            value: a.value,
            max: f,
            Icon: c,
            onValueChange: a.onChange,
            disabled: o || i
          }
        ) }),
        /* @__PURE__ */ r(j, { ...e?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  V as FormRating
};
//# sourceMappingURL=formrating.es.js.map
