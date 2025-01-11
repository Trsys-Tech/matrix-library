import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "../../lib/utils";

const badgeVariants = tv({
  base: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  variants: {
    variant: {
      default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary-600",
      secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary-600",
      outline: "border border-primary text-primary shadow hover:bg-primary-50",
      danger: "border-transparent bg-danger text-danger-foreground shadow hover:bg-danger-600",
      success: "border-transparent bg-success text-success-foreground shadow hover:bg-success-600",
      warning: "border-transparent bg-warning text-warning-foreground shadow hover:bg-warning-600",
      info: "border-transparent bg-info text-info-foreground shadow hover:bg-info-600",
    },
  },
  defaultVariants: {
    variant: "default",
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
