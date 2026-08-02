import { format as m } from "./format.es.js";
const f = /^(\d{4})-(\d{2})-(\d{2})$/, i = (t) => !Number.isNaN(t.getTime()), d = (t) => {
  if (!t) return;
  if (t instanceof Date)
    return i(t) ? new Date(t) : void 0;
  const r = f.exec(t);
  if (!r) return;
  const [, o, e, s] = r, n = new Date(Number(o), Number(e) - 1, Number(s));
  if (!(!i(n) || n.getFullYear() !== Number(o) || n.getMonth() !== Number(e) - 1 || n.getDate() !== Number(s)))
    return n;
}, a = (t) => {
  if (!(!t || !i(t)))
    return m(t, "yyyy-MM-dd");
}, c = (t) => {
  if (typeof t == "number") {
    const r = new Date(t);
    return i(r) ? r : void 0;
  }
  return d(t);
}, u = (t) => {
  if (!t) return;
  const r = d(t.from), o = d(t.to);
  if (!(!r && !o))
    return { from: r, to: o };
}, y = (t, r) => {
  const o = c(t), e = c(r);
  if (!(!o && !e))
    return { from: o, to: e };
}, N = (t) => {
  if (!t) return;
  const r = a(t.from), o = a(t.to);
  if (!(!r && !o))
    return { from: r, to: o };
};
export {
  f as DATE_ONLY_PATTERN,
  d as toCalendarDate,
  c as toCalendarDateFromKey,
  u as toCalendarDateRange,
  y as toCalendarDateRangeFromKeys,
  N as toDateOnlyRange,
  a as toDateOnlyString
};
//# sourceMappingURL=datevalue.es.js.map
