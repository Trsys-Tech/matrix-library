import { jsx as r, jsxs as t } from "react/jsx-runtime";
import { Star as h } from "@trsys-tech/matrix-icons";
import { Rating as F } from "./rating.es.js";
import { FormField as x, FormItem as P, FormLabel as b, FormControl as C, FormMessage as I } from "./form.es.js";
const R = (a) => {
  const {
    name: m,
    control: s,
    defaultValue: l,
    disabled: e,
    rules: i,
    shouldUnregister: d,
    label: p,
    slotProps: o,
    required: g,
    Icon: u = h,
    max: c = 5,
    ...f
  } = a;
  return /* @__PURE__ */ r(
    x,
    {
      control: s,
      name: m,
      defaultValue: l,
      disabled: e,
      rules: i,
      shouldUnregister: d,
      render: ({ field: n }) => /* @__PURE__ */ t(P, { ...f, children: [
        /* @__PURE__ */ t(b, { ...o?.formLabelProps ?? {}, children: [
          p,
          g && /* @__PURE__ */ r("span", { className: "text-danger text-sm leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ r(C, { ...o?.formControlProps ?? {}, children: /* @__PURE__ */ r(
          F,
          {
            ...o?.ratingProps ?? {},
            value: n.value,
            max: c,
            Icon: u,
            onValueChange: n.onChange,
            disabled: e
          }
        ) }),
        /* @__PURE__ */ r(I, { ...o?.formMessageProps ?? {} })
      ] })
    }
  );
};
export {
  R as FormRating
};
//# sourceMappingURL=formrating.es.js.map
