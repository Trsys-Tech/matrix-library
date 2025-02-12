import { jsxs as a, jsx as r, Fragment as x } from "react/jsx-runtime";
import * as s from "react";
import { tv as H } from "tailwind-variants";
import { ChevronDown as J, XMark as k, CircleXmark as Q, Check as j } from "@trsys-tech/matrix-icons";
import { cn as d } from "./utils.es.js";
import { Badge as P } from "./badge.es.js";
import { Button as U } from "./button.es.js";
import { Separator as E } from "./separator.es.js";
import { Popover as Y, PopoverTrigger as Z, PopoverContent as ee } from "./popover.es.js";
import { Command as re, CommandInput as te, CommandList as ae, CommandEmpty as oe, CommandGroup as I, CommandItem as g, CommandSeparator as se } from "./command.es.js";
const O = H({
  base: "flex gap-1 items-center py-0.5 px-2 rounded-xl",
  variants: {
    variant: {
      default: "border-none shadow-none bg-primary-50 text-primary hover:bg-primary-50",
      secondary: "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      inverted: "inverted"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), le = s.forwardRef(
  ({
    options: n,
    onValueChange: c,
    value: b,
    variant: w,
    disabled: N,
    defaultValue: D = [],
    placeholder: R = "Select options",
    maxCount: m = 3,
    modalPopover: V = !1,
    // asChild = false,
    className: B,
    moreText: K = "more",
    clearText: L = "Clear",
    closeText: M = "Close",
    selectAllText: _ = "Select All",
    noResultsText: A = "No results found.",
    loading: p,
    loadingText: u = "Loading...",
    ...T
  }, W) => {
    const [t, l] = s.useState(D ?? b), [X, i] = s.useState(!1), f = s.useRef(null), [$, S] = s.useState(!1);
    s.useEffect(() => {
      l(b ?? []);
    }, [b]);
    const F = (e) => {
      if (e.key === "Enter")
        i(!0);
      else if (e.key === "Backspace" && !e.currentTarget.value) {
        const o = [...t];
        o.pop(), l(o), c(o);
      }
    }, C = (e) => {
      const o = t.includes(e) ? t.filter((h) => h !== e) : [...t, e];
      l(o), c(o);
    }, y = () => {
      l([]), c([]);
    }, G = () => {
      i((e) => !e);
    }, q = () => {
      const e = t.slice(0, m);
      l(e), c(e);
    }, z = () => {
      if (t.length === n.length)
        y();
      else {
        const e = n.map((o) => o.value);
        l(e), c(e);
      }
    };
    return s.useLayoutEffect(() => {
      f.current && (f?.current?.firstChild?.offsetTop < f?.current?.lastChild?.offsetTop ? S(!0) : S(!1));
    }, [t]), /* @__PURE__ */ a(Y, { open: X, onOpenChange: i, modal: V, children: [
      /* @__PURE__ */ r(Z, { asChild: !0, children: /* @__PURE__ */ r(
        U,
        {
          ref: W,
          variant: "text",
          loading: p,
          disabled: N,
          ...T,
          onClick: G,
          className: d(
            "group flex max-h-14 h-8 w-full items-center justify-between whitespace-nowrap rounded-sm border border-input bg-transparent px-3 py-1.5 text-sm ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-gray-100 [&>span]:line-clamp-1 [&_svg]:disabled:text-text-300",
            $ && "h-auto",
            B
          ),
          "data-placeholder": t.length ? void 0 : "",
          endIcon: /* @__PURE__ */ r(
            J,
            {
              role: "button",
              "aria-label": "Expand dropdown",
              className: "!h-4.5 !w-4.5 cursor-pointer group-data-[state=open]:rotate-180 transition-transform"
            }
          ),
          children: /* @__PURE__ */ r(x, { children: t.length > 0 ? /* @__PURE__ */ a("div", { className: "flex justify-between items-center w-full", children: [
            /* @__PURE__ */ a("div", { className: "flex flex-wrap items-center gap-2", ref: f, children: [
              t.slice(0, m).map((e) => {
                const o = n.find((v) => v.value === e), h = o?.icon;
                return /* @__PURE__ */ a(P, { className: d(O({ variant: w }), { "text-gray-400 bg-gray-200": N || p }), children: [
                  /* @__PURE__ */ r(
                    k,
                    {
                      className: "h-4 w-4 cursor-pointer",
                      onClick: (v) => {
                        v.stopPropagation(), C(e);
                      }
                    }
                  ),
                  h && /* @__PURE__ */ r(h, { className: "h-4 w-4 mr-2" }),
                  o?.label
                ] }, e);
              }),
              t.length > m && /* @__PURE__ */ a(P, { className: d(O({ variant: w })), children: [
                `+ ${t.length - m} ${K}`,
                /* @__PURE__ */ r(
                  Q,
                  {
                    role: "button",
                    className: "ml-2 h-4.5 w-4.5 cursor-pointer",
                    onClick: (e) => {
                      e.stopPropagation(), q();
                    }
                  }
                )
              ] }),
              p && u ? u : null
            ] }),
            /* @__PURE__ */ a("div", { className: "flex items-center justify-between gap-1", children: [
              /* @__PURE__ */ r(
                k,
                {
                  role: "button",
                  className: "h-5 w-5 text-muted-foreground cursor-pointer",
                  onClick: (e) => {
                    e.stopPropagation(), y();
                  },
                  "aria-label": "Clear"
                }
              ),
              /* @__PURE__ */ r(E, { orientation: "vertical", className: "flex min-h-5 h-full" })
            ] })
          ] }) : /* @__PURE__ */ r(x, { children: p && u ? u : R }) })
        }
      ) }),
      /* @__PURE__ */ r(ee, { className: "w-auto p-0", align: "start", onEscapeKeyDown: () => i(!1), children: /* @__PURE__ */ a(re, { className: "w-[--radix-popper-anchor-width]", children: [
        /* @__PURE__ */ r(te, { placeholder: "Search...", onKeyDown: F }),
        /* @__PURE__ */ a(ae, { className: "max-h-[--radix-popper-available-height]", children: [
          /* @__PURE__ */ r(oe, { children: A }),
          /* @__PURE__ */ a(I, { children: [
            /* @__PURE__ */ a(g, { onSelect: z, className: "cursor-pointer", children: [
              /* @__PURE__ */ r(
                "div",
                {
                  className: d(
                    "mr-2 flex h-4.5 w-4.5 items-center justify-center rounded-sm border border-primary",
                    t.length === n.length ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"
                  ),
                  children: /* @__PURE__ */ r(j, { className: "h-4.5 w-4.5" })
                }
              ),
              /* @__PURE__ */ a("span", { children: [
                "(",
                _,
                ")"
              ] })
            ] }, "all"),
            n.map((e) => {
              const o = t.includes(e.value);
              return /* @__PURE__ */ a(g, { onSelect: () => C(e.value), className: "cursor-pointer", children: [
                /* @__PURE__ */ r(
                  "div",
                  {
                    className: d(
                      "mr-2 flex h-4.5 w-4.5 items-center justify-center rounded-sm border border-primary",
                      o ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"
                    ),
                    children: /* @__PURE__ */ r(j, { className: "h-4.5 w-4.5" })
                  }
                ),
                e.icon && /* @__PURE__ */ r(e.icon, { className: "mr-2 h-4.5 w-4.5 text-muted-foreground" }),
                /* @__PURE__ */ r("span", { children: e.label })
              ] }, e.value);
            })
          ] }),
          /* @__PURE__ */ r(se, {}),
          /* @__PURE__ */ r(I, { children: /* @__PURE__ */ a("div", { className: "flex items-center justify-between", children: [
            t.length > 0 && /* @__PURE__ */ a(x, { children: [
              /* @__PURE__ */ r(g, { onSelect: y, className: "flex-1 justify-center cursor-pointer", children: L }),
              /* @__PURE__ */ r(E, { orientation: "vertical", className: "flex min-h-6 h-full" })
            ] }),
            /* @__PURE__ */ r(g, { onSelect: () => i(!1), className: "flex-1 justify-center cursor-pointer max-w-full", children: M })
          ] }) })
        ] })
      ] }) })
    ] });
  }
);
le.displayName = "MultiSelect";
export {
  le as MultiSelect
};
//# sourceMappingURL=multiselect.es.js.map
