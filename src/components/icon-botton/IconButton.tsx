import React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { tv, VariantProps } from "tailwind-variants";

import { cn } from "../../lib/utils";
import { Spinner } from "@trsys-tech/matrix-icons";

const iconButtonVariants = tv({
  base: "inline-flex items-center justify-center gap-1 p-2 rounded-sm text-xs font-normal transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:bg-muted disabled:text-gray-500",
  variants: {
    variant: {
      table: "text-text hover:bg-primary-50 focus:bg-transparent focus:ring active:bg-primary-50 active:text-primary-700",
      toolbar: "text-primary hover:bg-primary-50 focus:bg-transparent focus:ring active:bg-primary-50 active:text-primary-700",
      form: "border border-gray-300 text-primary hover:border-none hover:bg-primary-50 focus:border-none focus:bg-transparent focus:ring active:border-none active:bg-primary-50 active:text-primary-700 disabled:border-none",
      danger: "text-danger hover:bg-danger-200 focus:bg-transparent focus:ring focus:ring-danger-400 active:bg-danger-300",
      warning: "text-warning hover:bg-warning-200 focus:bg-transparent focus:ring focus:ring-warning-400 active:bg-warning-300",
      success: "text-success hover:bg-success-200 focus:bg-transparent focus:ring focus:ring-success-400 active:bg-success-300",
      info: "text-info hover:bg-info-200 focus:bg-transparent focus:ring focus:ring-info-400 active:bg-info-300",
    },
    size: {
      md: "h-8 w-8.5",
      sm: "h-6 w-6 p-1 [&>svg]:h-4 [&>svg]:w-4",
      lg: "h-10 w-10 [&>svg]:h-6 [&>svg]:w-6",
    },
  },
  defaultVariants: {
    variant: "table",
    size: "md",
  },
});

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ asChild, children, className, disabled, loading, variant, size, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(iconButtonVariants({ variant, size, className }))} disabled={disabled || loading} ref={ref} {...props}>
        {loading ? <Spinner /> : null}
        <Slottable>{children}</Slottable>
      </Comp>
    );
  },
);

export { IconButton, type IconButtonProps };
