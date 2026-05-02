import { jsxs as l, jsx as t, Fragment as S } from "react/jsx-runtime";
import * as a from "react";
import { tv as me } from "tailwind-variants";
import { XMark as I, CircleXmark as ae, ChevronDown as le, Check as D } from "@trsys-tech/matrix-icons";
import { cn as p } from "./utils.es.js";
import { Badge as T } from "./badge.es.js";
import { Button as se } from "./button.es.js";
import { Separator as A } from "./separator.es.js";
import { Popover as oe, PopoverTrigger as ne, PopoverContent as ce } from "./popover.es.js";
import { Command as xe, CommandInput as ie, CommandList as de, CommandEmpty as ue, CommandGroup as R, CommandItem as y, CommandSeparator as pe } from "./command.es.js";
const B = me({
  base: "mtx-flex mtx-gap-1 mtx-items-center mtx-py-0.5 mtx-px-2 mtx-rounded-xl",
  variants: {
    variant: {
      default: "mtx-border-none mtx-shadow-none mtx-bg-primary-50 mtx-text-primary hover:mtx-bg-primary-50",
      secondary: "mtx-border-foreground/10 mtx-bg-secondary mtx-text-secondary-foreground hover:mtx-bg-secondary/80",
      destructive: "mtx-border-transparent mtx-bg-destructive mtx-text-destructive-foreground hover:mtx-bg-destructive/80",
      inverted: "mtx-inverted"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), fe = ({
  options: d,
  onValueChange: o,
  value: k,
  variant: C,
  disabled: j,
  defaultValue: K = [],
  placeholder: L = "Select options",
  maxCount: u = 3,
  modalPopover: V = !1,
  // asChild = false,
  className: z,
  moreText: W = "more",
  clearText: X = "Clear",
  closeText: $ = "Close",
  selectAllText: G = "Select All",
  noResultsText: O = "No results found.",
  searchText: q = "Search...",
  addOptionOnSearchNotFound: f = !1,
  showSelectAll: H = !0,
  loading: h,
  loadingText: b = "Loading...",
  ...J
}, Q) => {
  const s = k !== void 0, [U, x] = a.useState(K), r = s ? k : U, [Y, i] = a.useState(!1), g = a.useRef(null), [Z, P] = a.useState(""), [F, M] = a.useState(!1), [n, w] = a.useState(
    new Map(d.map((e) => [e.value, e]))
  ), _ = a.useCallback(
    (e) => {
      if (e.key === "Enter" && f) {
        if (i(!0), e.preventDefault(), e.stopPropagation(), !e.currentTarget.value) return;
        const m = { value: e.currentTarget.value, label: e.currentTarget.value };
        if (n.get(m.value) === void 0) {
          w((N) => new Map(N).set(m.value, m));
          const c = [...r, m.value];
          s || x(c), o(c), P("");
        }
      } else if (e.key === "Enter")
        i(!0);
      else if (e.key === "Backspace" && !e.currentTarget.value) {
        const m = [...r];
        m.pop(), s || x(m), o(m);
      }
    },
    [f, o, n, r, s]
  ), E = a.useCallback(
    (e) => {
      const m = r.includes(e) ? r.filter((c) => c !== e) : [...r, e];
      s || x(m), o(m);
    },
    [o, r, s]
  ), v = a.useCallback(() => {
    s || x([]), o([]), f && w(new Map(d.map((e) => [e.value, e])));
  }, [o, f, d, s]), ee = a.useCallback(() => {
    i((e) => !e);
  }, []), te = a.useCallback(() => {
    const e = r.slice(0, u);
    s || x(e), o(e);
  }, [u, r, o, s]), re = a.useCallback(() => {
    if (r.length === n.size)
      v();
    else {
      const e = Array.from(n.keys());
      s || x(e), o(e);
    }
  }, [v, o, n, r.length, s]);
  return a.useEffect(() => {
    w(new Map(d.map((e) => [e.value, e])));
  }, [d]), a.useLayoutEffect(() => {
    g.current && (g?.current?.firstChild?.offsetTop < g?.current?.lastChild?.offsetTop ? M(!0) : M(!1));
  }, [r]), /* @__PURE__ */ l(oe, { open: Y, onOpenChange: i, modal: V, children: [
    /* @__PURE__ */ t(ne, { asChild: !0, children: /* @__PURE__ */ t(
      se,
      {
        ref: Q,
        variant: "text",
        loading: h,
        disabled: j,
        type: "button",
        ...J,
        onClick: ee,
        className: p(
          "mtx-group mtx-flex mtx-max-h-14 mtx-h-8 mtx-w-full mtx-items-center mtx-justify-between mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-px-3 mtx-py-1.5 mtx-text-sm mtx-ring-offset-background data-[placeholder]:mtx-text-muted-foreground hover:mtx-border hover:mtx-border-primary hover:mtx-bg-transparent focus:mtx-border focus:mtx-border-primary focus:mtx-outline-none focus:mtx-ring focus:mtx-ring-primary-100 disabled:mtx-cursor-not-allowed disabled:mtx-bg-gray-100 disabled:mtx-text-text-300 disabled:mtx-border-gray-100 [&>span]:mtx-line-clamp-1 [&_svg]:disabled:mtx-text-text-300",
          F && "mtx-h-auto",
          z
        ),
        "data-placeholder": r.length ? void 0 : "",
        endIcon: /* @__PURE__ */ t(
          le,
          {
            role: "button",
            "aria-label": "Expand dropdown",
            className: "!mtx-h-4.5 !mtx-w-4.5 mtx-cursor-pointer group-data-[state=open]:mtx-rotate-180 mtx-transition-transform"
          }
        ),
        children: /* @__PURE__ */ t(S, { children: r.length > 0 ? /* @__PURE__ */ l("div", { className: "mtx-flex mtx-justify-between mtx-items-center mtx-w-full", children: [
          /* @__PURE__ */ l("div", { className: "mtx-flex mtx-flex-wrap mtx-items-center mtx-gap-2", ref: g, children: [
            r.slice(0, u).map((e) => {
              const m = n.get(e), c = m?.icon;
              return /* @__PURE__ */ l(T, { className: p(B({ variant: C }), { "text-gray-400 bg-gray-200": j || h }), children: [
                /* @__PURE__ */ t(
                  I,
                  {
                    className: "mtx-h-4 mtx-w-4 mtx-cursor-pointer",
                    onClick: (N) => {
                      N.stopPropagation(), E(e);
                    }
                  }
                ),
                c && /* @__PURE__ */ t(c, { className: "mtx-h-4 mtx-w-4 mtx-mr-2" }),
                m?.label
              ] }, e);
            }),
            r.length > u && /* @__PURE__ */ l(T, { className: p(B({ variant: C })), children: [
              `+ ${r.length - u} ${W}`,
              /* @__PURE__ */ t(
                ae,
                {
                  role: "button",
                  className: "mtx-ml-2 mtx-h-4.5 mtx-w-4.5 mtx-cursor-pointer",
                  onClick: (e) => {
                    e.stopPropagation(), te();
                  }
                }
              )
            ] }),
            h && b ? b : null
          ] }),
          /* @__PURE__ */ l("div", { className: "mtx-flex mtx-items-center mtx-justify-between mtx-gap-1", children: [
            /* @__PURE__ */ t(
              I,
              {
                role: "button",
                className: "mtx-h-5 mtx-w-5 mtx-text-muted-foreground mtx-cursor-pointer",
                onClick: (e) => {
                  e.stopPropagation(), v();
                },
                "aria-label": "Clear"
              }
            ),
            /* @__PURE__ */ t(A, { orientation: "vertical", className: "mtx-flex mtx-min-h-5 mtx-h-full" })
          ] })
        ] }) : /* @__PURE__ */ t(S, { children: h && b ? b : L }) })
      }
    ) }),
    /* @__PURE__ */ t(ce, { className: "mtx-w-auto mtx-p-0", align: "start", onEscapeKeyDown: () => i(!1), children: /* @__PURE__ */ l(xe, { className: "mtx-w-[--radix-popper-anchor-width] mtx-max-h-[--radix-popper-available-height]", children: [
      /* @__PURE__ */ t(ie, { placeholder: q, onKeyDown: _, value: Z, onValueChange: P }),
      /* @__PURE__ */ l(de, { className: "", children: [
        /* @__PURE__ */ t(ue, { children: O }),
        /* @__PURE__ */ l(R, { children: [
          H && /* @__PURE__ */ l(y, { onSelect: re, className: "mtx-cursor-pointer", children: [
            /* @__PURE__ */ t(
              "div",
              {
                className: p(
                  "mtx-mr-2 mtx-flex mtx-h-4.5 mtx-w-4.5 mtx-items-center mtx-justify-center mtx-rounded-sm mtx-border mtx-border-primary",
                  r.length === n.size ? "mtx-bg-primary mtx-text-primary-foreground" : "mtx-opacity-50 [&_svg]:mtx-invisible"
                ),
                children: /* @__PURE__ */ t(D, { className: "mtx-h-4.5 mtx-w-4.5" })
              }
            ),
            /* @__PURE__ */ l("span", { children: [
              "(",
              G,
              ")"
            ] })
          ] }, "all"),
          Array.from(n.values()).map((e) => {
            const m = r.includes(e.value);
            return /* @__PURE__ */ l(y, { onSelect: () => E(e.value), className: "mtx-cursor-pointer", children: [
              /* @__PURE__ */ t(
                "div",
                {
                  className: p(
                    "mtx-mr-2 mtx-flex mtx-h-4.5 mtx-w-4.5 mtx-items-center mtx-justify-center mtx-rounded-sm mtx-border mtx-border-primary",
                    m ? "mtx-bg-primary mtx-text-primary-foreground" : "mtx-opacity-50 [&_svg]:mtx-invisible"
                  ),
                  children: /* @__PURE__ */ t(D, { className: "mtx-h-4.5 mtx-w-4.5" })
                }
              ),
              e.icon && /* @__PURE__ */ t(e.icon, { className: "mtx-mr-2 mtx-h-4.5 mtx-w-4.5 mtx-text-muted-foreground" }),
              /* @__PURE__ */ t("span", { children: e.label })
            ] }, e.value);
          })
        ] }),
        /* @__PURE__ */ t(pe, {}),
        /* @__PURE__ */ t(R, { children: /* @__PURE__ */ l("div", { className: "mtx-flex mtx-items-center mtx-justify-between", children: [
          r.length > 0 && /* @__PURE__ */ l(S, { children: [
            /* @__PURE__ */ t(y, { onSelect: v, className: "mtx-flex-1 mtx-justify-center mtx-cursor-pointer", children: X }),
            /* @__PURE__ */ t(A, { orientation: "vertical", className: "mtx-flex mtx-min-h-6 mtx-h-full" })
          ] }),
          /* @__PURE__ */ t(y, { onSelect: () => i(!1), className: "mtx-flex-1 mtx-justify-center mtx-cursor-pointer mtx-max-w-full", children: $ })
        ] }) })
      ] })
    ] }) })
  ] });
}, he = a.forwardRef(fe);
he.displayName = "MultiSelect";
export {
  he as MultiSelect
};
//# sourceMappingURL=multiselect.es.js.map
