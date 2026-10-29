"use client";

import * as React from "react";
import type { Column } from "@tanstack/react-table";
import { Filter } from "@trsys-tech/matrix-icons";
import { cn } from "../../lib/utils";
import { Button } from "../button/Button";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/Popover";
import { filterType } from "./dataTableModel";
import { dataTableInputClass } from "./dataTableStyles";
import type { DataTableInstance, DataTableFeatures, DataTableColumnDef, DataTableFilter, DataTableFilterOperator } from "./DataTable.types";

export function DataTableColumnMenu<T extends object>({
  table,
  column,
  definition,
}: {
  table: DataTableInstance<T>;
  column: Column<DataTableFeatures, T>;
  definition: DataTableColumnDef<T>;
}) {
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState<DataTableFilter>({ operator: filterType(definition) === "text" ? "contains" : "equals", value: "" });
  const type = filterType(definition);
  const coreRows = table.getCoreRowModel().rows;
  const selectOptions = React.useMemo(
    () =>
      open && type === "select"
        ? (definition.filterOptions?.map(option => (typeof option === "string" ? { value: option, label: option } : option)) ??
          Array.from(
            new Set(
              coreRows
                .map(row => row.getValue(column.id))
                .filter(value => value !== null && value !== undefined && value !== "")
                .map(String),
            ),
          )
            .sort()
            .map(value => ({ value, label: value })))
        : [],
    [open, type, coreRows, column.id, definition.filterOptions],
  );
  const operators: DataTableFilterOperator[] =
    type === "text"
      ? ["contains", "notContains", "equals", "notEqual", "startsWith", "endsWith", "blank", "notBlank"]
      : type === "select"
        ? ["equals", "notEqual", "blank", "notBlank"]
        : ["equals", "notEqual", "greaterThan", "greaterThanOrEqual", "lessThan", "lessThanOrEqual", "inRange", "blank", "notBlank"];
  const labels: Record<DataTableFilterOperator, string> = {
    contains: "Contains",
    notContains: "Does not contain",
    equals: "Equals",
    notEqual: "Does not equal",
    startsWith: "Starts with",
    endsWith: "Ends with",
    greaterThan: "Greater than",
    greaterThanOrEqual: "Greater than or equal",
    lessThan: "Less than",
    lessThanOrEqual: "Less than or equal",
    inRange: "Between",
    blank: "Blank",
    notBlank: "Not blank",
  };
  const canPin = column.getCanPin();
  const canHide = column.getCanHide();
  if (!column.getCanFilter() && !canPin && !canHide) return null;

  return (
    <Popover
      open={open}
      onOpenChange={next => {
        if (next) setDraft((column.getFilterValue() as DataTableFilter) ?? { operator: type === "text" ? "contains" : "equals", value: "" });
        setOpen(next);
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`Column options ${column.id}`}
          className={cn("mtx-shrink-0 mtx-rounded-sm mtx-p-0.5 hover:mtx-bg-primary-100/80", column.getIsFiltered() && "mtx-text-primary")}
        >
          <Filter className="mtx-h-4.5 mtx-w-4.5" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="mtx-w-56 mtx-space-y-2 mtx-text-xs mtx-font-normal">
        {column.getCanFilter() && (
          <>
            <label className="mtx-block">
              Filter {typeof definition.headerName === "string" ? definition.headerName : column.id}
              <select
                aria-label="Filter operator"
                className={dataTableInputClass}
                value={draft.operator}
                onChange={event => setDraft({ ...draft, operator: event.target.value as DataTableFilterOperator })}
              >
                {operators.map(operator => (
                  <option key={operator} value={operator}>
                    {labels[operator]}
                  </option>
                ))}
              </select>
            </label>
            {draft.operator !== "blank" &&
              draft.operator !== "notBlank" &&
              (type === "select" ? (
                <select
                  aria-label="Filter value"
                  className={dataTableInputClass}
                  value={draft.value ?? ""}
                  onChange={event => setDraft({ ...draft, value: event.target.value })}
                >
                  <option value="">All</option>
                  {draft.value && !selectOptions.some(option => option.value === draft.value) && <option value={draft.value}>{draft.value}</option>}
                  {selectOptions.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  aria-label="Filter value"
                  className={dataTableInputClass}
                  type={type === "text" ? "text" : type}
                  value={draft.value ?? ""}
                  onChange={event => setDraft({ ...draft, value: event.target.value })}
                />
              ))}
            {type !== "select" && draft.operator === "inRange" && (
              <input
                aria-label="Filter upper value"
                className={dataTableInputClass}
                type={type === "text" ? "text" : type}
                value={draft.valueTo ?? ""}
                onChange={event => setDraft({ ...draft, valueTo: event.target.value })}
              />
            )}
            <div className="mtx-flex mtx-gap-2">
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  column.setFilterValue(
                    type === "select" && !draft.value && draft.operator !== "blank" && draft.operator !== "notBlank" ? undefined : draft,
                  );
                  setOpen(false);
                }}
              >
                Apply
              </Button>
              <Button
                type="button"
                size="sm"
                variant="text"
                onClick={() => {
                  column.setFilterValue(undefined);
                  setOpen(false);
                }}
              >
                Reset
              </Button>
            </div>
            {(canPin || canHide) && <hr className="mtx-border-gray-200" />}
          </>
        )}
        {(canPin || canHide) && (
          <div className="mtx-flex mtx-flex-wrap mtx-gap-1">
            {canPin && (
              <>
                <Button
                  type="button"
                  size="sm"
                  variant="text"
                  onClick={() => {
                    column.pin("start");
                    setOpen(false);
                  }}
                >
                  Pin start
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="text"
                  onClick={() => {
                    column.pin("end");
                    setOpen(false);
                  }}
                >
                  Pin end
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="text"
                  onClick={() => {
                    column.pin(false);
                    setOpen(false);
                  }}
                >
                  Unpin
                </Button>
              </>
            )}
            {canHide && (
              <Button
                type="button"
                size="sm"
                variant="text"
                onClick={() => {
                  column.toggleVisibility(false);
                  setOpen(false);
                }}
              >
                Hide column
              </Button>
            )}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
