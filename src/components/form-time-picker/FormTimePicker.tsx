"use client";

import { SlotProps } from "@radix-ui/react-slot";
import { Control, ControllerProps, FieldPath, FieldValues } from "react-hook-form";

import { TimePicker, TimePickerProps } from "../date-picker/TimePicker";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form/Form";

/**
 * Props for FormTimePicker.
 *
 * The bound field value should be a Time object or undefined.
 * In 12-hour mode, include ampm in the stored value.
 * In 24-hour mode, omit ampm and use hour values from 0-23.
 */
type FormTimePickerProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = Omit<
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
    /** Keeps the field readable while preventing edits. */
    readOnly?: boolean;
    /** Enables 24-hour mode and hides the AM/PM selector when true. */
    is24HourMode?: boolean;
    /** Props forwarded to the form shell and underlying TimePicker. */
    slotProps?: {
      formLabelProps?: React.HTMLAttributes<HTMLLabelElement> & React.RefAttributes<HTMLLabelElement>;
      formMessageProps?: React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>;
      formControlProps?: Omit<SlotProps & React.RefAttributes<HTMLElement>, "ref"> & React.RefAttributes<HTMLElement>;
      /** Props forwarded to the underlying TimePicker. */
      timepickerProps?: Partial<TimePickerProps>;
    };
  };

/**
 * React Hook Form wrapper around TimePicker.
 *
 * Binds a Time object to the shared time picker and renders the label,
 * validation message, and disabled/read-only handling.
 *
 * @example
 * const form = useForm<{ reminder?: { hour: number; minute: number; ampm?: "AM" | "PM" } }>({
 *   defaultValues: { reminder: { hour: 9, minute: 30, ampm: "AM" } },
 * });
 *
 * <FormTimePicker control={form.control} name="reminder" label="Reminder time" />
 *
 * @example
 * const form = useForm<{ shiftStart?: { hour: number; minute: number } }>({
 *   defaultValues: { shiftStart: { hour: 14, minute: 0 } },
 * });
 *
 * <FormTimePicker control={form.control} name="shiftStart" label="Shift start" is24HourMode />
 */
const FormTimePicker = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: FormTimePickerProps<TFieldValues, TName>) => {
  const { name, control, defaultValue, disabled, readOnly, rules, shouldUnregister, label, slotProps, required, is24HourMode, ...formItemProps } =
    props;

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
              <TimePicker
                {...(slotProps?.timepickerProps ?? {})}
                time={field.value}
                onTimeChange={field.onChange}
                disabled={disabled || readOnly}
                is24HourMode={is24HourMode}
              />
            </FormControl>
            <FormMessage {...(slotProps?.formMessageProps ?? {})} />
          </FormItem>
        );
      }}
    />
  );
};
export { FormTimePicker, type FormTimePickerProps };
