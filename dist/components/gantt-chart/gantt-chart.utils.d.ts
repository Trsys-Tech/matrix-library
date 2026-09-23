import { GanttDate, GanttItem, GanttView } from './gantt-chart.types';
type TimelineInterval = {
    start: Date;
    end: Date;
    label: string;
    groupKey: string;
    groupLabel: string;
};
type TimelineGroup = {
    key: string;
    label: string;
    startIndex: number;
    intervalCount: number;
};
declare const addDays: (date: Date, amount: number) => Date;
declare const toDate: (value: GanttDate | undefined) => Date | null;
declare const getTimelineRange: (items: GanttItem[], startDate?: GanttDate, endDate?: GanttDate) => {
    start: Date;
    end: Date;
};
declare const createTimeline: (rangeStart: Date, rangeEnd: Date, view: GanttView, locale: string) => {
    intervals: TimelineInterval[];
    groups: TimelineGroup[];
};
declare const getMarkerPosition: (date: Date, intervals: TimelineInterval[]) => number | null;
declare const getBarPosition: (item: GanttItem, intervals: TimelineInterval[]) => {
    left: number;
    width: number;
} | null;
declare const clampProgress: (progress?: number) => number;
declare const formatDateRange: (item: GanttItem, locale: string) => string;
declare const includesDate: (interval: TimelineInterval, date: Date | null) => boolean;
export { addDays, clampProgress, createTimeline, formatDateRange, getBarPosition, getMarkerPosition, getTimelineRange, includesDate, toDate, type TimelineGroup, type TimelineInterval, };
//# sourceMappingURL=gantt-chart.utils.d.ts.map