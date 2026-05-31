import { SlotProps } from '@radix-ui/react-slot';
import { Control, ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { DurationProps } from '../duration/Duration';
import { FormItem } from '../form/Form';
type FormDurationProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = Omit<ControllerProps<TFieldValues, TName>, "render"> & React.ComponentProps<typeof FormItem> & {
    label: string;
    control: Control<TFieldValues>;
    required?: boolean;
    readOnly?: boolean;
    showSeconds?: boolean;
    disabled?: boolean;
    slotProps?: {
        formLabelProps?: React.HTMLAttributes<HTMLLabelElement> & React.RefAttributes<HTMLLabelElement>;
        formMessageProps?: React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>;
        formControlProps?: Omit<SlotProps & React.RefAttributes<HTMLElement>, "ref"> & React.RefAttributes<HTMLElement>;
        durationProps?: Omit<DurationProps, "ref"> & React.RefAttributes<HTMLInputElement>;
    };
};
declare const FormDuration: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: FormDurationProps<TFieldValues, TName>) => import("react/jsx-runtime").JSX.Element;
export { FormDuration, type FormDurationProps };
//# sourceMappingURL=FormDuration.d.ts.map