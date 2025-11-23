import { isDate as r } from "./isdate.es.js";
import { toDate as t } from "./todate.es.js";
function f(o) {
  return !(!r(o) && typeof o != "number" || isNaN(+t(o)));
}
export {
  f as default,
  f as isValid
};
//# sourceMappingURL=isvalid.es.js.map
