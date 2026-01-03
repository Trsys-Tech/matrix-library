import { millisecondsInWeek as f } from "./constants.es.js";
import { startOfWeek as m } from "./startofweek.es.js";
import { startOfWeekYear as a } from "./startofweekyear.es.js";
import { toDate as i } from "./todate.es.js";
function k(r, t) {
  const e = i(r, t?.in), o = +m(e, t) - +a(e, t);
  return Math.round(o / f) + 1;
}
export {
  k as default,
  k as getWeek
};
//# sourceMappingURL=getweek.es.js.map
