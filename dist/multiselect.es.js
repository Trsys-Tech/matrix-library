import { jsxs as l, jsx as r, Fragment as S } from "react/jsx-runtime";
import * as s from "react";
import { tv as re } from "tailwind-variants";
import { XMark as M, CircleXmark as te, ChevronDown as ae, Check as I } from "@trsys-tech/matrix-icons";
import { cn as p } from "./utils.es.js";
import { Badge as D } from "./badge.es.js";
import { Button as se } from "./button.es.js";
import { Separator as T } from "./separator.es.js";
import { Popover as le, PopoverTrigger as oe, PopoverContent as ne } from "./popover.es.js";
import { Command as ce, CommandInput as ie, CommandList as de, CommandEmpty as ue, CommandGroup as A, CommandItem as y, CommandSeparator as me } from "./command.es.js";
const R = re({
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
}), pe = ({
  options: u,
  onValueChange: o,
  value: w,
  variant: k,
  disabled: C,
  defaultValue: B = [],
  placeholder: K = "Select options",
  maxCount: m = 3,
  modalPopover: L = !1,
  // asChild = false,
  className: z,
  moreText: V = "more",
  clearText: W = "Clear",
  closeText: X = "Close",
  selectAllText: $ = "Select All",
  noResultsText: G = "No results found.",
  searchText: O = "Search...",
  addOptionOnSearchNotFound: f = !1,
  showSelectAll: q = !0,
  loading: h,
  loadingText: b = "Loading...",
  ...H
}, J) => {
  const [t, c] = s.useState(B ?? w), [Q, d] = s.useState(!1), g = s.useRef(null), [U, j] = s.useState(""), [Y, P] = s.useState(!1), [n, x] = s.useState(
    new Map(u.map((e) => [e.value, e]))
  ), Z = s.useCallback(
    (e) => {
      if (e.key === "Enter" && f) {
        if (d(!0), e.preventDefault(), e.stopPropagation(), !e.currentTarget.value) return;
        const a = { value: e.currentTarget.value, label: e.currentTarget.value };
        if (n.get(a.value) === void 0) {
          x((N) => new Map(N).set(a.value, a));
          const i = [...t, a.value];
          c(i), o(i), j("");
        }
      } else if (e.key === "Enter")
        d(!0);
      else if (e.key === "Backspace" && !e.currentTarget.value) {
        const a = [...t];
        a.pop(), c(a), o(a);
      }
    },
    [f, o, n, t]
  ), E = s.useCallback(
    (e) => {
      const a = t.includes(e) ? t.filter((i) => i !== e) : [...t, e];
      c(a), o(a);
    },
    [o, t]
  ), v = s.useCallback(() => {
    c([]), o([]), f && x(new Map(u.map((e) => [e.value, e])));
  }, [o, f, u]), F = s.useCallback(() => {
    d((e) => !e);
  }, []), _ = s.useCallback(() => {
    const e = t.slice(0, m);
    c(e), o(e);
  }, [m, t, o]), ee = s.useCallback(() => {
    if (t.length === n.size)
      v();
    else {
      const e = Array.from(n.keys());
      c(e), o(e);
    }
  }, [v, o, n, t.length]);
  return s.useEffect(() => {
    x(new Map(u.map((e) => [e.value, e])));
  }, [u]), s.useEffect(() => {
    c(w ?? []);
  }, [w]), s.useLayoutEffect(() => {
    g.current && (g?.current?.firstChild?.offsetTop < g?.current?.lastChild?.offsetTop ? P(!0) : P(!1));
  }, [t]), /* @__PURE__ */ l(le, { open: Q, onOpenChange: d, modal: L, children: [
    /* @__PURE__ */ r(oe, { asChild: !0, children: /* @__PURE__ */ r(
      se,
      {
        ref: J,
        variant: "text",
        loading: h,
        disabled: C,
        ...H,
        onClick: F,
        className: p(
          "group flex max-h-14 h-8 w-full items-center justify-between whitespace-nowrap rounded-sm border border-input bg-transparent px-3 py-1.5 text-sm ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-gray-100 [&>span]:line-clamp-1 [&_svg]:disabled:text-text-300",
          Y && "h-auto",
          z
        ),
        "data-placeholder": t.length ? void 0 : "",
        endIcon: /* @__PURE__ */ r(
          ae,
          {
            role: "button",
            "aria-label": "Expand dropdown",
            className: "!h-4.5 !w-4.5 cursor-pointer group-data-[state=open]:rotate-180 transition-transform"
          }
        ),
        children: /* @__PURE__ */ r(S, { children: t.length > 0 ? /* @__PURE__ */ l("div", { className: "flex justify-between items-center w-full", children: [
          /* @__PURE__ */ l("div", { className: "flex flex-wrap items-center gap-2", ref: g, children: [
            t.slice(0, m).map((e) => {
              const a = n.get(e), i = a?.icon;
              return /* @__PURE__ */ l(D, { className: p(R({ variant: k }), { "text-gray-400 bg-gray-200": C || h }), children: [
                /* @__PURE__ */ r(
                  M,
                  {
                    className: "h-4 w-4 cursor-pointer",
                    onClick: (N) => {
                      N.stopPropagation(), E(e);
                    }
                  }
                ),
                i && /* @__PURE__ */ r(i, { className: "h-4 w-4 mr-2" }),
                a?.label
              ] }, e);
            }),
            t.length > m && /* @__PURE__ */ l(D, { className: p(R({ variant: k })), children: [
              `+ ${t.length - m} ${V}`,
              /* @__PURE__ */ r(
                te,
                {
                  role: "button",
                  className: "ml-2 h-4.5 w-4.5 cursor-pointer",
                  onClick: (e) => {
                    e.stopPropagation(), _();
                  }
                }
              )
            ] }),
            h && b ? b : null
          ] }),
          /* @__PURE__ */ l("div", { className: "flex items-center justify-between gap-1", children: [
            /* @__PURE__ */ r(
              M,
              {
                role: "button",
                className: "h-5 w-5 text-muted-foreground cursor-pointer",
                onClick: (e) => {
                  e.stopPropagation(), v();
                },
                "aria-label": "Clear"
              }
            ),
            /* @__PURE__ */ r(T, { orientation: "vertical", className: "flex min-h-5 h-full" })
          ] })
        ] }) : /* @__PURE__ */ r(S, { children: h && b ? b : K }) })
      }
    ) }),
    /* @__PURE__ */ r(ne, { className: "w-auto p-0", align: "start", onEscapeKeyDown: () => d(!1), children: /* @__PURE__ */ l(ce, { className: "w-[--radix-popper-anchor-width] max-h-[--radix-popper-available-height]", children: [
      /* @__PURE__ */ r(ie, { placeholder: O, onKeyDown: Z, value: U, onValueChange: j }),
      /* @__PURE__ */ l(de, { className: "", children: [
        /* @__PURE__ */ r(ue, { children: G }),
        /* @__PURE__ */ l(A, { children: [
          q && /* @__PURE__ */ l(y, { onSelect: ee, className: "cursor-pointer", children: [
            /* @__PURE__ */ r(
              "div",
              {
                className: p(
                  "mr-2 flex h-4.5 w-4.5 items-center justify-center rounded-sm border border-primary",
                  t.length === n.size ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"
                ),
                children: /* @__PURE__ */ r(I, { className: "h-4.5 w-4.5" })
              }
            ),
            /* @__PURE__ */ l("span", { children: [
              "(",
              $,
              ")"
            ] })
          ] }, "all"),
          Array.from(n.values()).map((e) => {
            const a = t.includes(e.value);
            return /* @__PURE__ */ l(y, { onSelect: () => E(e.value), className: "cursor-pointer", children: [
              /* @__PURE__ */ r(
                "div",
                {
                  className: p(
                    "mr-2 flex h-4.5 w-4.5 items-center justify-center rounded-sm border border-primary",
                    a ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"
                  ),
                  children: /* @__PURE__ */ r(I, { className: "h-4.5 w-4.5" })
                }
              ),
              e.icon && /* @__PURE__ */ r(e.icon, { className: "mr-2 h-4.5 w-4.5 text-muted-foreground" }),
              /* @__PURE__ */ r("span", { children: e.label })
            ] }, e.value);
          })
        ] }),
        /* @__PURE__ */ r(me, {}),
        /* @__PURE__ */ r(A, { children: /* @__PURE__ */ l("div", { className: "flex items-center justify-between", children: [
          t.length > 0 && /* @__PURE__ */ l(S, { children: [
            /* @__PURE__ */ r(y, { onSelect: v, className: "flex-1 justify-center cursor-pointer", children: W }),
            /* @__PURE__ */ r(T, { orientation: "vertical", className: "flex min-h-6 h-full" })
          ] }),
          /* @__PURE__ */ r(y, { onSelect: () => d(!1), className: "flex-1 justify-center cursor-pointer max-w-full", children: X })
        ] }) })
      ] })
    ] }) })
  ] });
}, fe = s.forwardRef(pe);
fe.displayName = "MultiSelect";
export {
  fe as MultiSelect
};
//# sourceMappingURL=multiselect.es.js.map
