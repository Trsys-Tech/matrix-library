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
interface TextFieldProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof textFieldVariants> {
    type?: React.HTMLInputTypeAttribute;
    disabled?: boolean;
    suffix?: React.ReactNode;
    endAdornment?: React.ReactNode;
    startAdornment?: React.ReactNode;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value?: string | number;
    defaultValue?: string | number;
    slotProps?: {
        inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    };
}
declare const TextField: React.ForwardRefExoticComponent<TextFieldProps & React.RefAttributes<HTMLInputElement>>;
export { TextField, type TextFieldProps };
//# sourceMappingURL=TextField.d.ts.map