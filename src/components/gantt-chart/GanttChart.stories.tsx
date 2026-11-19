import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Trashcan, XMark } from "@trsys-tech/matrix-icons";

import { Form } from "../form/Form";
import { FormDateRangePicker } from "../form-date-range-picker/FormDateRangePicker";
import { FormInput } from "../form-input/FormInput";
import { IconButton } from "../icon-botton/IconButton";
import { DATE_ONLY_PATTERN, toCalendarDate } from "../date-picker/dateValue";
import { GanttChart, type GanttItem } from "./GanttChart";
import storySource from "./GanttChart.stories.tsx?raw";
import { cn } from "../../lib/utils";

const items: GanttItem[] = [
  { id: "stairwells", name: "Stairwells", start: "2026-06-01", end: "2027-02-26", progress: 8 },
  { id: "landscape", name: "Landscape", start: "2026-08-01", end: "2027-02-26", progress: 38 },
  { id: "parkade", name: "Parkade", start: "2026-09-29", end: "2026-12-18", progress: 30 },
];

const dateOnlyStringSchema = z
  .string({ error: "Date is required" })
  .regex(DATE_ONLY_PATTERN, "Date must be in YYYY-MM-DD format")
  .refine(value => !DATE_ONLY_PATTERN.test(value) || toCalendarDate(value) !== undefined, "Date must be a real calendar date");

const stackFormSchema = z.object({
  name: z.string().trim().min(1, "Stack name is required"),
  dateRange: z.object(
    {
      from: dateOnlyStringSchema,
      to: dateOnlyStringSchema,
    },
    { error: "Date range is required" },
  ),
});

type StackFormValues = z.infer<typeof stackFormSchema>;

type DraftStackFormProps = {
  item: GanttItem;
  onApprove: (values: StackFormValues) => void;
  onReject: () => void;
};

const DraftStackForm = ({ item, onApprove, onReject }: DraftStackFormProps) => {
  const form = useForm<StackFormValues>({
    defaultValues: { name: "", dateRange: undefined },
    resolver: zodResolver(stackFormSchema),
  });

  const handleSubmit = form.handleSubmit(onApprove);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="mtx-flex mtx-flex-col mtx-gap-2 mtx-w-full mtx-items-start mtx-h-20 py-1">
        <div className="mtx-flex mtx-w-full mtx-items-start mtx-gap-1">
          <FormInput
            name="name"
            control={form.control}
            label=""
            required
            className="mtx-min-w-0 mtx-w-32"
            slotProps={{
              formLabelProps: { className: "mtx-sr-only" },
              textFieldProps: { slotProps: { inputProps: { placeholder: "Name" } } },
              formMessageProps: { className: "mtx-sr-only" },
            }}
          />
          <FormDateRangePicker
            name="dateRange"
            control={form.control}
            label=""
            required
            className="mtx-w-44"
            slotProps={{
              formLabelProps: { className: "mtx-sr-only" },
              datepickerProps: { placeholder: "Start–End date", formatStr: "MMM dd" },
              formMessageProps: { className: "mtx-sr-only" },
            }}
          />
        </div>
        <div className="mtx-flex mtx-gap-1 mtx-w-full">
          <IconButton
            type="submit"
            variant="success"
            className="mtx-h-5 mtx-flex-1 mtx-bg-success-50/50"
            size="sm"
            aria-label={`Approve ${item.name || "new stack"}`}
          >
            <Check />
          </IconButton>
          <IconButton
            type="button"
            variant="danger"
            className="mtx-h-5 mtx-flex-1 mtx-bg-danger-200/50"
            size="sm"
            aria-label="Reject new stack"
            onClick={onReject}
          >
            <XMark />
          </IconButton>
        </div>
      </form>
    </Form>
  );
};

type StackRowProps = {
  item: GanttItem;
  formattedDateRange: string;
  onDelete: () => void;
};

