import { Drawer as DrawerPrimitive } from 'vaul';
import { DialogTriggerProps, DialogCloseProps, DialogContentProps, DialogTitleProps, DialogDescriptionProps } from '@radix-ui/react-dialog';
import * as React from "react";
declare const SwipableDrawer: {
    ({ shouldScaleBackground, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
type SwipableDrawerProps = React.ComponentProps<typeof SwipableDrawer>;
declare const SwipableDrawerTrigger: React.ForwardRefExoticComponent< DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
type SwipableDrawerTriggerProps = React.ComponentProps<typeof SwipableDrawerTrigger>;
declare const SwipableDrawerClose: React.ForwardRefExoticComponent< DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
type SwipableDrawerCloseProps = React.ComponentProps<typeof SwipableDrawerClose>;
declare const SwipableDrawerContent: React.ForwardRefExoticComponent<Omit<Omit< DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
type SwipableDrawerContentProps = React.ComponentProps<typeof SwipableDrawerContent>;
declare const SwipableDrawerHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
type SwipableDrawerHeaderProps = React.ComponentProps<typeof SwipableDrawerHeader>;
declare const SwipableDrawerFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
type SwipableDrawerFooterProps = React.ComponentProps<typeof SwipableDrawerFooter>;
declare const SwipableDrawerTitle: React.ForwardRefExoticComponent<Omit< DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
type SwipableDrawerTitleProps = React.ComponentProps<typeof SwipableDrawerTitle>;
declare const SwipableDrawerDescription: React.ForwardRefExoticComponent<Omit< DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
type SwipableDrawerDescriptionProps = React.ComponentProps<typeof SwipableDrawerDescription>;
export { SwipableDrawer, SwipableDrawerTrigger, SwipableDrawerClose, SwipableDrawerContent, SwipableDrawerHeader, SwipableDrawerFooter, SwipableDrawerTitle, SwipableDrawerDescription, type SwipableDrawerProps, type SwipableDrawerTriggerProps, type SwipableDrawerCloseProps, type SwipableDrawerContentProps, type SwipableDrawerHeaderProps, type SwipableDrawerFooterProps, type SwipableDrawerTitleProps, type SwipableDrawerDescriptionProps, };
//# sourceMappingURL=SwipableDrawer.d.ts.map