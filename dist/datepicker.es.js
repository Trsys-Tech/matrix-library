import { jsx as e } from "react/jsx-runtime";
import { DesktopDatePicker as i } from "./desktopdatepicker.es.js";
import { MobileDatePicker as r } from "./mobiledatepicker.es.js";
import { useIsMobile as t } from "./use-mobile.es.js";
const k = (o) => t() ? /* @__PURE__ */ e(r, { ...o }) : /* @__PURE__ */ e(i, { ...o });
export {
  k as DatePicker,
  i as DesktopDatePicker,
  r as MobileDatePicker
};
//# sourceMappingURL=datepicker.es.js.map
