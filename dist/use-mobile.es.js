import * as o from "react";
function r() {
  const [s, n] = o.useState(void 0), e = 640;
  return o.useEffect(() => {
    const t = window.matchMedia(`(max-width: ${e - 1}px)`), i = () => {
      n(window.innerWidth < e);
    };
    return t.addEventListener("change", i), n(window.innerWidth < e), () => t.removeEventListener("change", i);
  }, [e]), !!s;
}
export {
  r as useIsMobile
};
//# sourceMappingURL=use-mobile.es.js.map
