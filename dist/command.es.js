import { jsx as o, jsxs as l } from "react/jsx-runtime";
import * as r from "react";
import { Command as e } from "cmdk";
import { Magnifier as c } from "@trsys-tech/matrix-icons";
import { cn as d } from "./utils.es.js";
import { Dialog as u, DialogContent as f } from "./dialog.es.js";
const n = r.forwardRef(
  ({ className: m, ...t }, a) => /* @__PURE__ */ o(
    e,
    {
      ref: a,
      className: d(
        "mtx-flex mtx-h-full mtx-w-full mtx-flex-col mtx-overflow-hidden mtx-rounded-md mtx-bg-popover mtx-text-popover-foreground",
        m
      ),
      ...t
    }
  )
);
n.displayName = e.displayName;
const S = ({ children: m, ...t }) => /* @__PURE__ */ o(u, { ...t, children: /* @__PURE__ */ o(f, { className: "mtx-overflow-hidden mtx-p-0", children: /* @__PURE__ */ o(n, { className: "[&_[cmdk-group-heading]]:mtx-px-2 [&_[cmdk-group-heading]]:mtx-font-medium [&_[cmdk-group-heading]]:mtx-text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:mtx-pt-0 [&_[cmdk-group]]:mtx-px-2 [&_[cmdk-input-wrapper]_svg]:mtx-h-5 [&_[cmdk-input-wrapper]_svg]:mtx-w-5 [&_[cmdk-input]]:mtx-h-12 [&_[cmdk-item]]:mtx-px-2 [&_[cmdk-item]]:mtx-py-3 [&_[cmdk-item]_svg]:mtx-h-5 [&_[cmdk-item]_svg]:mtx-w-5", children: m }) }) }), g = r.forwardRef(
  ({ className: m, ...t }, a) => /* @__PURE__ */ l("div", { className: "mtx-flex mtx-items-center mtx-border-b mtx-border-gray-200 mtx-px-3", "cmdk-input-wrapper": "", children: [
    /* @__PURE__ */ o(c, { className: "mtx-mr-2 mtx-h-4 mtx-w-4 mtx-shrink-0 mtx-opacity-50" }),
    /* @__PURE__ */ o(
      e.Input,
      {
        ref: a,
        className: d(
          "mtx-flex mtx-h-10 mtx-w-full mtx-rounded-md mtx-bg-transparent mtx-py-3 mtx-text-sm mtx-outline-none placeholder:mtx-text-muted-foreground disabled:mtx-cursor-not-allowed disabled:mtx-opacity-50",
          m
        ),
        ...t
      }
    )
  ] })
);
g.displayName = e.Input.displayName;
const h = r.forwardRef(
  ({ className: m, ...t }, a) => /* @__PURE__ */ o(e.List, { ref: a, className: d("mtx-max-h-[300px] mtx-overflow-y-auto mtx-overflow-x-hidden", m), ...t })
);
h.displayName = e.List.displayName;
const y = r.forwardRef(
  (m, t) => /* @__PURE__ */ o(e.Empty, { ref: t, className: "mtx-py-6 mtx-text-center mtx-text-sm", ...m })
);
y.displayName = e.Empty.displayName;
const N = r.forwardRef(
  ({ className: m, ...t }, a) => /* @__PURE__ */ o(
    e.Group,
    {
      ref: a,
      className: d(
        "mtx-overflow-hidden mtx-p-1 mtx-text-foreground [&_[cmdk-group-heading]]:mtx-px-2 [&_[cmdk-group-heading]]:mtx-py-1.5 [&_[cmdk-group-heading]]:mtx-text-xs [&_[cmdk-group-heading]]:mtx-font-medium [&_[cmdk-group-heading]]:mtx-text-muted-foreground",
        m
      ),
      ...t
    }
  )
);
N.displayName = e.Group.displayName;
const _ = r.forwardRef(({ className: m, ...t }, a) => /* @__PURE__ */ o(e.Separator, { ref: a, className: d("-mtx-mx-1 mtx-h-px mtx-bg-border", m), ...t }));
_.displayName = e.Separator.displayName;
const k = r.forwardRef(({ className: m, value: t, onSelect: a, ...s }, p) => {
  const i = r.useCallback(
    (x) => {
      a?.(typeof t == "number" ? Number(x) : x);
    },
    [t, a]
  );
  return /* @__PURE__ */ o(
    e.Item,
    {
      ref: p,
      className: d(
        "mtx-relative mtx-flex mtx-cursor-default mtx-gap-2 mtx-select-none mtx-items-center mtx-rounded-sm mtx-px-2 mtx-py-1.5 mtx-text-sm mtx-outline-none data-[disabled=true]:mtx-pointer-events-none data-[selected=true]:mtx-bg-gray-300 data-[selected=true]:mtx-text-accent-foreground data-[disabled=true]:mtx-opacity-50 [&_svg]:mtx-pointer-events-none [&_svg]:mtx-size-4 [&_svg]:mtx-shrink-0",
        m
      ),
      value: t !== void 0 ? String(t) : void 0,
      onSelect: i,
      ...s
    }
  );
});
k.displayName = e.Item.displayName;
const w = ({ className: m, ...t }) => /* @__PURE__ */ o("span", { className: d("mtx-ml-auto mtx-text-xs mtx-tracking-widest mtx-text-muted-foreground", m), ...t });
w.displayName = "CommandShortcut";
export {
  n as Command,
  S as CommandDialog,
  y as CommandEmpty,
  N as CommandGroup,
  g as CommandInput,
  k as CommandItem,
  h as CommandList,
  _ as CommandSeparator,
  w as CommandShortcut
};
//# sourceMappingURL=command.es.js.map
