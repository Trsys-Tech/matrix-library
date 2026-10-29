"use client";

import React, { forwardRef, useEffect, useId, useMemo, useRef, useState } from "react";
import { DragDropProvider, DragOverlay, PointerSensor, useDraggable, useDroppable } from "@dnd-kit/react";

import { cn } from "../../lib/utils";
import { toCalendarDate, toDateOnlyString, type DateValue } from "../date-picker/dateValue";

type ResourceSchedulerResource = {
  id: string | number;
  label: React.ReactNode;
};

type ResourceSchedulerItem = {
  id: string | number;
  resourceId: ResourceSchedulerResource["id"];
  /** Date, YYYY-MM-DD, or ISO date-time string. Items use the local calendar day and retain their time when moved. */
  date: DateValue;
  /** Arbitrary card content; the calendar does not style the card itself. */
  content: React.ReactNode;
  /** Accessible name for moving this card. Defaults to its id. */
  label?: string;
  draggable?: boolean;
};

type ResourceSchedulerMove = {
  previousItem: ResourceSchedulerItem;
  item: ResourceSchedulerItem;
};

type ResourceSchedulerCellContext = {
  resource: ResourceSchedulerResource;
  /** Local calendar date in YYYY-MM-DD format. */
  date: string;
  items: readonly ResourceSchedulerItem[];
};

type ResourceSchedulerProps = Omit<React.ComponentPropsWithoutRef<"div">, "children" | "defaultValue"> & {
  resources: readonly ResourceSchedulerResource[];
  /** Inclusive local-calendar boundaries, accepting Date, YYYY-MM-DD, or ISO date-time strings. */
  from: DateValue;
  to: DateValue;
  /** Controlled items; update this prop in onItemsChange to accept a move. */
  items?: readonly ResourceSchedulerItem[];
  defaultItems?: readonly ResourceSchedulerItem[];
  onItemsChange?: (items: ResourceSchedulerItem[], move: ResourceSchedulerMove) => void;
  /** Overrides automatic day moves. Choose the time and update controlled items in this callback. */
  onItemDrop?: (move: ResourceSchedulerMove) => void;
  disabled?: boolean;
  resourceColumnWidth?: number;
  dayColumnWidth?: number;
  rowMinHeight?: number;
  cardWidth?: number;
  /** Horizontal distance between overlapping cards in the same day cell. */
  stackOffset?: number;
  locale?: string;
  /** Render a day heading. Defaults to the locale's short weekday, month and day. */
  formatter?: (date: Date) => React.ReactNode;
  resourceHeading?: React.ReactNode;
  /** Custom action shown at the bottom right on cell hover or keyboard focus. Return null to omit it. */
  renderCellButton?: (cell: ResourceSchedulerCellContext) => React.ReactNode;
  /** Enable the custom action globally or for selected cells. Defaults to true; disabled schedulers hide it. */
  showCellButton?: boolean | ((cell: ResourceSchedulerCellContext) => boolean);
  slotProps?: {
    resource?: React.ComponentPropsWithoutRef<"div">;
    day?: React.ComponentPropsWithoutRef<"div">;
    cell?: React.ComponentPropsWithoutRef<"div">;
    card?: React.ComponentPropsWithoutRef<"div">;
  };
};

type ItemId = ResourceSchedulerItem["id"];
type MoveTarget = { resourceId: ResourceSchedulerResource["id"]; day: string };
type ActiveMove = { itemId: ItemId; keyboard: boolean; touch?: boolean; target: MoveTarget };

// Native dragging handles desktop input; dnd-kit supplies long-press touch dragging.
// Its default touch activation waits 250 ms and cancels after 5 px of movement.
const touchSensors = [
  PointerSensor.configure({
    preventActivation: (event, source) => event.pointerType !== "touch" || !!PointerSensor.defaults.preventActivation?.(event, source),
  }),
];

