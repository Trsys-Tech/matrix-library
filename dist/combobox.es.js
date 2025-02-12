import { jsxs as c, jsx as r } from "react/jsx-runtime";
import t, { useEffect as E } from "react";
import { cn as f } from "./utils.es.js";
import { Button as j } from "./button.es.js";
import { ChevronDown as D, Check as K } from "@trsys-tech/matrix-icons";
import { Popover as _, PopoverTrigger as B, PopoverContent as T } from "./popover.es.js";
import { Command as F, CommandInput as G, CommandList as R, CommandEmpty as q, CommandItem as b, CommandGroup as z } from "./command.es.js";
const W = ({
  onValueChange: n,
  options: i,
  value: l,
  className: h,
  closeOnSelect: d = !0,
  loading: s,
  disabled: w,
  placeholder: v = "Select an option",
  searchText: x = "Search...",
  noResultsText: y = "No results found",
  loadingText: g = "Loading...",
  emptyOptionsText: C = "No Items",
  ...k
}) => {
  const [u, o] = t.useState(!1), [a, m] = t.useState(l), N = t.useCallback(
    (e) => {
      e.key === "Enter" ? o(!0) : e.key === "Backspace" && !e.currentTarget.value && (m(a), n?.(a), d && o(!1));
    },
    [a, n, d]
  ), I = t.useCallback(
    (e) => {
      m(e), n?.(e), d && o(!1);
    },
    [n, d]
  ), L = t.useCallback((e, P, S = [""]) => S.join("").toLocaleLowerCase().includes(P.toLocaleLowerCase()) ? 1 : 0, []);
  E(() => {
    m(l);
  }, [l]);
  const p = a === void 0 || a === "";
  return /* @__PURE__ */ c(_, { open: u, onOpenChange: o, children: [
    /* @__PURE__ */ r(B, { asChild: !0, children: /* @__PURE__ */ r(
      j,
      {
        variant: "text",
        role: "combobox",
        "aria-expanded": u,
        className: f(
          "group flex h-8 w-full items-center justify-between whitespace-nowrap rounded-sm border border-input bg-transparent px-3 py-1.5 text-sm ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-gray-100 [&>span]:line-clamp-1 [&_svg]:disabled:text-text-300",
          // showPlaceholder ? "text-muted-foreground" : "",
          h
        ),
        "data-value": a,
        "data-placeholder": p ? "" : void 0,
        loading: s,
        disabled: w,
        endIcon: /* @__PURE__ */ r(
          D,
          {
            role: "button",
            "aria-label": "Expand dropdown",
            className: "!h-4.5 !w-4.5 cursor-pointer group-data-[state=open]:rotate-180 transition-transform ms-auto"
          }
        ),
        ...k,
        children: p ? s ? g : v : i.find((e) => e.value === a)?.label
      }
    ) }),
    /* @__PURE__ */ r(T, { className: "w-auto p-0", align: "start", onEscapeKeyDown: () => o(!1), children: /* @__PURE__ */ c(F, { className: "w-[--radix-popper-anchor-width]", filter: L, children: [
      /* @__PURE__ */ r(G, { placeholder: x, onKeyDown: N }),
      /* @__PURE__ */ c(R, { children: [
        !s && /* @__PURE__ */ r(q, { children: y }),
        !s && !i.length ? /* @__PURE__ */ r(b, { value: "8fdcaeb67c8ad943c80fe54c3b1059b700d9254389a38a4a1fc39a6eee7564623", disabled: !0, children: C }) : null,
        /* @__PURE__ */ r(z, { children: i.map((e) => /* @__PURE__ */ c(
          b,
          {
            value: e.value,
            keywords: [e.label],
            onSelect: I,
            children: [
              e.label,
              /* @__PURE__ */ r(K, { className: f("ml-auto", l === e.value ? "opacity-100" : "opacity-0") })
            ]
          },
          String(e.value)
        )) })
      ] })
    ] }) })
  ] });
};
export {
  W as Combobox
};
//# sourceMappingURL=combobox.es.js.map
