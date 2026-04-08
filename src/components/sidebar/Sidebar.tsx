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
          className={cn("mtx-group/sidebar-wrapper mtx-flex mtx-h-full mtx-w-full has-[[data-variant=inset]]:mtx-bg-gray-50", className)}
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
          "mtx-flex mtx-h-full data-[side=left]:mtx-w-[--sidebar-left-width] data-[side=right]:mtx-w-[--sidebar-right-width] mtx-flex-col mtx-bg-gray-50",
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
          className="data-[side=left]:mtx-w-[--sidebar-left-width] data-[side=right]:mtx-w-[--sidebar-right-width] mtx-bg-gray-50 mtx-p-0 [&>button]:mtx-hidden"
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
          <div className="mtx-flex mtx-h-full mtx-w-full mtx-flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      ref={ref}
      className="mtx-group mtx-peer mtx-hidden md:mtx-block mtx-relative"
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
          "mtx-duration-200 mtx-relative mtx-h-full group-data-[side=left]:mtx-w-[--sidebar-left-width] group-data-[side=right]:mtx-w-[--sidebar-right-width] mtx-bg-transparent mtx-transition-[width] mtx-ease-linear",
          "group-data-[side=left]:group-data-[collapsible=offcanvas]:mtx-w-0 group-data-[side=right]:group-data-[collapsible=offcanvas]:mtx-w-0",
          "group-data-[side=right]:mtx-rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[side=left]:group-data-[collapsible=icon]:mtx-w-[calc(var(--sidebar-left-width-icon)_+_theme(spacing.4))] group-data-[side=right]:group-data-[collapsible=icon]:mtx-w-[calc(var(--sidebar-right-width-icon)_+_theme(spacing.4))]"
            : "group-data-[side=left]:group-data-[collapsible=icon]:mtx-w-[--sidebar-left-width-icon] group-data-[side=right]:group-data-[collapsible=icon]:mtx-w-[--sidebar-right-width-icon]",
        )}
      />
      <div
        className={cn(
          "mtx-duration-200 mtx-absolute mtx-inset-y-0 mtx-z-10 mtx-hidden mtx-h-full group-data-[side=left]:mtx-w-[--sidebar-left-width] group-data-[side=right]:mtx-w-[--sidebar-right-width] mtx-transition-[left,right,width] mtx-ease-linear md:mtx-flex",
          side === "left"
            ? "mtx-left-0 group-data-[collapsible=offcanvas]:mtx-left-[calc(var(--sidebar-left-width)*-1)]"
            : "mtx-right-0 group-data-[collapsible=offcanvas]:mtx-right-[calc(var(--sidebar-right-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "mtx-p-2 group-data-[side=left]:group-data-[collapsible=icon]:mtx-w-[calc(var(--sidebar-left-width-icon)_+_theme(spacing.4)_+2px)] group-data-[side=right]:group-data-[collapsible=icon]:mtx-w-[calc(var(--sidebar-right-width-icon)_+_theme(spacing.4)_+2px)]"
            : "group-data-[side=left]:group-data-[collapsible=icon]:mtx-w-[--sidebar-left-width-icon] group-data-[side=right]:group-data-[collapsible=icon]:mtx-w-[--sidebar-right-width-icon] group-data-[side=left]:mtx-border-r group-data-[side=right]:mtx-border-l",
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          className="mtx-flex mtx-h-full mtx-w-full mtx-flex-col mtx-bg-gray-50 group-data-[variant=floating]:mtx-rounded-lg group-data-[variant=floating]:mtx-border group-data-[variant=floating]:mtx-shadow"
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
        className={cn("mtx-h-7 mtx-w-7", className)}
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
        "mtx-absolute mtx-inset-y-0 mtx-z-20 mtx-hidden mtx-w-4 -mtx-translate-x-1/2 mtx-transition-all mtx-ease-linear after:mtx-absolute after:mtx-inset-y-0 after:mtx-left-1/2 after:mtx-w-[2px] hover:after:mtx-bg-gray-50-border group-data-[side=left]:-mtx-right-4 group-data-[side=right]:mtx-left-0 sm:mtx-flex",
        "[[data-side=left]_&]:mtx-cursor-w-resize [[data-side=right]_&]:mtx-cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:mtx-cursor-e-resize [[data-side=right][data-state=collapsed]_&]:mtx-cursor-w-resize",
        "group-data-[collapsible=offcanvas]:mtx-translate-x-0 group-data-[collapsible=offcanvas]:after:mtx-left-full group-data-[collapsible=offcanvas]:hover:mtx-bg-gray-50",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-mtx-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-mtx-left-2",
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
        "mtx-relative mtx-flex mtx-h-full mtx-flex-1 mtx-flex-col mtx-bg-background",
        "peer-data-[variant=inset]:mtx-min-h-[calc(100%-theme(spacing.4))] md:peer-data-[variant=inset]:mtx-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:mtx-ml-2 md:peer-data-[variant=inset]:mtx-ml-0 md:peer-data-[variant=inset]:mtx-rounded-xl md:peer-data-[variant=inset]:mtx-shadow",
        className,
      )}
      {...props}
    />
  );
});
SidebarInset.displayName = "SidebarInset";
type SidebarInsetProps = React.ComponentProps<typeof SidebarInset>;

const SidebarHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} data-sidebar="header" className={cn("mtx-flex mtx-flex-col mtx-gap-2 mtx-p-2", className)} {...props} />;
});
SidebarHeader.displayName = "SidebarHeader";
type SidebarHeaderProps = React.ComponentProps<typeof SidebarHeader>;

const SidebarFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} data-sidebar="footer" className={cn("mtx-flex mtx-flex-col mtx-gap-2 mtx-p-2", className)} {...props} />;
});
SidebarFooter.displayName = "SidebarFooter";
type SidebarFooterProps = React.ComponentProps<typeof SidebarFooter>;

const SidebarSeparator = React.forwardRef<React.ElementRef<typeof Separator>, React.ComponentProps<typeof Separator>>(
  ({ className, ...props }, ref) => {
    return <Separator ref={ref} data-sidebar="separator" className={cn("mtx-mx-2 mtx-w-auto mtx-bg-gray-50-border", className)} {...props} />;
  },
);
SidebarSeparator.displayName = "SidebarSeparator";
type SidebarSeparatorProps = React.ComponentProps<typeof SidebarSeparator>;

const SidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "mtx-flex mtx-min-h-0 mtx-flex-1 mtx-flex-col mtx-gap-2 mtx-overflow-auto group-data-[collapsible=icon]:mtx-overflow-hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarContent.displayName = "SidebarContent";
type SidebarContentProps = React.ComponentProps<typeof SidebarContent>;

const SidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} data-sidebar="group" className={cn("mtx-relative mtx-flex mtx-w-full mtx-min-w-0 mtx-flex-col mtx-py-2", className)} {...props} />
  );
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
          "mtx-duration-200 mtx-flex mtx-h-8 mtx-shrink-0 mtx-items-center mtx-rounded-md mtx-px-2 mtx-text-xs mtx-font-medium mtx-outline-none mtx-transition-[margin,opacity] mtx-ease-linear focus-visible:mtx-ring-2 [&>svg]:mtx-size-4 [&>svg]:mtx-shrink-0",
          "group-data-[collapsible=icon]:-mtx-mt-8 group-data-[collapsible=icon]:mtx-opacity-0",
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
          "mtx-absolute mtx-right-3 mtx-top-3.5 mtx-flex mtx-aspect-square mtx-w-5 mtx-items-center mtx-justify-center mtx-rounded-md mtx-p-0 mtx-outline-none mtx-transition-transform hover:mtx-bg-gray-50-accent focus-visible:mtx-ring-2 [&>svg]:mtx-size-4 [&>svg]:mtx-shrink-0",
          // Increases the hit area of the button on mobile.
          "after:mtx-absolute after:-mtx-inset-2 after:md:mtx-hidden",
          "group-data-[collapsible=icon]:mtx-hidden",
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
  <div ref={ref} data-sidebar="group-content" className={cn("mtx-w-full mtx-text-sm", className)} {...props} />
));
SidebarGroupContent.displayName = "SidebarGroupContent";
type SidebarGroupContentProps = React.ComponentProps<typeof SidebarGroupContent>;

const SidebarMenu = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(({ className, ...props }, ref) => (
  <ul ref={ref} data-sidebar="menu" className={cn("mtx-flex mtx-w-full mtx-min-w-0 mtx-flex-col mtx-gap-4", className)} {...props} />
));
SidebarMenu.displayName = "SidebarMenu";
type SidebarMenuProps = React.ComponentProps<typeof SidebarMenu>;

const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
  <li ref={ref} data-sidebar="menu-item" className={cn("mtx-group/menu-item mtx-relative mtx-ps-2", className)} {...props} />
));
SidebarMenuItem.displayName = "SidebarMenuItem";
type SidebarMenuItemProps = React.ComponentProps<typeof SidebarMenuItem>;

