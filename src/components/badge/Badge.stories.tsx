import { Meta, StoryObj } from "@storybook/react/*";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
  },
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const Variants: Story = {
  args: {
    children: "Badge",
    variant: "primary",
  },
  render: args => {
    return (
      <div className="flex flex-wrap gap-2">
        <Badge {...args} />
        <Badge {...args} variant="secondary" />
        <Badge {...args} variant="outline" />
        <Badge {...args} variant="danger" />
        <Badge {...args} variant="success" />
        <Badge {...args} variant="warning" />
        <Badge {...args} variant="info" />
        <Badge {...args} variant="primary-inverse" />
        <Badge {...args} variant="danger-inverse" />
        <Badge {...args} variant="success-inverse" />
        <Badge {...args} variant="warning-inverse" />
        <Badge {...args} variant="info-inverse" />
        <Badge {...args} variant="purple-inverse" />
        <Badge {...args} variant="coral-inverse" />
        <Badge {...args} variant="turquoise-inverse" />
        <Badge {...args} variant="lime-inverse" />
        <Badge {...args} variant="gray-inverse" />
      </div>
    );
  },
};

export default meta;
