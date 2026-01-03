import { jsx as d, jsxs as c } from "react/jsx-runtime";
import * as r from "react";
import { Command as o } from "cmdk";
import { Magnifier as u } from "@trsys-tech/matrix-icons";
import { cn as m } from "./utils.es.js";
import { Dialog as f, DialogContent as g } from "./dialog.es.js";
const s = r.forwardRef(
  ({ className: a, ...e }, t) => /* @__PURE__ */ d(
    o,
    {
      ref: t,
      className: m("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", a),
      ...e
    }
  )
);
s.displayName = o.displayName;
const S = ({ children: a, ...e }) => /* @__PURE__ */ d(f, { ...e, children: /* @__PURE__ */ d(g, { className: "overflow-hidden p-0", children: /* @__PURE__ */ d(s, { className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children: a }) }) }), x = r.forwardRef(
  ({ className: a, ...e }, t) => /* @__PURE__ */ c("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
    /* @__PURE__ */ d(u, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
    /* @__PURE__ */ d(
      o.Input,
      {
        ref: t,
        className: m(
          "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          a
        ),
        ...e
      }
    )
  ] })
);
x.displayName = o.Input.displayName;
const h = r.forwardRef(
  ({ className: a, ...e }, t) => /* @__PURE__ */ d(o.List, { ref: t, className: m("max-h-[300px] overflow-y-auto overflow-x-hidden", a), ...e })
);
h.displayName = o.List.displayName;
const y = r.forwardRef(
  (a, e) => /* @__PURE__ */ d(o.Empty, { ref: e, className: "py-6 text-center text-sm", ...a })
);
y.displayName = o.Empty.displayName;
const N = r.forwardRef(
  ({ className: a, ...e }, t) => /* @__PURE__ */ d(
    o.Group,
    {
      ref: t,
      className: m(
        "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
        a
      ),
      ...e
    }
  )
);
N.displayName = o.Group.displayName;
const _ = r.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ d(o.Separator, { ref: t, className: m("-mx-1 h-px bg-border", a), ...e }));
_.displayName = o.Separator.displayName;
const k = r.forwardRef(({ className: a, value: e, onSelect: t, ...p }, i) => {
  const l = r.useCallback(
    (n) => {
      t?.(typeof e == "number" ? Number(n) : n);
    },
    [e, t]
  );
  return /* @__PURE__ */ d(
    o.Item,
    {
      ref: i,
      className: m(
        "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-gray-300 data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        a
      ),
      value: e !== void 0 ? String(e) : void 0,
      onSelect: l,
      ...p
    }
  );
});
k.displayName = o.Item.displayName;
const w = ({ className: a, ...e }) => /* @__PURE__ */ d("span", { className: m("ml-auto text-xs tracking-widest text-muted-foreground", a), ...e });
w.displayName = "CommandShortcut";
export {
  s as Command,
  S as CommandDialog,
  y as CommandEmpty,
  N as CommandGroup,
  x as CommandInput,
  k as CommandItem,
  h as CommandList,
  _ as CommandSeparator,
  w as CommandShortcut
};
//# sourceMappingURL=command.es.js.map
