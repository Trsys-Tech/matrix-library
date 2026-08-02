import { jsx as r, jsxs as m } from "react/jsx-runtime";
import { Star as h } from "@trsys-tech/matrix-icons";
import { Rating as F } from "./rating.es.js";
import { FormField as P, FormItem as b, FormLabel as C, FormControl as I, FormMessage as j } from "./form.es.js";
const V = (a) => {
  const {
    name: n,
    control: s,
    defaultValue: l,
    disabled: o,
    readOnly: i,
    rules: d,
    shouldUnregister: p,
    label: g,
    slotProps: e,
    required: u,
    Icon: c = h,
    max: x = 5,
    ...f
  } = a;
  return /* @__PURE__ */ r(
    P,
    {
      control: s,
      name: n,
      defaultValue: l,
      disabled: o,
      rules: d,
      shouldUnregister: p,
      render: ({ field: t }) => /* @__PURE__ */ m(b, { ...f, children: [
        /* @__PURE__ */ m(C, { ...e?.formLabelProps ?? {}, children: [
          g,
          u && /* @__PURE__ */ r("span", { className: "mtx-text-danger mtx-text-sm mtx-leading-4", children: "*" })
        ] }),
        /* @__PURE__ */ r(I, { ...e?.formControlProps ?? {}, children: /* @__PURE__ */ r(
          F,
          {
            ...e?.ratingProps ?? {},
            value: t.value,
            max: x,
            Icon: c,
            onValueChange: t.onChange,
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
