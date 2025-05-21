import { jsxs as n, jsx as a } from "react/jsx-runtime";
import o, { useRef as _, useEffect as A } from "react";
import { ChevronDown as B, XMark as O, Check as T } from "@trsys-tech/matrix-icons";
import { cn as v } from "./utils.es.js";
import { Button as G } from "./button.es.js";
import { Popover as M, PopoverTrigger as X, PopoverContent as q } from "./popover.es.js";
import { Command as z, CommandInput as H, CommandList as J, CommandEmpty as Q, CommandItem as h, CommandGroup as U } from "./command.es.js";
const ae = ({
  onValueChange: t,
  options: c,
  value: u,
  className: x,
  clearable: g = !1,
  closeOnSelect: s = !0,
  loading: d,
  disabled: w,
  placeholder: y = "Select an option",
  searchText: C = "Search...",
  noResultsText: k = "No results found",
  loadingText: N = "Loading...",
  emptyOptionsText: P = "No Items",
  showSearchInput: p = !0,
  modalPopover: L,
  ...D
}) => {
  const [m, l] = o.useState(!1), f = _(null), [r, i] = o.useState(u), E = o.useCallback(
    (e) => {
      e.key === "Enter" ? l(!0) : e.key === "Backspace" && !e.currentTarget.value && (i(r), t?.(r), s && l(!1));
    },
    [r, t, s]
  ), S = o.useCallback(
    (e) => {
      i(e), t?.(e), s && l(!1);
    },
    [t, s]
  ), j = o.useCallback(
    (e) => {
      e.stopPropagation(), t?.(void 0), i(void 0);
    },
    [t]
  ), I = o.useCallback((e, K, R = [""]) => R.join("").toLocaleLowerCase().includes(K.toLocaleLowerCase()) ? 1 : 0, []), F = o.useCallback(
    (e) => {
      p || (e.preventDefault(), f.current?.focus());
    },
    [p]
  );
  A(() => {
    i(u);
  }, [u]);
  const b = r === void 0 || r === "";
  return /* @__PURE__ */ n(M, { open: m, onOpenChange: l, modal: L, children: [
    /* @__PURE__ */ a(X, { asChild: !0, children: /* @__PURE__ */ n(
      G,
      {
        variant: "text",
        role: "combobox",
        type: "button",
        "aria-expanded": m,
        className: v(
          "group flex h-8 w-full items-center justify-between whitespace-nowrap overflow-hidden rounded-sm border border-input bg-transparent px-3 py-1.5 text-sm ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-gray-100 [&_svg]:disabled:text-text-300",
          x
        ),
        "data-value": r,
        "data-placeholder": b ? "" : void 0,
        loading: d,
        disabled: w,
        endIcon: /* @__PURE__ */ a(
          B,
          {
            role: "button",
            "aria-label": "Expand dropdown",
            className: "!h-4.5 !w-4.5 cursor-pointer group-data-[state=open]:rotate-180 transition-transform ms-auto"
          }
        ),
        ...D,
        children: [
          /* @__PURE__ */ a("span", { className: "text-start text-ellipsis whitespace-nowrap overflow-hidden flex-1 max-w-[calc(100%-24px)]", children: b ? d ? N : y : c.find((e) => e.value === r)?.label }),
          g && r !== void 0 && r !== null ? /* @__PURE__ */ a(
            "span",
            {
              onClick: j,
              className: "p-0 rounded-sm text-xs font-normal transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:bg-muted disabled:text-gray-500 text-primary hover:bg-primary-50 focus:bg-transparent focus:ring active:bg-primary-50 active:text-primary-700 [&>svg]:h-4.5 [&>svg]:w-4.5",
              role: "button",
              "aria-label": "Clear selection",
              children: /* @__PURE__ */ a(O, {})
            }
          ) : null
        ]
      }
    ) }),
    /* @__PURE__ */ a(q, { className: "w-auto p-0", align: "start", onEscapeKeyDown: () => l(!1), onOpenAutoFocus: F, children: /* @__PURE__ */ n(
      z,
      {
        className: "w-[--radix-popper-anchor-width] focus-visible:outline-none",
        filter: I,
        defaultValue: r != null ? String(r) : void 0,
        ref: f,
        children: [
          p && /* @__PURE__ */ a(H, { placeholder: C, onKeyDown: E }),
          /* @__PURE__ */ n(J, { children: [
            !d && /* @__PURE__ */ a(Q, { children: k }),
            !d && !c.length ? /* @__PURE__ */ a(h, { value: "8fdcaeb67c8ad943c80fe54c3b1059b700d9254389a38a4a1fc39a6eee7564623", disabled: !0, children: P }) : null,
            /* @__PURE__ */ a(U, { children: c.map((e) => /* @__PURE__ */ n(
              h,
              {
                value: e.value,
                keywords: [e.label],
                onSelect: S,
                children: [
                  e.label,
                  /* @__PURE__ */ a(T, { className: v("ml-auto", r === e.value ? "opacity-100" : "opacity-0") })
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
  ae as Combobox
};
//# sourceMappingURL=combobox.es.js.map
