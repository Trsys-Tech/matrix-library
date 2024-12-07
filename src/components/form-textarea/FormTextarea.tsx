import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form/Form";
import { SlotProps } from "@radix-ui/react-slot";
import { Control, ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { Textarea, TextareaProps } from "../textarea/Textarea";

type FormTextareaProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = Omit<
  ControllerProps<TFieldValues, TName>,
  "render"
> & {
  label: string;
  control: Control<TFieldValues>;
  slotProps?: {
    formItemProps?: React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>;
    formLabelProps?: React.HTMLAttributes<HTMLLabelElement> & React.RefAttributes<HTMLLabelElement>;
    formMessageProps?: React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>;
    formControlProps?: Omit<SlotProps & React.RefAttributes<HTMLElement>, "ref"> & React.RefAttributes<HTMLElement>;
    textareaProps?: TextareaProps;
  };
};

const FormTextarea = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: FormTextareaProps<TFieldValues, TName>) => {
  const { name, control, defaultValue, disabled, rules, shouldUnregister, label, slotProps } = props;

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
          <FormItem {...(slotProps?.formItemProps ?? {})}>
            <FormLabel {...(slotProps?.formLabelProps ?? {})}>{label}</FormLabel>
            <FormControl {...(slotProps?.formControlProps ?? {})}>
              <Textarea {...(slotProps?.textareaProps ?? {})} {...field} />
            </FormControl>
            <FormMessage {...(slotProps?.formMessageProps ?? {})} />
          </FormItem>
        );
      }}
    />
  );
};
export { FormTextarea, type FormTextareaProps };
