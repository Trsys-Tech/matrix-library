import { Virtualizer } from '@tanstack/react-virtual';
import { DataTableApi, DataTableColumn, DataTableContentProps, DataTableInstance, DataTableRow } from './DataTable.types';
import { DataTableEditSession } from './dataTableEditing';
import * as React from "react";
export type DataTableRuntime<T extends object> = {
    table: DataTableInstance<T>;
    definitionsById: Map<string, DataTableColumn<T>>;
    centerRows: DataTableRow<T>[];
    virtualizer: Virtualizer<HTMLDivElement, Element>;
    resolveId: (data: T, index: number) => string;
    rowIndices: Map<T, number>;
    sourcesById: Map<string, T>;
    useVirtualRows: boolean;
    pagination: boolean;
    serverPagination: boolean;
};
type EditConfig<T extends object> = Pick<DataTableContentProps<T>, "columnDefs" | "validateRow" | "readOnlyEdit" | "onEditCommit" | "onEditRequest" | "onEditCancel">;
type DataTableApiOptions<T extends object> = {
    runtime: React.MutableRefObject<DataTableRuntime<T>>;
    editRef: React.MutableRefObject<DataTableEditSession<T> | null>;
    configRef: React.MutableRefObject<EditConfig<T>>;
    updateEdit: (next: DataTableEditSession<T> | null) => void;
    setPatches: React.Dispatch<React.SetStateAction<Record<string, {
        source: T;
        data: T;
    }>>>;
    contentRef: React.RefObject<HTMLDivElement>;
    viewportRef: React.RefObject<HTMLDivElement>;
    setPrinting: React.Dispatch<React.SetStateAction<boolean>>;
};
/** Stable public API; methods read current rows, callbacks and layout through refs. */
export declare function useDataTableApi<T extends object>({ runtime, editRef, configRef, updateEdit, setPatches, contentRef, viewportRef, setPrinting, }: DataTableApiOptions<T>): DataTableApi<T>;
export {};
//# sourceMappingURL=useDataTableApi.d.ts.map