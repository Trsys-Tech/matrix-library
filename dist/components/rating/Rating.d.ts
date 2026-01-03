import { default as React } from 'react';
import { VariantProps, TVReturnType } from 'tailwind-variants';
import { TVConfig } from 'tailwind-variants/dist/config';
declare const ratingVariants: TVReturnType<{
    variant: {
        default: string;
        primary: string;
        secondary: string;
        success: string;
        danger: string;
        warning: string;
        info: string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, undefined, "flex items-center gap-0", TVConfig<{
    variant: {
        default: string;
        primary: string;
        secondary: string;
        success: string;
        danger: string;
        warning: string;
        info: string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, {
    variant: {
        default: string;
        primary: string;
        secondary: string;
        success: string;
        danger: string;
        warning: string;
        info: string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}>, {
    variant: {
        default: string;
        primary: string;
        secondary: string;
        success: string;
        danger: string;
        warning: string;
        info: string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, undefined, TVReturnType<{
    variant: {
        default: string;
        primary: string;
        secondary: string;
        success: string;
        danger: string;
        warning: string;
        info: string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, undefined, "flex items-center gap-0", TVConfig<{
    variant: {
        default: string;
        primary: string;
        secondary: string;
        success: string;
        danger: string;
        warning: string;
        info: string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, {
    variant: {
        default: string;
        primary: string;
        secondary: string;
        success: string;
        danger: string;
        warning: string;
        info: string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}>, unknown, unknown, undefined>>;
interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
    precision?: "half" | "full";
    variant?: VariantProps<typeof ratingVariants>["variant"];
    size?: VariantProps<typeof ratingVariants>["size"];
    readOnly?: boolean;
    value?: number;
    onValueChange?: (value: number) => void;
    children?: React.ReactNode;
    disabled?: boolean;
    max?: number;
    Icon?: React.JSXElementConstructor<React.SVGProps<SVGSVGElement>>;
}
declare const Rating: React.ForwardRefExoticComponent<RatingProps & React.RefAttributes<HTMLDivElement>>;
export { Rating, type RatingProps };
//# sourceMappingURL=Rating.d.ts.map