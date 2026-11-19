import { DragDropProvider } from '@dnd-kit/react';
import { DataTableRuntime } from './useDataTableApi';
import * as React from "react";
type DataTableColumnDragOptions<T extends object> = {
    loading: boolean;
    runtime: React.MutableRefObject<DataTableRuntime<T>>;
    viewportRef: React.RefObject<HTMLDivElement>;
    contentRef: React.RefObject<HTMLDivElement>;
    setColumnDrag: React.Dispatch<React.SetStateAction<{
        sourceId: string;
        targetId: string;
    } | null>>;
};
type DataTableColumnDragHandlers = Pick<React.ComponentProps<typeof DragDropProvider>, "onBeforeDragStart" | "onDragStart" | "onDragMove" | "onDragEnd">;
export declare function useDataTableColumnDrag<T extends object>({ loading, runtime, viewportRef, contentRef, setColumnDrag, }: DataTableColumnDragOptions<T>): DataTableColumnDragHandlers;
export {};
//# sourceMappingURL=useDataTableColumnDrag.d.ts.map