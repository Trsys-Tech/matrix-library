import { SelectValueProps, SelectGroupProps } from '@radix-ui/react-select';
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
declare const Select: {
    ({ onValueChange, value, ...props }: SelectPrimitive.SelectProps): import("react/jsx-runtime").JSX.Element;
    displayName: string | undefined;
};
type SelectProps = React.ComponentProps<typeof Select>;
declare const SelectGroup: React.ForwardRefExoticComponent<SelectPrimitive.SelectGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const SelectValue: React.ForwardRefExoticComponent<SelectPrimitive.SelectValueProps & React.RefAttributes<HTMLSpanElement>>;
type SelectTriggerProps = React.ComponentProps<typeof SelectPrimitive.Trigger> & {
    clearable?: boolean;
};
declare const SelectTrigger: React.ForwardRefExoticComponent<Omit<SelectTriggerProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const SelectScrollUpButton: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollUpButtonProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
type SelectScrollUpButtonProps = React.ComponentProps<typeof SelectScrollUpButton>;
declare const SelectScrollDownButton: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollDownButtonProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
type SelectScrollDownButtonProps = React.ComponentProps<typeof SelectScrollDownButton>;
declare const SelectContent: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
type SelectContentProps = React.ComponentProps<typeof SelectContent>;
declare const SelectLabel: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectLabelProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
type SelectLabelProps = React.ComponentProps<typeof SelectLabel>;
declare const SelectItem: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
type SelectItemProps = React.ComponentProps<typeof SelectItem>;
declare const SelectSeparator: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
type SelectSeparatorProps = React.ComponentProps<typeof SelectSeparator>;
export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton, type SelectProps, type SelectGroupProps, type SelectValueProps, type SelectTriggerProps, type SelectContentProps, type SelectLabelProps, type SelectItemProps, type SelectSeparatorProps, type SelectScrollUpButtonProps, type SelectScrollDownButtonProps, };
//# sourceMappingURL=Select.d.ts.map