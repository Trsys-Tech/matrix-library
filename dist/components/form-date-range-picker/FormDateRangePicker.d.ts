import { FormItem } from '../form/Form';
import { SlotProps } from '@radix-ui/react-slot';
import { Control, ControllerProps, FieldPathByValue, FieldValues } from 'react-hook-form';
import { DateOnlyRange, DateRangePickerProps } from '../date-picker/DateRangePicker';
/**
 * Props for FormDateRangePicker.
 *
 * The bound field value should be an object shaped like
 * { from?: "YYYY-MM-DD", to?: "YYYY-MM-DD" } or undefined.
 * Use slotProps.datepickerProps to forward props to the underlying DateRangePicker.
 */
type FormDateRangePickerProps<TFieldValues extends FieldValues, TName extends FieldPathByValue<TFieldValues, DateOnlyRange | undefined>> = Omit<ControllerProps<TFieldValues, TName>, "render"> & React.ComponentProps<typeof FormItem> & {
    /** Label rendered above the picker. */
    label: string;
    /** React Hook Form control instance. */
    control: Control<TFieldValues>;
    /** Shows the required asterisk next to the label. */
    required?: boolean;
    /** Keeps the field readable while preventing edits. */
    readOnly?: boolean;
    /** Props forwarded to the form shell and underlying DateRangePicker. */
    slotProps?: {
        formLabelProps?: React.HTMLAttributes<HTMLLabelElement> & React.RefAttributes<HTMLLabelElement>;
        formMessageProps?: React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>;
        formControlProps?: Omit<SlotProps & React.RefAttributes<HTMLElement>, "ref"> & React.RefAttributes<HTMLElement>;
        datepickerProps?: DateRangePickerProps;
    };
};
/**
 * React Hook Form wrapper around DateRangePicker.
 *
 * Binds a { from, to } date-only string object to the shared range picker and
 * renders the label, validation message, and read-only handling.
 *
 * @example
 * const form = useForm<{ vacation?: { from?: string; to?: string } }>({
 *   defaultValues: { vacation: { from: "2025-12-24", to: "2025-12-31" } },
 * });
 *
 * <FormDateRangePicker
 *   control={form.control}
 *   name="vacation"
 *   label="Vacation"
 *   slotProps={{ datepickerProps: { fromText: "Start", toText: "End" } }}
 * />
 */
declare const FormDateRangePicker: <TFieldValues extends FieldValues, TName extends FieldPathByValue<TFieldValues, DateOnlyRange | undefined>>(props: FormDateRangePickerProps<TFieldValues, TName>) => import("react").JSX.Element;
export { FormDateRangePicker, type FormDateRangePickerProps };
//# sourceMappingURL=FormDateRangePicker.d.ts.map