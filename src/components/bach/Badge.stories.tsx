import { Meta, StoryObj } from "@storybook/react/*";
import { Bach } from "./Bach";

const meta: Meta<typeof Bach> = {
  title: "Components/Bach",
  component: Bach,
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
    children: "Bach",
  },
};

export const Variants: Story = {
  args: {
    children: "Bach",
    variant: "default",
  },
  render: args => {
    return (
      <div className="flex gap-2">
        <Bach {...args} />
        <Bach {...args} variant="secondary" />
        <Bach {...args} variant="outline" />
        <Bach {...args} variant="danger" />
        <Bach {...args} variant="success" />
        <Bach {...args} variant="warning" />
        <Bach {...args} variant="info" />
      </div>
    );
  },
};

export default meta;
