"use client";

import React from "react";
import { cn } from "../../lib/utils";

export type TimelineStatus = "pending" | "active" | "completed" | "error";

export interface TimelineItem {
  id: string;
  label: React.ReactNode;
  superTitle?: React.ReactNode;
  superSubtitle?: React.ReactNode;
  subData?: React.ReactNode;
  /** Arbitrary content shown on the bottom row. */
  footer?: React.ReactNode;
  status?: TimelineStatus;
  /** Override the marker color (any CSS color). */
  color?: string;
  /** Override the incoming connector; false leaves it inactive. */
  connectorColor?: string | false;
  /** Localized status announcement, independent of the visible label. */
  statusLabel?: string;
}

export interface TimelineBranch extends TimelineItem {
  /** ID of the main step from which this branch diverges. */
  from: string;
  /** Branch paths are explicitly controlled, independently of main steps. */
  active?: boolean;
  /** Used for the activated branch path and endpoint. */
  activeColor?: string;
}

export interface TimelineProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> {
  items: readonly TimelineItem[];
  branches?: readonly TimelineBranch[];
  title?: React.ReactNode;
  activeColor?: string;
  completedColor?: string;
  errorColor?: string;
  inactiveColor?: string;
  /** Minimum column width in pixels; narrower containers scroll horizontally. */
  minItemWidth?: number;
}

function Marker({ item, color }: { item: TimelineItem; color?: string }) {
  const status = item.status ?? "pending";
  return (
    <span className="mtx-block mtx-size-6" data-status={status} style={{ color }}>
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
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ items, branches = [], title, activeColor, completedColor, errorColor, inactiveColor, minItemWidth = 112, className, style, ...props }, ref) => {
    const titleId = React.useId();
    // Invalid origins and branches from the final step have no horizontal span.
    const visibleBranches = branches.flatMap(branch => {
      const index = items.findIndex(item => item.id === branch.from);
      return index >= 0 && index < items.length - 1 ? [{ branch, index }] : [];
    });
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

    return (
      <div {...props} ref={ref} className={cn("mtx-text-foreground mtx-text-sm", className)} style={variables}>
        {title != null && (
          <div id={titleId} className="mtx-mb-5 mtx-text-base mtx-font-semibold">
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
            style={{
              gridTemplateColumns: `repeat(${Math.max(1, items.length)}, minmax(0, 1fr))`,
              gridTemplateRows: `${"auto 24px ".repeat(visibleBranches.length)}auto 24px auto auto`,
              minWidth: items.length * (Number.isFinite(minItemWidth) ? Math.max(48, minItemWidth) : 112),
            }}
          >
            {items.map((item, index) => {
              const previous = items[index - 1];
              const incoming =
                item.connectorColor === false
                  ? undefined
                  : (item.connectorColor ??
                    (previous?.status === "completed" && item.status !== "pending" && item.status !== undefined ? colorFor(previous) : undefined));
              return (
                <li
                  key={item.id}
                  className="mtx-relative mtx-grid mtx-min-w-0 mtx-row-span-full mtx-grid-rows-[subgrid]"
                  style={{ gridColumn: index + 1 }}
                  aria-current={item.status === "active" ? "step" : undefined}
                >
                  <div
                    className="mtx-min-h-8 mtx-break-words mtx-self-end mtx-pb-2 mtx-pr-3 mtx-text-[10px] mtx-leading-3 mtx-text-muted-foreground empty:mtx-p-0"
                    style={{ gridRow: superRow }}
                  >
                    {item.superTitle != null && <div>{item.superTitle}</div>}
                    {item.superSubtitle != null && <div className="mtx-font-semibold">{item.superSubtitle}</div>}
                  </div>
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="mtx-absolute mtx-top-[11px] mtx-left-[calc(-100%+12px)] mtx-z-[-1] mtx-h-0.5 mtx-w-full mtx-bg-[var(--timeline-pending)]"
                      style={{ gridRow: markerRow, backgroundColor: incoming }}
                    />
                  )}
                  <div className="mtx-z-[2] mtx-size-6" style={{ gridRow: markerRow }}>
                    <Marker item={item} color={colorFor(item)} />
                  </div>
                  <div className="mtx-break-words mtx-pt-2.5 mtx-pr-3 mtx-leading-[1.4]" style={{ gridRow: markerRow + 1 }}>
                    <div className={cn((item.status ?? "pending") === "pending" && "mtx-text-text-400")}>{item.label}</div>
                    {item.subData != null && <div className="mtx-mt-0.5 mtx-text-xs">{item.subData}</div>}
                  </div>
                  <div
                    className="mtx-break-words mtx-pr-3 mtx-pt-5 mtx-text-[11px] mtx-text-muted-foreground empty:mtx-p-0"
                    style={{ gridRow: markerRow + 2 }}
                  >
                    {item.footer}
                  </div>
                </li>
              );
            })}
            {visibleBranches.map(({ branch, index }, lane) => {
              const branchColor = branch.active
                ? (branch.activeColor ?? branch.color ?? errorColor ?? "var(--timeline-error)")
                : "var(--timeline-pending)";
              return (
                <li
                  key={`branch-${branch.id}`}
                  className="mtx-pointer-events-none mtx-grid mtx-min-w-0 mtx-row-span-full mtx-grid-cols-[subgrid] mtx-grid-rows-[subgrid]"
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
                      <div className="mtx-break-words mtx-text-[11px] mtx-text-muted-foreground">{branch.superTitle}</div>
                    )}
                    {branch.superSubtitle != null && (
                      <div className="mtx-break-words mtx-pb-2 mtx-pr-3 mtx-text-[11px] mtx-font-semibold mtx-text-muted-foreground">
                        {branch.superSubtitle}
                      </div>
                    )}
                    <div className={cn((branch.status ?? "pending") === "pending" && "mtx-text-text-400")}>{branch.label}</div>
                    {branch.subData != null && <div className="mtx-mt-0.5 mtx-text-xs">{branch.subData}</div>}
                    {branch.footer != null && (
                      <div className="mtx-break-words mtx-pr-3 mtx-pt-1 mtx-text-[11px] mtx-text-muted-foreground">{branch.footer}</div>
                    )}
                  </div>
                  <div
                    className="mtx-relative mtx-col-[1_/_-1] mtx-mb-3 mtx-ml-3 mtx-mt-3 mtx-overflow-visible mtx-fill-none mtx-stroke-2 mtx-stroke-current mtx-z-[-1]"
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
                  <div className="mtx-col-[-2_/_-1] mtx-z-[2] mtx-size-6" style={{ gridRow: lane * 2 + 2 }}>
                    <Marker item={branch} color={branchColor} />
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
