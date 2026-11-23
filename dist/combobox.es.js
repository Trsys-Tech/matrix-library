import { jsxs as c, jsx as a } from "react/jsx-runtime";
import o, { useRef as W, useMemo as D } from "react";
import { XMark as Y, ChevronDown as Z, Plus as $, Check as V } from "@trsys-tech/matrix-icons";
import { cn as O } from "./utils.es.js";
import { Button as tt } from "./button.es.js";
import { Popover as et, PopoverTrigger as rt, PopoverContent as at } from "./popover.es.js";
import { Command as ot, CommandInput as nt, CommandList as mt, CommandEmpty as st, CommandItem as E, CommandGroup as it } from "./command.es.js";
const S = (e) => "keyword" in e ? e.keyword : e.label, u = (e) => e.trim().toLocaleLowerCase(), bt = ({
  onValueChange: e,
  options: f,
  value: r,
  className: j,
  clearable: I = !1,
  closeOnSelect: m = !0,
  loading: i,
  disabled: K,
  placeholder: b = "Select an option",
  searchText: L = "Search...",
  noResultsText: R = "No results found",
  loadingText: k = "Loading...",
  emptyOptionsText: _ = "No Items",
  showSearchInput: h = !0,
  addOptionOnSearchNotFound: y = !1,
  modalPopover: z,
  extraContent: B,
  ...M
}) => {
  const [C, T] = o.useState(!1), g = W(null), [P, v] = o.useState(""), [N, q] = o.useState([]), l = D(
    () => [...f, ...N.filter((t) => !f.some((s) => s.value === t.value))],
    [f, N]
  ), d = P.trim(), A = u(d), x = !!d && !l.some(
    (t) => u(String(t.value)) === A || u(S(t)) === A
  ), n = o.useCallback((t) => {
    T(t), t || v("");
  }, []), w = o.useCallback(() => {
    if (!x) return;
    const t = { label: d, value: d };
    q((s) => [...s, t]), e?.(t.value), v(""), m && n(!1);
  }, [x, d, e, m, n]), F = o.useCallback(
    (t) => {
      if (t.key === "Enter" && y && x) {
        if (t.nativeEvent.isComposing || t.keyCode === 229 || g.current?.querySelector('[cmdk-item][aria-selected="true"]:not([aria-disabled="true"])')) return;
        t.preventDefault(), t.stopPropagation(), w();
      } else t.key === "Backspace" && !t.currentTarget.value && (e?.(r), m && n(!1));
    },
    [e, m, r, y, x, w, n]
  ), G = o.useCallback(
    (t) => {
      e?.(t), m && n(!1);
    },
    [e, m, n]
  ), X = o.useCallback(
    (t) => {
      t.stopPropagation(), e?.(void 0);
    },
    [e]
  ), H = o.useCallback((t, s, U = [""]) => u(U.join("")).includes(u(s)) ? 1 : 0, []), J = o.useCallback(
    (t) => {
      h || (t.preventDefault(), g.current?.focus());
    },
    [h]
  ), p = r === void 0 || r === "", Q = D(() => p && i ? k : p ? b : l.find((t) => t.value === r)?.label || b, [p, r, l, b, i, k]);
  return /* @__PURE__ */ c(et, { open: C, onOpenChange: n, modal: z, children: [
    /* @__PURE__ */ a(rt, { asChild: !0, children: /* @__PURE__ */ c(
      tt,
      {
        variant: "text",
        role: "combobox",
        type: "button",
        "aria-expanded": C,
        className: O(
          "mtx-group mtx-flex mtx-h-8 mtx-w-full mtx-items-center mtx-justify-between mtx-whitespace-nowrap mtx-overflow-hidden mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-px-3 mtx-py-1.5 mtx-text-xs mtx-ring-offset-background data-[placeholder]:mtx-text-muted-foreground hover:mtx-border hover:mtx-border-primary hover:mtx-bg-transparent focus:mtx-border focus:mtx-border-primary focus:mtx-outline-none focus:mtx-ring focus:mtx-ring-primary-100 disabled:mtx-cursor-not-allowed disabled:mtx-bg-gray-100 disabled:mtx-text-text-300 disabled:mtx-border-gray-100 [&_svg]:disabled:mtx-text-text-300",
          j
        ),
        "data-value": r,
        "data-placeholder": p ? "" : void 0,
        loading: i,
        disabled: K,
        endIcon: /* @__PURE__ */ a(
          Z,
          {
            role: "button",
            "aria-label": "Expand dropdown",
            className: "!mtx-h-4.5 !mtx-w-4.5 mtx-cursor-pointer group-data-[state=open]:mtx-rotate-180 mtx-transition-transform mtx-ms-auto"
          }
        ),
        ...M,
        children: [
          /* @__PURE__ */ a("span", { className: "mtx-text-start mtx-text-ellipsis mtx-whitespace-nowrap mtx-overflow-hidden mtx-flex-1 mtx-max-w-[calc(100%-24px)]", children: Q }),
          I && r !== void 0 && r !== null ? /* @__PURE__ */ a(
            "span",
            {
              onClick: X,
              className: "mtx-p-0 mtx-rounded-sm mtx-text-xs mtx-font-normal mtx-transition-colors focus-visible:mtx-outline-none disabled:mtx-pointer-events-none disabled:mtx-bg-muted disabled:mtx-text-gray-500 mtx-text-primary hover:mtx-bg-primary-50 focus:mtx-bg-transparent focus:mtx-ring active:mtx-bg-primary-50 active:mtx-text-primary-700 [&>svg]:mtx-h-4.5 [&>svg]:mtx-w-4.5",
              role: "button",
              "aria-label": "Clear selection",
              children: /* @__PURE__ */ a(Y, {})
            }
          ) : null
        ]
      }
    ) }),
    /* @__PURE__ */ a(at, { className: "mtx-w-auto mtx-p-0", align: "start", onOpenAutoFocus: J, children: /* @__PURE__ */ c(
      ot,
      {
        className: "mtx-w-[--radix-popper-anchor-width] focus-visible:mtx-outline-none",
        filter: H,
        defaultValue: r != null ? String(r) : void 0,
        ref: g,
        children: [
          h && /* @__PURE__ */ a(
            nt,
            {
              placeholder: L,
              onKeyDown: F,
              value: P,
              onValueChange: v,
              endAdornment: y && /* @__PURE__ */ a(
                "button",
                {
                  type: "button",
                  "aria-label": "Add option",
                  disabled: !x,
                  onClick: w,
                  onKeyDown: (t) => {
                    t.key === "Enter" && t.stopPropagation();
                  },
                  className: "mtx-shrink-0 mtx-text-primary disabled:mtx-opacity-50",
                  children: /* @__PURE__ */ a($, { className: "mtx-h-4 mtx-w-4", "aria-hidden": "true" })
                }
              )
            }
          ),
          B,
          /* @__PURE__ */ c(mt, { children: [
            !i && /* @__PURE__ */ a(st, { children: R }),
            !i && !l.length ? /* @__PURE__ */ a(E, { value: "8fdcaeb67c8ad943c80fe54c3b1059b700d9254389a38a4a1fc39a6eee7564623", disabled: !0, children: _ }) : null,
            /* @__PURE__ */ a(it, { children: l.map((t) => /* @__PURE__ */ c(
              E,
              {
                value: t.value,
                keywords: [S(t)],
                onSelect: G,
                children: [
                  t.label,
                  /* @__PURE__ */ a(V, { className: O("mtx-ml-auto", r === t.value ? "mtx-opacity-100" : "mtx-opacity-0") })
                ]
              },
              String(t.value)
            )) })
          ] })
        ]
      }
    ) })
  ] });
};
export {
  bt as Combobox
};
//# sourceMappingURL=combobox.es.js.map
