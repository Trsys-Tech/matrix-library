import { jsx as r, jsxs as S } from "react/jsx-runtime";
import * as i from "react";
import { Slot as v } from "@radix-ui/react-slot";
import { tv as z } from "tailwind-variants";
import { VisuallyHidden as I } from "@radix-ui/react-visually-hidden";
import { cn as m } from "./utils.es.js";
import { Skeleton as C } from "./skeleton.es.js";
import { Separator as E } from "./separator.es.js";
import { useIsMobile as B } from "./use-mobile.es.js";
import { Tooltip as T, TooltipTrigger as A, TooltipContent as D, TooltipProvider as O } from "./tooltip.es.js";
import { Sheet as G, SheetContent as H, SheetHeader as j, SheetTitle as K, SheetDescription as L } from "./sheet.es.js";
const V = "sidebar:state", P = 3600 * 24 * 7, w = "16rem", _ = "18rem", N = "4rem", W = "b", k = i.createContext(null);
function R() {
  const t = i.useContext(k);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const $ = i.forwardRef(({ defaultOpen: t = !0, open: e, onOpenChange: a, className: d, style: o, children: s, ...l }, p) => {
  const x = B(), [f, g] = i.useState(t), n = e ?? f, b = i.useCallback(
    (c) => {
      const u = typeof c == "function" ? c(n) : c;
      a ? a(u) : g(u), document.cookie = `${V}=${u}; path=/; max-age=${P}`;
    },
    [a, n]
  ), h = i.useCallback(() => b((c) => !c), [b]);
  i.useEffect(() => {
    const c = (u) => {
      u.key === W && (u.metaKey || u.ctrlKey) && (u.preventDefault(), h());
    };
    return window.addEventListener("keydown", c), () => window.removeEventListener("keydown", c);
  }, [h]);
  const y = n ? "expanded" : "collapsed", M = i.useMemo(
    () => ({
      state: y,
      open: n,
      setOpen: b,
      isMobile: x,
      toggleSidebar: h
    }),
    [y, n, b, x, h]
  );
  return /* @__PURE__ */ r(k.Provider, { value: M, children: /* @__PURE__ */ r(O, { delayDuration: 0, children: /* @__PURE__ */ r(
    "div",
    {
      style: { ...o },
      className: m("mtx-group/sidebar-wrapper mtx-flex mtx-h-full mtx-w-full has-[[data-variant=inset]]:mtx-bg-gray-50", d),
      ref: p,
      ...l,
      children: s
    }
  ) }) });
});
$.displayName = "SidebarProvider";
const q = i.forwardRef(({ side: t = "left", variant: e = "sidebar", collapsible: a = "offcanvas", className: d, children: o, width: s, widthIcon: l, widthMobile: p, style: x, ...f }, g) => {
  const { isMobile: n, state: b, open: h, setOpen: y } = R();
  return a === "none" ? /* @__PURE__ */ r(
    "div",
    {
      "data-side": t,
      style: {
        ...t === "left" ? {
          "--sidebar-left-width": s ?? w,
          "--sidebar-left-width-icon": l ?? N
        } : {
          "--sidebar-right-width": s ?? w,
          "--sidebar-right-width-icon": l ?? N
        },
        ...x
      },
      className: m(
        "mtx-flex mtx-h-full data-[side=left]:mtx-w-[--sidebar-left-width] data-[side=right]:mtx-w-[--sidebar-right-width] mtx-flex-col mtx-bg-gray-50",
        d
      ),
      ref: g,
      ...f,
      children: o
    }
  ) : n || e === "sheet" ? /* @__PURE__ */ r(G, { open: h, onOpenChange: y, ...f, children: /* @__PURE__ */ S(
    H,
    {
      "data-sidebar": "sidebar",
      "data-mobile": "true",
      "data-side": t,
      className: "data-[side=left]:mtx-w-[--sidebar-left-width] data-[side=right]:mtx-w-[--sidebar-right-width] mtx-bg-gray-50 mtx-p-0 [&>button]:mtx-hidden sm:mtx-max-w-full",
      style: {
        ...t === "left" ? {
          "--sidebar-left-width": n ? p ?? _ : s ?? w
        } : {
          "--sidebar-right-width": n ? p ?? _ : s ?? w
        }
      },
      side: t,
      children: [
        /* @__PURE__ */ r(I, { children: /* @__PURE__ */ S(j, { children: [
          /* @__PURE__ */ r(K, { children: " " }),
          /* @__PURE__ */ r(L, { children: " " })
        ] }) }),
        /* @__PURE__ */ r("div", { className: "mtx-flex mtx-h-full mtx-w-full mtx-flex-col", children: o })
      ]
    }
  ) }) : /* @__PURE__ */ S(
    "div",
    {
      ref: g,
      className: "mtx-group mtx-peer mtx-hidden md:mtx-block mtx-relative",
      "data-state": b,
      "data-collapsible": b === "collapsed" ? a : "",
      "data-variant": e,
      "data-side": t,
      style: {
        ...t === "left" ? {
          "--sidebar-left-width": s ?? w,
          "--sidebar-left-width-icon": l ?? N
        } : {
          "--sidebar-right-width": s ?? w,
          "--sidebar-right-width-icon": l ?? N
        },
        ...x
      },
      children: [
        /* @__PURE__ */ r(
          "div",
          {
            className: m(
              "mtx-duration-200 mtx-relative mtx-h-full group-data-[side=left]:mtx-w-[--sidebar-left-width] group-data-[side=right]:mtx-w-[--sidebar-right-width] mtx-bg-transparent mtx-transition-[width] mtx-ease-linear",
              "group-data-[side=left]:group-data-[collapsible=offcanvas]:mtx-w-0 group-data-[side=right]:group-data-[collapsible=offcanvas]:mtx-w-0",
              "group-data-[side=right]:mtx-rotate-180",
              e === "floating" || e === "inset" ? "group-data-[side=left]:group-data-[collapsible=icon]:mtx-w-[calc(var(--sidebar-left-width-icon)_+_theme(spacing.4))] group-data-[side=right]:group-data-[collapsible=icon]:mtx-w-[calc(var(--sidebar-right-width-icon)_+_theme(spacing.4))]" : "group-data-[side=left]:group-data-[collapsible=icon]:mtx-w-[--sidebar-left-width-icon] group-data-[side=right]:group-data-[collapsible=icon]:mtx-w-[--sidebar-right-width-icon]"
            )
          }
        ),
        /* @__PURE__ */ r(
          "div",
          {
            className: m(
              "mtx-duration-200 mtx-absolute mtx-inset-y-0 mtx-z-10 mtx-hidden mtx-h-full group-data-[side=left]:mtx-w-[--sidebar-left-width] group-data-[side=right]:mtx-w-[--sidebar-right-width] mtx-transition-[left,right,width] mtx-ease-linear md:mtx-flex",
              t === "left" ? "mtx-left-0 group-data-[collapsible=offcanvas]:mtx-left-[calc(var(--sidebar-left-width)*-1)]" : "mtx-right-0 group-data-[collapsible=offcanvas]:mtx-right-[calc(var(--sidebar-right-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              e === "floating" || e === "inset" ? "mtx-p-2 group-data-[side=left]:group-data-[collapsible=icon]:mtx-w-[calc(var(--sidebar-left-width-icon)_+_theme(spacing.4)_+2px)] group-data-[side=right]:group-data-[collapsible=icon]:mtx-w-[calc(var(--sidebar-right-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[side=left]:group-data-[collapsible=icon]:mtx-w-[--sidebar-left-width-icon] group-data-[side=right]:group-data-[collapsible=icon]:mtx-w-[--sidebar-right-width-icon] group-data-[side=left]:mtx-border-r group-data-[side=right]:mtx-border-l",
              d
            ),
            ...f,
            children: /* @__PURE__ */ r(
              "div",
              {
                "data-sidebar": "sidebar",
                className: "mtx-flex mtx-h-full mtx-w-full mtx-flex-col mtx-bg-gray-50 group-data-[variant=floating]:mtx-rounded-lg group-data-[variant=floating]:mtx-border group-data-[variant=floating]:mtx-shadow",
                children: o
              }
            )
          }
        )
      ]
    }
  );
});
q.displayName = "Sidebar";
const F = i.forwardRef(
  ({ className: t, onClick: e, asChild: a, ...d }, o) => {
    const { toggleSidebar: s, state: l } = R();
    return /* @__PURE__ */ r(
      a ? v : "button",
      {
        ref: o,
        "data-state": l,
        "data-sidebar": "trigger",
        className: m("mtx-h-7 mtx-w-7", t),
        onClick: (x) => {
          e?.(x), s();
        },
        ...d
      }
    );
  }
);
F.displayName = "SidebarTrigger";
const U = i.forwardRef(({ className: t, ...e }, a) => {
  const { toggleSidebar: d } = R();
  return /* @__PURE__ */ r(
    "button",
    {
      ref: a,
      "data-sidebar": "rail",
      "aria-label": "Toggle Sidebar",
      tabIndex: -1,
      onClick: d,
      title: "Toggle Sidebar",
      className: m(
        "mtx-absolute mtx-inset-y-0 mtx-z-20 mtx-hidden mtx-w-4 -mtx-translate-x-1/2 mtx-transition-all mtx-ease-linear after:mtx-absolute after:mtx-inset-y-0 after:mtx-left-1/2 after:mtx-w-[2px] hover:after:mtx-bg-gray-50-border group-data-[side=left]:-mtx-right-4 group-data-[side=right]:mtx-left-0 sm:mtx-flex",
        "[[data-side=left]_&]:mtx-cursor-w-resize [[data-side=right]_&]:mtx-cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:mtx-cursor-e-resize [[data-side=right][data-state=collapsed]_&]:mtx-cursor-w-resize",
        "group-data-[collapsible=offcanvas]:mtx-translate-x-0 group-data-[collapsible=offcanvas]:after:mtx-left-full group-data-[collapsible=offcanvas]:hover:mtx-bg-gray-50",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-mtx-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-mtx-left-2",
        t
      ),
      ...e
    }
  );
});
U.displayName = "SidebarRail";
const X = i.forwardRef(({ className: t, ...e }, a) => /* @__PURE__ */ r(
  "main",
  {
    ref: a,
    className: m(
      "mtx-relative mtx-flex mtx-h-full mtx-flex-1 mtx-flex-col mtx-bg-background",
      "peer-data-[variant=inset]:mtx-min-h-[calc(100%-theme(spacing.4))] md:peer-data-[variant=inset]:mtx-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:mtx-ml-2 md:peer-data-[variant=inset]:mtx-ml-0 md:peer-data-[variant=inset]:mtx-rounded-xl md:peer-data-[variant=inset]:mtx-shadow",
      t
    ),
    ...e
  }
));
X.displayName = "SidebarInset";
const Y = i.forwardRef(({ className: t, ...e }, a) => /* @__PURE__ */ r("div", { ref: a, "data-sidebar": "header", className: m("mtx-flex mtx-flex-col mtx-gap-2 mtx-p-2", t), ...e }));
Y.displayName = "SidebarHeader";
const J = i.forwardRef(({ className: t, ...e }, a) => /* @__PURE__ */ r("div", { ref: a, "data-sidebar": "footer", className: m("mtx-flex mtx-flex-col mtx-gap-2 mtx-p-2", t), ...e }));
J.displayName = "SidebarFooter";
const Q = i.forwardRef(
  ({ className: t, ...e }, a) => /* @__PURE__ */ r(E, { ref: a, "data-sidebar": "separator", className: m("mtx-mx-2 mtx-w-auto mtx-bg-gray-50-border", t), ...e })
);
Q.displayName = "SidebarSeparator";
const Z = i.forwardRef(({ className: t, ...e }, a) => /* @__PURE__ */ r(
  "div",
  {
    ref: a,
    "data-sidebar": "content",
    className: m(
      "mtx-flex mtx-min-h-0 mtx-flex-1 mtx-flex-col mtx-gap-2 mtx-overflow-auto group-data-[collapsible=icon]:mtx-overflow-hidden",
      t
    ),
    ...e
  }
));
Z.displayName = "SidebarContent";
const tt = i.forwardRef(({ className: t, ...e }, a) => /* @__PURE__ */ r("div", { ref: a, "data-sidebar": "group", className: m("mtx-relative mtx-flex mtx-w-full mtx-min-w-0 mtx-flex-col mtx-py-2", t), ...e }));
tt.displayName = "SidebarGroup";
const et = i.forwardRef(
  ({ className: t, asChild: e = !1, ...a }, d) => /* @__PURE__ */ r(
    e ? v : "div",
    {
      ref: d,
      "data-sidebar": "group-label",
      className: m(
        "mtx-duration-200 mtx-flex mtx-h-8 mtx-shrink-0 mtx-items-center mtx-rounded-md mtx-px-2 mtx-text-xs mtx-font-medium mtx-outline-none mtx-transition-[margin,opacity] mtx-ease-linear focus-visible:mtx-ring-2 [&>svg]:mtx-size-4 [&>svg]:mtx-shrink-0",
        "group-data-[collapsible=icon]:-mtx-mt-8 group-data-[collapsible=icon]:mtx-opacity-0",
        t
      ),
      ...a
    }
  )
);
et.displayName = "SidebarGroupLabel";
const at = i.forwardRef(
  ({ className: t, asChild: e = !1, ...a }, d) => /* @__PURE__ */ r(
    e ? v : "button",
    {
      ref: d,
      "data-sidebar": "group-action",
      className: m(
        "mtx-absolute mtx-right-3 mtx-top-3.5 mtx-flex mtx-aspect-square mtx-w-5 mtx-items-center mtx-justify-center mtx-rounded-md mtx-p-0 mtx-outline-none mtx-transition-transform hover:mtx-bg-gray-50-accent focus-visible:mtx-ring-2 [&>svg]:mtx-size-4 [&>svg]:mtx-shrink-0",
        // Increases the hit area of the button on mobile.
        "after:mtx-absolute after:-mtx-inset-2 after:md:mtx-hidden",
        "group-data-[collapsible=icon]:mtx-hidden",
        t
      ),
      ...a
    }
  )
);
at.displayName = "SidebarGroupAction";
const rt = i.forwardRef(({ className: t, ...e }, a) => /* @__PURE__ */ r("div", { ref: a, "data-sidebar": "group-content", className: m("mtx-w-full mtx-text-sm", t), ...e }));
rt.displayName = "SidebarGroupContent";
const it = i.forwardRef(({ className: t, ...e }, a) => /* @__PURE__ */ r("ul", { ref: a, "data-sidebar": "menu", className: m("mtx-flex mtx-w-full mtx-min-w-0 mtx-flex-col mtx-gap-4", t), ...e }));
it.displayName = "SidebarMenu";
const mt = i.forwardRef(({ className: t, ...e }, a) => /* @__PURE__ */ r("li", { ref: a, "data-sidebar": "menu-item", className: m("mtx-group/menu-item mtx-relative mtx-ps-2", t), ...e }));
mt.displayName = "SidebarMenuItem";
const dt = z({
  base: [
    "mtx-peer/menu-button mtx-flex mtx-w-full mtx-items-center mtx-gap-2 mtx-overflow-hidden mtx-rounded-s-md mtx-rounded-e-none mtx-p-2 mtx-text-left mtx-text-sm mtx-text-text-400 mtx-font-medium mtx-outline-none mtx-transition-[width,height,padding] hover:mtx-bg-gray-50 disabled:mtx-pointer-events-none disabled:mtx-opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:mtx-pr-8 aria-disabled:mtx-pointer-events-none aria-disabled:mtx-opacity-50",
    "data-[active=true]:mtx-bg-primary data-[active=true]:mtx-text-gray-0 data-[active=true]:mtx-font-bold group-data-[collapsible=icon]:mtx-size-10 group-data-[collapsible=icon]:mtx-w-14 group-data-[collapsible=icon]:mtx-p-2 group-data-[collapsible=icon]:mtx-pl-4 [&>span:last-child]:mtx-truncate",
    "[&>svg]:mtx-size-6 [&>svg]:mtx-shrink-0 [&>svg]:data-[active=true]:mtx-text-secondary group-data-[collapsible=icon]:[&>svg]:mtx-me-2",
    "data-[active=true]:before:mtx-[content:''] data-[active=true]:before:mtx-absolute data-[active=true]:before:mtx-start-0 data-[active=true]:before:mtx-h-10 data-[active=true]:before:mtx-w-1 data-[active=true]:before:mtx-bg-secondary data-[active=true]:before:mtx-rounded-e-md",
    "mtx-overflow-ellipsis mtx-whitespace-nowrap"
  ].join(" "),
  variants: {
    variant: {
      default: "hover:mtx-bg-gray-50",
      outline: "mtx-bg-background mtx-shadow-[oklch(var(--gray--300))] hover:mtx-bg-gray-50 hover:mtx-shadow-[oklch(var(--gray-400))]"
    },
    size: {
      default: "mtx-h-10 mtx-text-sm",
      sm: "mtx-h-7 mtx-text-xs",
      lg: "mtx-h-12 mtx-text-sm group-data-[collapsible=icon]:mtx-!p-0"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
}), ot = i.forwardRef(({ asChild: t = !1, isActive: e = !1, variant: a = "default", size: d = "default", tooltip: o, className: s, ...l }, p) => {
  const x = t ? v : "button", { isMobile: f, state: g } = R(), n = /* @__PURE__ */ r(
    x,
    {
      ref: p,
      "data-sidebar": "menu-button",
      "data-size": d,
      "data-active": e,
      className: m(dt({ variant: a, size: d }), s),
      ...l
    }
  );
  return o ? (typeof o == "string" && (o = {
    children: o
  }), /* @__PURE__ */ S(T, { children: [
    /* @__PURE__ */ r(A, { asChild: !0, children: n }),
    /* @__PURE__ */ r(D, { side: "right", align: "center", hidden: g !== "collapsed" || f, ...o })
  ] })) : n;
});
ot.displayName = "SidebarMenuButton";
const st = i.forwardRef(({ className: t, asChild: e = !1, showOnHover: a = !1, ...d }, o) => /* @__PURE__ */ r(
  e ? v : "button",
  {
    ref: o,
    "data-sidebar": "menu-action",
    className: m(
      "mtx-absolute mtx-right-1 mtx-top-1.5 mtx-flex mtx-aspect-square mtx-w-5 mtx-items-center mtx-justify-center mtx-rounded-md mtx-p-0 mtx-outline-none mtx-transition-transform hover:mtx-bg-gray-50-accent focus-visible:mtx-ring-2 [&>svg]:mtx-size-4 [&>svg]:mtx-shrink-0",
      // Increases the hit area of the button on mobile.
      "after:mtx-absolute after:-mtx-inset-2 after:md:mtx-hidden",
      "peer-data-[size=sm]/menu-button:mtx-top-1",
      "peer-data-[size=default]/menu-button:mtx-top-1.5",
      "peer-data-[size=lg]/menu-button:mtx-top-2.5",
      "group-data-[collapsible=icon]:mtx-hidden",
      a && "group-focus-within/menu-item:mtx-opacity-100 group-hover/menu-item:mtx-opacity-100 data-[state=open]:mtx-opacity-100 md:mtx-opacity-0",
      t
    ),
    ...d
  }
));
st.displayName = "SidebarMenuAction";
const nt = i.forwardRef(({ className: t, ...e }, a) => /* @__PURE__ */ r(
  "div",
  {
    ref: a,
    "data-sidebar": "menu-badge",
    className: m(
      "mtx-absolute mtx-right-1 mtx-flex mtx-h-5 mtx-min-w-5 mtx-items-center mtx-justify-center mtx-rounded-md mtx-px-1 mtx-text-xs mtx-font-medium mtx-tabular-nums mtx-select-none mtx-pointer-events-none",
      "peer-data-[size=sm]/menu-button:mtx-top-1",
      "peer-data-[size=default]/menu-button:mtx-top-1.5",
      "peer-data-[size=lg]/menu-button:mtx-top-2.5",
      "group-data-[collapsible=icon]:mtx-hidden",
      t
    ),
    ...e
  }
));
nt.displayName = "SidebarMenuBadge";
const lt = i.forwardRef(({ className: t, showIcon: e = !1, ...a }, d) => /* @__PURE__ */ S(
  "div",
  {
    ref: d,
    "data-sidebar": "menu-skeleton",
    className: m("mtx-rounded-md mtx-h-8 mtx-flex mtx-gap-2 mtx-px-2 mtx-items-center", t),
    ...a,
    children: [
      e && /* @__PURE__ */ r(C, { className: "mtx-size-4 mtx-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
      /* @__PURE__ */ r(
        C,
        {
          className: "mtx-h-4 mtx-flex-1 mtx-max-w-[--skeleton-width]",
          "data-sidebar": "menu-skeleton-text",
          style: {
            "--skeleton-width": "70%"
          }
        }
      )
    ]
  }
));
lt.displayName = "SidebarMenuSkeleton";
const xt = i.forwardRef(({ className: t, ...e }, a) => /* @__PURE__ */ r(
  "ul",
  {
    ref: a,
    "data-sidebar": "menu-sub",
    className: m("mtx-flex mtx-min-w-0 mtx-translate-x-px mtx-flex-col mtx-gap-1", "group-data-[collapsible=icon]:mtx-hidden", t),
    ...e
  }
));
xt.displayName = "SidebarMenuSub";
const ct = i.forwardRef(({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t }));
ct.displayName = "SidebarMenuSubItem";
const ut = i.forwardRef(({ asChild: t = !1, size: e = "md", isActive: a, className: d, ...o }, s) => /* @__PURE__ */ r(
  t ? v : "a",
  {
    ref: s,
    "data-sidebar": "menu-sub-button",
    "data-size": e,
    "data-active": a,
    className: m(
      "mtx-flex mtx-h-10 mtx-min-w-0 -mtx-translate-x-px mtx-items-center mtx-gap-2 mtx-overflow-hidden mtx-rounded-s-md mtx-ps-10 mtx-text-sm mtx-text-text-400 mtx-font-medium mtx-outline-none hover:mtx-bg-gray-50 disabled:mtx-pointer-events-none disabled:mtx-opacity-50 aria-disabled:mtx-pointer-events-none aria-disabled:mtx-opacity-50 [&>span:last-child]:mtx-truncate [&>svg]:mtx-size-4 [&>svg]:mtx-shrink-0",
      "data-[active=true]:mtx-bg-gray-100 data-[active=true]:mtx-text-text",
      e === "sm" && "mtx-text-xs",
      e === "md" && "mtx-text-sm",
      "group-data-[collapsible=icon]:mtx-hidden",
      d
    ),
    ...o
  }
));
ut.displayName = "SidebarMenuSubButton";
export {
  q as Sidebar,
  Z as SidebarContent,
  J as SidebarFooter,
  tt as SidebarGroup,
  at as SidebarGroupAction,
  rt as SidebarGroupContent,
  et as SidebarGroupLabel,
  Y as SidebarHeader,
  X as SidebarInset,
  it as SidebarMenu,
  st as SidebarMenuAction,
  nt as SidebarMenuBadge,
  ot as SidebarMenuButton,
  mt as SidebarMenuItem,
  lt as SidebarMenuSkeleton,
  xt as SidebarMenuSub,
  ut as SidebarMenuSubButton,
  ct as SidebarMenuSubItem,
  $ as SidebarProvider,
  U as SidebarRail,
  Q as SidebarSeparator,
  F as SidebarTrigger,
  R as useSidebar
};
//# sourceMappingURL=sidebar.es.js.map
