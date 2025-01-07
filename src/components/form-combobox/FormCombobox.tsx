import { useState } from "react";
import { ControllerProps, FieldPath, FieldValues, useController } from "react-hook-form";

import { cn } from "../../lib/utils";
import { CheckIcon } from "../Icons/CheckIcon";
import { SpinnerIcon } from "../Icons/SpinnerIcon";
import { Button, ButtonProps } from "../button/Button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form/Form";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxTrigger } from "../combobox/Combobox";

type FormComboboxProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = Omit<
  ControllerProps<TFieldValues, TName>,
  "render"
> &
  React.ComponentProps<typeof FormItem> & {
    label: string;
    options: { value: string | number; label: string | number }[];
    loading?: boolean;
    loadingText?: string;
    emptyOptionsText?: string;
    placeholder?: string;
    required?: boolean;
    slotProps?: {
      formLabelProps?: React.HTMLAttributes<HTMLLabelElement> & React.RefAttributes<HTMLLabelElement>;
      formMessageProps?: React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>;
      comboboxProps?: React.ComponentProps<typeof Combobox>;
      comboboxTriggerProps?: React.ComponentProps<typeof ComboboxTrigger>;
      comboboxValueProps?: ButtonProps;
      comboboxContentProps?: React.ComponentProps<typeof ComboboxContent>;
      comboboxItemProps?: React.ComponentProps<typeof ComboboxItem>;
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
    placeholder,
    slotProps,
    required,
    ...formItemProps
  } = props;

  const { field } = useController({ name, control, rules, defaultValue, disabled, shouldUnregister });
  const [open, setOpen] = useState(false);

  const handleChange = (value: string | number) => {
    field.onChange(value);
    setOpen(false);
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
              {required && <span className="text-danger text-sm">*</span>}
            </FormLabel>
            <Combobox {...(slotProps?.comboboxProps ?? {})} open={open} onOpenChange={setOpen}>
              <FormControl>
                <ComboboxTrigger
                  {...(slotProps?.comboboxTriggerProps ?? {})}
                  className={cn("*:truncate [&>span]:inline-block", slotProps?.comboboxTriggerProps?.className)}
                  disabled={disabled ?? loading}
                  asChild
                  aria-required={required}
                >
                  <Button
                    variant="text"
                    {...(slotProps?.comboboxValueProps ?? {})}
                    className={cn("border border-gray-300 disabled:bg-gray-100", slotProps?.comboboxValueProps?.className)}
                    loading={loading}
                  >
                    {loading && loadingText ? loadingText : field.value || placeholder || label}
                  </Button>
                </ComboboxTrigger>
              </FormControl>
              <ComboboxContent {...(slotProps?.comboboxContentProps ?? {})}>
                <ComboboxInput placeholder="Search for a car..." />
                <ComboboxList>
                  {loading && (
                    <ComboboxEmpty>
                      <SpinnerIcon className="inline-block mb-0.5" /> {loadingText || "Loading..."}
                    </ComboboxEmpty>
                  )}
                  {!loading && !options.length ? (
                    <ComboboxItem
                      {...(slotProps?.comboboxItemProps ?? {})}
                      value="8fdcaeb67c8ad943c80fe54c3b1059b700d9254389a38a4a1fc39a6eee7564623"
                      disabled
                    >
                      {emptyOptionsText || "No Items"}
                    </ComboboxItem>
                  ) : null}
                  {options?.map(({ value, label }, index) => (
                    <ComboboxItem
                      {...(slotProps?.comboboxItemProps ?? {})}
                      value={String(value)}
                      key={index + "_" + label}
                      onSelect={() => handleChange(value)}
                    >
                      {label}
                      <CheckIcon className={cn("ml-auto", value === field.value ? "opacity-100" : "opacity-0")} />
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <FormMessage {...(slotProps?.formMessageProps ?? {})} />
          </FormItem>
        );
      }}
    />
  );
};
export { FormCombobox, type FormComboboxProps };
