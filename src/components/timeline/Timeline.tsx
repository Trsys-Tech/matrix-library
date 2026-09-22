"use client";

import React, { useMemo } from "react";
import { cn } from "../../lib/utils";
import { Skeleton } from "../skeleton/Skeleton";

export type TimelineStatus = "pending" | "active" | "completed" | "error";

/** Describes one step in the timeline's primary path. */
export type TimelineItem = {
  /** Stable identifier for the step; branch origins reference this value. */
  id: string;
  /** Primary content displayed beside the step marker. */
  label: React.ReactNode;
  /** Optional content displayed above the step marker. */
  superTitle?: React.ReactNode;
  /** Optional secondary content displayed below the super title. */
  superSubtitle?: React.ReactNode;
  /** Optional supporting content displayed below the label. */
  subData?: React.ReactNode;
  /** Arbitrary content shown on the bottom row. */
  footer?: React.ReactNode;
  /** Lifecycle state used to determine the marker and connector appearance. */
  status?: TimelineStatus;
  /** Override the marker color (any CSS color). */
  color?: string;
  /** Override the incoming connector; false leaves it inactive. */
  connectorColor?: string | false;
  /** Localized status announcement, independent of the visible label. */
  statusLabel?: string;
};

/** Describes a secondary path that diverges from a primary timeline step. */
export type TimelineBranch = TimelineItem & {
  /** ID of the main step from which this branch diverges. */
  from: string;
  /** Branch paths are explicitly controlled, independently of main steps. */
  active?: boolean;
  /** Used for the activated branch path and endpoint. */
  activeColor?: string;
};

/** Configuration and content props for the Timeline component. */
export type TimelineProps = Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> & {
  /** Ordered steps in the timeline's primary path. */
  items: readonly TimelineItem[];
  /** Optional secondary paths that diverge from the primary path. */
  branches?: readonly TimelineBranch[];
  /** Optional heading rendered above the timeline. */
  title?: React.ReactNode;
  /** Shows a structure-preserving skeleton while timeline data is loading. */
  loading?: boolean;
  /** Visual scale of the timeline. */
  size?: "sm" | "md" | "lg";
  /** Color used for active markers and connectors. */
  activeColor?: string;
  /** Color used for completed markers and connectors. */
  completedColor?: string;
  /** Color used for error markers and active branches by default. */
  errorColor?: string;
  /** Color used for pending markers and inactive connectors. */
  inactiveColor?: string;
  /** Minimum column width in pixels; narrower containers scroll horizontally. */
  minItemWidth?: number;
};

type TimelineSize = NonNullable<TimelineProps["size"]>;

const Marker: React.FC<{ item: TimelineItem; color?: string; size: TimelineSize }> = ({ item, color, size }) => {
  const status = item.status ?? "pending";
  return (
    <span
      className="mtx-block mtx-size-5 data-[size=sm]:mtx-size-4 data-[size=lg]:mtx-size-6"
      data-size={size}
      data-status={status}
      style={{ color }}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        className="mtx-block mtx-size-full mtx-fill-none mtx-stroke-current mtx-stroke-[1.25] mtx-stroke-linecap-round mtx-stroke-linejoin-round"
      >
        <circle cx="12" cy="12" r="10.5" className="mtx-fill-background" />
        {status === "completed" && <path d="m7 12 3 3 7-7" />}
        {status === "error" && <path d="m8 8 8 8m0-8-8 8" />}
        {status === "active" && <circle cx="12" cy="12" r="6" fill="currentColor" stroke="none" />}
      </svg>
      <span className="mtx-sr-only">{item.statusLabel ?? status}</span>
    </span>
  );
};

type VisibleTimelineBranch = { branch: TimelineBranch; index: number };

