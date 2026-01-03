import { default as React } from 'react';
import { VariantProps, TVReturnType } from 'tailwind-variants';
import { TVConfig } from 'tailwind-variants/dist/config';
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
}, undefined, "inline-flex items-center justify-center gap-1 p-2 rounded-sm text-xs font-normal transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:bg-muted disabled:text-gray-500", TVConfig<{
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
}, undefined, "inline-flex items-center justify-center gap-1 p-2 rounded-sm text-xs font-normal transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:bg-muted disabled:text-gray-500", TVConfig<{
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