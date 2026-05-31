import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { FormItem } from '../form/Form';
import { Combobox } from '../combobox/Combobox';
type FormComboboxProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = Omit<ControllerProps<TFieldValues, TName>, "render"> & React.ComponentProps<typeof FormItem> & {
    label: string;
    options: React.ComponentProps<typeof Combobox>["options"];
    loading?: boolean;
    loadingText?: string;
    emptyOptionsText?: string;
    showSearchInput?: boolean;
    clearable?: boolean;
    placeholder?: string;
    required?: boolean;
    readOnly?: boolean;
    slotProps?: {
        formLabelProps?: React.HTMLAttributes<HTMLLabelElement> & React.RefAttributes<HTMLLabelElement>;
        formMessageProps?: React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>;
        comboboxProps?: Omit<React.ComponentPropsWithoutRef<typeof Combobox>, "options" | "value" | "onValueChange" | "loading" | "loadingText" | "emptyOptionsText" | "placeholder" | "disabled" | "showSearchInput">;
    };
};
declare const FormCombobox: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: FormComboboxProps<TFieldValues, TName>) => import("react/jsx-runtime").JSX.Element;
export { FormCombobox, type FormComboboxProps };
//# sourceMappingURL=FormCombobox.d.ts.map