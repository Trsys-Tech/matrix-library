import { jsx as t } from "react/jsx-runtime";
import * as a from "react";
import { Circle as d } from "@trsys-tech/matrix-icons";
import * as r from "@radix-ui/react-radio-group";
import { cn as i } from "./utils.es.js";
const s = a.forwardRef(({ className: m, ...e }, o) => /* @__PURE__ */ t(r.Root, { className: i("mtx-grid mtx-gap-2", m), ...e, ref: o }));
s.displayName = r.Root.displayName;
const x = a.forwardRef(({ className: m, ...e }, o) => /* @__PURE__ */ t(
  r.Item,
  {
    ref: o,
    className: i(
      "mtx-aspect-square mtx-h-4 mtx-w-4 mtx-rounded-full mtx-border mtx-border-gray-400 data-[state=checked]:mtx-border-primary hover:mtx-border-primary mtx-text-primary mtx-shadow focus:mtx-outline-none focus-visible:mtx-ring-1 focus-visible:mtx-ring-ring disabled:mtx-cursor-not-allowed disabled:mtx-bg-muted disabled:mtx-border-muted",
      m
    ),
    ...e,
    children: /* @__PURE__ */ t(r.Indicator, { className: "mtx-flex mtx-items-center mtx-justify-center", children: /* @__PURE__ */ t(d, { className: "mtx-h-2.5 mtx-w-2.5 mtx-fill-primary" }) })
  }
));
x.displayName = r.Item.displayName;
export {
  s as RadioGroup,
  x as RadioGroupItem
};
//# sourceMappingURL=radiogroup.es.js.map
