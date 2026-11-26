"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form/Form";
import { SlotProps } from "@radix-ui/react-slot";
import { Control, ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { TextField, TextFieldProps } from "../text-field/TextField";

type FormInputProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = Omit<ControllerProps<TFieldValues, TName>, "render"> &
  React.ComponentProps<typeof FormItem> & {
    label: string;
    control: Control<TFieldValues>;
    required?: boolean;
    readOnly?: boolean;
    voiceMode?: TextFieldProps["voiceMode"];
    slotProps?: {
      formLabelProps?: React.HTMLAttributes<HTMLLabelElement> & React.RefAttributes<HTMLLabelElement>;
      formMessageProps?: React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>;
      formControlProps?: Omit<SlotProps & React.RefAttributes<HTMLElement>, "ref"> & React.RefAttributes<HTMLElement>;
      textFieldProps?: TextFieldProps & React.RefAttributes<HTMLInputElement>;
    };
  };

const FormInput = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: FormInputProps<TFieldValues, TName>) => {
  const { name, control, defaultValue, disabled, readOnly, voiceMode, rules, shouldUnregister, label, slotProps, required, ...formItemProps } = props;

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      disabled={disabled}
      rules={rules}
      shouldUnregister={shouldUnregister}
      render={({ field }) => {
        const isDisabled = field.disabled || disabled || readOnly;

        return (
          <FormItem {...formItemProps}>
            <FormLabel {...(slotProps?.formLabelProps ?? {})}>
              {label}
              {required && <span className="mtx-text-danger mtx-text-sm mtx-leading-4">*</span>}
            </FormLabel>
            <FormControl {...(slotProps?.formControlProps ?? {})}>
              <TextField
                {...(slotProps?.textFieldProps ?? {})}
                disabled={isDisabled}
                voiceMode={voiceMode ?? slotProps?.textFieldProps?.voiceMode}
                slotProps={{
                  inputProps: {
                    ...slotProps?.textFieldProps?.slotProps?.inputProps,
                    ...field,
                    "aria-required": required,
                    disabled: isDisabled,
                  },
                }}
              />
            </FormControl>
            <FormMessage {...(slotProps?.formMessageProps ?? {})} />
          </FormItem>
        );
      }}
    />
  );
};
export { FormInput, type FormInputProps };
