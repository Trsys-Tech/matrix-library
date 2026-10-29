import * as React from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { moveDataTableColumn } from "./dataTableModel";
import type { DataTableRuntime } from "./useDataTableApi";

type DataTableColumnDragOptions<T extends object> = {
  runtime: React.MutableRefObject<DataTableRuntime<T>>;
  viewportRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  setColumnDrag: React.Dispatch<React.SetStateAction<{ sourceId: string; targetId: string } | null>>;
};

type DataTableColumnDragHandlers = Pick<React.ComponentProps<typeof DragDropProvider>, "onDragStart" | "onDragMove" | "onDragEnd">;

export function useDataTableColumnDrag<T extends object>({
  runtime,
  viewportRef,
  contentRef,
  setColumnDrag,
}: DataTableColumnDragOptions<T>): DataTableColumnDragHandlers {
  const columnDragRef = React.useRef<{
    sourceId: string;
    targetId: string;
    scrollLeft: number;
    columns: { id: string; left: number; right: number }[];
  } | null>(null);
  const handlers: DataTableColumnDragHandlers = {
    onDragStart: event => {
      const sourceId = event.operation.source?.data.columnId;
      if (typeof sourceId !== "string" || !event.nativeEvent?.type.startsWith("pointer")) return;
      const region = runtime.current.table.getColumn(sourceId)?.getIsPinned();
      columnDragRef.current = {
        sourceId,
        targetId: sourceId,
        scrollLeft: viewportRef.current?.scrollLeft ?? 0,
        columns: Array.from(contentRef.current?.querySelectorAll<HTMLElement>('[role="columnheader"][data-column-id]') ?? [])
          .filter(element => runtime.current.table.getColumn(element.dataset.columnId!)?.getIsPinned() === region)
          .map(element => {
            const rect = element.getBoundingClientRect();
            return { id: element.dataset.columnId!, left: rect.left, right: rect.right };
          }),
      };
      setColumnDrag({ sourceId, targetId: sourceId });
    },
    onDragMove: event => {
      const drag = columnDragRef.current;
      if (!drag || !event.to) return;
      const pinned = runtime.current.table.getColumn(drag.sourceId)?.getIsPinned();
      const x = event.to.x + (pinned ? 0 : (viewportRef.current?.scrollLeft ?? 0) - drag.scrollLeft);
      // Initial slots remain stable while the rendered columns move underneath the pointer.
      const target = drag.columns.find(column => x >= column.left && x <= column.right);
      if (!target || target.id === drag.targetId) return;
      drag.targetId = target.id;
      setColumnDrag({ sourceId: drag.sourceId, targetId: target.id });
    },
    onDragEnd: event => {
      const { source, target } = event.operation;
      const drag = columnDragRef.current;
      const targetId = drag?.targetId ?? target?.data.columnId;
      if (!event.canceled && typeof source?.data.columnId === "string" && typeof targetId === "string") {
        moveDataTableColumn(runtime.current.table, source.data.columnId, targetId);
      }
      columnDragRef.current = null;
      setColumnDrag(null);
    },
  };
  return handlers;
}
