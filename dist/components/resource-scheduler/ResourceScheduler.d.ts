import { default as React } from 'react';
import { DateValue } from '../date-picker/dateValue';
type ResourceSchedulerResource = {
    id: string | number;
    label: React.ReactNode;
};
type ResourceSchedulerItem = {
    id: string | number;
    resourceId: ResourceSchedulerResource["id"];
    /** Date, YYYY-MM-DD, or ISO date-time string. Items use the local calendar day and retain their time when moved. */
    date: DateValue;
    /** Arbitrary card content; the calendar does not style the card itself. */
    content: React.ReactNode;
    /** Accessible name for moving this card. Defaults to its id. */
    label?: string;
    draggable?: boolean;
};
type ResourceSchedulerMove = {
    previousItem: ResourceSchedulerItem;
    item: ResourceSchedulerItem;
};
type ResourceSchedulerCellContext = {
    resource: ResourceSchedulerResource;
    /** Local calendar date in YYYY-MM-DD format. */
    date: string;
    items: readonly ResourceSchedulerItem[];
};
type ResourceSchedulerProps = Omit<React.ComponentPropsWithoutRef<"div">, "children" | "defaultValue"> & {
    resources: readonly ResourceSchedulerResource[];
    /** Inclusive local-calendar boundaries, accepting Date, YYYY-MM-DD, or ISO date-time strings. */
    from: DateValue;
    to: DateValue;
    /** Controlled items; update this prop in onItemsChange to accept a move. */
    items?: readonly ResourceSchedulerItem[];
    defaultItems?: readonly ResourceSchedulerItem[];
    onItemsChange?: (items: ResourceSchedulerItem[], move: ResourceSchedulerMove) => void;
    /** Overrides automatic day moves. Choose the time and update controlled items in this callback. */
    onItemDrop?: (move: ResourceSchedulerMove) => void;
    disabled?: boolean;
    resourceColumnWidth?: number;
    dayColumnWidth?: number;
    rowMinHeight?: number;
    cardWidth?: number;
    /** Horizontal distance between overlapping cards in the same day cell. */
    stackOffset?: number;
    locale?: string;
    /** Render a day heading. Defaults to the locale's short weekday, month and day. */
    formatter?: (date: Date) => React.ReactNode;
    resourceHeading?: React.ReactNode;
    /** Custom action shown at the bottom right on cell hover or keyboard focus. Return null to omit it. */
    renderCellButton?: (cell: ResourceSchedulerCellContext) => React.ReactNode;
    /** Enable the custom action globally or for selected cells. Defaults to true; disabled schedulers hide it. */
    showCellButton?: boolean | ((cell: ResourceSchedulerCellContext) => boolean);
    slotProps?: {
        resource?: React.ComponentPropsWithoutRef<"div">;
        day?: React.ComponentPropsWithoutRef<"div">;
        cell?: React.ComponentPropsWithoutRef<"div">;
        card?: React.ComponentPropsWithoutRef<"div">;
    };
};
/** Resource-by-day calendar with consumer-rendered cards and controlled or local moves. */
declare const ResourceScheduler: React.ForwardRefExoticComponent<Omit<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "defaultValue" | "children"> & {
    resources: readonly ResourceSchedulerResource[];
    /** Inclusive local-calendar boundaries, accepting Date, YYYY-MM-DD, or ISO date-time strings. */
    from: DateValue;
    to: DateValue;
    /** Controlled items; update this prop in onItemsChange to accept a move. */
    items?: readonly ResourceSchedulerItem[];
    defaultItems?: readonly ResourceSchedulerItem[];
    onItemsChange?: (items: ResourceSchedulerItem[], move: ResourceSchedulerMove) => void;
    /** Overrides automatic day moves. Choose the time and update controlled items in this callback. */
    onItemDrop?: (move: ResourceSchedulerMove) => void;
    disabled?: boolean;
    resourceColumnWidth?: number;
    dayColumnWidth?: number;
    rowMinHeight?: number;
    cardWidth?: number;
    /** Horizontal distance between overlapping cards in the same day cell. */
    stackOffset?: number;
    locale?: string;
    /** Render a day heading. Defaults to the locale's short weekday, month and day. */
    formatter?: (date: Date) => React.ReactNode;
    resourceHeading?: React.ReactNode;
    /** Custom action shown at the bottom right on cell hover or keyboard focus. Return null to omit it. */
    renderCellButton?: (cell: ResourceSchedulerCellContext) => React.ReactNode;
    /** Enable the custom action globally or for selected cells. Defaults to true; disabled schedulers hide it. */
    showCellButton?: boolean | ((cell: ResourceSchedulerCellContext) => boolean);
    slotProps?: {
        resource?: React.ComponentPropsWithoutRef<"div">;
        day?: React.ComponentPropsWithoutRef<"div">;
        cell?: React.ComponentPropsWithoutRef<"div">;
        card?: React.ComponentPropsWithoutRef<"div">;
    };
} & React.RefAttributes<HTMLDivElement>>;
export { ResourceScheduler, type ResourceSchedulerProps, type ResourceSchedulerResource, type ResourceSchedulerItem, type ResourceSchedulerMove, type ResourceSchedulerCellContext, };
//# sourceMappingURL=ResourceScheduler.d.ts.map