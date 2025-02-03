"use client";

import { ControllerProps, FieldPath, FieldValues, useController } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form/Form";
import { MultiSelect, MultiSelectProps } from "../multi-select/MultiSelect";

type FormMultiSelectProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = Omit<
  ControllerProps<TFieldValues, TName>,
  "render"
> &
  React.ComponentProps<typeof FormItem> & {
    label: string;
    loading?: boolean;
    loadingText?: string;
    options: MultiSelectProps["options"];
    placeholder?: string;
    required?: boolean;
    slotProps?: {
      multiSelectProps?: Partial<MultiSelectProps>;
      formLabelProps?: React.HTMLAttributes<HTMLLabelElement> & React.RefAttributes<HTMLLabelElement>;
      formMessageProps?: React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>;
    };
  };

const FormMultiSelect = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  props: FormMultiSelectProps<TFieldValues, TName>,
) => {
  const {
    name,
    control,
    defaultValue,
    disabled,
    rules,
    shouldUnregister,
    label,
    options,
    loading,
    loadingText,
    placeholder,
    slotProps,
    required,
    ...formItemProps
  } = props;

  const { field } = useController({ name, control, rules, defaultValue, disabled, shouldUnregister });

  const handleChange = (value: string[]) => {
    field.onChange(value);
  };

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
            <FormControl>
              <MultiSelect
                aria-required={required}
                options={options}
                onValueChange={handleChange}
                placeholder={placeholder}
                value={field.value}
                loading={loading}
                loadingText={loadingText}
                disabled={disabled}
                {...(slotProps?.multiSelectProps ?? {})}
              />
            </FormControl>

            <FormMessage {...(slotProps?.formMessageProps ?? {})} />
          </FormItem>
        );
      }}
    />
  );
};
export { FormMultiSelect, type FormMultiSelectProps };
