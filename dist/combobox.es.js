import { jsxs as d, jsx as o } from "react/jsx-runtime";
import a, { useRef as F, useEffect as K } from "react";
import { cn as h } from "./utils.es.js";
import { Button as R } from "./button.es.js";
import { ChevronDown as _, Check as A } from "@trsys-tech/matrix-icons";
import { Popover as B, PopoverTrigger as O, PopoverContent as T } from "./popover.es.js";
import { Command as G, CommandInput as q, CommandList as z, CommandEmpty as H, CommandItem as v, CommandGroup as J } from "./command.es.js";
const $ = ({
  onValueChange: n,
  options: c,
  value: i,
  className: x,
  closeOnSelect: l = !0,
  loading: s,
  disabled: g,
  placeholder: w = "Select an option",
  searchText: y = "Search...",
  noResultsText: C = "No results found",
  loadingText: k = "Loading...",
  emptyOptionsText: N = "No Items",
  showSearchInput: u = !0,
  ...L
}) => {
  const [p, t] = a.useState(!1), f = F(null), [r, m] = a.useState(i), P = a.useCallback(
    (e) => {
      e.key === "Enter" ? t(!0) : e.key === "Backspace" && !e.currentTarget.value && (m(r), n?.(r), l && t(!1));
    },
    [r, n, l]
  ), D = a.useCallback(
    (e) => {
      m(e), n?.(e), l && t(!1);
    },
    [n, l]
  ), E = a.useCallback((e, j, I = [""]) => I.join("").toLocaleLowerCase().includes(j.toLocaleLowerCase()) ? 1 : 0, []), S = a.useCallback(
    (e) => {
      u || (e.preventDefault(), f.current?.focus());
    },
    [u]
  );
  K(() => {
    m(i);
  }, [i]);
  const b = r === void 0 || r === "";
  return /* @__PURE__ */ d(B, { open: p, onOpenChange: t, children: [
    /* @__PURE__ */ o(O, { asChild: !0, children: /* @__PURE__ */ o(
      R,
      {
        variant: "text",
        role: "combobox",
        "aria-expanded": p,
        className: h(
          "group flex h-8 w-full items-center justify-between whitespace-nowrap rounded-sm border border-input bg-transparent px-3 py-1.5 text-sm ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-gray-100 [&>span]:line-clamp-1 [&_svg]:disabled:text-text-300",
          // showPlaceholder ? "text-muted-foreground" : "",
          x
        ),
        "data-value": r,
        "data-placeholder": b ? "" : void 0,
        loading: s,
        disabled: g,
        endIcon: /* @__PURE__ */ o(
          _,
          {
            role: "button",
            "aria-label": "Expand dropdown",
            className: "!h-4.5 !w-4.5 cursor-pointer group-data-[state=open]:rotate-180 transition-transform ms-auto"
          }
        ),
        ...L,
        children: b ? s ? k : w : c.find((e) => e.value === r)?.label
      }
    ) }),
    /* @__PURE__ */ o(T, { className: "w-auto p-0", align: "start", onEscapeKeyDown: () => t(!1), onOpenAutoFocus: S, children: /* @__PURE__ */ d(
      G,
      {
        className: "w-[--radix-popper-anchor-width] focus-visible:outline-none",
        filter: E,
        defaultValue: r !== void 0 ? String(r) : void 0,
        ref: f,
        children: [
          u && /* @__PURE__ */ o(q, { placeholder: y, onKeyDown: P }),
          /* @__PURE__ */ d(z, { children: [
            !s && /* @__PURE__ */ o(H, { children: C }),
            !s && !c.length ? /* @__PURE__ */ o(v, { value: "8fdcaeb67c8ad943c80fe54c3b1059b700d9254389a38a4a1fc39a6eee7564623", disabled: !0, children: N }) : null,
            /* @__PURE__ */ o(J, { children: c.map((e) => /* @__PURE__ */ d(
              v,
              {
                value: e.value,
                keywords: [e.label],
                onSelect: D,
                children: [
                  e.label,
                  /* @__PURE__ */ o(A, { className: h("ml-auto", r === e.value ? "opacity-100" : "opacity-0") })
                ]
              },
              String(e.value)
            )) })
          ] })
        ]
      }
    ) })
  ] });
};
export {
  $ as Combobox
};
//# sourceMappingURL=combobox.es.js.map
