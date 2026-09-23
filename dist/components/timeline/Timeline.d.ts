import { default as React } from 'react';
export type TimelineStatus = "pending" | "active" | "completed" | "error";
/** Describes one step in the timeline's primary path. */
export type TimelineItem = {
    /** Stable identifier for the step; branch origins reference this value. */
    id: string;
    /** Primary content displayed beside the step marker. */
    label: React.ReactNode;
    /** Optional content displayed above the step marker. */
    superTitle?: React.ReactNode;
    /** Optional secondary content displayed below the super title. */
    superSubtitle?: React.ReactNode;
    /** Optional supporting content displayed below the label. */
    subData?: React.ReactNode;
    /** Arbitrary content shown on the bottom row. */
    footer?: React.ReactNode;
    /** Lifecycle state used to determine the marker and connector appearance. */
    status?: TimelineStatus;
    /** Override the marker color (any CSS color). */
    color?: string;
    /** Override the incoming connector; false leaves it inactive. */
    connectorColor?: string | false;
    /** Localized status announcement, independent of the visible label. */
    statusLabel?: string;
};
/** Describes a secondary path that diverges from a primary timeline step. */
export type TimelineBranch = TimelineItem & {
    /** ID of the main step from which this branch diverges. */
    from: string;
    /** Branch paths are explicitly controlled, independently of main steps. */
    active?: boolean;
    /** Used for the activated branch path and endpoint. */
    activeColor?: string;
};
/** Configuration and content props for the Timeline component. */
export type TimelineProps = Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> & {
    /** Ordered steps in the timeline's primary path. */
    items: readonly TimelineItem[];
    /** Optional secondary paths that diverge from the primary path. */
    branches?: readonly TimelineBranch[];
    /** Optional heading rendered above the timeline. */
    title?: React.ReactNode;
    /** Shows a structure-preserving skeleton while timeline data is loading. */
    loading?: boolean;
    /** Visual scale of the timeline. */
    size?: "sm" | "md" | "lg";
    /** Color used for active markers and connectors. */
    activeColor?: string;
    /** Color used for completed markers and connectors. */
    completedColor?: string;
    /** Color used for error markers and active branches by default. */
    errorColor?: string;
    /** Color used for pending markers and inactive connectors. */
    inactiveColor?: string;
    /** Minimum column width in pixels; narrower containers scroll horizontally. */
    minItemWidth?: number;
};
declare const Timeline: React.ForwardRefExoticComponent<Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "children"> & {
    /** Ordered steps in the timeline's primary path. */
    items: readonly TimelineItem[];
    /** Optional secondary paths that diverge from the primary path. */
    branches?: readonly TimelineBranch[];
    /** Optional heading rendered above the timeline. */
    title?: React.ReactNode;
    /** Shows a structure-preserving skeleton while timeline data is loading. */
    loading?: boolean;
    /** Visual scale of the timeline. */
    size?: "sm" | "md" | "lg";
    /** Color used for active markers and connectors. */
    activeColor?: string;
    /** Color used for completed markers and connectors. */
    completedColor?: string;
    /** Color used for error markers and active branches by default. */
    errorColor?: string;
    /** Color used for pending markers and inactive connectors. */
    inactiveColor?: string;
    /** Minimum column width in pixels; narrower containers scroll horizontally. */
    minItemWidth?: number;
} & React.RefAttributes<HTMLDivElement>>;
export { Timeline };
//# sourceMappingURL=Timeline.d.ts.map