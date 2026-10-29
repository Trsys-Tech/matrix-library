import { tableFeatures as e, sortFn_basic as t, sortFn_datetime as o, sortFn_alphanumeric as r, rowSortingFeature as a, rowSelectionFeature as n, rowPinningFeature as i, rowPaginationFeature as l, rowExpandingFeature as d, columnVisibilityFeature as u, columnResizingFeature as F, columnSizingFeature as c, columnPinningFeature as g, columnOrderingFeature as s, globalFilteringFeature as w, columnFilteringFeature as m, createPaginatedRowModel as R, createExpandedRowModel as p, createSortedRowModel as M, createFilteredRowModel as b } from "@tanstack/react-table";
const P = e({
  columnFilteringFeature: m,
  globalFilteringFeature: w,
  columnOrderingFeature: s,
  columnPinningFeature: g,
  columnSizingFeature: c,
  columnResizingFeature: F,
  columnVisibilityFeature: u,
  rowExpandingFeature: d,
  rowPaginationFeature: l,
  rowPinningFeature: i,
  rowSelectionFeature: n,
  rowSortingFeature: a,
  filteredRowModel: b(),
  sortedRowModel: M(),
  expandedRowModel: p(),
  paginatedRowModel: R(),
  sortFns: { alphanumeric: r, datetime: o, basic: t }
});
export {
  P as dataTableFeatures
};
//# sourceMappingURL=datatablefeatures.es.js.map
