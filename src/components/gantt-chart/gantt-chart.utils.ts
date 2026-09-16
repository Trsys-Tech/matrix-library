import type { GanttDate, GanttItem, GanttView } from "./gantt-chart.types";

const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

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

const createDate = (year: number, month: number, day: number) => {
  const date = new Date(0);

  date.setFullYear(year, month, day);
  date.setHours(0, 0, 0, 0);

  return date;
};

const startOfDay = (date: Date) => createDate(date.getFullYear(), date.getMonth(), date.getDate());

const addDays = (date: Date, amount: number) => createDate(date.getFullYear(), date.getMonth(), date.getDate() + amount);

const addMonths = (date: Date, amount: number) => createDate(date.getFullYear(), date.getMonth() + amount, 1);

const startOfWeek = (date: Date) => {
  const normalizedDate = startOfDay(date);
  const dayFromMonday = (normalizedDate.getDay() + 6) % 7;

  return addDays(normalizedDate, -dayFromMonday);
};

const startOfMonth = (date: Date) => createDate(date.getFullYear(), date.getMonth(), 1);

const startOfQuarter = (date: Date) => createDate(date.getFullYear(), Math.floor(date.getMonth() / 3) * 3, 1);

const getIntervalStart = (date: Date, view: GanttView) => {
  if (view === "week") return startOfWeek(date);
  if (view === "month") return startOfMonth(date);

  return startOfQuarter(date);
};

const addInterval = (date: Date, view: GanttView) => {
  if (view === "week") return addDays(date, 7);
  if (view === "month") return addMonths(date, 1);

  return addMonths(date, 3);
};

const formatMonth = (date: Date, locale: string, format: "short" | "long" = "short") =>
  new Intl.DateTimeFormat(locale, { month: format }).format(date);

const formatIntervalLabel = (start: Date, end: Date, view: GanttView, locale: string) => {
  if (view === "quarter") {
    return `${formatMonth(start, locale)}–${formatMonth(addDays(end, -1), locale)}`.toUpperCase();
  }

  if (view === "month") {
    return formatMonth(start, locale).toUpperCase();
  }

  const inclusiveEnd = addDays(end, -1);

  if (start.getMonth() === inclusiveEnd.getMonth()) {
    return `${start.getDate()}–${inclusiveEnd.getDate()}`;
  }

  return `${formatMonth(start, locale)} ${start.getDate()}–${formatMonth(inclusiveEnd, locale)} ${inclusiveEnd.getDate()}`;
};

const getGroupDetails = (date: Date, view: GanttView, locale: string) => {
  if (view === "week") {
    return {
      key: `${date.getFullYear()}-${date.getMonth()}`,
      label: `${formatMonth(date, locale, "long")} ${date.getFullYear()}`,
    };
  }

  return { key: String(date.getFullYear()), label: String(date.getFullYear()) };
};

const toDate = (value: GanttDate | undefined) => {
  if (value === undefined) return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : startOfDay(value);
  }

  const dateOnlyMatch = DATE_ONLY_PATTERN.exec(value);

  if (dateOnlyMatch) {
    const year = Number(dateOnlyMatch[1]);
    const month = Number(dateOnlyMatch[2]) - 1;
    const day = Number(dateOnlyMatch[3]);
    const date = createDate(year, month, day);

    if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
      return null;
    }

    return date;
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : startOfDay(date);
};

const getDefaultRange = () => {
  const today = new Date();

  return {
    start: createDate(today.getFullYear(), 0, 1),
    end: createDate(today.getFullYear(), 11, 31),
  };
};

const getTimelineRange = (items: GanttItem[], startDate?: GanttDate, endDate?: GanttDate) => {
  const validDates = items.flatMap(item => [toDate(item.start), toDate(item.end)]).filter((date): date is Date => date !== null);
  const defaultRange = getDefaultRange();
  let start = toDate(startDate) ?? (validDates.length > 0 ? new Date(Math.min(...validDates.map(date => date.getTime()))) : defaultRange.start);
  let end = toDate(endDate) ?? (validDates.length > 0 ? new Date(Math.max(...validDates.map(date => date.getTime()))) : defaultRange.end);

  if (end < start) {
    [start, end] = [end, start];
  }

  return { start, end };
};

