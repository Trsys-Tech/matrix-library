import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { FormItem } from '../form/Form';
import { MultiSelectProps } from '../multi-select/MultiSelect';
type FormMultiSelectProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = Omit<ControllerProps<TFieldValues, TName>, "render"> & React.ComponentProps<typeof FormItem> & {
    label: string;
    loading?: boolean;
    loadingText?: string;
    options: MultiSelectProps["options"];
    placeholder?: string;
    required?: boolean;
    readOnly?: boolean;
    slotProps?: {
        multiSelectProps?: Partial<MultiSelectProps>;
        formLabelProps?: React.HTMLAttributes<HTMLLabelElement> & React.RefAttributes<HTMLLabelElement>;
        formMessageProps?: React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>;
    };
};
declare const FormMultiSelect: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: FormMultiSelectProps<TFieldValues, TName>) => import("react/jsx-runtime").JSX.Element;
export { FormMultiSelect, type FormMultiSelectProps };
//# sourceMappingURL=FormMultiSelect.d.ts.map