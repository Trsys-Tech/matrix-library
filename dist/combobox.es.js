import { jsxs as l, jsx as o } from "react/jsx-runtime";
import a, { useRef as _, useMemo as A } from "react";
import { XMark as B, ChevronDown as M, Check as O } from "@trsys-tech/matrix-icons";
import { cn as h } from "./utils.es.js";
import { Button as S } from "./button.es.js";
import { Popover as G, PopoverTrigger as T, PopoverContent as X } from "./popover.es.js";
import { Command as q, CommandInput as z, CommandList as H, CommandEmpty as J, CommandItem as x, CommandGroup as Q } from "./command.es.js";
const re = ({
  onValueChange: t,
  options: d,
  value: r,
  className: w,
  clearable: y = !1,
  closeOnSelect: i = !0,
  loading: n,
  disabled: v,
  placeholder: u = "Select an option",
  searchText: g = "Search...",
  noResultsText: C = "No results found",
  loadingText: p = "Loading...",
  emptyOptionsText: k = "No Items",
  showSearchInput: m = !0,
  modalPopover: N,
  ...P
}) => {
  const [f, s] = a.useState(!1), b = _(null), L = a.useCallback(
    (e) => {
      e.key === "Enter" ? s(!0) : e.key === "Backspace" && !e.currentTarget.value && (t?.(r), i && s(!1));
    },
    [t, i, r]
  ), D = a.useCallback(
    (e) => {
      t?.(e), i && s(!1);
    },
    [t, i]
  ), j = a.useCallback(
    (e) => {
      e.stopPropagation(), t?.(void 0);
    },
    [t]
  ), E = a.useCallback((e, K, R = [""]) => R.join("").toLocaleLowerCase().includes(K.toLocaleLowerCase()) ? 1 : 0, []), I = a.useCallback(
    (e) => {
      m || (e.preventDefault(), b.current?.focus());
    },
    [m]
  ), c = r === void 0 || r === "", F = A(() => c && n ? p : c ? u : d.find((e) => e.value === r)?.label || u, [c, r, d, u, n, p]);
  return /* @__PURE__ */ l(G, { open: f, onOpenChange: s, modal: N, children: [
    /* @__PURE__ */ o(T, { asChild: !0, children: /* @__PURE__ */ l(
      S,
      {
        variant: "text",
        role: "combobox",
        type: "button",
        "aria-expanded": f,
        className: h(
          "group flex h-8 w-full items-center justify-between whitespace-nowrap overflow-hidden rounded-sm border border-input bg-transparent px-3 py-1.5 text-xs ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-gray-100 [&_svg]:disabled:text-text-300",
          w
        ),
        "data-value": r,
        "data-placeholder": c ? "" : void 0,
        loading: n,
        disabled: v,
        endIcon: /* @__PURE__ */ o(
          M,
          {
            role: "button",
            "aria-label": "Expand dropdown",
            className: "!h-4.5 !w-4.5 cursor-pointer group-data-[state=open]:rotate-180 transition-transform ms-auto"
          }
        ),
        ...P,
        children: [
          /* @__PURE__ */ o("span", { className: "text-start text-ellipsis whitespace-nowrap overflow-hidden flex-1 max-w-[calc(100%-24px)]", children: F }),
          y && r !== void 0 && r !== null ? /* @__PURE__ */ o(
            "span",
            {
              onClick: j,
              className: "p-0 rounded-sm text-xs font-normal transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:bg-muted disabled:text-gray-500 text-primary hover:bg-primary-50 focus:bg-transparent focus:ring active:bg-primary-50 active:text-primary-700 [&>svg]:h-4.5 [&>svg]:w-4.5",
              role: "button",
              "aria-label": "Clear selection",
              children: /* @__PURE__ */ o(B, {})
            }
          ) : null
        ]
      }
    ) }),
    /* @__PURE__ */ o(X, { className: "w-auto p-0", align: "start", onEscapeKeyDown: () => s(!1), onOpenAutoFocus: I, children: /* @__PURE__ */ l(
      q,
      {
        className: "w-[--radix-popper-anchor-width] focus-visible:outline-none",
        filter: E,
        defaultValue: r != null ? String(r) : void 0,
        ref: b,
        children: [
          m && /* @__PURE__ */ o(z, { placeholder: g, onKeyDown: L }),
          /* @__PURE__ */ l(H, { children: [
            !n && /* @__PURE__ */ o(J, { children: C }),
            !n && !d.length ? /* @__PURE__ */ o(x, { value: "8fdcaeb67c8ad943c80fe54c3b1059b700d9254389a38a4a1fc39a6eee7564623", disabled: !0, children: k }) : null,
            /* @__PURE__ */ o(Q, { children: d.map((e) => /* @__PURE__ */ l(
              x,
              {
                value: e.value,
                keywords: "keyword" in e ? [e.keyword] : [e.label],
                onSelect: D,
                children: [
                  e.label,
                  /* @__PURE__ */ o(O, { className: h("ml-auto", r === e.value ? "opacity-100" : "opacity-0") })
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
  re as Combobox
};
//# sourceMappingURL=combobox.es.js.map
