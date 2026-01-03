import { millisecondsInWeek as f } from "./constants.es.js";
import { startOfISOWeek as i } from "./startofisoweek.es.js";
import { startOfISOWeekYear as m } from "./startofisoweekyear.es.js";
import { toDate as n } from "./todate.es.js";
function O(e, o) {
  const t = n(e, o?.in), r = +i(t) - +m(t);
  return Math.round(r / f) + 1;
}
export {
  O as default,
  O as getISOWeek
};
//# sourceMappingURL=getisoweek.es.js.map
