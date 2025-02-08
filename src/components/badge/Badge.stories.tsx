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
        <Badge {...args} variant="primaryInverse" />
        <Badge {...args} variant="dangerInverse" />
        <Badge {...args} variant="successInverse" />
        <Badge {...args} variant="warningInverse" />
        <Badge {...args} variant="infoInverse" />
        <Badge {...args} variant="purpleInverce" />
        <Badge {...args} variant="coralInverce" />
        <Badge {...args} variant="turquoiseInverce" />
        <Badge {...args} variant="limeInverce" />
        <Badge {...args} variant="grayInverce" />
      </div>
    );
  },
};

export default meta;
