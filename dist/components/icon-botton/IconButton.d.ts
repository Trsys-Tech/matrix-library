import { default as React } from 'react';
import { VariantProps, TVReturnType } from 'tailwind-variants';
import { TVConfig } from 'tailwind-variants/dist/config.js';
declare const iconButtonVariants: TVReturnType<{
    variant: {
        table: string;
        toolbar: string;
        form: string;
        danger: string;
        warning: string;
        success: string;
        info: string;
    };
    size: {
        md: string;
        sm: string;
        lg: string;
    };
}, undefined, "mtx-inline-flex mtx-items-center mtx-justify-center mtx-gap-1 mtx-p-2 mtx-rounded-sm mtx-text-xs mtx-font-normal mtx-transition-colors focus-visible:mtx-outline-none disabled:mtx-pointer-events-none disabled:mtx-bg-muted disabled:mtx-text-gray-500", TVConfig<{
    variant: {
        table: string;
        toolbar: string;
        form: string;
        danger: string;
        warning: string;
        success: string;
        info: string;
    };
    size: {
        md: string;
        sm: string;
        lg: string;
    };
}, {
    variant: {
        table: string;
        toolbar: string;
        form: string;
        danger: string;
        warning: string;
        success: string;
        info: string;
    };
    size: {
        md: string;
        sm: string;
        lg: string;
    };
}>, {
    variant: {
        table: string;
        toolbar: string;
        form: string;
        danger: string;
        warning: string;
        success: string;
        info: string;
    };
    size: {
        md: string;
        sm: string;
        lg: string;
    };
}, undefined, TVReturnType<{
    variant: {
        table: string;
        toolbar: string;
        form: string;
        danger: string;
        warning: string;
        success: string;
        info: string;
    };
    size: {
        md: string;
        sm: string;
        lg: string;
    };
}, undefined, "mtx-inline-flex mtx-items-center mtx-justify-center mtx-gap-1 mtx-p-2 mtx-rounded-sm mtx-text-xs mtx-font-normal mtx-transition-colors focus-visible:mtx-outline-none disabled:mtx-pointer-events-none disabled:mtx-bg-muted disabled:mtx-text-gray-500", TVConfig<{
    variant: {
        table: string;
        toolbar: string;
        form: string;
        danger: string;
        warning: string;
        success: string;
        info: string;
    };
    size: {
        md: string;
        sm: string;
        lg: string;
    };
}, {
    variant: {
        table: string;
        toolbar: string;
        form: string;
        danger: string;
        warning: string;
        success: string;
        info: string;
    };
    size: {
        md: string;
        sm: string;
        lg: string;
    };
}>, unknown, unknown, undefined>>;
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof iconButtonVariants> {
    asChild?: boolean;
    loading?: boolean;
}
declare const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { IconButton, type IconButtonProps };
//# sourceMappingURL=IconButton.d.ts.map