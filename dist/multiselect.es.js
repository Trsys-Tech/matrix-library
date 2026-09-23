import { jsxs as o, jsx as r, Fragment as j } from "react/jsx-runtime";
import * as a from "react";
import { tv as te } from "tailwind-variants";
import { XMark as A, CircleXmark as re, ChevronDown as me, Check as D } from "@trsys-tech/matrix-icons";
import { cn as p } from "./utils.es.js";
import { Status as T } from "./status.es.js";
import { Button as ae } from "./button.es.js";
import { Separator as se } from "./separator.es.js";
import { Popover as oe, PopoverTrigger as le, PopoverContent as ne } from "./popover.es.js";
import { Command as ce, CommandInput as ie, CommandList as xe, CommandEmpty as de, CommandGroup as pe, CommandItem as O } from "./command.es.js";
const R = te({
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
}), ue = ({
  options: v,
  onValueChange: l,
  value: w,
  variant: S,
  disabled: N,
  defaultValue: K = [],
  placeholder: L = "Select options",
  maxCount: x = 3,
  modalPopover: V = !1,
  // asChild = false,
  className: z,
  moreText: B = "more",
  selectAllText: W = "Select All",
  noResultsText: X = "No results found.",
  searchText: _ = "Search...",
  addOptionOnSearchNotFound: u = !1,
  showSelectAll: $ = !0,
  loading: f,
  loadingText: h = "Loading...",
  ...G
}, q) => {
  const s = w !== void 0, [H, i] = a.useState(K), t = s ? w : H, [J, d] = a.useState(!1), b = a.useRef(null), [Q, k] = a.useState(""), [U, C] = a.useState(!1), [M, P] = a.useState(/* @__PURE__ */ new Map()), E = a.useMemo(() => new Map(v.map((e) => [e.value, e])), [v]), c = a.useMemo(() => {
    const e = new Map(E);
    return M.forEach((m, n) => {
      e.has(n) || e.set(n, m);
    }), e;
  }, [M, E]), Y = a.useCallback(
    (e) => {
      if (e.key === "Enter" && u) {
        if (d(!0), e.preventDefault(), e.stopPropagation(), !e.currentTarget.value) return;
        const m = { value: e.currentTarget.value, label: e.currentTarget.value };
        if (c.get(m.value) === void 0) {
          P((y) => new Map(y).set(m.value, m));
          const n = [...t, m.value];
          s || i(n), l(n), k("");
        }
      } else if (e.key === "Enter")
        d(!0);
      else if (e.key === "Backspace" && !e.currentTarget.value) {
        const m = [...t];
        m.pop(), s || i(m), l(m);
      }
    },
    [u, l, c, t, s]
  ), I = a.useCallback(
    (e) => {
      const m = t.includes(e) ? t.filter((n) => n !== e) : [...t, e];
      s || i(m), l(m);
    },
    [l, t, s]
  ), g = a.useCallback(() => {
    s || i([]), l([]), u && P(/* @__PURE__ */ new Map());
  }, [l, u, s]), Z = a.useCallback(() => {
    d((e) => !e);
  }, []), F = a.useCallback(() => {
    const e = t.slice(0, x);
    s || i(e), l(e);
  }, [x, t, l, s]), ee = a.useCallback(() => {
    if (t.length === c.size)
      g();
    else {
      const e = Array.from(c.keys());
      s || i(e), l(e);
    }
  }, [g, l, c, t.length, s]);
  return a.useLayoutEffect(() => {
    b.current && (b?.current?.firstChild?.offsetTop < b?.current?.lastChild?.offsetTop ? C(!0) : C(!1));
  }, [t]), /* @__PURE__ */ o(oe, { open: J, onOpenChange: d, modal: V, children: [
    /* @__PURE__ */ r(le, { asChild: !0, children: /* @__PURE__ */ r(
      ae,
      {
        ref: q,
        variant: "text",
        loading: f,
        disabled: N,
        type: "button",
        ...G,
        onClick: Z,
        className: p(
          "mtx-group mtx-flex mtx-max-h-14 mtx-h-8 mtx-w-full mtx-items-center mtx-justify-between mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-px-3 mtx-py-1.5 mtx-text-sm mtx-ring-offset-background data-[placeholder]:mtx-text-muted-foreground hover:mtx-border hover:mtx-border-primary hover:mtx-bg-transparent focus:mtx-border focus:mtx-border-primary focus:mtx-outline-none focus:mtx-ring focus:mtx-ring-primary-100 disabled:mtx-cursor-not-allowed disabled:mtx-bg-gray-100 disabled:mtx-text-text-300 disabled:mtx-border-gray-100 [&>span]:mtx-line-clamp-1 [&_svg]:disabled:mtx-text-text-300",
          U && "mtx-h-auto",
          z
        ),
        "data-placeholder": t.length ? void 0 : "",
        endIcon: /* @__PURE__ */ r(
          me,
          {
            role: "button",
            "aria-label": "Expand dropdown",
            className: "!mtx-h-4.5 !mtx-w-4.5 mtx-cursor-pointer group-data-[state=open]:mtx-rotate-180 mtx-transition-transform"
          }
        ),
        children: /* @__PURE__ */ r(j, { children: t.length > 0 ? /* @__PURE__ */ o("div", { className: "mtx-flex mtx-justify-between mtx-items-center mtx-w-full", children: [
          /* @__PURE__ */ o("div", { className: "mtx-flex mtx-flex-wrap mtx-items-center mtx-gap-2", ref: b, children: [
            t.slice(0, x).map((e) => {
              const m = c.get(e), n = m?.icon;
              return /* @__PURE__ */ o(T, { className: p(R({ variant: S }), { "text-gray-400 bg-gray-200": N || f }), children: [
                /* @__PURE__ */ r(
                  A,
                  {
                    className: "mtx-h-4 mtx-w-4 mtx-cursor-pointer",
                    onClick: (y) => {
                      y.stopPropagation(), I(e);
                    }
                  }
                ),
                n && /* @__PURE__ */ r(n, { className: "mtx-h-4 mtx-w-4 mtx-mr-2" }),
                m?.label
              ] }, e);
            }),
            t.length > x && /* @__PURE__ */ o(T, { className: p(R({ variant: S })), children: [
              `+ ${t.length - x} ${B}`,
              /* @__PURE__ */ r(
                re,
                {
                  role: "button",
                  className: "mtx-ml-2 mtx-h-4.5 mtx-w-4.5 mtx-cursor-pointer",
                  onClick: (e) => {
                    e.stopPropagation(), F();
                  }
                }
              )
            ] }),
            f && h ? h : null
          ] }),
          /* @__PURE__ */ o("div", { className: "mtx-flex mtx-items-center mtx-justify-between mtx-gap-1", children: [
            /* @__PURE__ */ r(
              A,
              {
                role: "button",
                className: "mtx-h-5 mtx-w-5 mtx-text-muted-foreground mtx-cursor-pointer",
                onClick: (e) => {
                  e.stopPropagation(), g();
                },
                "aria-label": "Clear"
              }
            ),
            /* @__PURE__ */ r(se, { orientation: "vertical", className: "mtx-flex mtx-min-h-5 mtx-h-full" })
          ] })
        ] }) : /* @__PURE__ */ r(j, { children: f && h ? h : L }) })
      }
    ) }),
    /* @__PURE__ */ r(ne, { className: "mtx-w-auto mtx-p-0", align: "start", onEscapeKeyDown: () => d(!1), children: /* @__PURE__ */ o(ce, { className: "mtx-w-[--radix-popper-anchor-width] mtx-max-h-[--radix-popper-available-height]", children: [
      /* @__PURE__ */ r(ie, { placeholder: _, onKeyDown: Y, value: Q, onValueChange: k }),
      /* @__PURE__ */ o(xe, { className: "", children: [
        /* @__PURE__ */ r(de, { children: X }),
        /* @__PURE__ */ o(pe, { children: [
          $ && /* @__PURE__ */ o(O, { onSelect: ee, className: "mtx-cursor-pointer", children: [
            /* @__PURE__ */ r(
              "div",
              {
                className: p(
                  "mtx-mr-2 mtx-flex mtx-h-4.5 mtx-w-4.5 mtx-items-center mtx-justify-center mtx-rounded-sm mtx-border mtx-border-primary",
                  t.length === c.size ? "mtx-bg-primary mtx-text-primary-foreground" : "mtx-opacity-50 [&_svg]:mtx-invisible"
                ),
                children: /* @__PURE__ */ r(D, { className: "mtx-h-4.5 mtx-w-4.5" })
              }
            ),
            /* @__PURE__ */ o("span", { children: [
              "(",
              W,
              ")"
            ] })
          ] }, "all"),
          Array.from(c.values()).map((e) => {
            const m = t.includes(e.value);
            return /* @__PURE__ */ o(O, { onSelect: () => I(e.value), className: "mtx-cursor-pointer", children: [
              /* @__PURE__ */ r(
                "div",
                {
                  className: p(
                    "mtx-mr-2 mtx-flex mtx-h-4.5 mtx-w-4.5 mtx-items-center mtx-justify-center mtx-rounded-sm mtx-border mtx-border-primary",
                    m ? "mtx-bg-primary mtx-text-primary-foreground" : "mtx-opacity-50 [&_svg]:mtx-invisible"
                  ),
                  children: /* @__PURE__ */ r(D, { className: "mtx-h-4.5 mtx-w-4.5" })
                }
              ),
              e.icon && /* @__PURE__ */ r(e.icon, { className: "mtx-mr-2 mtx-h-4.5 mtx-w-4.5 mtx-text-muted-foreground" }),
              /* @__PURE__ */ r("span", { children: e.label })
            ] }, e.value);
          })
        ] })
      ] })
    ] }) })
  ] });
}, fe = a.forwardRef(ue);
fe.displayName = "MultiSelect";
export {
  fe as MultiSelect
};
//# sourceMappingURL=multiselect.es.js.map
