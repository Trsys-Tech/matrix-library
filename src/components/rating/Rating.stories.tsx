import { Meta, StoryObj } from "@storybook/react/*";
import { Rating, RatingItem } from "./Rating";

// import { StarIcon } from "lucide-react";
import { StarIcon } from "../Icons/StartIcon";

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
    return (
      <Rating {...args}>
        {Array.from({ length: 5 }).map((_, index) => (
          <RatingItem Icon={StarIcon} index={index} key={index} />
        ))}
      </Rating>
    );
  },
};

export default meta;
