"use client";

import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form/Form";
import { Combobox } from "../combobox/Combobox";

type FormComboboxProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = Omit<
  ControllerProps<TFieldValues, TName>,
  "render"
> &
  React.ComponentProps<typeof FormItem> & {
    label: string;
    options: { value: string | number; label: string }[];
    loading?: boolean;
    loadingText?: string;
    emptyOptionsText?: string;
    showSearchInput?: boolean;
    placeholder?: string;
    required?: boolean;
    slotProps?: {
      formLabelProps?: React.HTMLAttributes<HTMLLabelElement> & React.RefAttributes<HTMLLabelElement>;
      formMessageProps?: React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>;
      comboboxProps?: Omit<
        React.ComponentPropsWithoutRef<typeof Combobox>,
        "options" | "value" | "onValueChange" | "loading" | "loadingText" | "emptyOptionsText" | "placeholder" | "disabled" | "showSearchInput"
      >;
    };
  };

const FormCombobox = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  props: FormComboboxProps<TFieldValues, TName>,
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
    emptyOptionsText,
    showSearchInput,
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
              <Combobox
                options={options}
                value={field.value}
                onValueChange={field.onChange}
                loading={loading}
                loadingText={loadingText}
                emptyOptionsText={emptyOptionsText}
                placeholder={placeholder}
                disabled={disabled}
                showSearchInput={showSearchInput}
                {...(slotProps?.comboboxProps ?? {})}
              />
            </FormControl>

            <FormMessage {...(slotProps?.formMessageProps ?? {})} />
          </FormItem>
        );
      }}
    />
  );
};
export { FormCombobox, type FormComboboxProps };
