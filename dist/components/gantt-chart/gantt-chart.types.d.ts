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
export type GanttItem = {
    /** Stable identifier for the row. */
    id: React.Key;
    /** Content shown in the sticky name column. */
    name: React.ReactNode;
    /** Inclusive start date of the task. */
    start: GanttDate;
    /** Inclusive end date of the task. */
    end: GanttDate;
    /** Completion percentage. Values outside 0–100 are clamped. */
    progress?: number;
    /** Additional classes applied to the task bar. */
    barClassName?: string;
    /** Additional classes applied to the completed portion of the bar. */
    progressClassName?: string;
};
export type GanttRenderItemContext = {
    item: GanttItem;
    formattedDateRange: string;
};
export type GanttRenderBarContext = {
    item: GanttItem;
    progress: number;
};
export type GanttViewLabels = Record<GanttView, string>;
//# sourceMappingURL=gantt-chart.types.d.ts.map