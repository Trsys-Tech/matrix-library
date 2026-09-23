import { VariantProps, TVReturnType } from 'tailwind-variants';
import { TVConfig } from 'tailwind-variants/dist/config.js';
import * as React from "react";
declare const buttonVariants: TVReturnType<{
    variant: {
        primary: string;
        outline: string;
        text: string;
        danger: string;
        warning: string;
        success: string;
        info: string;
        "primary-on-dark": string;
        "outline-on-dark": string;
        "text-on-dark": string;
    };
    size: {
        md: string;
        sm: string;
        lg: string;
    };
}, undefined, "mtx-inline-flex mtx-items-center mtx-justify-center mtx-gap-1 mtx-whitespace-nowrap mtx-rounded-sm mtx-text-xs mtx-font-normal mtx-transition-colors focus-visible:mtx-outline-none disabled:mtx-pointer-events-none disabled:mtx-bg-muted disabled:mtx-text-gray-500", TVConfig<{
    variant: {
        primary: string;
        outline: string;
        text: string;
        danger: string;
        warning: string;
        success: string;
        info: string;
        "primary-on-dark": string;
        "outline-on-dark": string;
        "text-on-dark": string;
    };
    size: {
        md: string;
        sm: string;
        lg: string;
    };
}, {
    variant: {
        primary: string;
        outline: string;
        text: string;
        danger: string;
        warning: string;
        success: string;
        info: string;
        "primary-on-dark": string;
        "outline-on-dark": string;
        "text-on-dark": string;
    };
    size: {
        md: string;
        sm: string;
        lg: string;
    };
}>, {
    variant: {
        primary: string;
        outline: string;
        text: string;
        danger: string;
        warning: string;
        success: string;
        info: string;
        "primary-on-dark": string;
        "outline-on-dark": string;
        "text-on-dark": string;
    };
    size: {
        md: string;
        sm: string;
        lg: string;
    };
}, undefined, TVReturnType<{
    variant: {
        primary: string;
        outline: string;
        text: string;
        danger: string;
        warning: string;
        success: string;
        info: string;
        "primary-on-dark": string;
        "outline-on-dark": string;
        "text-on-dark": string;
    };
    size: {
        md: string;
        sm: string;
        lg: string;
    };
}, undefined, "mtx-inline-flex mtx-items-center mtx-justify-center mtx-gap-1 mtx-whitespace-nowrap mtx-rounded-sm mtx-text-xs mtx-font-normal mtx-transition-colors focus-visible:mtx-outline-none disabled:mtx-pointer-events-none disabled:mtx-bg-muted disabled:mtx-text-gray-500", TVConfig<{
    variant: {
        primary: string;
        outline: string;
        text: string;
        danger: string;
        warning: string;
        success: string;
        info: string;
        "primary-on-dark": string;
        "outline-on-dark": string;
        "text-on-dark": string;
    };
    size: {
        md: string;
        sm: string;
        lg: string;
    };
}, {
    variant: {
        primary: string;
        outline: string;
        text: string;
        danger: string;
        warning: string;
        success: string;
        info: string;
        "primary-on-dark": string;
        "outline-on-dark": string;
        "text-on-dark": string;
    };
    size: {
        md: string;
        sm: string;
        lg: string;
    };
}>, unknown, unknown, undefined>>;
export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
export type ButtonSize = VariantProps<typeof buttonVariants>["size"];
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    loading?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { Button, type ButtonProps, buttonVariants };
//# sourceMappingURL=Button.d.ts.map