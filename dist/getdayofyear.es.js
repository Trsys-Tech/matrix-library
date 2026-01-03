import { differenceInCalendarDays as f } from "./differenceincalendardays.es.js";
import { startOfYear as e } from "./startofyear.es.js";
import { toDate as o } from "./todate.es.js";
function c(t, a) {
  const r = o(t, a?.in);
  return f(r, e(r)) + 1;
}
export {
  c as default,
  c as getDayOfYear
};
//# sourceMappingURL=getdayofyear.es.js.map
