import { Scope } from '@radix-ui/react-context';
import * as React from "react";
interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
    open: boolean;
    onClose?: () => void;
    anchor?: "left" | "right";
    width?: number;
    children?: React.ReactNode;
    asChild?: boolean;
    mobileBreakpoint?: number;
}
/**
 * Drawer component
 * This is the wrapper component for Drawer content and main components
 * @param {React.HTMLAttributes<HTMLDivElement>} props
 * @param {boolean} open - Drawer open state
 * @param {() => void} onClose - Drawer close handler
 * @param {"left" | "right"} anchor - Drawer anchor position
 * @param {number} width - Drawer width
 * @param {React.ReactNode} children - Drawer children
 * @param {boolean} asChild - Render as child component
 * @returns {React.ReactElement}
 */
declare const Drawer: React.ForwardRefExoticComponent<DrawerProps & {
    __scopeDrawer?: Scope;
} & React.RefAttributes<HTMLDivElement>>;
interface DrawerMainProps extends React.HTMLAttributes<HTMLDivElement> {
    asChild: boolean;
}
/**
 * DrawerMain component
 * This is the main container for the tree that should be shown always
 * @param {React.HTMLAttributes<HTMLDivElement>} props
 * @param {boolean} asChild - Render as child component
 * @property {React.ReactNode} children - DrawerMain children
 * @property {string} className - DrawerMain class name
 * @property {React.CSSProperties} style - DrawerMain style
 * @property {ScopedProps<DrawerMainProps>} __scopeDrawer - DrawerMain scope
 * @property {React.Ref<HTMLDivElement>} ref - DrawerMain ref
 * @property {React.HTMLAttributes<HTMLDivElement>} props - DrawerMain props
 * @returns {React.ReactElement}
 */
declare const DrawerMain: React.ForwardRefExoticComponent<DrawerMainProps & {
    __scopeDrawer?: Scope;
} & React.RefAttributes<HTMLDivElement>>;
type DrawerContentProps = {
    children?: React.ReactNode;
    title: React.ReactNode;
};
/**
 * DrawerContent component
 * This is the content container for the tree that should be shown when the drawer is open
 * @param {React.HTMLAttributes<HTMLDivElement>} props
 * @param {React.ReactNode} children - DrawerContent children
 * @param {React.ReactNode} title - DrawerContent title
 * @property {ScopedProps<DrawerContentProps>} __scopeDrawer - DrawerContent scope
 * @property {React.Ref<HTMLDivElement>} ref - DrawerContent ref
 * @property {React.HTMLAttributes<HTMLDivElement>} props - DrawerContent props
 * @returns {React.ReactElement}
 */
declare const DrawerContent: React.ForwardRefExoticComponent<DrawerContentProps & {
    __scopeDrawer?: Scope;
} & React.RefAttributes<HTMLDivElement>>;
declare const Root: React.ForwardRefExoticComponent<DrawerProps & {
    __scopeDrawer?: Scope;
} & React.RefAttributes<HTMLDivElement>>;
declare const Main: React.ForwardRefExoticComponent<DrawerMainProps & {
    __scopeDrawer?: Scope;
} & React.RefAttributes<HTMLDivElement>>;
declare const Content: React.ForwardRefExoticComponent<DrawerContentProps & {
    __scopeDrawer?: Scope;
} & React.RefAttributes<HTMLDivElement>>;
export { Drawer, DrawerMain, DrawerContent, Root, Main, Content };
export type { DrawerContentProps, DrawerMainProps, DrawerProps };
//# sourceMappingURL=Drawer.d.ts.map