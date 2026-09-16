"use client";

import React from "react";
import { Plus } from "@trsys-tech/matrix-icons";

import { cn } from "../../lib/utils";
import { GanttToolbar } from "./GanttToolbar";
import {
  clampProgress,
  createTimeline,
  formatDateRange as defaultFormatDateRange,
  getBarPosition,
  getMarkerPosition,
  getTimelineRange,
  includesDate,
  toDate,
  type TimelineGroup,
  type TimelineInterval,
} from "./gantt-chart.utils";
import type {
  GanttDate,
  GanttItem,
  GanttMarker,
  GanttRenderBarContext,
  GanttRenderItemContext,
  GanttView,
  GanttViewLabels,
} from "./gantt-chart.types";

const DEFAULT_VIEW_LABELS: GanttViewLabels = {
  week: "Weeks",
  month: "Month",
  quarter: "Quarter",
};

const DEFAULT_CELL_WIDTHS: Record<GanttView, number> = {
  week: 72,
  month: 120,
  quarter: 220,
};

type GanttChartProps = Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & {
  /** Rows displayed by the chart. */
  items: GanttItem[];
  /** Controlled timeline scale. */
  view?: GanttView;
  /** Initial scale when the chart is uncontrolled. */
  defaultView?: GanttView;
  /** Scales available in the toolbar. */
  views?: GanttView[];
  /** Labels shown for the available scales. */
  viewLabels?: Partial<GanttViewLabels>;
  /** Called after the user selects a scale. */
  onViewChange?: (view: GanttView) => void;
  /** Optional beginning of the visible timeline. */
  startDate?: GanttDate;
  /** Optional end of the visible timeline. */
  endDate?: GanttDate;
  /** Dated vertical markers drawn over the timeline rows. */
  markers?: GanttMarker[];
  /** Date whose period is highlighted. Defaults to today; pass null to disable. */
  highlightedDate?: GanttDate | null;
  /** Locale used by timeline and range labels. */
  locale?: string;
  /** Width of the sticky row-name column in pixels. */
  nameColumnWidth?: number;
  /** Height of each item row in pixels. */
  rowHeight?: number;
  /** Minimum width of an individual timeline cell, by scale. */
  cellWidths?: Partial<Record<GanttView, number>>;
  /** Header shown above item names. */
  nameColumnHeader?: React.ReactNode;
  /** Label used for the add-row action. */
  addItemLabel?: React.ReactNode;
  /** Shows the add-row action when provided. */
  onAddItem?: () => void;
  /** Shows the refresh action when provided. */
  onRefresh?: () => void;
  /** Shows the native fullscreen action when supported. */
  showFullscreen?: boolean;
  /** Content inserted before the default toolbar actions. */
  toolbarActions?: React.ReactNode;
  /** Replaces the default item-name and date-range content. */
  renderItem?: (context: GanttRenderItemContext) => React.ReactNode;
  /** Replaces the default progress label inside a bar. */
  renderBar?: (context: GanttRenderBarContext) => React.ReactNode;
  /** Replaces the compact date range shown alongside each item. */
  formatDateRange?: (item: GanttItem) => string;
  /** Accessible label for the chart. */
  "aria-label"?: string;
};

type TimelineGridProps = {
  intervals: TimelineInterval[];
  highlightedDate: Date | null;
};

type PositionedGanttMarker = {
  marker: GanttMarker;
  left: number;
};

type TimelineMarkersProps = {
  markers: PositionedGanttMarker[];
  showLabels?: boolean;
};

const MARKER_LABEL_GAP = 8;
const MARKER_LABEL_OFFSET = 12;
const MARKER_LABEL_TOP = 4;
const MARKER_LABEL_LANE_HEIGHT = 30;

