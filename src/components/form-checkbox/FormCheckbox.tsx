import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form/Form";
import { SlotProps } from "@radix-ui/react-slot";
import { Control, ControllerProps, FieldPath, FieldValues, useController } from "react-hook-form";
import { Checkbox, CheckboxProps } from "../checkbox/Checkbox";
import { useCallback } from "react";
import { cn } from "../../lib/utils";

type FormCheckboxProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = Omit<
  ControllerProps<TFieldValues, TName>,
  "render"
> &
  React.ComponentProps<typeof FormItem> & {
    label: string;
    control: Control<TFieldValues>;
    required?: boolean;
    slotProps?: {
      formLabelProps?: React.HTMLAttributes<HTMLLabelElement> & React.RefAttributes<HTMLLabelElement>;
      formMessageProps?: React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>;
      formControlProps?: Omit<SlotProps & React.RefAttributes<HTMLElement>, "ref"> & React.RefAttributes<HTMLElement>;
      checkboxProps?: CheckboxProps;
    };
  };

const FormCheckbox = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: FormCheckboxProps<TFieldValues, TName>) => {
  const { name, control, defaultValue, disabled, rules, shouldUnregister, label, slotProps, required, ...formItemProps } = props;
  const { field } = useController({ name, control, rules, defaultValue, disabled, shouldUnregister });

  const handleCheckChanged = useCallback(
    (checked: boolean) => {
      field.onChange(checked);
    },
    [field],
  );

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
          <FormItem {...formItemProps} className="flex items-center gap-2 justify-start space-y-0">
            <FormControl {...(slotProps?.formControlProps ?? {})}>
              <Checkbox
                {...(slotProps?.checkboxProps ?? {})}
                {...field}
                checked={field.value}
                onCheckedChange={handleCheckChanged}
                aria-required={required}
                disabled={disabled}
              />
            </FormControl>
            <FormLabel {...(slotProps?.formLabelProps ?? {})} className={cn("text-text", slotProps?.formLabelProps?.className)}>
              {label}
              {required && <span className="text-danger text-sm">*</span>}
            </FormLabel>
            <FormMessage {...(slotProps?.formMessageProps ?? {})} />
          </FormItem>
        );
      }}
    />
  );
};
export { FormCheckbox, type FormCheckboxProps };
