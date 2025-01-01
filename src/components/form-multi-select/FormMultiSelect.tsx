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
            <FormLabel {...(slotProps?.formLabelProps ?? {})}>{label}</FormLabel>
            <FormControl>
              <MultiSelect
                options={options}
                onValueChange={handleChange}
                placeholder={placeholder}
                value={field.value}
                loading={loading}
                loadingText={loadingText}
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
