import { VariantProps, TVReturnType } from 'tailwind-variants';
import { TVConfig } from 'tailwind-variants/dist/config.js';
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
declare const switchVariants: TVReturnType<{
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, undefined, "mtx-peer mtx-inline-flex mtx-h-4 mtx-w-7 mtx-shrink-0 mtx-cursor-pointer mtx-items-center mtx-rounded-full mtx-border-2 mtx-border-transparent mtx-shadow-sm mtx-transition-colors focus-visible:mtx-outline-none focus-visible:mtx-ring-2 focus-visible:mtx-ring-ring focus-visible:mtx-ring-offset-2 focus-visible:mtx-ring-offset-background disabled:mtx-cursor-not-allowed disabled:mtx-opacity-50 data-[state=checked]:mtx-bg-primary data-[state=unchecked]:mtx-bg-input", TVConfig<{
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, {
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}>, {
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, undefined, TVReturnType<{
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, undefined, "mtx-peer mtx-inline-flex mtx-h-4 mtx-w-7 mtx-shrink-0 mtx-cursor-pointer mtx-items-center mtx-rounded-full mtx-border-2 mtx-border-transparent mtx-shadow-sm mtx-transition-colors focus-visible:mtx-outline-none focus-visible:mtx-ring-2 focus-visible:mtx-ring-ring focus-visible:mtx-ring-offset-2 focus-visible:mtx-ring-offset-background disabled:mtx-cursor-not-allowed disabled:mtx-opacity-50 data-[state=checked]:mtx-bg-primary data-[state=unchecked]:mtx-bg-input", TVConfig<{
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, {
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}>, unknown, unknown, undefined>>;
interface SwitchProps extends SwitchPrimitives.SwitchProps, VariantProps<typeof switchVariants> {
}
declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLButtonElement>>;
export { Switch, type SwitchProps };
//# sourceMappingURL=Switch.d.ts.map