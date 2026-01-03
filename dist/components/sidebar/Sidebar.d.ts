import { VariantProps, TVReturnType } from 'tailwind-variants';
import { TooltipContent } from '../tooltip/Tooltip';
import { SeparatorProps } from '@radix-ui/react-separator';
import { TVConfig } from 'tailwind-variants/dist/config';
import * as React from "react";
type SidebarContext = {
    state: "expanded" | "collapsed";
    open: boolean;
    setOpen: (open: boolean) => void;
    isMobile: boolean;
    toggleSidebar: () => void;
};
declare const SidebarContext: React.Context<SidebarContext | null>;
declare function useSidebar(): SidebarContext;
declare const SidebarProvider: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}, "ref"> & React.RefAttributes<HTMLDivElement>>;
type SidebarProviderProps = React.ComponentProps<typeof SidebarProvider>;
declare const Sidebar: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
    width?: string;
    widthIcon?: string;
    widthMobile?: string;
}, "ref"> & React.RefAttributes<HTMLDivElement>>;
type SidebarProps = React.ComponentProps<typeof Sidebar>;
declare const SidebarTrigger: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
}, "ref"> & React.RefAttributes<HTMLButtonElement>>;
type SidebarTriggerProps = React.ComponentProps<typeof SidebarTrigger>;
declare const SidebarRail: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
type SidebarRailProps = React.ComponentProps<typeof SidebarRail>;
declare const SidebarInset: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
type SidebarInsetProps = React.ComponentProps<typeof SidebarInset>;
declare const SidebarHeader: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
type SidebarHeaderProps = React.ComponentProps<typeof SidebarHeader>;
declare const SidebarFooter: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
type SidebarFooterProps = React.ComponentProps<typeof SidebarFooter>;
declare const SidebarSeparator: React.ForwardRefExoticComponent<Omit<Omit< SeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
type SidebarSeparatorProps = React.ComponentProps<typeof SidebarSeparator>;
declare const SidebarContent: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
type SidebarContentProps = React.ComponentProps<typeof SidebarContent>;
declare const SidebarGroup: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
type SidebarGroupProps = React.ComponentProps<typeof SidebarGroup>;
declare const SidebarGroupLabel: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> & {
    asChild?: boolean;
}, "ref"> & React.RefAttributes<HTMLDivElement>>;
type SidebarGroupLabelProps = React.ComponentProps<typeof SidebarGroupLabel>;
declare const SidebarGroupAction: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
}, "ref"> & React.RefAttributes<HTMLButtonElement>>;
type SidebarGroupActionProps = React.ComponentProps<typeof SidebarGroupAction>;
declare const SidebarGroupContent: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
type SidebarGroupContentProps = React.ComponentProps<typeof SidebarGroupContent>;
declare const SidebarMenu: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, "ref"> & React.RefAttributes<HTMLUListElement>>;
type SidebarMenuProps = React.ComponentProps<typeof SidebarMenu>;
declare const SidebarMenuItem: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & React.RefAttributes<HTMLLIElement>>;
type SidebarMenuItemProps = React.ComponentProps<typeof SidebarMenuItem>;
declare const SidebarMenuButton: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps< TVReturnType<{
    variant: {
        default: string;
        outline: string;
    };
    size: {
        default: string;
        sm: string;
        lg: string;
    };
}, undefined, string, TVConfig<{
    variant: {
        default: string;
        outline: string;
    };
    size: {
        default: string;
        sm: string;
        lg: string;
    };
}, {
    variant: {
        default: string;
        outline: string;
    };
    size: {
        default: string;
        sm: string;
        lg: string;
    };
}>, {
    variant: {
        default: string;
        outline: string;
    };
    size: {
        default: string;
        sm: string;
        lg: string;
    };
}, undefined, TVReturnType<{
    variant: {
        default: string;
        outline: string;
    };
    size: {
        default: string;
        sm: string;
        lg: string;
    };
}, undefined, string, TVConfig<{
    variant: {
        default: string;
        outline: string;
    };
    size: {
        default: string;
        sm: string;
        lg: string;
    };
}, {
    variant: {
        default: string;
        outline: string;
    };
    size: {
        default: string;
        sm: string;
        lg: string;
    };
}>, unknown, unknown, undefined>>>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
type SidebarMenuButtonProps = React.ComponentProps<typeof SidebarMenuButton>;
declare const SidebarMenuAction: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    showOnHover?: boolean;
}, "ref"> & React.RefAttributes<HTMLButtonElement>>;
type SidebarMenuActionProps = React.ComponentProps<typeof SidebarMenuAction>;
declare const SidebarMenuBadge: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
type SidebarMenuBadgeProps = React.ComponentProps<typeof SidebarMenuBadge>;
declare const SidebarMenuSkeleton: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> & {
    showIcon?: boolean;
}, "ref"> & React.RefAttributes<HTMLDivElement>>;
type SidebarMenuSkeletonProps = React.ComponentProps<typeof SidebarMenuSkeleton>;
declare const SidebarMenuSub: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, "ref"> & React.RefAttributes<HTMLUListElement>>;
type SidebarMenuSubProps = React.ComponentProps<typeof SidebarMenuSub>;
declare const SidebarMenuSubItem: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & React.RefAttributes<HTMLLIElement>>;
type SidebarMenuSubItemProps = React.ComponentProps<typeof SidebarMenuSubItem>;
declare const SidebarMenuSubButton: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLAnchorElement> & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
}, "ref"> & React.RefAttributes<HTMLAnchorElement>>;
type SidebarMenuSubButtonProps = React.ComponentProps<typeof SidebarMenuSubButton>;
export { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger, useSidebar, type SidebarProps, type SidebarContentProps, type SidebarFooterProps, type SidebarGroupProps, type SidebarGroupActionProps, type SidebarGroupContentProps, type SidebarGroupLabelProps, type SidebarHeaderProps, type SidebarInsetProps, type SidebarMenuProps, type SidebarMenuActionProps, type SidebarMenuBadgeProps, type SidebarMenuButtonProps, type SidebarMenuItemProps, type SidebarMenuSkeletonProps, type SidebarMenuSubProps, type SidebarMenuSubButtonProps, type SidebarMenuSubItemProps, type SidebarProviderProps, type SidebarRailProps, type SidebarSeparatorProps, type SidebarTriggerProps, };
//# sourceMappingURL=Sidebar.d.ts.map