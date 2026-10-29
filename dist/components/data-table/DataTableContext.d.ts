import { DataTableApi, DataTableState } from './DataTable.types';
import * as React from "react";
type DataTableContextValue = {
    api: DataTableApi<any> | null;
    setApi: React.Dispatch<React.SetStateAction<DataTableApi<any> | null>>;
    search: string | undefined;
    setSearch: (value: string) => void;
    selectedCount: number;
    pinnedCount: number;
    setCounts: React.Dispatch<React.SetStateAction<{
        selectedCount: number;
        pinnedCount: number;
    }>>;
};
export declare const DataTableContext: React.Context<DataTableContextValue | null>;
export declare function useDataTable<T extends object = Record<string, unknown>>(): {
    search: string;
    hasSearch: boolean;
    api: DataTableApi<T> | null;
    setApi: React.Dispatch<React.SetStateAction<DataTableApi<any> | null>>;
    setSearch: (value: string) => void;
    selectedCount: number;
    pinnedCount: number;
    setCounts: React.Dispatch<React.SetStateAction<{
        selectedCount: number;
        pinnedCount: number;
    }>>;
};
export type AlignmentState = Pick<DataTableState, "columnSizing" | "columnOrder" | "columnPinning" | "columnVisibility">;
type AlignmentContextValue = {
    state: Partial<AlignmentState>;
    setState: React.Dispatch<React.SetStateAction<Partial<AlignmentState>>>;
    viewports: React.MutableRefObject<Set<HTMLDivElement>>;
};
export declare const DataTableAlignmentContext: React.Context<AlignmentContextValue | null>;
export {};
//# sourceMappingURL=DataTableContext.d.ts.map