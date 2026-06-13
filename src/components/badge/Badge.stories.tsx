import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Badge>;

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
    <div className="mtx-space-x-2">
      <Badge {...props} />
      <Badge {...props} variant="outline" />
    </div>
  ),
};

export const Large: Story = {
  args: {
    variant: "primary",
    children: "Chips component",
    size: "lg",
    asChild: false,
  },
  render: props => (
    <div className="mtx-space-x-2">
      <Badge {...props} />
      <Badge {...props} variant="outline" />
    </div>
  ),
};

export const Small: Story = {
  args: {
    variant: "primary",
    children: "Chips component",
    size: "sm",
    asChild: false,
  },
  render: props => (
    <div className="mtx-space-x-2">
      <Badge {...props} />
      <Badge {...props} variant="outline" />
    </div>
  ),
};

export default meta;