const StackRow = ({ item, formattedDateRange, onDelete }: StackRowProps) => {
  const [showActions, setShowActions] = React.useState(false);
  const parentRef = React.useRef<HTMLDivElement | null>(null);
  const itemName = typeof item.name === "string" && item.name ? item.name : "stack";

  React.useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (target instanceof Node && !parentRef.current?.contains(target)) {
        setShowActions(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div
      className="mtx-group mtx-relative mtx-flex mtx-w-full mtx-h-full mtx-min-w-0 mtx-items-center mtx-justify-between mtx-gap-3 mtx-transition-all"
      onClick={() => setShowActions(true)}
      onPointerLeave={() => setShowActions(false)}
      ref={parentRef}
    >
      <span className="mtx-truncate mtx-text-sm mtx-font-semibold mtx-text-text-500">{item.name}</span>
      <span className="mtx-text-xs mtx-text-text-300">{formattedDateRange}</span>
      <IconButton
        type="button"
        variant="danger"
        size="sm"
        className={`mtx-hidden group-hover:mtx-block ${showActions && "mtx-block"}`}
        aria-label={`Delete ${itemName}`}
        onClick={event => {
          event.stopPropagation();
          onDelete();
        }}
      >
        <Trashcan />
      </IconButton>
    </div>
  );
};

const AddStackStory = () => {
  const [chartItems, setChartItems] = React.useState(items);
  const [pendingStackId, setPendingStackId] = React.useState<React.Key | null>(null);
  const nextStackId = React.useRef(1);

  const handleAddItem = () => {
    if (pendingStackId !== null) return;

    const id = `new-stack-${nextStackId.current++}`;

    setPendingStackId(id);
    setChartItems(currentItems => [
      {
        id,
        name: "",
        start: "2026-01-01",
        end: "2026-01-01",
        progress: 0,
        barClassName: "mtx-opacity-0",
      },
      ...currentItems,
    ]);
  };

  const handleApprove = (values: StackFormValues) => {
    if (pendingStackId === null) return;

    setChartItems(currentItems =>
      currentItems.map(item =>
        item.id === pendingStackId
          ? {
              ...item,
              name: values.name,
              start: values.dateRange.from,
              end: values.dateRange.to,
              barClassName: undefined,
            }
          : item,
      ),
    );
    setPendingStackId(null);
  };

  const handleReject = () => {
    if (pendingStackId === null) return;

    setChartItems(currentItems => currentItems.filter(item => item.id !== pendingStackId));
    setPendingStackId(null);
  };

  const handleDeleteItem = (itemId: React.Key) => {
    setChartItems(currentItems => currentItems.filter(item => item.id !== itemId));
  };

  return (
    <GanttChart
      items={chartItems}
      startDate="2026-01-01"
      endDate="2027-06-30"
      highlightedDate="2026-09-11"
      headerHeight={80}
      markers={[
        { id: "today", date: "2026-09-11", label: "Today", color: "oklch(var(--mtx-text-800))" },
        { id: "city-walkthrough", date: "2026-11-16", label: "City walkthrough", color: "oklch(var(--mtx-success-600))" },
        { id: "schedule-c-date", date: "2026-11-11", label: "Schedule C Date", color: "oklch(var(--mtx-primary-600))" },
      ]}
      nameColumnHeader="Stack Name"
      addItemLabel="New Stack"
      onAddItem={handleAddItem}
      onRefresh={() => undefined}
      renderItem={context =>
        context.item.id === pendingStackId ? (
          <DraftStackForm item={context.item} onApprove={handleApprove} onReject={handleReject} />
        ) : (
          <StackRow item={context.item} formattedDateRange={context.formattedDateRange} onDelete={() => handleDeleteItem(context.item.id)} />
        )
      }
    />
  );
};

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

const PlannedAndActual: Story = {
  args: {
    startDate: "2026-04-01",
    endDate: "2027-03-31",
    markers: [],
    renderBar: ({ item, progress, bar }) => (
      <span
        className={cn(
          "mtx-w-full mtx-flex mtx-items-center mtx-justify-between mtx-gap-2 mtx-overflow-hidden mtx-text-text-500",
          bar && "mtx-text-secondary-800",
        )}
      >
        <span className="mtx-truncate mtx-font-semibold">{bar?.label ?? item.name}</span>
        {(!bar || bar.progress !== undefined) && (
          <strong
            className={cn(
              "mtx-rounded mtx-border mtx-border-purple-500 mtx-bg-gray-0 mtx-text-purple-500 mtx-px-2",
              bar && "mtx-border-secondary-300 mtx-text-success-800",
            )}
          >
            {progress}%
          </strong>
        )}
      </span>
    ),

    items: [
      {
        ...items[0],
        barClassName: "mtx-bg-purple-200 mtx-border-purple-400",
        progressClassName: "mtx-bg-purple-400",
        additionalBars: [
          {
            id: "planned",
            label: "Planned",
            start: "2026-05-15",
            end: "2027-01-30",
            progress: 20,
            barClassName: "mtx-bg-secondary-50 mtx-border-secondary-300",
            progressClassName: "mtx-bg-secondary-300",
          },
        ],
      },
      {
        ...items[1],
        barClassName: "mtx-bg-purple-200 mtx-border-purple-400",
        progressClassName: "mtx-bg-purple-400",

        additionalBars: [
          {
            id: "planned",
            label: "Planned",
            start: "2026-07-10",
            end: "2026-12-15",
            progress: 30,
            barClassName: "mtx-bg-secondary-50 mtx-border-secondary-300",
            progressClassName: "mtx-bg-secondary-300",
          },
        ],
      },
      {
        ...items[2],
        barClassName: "mtx-bg-purple-200 mtx-border-purple-400",
        progressClassName: "mtx-bg-purple-400",
        additionalBars: [
          {
            id: "planned",
            label: "Planned",
            start: "2026-12-1",
            end: "2026-10-15",
            progress: 30,
            barClassName: "mtx-bg-secondary-50 mtx-border-secondary-300",
            progressClassName: "mtx-bg-secondary-300",
          },
        ],
      },
    ],
  },
  play: async ({ canvas }) => {
    const row = within(canvas.getByRole("row", { name: /Stairwells/ }));
    const actual = row.getByRole("progressbar", { name: "Stairwells", value: { now: 8 } });
    const planned = row.getByRole("progressbar", { name: /^Planned,/, value: { now: 20 } });
    const actualBounds = actual.getBoundingClientRect();
    const plannedBounds = planned.getBoundingClientRect();

    await expect(plannedBounds.top).toBeGreaterThan(actualBounds.bottom);
    await expect(plannedBounds.left).toBeLessThan(actualBounds.left);
    await expect(getComputedStyle(planned).backgroundColor).not.toBe(getComputedStyle(actual).backgroundColor);
  },
};

const AddStack: Story = {
  parameters: {
    docs: {
      source: {
        code:
          storySource
            .split("const meta = {")[0]
            .replace('import type { Meta, StoryObj } from "@storybook/react-vite";\n', "")
            .replace('import { expect, within } from "storybook/test";\n', "")
            .replace('import storySource from "./GanttChart.stories.tsx?raw";\n', "")
            .trimEnd() + "\n\nexport default AddStackStory;\n",
      },
    },
  },
  render: () => <AddStackStory />,
};

export { Default, MonthView, PlannedAndActual, AddStack };
export default meta;
