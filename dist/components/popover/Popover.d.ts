import { PopoverContentProps, PopoverProps, PopoverTriggerProps, PopoverAnchorProps } from '@radix-ui/react-popover';
import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
declare const Popover: React.FC<PopoverPrimitive.PopoverProps>;
declare const PopoverTrigger: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const PopoverAnchor: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverAnchorProps & React.RefAttributes<HTMLDivElement>>;
declare const PopoverContent: React.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, type PopoverProps, type PopoverContentProps, type PopoverTriggerProps, type PopoverAnchorProps, };
//# sourceMappingURL=Popover.d.ts.map