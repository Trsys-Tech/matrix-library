import { Meta, StoryObj } from "@storybook/react/*";
import { Textarea } from "./textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {},
  tags: ["autodocs"],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rows: 4,
    className: "w-full",
  },
};

export default meta;
