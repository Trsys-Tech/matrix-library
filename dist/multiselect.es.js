import { jsxs as s, jsx as r, Fragment as S } from "react/jsx-runtime";
import * as l from "react";
import { tv as ae } from "tailwind-variants";
import { XMark as I, CircleXmark as le, ChevronDown as se, Check as D } from "@trsys-tech/matrix-icons";
import { cn as f } from "./utils.es.js";
import { Badge as T } from "./badge.es.js";
import { Button as oe } from "./button.es.js";
import { Separator as A } from "./separator.es.js";
import { Popover as ne, PopoverTrigger as ce, PopoverContent as ie } from "./popover.es.js";
import { Command as de, CommandInput as ue, CommandList as me, CommandEmpty as pe, CommandGroup as R, CommandItem as w, CommandSeparator as fe } from "./command.es.js";
const B = ae({
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
}), he = ({
  options: m,
  onValueChange: n,
  value: k,
  variant: C,
  disabled: j,
  defaultValue: K = [],
  placeholder: L = "Select options",
  maxCount: p = 3,
  modalPopover: V = !1,
  // asChild = false,
  className: z,
  moreText: W = "more",
  clearText: X = "Clear",
  closeText: $ = "Close",
  selectAllText: G = "Select All",
  noResultsText: O = "No results found.",
  searchText: q = "Search...",
  addOptionOnSearchNotFound: h = !1,
  showSelectAll: H = !0,
  loading: b,
  loadingText: g = "Loading...",
  ...J
}, Q) => {
  const o = k !== void 0, [U, d] = l.useState(K), t = o ? k : U, [Y, u] = l.useState(!1), v = l.useRef(null), [Z, P] = l.useState(""), [F, M] = l.useState(!1), [c, x] = l.useState(
    new Map(m.map((e) => [e.value, e]))
  ), _ = l.useCallback(
    (e) => {
      if (e.key === "Enter" && h) {
        if (u(!0), e.preventDefault(), e.stopPropagation(), !e.currentTarget.value) return;
        const a = { value: e.currentTarget.value, label: e.currentTarget.value };
        if (c.get(a.value) === void 0) {
          x((N) => new Map(N).set(a.value, a));
          const i = [...t, a.value];
          o || d(i), n(i), P("");
        }
      } else if (e.key === "Enter")
        u(!0);
      else if (e.key === "Backspace" && !e.currentTarget.value) {
        const a = [...t];
        a.pop(), o || d(a), n(a);
      }
    },
    [h, n, c, t, o]
  ), E = l.useCallback(
    (e) => {
      const a = t.includes(e) ? t.filter((i) => i !== e) : [...t, e];
      o || d(a), n(a);
    },
    [n, t, o]
  ), y = l.useCallback(() => {
    o || d([]), n([]), h && x(new Map(m.map((e) => [e.value, e])));
  }, [n, h, m, o]), ee = l.useCallback(() => {
    u((e) => !e);
  }, []), re = l.useCallback(() => {
    const e = t.slice(0, p);
    o || d(e), n(e);
  }, [p, t, n, o]), te = l.useCallback(() => {
    if (t.length === c.size)
      y();
    else {
      const e = Array.from(c.keys());
      o || d(e), n(e);
    }
  }, [y, n, c, t.length, o]);
  return l.useEffect(() => {
    x(new Map(m.map((e) => [e.value, e])));
  }, [m]), l.useLayoutEffect(() => {
    v.current && (v?.current?.firstChild?.offsetTop < v?.current?.lastChild?.offsetTop ? M(!0) : M(!1));
  }, [t]), /* @__PURE__ */ s(ne, { open: Y, onOpenChange: u, modal: V, children: [
    /* @__PURE__ */ r(ce, { asChild: !0, children: /* @__PURE__ */ r(
      oe,
      {
        ref: Q,
        variant: "text",
        loading: b,
        disabled: j,
        ...J,
        onClick: ee,
        className: f(
          "group flex max-h-14 h-8 w-full items-center justify-between whitespace-nowrap rounded-sm border border-input bg-transparent px-3 py-1.5 text-sm ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-gray-100 [&>span]:line-clamp-1 [&_svg]:disabled:text-text-300",
          F && "h-auto",
          z
        ),
        "data-placeholder": t.length ? void 0 : "",
        endIcon: /* @__PURE__ */ r(
          se,
          {
            role: "button",
            "aria-label": "Expand dropdown",
            className: "!h-4.5 !w-4.5 cursor-pointer group-data-[state=open]:rotate-180 transition-transform"
          }
        ),
        children: /* @__PURE__ */ r(S, { children: t.length > 0 ? /* @__PURE__ */ s("div", { className: "flex justify-between items-center w-full", children: [
          /* @__PURE__ */ s("div", { className: "flex flex-wrap items-center gap-2", ref: v, children: [
            t.slice(0, p).map((e) => {
              const a = c.get(e), i = a?.icon;
              return /* @__PURE__ */ s(T, { className: f(B({ variant: C }), { "text-gray-400 bg-gray-200": j || b }), children: [
                /* @__PURE__ */ r(
                  I,
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
            t.length > p && /* @__PURE__ */ s(T, { className: f(B({ variant: C })), children: [
              `+ ${t.length - p} ${W}`,
              /* @__PURE__ */ r(
                le,
                {
                  role: "button",
                  className: "ml-2 h-4.5 w-4.5 cursor-pointer",
                  onClick: (e) => {
                    e.stopPropagation(), re();
                  }
                }
              )
            ] }),
            b && g ? g : null
          ] }),
          /* @__PURE__ */ s("div", { className: "flex items-center justify-between gap-1", children: [
            /* @__PURE__ */ r(
              I,
              {
                role: "button",
                className: "h-5 w-5 text-muted-foreground cursor-pointer",
                onClick: (e) => {
                  e.stopPropagation(), y();
                },
                "aria-label": "Clear"
              }
            ),
            /* @__PURE__ */ r(A, { orientation: "vertical", className: "flex min-h-5 h-full" })
          ] })
        ] }) : /* @__PURE__ */ r(S, { children: b && g ? g : L }) })
      }
    ) }),
    /* @__PURE__ */ r(ie, { className: "w-auto p-0", align: "start", onEscapeKeyDown: () => u(!1), children: /* @__PURE__ */ s(de, { className: "w-[--radix-popper-anchor-width] max-h-[--radix-popper-available-height]", children: [
      /* @__PURE__ */ r(ue, { placeholder: q, onKeyDown: _, value: Z, onValueChange: P }),
      /* @__PURE__ */ s(me, { className: "", children: [
        /* @__PURE__ */ r(pe, { children: O }),
        /* @__PURE__ */ s(R, { children: [
          H && /* @__PURE__ */ s(w, { onSelect: te, className: "cursor-pointer", children: [
            /* @__PURE__ */ r(
              "div",
              {
                className: f(
                  "mr-2 flex h-4.5 w-4.5 items-center justify-center rounded-sm border border-primary",
                  t.length === c.size ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"
                ),
                children: /* @__PURE__ */ r(D, { className: "h-4.5 w-4.5" })
              }
            ),
            /* @__PURE__ */ s("span", { children: [
              "(",
              G,
              ")"
            ] })
          ] }, "all"),
          Array.from(c.values()).map((e) => {
            const a = t.includes(e.value);
            return /* @__PURE__ */ s(w, { onSelect: () => E(e.value), className: "cursor-pointer", children: [
              /* @__PURE__ */ r(
                "div",
                {
                  className: f(
                    "mr-2 flex h-4.5 w-4.5 items-center justify-center rounded-sm border border-primary",
                    a ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"
                  ),
                  children: /* @__PURE__ */ r(D, { className: "h-4.5 w-4.5" })
                }
              ),
              e.icon && /* @__PURE__ */ r(e.icon, { className: "mr-2 h-4.5 w-4.5 text-muted-foreground" }),
              /* @__PURE__ */ r("span", { children: e.label })
            ] }, e.value);
          })
        ] }),
        /* @__PURE__ */ r(fe, {}),
        /* @__PURE__ */ r(R, { children: /* @__PURE__ */ s("div", { className: "flex items-center justify-between", children: [
          t.length > 0 && /* @__PURE__ */ s(S, { children: [
            /* @__PURE__ */ r(w, { onSelect: y, className: "flex-1 justify-center cursor-pointer", children: X }),
            /* @__PURE__ */ r(A, { orientation: "vertical", className: "flex min-h-6 h-full" })
          ] }),
          /* @__PURE__ */ r(w, { onSelect: () => u(!1), className: "flex-1 justify-center cursor-pointer max-w-full", children: $ })
        ] }) })
      ] })
    ] }) })
  ] });
}, be = l.forwardRef(he);
be.displayName = "MultiSelect";
export {
  be as MultiSelect
};
//# sourceMappingURL=multiselect.es.js.map
