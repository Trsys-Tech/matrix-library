"use client";

import React from "react";
import { cn } from "../../lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mtx-rounded-lg mtx-bg-card mtx-text-card-foreground mtx-shadow-card", className)} {...props} />
));
Card.displayName = "Card";
type CardProps = React.ComponentProps<typeof Card>;

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mtx-flex mtx-flex-col mtx-space-y-1.5 mtx-p-4", className)} {...props} />
));
CardHeader.displayName = "CardHeader";
type CardHeaderProps = React.ComponentProps<typeof CardHeader>;

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("mtx-font-semibold mtx-leading-none mtx-tracking-tight", className)} {...props} />
));
CardTitle.displayName = "CardTitle";
type CardTitleProps = React.ComponentProps<typeof CardTitle>;

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("mtx-text-sm mtx-text-muted-foreground", className)} {...props} />
));
CardDescription.displayName = "CardDescription";
type CardDescriptionProps = React.ComponentProps<typeof CardDescription>;

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mtx-p-4 mtx-pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";
type CardContentProps = React.ComponentProps<typeof CardContent>;

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mtx-flex mtx-items-center mtx-p-4 mtx-pt-0", className)} {...props} />
));
CardFooter.displayName = "CardFooter";
type CardFooterProps = React.ComponentProps<typeof CardFooter>;

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
export type { CardProps, CardHeaderProps, CardFooterProps, CardTitleProps, CardDescriptionProps, CardContentProps };
