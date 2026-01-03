import { jsx as o } from "react/jsx-runtime";
import { useIsMobile as i } from "./use-mobile.es.js";
import { MobileDateRangePicker as r } from "./mobiledaterangepicker.es.js";
import { DesktopDateRangePicker as t } from "./desktopdaterangepicker.es.js";
const b = (e) => i() ? /* @__PURE__ */ o(r, { ...e }) : /* @__PURE__ */ o(t, { ...e });
export {
  b as DateRangePicker,
  t as DesktopDateRangePicker,
  r as MobileDateRangePicker
};
//# sourceMappingURL=daterangepicker.es.js.map
