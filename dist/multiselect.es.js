import { jsxs as l, jsx as e, Fragment as D } from "react/jsx-runtime";
import * as m from "react";
import { tv as mt } from "tailwind-variants";
import { XMark as K, CircleXmark as st, ChevronDown as at, Plus as ot, Check as O } from "@trsys-tech/matrix-icons";
import { cn as f } from "./utils.es.js";
import { Status as R } from "./status.es.js";
import { Button as lt } from "./button.es.js";
import { Separator as nt } from "./separator.es.js";
import { Popover as it, PopoverTrigger as ct, PopoverContent as xt } from "./popover.es.js";
import { Command as dt, CommandInput as pt, CommandList as ut, CommandEmpty as ft, CommandGroup as ht, CommandItem as L } from "./command.es.js";
const z = mt({
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
}), bt = ({
  options: k,
  onValueChange: o,
  value: N,
  variant: S,
  disabled: C,
  defaultValue: B = [],
  placeholder: T = "Select options",
  maxCount: p = 3,
  modalPopover: V = !1,
  // asChild = false,
  className: W,
  moreText: X = "more",
  selectAllText: _ = "Select All",
  noResultsText: $ = "No results found.",
  searchText: G = "Search...",
  addOptionOnSearchNotFound: u = !1,
  showSelectAll: q = !0,
  loading: h,
  loadingText: b = "Loading...",
  ...H
}, J) => {
  const a = N !== void 0, [Q, x] = m.useState(B), r = a ? N : Q, [U, g] = m.useState(!1), y = m.useRef(null), [i, M] = m.useState(""), [Y, P] = m.useState(!1), [A, E] = m.useState(/* @__PURE__ */ new Map()), I = m.useMemo(() => new Map(k.map((t) => [t.value, t])), [k]), c = m.useMemo(() => {
    const t = new Map(I);
    return A.forEach((s, n) => {
      t.has(n) || t.set(n, s);
    }), t;
  }, [A, I]), d = !!i && !c.has(i), w = m.useCallback(() => {
    if (!d) return;
    const t = { value: i, label: i };
    E((n) => new Map(n).set(t.value, t));
    const s = [...r, t.value];
    a || x(s), o(s), M("");
  }, [d, i, r, a, o]), Z = m.useCallback(
    (t) => {
      if (t.key === "Enter" && u && (d || !i))
        t.preventDefault(), t.stopPropagation(), d && w();
      else if (t.key === "Enter")
        g(!0);
      else if (t.key === "Backspace" && !t.currentTarget.value) {
        const s = [...r];
        s.pop(), a || x(s), o(s);
      }
    },
    [u, d, w, o, r, a, i]
  ), j = m.useCallback(
    (t) => {
      const s = r.includes(t) ? r.filter((n) => n !== t) : [...r, t];
      a || x(s), o(s);
    },
    [o, r, a]
  ), v = m.useCallback(() => {
    a || x([]), o([]), u && E(/* @__PURE__ */ new Map());
  }, [o, u, a]), F = m.useCallback(() => {
    g((t) => !t);
  }, []), tt = m.useCallback(() => {
    const t = r.slice(0, p);
    a || x(t), o(t);
  }, [p, r, o, a]), et = m.useCallback(() => {
    if (r.length === c.size)
      v();
    else {
      const t = Array.from(c.keys());
      a || x(t), o(t);
    }
  }, [v, o, c, r.length, a]);
  return m.useLayoutEffect(() => {
    y.current && (y?.current?.firstChild?.offsetTop < y?.current?.lastChild?.offsetTop ? P(!0) : P(!1));
  }, [r]), /* @__PURE__ */ l(it, { open: U, onOpenChange: g, modal: V, children: [
    /* @__PURE__ */ e(ct, { asChild: !0, children: /* @__PURE__ */ e(
      lt,
      {
        ref: J,
        variant: "text",
        loading: h,
        disabled: C,
        type: "button",
        ...H,
        onClick: F,
        className: f(
          "mtx-group mtx-flex mtx-max-h-14 mtx-h-8 mtx-w-full mtx-items-center mtx-justify-between mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-px-3 mtx-py-1.5 mtx-text-sm mtx-ring-offset-background data-[placeholder]:mtx-text-muted-foreground hover:mtx-border hover:mtx-border-primary hover:mtx-bg-transparent focus:mtx-border focus:mtx-border-primary focus:mtx-outline-none focus:mtx-ring focus:mtx-ring-primary-100 disabled:mtx-cursor-not-allowed disabled:mtx-bg-gray-100 disabled:mtx-text-text-300 disabled:mtx-border-gray-100 [&>span]:mtx-line-clamp-1 [&_svg]:disabled:mtx-text-text-300",
          Y && "mtx-h-auto mtx-max-h-fit",
          W
        ),
        "data-placeholder": r.length ? void 0 : "",
        endIcon: /* @__PURE__ */ e(
          at,
          {
            role: "button",
            "aria-label": "Expand dropdown",
            className: "!mtx-h-4.5 !mtx-w-4.5 mtx-cursor-pointer group-data-[state=open]:mtx-rotate-180 mtx-transition-transform"
          }
        ),
        children: /* @__PURE__ */ e(D, { children: r.length > 0 ? /* @__PURE__ */ l("div", { className: "mtx-flex mtx-justify-between mtx-items-center mtx-w-full", children: [
          /* @__PURE__ */ l("div", { className: "mtx-flex mtx-flex-wrap mtx-items-center mtx-gap-2", ref: y, children: [
            r.slice(0, p).map((t) => {
              const s = c.get(t), n = s?.icon;
              return /* @__PURE__ */ l(R, { className: f(z({ variant: S }), { "text-gray-400 bg-gray-200": C || h }), children: [
                /* @__PURE__ */ e(
                  K,
                  {
                    className: "mtx-h-4 mtx-w-4 mtx-cursor-pointer",
                    onClick: (rt) => {
                      rt.stopPropagation(), j(t);
                    }
                  }
                ),
                n && /* @__PURE__ */ e(n, { className: "mtx-h-4 mtx-w-4 mtx-mr-2" }),
                s?.label
              ] }, t);
            }),
            r.length > p && /* @__PURE__ */ l(R, { className: f(z({ variant: S })), children: [
              `+ ${r.length - p} ${X}`,
              /* @__PURE__ */ e(
                st,
                {
                  role: "button",
                  className: "mtx-ml-2 mtx-h-4.5 mtx-w-4.5 mtx-cursor-pointer",
                  onClick: (t) => {
                    t.stopPropagation(), tt();
                  }
                }
              )
            ] }),
            h && b ? b : null
          ] }),
          /* @__PURE__ */ l("div", { className: "mtx-flex mtx-items-center mtx-justify-between mtx-gap-1", children: [
            /* @__PURE__ */ e(
              K,
              {
                role: "button",
                className: "mtx-h-5 mtx-w-5 mtx-text-muted-foreground mtx-cursor-pointer",
                onClick: (t) => {
                  t.stopPropagation(), v();
                },
                "aria-label": "Clear"
              }
            ),
            /* @__PURE__ */ e(nt, { orientation: "vertical", className: "mtx-flex mtx-min-h-5 mtx-h-full" })
          ] })
        ] }) : /* @__PURE__ */ e(D, { children: h && b ? b : T }) })
      }
    ) }),
    /* @__PURE__ */ e(xt, { className: "mtx-w-auto mtx-p-0", align: "start", onEscapeKeyDown: () => g(!1), children: /* @__PURE__ */ l(dt, { className: "mtx-w-[--radix-popper-anchor-width] mtx-max-h-[--radix-popper-available-height]", children: [
      /* @__PURE__ */ e(
        pt,
        {
          placeholder: G,
          onKeyDown: Z,
          value: i,
          onValueChange: M,
          endAdornment: u && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              "aria-label": "Add option",
              disabled: !d,
              onClick: w,
              onKeyDown: (t) => {
                t.key === "Enter" && t.stopPropagation();
              },
              className: "mtx-shrink-0 mtx-text-primary disabled:mtx-opacity-50",
              children: /* @__PURE__ */ e(ot, { className: "mtx-h-4 mtx-w-4", "aria-hidden": "true" })
            }
          )
        }
      ),
      /* @__PURE__ */ l(ut, { className: "", children: [
        /* @__PURE__ */ e(ft, { children: $ }),
        /* @__PURE__ */ l(ht, { children: [
          q && /* @__PURE__ */ l(L, { onSelect: et, className: "mtx-cursor-pointer", children: [
            /* @__PURE__ */ e(
              "div",
              {
                className: f(
                  "mtx-mr-2 mtx-flex mtx-h-4.5 mtx-w-4.5 mtx-items-center mtx-justify-center mtx-rounded-sm mtx-border mtx-border-primary",
                  r.length === c.size ? "mtx-bg-primary mtx-text-primary-foreground" : "mtx-opacity-50 [&_svg]:mtx-invisible"
                ),
                children: /* @__PURE__ */ e(O, { className: "mtx-h-4.5 mtx-w-4.5" })
              }
            ),
            /* @__PURE__ */ l("span", { children: [
              "(",
              _,
              ")"
            ] })
          ] }, "all"),
          Array.from(c.values()).map((t) => {
            const s = r.includes(t.value);
            return /* @__PURE__ */ l(L, { onSelect: () => j(t.value), className: "mtx-cursor-pointer", children: [
              /* @__PURE__ */ e(
                "div",
                {
                  className: f(
                    "mtx-mr-2 mtx-flex mtx-h-4.5 mtx-w-4.5 mtx-items-center mtx-justify-center mtx-rounded-sm mtx-border mtx-border-primary",
                    s ? "mtx-bg-primary mtx-text-primary-foreground" : "mtx-opacity-50 [&_svg]:mtx-invisible"
                  ),
                  children: /* @__PURE__ */ e(O, { className: "mtx-h-4.5 mtx-w-4.5" })
                }
              ),
              t.icon && /* @__PURE__ */ e(t.icon, { className: "mtx-mr-2 mtx-h-4.5 mtx-w-4.5 mtx-text-muted-foreground" }),
              /* @__PURE__ */ e("span", { children: t.label })
            ] }, t.value);
          })
        ] })
      ] })
    ] }) })
  ] });
}, gt = m.forwardRef(bt);
gt.displayName = "MultiSelect";
export {
  gt as MultiSelect
};
//# sourceMappingURL=multiselect.es.js.map
