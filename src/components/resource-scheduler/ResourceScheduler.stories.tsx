import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fireEvent, fn, userEvent, within, waitFor } from "storybook/test";

import { Button } from "../button/Button";
import { toCalendarDate, toDateOnlyString } from "../date-picker/dateValue";
import { ResourceScheduler, type ResourceSchedulerItem, type ResourceSchedulerMove, type ResourceSchedulerProps } from "./ResourceScheduler";

const resources = [
  { id: "greenview", label: "Greenview sample Heights" },
  { id: "oceanview", label: "Oceanview sample condos" },
  { id: "westwood", label: "Westwood sample plaza" },
  { id: "eastside", label: "Eastside Tower" },
  { id: "sunset", label: "Sunset sample description villa" },
];

// These are example consumer nodes, not part of ResourceScheduler's implementation.
const createItem = (id: string, resourceId: string, date: string, status: string): ResourceSchedulerItem => ({
  id,
  resourceId,
  date,
  label: `Delivery ${id}`,
  content: (
    <article className="mtx-rounded mtx-border mtx-border-gray-200 mtx-border-t-4 mtx-border-t-primary-500 mtx-bg-gray-0 mtx-text-sm">
      <div className="mtx-p-2">
        <span className="mtx-text-primary-500">{id}</span>
        <p>Balcony railing. Level 3 to 15</p>
      </div>
      <div className="mtx-bg-gray-50 mtx-px-2 mtx-py-1">{status}</div>
    </article>
  ),
});

const items = [
  createItem("DP-122", "greenview", "2026-09-13T08:00:00", "Submitted"),
  createItem("DP-123", "greenview", "2026-09-13T11:00:00", "Production allocated"),
  createItem("DP-324", "greenview", "2026-09-13T13:30:00", "Delivery confirmed"),
  createItem("DP-124", "greenview", "2026-09-14T08:00:00", "Production allocated"),
  createItem("DP-125", "oceanview", "2026-09-14T10:30:00", "Production allocated"),
  ...Array.from({ length: 5 }, (_, index) => createItem(`DP-${103 + index}`, "westwood", `2026-09-${13 + index}T09:00:00`, "Draft")),
  createItem("DP-108", "westwood", "2026-09-13T11:00:00", "Draft"),
  createItem("DP-109", "westwood", "2026-09-13T14:00:00", "Draft"),
];

