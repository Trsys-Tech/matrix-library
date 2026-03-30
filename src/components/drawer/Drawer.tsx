"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronsRight } from "@trsys-tech/matrix-icons";
import { createContextScope, Scope } from "@radix-ui/react-context";

import { cn } from "../../lib/utils";
import { Modal } from "../modal/Modal";
import { IconButton } from "../icon-botton/IconButton";
import { useIsMobile } from "../../lib/hooks/use-mobile";

type ScopedProps<P> = P & { __scopeDrawer?: Scope };

const DRAWER_NAME = "Drawer";

const [createDrawerContext] = createContextScope(DRAWER_NAME);

interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: () => void;
  anchor?: "left" | "right";
  width?: number;
  children?: React.ReactNode;
  asChild?: boolean;
  mobileBreakpoint?: number;
}

type DrawerContextValue = {
  open: boolean;
  onClose?: () => void;
  anchor: "left" | "right";
  width: number;
  isMobile: boolean;
};

const [DrawerProvider, useDrawerProvider] = createDrawerContext<DrawerContextValue>(DRAWER_NAME);

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
const Drawer = React.forwardRef<React.ElementRef<"div">, ScopedProps<DrawerProps>>((props, ref) => {
  const { asChild, anchor = "right", children, open, width = 240, className, onClose, __scopeDrawer, ...restProps } = props;
  const Comp = asChild ? Slot : "div";

  const isMobile = useIsMobile();

  return (
    <Comp ref={ref} className={cn("mtx-flex", className)} {...restProps}>
      <DrawerProvider anchor={anchor} onClose={onClose} open={open} width={width} isMobile={isMobile} scope={__scopeDrawer}>
        {children}
      </DrawerProvider>
    </Comp>
  );
});

Drawer.displayName = DRAWER_NAME;

interface DrawerMainProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild: boolean;
}

const DRAWER_MAIN_NAME = "DrawerMain";

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
const DrawerMain = React.forwardRef<HTMLDivElement, ScopedProps<DrawerMainProps>>(
  ({ asChild, children, className, style, __scopeDrawer, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    const { anchor, open, width, isMobile } = useDrawerProvider(DRAWER_MAIN_NAME, __scopeDrawer);

    const marginStyle = React.useMemo(() => {
      if (isMobile) {
        return {};
      }
      if (anchor === "left") {
        return { marginInlineStart: open ? width : 0 };
      } else {
        return { marginInlineEnd: open ? width : 0 };
      }
    }, [anchor, open, width, isMobile]);

    return (
      <Comp ref={ref} className={cn("mtx-flex-grow mtx-overflow-hidden", className)} style={{ ...style, ...marginStyle }} {...props}>
        {children}
      </Comp>
    );
  },
);

DrawerMain.displayName = DRAWER_MAIN_NAME;

type DrawerContentProps = {
  children?: React.ReactNode;
  title: React.ReactNode;
};

const DRAWER_CONTENT_NAME = "DrawerContent";

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
const DrawerContent = React.forwardRef<HTMLDivElement, ScopedProps<DrawerContentProps>>(({ children, title, __scopeDrawer }, ref) => {
  const { anchor, open, width, onClose, isMobile } = useDrawerProvider(DRAWER_CONTENT_NAME, __scopeDrawer);

  return (
    <>
      {isMobile ? (
        <Modal title={title} open={open} onOpenChange={onClose} ref={ref} fullScreen>
          {children}
        </Modal>
      ) : (
        <div className={cn("mtx-hidden md:mtx-block mtx-overflow-hidden")} style={{ width }} ref={ref}>
          <div
            className={cn(
              "mtx-overflow-y-auto mtx-flex mtx-flex-col mtx-h-full mtx-top-0 mtx-z-[120] mtx-bg-background mtx-transition-all mtx-border-gray-200",
              open
                ? ""
                : anchor === "left"
                  ? "-mtx-translate-x-full rtl:mtx-translate-x-full mtx-invisible"
                  : "mtx-translate-x-full rtl:-mtx-translate-x-full mtx-invisible",
              anchor === "left" ? "mtx-border-r" : "mtx-border-l",
            )}
          >
            <div
              className={cn(
                "mtx-h-9 mtx-flex mtx-items-center mtx-gap-2 mtx-p-2 mtx-bg-background mtx-w-full mtx-sticky mtx-top-0 mtx-border-b mtx-border-gray-200",
                anchor === "right" ? "mtx-justify-start rtl:mtx-justify-end" : "mtx-justify-end rtl:mtx-justify-start",
              )}
            >
              <IconButton onClick={onClose} className="mtx-w-5 mtx-h-5 mtx-p-0">
                <ChevronsRight className={cn("mtx-w-5 mtx-h-5", anchor === "right" ? "rtl:-mtx-scale-100" : "-mtx-scale-100 rtl:mtx-scale-100")} />
              </IconButton>
              {typeof title === "string" || typeof title === "number" ? <h2 className="mtx-text-lg mtx-font-bold mtx-text-text">{title}</h2> : title}
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
});

DrawerContent.displayName = DRAWER_CONTENT_NAME;

const Root = Drawer;
const Main = DrawerMain;
const Content = DrawerContent;

export { Drawer, DrawerMain, DrawerContent, Root, Main, Content };
export type { DrawerContentProps, DrawerMainProps, DrawerProps };