const TimelineSkeleton: React.FC<{
  items: readonly TimelineItem[];
  visibleBranches: readonly VisibleTimelineBranch[];
  superRow: number;
  markerRow: number;
  size: TimelineSize;
}> = ({ items, visibleBranches, superRow, markerRow, size }) => {
  const pathStart = useMemo(() => {
    if (size === "sm") return "M1";
    if (size === "lg") return "M3";
    return "M2";
  }, [size]);

  return (
    <>
      {items.map((item, index) => (
        <li
          key={`skeleton-item-${item.id}`}
          className="mtx-relative mtx-grid mtx-min-w-0 mtx-row-span-full mtx-grid-rows-[subgrid]"
          style={{ gridColumn: index + 1 }}
          aria-hidden="true"
          data-slot="timeline-skeleton-item"
        >
          <div className="mtx-min-h-8 mtx-self-end mtx-pb-2 mtx-pt-1 mtx-pr-3" style={{ gridRow: superRow }}>
            <Skeleton aria-hidden="true" className="mtx-h-3 mtx-w-14" />
            <Skeleton aria-hidden="true" className="mtx-h-2 mtx-w-16 mtx-mt-1" />
          </div>
          {index > 0 && (
            <span
              className="mtx-absolute mtx-top-2.5 group-data-[size=sm]:mtx-top-2 group-data-[size=lg]:mtx-top-3 mtx-w-[calc(100%-20px)] mtx-left-[calc(-100%+20px)] group-data-[size=sm]:mtx-w-[calc(100%-16px)] group-data-[size=sm]:mtx-left-[calc(-100%+16px)] group-data-[size=lg]:mtx-w-[calc(100%-24px)] group-data-[size=lg]:mtx-left-[calc(-100%+24px)] mtx-z-10 mtx-h-0.5 mtx-bg-primary/10 mtx-animate-pulse"
              style={{ gridRow: markerRow }}
            />
          )}
          <Skeleton
            className="mtx-z-20 mtx-rounded-full mtx-size-5 group-data-[size=sm]:mtx-size-4 group-data-[size=lg]:mtx-size-6"
            style={{ gridRow: markerRow }}
            aria-hidden="true"
          />
          <div className="mtx-pt-1 mtx-pr-3" style={{ gridRow: markerRow + 1 }}>
            <Skeleton aria-hidden="true" className="mtx-h-2 mtx-w-16" />
            <Skeleton aria-hidden="true" className="mtx-h-2 mtx-w-12 mtx-mt-1" />
          </div>
          <div className="mtx-pr-3 mtx-pt-5" style={{ gridRow: markerRow + 2 }}>
            <Skeleton aria-hidden="true" className="mtx-h-2 mtx-w-16" />
          </div>
        </li>
      ))}
      {visibleBranches.map(({ branch, index }, lane) => (
        <li
          key={`skeleton-branch-${branch.id}`}
          className="mtx-pointer-events-none mtx-grid mtx-min-w-0 mtx-row-span-full mtx-grid-cols-[subgrid] mtx-grid-rows-[subgrid]"
          style={{ gridColumn: `${index + 1} / -1` }}
          aria-hidden="true"
          data-slot="timeline-skeleton-branch"
        >
          <div className="mtx-col-[-2_/_-1] mtx-self-end mtx-pb-2" style={{ gridRow: lane * 2 + 1 }}>
            <Skeleton aria-hidden="true" className="mtx-h-3 mtx-w-14" />
            <Skeleton aria-hidden="true" className="mtx-h-2 mtx-w-16 mtx-mt-1" />
            <Skeleton aria-hidden="true" className="mtx-h-2 mtx-w-16 mtx-mt-1" />
          </div>
          <div
            className="mtx-relative mtx-col-[1_/_-1] mtx-mb-[9px] group-data-[size=sm]:mtx-mb-[7px] group-data-[size=lg]:mtx-mb-[11px] mtx-ml-3 mtx-mt-2.5 group-data-[size=sm]:mtx-mt-2 group-data-[size=lg]:mtx-mt-3 mtx-overflow-visible mtx-fill-none mtx-stroke-2 mtx-stroke-current mtx-z-[-1]"
            style={{
              gridRow: `${lane * 2 + 2} / ${markerRow + 1}`,
              width: `calc(100% - 100% / ${items.length - index})`,
              color: "oklch(var(--mtx-primary) / 0.1)",
            }}
          >
            <svg focusable="false" viewBox="0 0 100 100" preserveAspectRatio="none" className="mtx-absolute mtx-size-full mtx-overflow-visible">
              <path
                d={`${pathStart} 100 H${45 / (items.length - index - 1)} L${80 / (items.length - index - 1)} 0 H97`}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
          <Skeleton
            className="mtx-col-[-2_/_-1] mtx-z-[2] mtx-rounded-full mtx-size-5 group-data-[size=sm]:mtx-size-4 group-data-[size=lg]:mtx-size-6"
            style={{ gridRow: lane * 2 + 2 }}
            aria-hidden="true"
          />
        </li>
      ))}
    </>
  );
};

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  (
    {
      items,
      branches = [],
      title,
      loading = false,
      activeColor,
      completedColor,
      errorColor,
      inactiveColor,
      minItemWidth = 112,
      size = "md",
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const titleId = React.useId();
    // Invalid origins and branches from the final step have no horizontal span.
    const visibleBranches = useMemo(
      () =>
        branches.flatMap(branch => {
          const index = items.findIndex(item => item.id === branch.from);
          return index >= 0 && index < items.length - 1 ? [{ branch, index }] : [];
        }),
      [branches, items],
    );

    const superRow = visibleBranches.length * 2 + 1;
    const markerRow = superRow + 1;
    const colorFor = (item: TimelineItem) => item.color ?? `var(--timeline-${item.status ?? "pending"})`;
    const variables = {
      "--timeline-active": activeColor ?? "oklch(var(--mtx-primary))",
      "--timeline-completed": completedColor ?? "oklch(var(--mtx-success))",
      "--timeline-error": errorColor ?? "oklch(var(--mtx-danger))",
      "--timeline-pending": inactiveColor ?? "oklch(var(--mtx-gray-400))",
      ...style,
    } as React.CSSProperties;

    const gridTemplateRows = useMemo(() => {
      const visibleBranchesLength = visibleBranches.length;
      switch (size) {
        case "sm":
          return `${"auto 16px ".repeat(visibleBranchesLength)}auto 16px auto auto`;
        case "lg":
          return `${"auto 24px ".repeat(visibleBranchesLength)}auto 24px auto auto`;
        default:
          return `${"auto 20px ".repeat(visibleBranchesLength)}auto 20px auto auto`;
      }
    }, [size, visibleBranches.length]);

    return (
      <div
        {...props}
        ref={ref}
        className={cn("mtx-group mtx-text-foreground mtx-text-xs data-[size=sm]:mtx-text-ss data-[size=lg]:mtx-text-sm", className)}
        data-size={size}
        style={variables}
        aria-busy={loading || undefined}
      >
        {title != null && (
          <div id={titleId} className="mtx-mb-4 mtx-text-sm group-data-[size=sm]:mtx-text-xs group-data-[size=lg]:mtx-text-lg mtx-font-bold">
            {title}
          </div>
        )}
        <div
          className="mtx-overflow-x-auto mtx-p-0.5 focus-visible:mtx-outline-2 focus-visible:mtx-outline-offset-2 focus-visible:mtx-outline-[var(--timeline-active)]"
          role="region"
          aria-label="Timeline"
          tabIndex={0}
        >
          <ol
            className="mtx-m-0 mtx-grid mtx-list-none mtx-isolate mtx-p-0"
            aria-labelledby={title != null ? titleId : undefined}
            aria-label={title == null ? "Timeline steps" : undefined}
            data-loading={loading || undefined}
            style={{
              gridTemplateColumns: `repeat(${Math.max(1, items.length)}, minmax(0, 1fr))`,
              gridTemplateRows: gridTemplateRows,
              minWidth: items.length * (Number.isFinite(minItemWidth) ? Math.max(48, minItemWidth) : 112),
            }}
          >
            {loading && <TimelineSkeleton items={items} visibleBranches={visibleBranches} superRow={superRow} markerRow={markerRow} size={size} />}
            {!loading &&
              items.map((item, index) => {
                const previous = items[index - 1];
                const incoming =
                  item.connectorColor === false
                    ? undefined
                    : (item.connectorColor ??
                      (previous?.status === "completed" && item.status !== "pending" && item.status !== undefined ? colorFor(previous) : undefined));
                return (
                  <li
                    key={item.id}
                    className="mtx-relative mtx-grid mtx-min-w-0 mtx-row-span-full mtx-grid-rows-[subgrid] "
                    style={{ gridColumn: index + 1 }}
                    aria-current={item.status === "active" ? "step" : undefined}
                  >
                    <div
                      className="mtx-min-h-8 mtx-break-words mtx-self-end mtx-pb-2 mtx-mt-1 mtx-pr-3 mtx-text-ss group-data-[size=sm]:mtx-text-[0.5rem] group-data-[size=sm]:mtx-leading-3 group-data-[size=lg]:mtx-text-xs mtx-text-muted-foreground empty:mtx-p-0"
                      style={{ gridRow: superRow }}
                    >
                      {item.superTitle != null && <div>{item.superTitle}</div>}
                      {item.superSubtitle != null && <div className="mtx-font-semibold">{item.superSubtitle}</div>}
                    </div>
                    {index > 0 && (
                      <span
                        aria-hidden="true"
                        className="mtx-absolute mtx-top-2.5 group-data-[size=sm]:mtx-top-2 group-data-[size=lg]:mtx-top-3 mtx-left-[calc(-100%+12px)] mtx-z-10 mtx-h-0.5 mtx-w-full mtx-bg-[var(--timeline-pending)]"
                        style={{ gridRow: markerRow, backgroundColor: incoming }}
                      />
                    )}
                    <div
                      className="mtx-z-20 mtx-size-5 group-data-[size=sm]:mtx-size-4 group-data-[size=lg]:mtx-size-6"
                      style={{ gridRow: markerRow }}
                    >
                      <Marker item={item} color={colorFor(item)} size={size} />
                    </div>
                    <div className="mtx-break-words mtx-pt-1 mtx-pr-3 mtx-leading-[1.4]" style={{ gridRow: markerRow + 1 }}>
                      <div className={cn("mtx-font-medium", (item.status ?? "pending") === "pending" && "mtx-text-text-400")}>{item.label}</div>
                      {item.subData != null && (
                        <div className="mtx-mt-0.5 mtx-text-ss group-data-[size=sm]:mtx-text-[0.5rem] group-data-[size=sm]:mtx-leading-3 group-data-[size=lg]:mtx-text-xs">
                          {item.subData}
                        </div>
                      )}
                    </div>
                    <div
                      className="mtx-break-words mtx-pr-3 mtx-pt-5 mtx-text-ss group-data-[size=sm]:mtx-text-[0.5rem] group-data-[size=sm]:mtx-leading-3 group-data-[size=lg]:mtx-text-xs mtx-font-medium mtx-text-muted-foreground empty:mtx-p-0"
                      style={{ gridRow: markerRow + 2 }}
                    >
                      {item.footer}
                    </div>
                  </li>
                );
              })}
            {!loading &&
              visibleBranches.map(({ branch, index }, lane) => {
                const branchColor = branch.active
                  ? (branch.activeColor ?? branch.color ?? errorColor ?? "var(--timeline-error)")
                  : "var(--timeline-pending)";
                return (
                  <li
                    key={`branch-${branch.id}`}
                    className={cn(
                      "mtx-pointer-events-none mtx-grid mtx-min-w-0 mtx-row-span-full mtx-grid-cols-[subgrid] mtx-grid-rows-[subgrid]",
                      branch.active && "mtx-z-10",
                    )}
                    data-active={branch.active || undefined}
                    style={{ gridColumn: `${index + 1} / -1` }}
                    aria-current={branch.status === "active" ? "step" : undefined}
                  >
                    <span className="mtx-sr-only">Branch from {items[index].label}: </span>
                    <div
                      className="mtx-pointer-events-auto mtx-col-[-2_/_-1] mtx-self-end mtx-break-words mtx-pb-2"
                      style={{ gridRow: lane * 2 + 1, color: branch.active ? branchColor : undefined }}
                    >
                      {branch.superTitle != null && (
                        <div className="mtx-break-words mtx-text-ss group-data-[size=sm]:mtx-text-[0.5rem] group-data-[size=sm]:mtx-leading-3 group-data-[size=lg]:mtx-text-xs mtx-text-muted-foreground">
                          {branch.superTitle}
                        </div>
                      )}
                      {branch.superSubtitle != null && (
                        <div className="mtx-break-words mtx-pb-2 mtx-pr-3 mtx-text-ss group-data-[size=sm]:mtx-text-[0.5rem] group-data-[size=sm]:mtx-leading-3 group-data-[size=lg]:mtx-text-xs mtx-font-semibold mtx-text-muted-foreground">
                          {branch.superSubtitle}
                        </div>
                      )}
                      <div className={cn("mtx-font-medium", (branch.status ?? "pending") === "pending" && "mtx-text-text-400")}>{branch.label}</div>
                      {branch.subData != null && (
                        <div className="mtx-mt-0.5 mtx-text-ss group-data-[size=sm]:mtx-text-[0.5rem] group-data-[size=sm]:mtx-leading-3 group-data-[size=lg]:mtx-text-xs">
                          {branch.subData}
                        </div>
                      )}
                      {branch.footer != null && (
                        <div className="mtx-break-words mtx-pr-3 mtx-pt-1 mtx-text-ss group-data-[size=sm]:mtx-text-[0.5rem] group-data-[size=sm]:mtx-leading-3 group-data-[size=lg]:mtx-text-xs mtx-font-bold mtx-text-muted-foreground">
                          {branch.footer}
                        </div>
                      )}
                    </div>
                    <div
                      className="mtx-relative mtx-col-[1_/_-1] mtx-mb-[9px] group-data-[size=sm]:mtx-mb-[7px] group-data-[size=lg]:mtx-mb-[11px] mtx-ml-3 mtx-mt-2.5 group-data-[size=sm]:mtx-mt-2 group-data-[size=lg]:mtx-mt-3 mtx-overflow-visible mtx-fill-none mtx-stroke-2 mtx-stroke-current mtx-z-[-1]"
                      aria-hidden="true"
                      style={{
                        gridRow: `${lane * 2 + 2} / ${markerRow + 1}`,
                        width: `calc(100% - 100% / ${items.length - index})`,
                        color: branchColor,
                      }}
                    >
                      <svg
                        focusable="false"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        className="mtx-absolute mtx-size-full mtx-overflow-visible"
                      >
                        <path
                          d={`M0 100 H${45 / (items.length - index - 1)} L${80 / (items.length - index - 1)} 0 H100`}
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </div>
                    <div
                      className="mtx-col-[-2_/_-1] mtx-z-[2] mtx-size-5 group-data-[size=sm]:mtx-size-4 group-data-[size=lg]:mtx-size-6"
                      style={{ gridRow: lane * 2 + 2 }}
                    >
                      <Marker item={branch} color={branchColor} size={size} />
                    </div>
                  </li>
                );
              })}
          </ol>
        </div>
      </div>
    );
  },
);
Timeline.displayName = "Timeline";

export { Timeline };
