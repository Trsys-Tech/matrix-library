import type { Meta, StoryObj } from "@storybook/react-vite";
import { Status } from "./Status";

const meta = {
  title: "Components/Status",
  component: Status,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
    children: {
      control: {
        type: "text",
      },
    },
    variant: {
      control: { type: "inline-radio" },
      options: [
        "primary",
        "secondary",
        "outline",
        "danger",
        "success",
        "warning",
        "info",
        "primary-inverse",
        "danger-inverse",
        "success-inverse",
        "warning-inverse",
        "info-inverse",
        "purple-inverse",
        "coral-inverse",
        "turquoise-inverse",
        "lime-inverse",
        "gray-inverse",
      ],
    },
  },
} satisfies Meta<typeof Status>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Status",
  },
};

export const Variants: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  args: {
    children: "Status",
    variant: "primary",
  },
  render: args => {
    return (
      <div className="mtx-flex mtx-flex-wrap mtx-gap-2">
        <Status {...args} />
        <Status {...args} variant="secondary" />
        <Status {...args} variant="outline" />
        <Status {...args} variant="danger" />
        <Status {...args} variant="success" />
        <Status {...args} variant="warning" />
        <Status {...args} variant="info" />
        <Status {...args} variant="primary-inverse" />
        <Status {...args} variant="danger-inverse" />
        <Status {...args} variant="success-inverse" />
        <Status {...args} variant="warning-inverse" />
        <Status {...args} variant="info-inverse" />
        <Status {...args} variant="purple-inverse" />
        <Status {...args} variant="coral-inverse" />
        <Status {...args} variant="turquoise-inverse" />
        <Status {...args} variant="lime-inverse" />
        <Status {...args} variant="gray-inverse" />
      </div>
    );
  },
};

export default meta;
