import { jsxs as l, jsx as n } from "react/jsx-runtime";
import * as r from "react";
import * as e from "@radix-ui/react-context-menu";
import { Check as c, Circle as m, ChevronRight as u } from "@trsys-tech/matrix-icons";
import { cn as d } from "./utils.es.js";
const v = e.Root, I = e.Trigger, S = e.Group, z = e.Portal, k = e.Sub, T = e.RadioGroup, p = r.forwardRef(({ className: t, inset: a, children: o, ...s }, i) => /* @__PURE__ */ l(
  e.SubTrigger,
  {
    ref: i,
    className: d(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      a && "pl-8",
      t
    ),
    ...s,
    children: [
      o,
      /* @__PURE__ */ n(u, { className: "ml-auto h-4 w-4" })
    ]
  }
));
p.displayName = e.SubTrigger.displayName;
const f = r.forwardRef(({ className: t, ...a }, o) => /* @__PURE__ */ n(
  e.SubContent,
  {
    ref: o,
    className: d(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      t
    ),
    ...a
  }
));
f.displayName = e.SubContent.displayName;
const x = r.forwardRef(({ className: t, ...a }, o) => /* @__PURE__ */ n(e.Portal, { children: /* @__PURE__ */ n(
  e.Content,
  {
    ref: o,
    className: d(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      t
    ),
    ...a
  }
) }));
x.displayName = e.Content.displayName;
const b = r.forwardRef(({ className: t, inset: a, ...o }, s) => /* @__PURE__ */ n(
  e.Item,
  {
    ref: s,
    className: d(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      a && "pl-8",
      t
    ),
    ...o
  }
));
b.displayName = e.Item.displayName;
const g = r.forwardRef(({ className: t, children: a, checked: o, ...s }, i) => /* @__PURE__ */ l(
  e.CheckboxItem,
  {
    ref: i,
    className: d(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      t
    ),
    checked: o,
    ...s,
    children: [
      /* @__PURE__ */ n("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ n(e.ItemIndicator, { children: /* @__PURE__ */ n(c, { className: "h-4 w-4" }) }) }),
      a
    ]
  }
));
g.displayName = e.CheckboxItem.displayName;
const N = r.forwardRef(({ className: t, children: a, ...o }, s) => /* @__PURE__ */ l(
  e.RadioItem,
  {
    ref: s,
    className: d(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      t
    ),
    ...o,
    children: [
      /* @__PURE__ */ n("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ n(e.ItemIndicator, { children: /* @__PURE__ */ n(m, { className: "h-4 w-4 fill-current" }) }) }),
      a
    ]
  }
));
N.displayName = e.RadioItem.displayName;
const h = r.forwardRef(({ className: t, inset: a, ...o }, s) => /* @__PURE__ */ n(e.Label, { ref: s, className: d("px-2 py-1.5 text-sm font-semibold text-foreground", a && "pl-8", t), ...o }));
h.displayName = e.Label.displayName;
const C = r.forwardRef(({ className: t, ...a }, o) => /* @__PURE__ */ n(e.Separator, { ref: o, className: d("-mx-1 my-1 h-px bg-border", t), ...a }));
C.displayName = e.Separator.displayName;
const y = ({ className: t, ...a }) => /* @__PURE__ */ n("span", { className: d("ml-auto text-xs tracking-widest text-muted-foreground", t), ...a });
y.displayName = "ContextMenuShortcut";
export {
  v as ContextMenu,
  g as ContextMenuCheckboxItem,
  x as ContextMenuContent,
  S as ContextMenuGroup,
  b as ContextMenuItem,
  h as ContextMenuLabel,
  z as ContextMenuPortal,
  T as ContextMenuRadioGroup,
  N as ContextMenuRadioItem,
  C as ContextMenuSeparator,
  y as ContextMenuShortcut,
  k as ContextMenuSub,
  f as ContextMenuSubContent,
  p as ContextMenuSubTrigger,
  I as ContextMenuTrigger
};
//# sourceMappingURL=contextmenu.es.js.map
