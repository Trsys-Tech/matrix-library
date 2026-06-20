import { default as React } from 'react';
import { CollapsibleProps, CollapsibleContentProps, CollapsibleTriggerProps } from '@radix-ui/react-collapsible';
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
declare const Collapsible: React.ForwardRefExoticComponent<Omit<CollapsiblePrimitive.CollapsibleProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const CollapsibleContent: React.ForwardRefExoticComponent<Omit<CollapsiblePrimitive.CollapsibleContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const CollapsibleTrigger: React.ForwardRefExoticComponent<Omit<CollapsiblePrimitive.CollapsibleTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export { Collapsible, CollapsibleTrigger, CollapsibleContent, type CollapsibleProps, type CollapsibleContentProps, type CollapsibleTriggerProps };
//# sourceMappingURL=Collapsible.d.ts.map