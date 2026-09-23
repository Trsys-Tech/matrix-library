import { TabsContentProps, TabsListProps, TabsProps, TabsTriggerProps as RadixTabsTriggerProps } from '@radix-ui/react-tabs';
import * as React from "react";
declare const Tabs: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>>;
declare const TabsList: React.ForwardRefExoticComponent<Omit<TabsListProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const TabsTrigger: React.ForwardRefExoticComponent<RadixTabsTriggerProps & {
    hasAlert?: boolean;
} & React.RefAttributes<HTMLButtonElement>>;
declare const TabsContent: React.ForwardRefExoticComponent<Omit<TabsContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { Tabs, TabsList, TabsTrigger, TabsContent, type TabsProps, type TabsListProps, type RadixTabsTriggerProps as TabsTriggerProps, type TabsContentProps, };
//# sourceMappingURL=Tabs.d.ts.map