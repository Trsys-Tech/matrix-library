import { Meta, StoryObj } from "@storybook/react/*";
import { Rating } from "./Rating";
import { Star } from "@trsys-tech/matrix-icons";

const meta: Meta<typeof Rating> = {
  title: "Components/Rating",
  component: Rating,
  args: {
    // value: 3,
  },
  argTypes: {
    value: {
      control: {
        type: "number",
      },
    },
  },
  tags: ["autodocs"],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 3,
    size: "sm",
    precision: "full",
    variant: "default",
    readOnly: false,
    disabled: false,
  },
  render: ({ ...args }) => {
    return <Rating {...args} Icon={Star} />;
  },
};

export default meta;
