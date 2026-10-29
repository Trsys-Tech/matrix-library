"use client";

import * as React from "react";
import { useDraggable, useDroppable, useDragDropMonitor } from "@dnd-kit/react";

import { cn } from "../../lib/utils";

type DataTableColumnHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  columnId: string;
  label: string;
  region: "start" | "end" | false;
  disabled: boolean;
};

/** The header is the drag surface; menus and resizing opt out through the sensor. */
export function DataTableColumnHeader({
  columnId,
  label,
  region,
  disabled,
  className,
  children,
  onClickCapture,
  ...props
}: DataTableColumnHeaderProps) {
  const type = `data-table-column:${region || "center"}`;
  const instructionsId = React.useId();
  const suppressClick = React.useRef(false);
  const clickTimer = React.useRef<ReturnType<typeof setTimeout>>();
  React.useEffect(() => () => clearTimeout(clickTimer.current), []);
  useDragDropMonitor({
    onDragStart: event => {
      if (event.operation.source?.data.columnId === columnId && event.nativeEvent?.type.startsWith("pointer")) {
        clearTimeout(clickTimer.current);
        suppressClick.current = true;
      }
    },
    onDragEnd: event => {
      if (event.operation.source?.data.columnId === columnId && suppressClick.current) {
        clickTimer.current = setTimeout(() => {
          suppressClick.current = false;
        }, 300);
      }
    },
  });
  const {
    ref: sourceRef,
    handleRef,
    isDragSource,
  } = useDraggable({
    id: `column:${columnId}`,
    type,
    data: { columnId },
    disabled,
  });
  const { ref: targetRef, isDropTarget } = useDroppable({
    id: `column:${columnId}`,
    accept: type,
    data: { columnId },
    disabled,
  });
  const ref = React.useCallback(
    (element: HTMLDivElement | null) => {
      sourceRef(element);
      targetRef(element);
      handleRef(element);
    },
    [sourceRef, targetRef, handleRef],
  );
  return (
    <div
      {...props}
      ref={ref}
      role="columnheader"
      tabIndex={disabled ? undefined : 0}
      aria-label={label}
      aria-describedby={disabled ? undefined : instructionsId}
      data-column-id={columnId}
      data-dragging={isDragSource || undefined}
      data-drop-target={isDropTarget || undefined}
      className={cn(
        className,
        !disabled &&
          "mtx-cursor-grab mtx-touch-pan-y active:mtx-cursor-grabbing focus-visible:mtx-outline-none focus-visible:mtx-ring-1 focus-visible:mtx-ring-inset focus-visible:mtx-ring-primary",
        isDragSource && "mtx-opacity-50",
        isDropTarget && "mtx-ring-2 mtx-ring-inset mtx-ring-primary-300",
      )}
      onClickCapture={event => {
        if (suppressClick.current) {
          suppressClick.current = false;
          clearTimeout(clickTimer.current);
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        onClickCapture?.(event);
      }}
    >
      {!disabled && (
        <span id={instructionsId} className="mtx-sr-only">
          Drag to reorder. With this header focused, press Space or Enter to pick up, Left or Right to move, Space or Enter to drop, or Escape to
          cancel.
        </span>
      )}
      {children}
    </div>
  );
}