const TimelineMarkers: React.FC<TimelineMarkersProps> = ({ markers, showLabels = false }) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const labelRefs = React.useRef(new Map<string, HTMLDivElement>());
  const diamondRefs = React.useRef(new Map<string, HTMLDivElement>());

  React.useEffect(() => {
    const container = containerRef.current;

    if (!container || !showLabels) return;

    const positionLabels = () => {
      const containerWidth = container.clientWidth;
      const candidates = markers.flatMap(({ marker, left }) => {
        const key = String(marker.id);
        const label = labelRefs.current.get(key);

        if (!label) return [];

        const markerLeft = (left / 100) * containerWidth;
        const labelWidth = label.offsetWidth;
        let labelLeft = markerLeft + MARKER_LABEL_OFFSET;

        if (labelLeft + labelWidth > containerWidth - MARKER_LABEL_GAP) {
          labelLeft = markerLeft - labelWidth - MARKER_LABEL_OFFSET;
        }

        labelLeft = Math.max(MARKER_LABEL_GAP, Math.min(labelLeft, containerWidth - labelWidth - MARKER_LABEL_GAP));

        return [{ key, label, labelLeft, labelRight: labelLeft + labelWidth }];
      });

      const laneRightEdges: number[] = [];

      candidates
        .sort((first, second) => first.labelLeft - second.labelLeft)
        .forEach(candidate => {
          let lane = laneRightEdges.findIndex(rightEdge => rightEdge + MARKER_LABEL_GAP <= candidate.labelLeft);

          if (lane === -1) {
            lane = laneRightEdges.length;
          }

          laneRightEdges[lane] = candidate.labelRight;
          const top = MARKER_LABEL_TOP + lane * MARKER_LABEL_LANE_HEIGHT;

          candidate.label.style.left = `${candidate.labelLeft}px`;
          candidate.label.style.top = `${top}px`;

          const diamond = diamondRefs.current.get(candidate.key);

          if (diamond) {
            diamond.style.top = `${top + 8}px`;
          }
        });
    };

    positionLabels();

    if (typeof ResizeObserver === "undefined") return;

    const resizeObserver = new ResizeObserver(positionLabels);

    resizeObserver.observe(container);
    labelRefs.current.forEach(label => resizeObserver.observe(label));

    return () => resizeObserver.disconnect();
  }, [markers, showLabels]);

  return (
    <div ref={containerRef} className="mtx-pointer-events-none mtx-absolute mtx-inset-0 mtx-z-20">
      {markers.map(({ marker, left }) => {
        const key = String(marker.id);

        return (
          <React.Fragment key={marker.id}>
            <div
              className={cn("mtx-absolute mtx-inset-y-0 mtx-w-0.5 -mtx-translate-x-1/2", marker.lineClassName)}
              style={{ left: `${left}%`, backgroundColor: marker.color }}
              aria-hidden="true"
            />
            {showLabels ? (
              <>
                <div
                  ref={element => {
                    if (element) diamondRefs.current.set(key, element);
                    else diamondRefs.current.delete(key);
                  }}
                  className={cn(
                    "mtx-absolute mtx-z-20 mtx-h-2 mtx-w-2 -mtx-translate-x-1/2 mtx-rotate-45 mtx-border mtx-border-gray-0",
                    marker.diamondClassName,
                  )}
                  style={{ left: `${left}%`, top: MARKER_LABEL_TOP + 8, backgroundColor: marker.color }}
                  aria-hidden="true"
                />
                <div
                  ref={element => {
                    if (element) labelRefs.current.set(key, element);
                    else labelRefs.current.delete(key);
                  }}
                  className={cn(
                    "mtx-absolute mtx-z-20 mtx-max-w-48 mtx-truncate mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-bg-gray-0 mtx-px-2 mtx-py-1 mtx-text-xs mtx-font-semibold mtx-shadow-card",
                    marker.labelClassName,
                  )}
                  style={{ left: `calc(${left}% + ${MARKER_LABEL_OFFSET}px)`, top: MARKER_LABEL_TOP, borderColor: marker.color, color: marker.color }}
                  title={typeof marker.label === "string" ? marker.label : undefined}
                  role="note"
                >
                  {marker.label}
                </div>
              </>
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const TimelineGrid: React.FC<TimelineGridProps> = ({ intervals, highlightedDate }) => (
  <div
    aria-hidden="true"
    className="mtx-pointer-events-none mtx-absolute mtx-inset-0 mtx-grid"
    style={{ gridTemplateColumns: `repeat(${intervals.length}, minmax(0, 1fr))` }}
  >
    {intervals.map((interval, index) => (
      <div
        key={interval.start.toISOString()}
        className={cn(
          "mtx-border-l mtx-border-gray-200",
          index === intervals.length - 1 && "mtx-border-r",
          includesDate(interval, highlightedDate) && "mtx-bg-gray-50",
        )}
      />
    ))}
  </div>
);

type TimelineHeaderProps = {
  intervals: TimelineInterval[];
  groups: TimelineGroup[];
  highlightedDate: Date | null;
  nameColumnHeader: React.ReactNode;
  nameColumnWidth: number;
};

const TimelineHeader: React.FC<TimelineHeaderProps> = ({ intervals, groups, highlightedDate, nameColumnHeader, nameColumnWidth }) => (
  <div className="mtx-bg-primary-50" role="rowgroup">
    <div
      className="mtx-grid mtx-h-9 mtx-border-b mtx-border-gray-200"
      style={{ gridTemplateColumns: `${nameColumnWidth}px repeat(${intervals.length}, minmax(0, 1fr))` }}
      role="row"
    >
      <div
        className="mtx-sticky mtx-left-0 mtx-z-20 mtx-flex mtx-items-center mtx-border-b mtx-border-r mtx-border-gray-200 mtx-bg-primary-50 mtx-px-4 mtx-text-sm mtx-font-semibold mtx-text-text-500"
        style={{ gridColumn: 1, height: 80 }}
        role="columnheader"
        aria-colindex={1}
        aria-rowspan={2}
      >
        {nameColumnHeader}
      </div>
      {groups.map(group => (
        <div
          key={group.key}
          className="mtx-flex mtx-items-start mtx-justify-center mtx-py-1.5 mtx-border-l mtx-border-gray-200 mtx-text-sm mtx-font-medium mtx-text-text-500"
          style={{ gridColumn: `${group.startIndex + 2} / span ${group.intervalCount}` }}
          role="columnheader"
          aria-colindex={group.startIndex + 2}
          aria-colspan={group.intervalCount}
        >
          {group.label}
        </div>
      ))}
    </div>
    <div className="mtx-grid mtx-h-11" style={{ gridTemplateColumns: `${nameColumnWidth}px repeat(${intervals.length}, minmax(0, 1fr))` }} role="row">
      <div aria-hidden="true" />
      {intervals.map((interval, index) => (
        <div
          key={interval.start.toISOString()}
          className={cn(
            "mtx-flex mtx-items-center mtx-justify-center mtx-border-l mtx-border-gray-200 mtx-px-2 mtx-text-center mtx-text-xs mtx-font-medium mtx-text-text-500",
            includesDate(interval, highlightedDate) && "mtx-bg-primary-100 mtx-font-semibold",
          )}
          role="columnheader"
          aria-colindex={index + 2}
        >
          {interval.label}
        </div>
      ))}
    </div>
  </div>
);

const GanttChart = React.forwardRef<HTMLDivElement, GanttChartProps>(
  (
    {
      items,
      view,
      defaultView = "quarter",
      views = ["week", "month", "quarter"],
      viewLabels,
      onViewChange,
      startDate,
      endDate,
      markers = [],
      highlightedDate,
      locale = "en-US",
      nameColumnWidth = 320,
      rowHeight = 64,
      cellWidths,
      nameColumnHeader = "Name",
      addItemLabel = "New item",
      onAddItem,
      onRefresh,
      showFullscreen = true,
      toolbarActions,
      renderItem,
      renderBar,
      formatDateRange,
      className,
      "aria-label": ariaLabel = "Gantt chart",
      ...props
    },
    ref,
  ) => {
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const [fullscreenSupported, setFullscreenSupported] = React.useState(false);
    const [uncontrolledView, setUncontrolledView] = React.useState(defaultView);
    const activeView = view ?? uncontrolledView;
    const range = React.useMemo(() => getTimelineRange(items, startDate, endDate), [endDate, items, startDate]);
    const timeline = React.useMemo(() => createTimeline(range.start, range.end, activeView, locale), [activeView, locale, range.end, range.start]);
    const activeHighlightedDate = React.useMemo(() => (highlightedDate === null ? null : toDate(highlightedDate ?? new Date())), [highlightedDate]);
    const activeViewLabels = { ...DEFAULT_VIEW_LABELS, ...viewLabels };
    const positionedMarkers = React.useMemo(
      () =>
        markers.flatMap(marker => {
          const markerDate = toDate(marker.date);
          const left = markerDate ? getMarkerPosition(markerDate, timeline.intervals) : null;

          return left === null ? [] : [{ marker, left }];
        }),
      [markers, timeline.intervals],
    );
    const cellWidth = cellWidths?.[activeView] ?? DEFAULT_CELL_WIDTHS[activeView];
    const timelineWidth = timeline.intervals.length * cellWidth;
    const chartWidth = nameColumnWidth + timelineWidth;

    const handleRootRef = React.useCallback((element: HTMLDivElement | null) => {
      rootRef.current = element;

      if (element && typeof document !== "undefined") {
        setFullscreenSupported(
          document.fullscreenEnabled !== false && typeof element.requestFullscreen === "function" && typeof document.exitFullscreen === "function",
        );
      }
    }, []);

    React.useImperativeHandle(ref, () => rootRef.current as HTMLDivElement);

    const handleViewChange = (nextView: GanttView) => {
      if (view === undefined) {
        setUncontrolledView(nextView);
      }
      onViewChange?.(nextView);
    };

    const handleToggleFullscreen = () => {
      if (!rootRef.current || typeof document === "undefined") return;

      if (document.fullscreenElement === rootRef.current) {
        void document.exitFullscreen().catch(() => undefined);
      } else {
        void rootRef.current.requestFullscreen().catch(() => undefined);
      }
    };

    return (
      <div
        ref={handleRootRef}
        className={cn("mtx-overflow-hidden mtx-rounded-lg mtx-border mtx-border-gray-200 mtx-bg-gray-0 mtx-[font-family:DMSans]", className)}
        aria-label={ariaLabel}
        {...props}
      >
        <GanttToolbar
          activeView={activeView}
          views={views}
          viewLabels={activeViewLabels}
          onViewChange={handleViewChange}
          onRefresh={onRefresh}
          onToggleFullscreen={showFullscreen && fullscreenSupported ? handleToggleFullscreen : undefined}
          toolbarActions={toolbarActions}
        />

        <div className="mtx-overflow-auto">
          <div style={{ minWidth: chartWidth }} role="table" aria-label={ariaLabel}>
            <TimelineHeader
              intervals={timeline.intervals}
              groups={timeline.groups}
              highlightedDate={activeHighlightedDate}
              nameColumnHeader={nameColumnHeader}
              nameColumnWidth={nameColumnWidth}
            />

            {onAddItem ? (
              <div className="mtx-grid" style={{ gridTemplateColumns: `${nameColumnWidth}px minmax(${timelineWidth}px, 1fr)` }} role="row">
                <div
                  className="mtx-sticky mtx-left-0 mtx-z-30 mtx-flex mtx-items-center mtx-border-b mtx-border-r mtx-border-gray-200 mtx-bg-gray-0 mtx-px-4"
                  style={{ height: rowHeight }}
                  role="cell"
                >
                  <button
                    type="button"
                    className="mtx-inline-flex mtx-items-center mtx-gap-2 mtx-text-sm mtx-font-medium mtx-text-primary hover:mtx-text-primary-700 focus-visible:mtx-outline-none focus-visible:mtx-ring focus-visible:mtx-ring-primary-300"
                    onClick={onAddItem}
                  >
                    <Plus className="mtx-h-4 mtx-w-4" />
                    {addItemLabel}
                  </button>
                </div>
                <div className="mtx-relative mtx-border-b mtx-border-gray-200" style={{ height: rowHeight }} role="cell">
                  <TimelineGrid intervals={timeline.intervals} highlightedDate={activeHighlightedDate} />
                  <TimelineMarkers markers={positionedMarkers} showLabels />
                </div>
              </div>
            ) : null}

            <div role="rowgroup">
              {items.map((item, itemIndex) => {
                const progress = clampProgress(item.progress);
                const barPosition = getBarPosition(item, timeline.intervals);
                const formattedDateRange = formatDateRange?.(item) ?? defaultFormatDateRange(item, locale);

                return (
                  <div
                    key={item.id}
                    className="mtx-grid"
                    style={{ gridTemplateColumns: `${nameColumnWidth}px minmax(${timelineWidth}px, 1fr)` }}
                    role="row"
                  >
                    <div
                      className="mtx-sticky mtx-left-0 mtx-z-30 mtx-flex mtx-items-center mtx-border-b mtx-border-r mtx-border-gray-200 mtx-bg-gray-0 mtx-px-4"
                      style={{ height: rowHeight }}
                      role="rowheader"
                    >
                      {renderItem ? (
                        renderItem({ item, formattedDateRange })
                      ) : (
                        <div className="mtx-flex mtx-w-full mtx-min-w-0 mtx-items-center mtx-justify-between mtx-gap-3">
                          <span className="mtx-truncate mtx-text-sm mtx-font-semibold mtx-text-text-500">{item.name}</span>
                          <span className="mtx-shrink-0 mtx-text-xs mtx-text-text-300">{formattedDateRange}</span>
                        </div>
                      )}
                    </div>

                    <div className="mtx-relative mtx-border-b mtx-border-gray-200" style={{ height: rowHeight }} role="cell">
                      <TimelineGrid intervals={timeline.intervals} highlightedDate={activeHighlightedDate} />
                      <TimelineMarkers markers={positionedMarkers} showLabels={!onAddItem && itemIndex === 0} />
                      {barPosition && barPosition.width > 0 ? (
                        <div
                          className={cn(
                            "mtx-absolute mtx-top-1/2 mtx-z-10 mtx-h-10 -mtx-translate-y-1/2 mtx-overflow-hidden mtx-rounded mtx-border-r-2 mtx-border-secondary-800 mtx-bg-secondary-200",
                            item.barClassName,
                          )}
                          style={{ left: `${barPosition.left}%`, width: `${barPosition.width}%` }}
                          title={`${formattedDateRange}, ${progress}% complete`}
                          role="progressbar"
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={progress}
                        >
                          <div
                            className={cn("mtx-h-full mtx-bg-secondary-500", item.progressClassName)}
                            style={{ width: `${progress}%` }}
                            aria-hidden="true"
                          />
                          <div
                            className="mtx-absolute mtx-top-1/2 mtx-min-w-max -mtx-translate-x-1/2 -mtx-translate-y-1/2 mtx-text-center mtx-text-xs mtx-leading-4 mtx-text-text-600"
                            style={{ left: `clamp(3rem, ${progress / 2}%, calc(100% - 3rem))` }}
                          >
                            {renderBar ? (
                              renderBar({ item, progress })
                            ) : (
                              <>
                                <span className="mtx-block">Progress</span>
                                <strong className="mtx-block mtx-text-sm">{progress}%</strong>
                              </>
                            )}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

GanttChart.displayName = "GanttChart";

export {
  GanttChart,
  type GanttChartProps,
  type GanttDate,
  type GanttItem,
  type GanttMarker,
  type GanttRenderBarContext,
  type GanttRenderItemContext,
  type GanttView,
};
