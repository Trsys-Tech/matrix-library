import type { Meta, StoryObj } from "@storybook/react-vite";
import { Timeline, type TimelineItem } from "./Timeline";

const items: TimelineItem[] = [
  { id: "received", label: "Received", subData: "James", status: "completed", footer: "2024/02/02" },
  { id: "created", label: "Created", subData: "Emily", status: "completed", footer: "2024/02/04" },
  { id: "qualified", label: "Pre-Qualification", subData: "Robert", status: "completed", footer: "2024/02/04" },
  { id: "estimate", label: "Estimate & Pricing", subData: "Sarah", status: "active", superTitle: "Due Date:", superSubtitle: "2024/02/15" },
  { id: "verification", label: "Price Quote Verification", subData: "David", superTitle: "Due Date:", superSubtitle: "2024/02/17" },
  { id: "confirmation", label: "Price Quote Confirmation", subData: "William", superTitle: "Due Date:", superSubtitle: "2024/02/17" },
  { id: "submitted", label: "Submit to client", subData: "Richard", superTitle: "Due Date:", superSubtitle: "2024/02/25" },
  { id: "review", label: "LOI review", subData: "Thomas" },
  { id: "sent", label: "LOI Send to client", subData: "Linda" },
  { id: "awarded", label: "Awarded" },
];

const meta = {
  title: "Components/Timeline",
  component: Timeline,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    loading: { control: "boolean" },
    activeColor: { control: "color" },
    completedColor: { control: "color" },
    errorColor: { control: "color" },
    inactiveColor: { control: "color" },
  },
  args: {
    title: "Timeline",
    items,
    branches: [{ id: "declined", from: "submitted", label: "Declined" }],
    loading: false,
  },
} satisfies Meta<typeof Timeline>;
export default meta;
type Story = StoryObj<typeof meta>;

export const InProgress: Story = {};
export const Loading: Story = {
  args: {
    title: "Tender Timeline",
    loading: true,
  },
};
export const FailedStep: Story = {
  args: { items: items.map((item, index) => ({ ...item, status: index < 2 ? "completed" : index === 2 ? "error" : "pending" })) },
};
export const Awarded: Story = {
  args: {
    items: items.map(item => ({
      ...item,
      status: "completed",
      superTitle: undefined,
      superSubtitle: undefined,
      footer: item.footer ?? "2024/02/08",
    })),
  },
};
export const Declined: Story = {
  args: {
    items: items.map((item, index) => ({
      ...item,
      status: index <= 6 ? "completed" : "pending",
      superTitle: undefined,
      superSubtitle: undefined,
      footer: index <= 6 ? (item.footer ?? "2024/02/08") : undefined,
    })),
    branches: [
      {
        id: "declined",
        from: "submitted",
        label: "Declined",
        superTitle: "2024/02/08",
        status: "error",
        active: true,
        activeColor: "var(--timeline-error)",
      },
    ],
  },
};
export const Simple: Story = {
  args: {
    title: undefined,
    branches: [],
    items: Array.from({ length: 4 }, (_, index) => ({ id: `step-${index}`, label: `Step ${index + 1}`, subData: "Step name", status: "completed" })),
  },
};
export const MultipleBranches: Story = {
  args: {
    items: items.map(item => ({ ...item, superTitle: undefined, superSubtitle: undefined })),
    branches: [
      {
        id: "revision",
        from: "estimate",
        label: "Revision requested",
        subData: "Commercial team",
        footer: "Awaiting input",
        status: "active",
        active: true,
        activeColor: "#8b5cf6",
      },
      { id: "declined", from: "submitted", label: "Declined" },
    ],
  },
};
export const ArbitraryContent: Story = {
  args: {
    branches: [],
    title: "Publishing workflow",
    items: [
      {
        id: "draft",
        label: "Draft",
        superTitle: "Version",
        superSubtitle: "3",
        subData: "Editorial",
        footer: "Ready for review",
        status: "completed",
      },
      {
        id: "review",
        label: "Review",
        superTitle: "Priority",
        superSubtitle: <strong>High</strong>,
        subData: "Design team",
        footer: "Two comments remain",
        status: "active",
      },
      { id: "publish", label: "Publish", footer: "Public release" },
    ],
  },
};
export const NarrowContainer: Story = {
  decorators: [
    Story => (
      <div style={{ width: 360, maxWidth: "100%" }}>
        <Story />
      </div>
    ),
  ],
};
