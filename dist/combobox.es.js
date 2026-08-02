import { jsxs as s, jsx as r } from "react/jsx-runtime";
import a, { useRef as A, useMemo as B } from "react";
import { XMark as M, ChevronDown as O, Check as S } from "@trsys-tech/matrix-icons";
import { cn as b } from "./utils.es.js";
import { Button as G } from "./button.es.js";
import { Popover as T, PopoverTrigger as X, PopoverContent as q } from "./popover.es.js";
import { Command as z, CommandInput as H, CommandList as J, CommandEmpty as Q, CommandItem as h, CommandGroup as U } from "./command.es.js";
const rt = ({
  onValueChange: o,
  options: l,
  value: e,
  className: w,
  clearable: y = !1,
  closeOnSelect: x = !0,
  loading: m,
  disabled: v,
  placeholder: i = "Select an option",
  searchText: g = "Search...",
  noResultsText: C = "No results found",
  loadingText: u = "Loading...",
  emptyOptionsText: k = "No Items",
  showSearchInput: c = !0,
  modalPopover: N,
  extraContent: P,
  ...L
}) => {
  const [p, n] = a.useState(!1), f = A(null), D = a.useCallback(
    (t) => {
      t.key === "Enter" ? n(!0) : t.key === "Backspace" && !t.currentTarget.value && (o?.(e), x && n(!1));
    },
    [o, x, e]
  ), j = a.useCallback(
    (t) => {
      o?.(t), x && n(!1);
    },
    [o, x]
  ), E = a.useCallback(
    (t) => {
      t.stopPropagation(), o?.(void 0);
    },
    [o]
  ), I = a.useCallback((t, R, _ = [""]) => _.join("").toLocaleLowerCase().includes(R.toLocaleLowerCase()) ? 1 : 0, []), F = a.useCallback(
    (t) => {
      c || (t.preventDefault(), f.current?.focus());
    },
    [c]
  ), d = e === void 0 || e === "", K = B(() => d && m ? u : d ? i : l.find((t) => t.value === e)?.label || i, [d, e, l, i, m, u]);
  return /* @__PURE__ */ s(T, { open: p, onOpenChange: n, modal: N, children: [
    /* @__PURE__ */ r(X, { asChild: !0, children: /* @__PURE__ */ s(
      G,
      {
        variant: "text",
        role: "combobox",
        type: "button",
        "aria-expanded": p,
        className: b(
          "mtx-group mtx-flex mtx-h-8 mtx-w-full mtx-items-center mtx-justify-between mtx-whitespace-nowrap mtx-overflow-hidden mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-px-3 mtx-py-1.5 mtx-text-xs mtx-ring-offset-background data-[placeholder]:mtx-text-muted-foreground hover:mtx-border hover:mtx-border-primary hover:mtx-bg-transparent focus:mtx-border focus:mtx-border-primary focus:mtx-outline-none focus:mtx-ring focus:mtx-ring-primary-100 disabled:mtx-cursor-not-allowed disabled:mtx-bg-gray-100 disabled:mtx-text-text-300 disabled:mtx-border-gray-100 [&_svg]:disabled:mtx-text-text-300",
          w
        ),
        "data-value": e,
        "data-placeholder": d ? "" : void 0,
        loading: m,
        disabled: v,
        endIcon: /* @__PURE__ */ r(
          O,
          {
            role: "button",
            "aria-label": "Expand dropdown",
            className: "!mtx-h-4.5 !mtx-w-4.5 mtx-cursor-pointer group-data-[state=open]:mtx-rotate-180 mtx-transition-transform mtx-ms-auto"
          }
        ),
        ...L,
        children: [
          /* @__PURE__ */ r("span", { className: "mtx-text-start mtx-text-ellipsis mtx-whitespace-nowrap mtx-overflow-hidden mtx-flex-1 mtx-max-w-[calc(100%-24px)]", children: K }),
          y && e !== void 0 && e !== null ? /* @__PURE__ */ r(
            "span",
            {
              onClick: E,
              className: "mtx-p-0 mtx-rounded-sm mtx-text-xs mtx-font-normal mtx-transition-colors focus-visible:mtx-outline-none disabled:mtx-pointer-events-none disabled:mtx-bg-muted disabled:mtx-text-gray-500 mtx-text-primary hover:mtx-bg-primary-50 focus:mtx-bg-transparent focus:mtx-ring active:mtx-bg-primary-50 active:mtx-text-primary-700 [&>svg]:mtx-h-4.5 [&>svg]:mtx-w-4.5",
              role: "button",
              "aria-label": "Clear selection",
              children: /* @__PURE__ */ r(M, {})
            }
          ) : null
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      q,
      {
        className: "mtx-w-auto mtx-p-0",
        align: "start",
        onEscapeKeyDown: () => n(!1),
        onOpenAutoFocus: F,
        children: /* @__PURE__ */ s(
          z,
          {
            className: "mtx-w-[--radix-popper-anchor-width] focus-visible:mtx-outline-none",
            filter: I,
            defaultValue: e != null ? String(e) : void 0,
            ref: f,
            children: [
              c && /* @__PURE__ */ r(H, { placeholder: g, onKeyDown: D }),
              P,
              /* @__PURE__ */ s(J, { children: [
                !m && /* @__PURE__ */ r(Q, { children: C }),
                !m && !l.length ? /* @__PURE__ */ r(h, { value: "8fdcaeb67c8ad943c80fe54c3b1059b700d9254389a38a4a1fc39a6eee7564623", disabled: !0, children: k }) : null,
                /* @__PURE__ */ r(U, { children: l.map((t) => /* @__PURE__ */ s(
                  h,
                  {
                    value: t.value,
                    keywords: "keyword" in t ? [t.keyword] : [t.label],
                    onSelect: j,
                    children: [
                      t.label,
                      /* @__PURE__ */ r(S, { className: b("mtx-ml-auto", e === t.value ? "mtx-opacity-100" : "mtx-opacity-0") })
                    ]
                  },
                  String(t.value)
                )) })
              ] })
            ]
          }
        )
      }
    )
  ] });
};
export {
  rt as Combobox
};
//# sourceMappingURL=combobox.es.js.map
