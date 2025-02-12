import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { FormItem } from '../form/Form';
import { Combobox } from '../combobox/Combobox';
type FormComboboxProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = Omit<ControllerProps<TFieldValues, TName>, "render"> & React.ComponentProps<typeof FormItem> & {
    label: string;
    options: {
        value: string | number;
        label: string;
    }[];
    loading?: boolean;
    loadingText?: string;
    emptyOptionsText?: string;
    placeholder?: string;
    required?: boolean;
    slotProps?: {
        formLabelProps?: React.HTMLAttributes<HTMLLabelElement> & React.RefAttributes<HTMLLabelElement>;
        formMessageProps?: React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>;
        comboboxProps?: React.ComponentProps<typeof Combobox>;
    };
};
declare const FormCombobox: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: FormComboboxProps<TFieldValues, TName>) => import("react/jsx-runtime").JSX.Element;
export { FormCombobox, type FormComboboxProps };
//# sourceMappingURL=FormCombobox.d.ts.map