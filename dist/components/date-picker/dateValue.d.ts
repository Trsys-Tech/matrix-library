import { DateRange } from 'react-day-picker';
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
declare const DATE_ONLY_PATTERN: RegExp;
declare const toCalendarDate: (value?: DateValue) => Date | undefined;
declare const toDateOnlyString: (value?: Date) => DateOnlyString | undefined;
declare const toCalendarDateFromKey: (value?: DateSelectionKey) => Date | undefined;
declare const toCalendarDateRange: (value?: DateRangeValue) => DateRange | undefined;
declare const toCalendarDateRangeFromKeys: (fromKey?: DateSelectionKey, toKey?: DateSelectionKey) => DateRange | undefined;
declare const toDateOnlyRange: (value?: DateRange) => DateOnlyRange | undefined;
export { DATE_ONLY_PATTERN, toCalendarDate, toCalendarDateFromKey, toDateOnlyString, toCalendarDateRange, toCalendarDateRangeFromKeys, toDateOnlyRange, type DateOnlyRange, type DateOnlyString, type DateRangeValue, type DateSelectionKey, type DateValue, };
//# sourceMappingURL=dateValue.d.ts.map