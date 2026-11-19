const $ = /^(\d{4})-(\d{2})-(\d{2})$/, g = (t, e, n) => {
  const r = /* @__PURE__ */ new Date(0);
  return r.setFullYear(t, e, n), r.setHours(0, 0, 0, 0), r;
}, d = (t) => g(t.getFullYear(), t.getMonth(), t.getDate()), m = (t, e) => g(t.getFullYear(), t.getMonth(), t.getDate() + e), p = (t, e) => g(t.getFullYear(), t.getMonth() + e, 1), Y = (t) => {
  const e = d(t), n = (e.getDay() + 6) % 7;
  return m(e, -n);
}, I = (t) => g(t.getFullYear(), t.getMonth(), 1), b = (t) => g(t.getFullYear(), Math.floor(t.getMonth() / 3) * 3, 1), y = (t, e) => e === "week" ? Y(t) : e === "month" ? I(t) : b(t), F = (t, e) => e === "week" ? m(t, 7) : e === "month" ? p(t, 1) : p(t, 3), f = (t, e, n = "short") => new Intl.DateTimeFormat(e, { month: n }).format(t), N = (t, e, n, r) => {
  if (n === "quarter")
    return `${f(t, r)}–${f(m(e, -1), r)}`.toUpperCase();
  if (n === "month")
    return f(t, r).toUpperCase();
  const a = m(e, -1);
  return t.getMonth() === a.getMonth() ? `${t.getDate()}–${a.getDate()}` : `${f(t, r)} ${t.getDate()}–${f(a, r)} ${a.getDate()}`;
}, k = (t, e, n) => e === "week" ? {
  key: `${t.getFullYear()}-${t.getMonth()}`,
  label: `${f(t, n, "long")} ${t.getFullYear()}`
} : { key: String(t.getFullYear()), label: String(t.getFullYear()) }, c = (t) => {
  if (t === void 0) return null;
  if (t instanceof Date)
    return Number.isNaN(t.getTime()) ? null : d(t);
  const e = $.exec(t);
  if (e) {
    const r = Number(e[1]), a = Number(e[2]) - 1, u = Number(e[3]), s = g(r, a, u);
    return s.getFullYear() !== r || s.getMonth() !== a || s.getDate() !== u ? null : s;
  }
  const n = new Date(t);
  return Number.isNaN(n.getTime()) ? null : d(n);
}, x = () => {
  const t = /* @__PURE__ */ new Date();
  return {
    start: g(t.getFullYear(), 0, 1),
    end: g(t.getFullYear(), 11, 31)
  };
}, O = (t, e, n) => {
  const r = t.flatMap((o) => [o, ...o.additionalBars ?? []]).flatMap((o) => [c(o.start), c(o.end)]).filter((o) => o !== null), a = x();
  let u = c(e) ?? (r.length > 0 ? new Date(Math.min(...r.map((o) => o.getTime()))) : a.start), s = c(n) ?? (r.length > 0 ? new Date(Math.max(...r.map((o) => o.getTime()))) : a.end);
  return s < u && ([u, s] = [s, u]), { start: u, end: s };
}, P = (t, e, n, r) => {
  const a = [], u = y(t, n), s = F(y(e, n), n);
  let o = u;
  for (; o < s; ) {
    const l = F(o, n), i = k(o, n, r);
    a.push({
      start: o,
      end: l,
      label: N(o, l, n, r),
      groupKey: i.key,
      groupLabel: i.label
    }), o = l;
  }
  const h = a.reduce((l, i, T) => {
    const M = l.at(-1);
    return M?.key === i.groupKey ? M.intervalCount += 1 : l.push({ key: i.groupKey, label: i.groupLabel, startIndex: T, intervalCount: 1 }), l;
  }, []);
  return { intervals: a, groups: h };
}, D = (t, e) => {
  if (e.length === 0) return 0;
  const n = e[0], r = e.at(-1);
  if (t <= n.start) return 0;
  if (t >= r.end) return 100;
  const a = e.findIndex((o) => t >= o.start && t < o.end);
  if (a < 0) return 0;
  const u = e[a], s = (t.getTime() - u.start.getTime()) / (u.end.getTime() - u.start.getTime());
  return (a + s) / e.length * 100;
}, R = (t, e) => {
  if (e.length === 0) return null;
  const n = e[0], r = e.at(-1);
  return t < n.start || t >= r.end ? null : D(t, e);
}, E = (t, e) => {
  const n = c(t.start), r = c(t.end);
  if (!n || !r) return null;
  const a = n <= r ? n : r, u = n <= r ? r : n, s = D(a, e), o = D(m(u, 1), e);
  if (o <= 0 || s >= 100) return null;
  const h = Math.max(0, s), l = Math.min(100, o);
  return { left: h, width: Math.max(0, l - h) };
}, L = (t = 0) => Math.min(100, Math.max(0, t)), w = (t, e) => {
  const n = c(t.start), r = c(t.end);
  if (!n || !r) return "Invalid date";
  const a = new Intl.DateTimeFormat(e, { month: "short", day: "numeric" });
  return `${a.format(n)}–${a.format(r)}`;
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
