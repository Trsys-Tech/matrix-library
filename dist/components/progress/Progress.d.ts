import { VariantProps, TVReturnType } from 'tailwind-variants';
import { TVConfig } from 'tailwind-variants/dist/config';
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
declare const progressVariants: TVReturnType<{
    variant: {
        primary: string;
        info: string;
        success: string;
        warning: string;
        danger: string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, undefined, "", TVConfig<{
    variant: {
        primary: string;
        info: string;
        success: string;
        warning: string;
        danger: string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, {
    variant: {
        primary: string;
        info: string;
        success: string;
        warning: string;
        danger: string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}>, {
    variant: {
        primary: string;
        info: string;
        success: string;
        warning: string;
        danger: string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, undefined, TVReturnType<{
    variant: {
        primary: string;
        info: string;
        success: string;
        warning: string;
        danger: string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, undefined, "", TVConfig<{
    variant: {
        primary: string;
        info: string;
        success: string;
        warning: string;
        danger: string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, {
    variant: {
        primary: string;
        info: string;
        success: string;
        warning: string;
        danger: string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}>, unknown, unknown, undefined>>;
type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    variant?: VariantProps<typeof progressVariants>["variant"];
    size?: VariantProps<typeof progressVariants>["size"];
};
declare const Progress: React.ForwardRefExoticComponent<Omit<ProgressPrimitive.ProgressProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    variant?: VariantProps<typeof progressVariants>["variant"];
    size?: VariantProps<typeof progressVariants>["size"];
} & React.RefAttributes<HTMLDivElement>>;
export { Progress, type ProgressProps };
//# sourceMappingURL=Progress.d.ts.map