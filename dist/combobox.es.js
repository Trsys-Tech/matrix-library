import { jsxs as s, jsx as a } from "react/jsx-runtime";
import t, { useRef as A, useEffect as B, useMemo as M } from "react";
import { XMark as O, ChevronDown as G, Check as T } from "@trsys-tech/matrix-icons";
import { cn as x } from "./utils.es.js";
import { Button as X } from "./button.es.js";
import { Popover as q, PopoverTrigger as z, PopoverContent as H } from "./popover.es.js";
import { Command as J, CommandInput as Q, CommandList as U, CommandEmpty as W, CommandItem as w, CommandGroup as Y } from "./command.es.js";
const oe = ({
  onValueChange: o,
  options: d,
  value: m,
  className: y,
  clearable: g = !1,
  closeOnSelect: i = !0,
  loading: n,
  disabled: C,
  placeholder: p = "Select an option",
  searchText: k = "Search...",
  noResultsText: N = "No results found",
  loadingText: b = "Loading...",
  emptyOptionsText: P = "No Items",
  showSearchInput: f = !0,
  modalPopover: L,
  ...D
}) => {
  const [v, l] = t.useState(!1), h = A(null), [r, c] = t.useState(m), E = t.useCallback(
    (e) => {
      e.key === "Enter" ? l(!0) : e.key === "Backspace" && !e.currentTarget.value && (c(r), o?.(r), i && l(!1));
    },
    [r, o, i]
  ), S = t.useCallback(
    (e) => {
      c(e), o?.(e), i && l(!1);
    },
    [o, i]
  ), j = t.useCallback(
    (e) => {
      e.stopPropagation(), o?.(void 0), c(void 0);
    },
    [o]
  ), I = t.useCallback((e, R, _ = [""]) => _.join("").toLocaleLowerCase().includes(R.toLocaleLowerCase()) ? 1 : 0, []), F = t.useCallback(
    (e) => {
      f || (e.preventDefault(), h.current?.focus());
    },
    [f]
  );
  B(() => {
    c(m);
  }, [m]);
  const u = r === void 0 || r === "", K = M(() => u && n ? b : u ? p : d.find((e) => e.value === r)?.label || p, [u, r, d, p, n, b]);
  return /* @__PURE__ */ s(q, { open: v, onOpenChange: l, modal: L, children: [
    /* @__PURE__ */ a(z, { asChild: !0, children: /* @__PURE__ */ s(
      X,
      {
        variant: "text",
        role: "combobox",
        type: "button",
        "aria-expanded": v,
        className: x(
          "group flex h-8 w-full items-center justify-between whitespace-nowrap overflow-hidden rounded-sm border border-input bg-transparent px-3 py-1.5 text-xs ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-gray-100 [&_svg]:disabled:text-text-300",
          y
        ),
        "data-value": r,
        "data-placeholder": u ? "" : void 0,
        loading: n,
        disabled: C,
        endIcon: /* @__PURE__ */ a(
          G,
          {
            role: "button",
            "aria-label": "Expand dropdown",
            className: "!h-4.5 !w-4.5 cursor-pointer group-data-[state=open]:rotate-180 transition-transform ms-auto"
          }
        ),
        ...D,
        children: [
          /* @__PURE__ */ a("span", { className: "text-start text-ellipsis whitespace-nowrap overflow-hidden flex-1 max-w-[calc(100%-24px)]", children: K }),
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
    /* @__PURE__ */ a(H, { className: "w-auto p-0", align: "start", onEscapeKeyDown: () => l(!1), onOpenAutoFocus: F, children: /* @__PURE__ */ s(
      J,
      {
        className: "w-[--radix-popper-anchor-width] focus-visible:outline-none",
        filter: I,
        defaultValue: r != null ? String(r) : void 0,
        ref: h,
        children: [
          f && /* @__PURE__ */ a(Q, { placeholder: k, onKeyDown: E }),
          /* @__PURE__ */ s(U, { children: [
            !n && /* @__PURE__ */ a(W, { children: N }),
            !n && !d.length ? /* @__PURE__ */ a(w, { value: "8fdcaeb67c8ad943c80fe54c3b1059b700d9254389a38a4a1fc39a6eee7564623", disabled: !0, children: P }) : null,
            /* @__PURE__ */ a(Y, { children: d.map((e) => /* @__PURE__ */ s(
              w,
              {
                value: e.value,
                keywords: "keyword" in e ? [e.keyword] : [e.label],
                onSelect: S,
                children: [
                  e.label,
                  /* @__PURE__ */ a(T, { className: x("ml-auto", r === e.value ? "opacity-100" : "opacity-0") })
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
