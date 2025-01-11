"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, tv } from "tailwind-variants";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { cn } from "../../lib/utils";
import { Skeleton } from "../skeleton/Skeleton";
import { Separator } from "../separator/Separator";
import { useIsMobile } from "../../lib/hooks/use-mobile";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip/Tooltip";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../sheet/Sheet";

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "4rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContext = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }, ref) => {
  const isMobile = useIsMobile();

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open],
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return setOpen(open => !open);
  }, [setOpen]);

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<SidebarContext>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          style={{ ...style } as React.CSSProperties}
          className={cn("group/sidebar-wrapper flex h-full w-full has-[[data-variant=inset]]:bg-gray-50", className)}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
});
SidebarProvider.displayName = "SidebarProvider";
type SidebarProviderProps = React.ComponentProps<typeof SidebarProvider>;

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
    width?: string;
    widthIcon?: string;
    widthMobile?: string;
  }
>(({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, width, widthIcon, widthMobile, style, ...props }, ref) => {
  const { isMobile, state, open, setOpen } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        data-side={side}
        style={
          {
            ...(side === "left"
              ? {
                  "--sidebar-left-width": width ?? SIDEBAR_WIDTH,
                  "--sidebar-left-width-icon": widthIcon ?? SIDEBAR_WIDTH_ICON,
                }
              : {
                  "--sidebar-right-width": width ?? SIDEBAR_WIDTH,
                  "--sidebar-right-width-icon": widthIcon ?? SIDEBAR_WIDTH_ICON,
                }),
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          "flex h-full data-[side=left]:w-[--sidebar-left-width] data-[side=right]:w-[--sidebar-right-width] flex-col bg-gray-50",
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-mobile="true"
          data-side={side}
          className="data-[side=left]:w-[--sidebar-left-width] data-[side=right]:w-[--sidebar-right-width] bg-gray-50 p-0 [&>button]:hidden"
          style={
            {
              ...(side === "left"
                ? {
                    "--sidebar-left-width": widthMobile ?? SIDEBAR_WIDTH_MOBILE,
                  }
                : {
                    "--sidebar-right-width": widthMobile ?? SIDEBAR_WIDTH_MOBILE,
                  }),
            } as React.CSSProperties
          }
          side={side}
        >
          <VisuallyHidden>
            <SheetHeader>
              <SheetTitle> </SheetTitle>
              <SheetDescription> </SheetDescription>
            </SheetHeader>
          </VisuallyHidden>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      ref={ref}
      className="group peer hidden md:block relative"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      style={
        {
          ...(side === "left"
            ? {
                "--sidebar-left-width": width ?? SIDEBAR_WIDTH,
                "--sidebar-left-width-icon": widthIcon ?? SIDEBAR_WIDTH_ICON,
              }
            : {
                "--sidebar-right-width": width ?? SIDEBAR_WIDTH,
                "--sidebar-right-width-icon": widthIcon ?? SIDEBAR_WIDTH_ICON,
              }),
          ...style,
        } as React.CSSProperties
      }
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        className={cn(
          "duration-200 relative h-full group-data-[side=left]:w-[--sidebar-left-width] group-data-[side=right]:w-[--sidebar-right-width] bg-transparent transition-[width] ease-linear",
          "group-data-[side=left]:group-data-[collapsible=offcanvas]:w-0 group-data-[side=right]:group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[side=left]:group-data-[collapsible=icon]:w-[calc(var(--sidebar-left-width-icon)_+_theme(spacing.4))] group-data-[side=right]:group-data-[collapsible=icon]:w-[calc(var(--sidebar-right-width-icon)_+_theme(spacing.4))]"
            : "group-data-[side=left]:group-data-[collapsible=icon]:w-[--sidebar-left-width-icon] group-data-[side=right]:group-data-[collapsible=icon]:w-[--sidebar-right-width-icon]",
        )}
      />
      <div
        className={cn(
          "duration-200 absolute inset-y-0 z-10 hidden h-full group-data-[side=left]:w-[--sidebar-left-width] group-data-[side=right]:w-[--sidebar-right-width] transition-[left,right,width] ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-left-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-right-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[side=left]:group-data-[collapsible=icon]:w-[calc(var(--sidebar-left-width-icon)_+_theme(spacing.4)_+2px)] group-data-[side=right]:group-data-[collapsible=icon]:w-[calc(var(--sidebar-right-width-icon)_+_theme(spacing.4)_+2px)]"
            : "group-data-[side=left]:group-data-[collapsible=icon]:w-[--sidebar-left-width-icon] group-data-[side=right]:group-data-[collapsible=icon]:w-[--sidebar-right-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          className="flex h-full w-full flex-col bg-gray-50 group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow"
        >
          {children}
        </div>
      </div>
    </div>
  );
});
Sidebar.displayName = "Sidebar";
type SidebarProps = React.ComponentProps<typeof Sidebar>;

const SidebarTrigger = React.forwardRef<React.ElementRef<"button">, React.ComponentProps<"button"> & { asChild?: boolean }>(
  ({ className, onClick, asChild, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-sidebar="trigger"
        className={cn("h-7 w-7", className)}
        onClick={event => {
          onClick?.(event);
          toggleSidebar();
        }}
        {...props}
      />
    );
  },
);
SidebarTrigger.displayName = "SidebarTrigger";
type SidebarTriggerProps = React.ComponentProps<typeof SidebarTrigger>;

const SidebarRail = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button">>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-gray-50-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
        "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-gray-50",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className,
      )}
      {...props}
    />
  );
});
SidebarRail.displayName = "SidebarRail";
type SidebarRailProps = React.ComponentProps<typeof SidebarRail>;

