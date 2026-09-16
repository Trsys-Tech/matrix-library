import React from "react";
import { ArrowsMaximize, Refresh } from "@trsys-tech/matrix-icons";

import { cn } from "../../lib/utils";
import { IconButton } from "../icon-botton/IconButton";
import type { GanttView, GanttViewLabels } from "./gantt-chart.types";

type GanttToolbarProps = React.HTMLAttributes<HTMLDivElement> & {
  activeView: GanttView;
  views: GanttView[];
  viewLabels: GanttViewLabels;
  onViewChange: (view: GanttView) => void;
  onRefresh?: () => void;
  onToggleFullscreen?: () => void;
  toolbarActions?: React.ReactNode;
};

const GanttToolbar: React.FC<GanttToolbarProps> = ({
  activeView,
  views,
  viewLabels,
  onViewChange,
  onRefresh,
  onToggleFullscreen,
  toolbarActions,
  className,
  ...props
}) => (
  <div
    className={cn(
      "mtx-flex mtx-min-h-16 mtx-items-center mtx-justify-between mtx-gap-4 mtx-border-b mtx-border-gray-200 mtx-bg-gray-0 mtx-p-3",
      className,
    )}
    {...props}
  >
    <div className="mtx-flex mtx-flex-wrap mtx-items-center mtx-gap-2" role="group" aria-label="Timeline scale">
      {views.map(view => (
        <button
          key={view}
          type="button"
          aria-pressed={activeView === view}
          className={cn(
            "mtx-h-9 mtx-rounded-full mtx-px-4 mtx-text-sm mtx-font-medium mtx-transition-colors focus-visible:mtx-outline-none focus-visible:mtx-ring focus-visible:mtx-ring-primary-300",
            activeView === view ? "mtx-bg-primary-50 mtx-text-primary-600" : "mtx-bg-gray-50 mtx-text-text-400 hover:mtx-bg-gray-100",
          )}
          onClick={() => onViewChange(view)}
        >
          {viewLabels[view]}
        </button>
      ))}
    </div>

    <div className="mtx-flex mtx-items-center mtx-gap-1">
      {toolbarActions}
      {onRefresh ? (
        <IconButton type="button" variant="toolbar" aria-label="Refresh chart" title="Refresh chart" onClick={onRefresh}>
          <Refresh />
        </IconButton>
      ) : null}
      {onToggleFullscreen ? (
        <IconButton type="button" variant="toolbar" aria-label="Toggle fullscreen" title="Toggle fullscreen" onClick={onToggleFullscreen}>
          <ArrowsMaximize />
        </IconButton>
      ) : null}
    </div>
  </div>
);

export { GanttToolbar, type GanttToolbarProps };
