import { VariantProps, TVReturnType } from 'tailwind-variants';
import { TVConfig } from 'tailwind-variants/dist/config';
import * as React from "react";
declare const textFieldVariants: TVReturnType<{
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, undefined, "flex items-center w-full rounded-sm border border-input text-gray-800 bg-transparent p-0 text-xs font-medium shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-text-300 hover:border-primary-400 focus-within:border-primary-400 focus-within:outline-none focus-within:ring focus-within:ring-primary-100  disabled:cursor-not-allowed disabled:text-text-300 disabled:bg-gray-100 disabled:border-gray-100", TVConfig<{
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
}, undefined, "flex items-center w-full rounded-sm border border-input text-gray-800 bg-transparent p-0 text-xs font-medium shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-text-300 hover:border-primary-400 focus-within:border-primary-400 focus-within:outline-none focus-within:ring focus-within:ring-primary-100  disabled:cursor-not-allowed disabled:text-text-300 disabled:bg-gray-100 disabled:border-gray-100", TVConfig<{
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