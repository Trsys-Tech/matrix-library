"use client";

import { Star } from "@trsys-tech/matrix-icons";
import { SlotProps } from "@radix-ui/react-slot";
import { Control, ControllerProps, FieldPath, FieldValues } from "react-hook-form";

import { Rating, RatingProps } from "../rating/Rating";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form/Form";

type FormRatingProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = Omit<ControllerProps<TFieldValues, TName>, "render"> &
  React.ComponentProps<typeof FormItem> & {
    label: string;
    control: Control<TFieldValues>;
    required?: boolean;
    Icon?: React.JSXElementConstructor<React.SVGProps<SVGSVGElement>>;
    max?: number;
    readOnly?: boolean;
    slotProps?: {
      formLabelProps?: React.HTMLAttributes<HTMLLabelElement> & React.RefAttributes<HTMLLabelElement>;
      formMessageProps?: React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>;
      formControlProps?: Omit<SlotProps & React.RefAttributes<HTMLElement>, "ref"> & React.RefAttributes<HTMLElement>;
      ratingProps?: RatingProps;
    };
  };

const FormRating = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: FormRatingProps<TFieldValues, TName>) => {
  const {
    name,
    control,
    defaultValue,
    disabled,
    readOnly,
    rules,
    shouldUnregister,
    label,
    slotProps,
    required,
    Icon = Star,
    max = 5,
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
            <FormControl {...(slotProps?.formControlProps ?? {})}>
              <Rating
                {...(slotProps?.ratingProps ?? {})}
                value={field.value}
                max={max}
                Icon={Icon}
                onValueChange={field.onChange}
                disabled={disabled || readOnly}
              ></Rating>
            </FormControl>
            <FormMessage {...(slotProps?.formMessageProps ?? {})} />
          </FormItem>
        );
      }}
    />
  );
};
export { FormRating, type FormRatingProps };
