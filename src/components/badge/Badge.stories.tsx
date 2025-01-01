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
    variant: "default",
  },
  render: args => {
    return (
      <div className="flex gap-2">
        <Badge {...args} />
        <Badge {...args} variant="destructive" />
        <Badge {...args} variant="outline" />
        <Badge {...args} variant="secondary" />
      </div>
    );
  },
};

export default meta;
