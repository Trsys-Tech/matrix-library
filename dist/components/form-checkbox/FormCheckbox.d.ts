import { FormItem } from '../form/Form';
import { SlotProps } from '@radix-ui/react-slot';
import { Control, ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { CheckboxProps } from '../checkbox/Checkbox';
type FormCheckboxProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = Omit<ControllerProps<TFieldValues, TName>, "render"> & React.ComponentProps<typeof FormItem> & {
    label: string;
    control: Control<TFieldValues>;
    required?: boolean;
    readOnly?: boolean;
    slotProps?: {
        formLabelProps?: React.HTMLAttributes<HTMLLabelElement> & React.RefAttributes<HTMLLabelElement>;
        formMessageProps?: React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>;
        formControlProps?: Omit<SlotProps & React.RefAttributes<HTMLElement>, "ref"> & React.RefAttributes<HTMLElement>;
        checkboxProps?: CheckboxProps;
    };
};
declare const FormCheckbox: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: FormCheckboxProps<TFieldValues, TName>) => import("react/jsx-runtime").JSX.Element;
export { FormCheckbox, type FormCheckboxProps };
//# sourceMappingURL=FormCheckbox.d.ts.map