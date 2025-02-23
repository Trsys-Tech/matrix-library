import { Meta, StoryObj } from "@storybook/react/*";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,

  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
  tags: ["autodocs"],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rows: 4,
    className: "w-full",
    value: "This is a text area",
  },
};

export default meta;
