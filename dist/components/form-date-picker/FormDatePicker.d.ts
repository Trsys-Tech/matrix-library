import { FormItem } from '../form/Form';
import { SlotProps } from '@radix-ui/react-slot';
import { Control, ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { DatePickerProps } from '../date-picker/DatePicker';
type FormDatePickerProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = Omit<ControllerProps<TFieldValues, TName>, "render"> & React.ComponentProps<typeof FormItem> & {
    label: string;
    control: Control<TFieldValues>;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    slotProps?: {
        formLabelProps?: React.HTMLAttributes<HTMLLabelElement> & React.RefAttributes<HTMLLabelElement>;
        formMessageProps?: React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>;
        formControlProps?: Omit<SlotProps & React.RefAttributes<HTMLElement>, "ref"> & React.RefAttributes<HTMLElement>;
        datepickerProps?: DatePickerProps;
    };
};
declare const FormDatePicker: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: FormDatePickerProps<TFieldValues, TName>) => import("react/jsx-runtime").JSX.Element;
export { FormDatePicker, type FormDatePickerProps };
//# sourceMappingURL=FormDatePicker.d.ts.map