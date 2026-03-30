"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "../../lib/utils";
import { ChevronRight, Elipsis } from "@trsys-tech/matrix-icons";

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "mtx-flex mtx-flex-wrap mtx-items-center mtx-gap-1.5 mtx-break-words mtx-text-sm mtx-text-muted-foreground sm:mtx-gap-2.5",
      className,
    )}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("mtx-inline-flex mtx-items-center mtx-gap-1.5", className)} {...props} />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return <Comp ref={ref} className={cn("mtx-transition-colors hover:mtx-text-foreground", className)} {...props} />;
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(({ className, ...props }, ref) => (
  <span ref={ref} role="link" aria-disabled="true" aria-current="page" className={cn("mtx-font-normal mtx-text-foreground", className)} {...props} />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
  <li role="presentation" aria-hidden="true" className={cn("[&>svg]:mtx-w-3.5 [&>svg]:mtx-h-3", className)} {...props}>
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span role="presentation" aria-hidden="true" className={cn("mtx-flex mtx-h-9 mtx-w-9 mtx-items-center mtx-justify-center", className)} {...props}>
    <Elipsis className="mtx-h-4 mtx-w-4" />
    <span className="mtx-sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis };
