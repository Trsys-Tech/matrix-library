import { default as React } from 'react';
export type GanttView = "week" | "month" | "quarter";
export type GanttDate = Date | string;
export type GanttMarker = {
    /** Stable identifier for the marker. */
    id: React.Key;
    /** Date where the marker is drawn. */
    date: GanttDate;
    /** Content shown in the marker label. */
    label: React.ReactNode;
    /** CSS color applied to the line, diamond, and label. */
    color: string;
    /** Additional classes applied to the vertical line. */
    lineClassName?: string;
    /** Additional classes applied to the diamond anchor. */
    diamondClassName?: string;
    /** Additional classes applied to the label. */
    labelClassName?: string;
};
type GanttBarStyle = {
    /** Inclusive start date of the bar. */
    start: GanttDate;
    /** Inclusive end date of the bar. */
    end: GanttDate;
    /** Completion percentage. Values outside 0–100 are clamped. Omit on an additional bar to show a plain date-range bar. */
    progress?: number;
    /** Additional classes applied to the task bar. */
    barClassName?: string;
    /** Additional classes applied to the completed portion of the bar. */
    progressClassName?: string;
};
export type GanttBar = GanttBarStyle & {
    /** Stable identifier for the bar within its row. */
    id: React.Key;
    /** Name shown in the bar and exposed to assistive technology. */
    label: string;
};
export type GanttItem = GanttBarStyle & {
    /** Stable identifier for the row. */
    id: React.Key;
    /** Content shown in the sticky name column. */
    name: React.ReactNode;
    /** Bars stacked below the primary bar in this row, in display order. */
    additionalBars?: GanttBar[];
};
export type GanttRenderItemContext = {
    item: GanttItem;
    formattedDateRange: string;
};
export type GanttRenderBarContext = {
    item: GanttItem;
    progress: number;
    /** The additional bar being rendered. Omitted for the primary bar. */
    bar?: GanttBar;
};
export type GanttViewLabels = Record<GanttView, string>;
export {};
//# sourceMappingURL=gantt-chart.types.d.ts.map