"use client";

import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "../../lib/utils";

const badgeVariants = tv({
  base: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent",
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground hover:bg-primary-600",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-600",
      outline: "border border-primary text-primary hover:bg-primary-50",
      danger: "bg-danger text-danger-foreground hover:bg-danger-600",
      success: "bg-success text-success-foreground hover:bg-success-600",
      warning: "bg-warning text-warning-foreground hover:bg-warning-600",
      info: "bg-info text-info-foreground hover:bg-info-600",
      "primary-inverse": "bg-primary-100 text-primary-700 hover:bg-primary-50",
      "success-inverse": "bg-success-300 text-success-700 hover:bg-success-200",
      "danger-inverse": "bg-danger-300 text-danger-600 hover:bg-danger-200",
      "warning-inverse": "bg-warning-300 text-warning-800 hover:bg-warning-200",
      "info-inverse": "bg-info-300 text-info-700 hover:bg-info-200",
      "purple-inverse": "bg-purple-200 text-purple-500 hover:bg-purple-100",
      "coral-inverse": "bg-coral-300 text-coral-600 hover:bg-coral-200",
      "turquoise-inverse": "bg-turquoise-200 text-turquoise-600 hover:bg-turquoise-100",
      "lime-inverse": "bg-lime-300 text-lime-700 hover:bg-lime-200",
      "gray-inverse": "bg-gray-300 text-text-500 hover:bg-gray-200",
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
