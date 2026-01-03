import { toDate as a } from "./todate.es.js";
function s(e, r) {
  const t = a(e, r?.in);
  return t.setFullYear(t.getFullYear(), 0, 1), t.setHours(0, 0, 0, 0), t;
}
export {
  s as default,
  s as startOfYear
};
//# sourceMappingURL=startofyear.es.js.map
