import { isDate as r } from "./isdate.es.js";
import { toDate as i } from "./todate.es.js";
function e(o) {
  return !(!r(o) && typeof o != "number" || isNaN(+i(o)));
}
export {
  e as isValid
};
//# sourceMappingURL=isvalid.es.js.map
