import { constructFrom as a } from "./constructfrom.es.js";
import { getISOWeekYear as f } from "./getisoweekyear.es.js";
import { startOfISOWeek as s } from "./startofisoweek.es.js";
function O(t, e) {
  const o = f(t, e), r = a(t, 0);
  return r.setFullYear(o, 0, 4), r.setHours(0, 0, 0, 0), s(r);
}
export {
  O as default,
  O as startOfISOWeekYear
};
//# sourceMappingURL=startofisoweekyear.es.js.map
