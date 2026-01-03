import { VariantProps, TVReturnType } from 'tailwind-variants';
import { TVConfig } from 'tailwind-variants/dist/config';
import * as React from "react";
declare const textFieldVariants: TVReturnType<{
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, undefined, string[], TVConfig<{
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
}, undefined, string[], TVConfig<{
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
interface DurationProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof textFieldVariants> {
    disabled?: boolean;
    endAdornment?: React.ReactNode;
    startAdornment?: React.ReactNode;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value?: string;
    defaultValue?: string;
    showSeconds?: boolean;
    slotProps?: {
        inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    };
}
declare const Duration: React.ForwardRefExoticComponent<DurationProps & React.RefAttributes<HTMLInputElement>>;
export { Duration, type DurationProps };
//# sourceMappingURL=Duration.d.ts.map