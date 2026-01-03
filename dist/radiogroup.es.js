import { jsx as e } from "react/jsx-runtime";
import * as d from "react";
import { Circle as t } from "@trsys-tech/matrix-icons";
import * as r from "@radix-ui/react-radio-group";
import { cn as s } from "./utils.es.js";
const m = d.forwardRef(({ className: o, ...a }, i) => /* @__PURE__ */ e(r.Root, { className: s("grid gap-2", o), ...a, ref: i }));
m.displayName = r.Root.displayName;
const l = d.forwardRef(({ className: o, ...a }, i) => /* @__PURE__ */ e(
  r.Item,
  {
    ref: i,
    className: s(
      "aspect-square h-4 w-4 rounded-full border border-gray-400 data-[state=checked]:border-primary hover:border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:bg-muted disabled:border-muted",
      o
    ),
    ...a,
    children: /* @__PURE__ */ e(r.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ e(t, { className: "h-2.5 w-2.5 fill-primary" }) })
  }
));
l.displayName = r.Item.displayName;
export {
  m as RadioGroup,
  l as RadioGroupItem
};
//# sourceMappingURL=radiogroup.es.js.map
