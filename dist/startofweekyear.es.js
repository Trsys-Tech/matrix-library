import { getDefaultOptions as n } from "./defaultoptions.es.js";
import { constructFrom as i } from "./constructfrom.es.js";
import { getWeekYear as f } from "./getweekyear.es.js";
import { startOfWeek as c } from "./startofweek.es.js";
function D(r, t) {
  const a = n(), o = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? a.firstWeekContainsDate ?? a.locale?.options?.firstWeekContainsDate ?? 1, s = f(r, t), e = i(t?.in || r, 0);
  return e.setFullYear(s, 0, o), e.setHours(0, 0, 0, 0), c(e, t);
}
export {
  D as default,
  D as startOfWeekYear
};
//# sourceMappingURL=startofweekyear.es.js.map
