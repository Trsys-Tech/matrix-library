import { getDefaultOptions as k } from "./defaultoptions.es.js";
import { formatters as l } from "./formatters.es.js";
import { longFormatters as g } from "./longformatters.es.js";
import { isProtectedWeekYearToken as h, isProtectedDayOfYearToken as d, warnOrThrowProtectedError as w } from "./protectedtokens.es.js";
import { isValid as T } from "./isvalid.es.js";
import { toDate as D } from "./todate.es.js";
import { enUS as E } from "./en-us.es.js";
const v = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, O = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, R = /^'([^]*?)'?$/, x = /''/g, C = /[a-zA-Z]/;
function j(o, r, f) {
  const a = k(), n = a.locale ?? E, m = a.firstWeekContainsDate ?? a.locale?.options?.firstWeekContainsDate ?? 1, p = a.weekStartsOn ?? a.locale?.options?.weekStartsOn ?? 0, i = D(o, f?.in);
  if (!T(i))
    throw new RangeError("Invalid time value");
  let s = r.match(O).map((t) => {
    const e = t[0];
    if (e === "p" || e === "P") {
      const c = g[e];
      return c(t, n.formatLong);
    }
    return t;
  }).join("").match(v).map((t) => {
    if (t === "''")
      return { isToken: !1, value: "'" };
    const e = t[0];
    if (e === "'")
      return { isToken: !1, value: P(t) };
    if (l[e])
      return { isToken: !0, value: t };
    if (e.match(C))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + e + "`"
      );
    return { isToken: !1, value: t };
  });
  n.localize.preprocessor && (s = n.localize.preprocessor(i, s));
  const u = {
    firstWeekContainsDate: m,
    weekStartsOn: p,
    locale: n
  };
  return s.map((t) => {
    if (!t.isToken) return t.value;
    const e = t.value;
    (h(e) || d(e)) && w(e, r, String(o));
    const c = l[e[0]];
    return c(i, e, n.localize, u);
  }).join("");
}
function P(o) {
  const r = o.match(R);
  return r ? r[1].replace(x, "'") : o;
}
export {
  j as default,
  j as format,
  j as formatDate,
  l as formatters,
  g as longFormatters
};
//# sourceMappingURL=format.es.js.map
