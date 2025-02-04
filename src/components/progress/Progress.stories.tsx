import type { Meta, StoryObj } from "@storybook/react";

import { Progress } from "./Progress";

const meta = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Progress>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
  render: props => {
    const value = 33;
    return <Progress {...props} value={value} className="w-96" />;
  },
};

export const Variants: Story = {
  args: {
    variant: "primary",
  },
  render: props => {
    const value = 63;
    return (
      <div className="space-y-3 w-96">
        <Progress {...props} value={value} variant="primary" />
        <Progress {...props} value={value} variant="info" />
        <Progress {...props} value={value} variant="success" />
        <Progress {...props} value={value} variant="danger" />
        <Progress {...props} value={value} variant="warning" />
      </div>
    );
  },
};

export const Sizes: Story = {
  args: {
    variant: "primary",
  },
  render: props => (
    <div className="space-y-3 w-96">
      <Progress {...props} value={33} size="sm" />
      <Progress {...props} value={33} size="md" />
      <Progress {...props} value={33} size="lg" />
    </div>
  ),
};

export default meta;
