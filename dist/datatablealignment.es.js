import { jsx as m } from "react/jsx-runtime";
import * as e from "react";
import { DataTableAlignmentContext as c } from "./datatablecontext.es.js";
function f({ children: o, initialState: n = {} }) {
  const [t, s] = e.useState(n), a = e.useRef(/* @__PURE__ */ new Set()), r = e.useRef(/* @__PURE__ */ new WeakMap()), i = e.useMemo(() => ({ state: t, setState: s, viewports: a, synchronizedScrolls: r }), [t]);
  return /* @__PURE__ */ m(c.Provider, { value: i, children: o });
}
export {
  f as DataTableAlignment
};
//# sourceMappingURL=datatablealignment.es.js.map
