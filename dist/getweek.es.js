import { millisecondsInWeek as f } from "./constants.es.js";
import { startOfWeek as m } from "./startofweek.es.js";
import { startOfWeekYear as i } from "./startofweekyear.es.js";
import { toDate as n } from "./todate.es.js";
function s(r, t) {
  const e = n(r, t?.in), o = +m(e, t) - +i(e, t);
  return Math.round(o / f) + 1;
}
export {
  s as getWeek
};
//# sourceMappingURL=getweek.es.js.map
