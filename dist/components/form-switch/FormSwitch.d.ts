import { FormItem } from '../form/Form';
import { SlotProps } from '@radix-ui/react-slot';
import { Control, ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { SwitchProps } from '../switch/Switch';
type FormSwitchProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = Omit<ControllerProps<TFieldValues, TName>, "render"> & React.ComponentProps<typeof FormItem> & {
    label: string;
    control: Control<TFieldValues>;
    required?: boolean;
    readOnly?: boolean;
    slotProps?: {
        formLabelProps?: React.HTMLAttributes<HTMLLabelElement> & React.RefAttributes<HTMLLabelElement>;
        formMessageProps?: React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>;
        formControlProps?: Omit<SlotProps & React.RefAttributes<HTMLElement>, "ref"> & React.RefAttributes<HTMLElement>;
        switchProps?: SwitchProps;
    };
};
declare const FormSwitch: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: FormSwitchProps<TFieldValues, TName>) => import("react/jsx-runtime").JSX.Element;
export { FormSwitch, type FormSwitchProps };
//# sourceMappingURL=FormSwitch.d.ts.map