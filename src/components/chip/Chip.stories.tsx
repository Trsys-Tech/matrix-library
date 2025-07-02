import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "./Chip";

const meta = {
  title: "Components/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Chip>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Chips",
    disabled: false,
    asChild: false,
  },
};

export const Variants: Story = {
  args: {
    variant: "primary",
    children: "Chips component",
    asChild: false,
  },
  render: props => (
    <div className="space-x-2">
      <Chip {...props} />
      <Chip {...props} variant="neutral" />
      <Chip {...props} variant="table-primary" />
      <Chip {...props} variant="table-neutral" />
    </div>
  ),
};

export const WithButton: Story = {
  args: {
    variant: "primary",
    children: "Chips component",
    onClose: () => console.log("Close"),
    asChild: false,
  },
  render: props => (
    <div className="space-x-2">
      <Chip {...props} />
      <Chip {...props} variant="neutral" />
      <Chip {...props} variant="table-primary" />
      <Chip {...props} variant="table-neutral" />
    </div>
  ),
};

export const Large: Story = {
  args: {
    variant: "primary",
    children: "Chips component",
    size: "lg",
    onClose: () => console.log("Close"),
    asChild: false,
  },
  render: props => (
    <div className="space-x-2">
      <Chip {...props} />
      <Chip {...props} variant="neutral" />
      <Chip {...props} variant="table-primary" />
      <Chip {...props} variant="table-neutral" />
    </div>
  ),
};

export const Small: Story = {
  args: {
    variant: "primary",
    children: "Chips component",
    size: "sm",
    onClose: () => console.log("Close"),
    asChild: false,
  },
  render: props => (
    <div className="space-x-2">
      <Chip {...props} />
      <Chip {...props} variant="neutral" />
      <Chip {...props} variant="table-primary" />
      <Chip {...props} variant="table-neutral" />
    </div>
  ),
};

export default meta;
