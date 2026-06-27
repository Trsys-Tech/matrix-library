"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form/Form";
import { SlotProps } from "@radix-ui/react-slot";
import { Control, ControllerProps, FieldPathByValue, FieldValues } from "react-hook-form";
import { DatePicker, type DateOnlyString, type DatePickerProps } from "../date-picker/DatePicker";

/**
 * Props for FormDatePicker.
 *
 * The bound field value should be a YYYY-MM-DD string or undefined.
 * Use slotProps.datepickerProps to forward props to the underlying DatePicker.
 */
type FormDatePickerProps<TFieldValues extends FieldValues, TName extends FieldPathByValue<TFieldValues, DateOnlyString | undefined>> = Omit<
  ControllerProps<TFieldValues, TName>,
  "render"
> &
  React.ComponentProps<typeof FormItem> & {
    /** Label rendered above the picker. */
    label: string;
    /** React Hook Form control instance. */
    control: Control<TFieldValues>;
    /** Shows the required asterisk next to the label. */
    required?: boolean;
    /** Disables the picker and the field interaction. */
    disabled?: boolean;
    /** Keeps the field readable while preventing edits. */
    readOnly?: boolean;
    /** Props forwarded to the form shell and underlying DatePicker. */
    slotProps?: {
      formLabelProps?: React.HTMLAttributes<HTMLLabelElement> & React.RefAttributes<HTMLLabelElement>;
      formMessageProps?: React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>;
      formControlProps?: Omit<SlotProps & React.RefAttributes<HTMLElement>, "ref"> & React.RefAttributes<HTMLElement>;
      datepickerProps?: DatePickerProps;
    };
  };

/**
 * React Hook Form wrapper around DatePicker.
 *
 * Binds a YYYY-MM-DD field value to the shared date picker and renders the
 * label, validation message, and disabled/read-only handling.
 *
 * @example
 * const form = useForm<{ dueDate?: string }>({ defaultValues: { dueDate: "2025-12-24" } });
 *
 * <FormDatePicker
 *   control={form.control}
 *   name="dueDate"
 *   label="Due date"
 *   slotProps={{ datepickerProps: { placeholder: "Pick a due date" } }}
 * />
 */
const FormDatePicker = <TFieldValues extends FieldValues, TName extends FieldPathByValue<TFieldValues, DateOnlyString | undefined>>(
  props: FormDatePickerProps<TFieldValues, TName>,
) => {
  const { name, control, defaultValue, disabled, readOnly, rules, shouldUnregister, label, slotProps, required, ...formItemProps } = props;

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      disabled={disabled}
      rules={rules}
      shouldUnregister={shouldUnregister}
      render={({ field }) => {
        return (
          <FormItem {...formItemProps}>
            <FormLabel {...(slotProps?.formLabelProps ?? {})}>
              {label}
              {required && <span className="text-danger text-sm leading-4">*</span>}
            </FormLabel>
            <FormControl {...(slotProps?.formControlProps ?? {})}>
              <DatePicker {...(slotProps?.datepickerProps ?? {})} selected={field.value} onSelect={field.onChange} disabled={disabled || readOnly} />
            </FormControl>
            <FormMessage {...(slotProps?.formMessageProps ?? {})} />
          </FormItem>
        );
      }}
    />
  );
};
export { FormDatePicker, type FormDatePickerProps };
