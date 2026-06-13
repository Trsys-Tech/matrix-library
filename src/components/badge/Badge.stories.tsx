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
    children: "Badge",
    disabled: false,
    asChild: false,
  },
};

export const Variants: Story = {
  args: {
    variant: "primary",
    children: "Badges component",
    asChild: false,
  },
  render: props => (
    <div className="space-x-2">
      <Badge {...props} />
      <Badge {...props} variant="outline" />
    </div>
  ),
};

export const Large: Story = {
  args: {
    variant: "primary",
    children: "Badges component",
    size: "lg",
    asChild: false,
  },
  render: props => (
    <div className="space-x-2">
      <Badge {...props} />
      <Badge {...props} variant="outline" />
    </div>
  ),
};

export const Small: Story = {
  args: {
    variant: "primary",
    children: "Badges component",
    size: "sm",
    asChild: false,
  },
  render: props => (
    <div className="space-x-2">
      <Badge {...props} />
      <Badge {...props} variant="outline" />
    </div>
  ),
};

export default meta;
