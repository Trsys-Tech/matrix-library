import type { Meta, StoryObj } from "@storybook/react-vite";

import { Progress } from "./Progress";

const meta = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  args: {
    "aria-label": "Progress",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "inline-radio" },
      options: ["primary", "info", "success", "danger", "warning"],
    },
    size: {
      control: { type: "inline-radio" },
      options: ["sm", "md", "lg"],
    },
    className: {
      control: false,
      description: "Additional classes to apply to the progress bar.",
    },
    value: {
      control: { type: "number", min: 0, max: 100, step: 1 },
      description: "The current value of the progress bar, between 0 and 100.",
    },
  },
} satisfies Meta<typeof Progress>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
    value: 33,
    className: "mtx-w-96",
  },
};

export const Variants: Story = {
  args: {
    value: 63,
  },
  argTypes: {
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
  },
  render: ({ value, ...props }) => (
    <div className="mtx-space-y-3 mtx-w-96">
      <Progress {...props} value={value} variant="primary" />
      <Progress {...props} value={value} variant="info" />
      <Progress {...props} value={value} variant="success" />
      <Progress {...props} value={value} variant="danger" />
      <Progress {...props} value={value} variant="warning" />
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    variant: "primary",
    value: 33,
  },
  argTypes: {
    size: { table: { disable: true } },
  },
  render: ({ value, ...props }) => (
    <div className="mtx-space-y-3 mtx-w-96">
      <Progress {...props} value={value} size="sm" />
      <Progress {...props} value={value} size="md" />
      <Progress {...props} value={value} size="lg" />
    </div>
  ),
};

export default meta;