const SidebarInset = React.forwardRef<HTMLDivElement, React.ComponentProps<"main">>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        "relative flex h-full flex-1 flex-col bg-background",
        "peer-data-[variant=inset]:min-h-[calc(100%-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        className,
      )}
      {...props}
    />
  );
});
SidebarInset.displayName = "SidebarInset";
type SidebarInsetProps = React.ComponentProps<typeof SidebarInset>;

const SidebarHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} data-sidebar="header" className={cn("flex flex-col gap-2 p-2", className)} {...props} />;
});
SidebarHeader.displayName = "SidebarHeader";
type SidebarHeaderProps = React.ComponentProps<typeof SidebarHeader>;

const SidebarFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} data-sidebar="footer" className={cn("flex flex-col gap-2 p-2", className)} {...props} />;
});
SidebarFooter.displayName = "SidebarFooter";
type SidebarFooterProps = React.ComponentProps<typeof SidebarFooter>;

const SidebarSeparator = React.forwardRef<React.ElementRef<typeof Separator>, React.ComponentProps<typeof Separator>>(
  ({ className, ...props }, ref) => {
    return <Separator ref={ref} data-sidebar="separator" className={cn("mx-2 w-auto bg-gray-50-border", className)} {...props} />;
  },
);
SidebarSeparator.displayName = "SidebarSeparator";
type SidebarSeparatorProps = React.ComponentProps<typeof SidebarSeparator>;

const SidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className)}
      {...props}
    />
  );
});
SidebarContent.displayName = "SidebarContent";
type SidebarContentProps = React.ComponentProps<typeof SidebarContent>;

const SidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} data-sidebar="group" className={cn("relative flex w-full min-w-0 flex-col py-2", className)} {...props} />;
});
SidebarGroup.displayName = "SidebarGroup";
type SidebarGroupProps = React.ComponentProps<typeof SidebarGroup>;

