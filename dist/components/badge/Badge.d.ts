import { default as React } from 'react';
import { VariantProps, TVReturnType } from 'tailwind-variants';
import { TVConfig } from 'tailwind-variants/dist/config.js';
declare const badgeVariants: TVReturnType<{
    variant: {
        primary: string;
        outline: string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, undefined, "mtx-inline-flex mtx-items-center mtx-justify-center mtx-gap-2 mtx-whitespace-nowrap mtx-rounded-sm mtx-text-xs mtx-font-medium", TVConfig<{
    variant: {
        primary: string;
        outline: string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, {
    variant: {
        primary: string;
        outline: string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}>, {
    variant: {
        primary: string;
        outline: string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, undefined, TVReturnType<{
    variant: {
        primary: string;
        outline: string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, undefined, "mtx-inline-flex mtx-items-center mtx-justify-center mtx-gap-2 mtx-whitespace-nowrap mtx-rounded-sm mtx-text-xs mtx-font-medium", TVConfig<{
    variant: {
        primary: string;
        outline: string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, {
    variant: {
        primary: string;
        outline: string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}>, unknown, unknown, undefined>>;
interface BadgeProps extends React.ButtonHTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
    asChild?: boolean;
}
declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLSpanElement>>;
export { Badge, type BadgeProps };
//# sourceMappingURL=Badge.d.ts.map