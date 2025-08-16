import { jsx as t, jsxs as n } from "react/jsx-runtime";
import * as l from "react";
import { Check as g, ChevronDown as m, ChevronUp as b, XMark as w } from "@trsys-tech/matrix-icons";
import * as e from "@radix-ui/react-select";
import { cn as s } from "./utils.es.js";
const p = l.createContext({ onClear: () => {
}, value: void 0 }), N = ({ onValueChange: r, value: o, ...a }) => {
  const d = () => {
    r?.("");
  };
  return /* @__PURE__ */ t(p.Provider, { value: { onClear: d, value: o }, children: /* @__PURE__ */ t(e.Root, { ...a, value: o, onValueChange: r }) });
};
N.displayName = e.Root.displayName;
const P = e.Group, k = e.Value, v = l.forwardRef(
  ({ className: r, children: o, clearable: a, ...d }, i) => {
    const { onClear: h, value: c } = l.useContext(p), x = (y) => {
      y.stopPropagation();
    };
    return /* @__PURE__ */ n(
      e.Trigger,
      {
        ref: i,
        className: s(
          "group flex h-8 w-full items-center justify-between whitespace-nowrap rounded-sm border border-input bg-transparent px-3 py-2 text-xs ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-none [&>span]:line-clamp-1 [&_svg]:disabled:text-text-300",
          r
        ),
        "data-value": c,
        ...d,
        children: [
          o,
          /* @__PURE__ */ n("div", { className: "flex items-center gap-2", children: [
            a && c ? /* @__PURE__ */ t(e.Icon, { asChild: !0, onPointerDown: x, onClickCapture: h, children: /* @__PURE__ */ t(w, { className: "h-4.5 w-4.5" }) }) : null,
            /* @__PURE__ */ t(e.Icon, { asChild: !0, children: /* @__PURE__ */ t(m, { className: "h-4.5 w-4.5 text-primary group-data-[state=open]:rotate-180 transition-transform" }) })
          ] })
        ]
      }
    );
  }
);
v.displayName = e.Trigger.displayName;
const f = l.forwardRef(({ className: r, ...o }, a) => /* @__PURE__ */ t(e.ScrollUpButton, { ref: a, className: s("flex cursor-default items-center justify-center py-1", r), ...o, children: /* @__PURE__ */ t(b, {}) }));
f.displayName = e.ScrollUpButton.displayName;
const u = l.forwardRef(({ className: r, ...o }, a) => /* @__PURE__ */ t(e.ScrollDownButton, { ref: a, className: s("flex cursor-default items-center justify-center py-1", r), ...o, children: /* @__PURE__ */ t(m, {}) }));
u.displayName = e.ScrollDownButton.displayName;
const S = l.forwardRef(({ className: r, children: o, position: a = "popper", ...d }, i) => /* @__PURE__ */ t(e.Portal, { children: /* @__PURE__ */ n(
  e.Content,
  {
    ref: i,
    className: s(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      a === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1 max-h-[--radix-select-content-available-height]",
      r
    ),
    position: a,
    ...d,
    children: [
      /* @__PURE__ */ t(f, {}),
      /* @__PURE__ */ t(
        e.Viewport,
        {
          className: s("p-1", a === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
          children: o
        }
      ),
      /* @__PURE__ */ t(u, {})
    ]
  }
) }));
S.displayName = e.Content.displayName;
const C = l.forwardRef(
  ({ className: r, ...o }, a) => /* @__PURE__ */ t(e.Label, { ref: a, className: s("px-2 py-1.5 text-xs font-semibold", r), ...o })
);
C.displayName = e.Label.displayName;
const R = l.forwardRef(
  ({ className: r, children: o, ...a }, d) => /* @__PURE__ */ n(
    e.Item,
    {
      ref: d,
      className: s(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-xs outline-none focus:bg-gray-200 data-[active=true]:bg-gray-300 data-[active=true]:font-bold data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        r
      ),
      ...a,
      children: [
        /* @__PURE__ */ t("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ t(e.ItemIndicator, { children: /* @__PURE__ */ t(g, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ t(e.ItemText, { children: o })
      ]
    }
  )
);
R.displayName = e.Item.displayName;
const I = l.forwardRef(({ className: r, ...o }, a) => /* @__PURE__ */ t(e.Separator, { ref: a, className: s("-mx-1 my-1 h-px bg-muted", r), ...o }));
I.displayName = e.Separator.displayName;
export {
  N as Select,
  S as SelectContent,
  P as SelectGroup,
  R as SelectItem,
  C as SelectLabel,
  u as SelectScrollDownButton,
  f as SelectScrollUpButton,
  I as SelectSeparator,
  v as SelectTrigger,
  k as SelectValue
};
//# sourceMappingURL=select.es.js.map
