"use client";

import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "../../lib/utils";

const badgeVariants = tv({
  base: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  variants: {
    variant: {
      primary: "border-transparent bg-primary text-primary-foreground hover:bg-primary-600",
      secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary-600",
      outline: "border border-primary text-primary hover:bg-primary-50",
      danger: "border-transparent bg-danger text-danger-foreground hover:bg-danger-600",
      success: "border-transparent bg-success text-success-foreground hover:bg-success-600",
      warning: "border-transparent bg-warning text-warning-foreground hover:bg-warning-600",
      info: "border-transparent bg-info text-info-foreground hover:bg-info-600",
      primaryInverse: "border-transparent bg-primary-100 text-primary-700 hover:bg-primary-50",
      successInverse: "border-transparent bg-success-300 text-success-700 hover:bg-success-200",
      dangerInverse: "border-transparent bg-danger-300 text-danger-700 hover:bg-danger-200",
      warningInverse: "border-transparent bg-warning-300 text-warning-700 hover:bg-warning-200",
      infoInverse: "border-transparent bg-info-300 text-info-700 hover:bg-info-200",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

const Badge: React.FC<BadgeProps> = ({ className, variant, ...props }) => {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
};

export { Badge, type BadgeProps };
