import { jsxs as r, jsx as o } from "react/jsx-runtime";
import * as s from "react";
import * as t from "@radix-ui/react-context-menu";
import { Check as i, Circle as l, ChevronRight as c } from "@trsys-tech/matrix-icons";
import { cn as n } from "./utils.es.js";
const v = t.Root, I = t.Trigger, S = t.Group, z = t.Portal, k = t.Sub, T = t.RadioGroup, u = s.forwardRef(({ className: e, inset: m, children: a, ...x }, d) => /* @__PURE__ */ r(
  t.SubTrigger,
  {
    ref: d,
    className: n(
      "mtx-flex mtx-cursor-default mtx-select-none mtx-items-center mtx-rounded-sm mtx-px-2 mtx-py-1.5 mtx-text-sm mtx-outline-none focus:mtx-bg-accent focus:mtx-text-accent-foreground data-[state=open]:mtx-bg-accent data-[state=open]:mtx-text-accent-foreground",
      m && "mtx-pl-8",
      e
    ),
    ...x,
    children: [
      a,
      /* @__PURE__ */ o(c, { className: "mtx-ml-auto mtx-h-4 mtx-w-4" })
    ]
  }
));
u.displayName = t.SubTrigger.displayName;
const p = s.forwardRef(({ className: e, ...m }, a) => /* @__PURE__ */ o(
  t.SubContent,
  {
    ref: a,
    className: n(
      "mtx-z-50 mtx-min-w-[8rem] mtx-overflow-hidden mtx-rounded-md mtx-border mtx-bg-popover mtx-p-1 mtx-text-popover-foreground mtx-shadow-lg data-[state=open]:mtx-animate-in data-[state=closed]:mtx-animate-out data-[state=closed]:mtx-fade-out-0 data-[state=open]:mtx-fade-in-0 data-[state=closed]:mtx-zoom-out-95 data-[state=open]:mtx-zoom-in-95 data-[side=bottom]:mtx-slide-in-from-top-2 data-[side=left]:mtx-slide-in-from-right-2 data-[side=right]:mtx-slide-in-from-left-2 data-[side=top]:mtx-slide-in-from-bottom-2",
      e
    ),
    ...m
  }
));
p.displayName = t.SubContent.displayName;
const f = s.forwardRef(({ className: e, ...m }, a) => /* @__PURE__ */ o(t.Portal, { children: /* @__PURE__ */ o(
  t.Content,
  {
    ref: a,
    className: n(
      "mtx-z-50 mtx-min-w-[8rem] mtx-overflow-hidden mtx-rounded-md mtx-border mtx-bg-popover mtx-p-1 mtx-text-popover-foreground mtx-shadow-md data-[state=open]:mtx-animate-in data-[state=closed]:mtx-animate-out data-[state=closed]:mtx-fade-out-0 data-[state=open]:mtx-fade-in-0 data-[state=closed]:mtx-zoom-out-95 data-[state=open]:mtx-zoom-in-95 data-[side=bottom]:mtx-slide-in-from-top-2 data-[side=left]:mtx-slide-in-from-right-2 data-[side=right]:mtx-slide-in-from-left-2 data-[side=top]:mtx-slide-in-from-bottom-2",
      e
    ),
    ...m
  }
) }));
f.displayName = t.Content.displayName;
const b = s.forwardRef(({ className: e, inset: m, ...a }, x) => /* @__PURE__ */ o(
  t.Item,
  {
    ref: x,
    className: n(
      "mtx-relative mtx-flex mtx-cursor-default mtx-select-none mtx-items-center mtx-rounded-sm mtx-px-2 mtx-py-1.5 mtx-text-sm mtx-outline-none focus:mtx-bg-accent focus:mtx-text-accent-foreground data-[disabled]:mtx-pointer-events-none data-[disabled]:mtx-opacity-50",
      m && "mtx-pl-8",
      e
    ),
    ...a
  }
));
b.displayName = t.Item.displayName;
const g = s.forwardRef(({ className: e, children: m, checked: a, ...x }, d) => /* @__PURE__ */ r(
  t.CheckboxItem,
  {
    ref: d,
    className: n(
      "mtx-relative mtx-flex mtx-cursor-default mtx-select-none mtx-items-center mtx-rounded-sm mtx-py-1.5 mtx-pl-8 mtx-pr-2 mtx-text-sm mtx-outline-none focus:mtx-bg-accent focus:mtx-text-accent-foreground data-[disabled]:mtx-pointer-events-none data-[disabled]:mtx-opacity-50",
      e
    ),
    checked: a,
    ...x,
    children: [
      /* @__PURE__ */ o("span", { className: "mtx-absolute mtx-left-2 mtx-flex mtx-h-3.5 mtx-w-3.5 mtx-items-center mtx-justify-center", children: /* @__PURE__ */ o(t.ItemIndicator, { children: /* @__PURE__ */ o(i, { className: "mtx-h-4 mtx-w-4" }) }) }),
      m
    ]
  }
));
g.displayName = t.CheckboxItem.displayName;
const N = s.forwardRef(({ className: e, children: m, ...a }, x) => /* @__PURE__ */ r(
  t.RadioItem,
  {
    ref: x,
    className: n(
      "mtx-relative mtx-flex mtx-cursor-default mtx-select-none mtx-items-center mtx-rounded-sm mtx-py-1.5 mtx-pl-8 mtx-pr-2 mtx-text-sm mtx-outline-none focus:mtx-bg-accent focus:mtx-text-accent-foreground data-[disabled]:mtx-pointer-events-none data-[disabled]:mtx-opacity-50",
      e
    ),
    ...a,
    children: [
      /* @__PURE__ */ o("span", { className: "mtx-absolute mtx-left-2 mtx-flex mtx-h-3.5 mtx-w-3.5 mtx-items-center mtx-justify-center", children: /* @__PURE__ */ o(t.ItemIndicator, { children: /* @__PURE__ */ o(l, { className: "mtx-h-4 mtx-w-4 mtx-fill-current" }) }) }),
      m
    ]
  }
));
N.displayName = t.RadioItem.displayName;
const h = s.forwardRef(({ className: e, inset: m, ...a }, x) => /* @__PURE__ */ o(
  t.Label,
  {
    ref: x,
    className: n("mtx-px-2 mtx-py-1.5 mtx-text-sm mtx-font-semibold mtx-text-foreground", m && "mtx-pl-8", e),
    ...a
  }
));
h.displayName = t.Label.displayName;
const C = s.forwardRef(({ className: e, ...m }, a) => /* @__PURE__ */ o(t.Separator, { ref: a, className: n("-mtx-1 mtx-my-1 mtx-h-px mtx-bg-border", e), ...m }));
C.displayName = t.Separator.displayName;
const y = ({ className: e, ...m }) => /* @__PURE__ */ o("span", { className: n("mtx-ml-auto mtx-text-xs mtx-tracking-widest mtx-text-muted-foreground", e), ...m });
y.displayName = "ContextMenuShortcut";
export {
  v as ContextMenu,
  g as ContextMenuCheckboxItem,
  f as ContextMenuContent,
  S as ContextMenuGroup,
  b as ContextMenuItem,
  h as ContextMenuLabel,
  z as ContextMenuPortal,
  T as ContextMenuRadioGroup,
  N as ContextMenuRadioItem,
  C as ContextMenuSeparator,
  y as ContextMenuShortcut,
  k as ContextMenuSub,
  p as ContextMenuSubContent,
  u as ContextMenuSubTrigger,
  I as ContextMenuTrigger
};
//# sourceMappingURL=contextmenu.es.js.map
