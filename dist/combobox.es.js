import { jsxs as l, jsx as o } from "react/jsx-runtime";
import a, { useRef as A, useMemo as B } from "react";
import { XMark as M, ChevronDown as O, Check as S } from "@trsys-tech/matrix-icons";
import { cn as h } from "./utils.es.js";
import { Button as G } from "./button.es.js";
import { Popover as T, PopoverTrigger as X, PopoverContent as q } from "./popover.es.js";
import { Command as z, CommandInput as H, CommandList as J, CommandEmpty as Q, CommandItem as x, CommandGroup as U } from "./command.es.js";
const oe = ({
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
  extraContent: P,
  ...L
}) => {
  const [f, s] = a.useState(!1), b = A(null), D = a.useCallback(
    (e) => {
      e.key === "Enter" ? s(!0) : e.key === "Backspace" && !e.currentTarget.value && (t?.(r), i && s(!1));
    },
    [t, i, r]
  ), j = a.useCallback(
    (e) => {
      t?.(e), i && s(!1);
    },
    [t, i]
  ), E = a.useCallback(
    (e) => {
      e.stopPropagation(), t?.(void 0);
    },
    [t]
  ), I = a.useCallback((e, R, _ = [""]) => _.join("").toLocaleLowerCase().includes(R.toLocaleLowerCase()) ? 1 : 0, []), F = a.useCallback(
    (e) => {
      m || (e.preventDefault(), b.current?.focus());
    },
    [m]
  ), c = r === void 0 || r === "", K = B(() => c && n ? p : c ? u : d.find((e) => e.value === r)?.label || u, [c, r, d, u, n, p]);
  return /* @__PURE__ */ l(T, { open: f, onOpenChange: s, modal: N, children: [
    /* @__PURE__ */ o(X, { asChild: !0, children: /* @__PURE__ */ l(
      G,
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
          O,
          {
            role: "button",
            "aria-label": "Expand dropdown",
            className: "!h-4.5 !w-4.5 cursor-pointer group-data-[state=open]:rotate-180 transition-transform ms-auto"
          }
        ),
        ...L,
        children: [
          /* @__PURE__ */ o("span", { className: "text-start text-ellipsis whitespace-nowrap overflow-hidden flex-1 max-w-[calc(100%-24px)]", children: K }),
          y && r !== void 0 && r !== null ? /* @__PURE__ */ o(
            "span",
            {
              onClick: E,
              className: "p-0 rounded-sm text-xs font-normal transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:bg-muted disabled:text-gray-500 text-primary hover:bg-primary-50 focus:bg-transparent focus:ring active:bg-primary-50 active:text-primary-700 [&>svg]:h-4.5 [&>svg]:w-4.5",
              role: "button",
              "aria-label": "Clear selection",
              children: /* @__PURE__ */ o(M, {})
            }
          ) : null
        ]
      }
    ) }),
    /* @__PURE__ */ o(q, { className: "w-auto p-0", align: "start", onEscapeKeyDown: () => s(!1), onOpenAutoFocus: F, children: /* @__PURE__ */ l(
      z,
      {
        className: "w-[--radix-popper-anchor-width] focus-visible:outline-none",
        filter: I,
        defaultValue: r != null ? String(r) : void 0,
        ref: b,
        children: [
          m && /* @__PURE__ */ o(H, { placeholder: g, onKeyDown: D }),
          P,
          /* @__PURE__ */ l(J, { children: [
            !n && /* @__PURE__ */ o(Q, { children: C }),
            !n && !d.length ? /* @__PURE__ */ o(x, { value: "8fdcaeb67c8ad943c80fe54c3b1059b700d9254389a38a4a1fc39a6eee7564623", disabled: !0, children: k }) : null,
            /* @__PURE__ */ o(U, { children: d.map((e) => /* @__PURE__ */ l(
              x,
              {
                value: e.value,
                keywords: "keyword" in e ? [e.keyword] : [e.label],
                onSelect: j,
                children: [
                  e.label,
                  /* @__PURE__ */ o(S, { className: h("ml-auto", r === e.value ? "opacity-100" : "opacity-0") })
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
  oe as Combobox
};
//# sourceMappingURL=combobox.es.js.map
