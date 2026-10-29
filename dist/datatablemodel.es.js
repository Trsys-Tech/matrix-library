function S(t, n, s) {
  return t && n.includes(t.rowId) && s.includes(t.columnId) ? t : { rowId: n[0], columnId: s[0] };
}
function T(t, n, s) {
  if (n === s || n.startsWith("__") || s.startsWith("__")) return !1;
  const r = t.getColumn(n), u = t.getColumn(s);
  if (!r || !u || !r.getIsVisible() || !u.getIsVisible() || r.getIsPinned() !== u.getIsPinned()) return !1;
  const o = r.getIsPinned(), e = o ? t.atoms.columnPinning.get()[o] ?? [] : t.getAllLeafColumns().map((a) => a.id), i = e.indexOf(n), c = e.indexOf(s);
  if (i < 0 || c < 0) return !1;
  const l = [...e];
  return l.splice(i, 1), l.splice(c, 0, n), o ? t.setColumnPinning((a) => ({ ...a, [o]: l })) : t.setColumnOrder(l), !0;
}
function g(t) {
  const n = t.colId ?? t.field;
  if (!n || n.startsWith("__")) throw new Error("DataTable columns require a unique field or colId (ids starting with __ are reserved).");
  return n;
}
function x(t, n, s) {
  return n.valueGetter ? n.valueGetter({ data: t, rowIndex: s }) : n.field?.split(".").reduce((r, u) => r?.[u], t);
}
function D(t, n, s) {
  if (n.valueSetter) return n.valueSetter(t, s);
  if (!n.field) return t;
  const r = n.field.split("."), u = (o, e) => {
    const i = r[e], c = o, l = Array.isArray(o) ? [...o] : { ...c };
    return l[i] = e === r.length - 1 ? s : u(c?.[i], e + 1), l;
  };
  return u(t, 0);
}
const h = /^\d{4}-\d{2}-\d{2}/, m = /^(\d{4})-(\d{2})-(\d{2})$/;
function b(t) {
  return t instanceof Date && Number.isFinite(t.getTime()) ? `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}` : typeof t == "string" ? h.exec(t)?.[0] ?? "" : "";
}
function p(t, n, s) {
  if (t === "") return null;
  const r = m.exec(t);
  if (!r || s !== "date" && !(n instanceof Date)) return t;
  const u = +r[1], o = +r[2] - 1, e = +r[3], i = new Date(u, o, e);
  return i.getFullYear() === u && i.getMonth() === o && i.getDate() === e ? i : t;
}
function w(t) {
  return typeof t.filter == "string" ? t.filter : t.cellDataType === "number" ? "number" : t.cellDataType === "date" || t.cellDataType === "dateString" ? "date" : "text";
}
function y(t, n, s) {
  if (n === void 0 || n === "") return !0;
  const r = typeof n == "string" ? { operator: s === "select" ? "equals" : "contains", value: n } : n, u = t == null || t === "";
  if (r.operator === "blank") return u;
  if (r.operator === "notBlank") return !u;
  if (r.value === void 0 || r.value === "") return !0;
  if (u) return !1;
  const o = (c) => {
    if (s === "number") return Number(c);
    if (s === "date") {
      if (c instanceof Date) return new Date(c.getFullYear(), c.getMonth(), c.getDate()).getTime();
      const l = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(c));
      if (!l) return NaN;
      const a = new Date(+l[1], +l[2] - 1, +l[3]);
      return a.getFullYear() === +l[1] && a.getMonth() === +l[2] - 1 && a.getDate() === +l[3] ? a.getTime() : NaN;
    }
    return s === "select" ? String(c) : String(c).toLocaleLowerCase();
  }, e = o(t), i = o(r.value);
  if (typeof e == "number" && !Number.isFinite(e) || typeof i == "number" && !Number.isFinite(i)) return !1;
  switch (r.operator) {
    case "contains":
      return String(e).includes(String(i));
    case "notContains":
      return !String(e).includes(String(i));
    case "startsWith":
      return String(e).startsWith(String(i));
    case "endsWith":
      return String(e).endsWith(String(i));
    case "equals":
      return e === i;
    case "notEqual":
      return e !== i;
    case "greaterThan":
      return e > i;
    case "greaterThanOrEqual":
      return e >= i;
    case "lessThan":
      return e < i;
    case "lessThanOrEqual":
      return e <= i;
    case "inRange":
      return r.valueTo !== void 0 && r.valueTo !== "" && e >= i && e <= o(r.valueTo);
    default:
      return !0;
  }
}
function C(t, n, s) {
  const r = {};
  let u = n, o = t.filter((e) => (e.flex ?? 0) > 0 && s[g(e)] === void 0);
  for (const e of t)
    o.includes(e) || (u -= Math.max(
      e.minWidth ?? 60,
      Math.min(e.maxWidth ?? Number.MAX_SAFE_INTEGER, s[g(e)] ?? e.width ?? 150)
    ));
  for (; o.length; ) {
    const e = o.reduce((a, f) => a + f.flex, 0), i = o.map((a) => {
      const f = u * a.flex / e, d = Math.max(a.minWidth ?? 60, Math.min(a.maxWidth ?? Number.MAX_SAFE_INTEGER, f));
      return { column: a, share: f, width: d };
    }), c = i.reduce((a, { share: f, width: d }) => a + d - f, 0);
    if (Math.abs(c) < 1e-8) {
      for (const { column: a, width: f } of i) r[g(a)] = f;
      break;
    }
    const l = i.filter(({ share: a, width: f }) => c > 0 ? f > a : f < a);
    for (const { column: a, width: f } of l)
      r[g(a)] = f, u -= f;
    o = o.filter((a) => !l.some((f) => f.column === a));
  }
  return r;
}
export {
  w as filterType,
  S as getActiveDataTableCell,
  x as getCellValue,
  g as getColumnId,
  C as getFlexSizes,
  y as matchesFilter,
  T as moveDataTableColumn,
  p as parseDateInputValue,
  D as setCellValue,
  b as toDateInputValue
};
//# sourceMappingURL=datatablemodel.es.js.map
