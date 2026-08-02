import { default as React } from 'react';
import { VariantProps, TVReturnType } from 'tailwind-variants';
import { TVConfig } from 'tailwind-variants/dist/config.js';
declare const chipVariants: TVReturnType<{
    variant: {
        primary: string;
        neutral: string;
        "table-primary": string;
        "table-neutral": string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, undefined, "mtx-inline-flex mtx-items-center mtx-justify-center mtx-gap-2 mtx-whitespace-nowrap mtx-rounded-full mtx-text-xs mtx-font-medium", TVConfig<{
    variant: {
        primary: string;
        neutral: string;
        "table-primary": string;
        "table-neutral": string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, {
    variant: {
        primary: string;
        neutral: string;
        "table-primary": string;
        "table-neutral": string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}>, {
    variant: {
        primary: string;
        neutral: string;
        "table-primary": string;
        "table-neutral": string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, undefined, TVReturnType<{
    variant: {
        primary: string;
        neutral: string;
        "table-primary": string;
        "table-neutral": string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, undefined, "mtx-inline-flex mtx-items-center mtx-justify-center mtx-gap-2 mtx-whitespace-nowrap mtx-rounded-full mtx-text-xs mtx-font-medium", TVConfig<{
    variant: {
        primary: string;
        neutral: string;
        "table-primary": string;
        "table-neutral": string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, {
    variant: {
        primary: string;
        neutral: string;
        "table-primary": string;
        "table-neutral": string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}>, unknown, unknown, undefined>>;
interface ChipProps extends React.ButtonHTMLAttributes<HTMLSpanElement>, VariantProps<typeof chipVariants> {
    asChild?: boolean;
    onClose?: () => void;
}
declare const Chip: React.ForwardRefExoticComponent<ChipProps & React.RefAttributes<HTMLSpanElement>>;
export { Chip, type ChipProps };
//# sourceMappingURL=Chip.d.ts.map