const createTimeline = (rangeStart: Date, rangeEnd: Date, view: GanttView, locale: string) => {
  const intervals: TimelineInterval[] = [];
  const start = getIntervalStart(rangeStart, view);
  const end = addInterval(getIntervalStart(rangeEnd, view), view);
  let cursor = start;

  while (cursor < end) {
    const intervalEnd = addInterval(cursor, view);
    const group = getGroupDetails(cursor, view, locale);

    intervals.push({
      start: cursor,
      end: intervalEnd,
      label: formatIntervalLabel(cursor, intervalEnd, view, locale),
      groupKey: group.key,
      groupLabel: group.label,
    });
    cursor = intervalEnd;
  }

  const groups = intervals.reduce<TimelineGroup[]>((result, interval, index) => {
    const currentGroup = result.at(-1);

    if (currentGroup?.key === interval.groupKey) {
      currentGroup.intervalCount += 1;
    } else {
      result.push({ key: interval.groupKey, label: interval.groupLabel, startIndex: index, intervalCount: 1 });
    }

    return result;
  }, []);

  return { intervals, groups };
};

const getDatePosition = (date: Date, intervals: TimelineInterval[]) => {
  if (intervals.length === 0) return 0;

  const firstInterval = intervals[0];
  const lastInterval = intervals.at(-1) as TimelineInterval;

  if (date <= firstInterval.start) return 0;
  if (date >= lastInterval.end) return 100;

  const intervalIndex = intervals.findIndex(interval => date >= interval.start && date < interval.end);

  if (intervalIndex < 0) return 0;

  const interval = intervals[intervalIndex];
  const intervalProgress = (date.getTime() - interval.start.getTime()) / (interval.end.getTime() - interval.start.getTime());

  return ((intervalIndex + intervalProgress) / intervals.length) * 100;
};

const getMarkerPosition = (date: Date, intervals: TimelineInterval[]) => {
  if (intervals.length === 0) return null;

  const firstInterval = intervals[0];
  const lastInterval = intervals.at(-1) as TimelineInterval;

  if (date < firstInterval.start || date >= lastInterval.end) return null;

  return getDatePosition(date, intervals);
};

const getBarPosition = (item: GanttItem, intervals: TimelineInterval[]) => {
  const itemStart = toDate(item.start);
  const itemEnd = toDate(item.end);

  if (!itemStart || !itemEnd) return null;

  const start = itemStart <= itemEnd ? itemStart : itemEnd;
  const end = itemStart <= itemEnd ? itemEnd : itemStart;
  const left = getDatePosition(start, intervals);
  const right = getDatePosition(addDays(end, 1), intervals);

  if (right <= 0 || left >= 100) return null;

  const clampedLeft = Math.max(0, left);
  const clampedRight = Math.min(100, right);

  return { left: clampedLeft, width: Math.max(0, clampedRight - clampedLeft) };
};

const clampProgress = (progress = 0) => Math.min(100, Math.max(0, progress));

const formatDateRange = (item: GanttItem, locale: string) => {
  const start = toDate(item.start);
  const end = toDate(item.end);

  if (!start || !end) return "Invalid date";

  const formatter = new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" });

  return `${formatter.format(start)}–${formatter.format(end)}`;
};

const includesDate = (interval: TimelineInterval, date: Date | null) => Boolean(date && date >= interval.start && date < interval.end);

export {
  addDays,
  clampProgress,
  createTimeline,
  formatDateRange,
  getBarPosition,
  getMarkerPosition,
  getTimelineRange,
  includesDate,
  toDate,
  type TimelineGroup,
  type TimelineInterval,
};