const meta = {
  title: "Components/ResourceScheduler",
  component: ResourceScheduler,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    resources,
    from: "2026-09-13",
    to: "2026-09-19",
    defaultItems: items,
    onItemsChange: fn(),
  },
  argTypes: {
    items: { control: false },
    defaultItems: { control: false },
    resources: { control: false },
    slotProps: { control: false },
    formatter: { control: false },
    renderCellButton: { control: false },
    showCellButton: { control: "boolean" },
  },
} satisfies Meta<typeof ResourceScheduler>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TodayAndCellButtons: Story = {
  args: {
    from: toDateOnlyString(new Date())!,
    to: toDateOnlyString(new Date(new Date().setDate(new Date().getDate() + 6)))!,
    defaultItems: [],
    showCellButton: true,
    renderCellButton: ({ resource, date }) => (
      <Button
        type="button"
        className="mtx-w-8 mtx-text-lg mtx-bg-primary-25 mtx-text-primary"
        variant="text"
        aria-label={`Add delivery for ${resource.id} on ${date}`}
      >
        +
      </Button>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const today = toDateOnlyString(new Date())!;
    await expect(canvasElement.querySelectorAll('[role="columnheader"][data-today="true"]')).toHaveLength(1);
    await expect(canvasElement.querySelectorAll('[role="cell"][data-today="true"]')).toHaveLength(resources.length);
    const button = canvas.getByRole("button", { name: `Add delivery for greenview on ${today}` });
    await expect(getComputedStyle(button.parentElement!).opacity).toBe("0");
    button.focus();
    await expect(button).toHaveFocus();
    await waitFor(() => expect(getComputedStyle(button.parentElement!).opacity).toBe("1"));
  },
};

export const SelectedCellButtons: Story = {
  args: {
    renderCellButton: TodayAndCellButtons.args!.renderCellButton,
    showCellButton: ({ resource, items }) => resource.id === "greenview" && items.length === 0,
  },
};

const ControlledExample = (props: ResourceSchedulerProps) => {
  const [value, setValue] = useState(props.defaultItems ?? items);
  return (
    <ResourceScheduler
      {...props}
      items={value}
      onItemsChange={(nextItems, move) => {
        setValue(nextItems);
        props.onItemsChange?.(nextItems, move);
      }}
    />
  );
};

export const Controlled: Story = { render: args => <ControlledExample {...args} /> };
export const Disabled: Story = { args: { disabled: true } };
export const Empty: Story = { args: { defaultItems: [] } };
export const CustomHeaders: Story = {
  args: {
    formatter: date => `${date.getDate()}/${date.getMonth() + 1}`,
  },
};
export const CustomContent: Story = {
  args: {
    defaultItems: [
      {
        id: "custom",
        resourceId: "greenview",
        date: "2026-09-15T00:00:00",
        content: (
          <button type="button" className="mtx-rounded mtx-bg-primary-50 mtx-p-4">
            Any interactive React node
          </button>
        ),
      },
    ],
  },
};

const ChooseTimeExample = (props: ResourceSchedulerProps) => {
  const [value, setValue] = useState(props.defaultItems ?? items);
  const [pendingMove, setPendingMove] = useState<ResourceSchedulerMove | null>(null);
  const [time, setTime] = useState("");
  return (
    <>
      <ResourceScheduler
        {...props}
        items={value}
        onItemDrop={move => {
          const date = toCalendarDate(move.item.date) ?? new Date(move.item.date);
          setTime(`${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`);
          setPendingMove(move);
        }}
      />
      {/* <Modal open={!!pendingMove} onOpenChange={() => setPendingMove(null)} title="Choose new time"> */}
      {pendingMove && (
        <form
          className="mtx-flex mtx-flex-col mtx-items-center mtx-gap-5 mtx-absolute mtx-top-1/2 mtx-left-1/2 mtx-w-80 mtx--translate-x-1/2 mtx--translate-y-1/2 mtx-rounded mtx-bg-gray-0 mtx-p-6 mtx-shadow-lg mtx-border mtx-border-gray-200"
          onSubmit={event => {
            event.preventDefault();
            const date = toCalendarDate(pendingMove.item.date) ?? new Date(pendingMove.item.date);
            const [hour, minute] = time.split(":").map(Number);
            date.setHours(hour, minute, 0, 0);
            setValue(current => current.map(item => (item.id === pendingMove.item.id ? { ...pendingMove.item, date } : item)));
            setPendingMove(null);
          }}
        >
          <div>
            <label>
              New time <input aria-label="New time" type="time" required value={time} onChange={event => setTime(event.target.value)} />
            </label>
          </div>
          <div className="mtx-flex mtx-justify-end mtx-gap-3 mtx-w-full">
            <Button variant="text" type="button" onClick={() => setPendingMove(null)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Apply move
            </Button>
          </div>
        </form>
      )}
      {/* </Modal> */}
    </>
  );
};

export const ChooseTimeOnDrop: Story = {
  render: args => <ChooseTimeExample {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const sourceCell = canvasElement.querySelector('[data-resource-id="greenview"][data-date="2026-09-13"]')!;
    const source = canvas.getByRole("group", { name: "Delivery DP-122" });
    source.focus();
    await userEvent.keyboard("{Enter}{ArrowRight}{Enter}");
    await userEvent.click(canvas.getByRole("button", { name: "Cancel" }));
    await expect([...sourceCell.querySelectorAll("[data-item-id]")].map(card => card.getAttribute("data-item-id"))).toEqual([
      "DP-122",
      "DP-123",
      "DP-324",
    ]);
    source.focus();
    await userEvent.keyboard("{Enter}{ArrowRight}{Enter}");
    await userEvent.click(canvas.getByRole("button", { name: "Apply move" }));
    const target = canvasElement.querySelector('[data-resource-id="greenview"][data-date="2026-09-14"]')!;
    await expect([...target.querySelectorAll("[data-item-id]")].map(card => card.getAttribute("data-item-id"))).toEqual(["DP-124", "DP-122"]);
    await expect(canvas.getByRole("group", { name: "Delivery DP-122" })).toHaveFocus();
  },
};

export const MoveInteractions: Story = {
  args: { defaultItems: [items[3]], onItemDrop: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole("group", { name: "Delivery DP-124" });
    card.focus();
    await userEvent.keyboard("{Enter}{ArrowRight}{Escape}");
    await expect(args.onItemDrop).not.toHaveBeenCalled();
    await userEvent.keyboard("{Enter}{ArrowRight}{Enter}");
    await expect(args.onItemDrop).toHaveBeenCalledWith(
      expect.objectContaining({ item: expect.objectContaining({ date: "2026-09-15T08:00:00", resourceId: "greenview" }) }),
    );
    const dataTransfer = new DataTransfer();
    const originalCell = canvasElement.querySelector('[data-resource-id="greenview"][data-date="2026-09-14"]')!;
    const nextCell = canvasElement.querySelector('[data-resource-id="greenview"][data-date="2026-09-16"]')!;
    const otherResource = canvasElement.querySelector('[data-resource-id="oceanview"][data-date="2026-09-16"]')!;
    fireEvent.dragStart(card, { dataTransfer });
    fireEvent.dragOver(otherResource, { dataTransfer });
    fireEvent.drop(otherResource, { dataTransfer });
    await expect(args.onItemDrop).toHaveBeenCalledTimes(1);
    fireEvent.dragStart(card, { dataTransfer });
    fireEvent.dragOver(nextCell, { dataTransfer });
    fireEvent.drop(nextCell, { dataTransfer });
    fireEvent.dragEnd(card, { dataTransfer });
    await expect(args.onItemDrop).toHaveBeenCalledTimes(2);
    await expect(args.onItemDrop).toHaveBeenLastCalledWith(
      expect.objectContaining({ item: expect.objectContaining({ date: "2026-09-16T08:00:00", resourceId: "greenview" }) }),
    );
    await expect(originalCell).toContainElement(card);
  },
};

const stackedItems: ResourceSchedulerItem[] = [
  {
    id: 0,
    resourceId: 0,
    date: new Date(2026, 8, 14, 10, 30),
    label: "Moving numeric card",
    content: <article className="mtx-rounded mtx-border mtx-border-gray-200 mtx-bg-gray-0 mtx-p-4">Moving numeric card</article>,
  },
  {
    id: "0",
    resourceId: 0,
    date: new Date(2026, 8, 14, 11),
    label: "Later source card",
    content: <article className="mtx-rounded mtx-border mtx-border-gray-200 mtx-bg-gray-0 mtx-p-4">Later source card</article>,
  },
  {
    id: "earlier",
    resourceId: 0,
    date: new Date(2026, 8, 15, 9),
    label: "Earlier card",
    content: <article className="mtx-rounded mtx-border mtx-border-gray-200 mtx-bg-gray-0 mtx-p-4">Earlier card</article>,
  },
  {
    id: "equal",
    resourceId: 0,
    date: new Date(2026, 8, 15, 10, 30),
    label: "Equal-time card",
    content: <article className="mtx-rounded mtx-border mtx-border-gray-200 mtx-bg-gray-0 mtx-p-4">Equal-time card</article>,
  },
  {
    id: "later",
    resourceId: 0,
    date: new Date(2026, 8, 16, 14),
    label: "Later card",
    content: <article className="mtx-rounded mtx-border mtx-border-gray-200 mtx-bg-gray-0 mtx-p-4">Later card</article>,
  },
  {
    id: "locked",
    resourceId: 0,
    date: new Date(2026, 8, 15, 8),
    label: "Locked card",
    content: <article className="mtx-rounded mtx-border mtx-border-gray-200 mtx-bg-gray-0 mtx-p-4">Locked card</article>,
    draggable: false,
  },
];

const stackedArgs = {
  resources: [
    { id: 0, label: "Numeric resource" },
    { id: "0", label: "String resource" },
  ],
  from: "2026-09-14T00:00:00",
  to: "2026-09-16T00:00:00",
  defaultItems: stackedItems,
};

const checkStackedMoves: Story["play"] = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);
  const source = canvas.getByRole("group", { name: "Moving numeric card" });
  const other = canvas.getByRole("group", { name: "Later source card" });
  const target = canvasElement.querySelector('[data-resource-id="0"][data-date="2026-09-15"]')!;
  source.focus();
  await userEvent.keyboard("{ArrowDown}");
  await expect(other).toHaveFocus();
  await userEvent.keyboard("{ArrowUp}");
  await expect(source).toHaveFocus();
  const dataTransfer = new DataTransfer();
  const setDragImage = fn();
  dataTransfer.setDragImage = setDragImage;
  fireEvent.dragStart(source, { dataTransfer, clientX: 180, clientY: 80 });
  await expect(setDragImage).toHaveBeenCalledTimes(1);
  const preview = setDragImage.mock.calls[0][0] as HTMLElement;
  await expect(preview).toHaveTextContent("Moving numeric card");
  await expect(preview).not.toHaveTextContent("Later source card");
  await expect(canvasElement.querySelectorAll('[data-moving="true"]')).toHaveLength(1);
  fireEvent.dragOver(target, { dataTransfer });
  fireEvent.drop(target, { dataTransfer });
  fireEvent.dragEnd(source, { dataTransfer });
  await expect(preview.isConnected).toBe(false);
  await expect(args.onItemsChange).toHaveBeenLastCalledWith(
    expect.any(Array),
    expect.objectContaining({ item: expect.objectContaining({ id: 0, resourceId: 0, date: new Date(2026, 8, 15, 10, 30) }) }),
  );
  await expect([...target.querySelectorAll("[data-item-id]")].map(card => card.getAttribute("data-item-id"))).toEqual([
    "locked",
    "earlier",
    "equal",
    "0",
  ]);
  // Cycle through overlapping cards, skipping the non-draggable card, then move only the selected one.
  const earlier = canvas.getByRole("group", { name: "Earlier card" });
  earlier.focus();
  await userEvent.keyboard("{ArrowUp}");
  await expect(canvas.getByRole("group", { name: "Moving numeric card" })).toHaveFocus();
  await userEvent.keyboard("{Enter}{ArrowRight}{Enter}");
  const lastCell = canvasElement.querySelector('[data-resource-id="0"][data-date="2026-09-16"]')!;
  await expect([...lastCell.querySelectorAll("[data-item-id]")].map(card => card.getAttribute("data-item-id"))).toEqual(["0", "later"]);
  await expect(canvas.getByRole("group", { name: "Moving numeric card" })).toHaveFocus();
  await expect(canvasElement.querySelectorAll('[data-moving="true"]')).toHaveLength(0);
  await expect(other).toHaveTextContent("Later source card");
};

export const StackedMoveInteractions: Story = { args: stackedArgs, play: checkStackedMoves };
export const ControlledStackedMoveInteractions: Story = {
  args: stackedArgs,
  render: args => <ControlledExample {...args} />,
  play: checkStackedMoves,
};

export default meta;
