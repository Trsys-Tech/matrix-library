"use client";

import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { tv, VariantProps } from "tailwind-variants";

import { cn } from "../../lib/utils";

const badgeVariants = tv({
  base: "mtx-inline-flex mtx-items-center mtx-justify-center mtx-gap-2 mtx-whitespace-nowrap mtx-rounded-sm mtx-text-xs mtx-font-medium",
  variants: {
    variant: {
      primary: "mtx-bg-primary-25 mtx-text-primary-300 mtx-border mtx-border-primary-300",
      outline: "mtx-bg-gray-0 mtx-text-primary-300 mtx-border mtx-border-primary-200",
    },
    size: {
      sm: "mtx-px-2 mtx-h-6",
      md: "mtx-px-4 mtx-h-8",
      lg: "mtx-px-6 mtx-h-10 mtx-text-sm",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

interface BadgeProps extends React.ButtonHTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant, asChild = false, children, size, ...props }, ref) => {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp className={cn(badgeVariants({ variant, size, className }))} ref={ref} {...props}>
      {children}
    </Comp>
  );
});
Badge.displayName = "Badge";

export { Badge, type BadgeProps };
