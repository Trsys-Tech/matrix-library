import { jsx as r, jsxs as x } from "react/jsx-runtime";
import * as i from "react";
import { Slot as v } from "@radix-ui/react-slot";
import { tv as z } from "tailwind-variants";
import { VisuallyHidden as I } from "@radix-ui/react-visually-hidden";
import { cn as d } from "./utils.es.js";
import { Skeleton as R } from "./skeleton.es.js";
import { Separator as E } from "./separator.es.js";
import { useIsMobile as B } from "./use-mobile.es.js";
import { Tooltip as T, TooltipTrigger as A, TooltipContent as D, TooltipProvider as O } from "./tooltip.es.js";
import { Sheet as G, SheetContent as H, SheetHeader as j, SheetTitle as K, SheetDescription as L } from "./sheet.es.js";
const V = "sidebar:state", $ = 3600 * 24 * 7, y = "16rem", C = "18rem", N = "4rem", P = "b", M = i.createContext(null);
function _() {
  const e = i.useContext(M);
  if (!e)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return e;
}
const W = i.forwardRef(({ defaultOpen: e = !0, open: a, onOpenChange: t, className: o, style: s, children: n, ...l }, u) => {
  const b = B(), [g, h] = i.useState(e), c = a ?? g, m = i.useCallback(
    (p) => {
      const f = typeof p == "function" ? p(c) : p;
      t ? t(f) : h(f), document.cookie = `${V}=${f}; path=/; max-age=${$}`;
    },
    [t, c]
  ), w = i.useCallback(() => m((p) => !p), [m]);
  i.useEffect(() => {
    const p = (f) => {
      f.key === P && (f.metaKey || f.ctrlKey) && (f.preventDefault(), w());
    };
    return window.addEventListener("keydown", p), () => window.removeEventListener("keydown", p);
  }, [w]);
  const S = c ? "expanded" : "collapsed", k = i.useMemo(
    () => ({
      state: S,
      open: c,
      setOpen: m,
      isMobile: b,
      toggleSidebar: w
    }),
    [S, c, m, b, w]
  );
  return /* @__PURE__ */ r(M.Provider, { value: k, children: /* @__PURE__ */ r(O, { delayDuration: 0, children: /* @__PURE__ */ r(
    "div",
    {
      style: { ...s },
      className: d("group/sidebar-wrapper flex h-full w-full has-[[data-variant=inset]]:bg-gray-50", o),
      ref: u,
      ...l,
      children: n
    }
  ) }) });
});
W.displayName = "SidebarProvider";
const q = i.forwardRef(({ side: e = "left", variant: a = "sidebar", collapsible: t = "offcanvas", className: o, children: s, width: n, widthIcon: l, widthMobile: u, style: b, ...g }, h) => {
  const { isMobile: c, state: m, open: w, setOpen: S } = _();
  return t === "none" ? /* @__PURE__ */ r(
    "div",
    {
      "data-side": e,
      style: {
        ...e === "left" ? {
          "--sidebar-left-width": n ?? y,
          "--sidebar-left-width-icon": l ?? N
        } : {
          "--sidebar-right-width": n ?? y,
          "--sidebar-right-width-icon": l ?? N
        },
        ...b
      },
      className: d(
        "flex h-full data-[side=left]:w-[--sidebar-left-width] data-[side=right]:w-[--sidebar-right-width] flex-col bg-gray-50",
        o
      ),
      ref: h,
      ...g,
      children: s
    }
  ) : c ? /* @__PURE__ */ r(G, { open: w, onOpenChange: S, ...g, children: /* @__PURE__ */ x(
    H,
    {
      "data-sidebar": "sidebar",
      "data-mobile": "true",
      "data-side": e,
      className: "data-[side=left]:w-[--sidebar-left-width] data-[side=right]:w-[--sidebar-right-width] bg-gray-50 p-0 [&>button]:hidden",
      style: {
        ...e === "left" ? {
          "--sidebar-left-width": u ?? C
        } : {
          "--sidebar-right-width": u ?? C
        }
      },
      side: e,
      children: [
        /* @__PURE__ */ r(I, { children: /* @__PURE__ */ x(j, { children: [
          /* @__PURE__ */ r(K, { children: " " }),
          /* @__PURE__ */ r(L, { children: " " })
        ] }) }),
        /* @__PURE__ */ r("div", { className: "flex h-full w-full flex-col", children: s })
      ]
    }
  ) }) : /* @__PURE__ */ x(
    "div",
    {
      ref: h,
      className: "group peer hidden md:block relative",
      "data-state": m,
      "data-collapsible": m === "collapsed" ? t : "",
      "data-variant": a,
      "data-side": e,
      style: {
        ...e === "left" ? {
          "--sidebar-left-width": n ?? y,
          "--sidebar-left-width-icon": l ?? N
        } : {
          "--sidebar-right-width": n ?? y,
          "--sidebar-right-width-icon": l ?? N
        },
        ...b
      },
      children: [
        /* @__PURE__ */ r(
          "div",
          {
            className: d(
              "duration-200 relative h-full group-data-[side=left]:w-[--sidebar-left-width] group-data-[side=right]:w-[--sidebar-right-width] bg-transparent transition-[width] ease-linear",
              "group-data-[side=left]:group-data-[collapsible=offcanvas]:w-0 group-data-[side=right]:group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              a === "floating" || a === "inset" ? "group-data-[side=left]:group-data-[collapsible=icon]:w-[calc(var(--sidebar-left-width-icon)_+_theme(spacing.4))] group-data-[side=right]:group-data-[collapsible=icon]:w-[calc(var(--sidebar-right-width-icon)_+_theme(spacing.4))]" : "group-data-[side=left]:group-data-[collapsible=icon]:w-[--sidebar-left-width-icon] group-data-[side=right]:group-data-[collapsible=icon]:w-[--sidebar-right-width-icon]"
            )
          }
        ),
        /* @__PURE__ */ r(
          "div",
          {
            className: d(
              "duration-200 absolute inset-y-0 z-10 hidden h-full group-data-[side=left]:w-[--sidebar-left-width] group-data-[side=right]:w-[--sidebar-right-width] transition-[left,right,width] ease-linear md:flex",
              e === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-left-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-right-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              a === "floating" || a === "inset" ? "p-2 group-data-[side=left]:group-data-[collapsible=icon]:w-[calc(var(--sidebar-left-width-icon)_+_theme(spacing.4)_+2px)] group-data-[side=right]:group-data-[collapsible=icon]:w-[calc(var(--sidebar-right-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[side=left]:group-data-[collapsible=icon]:w-[--sidebar-left-width-icon] group-data-[side=right]:group-data-[collapsible=icon]:w-[--sidebar-right-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
              o
            ),
            ...g,
            children: /* @__PURE__ */ r(
              "div",
              {
                "data-sidebar": "sidebar",
                className: "flex h-full w-full flex-col bg-gray-50 group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow",
                children: s
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
  ({ className: e, onClick: a, asChild: t, ...o }, s) => {
    const { toggleSidebar: n } = _();
    return /* @__PURE__ */ r(
      t ? v : "button",
      {
        ref: s,
        "data-sidebar": "trigger",
        className: d("h-7 w-7", e),
        onClick: (u) => {
          a?.(u), n();
        },
        ...o
      }
    );
  }
);
F.displayName = "SidebarTrigger";
const U = i.forwardRef(({ className: e, ...a }, t) => {
  const { toggleSidebar: o } = _();
  return /* @__PURE__ */ r(
    "button",
    {
      ref: t,
      "data-sidebar": "rail",
      "aria-label": "Toggle Sidebar",
      tabIndex: -1,
      onClick: o,
      title: "Toggle Sidebar",
      className: d(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-gray-50-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
        "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-gray-50",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        e
      ),
      ...a
    }
  );
});
U.displayName = "SidebarRail";
const X = i.forwardRef(({ className: e, ...a }, t) => /* @__PURE__ */ r(
  "main",
  {
    ref: t,
    className: d(
      "relative flex h-full flex-1 flex-col bg-background",
      "peer-data-[variant=inset]:min-h-[calc(100%-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
      e
    ),
    ...a
  }
));
X.displayName = "SidebarInset";
const Y = i.forwardRef(({ className: e, ...a }, t) => /* @__PURE__ */ r("div", { ref: t, "data-sidebar": "header", className: d("flex flex-col gap-2 p-2", e), ...a }));
Y.displayName = "SidebarHeader";
const J = i.forwardRef(({ className: e, ...a }, t) => /* @__PURE__ */ r("div", { ref: t, "data-sidebar": "footer", className: d("flex flex-col gap-2 p-2", e), ...a }));
J.displayName = "SidebarFooter";
const Q = i.forwardRef(
  ({ className: e, ...a }, t) => /* @__PURE__ */ r(E, { ref: t, "data-sidebar": "separator", className: d("mx-2 w-auto bg-gray-50-border", e), ...a })
);
Q.displayName = "SidebarSeparator";
const Z = i.forwardRef(({ className: e, ...a }, t) => /* @__PURE__ */ r(
  "div",
  {
    ref: t,
    "data-sidebar": "content",
    className: d("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", e),
    ...a
  }
));
Z.displayName = "SidebarContent";
const ee = i.forwardRef(({ className: e, ...a }, t) => /* @__PURE__ */ r("div", { ref: t, "data-sidebar": "group", className: d("relative flex w-full min-w-0 flex-col py-2", e), ...a }));
ee.displayName = "SidebarGroup";
const ae = i.forwardRef(
  ({ className: e, asChild: a = !1, ...t }, o) => /* @__PURE__ */ r(
    a ? v : "div",
    {
      ref: o,
      "data-sidebar": "group-label",
      className: d(
        "duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-none transition-[margin,opacity] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        e
      ),
      ...t
    }
  )
);
ae.displayName = "SidebarGroupLabel";
const te = i.forwardRef(
  ({ className: e, asChild: a = !1, ...t }, o) => /* @__PURE__ */ r(
    a ? v : "button",
    {
      ref: o,
      "data-sidebar": "group-action",
      className: d(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-none transition-transform hover:bg-gray-50-accent focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        e
      ),
      ...t
    }
  )
);
te.displayName = "SidebarGroupAction";
const re = i.forwardRef(({ className: e, ...a }, t) => /* @__PURE__ */ r("div", { ref: t, "data-sidebar": "group-content", className: d("w-full text-sm", e), ...a }));
re.displayName = "SidebarGroupContent";
const ie = i.forwardRef(({ className: e, ...a }, t) => /* @__PURE__ */ r("ul", { ref: t, "data-sidebar": "menu", className: d("flex w-full min-w-0 flex-col gap-4", e), ...a }));
ie.displayName = "SidebarMenu";
const de = i.forwardRef(({ className: e, ...a }, t) => /* @__PURE__ */ r("li", { ref: t, "data-sidebar": "menu-item", className: d("group/menu-item relative ps-2", e), ...a }));
de.displayName = "SidebarMenuItem";
const oe = z({
  base: [
    "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-s-md rounded-e-none p-2 text-left text-sm text-text-400 font-medium outline-none transition-[width,height,padding] hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    "data-[active=true]:bg-primary data-[active=true]:text-gray-0 data-[active=true]:font-bold group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:w-14 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:pl-4 [&>span:last-child]:truncate",
    "[&>svg]:size-6 [&>svg]:shrink-0 [&>svg]:data-[active=true]:text-secondary group-data-[collapsible=icon]:[&>svg]:me-2",
    "data-[active=true]:before:[content:''] data-[active=true]:before:absolute data-[active=true]:before:start-0 data-[active=true]:before:h-10 data-[active=true]:before:w-1 data-[active=true]:before:bg-secondary data-[active=true]:before:rounded-e-md",
    "overflow-ellipsis whitespace-nowrap"
  ].join(" "),
  variants: {
    variant: {
      default: "hover:bg-gray-50",
      outline: "bg-background shadow-[0_0_0_1px_hsl(var(--gray--300))] hover:bg-gray-50 hover:shadow-[0_0_0_1px_hsl(var(--gray-400))]"
    },
    size: {
      default: "h-10 text-sm",
      sm: "h-7 text-xs",
      lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
}), se = i.forwardRef(({ asChild: e = !1, isActive: a = !1, variant: t = "default", size: o = "default", tooltip: s, className: n, ...l }, u) => {
  const b = e ? v : "button", { isMobile: g, state: h } = _(), c = /* @__PURE__ */ r(
    b,
    {
      ref: u,
      "data-sidebar": "menu-button",
      "data-size": o,
      "data-active": a,
      className: d(oe({ variant: t, size: o }), n),
      ...l
    }
  );
  return s ? (typeof s == "string" && (s = {
    children: s
  }), /* @__PURE__ */ x(T, { children: [
    /* @__PURE__ */ r(A, { asChild: !0, children: c }),
    /* @__PURE__ */ r(D, { side: "right", align: "center", hidden: h !== "collapsed" || g, ...s })
  ] })) : c;
});
se.displayName = "SidebarMenuButton";
const ne = i.forwardRef(({ className: e, asChild: a = !1, showOnHover: t = !1, ...o }, s) => /* @__PURE__ */ r(
  a ? v : "button",
  {
    ref: s,
    "data-sidebar": "menu-action",
    className: d(
      "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-none transition-transform hover:bg-gray-50-accent focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
      // Increases the hit area of the button on mobile.
      "after:absolute after:-inset-2 after:md:hidden",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      t && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
      e
    ),
    ...o
  }
));
ne.displayName = "SidebarMenuAction";
const le = i.forwardRef(({ className: e, ...a }, t) => /* @__PURE__ */ r(
  "div",
  {
    ref: t,
    "data-sidebar": "menu-badge",
    className: d(
      "absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none pointer-events-none",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      e
    ),
    ...a
  }
));
le.displayName = "SidebarMenuBadge";
const ce = i.forwardRef(({ className: e, showIcon: a = !1, ...t }, o) => {
  const s = i.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ x("div", { ref: o, "data-sidebar": "menu-skeleton", className: d("rounded-md h-8 flex gap-2 px-2 items-center", e), ...t, children: [
    a && /* @__PURE__ */ r(R, { className: "size-4 rounded-md", "data-sidebar": "menu-skeleton-icon" }),
    /* @__PURE__ */ r(
      R,
      {
        className: "h-4 flex-1 max-w-[--skeleton-width]",
        "data-sidebar": "menu-skeleton-text",
        style: {
          "--skeleton-width": s
        }
      }
    )
  ] });
});
ce.displayName = "SidebarMenuSkeleton";
const ue = i.forwardRef(({ className: e, ...a }, t) => /* @__PURE__ */ r(
  "ul",
  {
    ref: t,
    "data-sidebar": "menu-sub",
    className: d("flex min-w-0 translate-x-px flex-col gap-1", "group-data-[collapsible=icon]:hidden", e),
    ...a
  }
));
ue.displayName = "SidebarMenuSub";
const pe = i.forwardRef(({ ...e }, a) => /* @__PURE__ */ r("li", { ref: a, ...e }));
pe.displayName = "SidebarMenuSubItem";
const fe = i.forwardRef(({ asChild: e = !1, size: a = "md", isActive: t, className: o, ...s }, n) => /* @__PURE__ */ r(
  e ? v : "a",
  {
    ref: n,
    "data-sidebar": "menu-sub-button",
    "data-size": a,
    "data-active": t,
    className: d(
      "flex h-10 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-s-md ps-10 text-sm text-text-400 font-medium outline-none hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
      "data-[active=true]:bg-gray-100 data-[active=true]:text-text",
      a === "sm" && "text-xs",
      a === "md" && "text-sm",
      "group-data-[collapsible=icon]:hidden",
      o
    ),
    ...s
  }
));
fe.displayName = "SidebarMenuSubButton";
export {
  q as Sidebar,
  Z as SidebarContent,
  J as SidebarFooter,
  ee as SidebarGroup,
  te as SidebarGroupAction,
  re as SidebarGroupContent,
  ae as SidebarGroupLabel,
  Y as SidebarHeader,
  X as SidebarInset,
  ie as SidebarMenu,
  ne as SidebarMenuAction,
  le as SidebarMenuBadge,
  se as SidebarMenuButton,
  de as SidebarMenuItem,
  ce as SidebarMenuSkeleton,
  ue as SidebarMenuSub,
  fe as SidebarMenuSubButton,
  pe as SidebarMenuSubItem,
  W as SidebarProvider,
  U as SidebarRail,
  Q as SidebarSeparator,
  F as SidebarTrigger,
  _ as useSidebar
};
//# sourceMappingURL=sidebar.es.js.map
