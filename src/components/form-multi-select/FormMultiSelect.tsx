"use client";

import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form/Form";
import { MultiSelect } from "../multi-select/MultiSelect";

type FormMultiSelectProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = Omit<
  ControllerProps<TFieldValues, TName>,
  "render"
> &
  React.ComponentProps<typeof FormItem> & {
    label: string;
    loading?: boolean;
    loadingText?: string;
    options: React.ComponentPropsWithoutRef<typeof MultiSelect>["options"];
    placeholder?: string;
    required?: boolean;
    readOnly?: boolean;
    slotProps?: {
      multiSelectProps?: Omit<
        React.ComponentProps<typeof MultiSelect>,
        "onValueChange" | "value" | "options" | "loading" | "loadingText" | "placeholder" | "disabled"
      >;
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
    readOnly,
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
                onValueChange={field.onChange}
                onBlur={field.onBlur}
                placeholder={placeholder}
                value={field.value}
                loading={loading}
                loadingText={loadingText}
                disabled={disabled || readOnly}
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