type ResourceSchedulerInteraction = {
  items: readonly ResourceSchedulerItem[];
  disabled: boolean;
  instructionsId: string;
  activeMove: ActiveMove | null;
  draggedItemRef: React.MutableRefObject<ItemId | null>;
  cardRefs: React.MutableRefObject<Map<ItemId, HTMLDivElement>>;
  setActiveMove: React.Dispatch<React.SetStateAction<ActiveMove | null>>;
  handleMove: (itemId: ItemId, target: MoveTarget) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>, item: ResourceSchedulerItem) => void;
};

type ResourceSchedulerHeaderProps = {
  today: string;
  days: readonly Date[];
  dayKeys: readonly string[];
  formatter: NonNullable<ResourceSchedulerProps["formatter"]>;
  resourceHeading: React.ReactNode;
  resourceColumnWidth: number;
  dayColumnWidth: number;
  slotProps: ResourceSchedulerProps["slotProps"];
};

const ResourceSchedulerHeader = ({
  today,
  days,
  dayKeys,
  formatter,
  resourceHeading,
  resourceColumnWidth,
  dayColumnWidth,
  slotProps,
}: ResourceSchedulerHeaderProps) => (
  <div role="row" className="mtx-flex">
    <div
      role="columnheader"
      className="mtx-sticky mtx-left-0 mtx-z-20 mtx-flex mtx-shrink-0 mtx-items-center mtx-border-b mtx-border-r mtx-border-gray-200 mtx-bg-gray-0 mtx-px-4 mtx-py-2"
      style={{ width: resourceColumnWidth }}
    >
      {resourceHeading}
    </div>
    {days.map((day, index) => (
      <div
        {...slotProps?.day}
        key={dayKeys[index]}
        role="columnheader"
        data-date={dayKeys[index]}
        data-today={dayKeys[index] === today || undefined}
        aria-current={dayKeys[index] === today ? "date" : undefined}
        className={cn(
          "mtx-flex mtx-flex-1 mtx-items-center mtx-justify-center mtx-border-b mtx-border-r mtx-border-gray-200 mtx-px-2 mtx-py-2",
          dayKeys[index] === today && "mtx-bg-primary-50",
          slotProps?.day?.className,
        )}
        style={{ minWidth: dayColumnWidth, ...slotProps?.day?.style }}
      >
        {formatter(day)}
      </div>
    ))}
  </div>
);

type ResourceSchedulerCardProps = {
  item: ResourceSchedulerItem;
  index: number;
  count: number;
  resourceId: ResourceSchedulerResource["id"];
  day: string;
  cardWidth: number;
  stackOffset: number;
  slotProps: ResourceSchedulerProps["slotProps"];
  interaction: ResourceSchedulerInteraction;
};

