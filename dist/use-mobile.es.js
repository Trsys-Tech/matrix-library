import * as r from "react";
const t = 640;
function i(e) {
  const n = window.matchMedia(`(max-width: ${t - 1}px)`);
  return n.addEventListener("change", e), () => n.removeEventListener("change", e);
}
function o() {
  return window.innerWidth < t;
}
function s() {
  return !1;
}
function a() {
  return r.useSyncExternalStore(i, o, s);
}
export {
  a as useIsMobile
};
//# sourceMappingURL=use-mobile.es.js.map
