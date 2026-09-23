import { default as React } from 'react';
import { GanttDate, GanttItem, GanttMarker, GanttRenderBarContext, GanttRenderItemContext, GanttView, GanttViewLabels } from './gantt-chart.types';
type GanttChartProps = Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & {
    /** Rows displayed by the chart. */
    items: GanttItem[];
    /** Controlled timeline scale. */
    view?: GanttView;
    /** Initial scale when the chart is uncontrolled. */
    defaultView?: GanttView;
    /** Scales available in the toolbar. */
    views?: GanttView[];
    /** Labels shown for the available scales. */
    viewLabels?: Partial<GanttViewLabels>;
    /** Called after the user selects a scale. */
    onViewChange?: (view: GanttView) => void;
    /** Optional beginning of the visible timeline. */
    startDate?: GanttDate;
    /** Optional end of the visible timeline. */
    endDate?: GanttDate;
    /** Dated vertical markers drawn over the timeline rows. */
    markers?: GanttMarker[];
    /** Date whose period is highlighted. Defaults to today; pass null to disable. */
    highlightedDate?: GanttDate | null;
    /** Locale used by timeline and range labels. */
    locale?: string;
    /** Width of the sticky row-name column in pixels. */
    nameColumnWidth?: number;
    /** Height of each item row in pixels. */
    rowHeight?: number;
    /** Minimum width of an individual timeline cell, by scale. */
    cellWidths?: Partial<Record<GanttView, number>>;
    /** Header shown above item names. */
    nameColumnHeader?: React.ReactNode;
    /** Label used for the add-row action. */
    addItemLabel?: React.ReactNode;
    /** Shows the add-row action when provided. */
    onAddItem?: () => void;
    /** Shows the refresh action when provided. */
    onRefresh?: () => void;
    /** Shows the native fullscreen action when supported. */
    showFullscreen?: boolean;
    /** Content inserted before the default toolbar actions. */
    toolbarActions?: React.ReactNode;
    /** Replaces the default item-name and date-range content. */
    renderItem?: (context: GanttRenderItemContext) => React.ReactNode;
    /** Replaces the default progress label inside a bar. */
    renderBar?: (context: GanttRenderBarContext) => React.ReactNode;
    /** Replaces the compact date range shown alongside each item. */
    formatDateRange?: (item: GanttItem) => string;
    /** Accessible label for the chart. */
    "aria-label"?: string;
};
declare const GanttChart: React.ForwardRefExoticComponent<Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & {
    /** Rows displayed by the chart. */
    items: GanttItem[];
    /** Controlled timeline scale. */
    view?: GanttView;
    /** Initial scale when the chart is uncontrolled. */
    defaultView?: GanttView;
    /** Scales available in the toolbar. */
    views?: GanttView[];
    /** Labels shown for the available scales. */
    viewLabels?: Partial<GanttViewLabels>;
    /** Called after the user selects a scale. */
    onViewChange?: (view: GanttView) => void;
    /** Optional beginning of the visible timeline. */
    startDate?: GanttDate;
    /** Optional end of the visible timeline. */
    endDate?: GanttDate;
    /** Dated vertical markers drawn over the timeline rows. */
    markers?: GanttMarker[];
    /** Date whose period is highlighted. Defaults to today; pass null to disable. */
    highlightedDate?: GanttDate | null;
    /** Locale used by timeline and range labels. */
    locale?: string;
    /** Width of the sticky row-name column in pixels. */
    nameColumnWidth?: number;
    /** Height of each item row in pixels. */
    rowHeight?: number;
    /** Minimum width of an individual timeline cell, by scale. */
    cellWidths?: Partial<Record<GanttView, number>>;
    /** Header shown above item names. */
    nameColumnHeader?: React.ReactNode;
    /** Label used for the add-row action. */
    addItemLabel?: React.ReactNode;
    /** Shows the add-row action when provided. */
    onAddItem?: () => void;
    /** Shows the refresh action when provided. */
    onRefresh?: () => void;
    /** Shows the native fullscreen action when supported. */
    showFullscreen?: boolean;
    /** Content inserted before the default toolbar actions. */
    toolbarActions?: React.ReactNode;
    /** Replaces the default item-name and date-range content. */
    renderItem?: (context: GanttRenderItemContext) => React.ReactNode;
    /** Replaces the default progress label inside a bar. */
    renderBar?: (context: GanttRenderBarContext) => React.ReactNode;
    /** Replaces the compact date range shown alongside each item. */
    formatDateRange?: (item: GanttItem) => string;
    /** Accessible label for the chart. */
    "aria-label"?: string;
} & React.RefAttributes<HTMLDivElement>>;
export { GanttChart, type GanttChartProps, type GanttDate, type GanttItem, type GanttMarker, type GanttRenderBarContext, type GanttRenderItemContext, type GanttView, };
//# sourceMappingURL=GanttChart.d.ts.map