import { SlotProps } from '@radix-ui/react-slot';
import { Control, ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { RatingProps } from '../rating/Rating';
import { FormItem } from '../form/Form';
type FormRatingProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = Omit<ControllerProps<TFieldValues, TName>, "render"> & React.ComponentProps<typeof FormItem> & {
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
declare const FormRating: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: FormRatingProps<TFieldValues, TName>) => import("react/jsx-runtime").JSX.Element;
export { FormRating, type FormRatingProps };
//# sourceMappingURL=FormRating.d.ts.map