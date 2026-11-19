import * as React from "react";
import type { Header } from "@tanstack/react-table";
import type { DataTableFeatures } from "./DataTable.types";

export function useDataTableColumnResize(disabled: boolean) {
  const cancelResize = React.useRef<(() => void) | null>(null);

  React.useLayoutEffect(() => {
    if (disabled) return;
    return () => cancelResize.current?.();
  }, [disabled]);

  return <T extends object>(header: Header<DataTableFeatures, T, unknown>, event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || !event.isPrimary || event.button !== 0) return;
    cancelResize.current?.();

    const { table } = header;
    const { clientX: startOffset, pointerId } = event;
    const startSize = header.getSize();
    const columnSizingStart: [string, number][] = header.getLeafHeaders().map(({ column }) => [column.id, column.getSize()]);
    const document = event.currentTarget.ownerDocument;
    const listeners = new AbortController();
    const stop = () => {
      listeners.abort();
      cancelResize.current = null;
      table.resetHeaderSizeInfo(true);
    };
    const update = (clientX: number, commit: boolean) => {
      const direction = table.options.columnResizeDirection === "rtl" ? -1 : 1;
      const deltaOffset = (clientX - startOffset) * direction;
      const deltaPercentage = Math.max(startSize > 0 ? deltaOffset / startSize : 0, -0.999999);
      table.setColumnResizing(previous => ({ ...previous, deltaOffset, deltaPercentage }));
      if (commit) {
        table.setColumnSizing(previous => ({
          ...previous,
          ...Object.fromEntries(
            columnSizingStart.map(([id, size]) => {
              const width = size > 0 ? size * (1 + deltaPercentage) : deltaOffset / columnSizingStart.length;
              return [id, Math.round(Math.max(width, 0) * 100) / 100];
            }),
          ),
        }));
      }
    };
    const options = { signal: listeners.signal };
    cancelResize.current = stop;
    document.addEventListener(
      "pointermove",
      move => {
        if (move.pointerId === pointerId) update(move.clientX, table.options.columnResizeMode === "onChange");
      },
      options,
    );
    document.addEventListener(
      "pointerup",
      end => {
        if (end.pointerId !== pointerId) return;
        update(end.clientX, true);
        stop();
      },
      options,
    );
    document.addEventListener(
      "pointercancel",
      cancel => {
        if (cancel.pointerId === pointerId) stop();
      },
      options,
    );
    document.defaultView?.addEventListener("blur", stop, options);
    table.setColumnResizing(previous => ({
      ...previous,
      startOffset,
      startSize,
      deltaOffset: 0,
      deltaPercentage: 0,
      columnSizingStart,
      isResizingColumn: header.column.id,
    }));
  };
}
