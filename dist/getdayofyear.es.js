import { differenceInCalendarDays as a } from "./differenceincalendardays.es.js";
import { startOfYear as e } from "./startofyear.es.js";
import { toDate as o } from "./todate.es.js";
function s(t, f) {
  const r = o(t, f?.in);
  return a(r, e(r)) + 1;
}
export {
  s as getDayOfYear
};
//# sourceMappingURL=getdayofyear.es.js.map
