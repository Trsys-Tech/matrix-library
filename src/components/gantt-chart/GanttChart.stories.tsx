import type { Meta, StoryObj } from "@storybook/react-vite";

import { GanttChart, type GanttItem } from "./GanttChart";

const items: GanttItem[] = [
  { id: "stairwells", name: "Stairwells", start: "2026-06-01", end: "2027-02-26", progress: 8 },
  { id: "landscape", name: "Landscape", start: "2026-08-01", end: "2027-02-26", progress: 38 },
  { id: "parkade", name: "Parkade", start: "2026-11-12", end: "2026-12-18", progress: 85 },
];

const meta = {
  title: "Components/GanttChart",
  component: GanttChart,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    items,
    startDate: "2026-01-01",
    endDate: "2027-06-30",
    highlightedDate: "2026-09-11",
    markers: [
      { id: "today", date: "2026-09-11", label: "Today", color: "oklch(var(--mtx-text-800))" },
      { id: "city-walkthrough", date: "2026-11-16", label: "City walkthrough", color: "oklch(var(--mtx-success-600))" },
      { id: "schedule-c-date", date: "2026-11-11", label: "Schedule C Date", color: "oklch(var(--mtx-primary-600))" },
    ],
    nameColumnHeader: "Stack Name",
    addItemLabel: "New Stack",
    onAddItem: () => undefined,
    onRefresh: () => undefined,
  },
} satisfies Meta<typeof GanttChart>;

type Story = StoryObj<typeof meta>;

const Default: Story = {};

const MonthView: Story = {
  args: { defaultView: "month" },
};

export { Default, MonthView };
export default meta;
