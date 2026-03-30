"use client";

import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "../../lib/utils";

const badgeVariants = tv({
  base: "mtx-inline-flex mtx-items-center mtx-rounded-full mtx-border mtx-px-2.5 mtx-py-0.5 mtx-text-xs mtx-font-semibold mtx-transition-colors focus:mtx-outline-none focus:mtx-ring-2 focus:mtx-ring-ring focus:mtx-ring-offset-2 mtx-border-transparent",
  variants: {
    variant: {
      primary: "mtx-bg-primary mtx-text-primary-foreground hover:mtx-bg-primary-600",
      secondary: "mtx-bg-secondary mtx-text-secondary-foreground hover:mtx-bg-secondary-600",
      outline: "mtx-border mtx-border-primary mtx-text-primary hover:mtx-bg-primary-50",
      danger: "mtx-bg-danger mtx-text-danger-foreground hover:mtx-bg-danger-600",
      success: "mtx-bg-success mtx-text-success-foreground hover:mtx-bg-success-600",
      warning: "mtx-bg-warning mtx-text-warning-foreground hover:mtx-bg-warning-600",
      info: "mtx-bg-info mtx-text-info-foreground hover:mtx-bg-info-600",
      "primary-inverse": "mtx-bg-primary-100 mtx-text-primary-700 hover:mtx-bg-primary-50",
      "success-inverse": "mtx-bg-success-300 mtx-text-success-700 hover:mtx-bg-success-200",
      "danger-inverse": "mtx-bg-danger-300 mtx-text-danger-600 hover:mtx-bg-danger-200",
      "warning-inverse": "mtx-bg-warning-300 mtx-text-warning-800 hover:mtx-bg-warning-200",
      "info-inverse": "mtx-bg-info-300 mtx-text-info-700 hover:mtx-bg-info-200",
      "purple-inverse": "mtx-bg-purple-200 mtx-text-purple-500 hover:mtx-bg-purple-100",
      "coral-inverse": "mtx-bg-coral-300 mtx-text-coral-600 hover:mtx-bg-coral-200",
      "turquoise-inverse": "mtx-bg-turquoise-200 mtx-text-turquoise-600 hover:mtx-bg-turquoise-100",
      "lime-inverse": "mtx-bg-lime-300 mtx-text-lime-700 hover:mtx-bg-lime-200",
      "gray-inverse": "mtx-bg-gray-300 mtx-text-text-500 hover:mtx-bg-gray-200",
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
