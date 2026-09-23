import { constructFrom as f } from "./constructfrom.es.js";
import { getISOWeekYear as s } from "./getisoweekyear.es.js";
import { startOfISOWeek as a } from "./startofisoweek.es.js";
function O(t, e) {
  const o = s(t, e), r = f(t, 0);
  return r.setFullYear(o, 0, 4), r.setHours(0, 0, 0, 0), a(r);
}
export {
  O as startOfISOWeekYear
};
//# sourceMappingURL=startofisoweekyear.es.js.map