const ResourceSchedulerCard = ({
  item,
  index,
  count,
  resourceId,
  day,
  cardWidth,
  stackOffset,
  slotProps,
  interaction,
}: ResourceSchedulerCardProps) => {
  const { disabled, instructionsId, activeMove, draggedItemRef, cardRefs, setActiveMove, handleKeyDown } = interaction;
  const [focused, setFocused] = useState(false);
  const { ref: draggableRef } = useDraggable({
    id: item.id,
    disabled: disabled || item.draggable === false || !!activeMove?.keyboard,
    data: { resourceId, day },
  });
  const dragImageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => () => dragImageRef.current?.remove(), []);
  const isMoving = activeMove?.itemId === item.id;
  return (
    <div
      {...slotProps?.card}
      ref={node => {
        draggableRef(node);
        if (node) cardRefs.current.set(item.id, node);
        else cardRefs.current.delete(item.id);
      }}
      data-item-id={item.id}
      data-moving={isMoving || undefined}
      role="group"
      aria-label={item.label ?? String(item.id)}
      aria-describedby={instructionsId}
      tabIndex={disabled || item.draggable === false ? undefined : 0}
      draggable={!disabled && item.draggable !== false}
      className={cn(
        "mtx-relative focus-visible:mtx-outline-none focus-visible:mtx-ring-2 focus-visible:mtx-ring-primary-300",
        !disabled && item.draggable !== false && "mtx-cursor-grab active:mtx-cursor-grabbing",
        slotProps?.card?.className,
      )}
      style={{
        gridArea: "1 / 1",
        marginLeft: index * stackOffset,
        width: cardWidth,
        touchAction: "manipulation",
        ...slotProps?.card?.style,
        zIndex: focused || isMoving ? count : index,
      }}
      onFocus={event => {
        setFocused(true);
        slotProps?.card?.onFocus?.(event);
      }}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
        slotProps?.card?.onBlur?.(event);
      }}
      onDragStart={event => {
        slotProps?.card?.onDragStart?.(event);
        if (event.defaultPrevented || disabled || item.draggable === false) {
          event.preventDefault();
          return;
        }
        draggedItemRef.current = item.id;
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", String(item.id));
        // Isolate the preview from overlapping siblings in the browser's drag snapshot.
        dragImageRef.current?.remove();
        const card = event.currentTarget;
        const bounds = card.getBoundingClientRect();
        const preview = card.cloneNode(true) as HTMLDivElement;
        preview.setAttribute("aria-hidden", "true");
        preview.removeAttribute("id");
        preview.querySelectorAll("[id]").forEach(node => node.removeAttribute("id"));
        Object.assign(preview.style, { position: "fixed", top: "0", left: "-10000px", margin: "0", width: `${bounds.width}px` });
        card.ownerDocument.body.appendChild(preview);
        dragImageRef.current = preview;
        event.dataTransfer.setDragImage(preview, event.clientX - bounds.left, event.clientY - bounds.top);
        setActiveMove({ itemId: item.id, keyboard: false, target: { resourceId, day } });
      }}
      onDragEnd={event => {
        dragImageRef.current?.remove();
        dragImageRef.current = null;
        draggedItemRef.current = null;
        setActiveMove(null);
        slotProps?.card?.onDragEnd?.(event);
      }}
      onKeyDown={event => {
        slotProps?.card?.onKeyDown?.(event);
        if (!event.defaultPrevented) handleKeyDown(event, item);
      }}
    >
      {item.content}
    </div>
  );
};

type ResourceSchedulerCellProps = {
  resource: ResourceSchedulerResource;
  today: string;
  renderCellButton: ResourceSchedulerProps["renderCellButton"];
  showCellButton: ResourceSchedulerProps["showCellButton"];
  day: string;
  cellItems: readonly ResourceSchedulerItem[];
  dayColumnWidth: number;
  rowMinHeight: number;
  cardWidth: number;
  stackOffset: number;
  slotProps: ResourceSchedulerProps["slotProps"];
  interaction: ResourceSchedulerInteraction;
};

