import { format } from "date-fns";
import { DateRange } from "react-day-picker";

/**
 * Public value accepted by single-date pickers.
 * Pass either a native Date or a date-only string in YYYY-MM-DD format.
 */
type DateValue = Date | string;

/**
 * Date-only value returned by single-date pickers.
 * Example: "2025-12-24".
 */
type DateOnlyString = string;

type DateSelectionKey = number | string | undefined;

/**
 * Public value accepted by date-range pickers.
 * Each edge of the range can be a native Date or a YYYY-MM-DD string.
 */
type DateRangeValue = {
  /** Inclusive start date for the range. */
  from?: DateValue;
  /** Inclusive end date for the range. */
  to?: DateValue;
};

/**
 * Date-only range returned by range pickers and form wrappers.
 */
type DateOnlyRange = {
  /** Inclusive start date in YYYY-MM-DD format. */
  from?: DateOnlyString;
  /** Inclusive end date in YYYY-MM-DD format. */
  to?: DateOnlyString;
};

/**
 * Regular expression used to validate date-only strings.
 * Matches values like "2025-12-24".
 */
const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

const isValidDate = (value: Date) => !Number.isNaN(value.getTime());

const toCalendarDate = (value?: DateValue): Date | undefined => {
  if (!value) return undefined;

  if (value instanceof Date) {
    return isValidDate(value) ? new Date(value) : undefined;
  }

  const match = DATE_ONLY_PATTERN.exec(value);
  if (!match) return undefined;

  const [, year, month, day] = match;
  const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));

  if (
    !isValidDate(parsedDate) ||
    parsedDate.getFullYear() !== Number(year) ||
    parsedDate.getMonth() !== Number(month) - 1 ||
    parsedDate.getDate() !== Number(day)
  ) {
    return undefined;
  }

  return parsedDate;
};

const toDateOnlyString = (value?: Date): DateOnlyString | undefined => {
  if (!value || !isValidDate(value)) return undefined;

  return format(value, "yyyy-MM-dd");
};

const toCalendarDateFromKey = (value?: DateSelectionKey): Date | undefined => {
  if (typeof value === "number") {
    const parsedDate = new Date(value);
    return isValidDate(parsedDate) ? parsedDate : undefined;
  }

  return toCalendarDate(value);
};

const toCalendarDateRange = (value?: DateRangeValue): DateRange | undefined => {
  if (!value) return undefined;

  const from = toCalendarDate(value.from);
  const to = toCalendarDate(value.to);

  if (!from && !to) return undefined;

  return { from, to };
};

const toCalendarDateRangeFromKeys = (fromKey?: DateSelectionKey, toKey?: DateSelectionKey): DateRange | undefined => {
  const from = toCalendarDateFromKey(fromKey);
  const to = toCalendarDateFromKey(toKey);

  if (!from && !to) return undefined;

  return { from, to };
};

const toDateOnlyRange = (value?: DateRange): DateOnlyRange | undefined => {
  if (!value) return undefined;

  const from = toDateOnlyString(value.from);
  const to = toDateOnlyString(value.to);

  if (!from && !to) return undefined;

  return { from, to };
};

export {
  DATE_ONLY_PATTERN,
  toCalendarDate,
  toCalendarDateFromKey,
  toDateOnlyString,
  toCalendarDateRange,
  toCalendarDateRangeFromKeys,
  toDateOnlyRange,
  type DateOnlyRange,
  type DateOnlyString,
  type DateRangeValue,
  type DateSelectionKey,
  type DateValue,
};
