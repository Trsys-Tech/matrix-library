"use client";

import * as React from "react";

import type { DataTableApi, DataTableState } from "./DataTable.types";

type DataTableContextValue = {
  api: DataTableApi<any> | null;
  setApi: React.Dispatch<React.SetStateAction<DataTableApi<any> | null>>;
  search: string | undefined;
  setSearch: (value: string) => void;
  selectedCount: number;
  pinnedCount: number;
  setCounts: React.Dispatch<React.SetStateAction<{ selectedCount: number; pinnedCount: number }>>;
};

export const DataTableContext = React.createContext<DataTableContextValue | null>(null);

export function useDataTable<T extends object = Record<string, unknown>>() {
  const context = React.useContext(DataTableContext);
  if (!context) throw new Error("DataTable components must be used within <DataTable>.");
  // An untouched search can use the content's initial filter; an explicit empty search clears it.
  return { ...context, search: context.search ?? "", hasSearch: context.search !== undefined, api: context.api as DataTableApi<T> | null };
}

export type AlignmentState = Pick<DataTableState, "columnSizing" | "columnOrder" | "columnPinning" | "columnVisibility">;
type AlignmentContextValue = {
  state: Partial<AlignmentState>;
  setState: React.Dispatch<React.SetStateAction<Partial<AlignmentState>>>;
  viewports: React.MutableRefObject<Set<HTMLDivElement>>;
};

export const DataTableAlignmentContext = React.createContext<AlignmentContextValue | null>(null);
