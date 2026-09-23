import { getDefaultOptions as n } from "./defaultoptions.es.js";
import { constructFrom as i } from "./constructfrom.es.js";
import { getWeekYear as f } from "./getweekyear.es.js";
import { startOfWeek as c } from "./startofweek.es.js";
function D(r, t) {
  const o = n(), s = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, a = f(r, t), e = i(t?.in || r, 0);
  return e.setFullYear(a, 0, s), e.setHours(0, 0, 0, 0), c(e, t);
}
export {
  D as startOfWeekYear
};
//# sourceMappingURL=startofweekyear.es.js.map