const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.ComponentProps<"div"> & { asChild?: boolean }>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        data-sidebar="group-label"
        className={cn(
          "duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-none transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarGroupLabel.displayName = "SidebarGroupLabel";
type SidebarGroupLabelProps = React.ComponentProps<typeof SidebarGroupLabel>;

const SidebarGroupAction = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button"> & { asChild?: boolean }>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-sidebar="group-action"
        className={cn(
          "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-none transition-transform hover:bg-gray-50-accent focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          // Increases the hit area of the button on mobile.
          "after:absolute after:-inset-2 after:md:hidden",
          "group-data-[collapsible=icon]:hidden",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarGroupAction.displayName = "SidebarGroupAction";
type SidebarGroupActionProps = React.ComponentProps<typeof SidebarGroupAction>;

const SidebarGroupContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => (
  <div ref={ref} data-sidebar="group-content" className={cn("w-full text-sm", className)} {...props} />
));
SidebarGroupContent.displayName = "SidebarGroupContent";
type SidebarGroupContentProps = React.ComponentProps<typeof SidebarGroupContent>;

const SidebarMenu = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(({ className, ...props }, ref) => (
  <ul ref={ref} data-sidebar="menu" className={cn("flex w-full min-w-0 flex-col gap-4", className)} {...props} />
));
SidebarMenu.displayName = "SidebarMenu";
type SidebarMenuProps = React.ComponentProps<typeof SidebarMenu>;

const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
  <li ref={ref} data-sidebar="menu-item" className={cn("group/menu-item relative ps-2", className)} {...props} />
));
SidebarMenuItem.displayName = "SidebarMenuItem";
type SidebarMenuItemProps = React.ComponentProps<typeof SidebarMenuItem>;

const sidebarMenuButtonVariants = tv({
  base: [
    "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-s-md rounded-e-none p-2 text-left text-sm text-text-400 font-medium outline-none transition-[width,height,padding] hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    "data-[active=true]:bg-primary data-[active=true]:text-gray-0 data-[active=true]:font-bold group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:w-14 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:pl-4 [&>span:last-child]:truncate",
    "[&>svg]:size-6 [&>svg]:shrink-0 [&>svg]:data-[active=true]:text-secondary group-data-[collapsible=icon]:[&>svg]:me-2",
    "data-[active=true]:before:[content:''] data-[active=true]:before:absolute data-[active=true]:before:start-0 data-[active=true]:before:h-10 data-[active=true]:before:w-1 data-[active=true]:before:bg-secondary data-[active=true]:before:rounded-e-md",
    "overflow-ellipsis whitespace-nowrap",
  ].join(" "),
  variants: {
    variant: {
      default: "hover:bg-gray-50",
      outline: "bg-background shadow-[0_0_0_1px_hsl(var(--gray--300))] hover:bg-gray-50 hover:shadow-[0_0_0_1px_hsl(var(--gray-400))]",
    },
    size: {
      default: "h-10 text-sm",
      sm: "h-7 text-xs",
      lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(({ asChild = false, isActive = false, variant = "default", size = "default", tooltip, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      ref={ref}
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right" align="center" hidden={state !== "collapsed" || isMobile} {...tooltip} />
    </Tooltip>
  );
});
SidebarMenuButton.displayName = "SidebarMenuButton";
type SidebarMenuButtonProps = React.ComponentProps<typeof SidebarMenuButton>;

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    showOnHover?: boolean;
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-none transition-transform hover:bg-gray-50-accent focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";
type SidebarMenuActionProps = React.ComponentProps<typeof SidebarMenuAction>;

const SidebarMenuBadge = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      "absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none pointer-events-none",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      className,
    )}
    {...props}
  />
));
SidebarMenuBadge.displayName = "SidebarMenuBadge";
type SidebarMenuBadgeProps = React.ComponentProps<typeof SidebarMenuBadge>;

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean;
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div ref={ref} data-sidebar="menu-skeleton" className={cn("rounded-md h-8 flex gap-2 px-2 items-center", className)} {...props}>
      {showIcon && <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
      <Skeleton
        className="h-4 flex-1 max-w-[--skeleton-width]"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";
type SidebarMenuSkeletonProps = React.ComponentProps<typeof SidebarMenuSkeleton>;

const SidebarMenuSub = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn("flex min-w-0 translate-x-px flex-col gap-1", "group-data-[collapsible=icon]:hidden", className)}
    {...props}
  />
));
SidebarMenuSub.displayName = "SidebarMenuSub";
type SidebarMenuSubProps = React.ComponentProps<typeof SidebarMenuSub>;

const SidebarMenuSubItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ ...props }, ref) => <li ref={ref} {...props} />);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";
type SidebarMenuSubItemProps = React.ComponentProps<typeof SidebarMenuSubItem>;

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-10 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-s-md ps-10 text-sm text-text-400 font-medium outline-none hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[active=true]:bg-gray-100 data-[active=true]:text-text",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";
type SidebarMenuSubButtonProps = React.ComponentProps<typeof SidebarMenuSubButton>;

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
  type SidebarProps,
  type SidebarContentProps,
  type SidebarFooterProps,
  type SidebarGroupProps,
  type SidebarGroupActionProps,
  type SidebarGroupContentProps,
  type SidebarGroupLabelProps,
  type SidebarHeaderProps,
  type SidebarInsetProps,
  type SidebarMenuProps,
  type SidebarMenuActionProps,
  type SidebarMenuBadgeProps,
  type SidebarMenuButtonProps,
  type SidebarMenuItemProps,
  type SidebarMenuSkeletonProps,
  type SidebarMenuSubProps,
  type SidebarMenuSubButtonProps,
  type SidebarMenuSubItemProps,
  type SidebarProviderProps,
  type SidebarRailProps,
  type SidebarSeparatorProps,
  type SidebarTriggerProps,
};
