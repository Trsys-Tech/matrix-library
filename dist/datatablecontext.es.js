import * as e from "react";
const a = e.createContext(null);
function n() {
  const t = e.useContext(a);
  if (!t) throw new Error("DataTable components must be used within <DataTable>.");
  return { ...t, search: t.search ?? "", hasSearch: t.search !== void 0, api: t.api };
}
const o = e.createContext(null);
export {
  o as DataTableAlignmentContext,
  a as DataTableContext,
  n as useDataTable
};
//# sourceMappingURL=datatablecontext.es.js.map
