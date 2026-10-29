import { jsx as m } from "react/jsx-runtime";
import * as t from "react";
import { DataTableAlignmentContext as i } from "./datatablecontext.es.js";
function f({ children: o, initialState: a = {} }) {
  const [e, n] = t.useState(a), r = t.useRef(/* @__PURE__ */ new Set()), s = t.useMemo(() => ({ state: e, setState: n, viewports: r }), [e]);
  return /* @__PURE__ */ m(i.Provider, { value: s, children: o });
}
export {
  f as DataTableAlignment
};
//# sourceMappingURL=datatablealignment.es.js.map
