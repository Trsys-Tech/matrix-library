const $ = /^(\d{4})-(\d{2})-(\d{2})$/, g = (t, e, n) => {
  const r = /* @__PURE__ */ new Date(0);
  return r.setFullYear(t, e, n), r.setHours(0, 0, 0, 0), r;
}, D = (t) => g(t.getFullYear(), t.getMonth(), t.getDate()), m = (t, e) => g(t.getFullYear(), t.getMonth(), t.getDate() + e), p = (t, e) => g(t.getFullYear(), t.getMonth() + e, 1), Y = (t) => {
  const e = D(t), n = (e.getDay() + 6) % 7;
  return m(e, -n);
}, b = (t) => g(t.getFullYear(), t.getMonth(), 1), I = (t) => g(t.getFullYear(), Math.floor(t.getMonth() / 3) * 3, 1), y = (t, e) => e === "week" ? Y(t) : e === "month" ? b(t) : I(t), F = (t, e) => e === "week" ? m(t, 7) : e === "month" ? p(t, 1) : p(t, 3), f = (t, e, n = "short") => new Intl.DateTimeFormat(e, { month: n }).format(t), N = (t, e, n, r) => {
  if (n === "quarter")
    return `${f(t, r)}–${f(m(e, -1), r)}`.toUpperCase();
  if (n === "month")
    return f(t, r).toUpperCase();
  const o = m(e, -1);
  return t.getMonth() === o.getMonth() ? `${t.getDate()}–${o.getDate()}` : `${f(t, r)} ${t.getDate()}–${f(o, r)} ${o.getDate()}`;
}, k = (t, e, n) => e === "week" ? {
  key: `${t.getFullYear()}-${t.getMonth()}`,
  label: `${f(t, n, "long")} ${t.getFullYear()}`
} : { key: String(t.getFullYear()), label: String(t.getFullYear()) }, c = (t) => {
  if (t === void 0) return null;
  if (t instanceof Date)
    return Number.isNaN(t.getTime()) ? null : D(t);
  const e = $.exec(t);
  if (e) {
    const r = Number(e[1]), o = Number(e[2]) - 1, u = Number(e[3]), s = g(r, o, u);
    return s.getFullYear() !== r || s.getMonth() !== o || s.getDate() !== u ? null : s;
  }
  const n = new Date(t);
  return Number.isNaN(n.getTime()) ? null : D(n);
}, x = () => {
  const t = /* @__PURE__ */ new Date();
  return {
    start: g(t.getFullYear(), 0, 1),
    end: g(t.getFullYear(), 11, 31)
  };
}, O = (t, e, n) => {
  const r = t.flatMap((a) => [c(a.start), c(a.end)]).filter((a) => a !== null), o = x();
  let u = c(e) ?? (r.length > 0 ? new Date(Math.min(...r.map((a) => a.getTime()))) : o.start), s = c(n) ?? (r.length > 0 ? new Date(Math.max(...r.map((a) => a.getTime()))) : o.end);
  return s < u && ([u, s] = [s, u]), { start: u, end: s };
}, P = (t, e, n, r) => {
  const o = [], u = y(t, n), s = F(y(e, n), n);
  let a = u;
  for (; a < s; ) {
    const l = F(a, n), i = k(a, n, r);
    o.push({
      start: a,
      end: l,
      label: N(a, l, n, r),
      groupKey: i.key,
      groupLabel: i.label
    }), a = l;
  }
  const h = o.reduce((l, i, T) => {
    const M = l.at(-1);
    return M?.key === i.groupKey ? M.intervalCount += 1 : l.push({ key: i.groupKey, label: i.groupLabel, startIndex: T, intervalCount: 1 }), l;
  }, []);
  return { intervals: o, groups: h };
}, d = (t, e) => {
  if (e.length === 0) return 0;
  const n = e[0], r = e.at(-1);
  if (t <= n.start) return 0;
  if (t >= r.end) return 100;
  const o = e.findIndex((a) => t >= a.start && t < a.end);
  if (o < 0) return 0;
  const u = e[o], s = (t.getTime() - u.start.getTime()) / (u.end.getTime() - u.start.getTime());
  return (o + s) / e.length * 100;
}, R = (t, e) => {
  if (e.length === 0) return null;
  const n = e[0], r = e.at(-1);
  return t < n.start || t >= r.end ? null : d(t, e);
}, E = (t, e) => {
  const n = c(t.start), r = c(t.end);
  if (!n || !r) return null;
  const o = n <= r ? n : r, u = n <= r ? r : n, s = d(o, e), a = d(m(u, 1), e);
  if (a <= 0 || s >= 100) return null;
  const h = Math.max(0, s), l = Math.min(100, a);
  return { left: h, width: Math.max(0, l - h) };
}, L = (t = 0) => Math.min(100, Math.max(0, t)), w = (t, e) => {
  const n = c(t.start), r = c(t.end);
  if (!n || !r) return "Invalid date";
  const o = new Intl.DateTimeFormat(e, { month: "short", day: "numeric" });
  return `${o.format(n)}–${o.format(r)}`;
}, C = (t, e) => !!(e && e >= t.start && e < t.end);
export {
  m as addDays,
  L as clampProgress,
  P as createTimeline,
  w as formatDateRange,
  E as getBarPosition,
  R as getMarkerPosition,
  O as getTimelineRange,
  C as includesDate,
  c as toDate
};
//# sourceMappingURL=gantt-chart.es.js.map