const sidebarMenuButtonVariants = tv({
  base: [
    "mtx-peer/menu-button mtx-flex mtx-w-full mtx-items-center mtx-gap-2 mtx-overflow-hidden mtx-rounded-s-md mtx-rounded-e-none mtx-p-2 mtx-text-left mtx-text-sm mtx-text-text-400 mtx-font-medium mtx-outline-none mtx-transition-[width,height,padding] hover:mtx-bg-gray-50 disabled:mtx-pointer-events-none disabled:mtx-opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:mtx-pr-8 aria-disabled:mtx-pointer-events-none aria-disabled:mtx-opacity-50",
    "data-[active=true]:mtx-bg-primary data-[active=true]:mtx-text-gray-0 data-[active=true]:mtx-font-bold group-data-[collapsible=icon]:mtx-size-10 group-data-[collapsible=icon]:mtx-w-14 group-data-[collapsible=icon]:mtx-p-2 group-data-[collapsible=icon]:mtx-pl-4 [&>span:last-child]:mtx-truncate",
    "[&>svg]:mtx-size-6 [&>svg]:mtx-shrink-0 [&>svg]:data-[active=true]:mtx-text-secondary group-data-[collapsible=icon]:[&>svg]:mtx-me-2",
    "data-[active=true]:before:mtx-[content:''] data-[active=true]:before:mtx-absolute data-[active=true]:before:mtx-start-0 data-[active=true]:before:mtx-h-10 data-[active=true]:before:mtx-w-1 data-[active=true]:before:mtx-bg-secondary data-[active=true]:before:mtx-rounded-e-md",
    "mtx-overflow-ellipsis mtx-whitespace-nowrap",
  ].join(" "),
  variants: {
    variant: {
      default: "hover:mtx-bg-gray-50",
      outline: "mtx-bg-background mtx-shadow-[oklch(var(--gray--300))] hover:mtx-bg-gray-50 hover:mtx-shadow-[oklch(var(--gray-400))]",
    },
    size: {
      default: "mtx-h-10 mtx-text-sm",
      sm: "mtx-h-7 mtx-text-xs",
      lg: "mtx-h-12 mtx-text-sm group-data-[collapsible=icon]:mtx-!p-0",
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
        "mtx-absolute mtx-right-1 mtx-top-1.5 mtx-flex mtx-aspect-square mtx-w-5 mtx-items-center mtx-justify-center mtx-rounded-md mtx-p-0 mtx-outline-none mtx-transition-transform hover:mtx-bg-gray-50-accent focus-visible:mtx-ring-2 [&>svg]:mtx-size-4 [&>svg]:mtx-shrink-0",
        // Increases the hit area of the button on mobile.
        "after:mtx-absolute after:-mtx-inset-2 after:md:mtx-hidden",
        "peer-data-[size=sm]/menu-button:mtx-top-1",
        "peer-data-[size=default]/menu-button:mtx-top-1.5",
        "peer-data-[size=lg]/menu-button:mtx-top-2.5",
        "group-data-[collapsible=icon]:mtx-hidden",
        showOnHover &&
          "group-focus-within/menu-item:mtx-opacity-100 group-hover/menu-item:mtx-opacity-100 data-[state=open]:mtx-opacity-100 md:mtx-opacity-0",
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
      "mtx-absolute mtx-right-1 mtx-flex mtx-h-5 mtx-min-w-5 mtx-items-center mtx-justify-center mtx-rounded-md mtx-px-1 mtx-text-xs mtx-font-medium mtx-tabular-nums mtx-select-none mtx-pointer-events-none",
      "peer-data-[size=sm]/menu-button:mtx-top-1",
      "peer-data-[size=default]/menu-button:mtx-top-1.5",
      "peer-data-[size=lg]/menu-button:mtx-top-2.5",
      "group-data-[collapsible=icon]:mtx-hidden",
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
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("mtx-rounded-md mtx-h-8 mtx-flex mtx-gap-2 mtx-px-2 mtx-items-center", className)}
      {...props}
    >
      {showIcon && <Skeleton className="mtx-size-4 mtx-rounded-md" data-sidebar="menu-skeleton-icon" />}
      <Skeleton
        className="mtx-h-4 mtx-flex-1 mtx-max-w-[--skeleton-width]"
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
    className={cn("mtx-flex mtx-min-w-0 mtx-translate-x-px mtx-flex-col mtx-gap-1", "group-data-[collapsible=icon]:mtx-hidden", className)}
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
        "mtx-flex mtx-h-10 mtx-min-w-0 -mtx-translate-x-px mtx-items-center mtx-gap-2 mtx-overflow-hidden mtx-rounded-s-md mtx-ps-10 mtx-text-sm mtx-text-text-400 mtx-font-medium mtx-outline-none hover:mtx-bg-gray-50 disabled:mtx-pointer-events-none disabled:mtx-opacity-50 aria-disabled:mtx-pointer-events-none aria-disabled:mtx-opacity-50 [&>span:last-child]:mtx-truncate [&>svg]:mtx-size-4 [&>svg]:mtx-shrink-0",
        "data-[active=true]:mtx-bg-gray-100 data-[active=true]:mtx-text-text",
        size === "sm" && "mtx-text-xs",
        size === "md" && "mtx-text-sm",
        "group-data-[collapsible=icon]:mtx-hidden",
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
