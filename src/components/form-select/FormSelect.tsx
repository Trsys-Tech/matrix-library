import { Spinner } from "@trsys-tech/matrix-icons";
import { ControllerProps, FieldPath, FieldValues, useController } from "react-hook-form";
import { SelectContentProps, SelectItemProps, SelectProps, SelectTriggerProps, SelectValueProps } from "@radix-ui/react-select";

import { cn } from "../../lib/utils";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form/Form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select/Select";

type FormSelectProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = Omit<
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
      selectProps?: SelectProps;
      selectTriggerProps?: SelectTriggerProps;
      selectValueProps?: Omit<SelectValueProps, "placeholder">;
      selectContentProps?: SelectContentProps;
      selectItemProps?: SelectItemProps;
    };
  };

const FormSelect = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  props: FormSelectProps<TFieldValues, TName>,
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

  const isNumericValue = typeof options[0]?.value === "number";

  const handleChange = (value: string) => {
    if (isNumericValue) {
      field.onChange(Number(value));
    } else {
      field.onChange(value);
    }
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
            <Select
              {...(slotProps?.selectProps ?? {})}
              disabled={disabled}
              onValueChange={handleChange}
              value={field.value !== undefined ? String(field.value) : undefined}
            >
              <FormControl>
                <SelectTrigger
                  aria-required={required}
                  disabled={disabled}
                  {...(slotProps?.selectTriggerProps ?? {})}
                  className={cn("*:truncate [&>span]:inline-block", slotProps?.selectTriggerProps?.className)}
                >
                  <SelectValue {...(slotProps?.selectValueProps ?? {})} placeholder={placeholder ?? label} />
                </SelectTrigger>
              </FormControl>
              <SelectContent {...(slotProps?.selectContentProps ?? {})}>
                {loading && (
                  <SelectItem {...(slotProps?.selectItemProps ?? {})} value="-1" disabled>
                    <Spinner className="inline-block mb-0.5" /> {loadingText || "Loading..."}
                  </SelectItem>
                )}
                {!loading && !options.length ? (
                  <SelectItem
                    {...(slotProps?.selectItemProps ?? {})}
                    value="8fdcaeb67c8ad943c80fe54c3b1059b700d9254389a38a4a1fc39a6eee728623"
                    disabled
                  >
                    {emptyOptionsText || "No Items"}
                  </SelectItem>
                ) : null}
                {options?.map((option, index) => (
                  <SelectItem {...(slotProps?.selectItemProps ?? {})} value={String(option.value)} key={index + "_" + label}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage {...(slotProps?.formMessageProps ?? {})} />
          </FormItem>
        );
      }}
    />
  );
};
export { FormSelect, type FormSelectProps };
