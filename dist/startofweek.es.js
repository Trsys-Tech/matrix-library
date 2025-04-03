import { getDefaultOptions as f } from "./defaultoptions.es.js";
import { toDate as c } from "./todate.es.js";
function l(n, e) {
  const a = f(), o = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? a.weekStartsOn ?? a.locale?.options?.weekStartsOn ?? 0, t = c(n, e?.in), s = t.getDay(), r = (s < o ? 7 : 0) + s - o;
  return t.setDate(t.getDate() - r), t.setHours(0, 0, 0, 0), t;
}
export {
  l as default,
  l as startOfWeek
};
//# sourceMappingURL=startofweek.es.js.map
