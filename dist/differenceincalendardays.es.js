import { getTimezoneOffsetInMilliseconds as r } from "./gettimezoneoffsetinmilliseconds.es.js";
import { normalizeDates as c } from "./normalizedates.es.js";
import { millisecondsInDay as D } from "./constants.es.js";
import { startOfDay as a } from "./startofday.es.js";
function O(o, n, i) {
  const [s, m] = c(
    i?.in,
    o,
    n
  ), t = a(s), e = a(m), f = +t - r(t), l = +e - r(e);
  return Math.round((f - l) / D);
}
export {
  O as default,
  O as differenceInCalendarDays
};
//# sourceMappingURL=differenceincalendardays.es.js.map
