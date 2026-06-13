"use client";

import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { tv, VariantProps } from "tailwind-variants";

import { cn } from "../../lib/utils";

const badgeVariants = tv({
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-xs font-medium",
  variants: {
    variant: {
      primary: "bg-primary-25 text-primary-300 border border-primary-300",
      outline: "bg-gray-0 text-primary-300 border border-primary-300",
    },
    size: {
      sm: "px-2 h-6",
      md: "px-4 h-8",
      lg: "px-6 h-10 text-sm rounded-md",
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
