import { jsxs as n, jsx as o } from "react/jsx-runtime";
import a, { useRef as K, useEffect as R } from "react";
import { cn as h } from "./utils.es.js";
import { Button as _ } from "./button.es.js";
import { ChevronDown as A, XMark as O, Check as T } from "@trsys-tech/matrix-icons";
import { Popover as z, PopoverTrigger as G, PopoverContent as M } from "./popover.es.js";
import { Command as X, CommandInput as q, CommandList as H, CommandEmpty as J, CommandItem as v, CommandGroup as Q } from "./command.es.js";
import { IconButton as U } from "./iconbutton.es.js";
const ae = ({
  onValueChange: t,
  options: i,
  value: u,
  className: w,
  clearable: x = !1,
  closeOnSelect: s = !0,
  loading: d,
  disabled: y,
  placeholder: C = "Select an option",
  searchText: g = "Search...",
  noResultsText: k = "No results found",
  loadingText: N = "Loading...",
  emptyOptionsText: P = "No Items",
  showSearchInput: p = !0,
  ...L
}) => {
  const [m, l] = a.useState(!1), f = K(null), [r, c] = a.useState(u), D = a.useCallback(
    (e) => {
      e.key === "Enter" ? l(!0) : e.key === "Backspace" && !e.currentTarget.value && (c(r), t?.(r), s && l(!1));
    },
    [r, t, s]
  ), E = a.useCallback(
    (e) => {
      c(e), t?.(e), s && l(!1);
    },
    [t, s]
  ), I = a.useCallback(
    (e) => {
      e.stopPropagation(), c(void 0), t?.(void 0);
    },
    [t]
  ), S = a.useCallback((e, B, F = [""]) => F.join("").toLocaleLowerCase().includes(B.toLocaleLowerCase()) ? 1 : 0, []), j = a.useCallback(
    (e) => {
      p || (e.preventDefault(), f.current?.focus());
    },
    [p]
  );
  R(() => {
    c(u);
  }, [u]);
  const b = r === void 0 || r === "";
  return /* @__PURE__ */ n(z, { open: m, onOpenChange: l, children: [
    /* @__PURE__ */ o(G, { asChild: !0, children: /* @__PURE__ */ n(
      _,
      {
        variant: "text",
        role: "combobox",
        type: "button",
        "aria-expanded": m,
        className: h(
          "group flex h-8 w-full items-center justify-between whitespace-nowrap overflow-hidden rounded-sm border border-input bg-transparent px-3 py-1.5 text-sm ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-gray-100 [&_svg]:disabled:text-text-300",
          w
        ),
        "data-value": r,
        "data-placeholder": b ? "" : void 0,
        loading: d,
        disabled: y,
        endIcon: /* @__PURE__ */ o(
          A,
          {
            role: "button",
            "aria-label": "Expand dropdown",
            className: "!h-4.5 !w-4.5 cursor-pointer group-data-[state=open]:rotate-180 transition-transform ms-auto"
          }
        ),
        ...L,
        children: [
          /* @__PURE__ */ o("span", { className: "text-start text-ellipsis whitespace-nowrap overflow-hidden flex-1 max-w-[calc(100%-24px)]", children: b ? d ? N : C : i.find((e) => e.value === r)?.label }),
          x && r !== void 0 ? /* @__PURE__ */ o(
            U,
            {
              onClick: I,
              className: "p-0 [&>svg]:h-4.5 [&>svg]:w-4.5",
              type: "button",
              size: "sm",
              variant: "toolbar",
              "aria-label": "Clear selection",
              children: /* @__PURE__ */ o(O, {})
            }
          ) : null
        ]
      }
    ) }),
    /* @__PURE__ */ o(M, { className: "w-auto p-0", align: "start", onEscapeKeyDown: () => l(!1), onOpenAutoFocus: j, children: /* @__PURE__ */ n(
      X,
      {
        className: "w-[--radix-popper-anchor-width] focus-visible:outline-none",
        filter: S,
        defaultValue: r !== void 0 ? String(r) : void 0,
        ref: f,
        children: [
          p && /* @__PURE__ */ o(q, { placeholder: g, onKeyDown: D }),
          /* @__PURE__ */ n(H, { children: [
            !d && /* @__PURE__ */ o(J, { children: k }),
            !d && !i.length ? /* @__PURE__ */ o(v, { value: "8fdcaeb67c8ad943c80fe54c3b1059b700d9254389a38a4a1fc39a6eee7564623", disabled: !0, children: P }) : null,
            /* @__PURE__ */ o(Q, { children: i.map((e) => /* @__PURE__ */ n(
              v,
              {
                value: e.value,
                keywords: [e.label],
                onSelect: E,
                children: [
                  e.label,
                  /* @__PURE__ */ o(T, { className: h("ml-auto", r === e.value ? "opacity-100" : "opacity-0") })
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
