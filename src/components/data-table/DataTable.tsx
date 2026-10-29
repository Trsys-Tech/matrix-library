"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { DataTableContext, useDataTable } from "./DataTableContext";
import type { DataTableApi } from "./DataTable.types";

export type DataTableProps = React.HTMLAttributes<HTMLDivElement>;

const DataTable = React.forwardRef<HTMLDivElement, DataTableProps>(({ children, className, style, ...props }, ref) => {
  const [api, setApi] = React.useState<DataTableApi<any> | null>(null);
  const [search, setSearch] = React.useState<string>();
  const [counts, setCounts] = React.useState({ selectedCount: 0, pinnedCount: 0 });
  const value = React.useMemo(() => ({ api, setApi, search, setSearch, ...counts, setCounts }), [api, search, counts]);
  return (
    <DataTableContext.Provider value={value}>
      <div
        ref={ref}
        data-data-table=""
        className={cn(
          "mtx-flex mtx-h-full mtx-min-h-0 mtx-flex-col mtx-rounded-lg mtx-border mtx-border-gray-200 mtx-bg-gray-0 mtx-font-sans mtx-text-xs mtx-text-text",
          className,
        )}
        {...props}
        style={{ fontFamily: "DMSans, sans-serif", ...style }}
      >
        {children}
      </div>
    </DataTableContext.Provider>
  );
});
DataTable.displayName = "DataTable";

export type DataTableActionBarProps = React.HTMLAttributes<HTMLDivElement>;
const DataTableActionBar = React.forwardRef<HTMLDivElement, DataTableActionBarProps>(({ className, ...props }, ref) => {
  useDataTable();
  return (
    <div
      ref={ref}
      data-print-hidden=""
      className={cn(
        "mtx-flex mtx-min-h-12 mtx-shrink-0 mtx-items-center mtx-gap-1 mtx-rounded-t-lg mtx-border-b mtx-border-gray-200 mtx-p-2",
        className,
      )}
      {...props}
    />
  );
});
DataTableActionBar.displayName = "DataTableActionBar";

export { DataTable, DataTableActionBar };
export { DataTableContent } from "./DataTableContent";