const ResourceSchedulerCell = ({
  resource,
  today,
  renderCellButton,
  showCellButton,
  day,
  cellItems,
  dayColumnWidth,
  rowMinHeight,
  cardWidth,
  stackOffset,
  slotProps,
  interaction,
}: ResourceSchedulerCellProps) => {
  const { disabled, activeMove, draggedItemRef, items, setActiveMove, handleMove } = interaction;
  const resourceId = resource.id;
  const { ref: droppableRef, isDropTarget } = useDroppable({
    id: JSON.stringify([typeof resourceId, resourceId, day]),
    data: { resourceId, day },
    disabled,
    accept: source => source.data.resourceId === resourceId,
  });
  const cell = { resource, date: day, items: cellItems };
  const button =
    !disabled && renderCellButton && (typeof showCellButton === "function" ? showCellButton(cell) : showCellButton) ? renderCellButton(cell) : null;
  const isTarget =
    !disabled && (isDropTarget || (!activeMove?.touch && activeMove?.target.resourceId === resourceId && activeMove.target.day === day));
  return (
    <div
      {...slotProps?.cell}
      ref={droppableRef}
      role="cell"
      data-resource-id={resourceId}
      data-date={day}
      data-today={day === today || undefined}
      data-drop-target={isTarget || undefined}
      className={cn(
        "mtx-group/cell mtx-relative mtx-isolate mtx-flex-1 mtx-border-b mtx-border-r mtx-border-gray-200 mtx-p-1.5",
        day === today && "mtx-bg-gray-50",
        isTarget && "mtx-bg-primary-50 mtx-ring-2 mtx-ring-inset mtx-ring-primary-300",
        slotProps?.cell?.className,
      )}
      style={{ minWidth: dayColumnWidth, minHeight: rowMinHeight, ...slotProps?.cell?.style }}
      onDragOver={event => {
        slotProps?.cell?.onDragOver?.(event);
        if (
          event.defaultPrevented ||
          disabled ||
          draggedItemRef.current === null ||
          items.find(item => item.id === draggedItemRef.current)?.resourceId !== resourceId
        )
          return;
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        setActiveMove({ itemId: draggedItemRef.current, keyboard: false, target: { resourceId, day } });
      }}
      onDrop={event => {
        slotProps?.cell?.onDrop?.(event);
        if (event.defaultPrevented || disabled || draggedItemRef.current === null) return;
        event.preventDefault();
        handleMove(draggedItemRef.current, { resourceId, day });
      }}
    >
      <div className="mtx-overflow-x-auto">
        <div
          className="mtx-grid mtx-items-start"
          style={{
            gridTemplateColumns: "minmax(0, 1fr)",
            minWidth: cellItems.length ? cardWidth + (cellItems.length - 1) * stackOffset : undefined,
          }}
        >
          {cellItems.map((item, index) => (
            <ResourceSchedulerCard
              key={`${typeof item.id}:${item.id}`}
              item={item}
              index={index}
              count={cellItems.length}
              resourceId={resourceId}
              day={day}
              cardWidth={cardWidth}
              stackOffset={stackOffset}
              slotProps={slotProps}
              interaction={interaction}
            />
          ))}
        </div>
      </div>
      {button != null && (
        <div className="mtx-pointer-events-none mtx-absolute mtx-bottom-1.5 mtx-right-1.5 mtx-z-10 mtx-opacity-0 group-hover/cell:mtx-pointer-events-auto group-hover/cell:mtx-opacity-100 group-focus-within/cell:mtx-pointer-events-auto group-focus-within/cell:mtx-opacity-100 [@media(hover:none)]:mtx-pointer-events-auto [@media(hover:none)]:mtx-opacity-100">
          {button}
        </div>
      )}
    </div>
  );
};

type ResourceSchedulerRowProps = {
  today: string;
  renderCellButton: ResourceSchedulerProps["renderCellButton"];
  showCellButton: ResourceSchedulerProps["showCellButton"];
  resource: ResourceSchedulerResource;
  dayKeys: readonly string[];
  groupedItems: Map<ResourceSchedulerResource["id"], Map<string, ResourceSchedulerItem[]>>;
  resourceColumnWidth: number;
  dayColumnWidth: number;
  rowMinHeight: number;
  cardWidth: number;
  stackOffset: number;
  slotProps: ResourceSchedulerProps["slotProps"];
  interaction: ResourceSchedulerInteraction;
};

const ResourceSchedulerRow = ({
  today,
  renderCellButton,
  showCellButton,
  resource,
  dayKeys,
  groupedItems,
  resourceColumnWidth,
  dayColumnWidth,
  rowMinHeight,
  cardWidth,
  stackOffset,
  slotProps,
  interaction,
}: ResourceSchedulerRowProps) => (
  <div role="row" className="mtx-flex">
    <div
      {...slotProps?.resource}
      role="rowheader"
      className={cn(
        "mtx-sticky mtx-left-0 mtx-z-20 mtx-flex mtx-shrink-0 mtx-items-center mtx-border-b mtx-border-r mtx-border-gray-200 mtx-bg-gray-0 mtx-px-4 mtx-font-semibold",
        slotProps?.resource?.className,
      )}
      style={{ width: resourceColumnWidth, ...slotProps?.resource?.style }}
    >
      {resource.label}
    </div>
    {dayKeys.map(day => (
      <ResourceSchedulerCell
        key={day}
        resource={resource}
        today={today}
        renderCellButton={renderCellButton}
        showCellButton={showCellButton}
        day={day}
        cellItems={groupedItems.get(resource.id)?.get(day) ?? []}
        dayColumnWidth={dayColumnWidth}
        rowMinHeight={rowMinHeight}
        cardWidth={cardWidth}
        stackOffset={stackOffset}
        slotProps={slotProps}
        interaction={interaction}
      />
    ))}
  </div>
);

