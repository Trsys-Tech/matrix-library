import { FormItem } from '../form/Form';
import { SlotProps } from '@radix-ui/react-slot';
import { Control, ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { TextareaProps } from '../textarea/Textarea';
type FormTextareaProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = Omit<ControllerProps<TFieldValues, TName>, "render"> & React.ComponentProps<typeof FormItem> & {
    label: string;
    control: Control<TFieldValues>;
    required?: boolean;
    readOnly?: boolean;
    slotProps?: {
        formLabelProps?: React.HTMLAttributes<HTMLLabelElement> & React.RefAttributes<HTMLLabelElement>;
        formMessageProps?: React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>;
        formControlProps?: Omit<SlotProps & React.RefAttributes<HTMLElement>, "ref"> & React.RefAttributes<HTMLElement>;
        textareaProps?: TextareaProps;
    };
};
declare const FormTextarea: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: FormTextareaProps<TFieldValues, TName>) => import("react/jsx-runtime").JSX.Element;
export { FormTextarea, type FormTextareaProps };
//# sourceMappingURL=FormTextarea.d.ts.map