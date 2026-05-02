import { getTimezoneOffsetInMilliseconds as r } from "./gettimezoneoffsetinmilliseconds.es.js";
import { normalizeDates as c } from "./normalizedates.es.js";
import { millisecondsInDay as D } from "./constants.es.js";
import { startOfDay as a } from "./startofday.es.js";
function u(o, n, i) {
  const [m, s] = c(
    i?.in,
    o,
    n
  ), t = a(m), e = a(s), f = +t - r(t), l = +e - r(e);
  return Math.round((f - l) / D);
}
export {
  u as differenceInCalendarDays
};
//# sourceMappingURL=differenceincalendardays.es.js.map