const toSchedulerDate = (value: DateValue): Date | undefined => {
  if (value instanceof Date || /^\d{4}-\d{2}-\d{2}$/.test(value)) return toCalendarDate(value);
  if (!/^\d{4}-\d{2}-\d{2}T/.test(value) || !toCalendarDate(value.slice(0, 10))) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
};

const getDay = (date: DateValue) => toDateOnlyString(toSchedulerDate(date));

/** Resource-by-day calendar with consumer-rendered cards and controlled or local moves. */
const ResourceScheduler = forwardRef<HTMLDivElement, ResourceSchedulerProps>(
  (
    {
      resources,
      from,
      to,
      items: controlledItems,
      defaultItems = [],
      onItemsChange,
      onItemDrop,
      disabled = false,
      resourceColumnWidth = 164,
      dayColumnWidth = 268,
      rowMinHeight = 124,
      cardWidth = 192,
      stackOffset = 32,
      locale = "en-US",
      formatter: customFormatter,
      resourceHeading = "Resource",
      renderCellButton,
      showCellButton = true,
      slotProps,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const [today, setToday] = useState(() => toDateOnlyString(new Date())!);
    useEffect(() => {
      let timer: ReturnType<typeof setTimeout>;
      const updateToday = () => {
        const now = new Date();
        setToday(toDateOnlyString(now)!);
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);
        timer = setTimeout(updateToday, midnight.getTime() - now.getTime());
      };
      updateToday();
      return () => clearTimeout(timer);
    }, []);
    const [localItems, setLocalItems] = useState(defaultItems);
    const items = controlledItems ?? localItems;
    const [activeMove, setActiveMove] = useState<ActiveMove | null>(null);
    const [announcement, setAnnouncement] = useState("");
    const draggedItemRef = useRef<ItemId | null>(null);
    const cardRefs = useRef(new Map<ItemId, HTMLDivElement>());
    const pendingFocus = useRef<{ itemId: ItemId; target: MoveTarget } | null>(null);
    const [moveOrder, setMoveOrder] = useState<readonly { itemId: ItemId; target: MoveTarget }[]>([]);
    useEffect(() => {
      const pending = pendingFocus.current;
      if (!pending) return;
      const item = items.find(item => item.id === pending.itemId);
      if (item && item.resourceId === pending.target.resourceId && getDay(item.date) === pending.target.day) {
        cardRefs.current.get(item.id)?.focus();
        pendingFocus.current = null;
      }
    }, [items, moveOrder]);
    const instructionsId = useId();
    const fromDay = getDay(from);
    const toDay = getDay(to);
    const days = useMemo(() => {
      const start = toCalendarDate(fromDay);
      const end = toCalendarDate(toDay);
      if (!start || !end || start > end) return [];
      const result: Date[] = [];
      for (const day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) result.push(new Date(day));
      return result;
    }, [fromDay, toDay]);
    const dayKeys = days.map(day => toDateOnlyString(day)!);
    const formatter = customFormatter ?? new Intl.DateTimeFormat(locale, { weekday: "short", month: "short", day: "numeric" }).format;
    const groupedItems = useMemo(() => {
      const grouped = new Map<ResourceSchedulerResource["id"], Map<string, ResourceSchedulerItem[]>>();
      for (const item of items) {
        const day = getDay(item.date);
        if (!day) continue;
        let resource = grouped.get(item.resourceId);
        if (!resource) {
          resource = new Map();
          grouped.set(item.resourceId, resource);
        }
        const cell = resource.get(day) ?? [];
        cell.push(item);
        resource.set(day, cell);
      }
      const priorities = new Map(
        moveOrder.map((move, index) => {
          const item = items.find(item => item.id === move.itemId);
          const accepted = item?.resourceId === move.target.resourceId && getDay(item.date) === move.target.day;
          return [move.itemId, accepted ? index + 1 : 0] as const;
        }),
      );
      for (const resource of grouped.values()) {
        for (const cell of resource.values()) {
          // Earlier times stay underneath later times; the latest move wins equal-time ties.
          cell.sort(
            (a, b) =>
              toSchedulerDate(a.date)!.getTime() - toSchedulerDate(b.date)!.getTime() || (priorities.get(a.id) ?? 0) - (priorities.get(b.id) ?? 0),
          );
        }
      }
      return grouped;
    }, [items, moveOrder]);

    const handleMove = (itemId: ItemId, target: MoveTarget) => {
      const previousItem = items.find(item => item.id === itemId);
      setActiveMove(null);
      draggedItemRef.current = null;
      if (disabled || !previousItem || previousItem.draggable === false || !resources.some(resource => resource.id === target.resourceId)) return;
      if (!dayKeys.includes(target.day) || previousItem.resourceId !== target.resourceId) return;
      if (!onItemDrop && getDay(previousItem.date) === target.day) return;
      const original = toSchedulerDate(previousItem.date);
      if (!original) return;
      const date = toCalendarDate(target.day)!;
      date.setHours(original.getHours(), original.getMinutes(), original.getSeconds(), original.getMilliseconds());
      let nextDate: DateValue = date;
      if (typeof previousItem.date === "string") {
        if (!previousItem.date.includes("T")) nextDate = target.day;
        else if (/(?:Z|[+-]\d{2}:?\d{2})$/i.test(previousItem.date)) nextDate = date.toISOString();
        else nextDate = target.day + previousItem.date.slice(10);
      }
      const item = { ...previousItem, resourceId: target.resourceId, date: nextDate };
      if (activeMove?.keyboard) pendingFocus.current = { itemId, target };
      setMoveOrder(current => [...current.filter(move => move.itemId !== itemId && items.some(item => item.id === move.itemId)), { itemId, target }]);
      if (onItemDrop) {
        onItemDrop({ previousItem, item });
        setAnnouncement(`Move requested for ${item.label ?? item.id} to ${target.day}.`);
        return;
      }
      const nextItems = items.map(current => (current.id === itemId ? item : current));
      if (controlledItems === undefined) setLocalItems(nextItems);
      onItemsChange?.(nextItems, { previousItem, item });
      setAnnouncement(`Move requested for ${item.label ?? item.id} to ${target.day}, resource ${target.resourceId}.`);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, item: ResourceSchedulerItem) => {
      // Leave keyboard events from interactive card content to the consumer.
      if (event.target !== event.currentTarget || disabled || item.draggable === false) return;
      if (!activeMove) {
        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
          const cell = groupedItems.get(item.resourceId)?.get(getDay(item.date)!) ?? [];
          const selectable = cell.filter(current => current.draggable !== false);
          const index = selectable.findIndex(current => current.id === item.id);
          const next = selectable[(index + (event.key === "ArrowDown" ? 1 : -1) + selectable.length) % selectable.length];
          if (next) {
            event.preventDefault();
            cardRefs.current.get(next.id)?.focus();
          }
          return;
        }
        if (event.key !== " " && event.key !== "Enter") return;
        event.preventDefault();
        const day = getDay(item.date)!;
        setActiveMove({ itemId: item.id, keyboard: true, target: { resourceId: item.resourceId, day } });
        setAnnouncement(`Picked up ${item.label ?? item.id}. Use arrow keys to choose a cell, Enter to drop, Escape to cancel.`);
        return;
      }
      if (!activeMove.keyboard || activeMove.itemId !== item.id) return;
      if (event.key === "Escape") {
        event.preventDefault();
        setActiveMove(null);
        setAnnouncement("Move cancelled.");
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleMove(item.id, activeMove.target);
      } else if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
        event.preventDefault();
        const dayIndex = dayKeys.indexOf(activeMove.target.day);
        const nextDay = Math.max(0, Math.min(dayKeys.length - 1, dayIndex + (event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0)));
        const target = { resourceId: item.resourceId, day: dayKeys[nextDay] };
        setActiveMove({ ...activeMove, target });
        setAnnouncement(`Target ${target.day}, resource ${target.resourceId}.`);
      }
    };

    const interaction: ResourceSchedulerInteraction = {
      items,
      disabled,
      instructionsId,
      activeMove,
      draggedItemRef,
      cardRefs,
      setActiveMove,
      handleMove,
      handleKeyDown,
    };

    return (
      <DragDropProvider<MoveTarget>
        sensors={touchSensors}
        onBeforeDragStart={event => {
          const source = event.operation.source;
          const item = items.find(item => item.id === source?.id);
          if (disabled || activeMove || !item || item.draggable === false) event.preventDefault();
        }}
        onDragStart={event => {
          const source = event.operation.source;
          const item = items.find(item => item.id === source?.id);
          if (!item) return;
          setActiveMove({ itemId: item.id, keyboard: false, touch: true, target: { resourceId: item.resourceId, day: getDay(item.date)! } });
          setAnnouncement(`Picked up ${item.label ?? item.id}. Drag to another day and release to drop.`);
        }}
        onDragEnd={event => {
          const { source, target } = event.operation;
          setActiveMove(null);
          if (event.canceled || !source || !target) {
            setAnnouncement("Move cancelled.");
            return;
          }
          handleMove(source.id, target.data);
        }}
      >
        <div
          {...props}
          ref={ref}
          className={cn("mtx-relative mtx-overflow-auto mtx-border mtx-border-gray-200 mtx-bg-gray-0 mtx-text-sm mtx-text-text-500", className)}
          style={style}
        >
          <p id={instructionsId} className="mtx-sr-only">
            On touch devices, press and hold a card, then drag to another day and release. Use Tab or Up/Down to select a card. Press Space or Enter
            to pick it up, Left/Right to move, Enter to drop, or Escape to cancel.
          </p>
          <div aria-live="polite" className="mtx-sr-only">
            {announcement}
          </div>
          <div role="table" aria-label="Resource scheduler" style={{ minWidth: resourceColumnWidth + dayColumnWidth * days.length }}>
            <ResourceSchedulerHeader
              today={today}
              days={days}
              dayKeys={dayKeys}
              formatter={formatter}
              resourceHeading={resourceHeading}
              resourceColumnWidth={resourceColumnWidth}
              dayColumnWidth={dayColumnWidth}
              slotProps={slotProps}
            />
            {resources.map(resource => (
              <ResourceSchedulerRow
                today={today}
                renderCellButton={renderCellButton}
                showCellButton={showCellButton}
                key={`${typeof resource.id}:${resource.id}`}
                resource={resource}
                dayKeys={dayKeys}
                groupedItems={groupedItems}
                resourceColumnWidth={resourceColumnWidth}
                dayColumnWidth={dayColumnWidth}
                rowMinHeight={rowMinHeight}
                cardWidth={cardWidth}
                stackOffset={stackOffset}
                slotProps={slotProps}
                interaction={interaction}
              />
            ))}
          </div>
        </div>
        <DragOverlay dropAnimation={null}>
          {source => (
            <div
              aria-hidden="true"
              className={cn("mtx-pointer-events-none mtx-text-sm mtx-text-text-500", slotProps?.card?.className)}
              style={{ width: cardWidth, ...slotProps?.card?.style, margin: 0 }}
            >
              {items.find(item => item.id === source.id)?.content}
            </div>
          )}
        </DragOverlay>
      </DragDropProvider>
    );
  },
);

ResourceScheduler.displayName = "ResourceScheduler";

export {
  ResourceScheduler,
  type ResourceSchedulerProps,
  type ResourceSchedulerResource,
  type ResourceSchedulerItem,
  type ResourceSchedulerMove,
  type ResourceSchedulerCellContext,
};
