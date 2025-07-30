"use client";

import { SlotProps } from "@radix-ui/react-slot";
import { Control, ControllerProps, FieldPath, FieldValues } from "react-hook-form";

import { Duration, DurationProps } from "../duration/Duration";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form/Form";

type FormDurationProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = Omit<
  ControllerProps<TFieldValues, TName>,
  "render"
> &
  React.ComponentProps<typeof FormItem> & {
    label: string;
    control: Control<TFieldValues>;
    required?: boolean;
    readOnly?: boolean;
    showSeconds?: boolean;
    disabled?: boolean;
    slotProps?: {
      formLabelProps?: React.HTMLAttributes<HTMLLabelElement> & React.RefAttributes<HTMLLabelElement>;
      formMessageProps?: React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>;
      formControlProps?: Omit<SlotProps & React.RefAttributes<HTMLElement>, "ref"> & React.RefAttributes<HTMLElement>;
      durationProps?: Omit<DurationProps, "ref"> & React.RefAttributes<HTMLInputElement>;
    };
  };

const FormDuration = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: FormDurationProps<TFieldValues, TName>) => {
  const { name, control, defaultValue, disabled, readOnly, showSeconds, rules, shouldUnregister, label, slotProps, required, ...formItemProps } =
    props;

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      disabled={disabled}
      rules={rules}
      shouldUnregister={shouldUnregister}
      render={({ field: { onChange, value, ...restField } }) => {
        return (
          <FormItem {...formItemProps}>
            <FormLabel {...(slotProps?.formLabelProps ?? {})}>
              {label}
              {required && <span className="text-danger text-sm leading-4">*</span>}
            </FormLabel>
            <FormControl {...(slotProps?.formControlProps ?? {})}>
              <Duration
                {...(slotProps?.durationProps ?? {})}
                disabled={disabled || readOnly}
                value={value}
                defaultValue={defaultValue}
                showSeconds={showSeconds}
                onChange={onChange}
                slotProps={{ inputProps: { ...slotProps?.durationProps?.slotProps?.inputProps, ...restField, "aria-required": required } }}
              />
            </FormControl>
            <FormMessage {...(slotProps?.formMessageProps ?? {})} />
          </FormItem>
        );
      }}
    />
  );
};
export { FormDuration, type FormDurationProps };
