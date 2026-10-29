"use client";

import { Button } from "../button/Button";
import { dataTableInputClass } from "./dataTableStyles";
import type { DataTableInstance } from "./DataTable.types";

type DataTablePaginationProps<T extends object> = {
  table: DataTableInstance<T>;
  paginationPageSizeSelector: readonly number[];
};

export function DataTablePagination<T extends object>({ table, paginationPageSizeSelector }: DataTablePaginationProps<T>) {
  return (
    <div data-print-hidden="" className="mtx-flex mtx-shrink-0 mtx-items-center mtx-justify-end mtx-gap-3 mtx-border-t mtx-border-gray-200 mtx-p-2">
      <label className="mtx-flex mtx-items-center mtx-gap-2">
        Rows per page
        <select
          className={dataTableInputClass}
          aria-label="Rows per page"
          value={table.state.pagination.pageSize}
          onChange={event => table.setPageSize(Number(event.target.value))}
        >
          {Array.from(new Set([...paginationPageSizeSelector, table.state.pagination.pageSize]))
            .sort((a, b) => a - b)
            .map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
        </select>
      </label>
      <span>
        Page {table.state.pagination.pageIndex + 1} of {Math.max(1, table.getPageCount())}
      </span>
      <Button
        type="button"
        variant="text"
        size="sm"
        aria-label="Previous page"
        disabled={!table.getCanPreviousPage()}
        onClick={() => table.previousPage()}
      >
        Previous
      </Button>
      <Button type="button" variant="text" size="sm" aria-label="Next page" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
        Next
      </Button>
    </div>
  );
}
