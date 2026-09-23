import { default as React } from 'react';
import { GanttView, GanttViewLabels } from './gantt-chart.types';
type GanttToolbarProps = React.HTMLAttributes<HTMLDivElement> & {
    activeView: GanttView;
    views: GanttView[];
    viewLabels: GanttViewLabels;
    onViewChange: (view: GanttView) => void;
    onRefresh?: () => void;
    onToggleFullscreen?: () => void;
    toolbarActions?: React.ReactNode;
};
declare const GanttToolbar: React.FC<GanttToolbarProps>;
export { GanttToolbar, type GanttToolbarProps };
//# sourceMappingURL=GanttToolbar.d.ts.map