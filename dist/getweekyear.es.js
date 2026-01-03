import { getDefaultOptions as k } from "./defaultoptions.es.js";
import { constructFrom as i } from "./constructfrom.es.js";
import { startOfWeek as l } from "./startofweek.es.js";
import { toDate as m } from "./todate.es.js";
function C(r, e) {
  const s = m(r, e?.in), t = s.getFullYear(), o = k(), f = e?.firstWeekContainsDate ?? e?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, a = i(e?.in || r, 0);
  a.setFullYear(t + 1, 0, f), a.setHours(0, 0, 0, 0);
  const c = l(a, e), n = i(e?.in || r, 0);
  n.setFullYear(t, 0, f), n.setHours(0, 0, 0, 0);
  const u = l(n, e);
  return +s >= +c ? t + 1 : +s >= +u ? t : t - 1;
}
export {
  C as default,
  C as getWeekYear
};
//# sourceMappingURL=getweekyear.es.js.map
