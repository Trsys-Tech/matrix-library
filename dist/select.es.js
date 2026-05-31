import { jsx as e, jsxs as s } from "react/jsx-runtime";
import * as o from "react";
import { Check as g, ChevronDown as i, ChevronUp as b, XMark as w } from "@trsys-tech/matrix-icons";
import * as t from "@radix-ui/react-select";
import { cn as x } from "./utils.es.js";
const c = o.createContext({ onClear: () => {
}, value: void 0 }), N = ({ onValueChange: m, value: r, ...a }) => {
  const l = () => {
    m?.("");
  };
  return /* @__PURE__ */ e(c.Provider, { value: { onClear: l, value: r }, children: /* @__PURE__ */ e(t.Root, { ...a, value: r, onValueChange: m }) });
};
N.displayName = t.Root.displayName;
const P = t.Group, k = t.Value, v = o.forwardRef(
  ({ className: m, children: r, clearable: a, ...l }, d) => {
    const { onClear: u, value: n } = o.useContext(c), h = (y) => {
      y.stopPropagation();
    };
    return /* @__PURE__ */ s(
      t.Trigger,
      {
        ref: d,
        className: x(
          "mtx-group mtx-flex mtx-h-8 mtx-w-full mtx-items-center mtx-justify-between mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-px-3 mtx-py-2 mtx-text-xs mtx-ring-offset-background data-[placeholder]:mtx-text-muted-foreground hover:mtx-border hover:mtx-border-primary focus:mtx-border focus:mtx-border-primary focus:mtx-outline-none focus:mtx-ring focus:mtx-ring-primary-100 disabled:mtx-cursor-not-allowed disabled:mtx-bg-gray-100 disabled:mtx-text-text-300 disabled:mtx-border-none [&>span]:mtx-line-clamp-1 [&_svg]:disabled:mtx-text-text-300",
          m
        ),
        "data-value": n,
        ...l,
        children: [
          r,
          /* @__PURE__ */ s("div", { className: "mtx-flex mtx-items-center mtx-gap-2", children: [
            a && n ? /* @__PURE__ */ e(t.Icon, { asChild: !0, onPointerDown: h, onClickCapture: u, children: /* @__PURE__ */ e(w, { className: "mtx-h-4.5 mtx-w-4.5" }) }) : null,
            /* @__PURE__ */ e(t.Icon, { asChild: !0, children: /* @__PURE__ */ e(i, { className: "mtx-h-4.5 mtx-w-4.5 mtx-text-primary group-data-[state=open]:mtx-rotate-180 mtx-transition-transform" }) })
          ] })
        ]
      }
    );
  }
);
v.displayName = t.Trigger.displayName;
const p = o.forwardRef(({ className: m, ...r }, a) => /* @__PURE__ */ e(
  t.ScrollUpButton,
  {
    ref: a,
    className: x("mtx-flex mtx-cursor-default mtx-items-center mtx-justify-center mtx-py-1", m),
    ...r,
    children: /* @__PURE__ */ e(b, {})
  }
));
p.displayName = t.ScrollUpButton.displayName;
const f = o.forwardRef(({ className: m, ...r }, a) => /* @__PURE__ */ e(
  t.ScrollDownButton,
  {
    ref: a,
    className: x("mtx-flex mtx-cursor-default mtx-items-center mtx-justify-center mtx-py-1", m),
    ...r,
    children: /* @__PURE__ */ e(i, {})
  }
));
f.displayName = t.ScrollDownButton.displayName;
const S = o.forwardRef(({ className: m, children: r, position: a = "popper", ...l }, d) => /* @__PURE__ */ e(t.Portal, { children: /* @__PURE__ */ s(
  t.Content,
  {
    ref: d,
    className: x(
      "mtx-relative mtx-z-50 mtx-max-h-96 mtx-min-w-[8rem] mtx-overflow-hidden mtx-rounded-md mtx-border mtx-bg-popover mtx-text-popover-foreground mtx-shadow-md data-[state=open]:mtx-animate-in data-[state=closed]:mtx-animate-out data-[state=closed]:mtx-fade-out-0 data-[state=open]:mtx-fade-in-0 data-[state=closed]:mtx-zoom-out-95 data-[state=open]:mtx-zoom-in-95 data-[side=bottom]:mtx-slide-in-from-top-2 data-[side=left]:mtx-slide-in-from-right-2 data-[side=right]:mtx-slide-in-from-left-2 data-[side=top]:mtx-slide-in-from-bottom-2",
      a === "popper" && "data-[side=bottom]:mtx-translate-y-1 data-[side=left]:-mtx-translate-x-1 data-[side=right]:mtx-translate-x-1 data-[side=top]:-mtx-translate-y-1 mtx-max-h-[--radix-select-content-available-height]",
      m
    ),
    position: a,
    ...l,
    children: [
      /* @__PURE__ */ e(p, {}),
      /* @__PURE__ */ e(
        t.Viewport,
        {
          className: x(
            "mtx-p-1",
            a === "popper" && "mtx-h-[var(--radix-select-trigger-height)] mtx-w-full mtx-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: r
        }
      ),
      /* @__PURE__ */ e(f, {})
    ]
  }
) }));
S.displayName = t.Content.displayName;
const C = o.forwardRef(
  ({ className: m, ...r }, a) => /* @__PURE__ */ e(t.Label, { ref: a, className: x("mtx-px-2 mtx-py-1.5 mtx-text-xs mtx-font-semibold", m), ...r })
);
C.displayName = t.Label.displayName;
const R = o.forwardRef(
  ({ className: m, children: r, ...a }, l) => /* @__PURE__ */ s(
    t.Item,
    {
      ref: l,
      className: x(
        "mtx-relative mtx-flex mtx-w-full mtx-cursor-default mtx-select-none mtx-items-center mtx-rounded-sm mtx-py-1.5 mtx-pl-2 mtx-pr-8 mtx-text-xs mtx-outline-none focus:mtx-bg-gray-200 data-[active=true]:mtx-bg-gray-300 data-[active=true]:mtx-font-bold data-[disabled]:mtx-pointer-events-none data-[disabled]:mtx-opacity-50",
        m
      ),
      ...a,
      children: [
        /* @__PURE__ */ e("span", { className: "mtx-absolute mtx-right-2 mtx-flex mtx-h-3.5 mtx-w-3.5 mtx-items-center mtx-justify-center", children: /* @__PURE__ */ e(t.ItemIndicator, { children: /* @__PURE__ */ e(g, { className: "mtx-h-4 mtx-w-4" }) }) }),
        /* @__PURE__ */ e(t.ItemText, { children: r })
      ]
    }
  )
);
R.displayName = t.Item.displayName;
const I = o.forwardRef(({ className: m, ...r }, a) => /* @__PURE__ */ e(t.Separator, { ref: a, className: x("-mtx-mx-1 mtx-my-1 mtx-h-px mtx-bg-muted", m), ...r }));
I.displayName = t.Separator.displayName;
export {
  N as Select,
  S as SelectContent,
  P as SelectGroup,
  R as SelectItem,
  C as SelectLabel,
  f as SelectScrollDownButton,
  p as SelectScrollUpButton,
  I as SelectSeparator,
  v as SelectTrigger,
  k as SelectValue
};
//# sourceMappingURL=select.es.js.map
