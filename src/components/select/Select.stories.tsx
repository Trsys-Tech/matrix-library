import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select";

const meta = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: false,
    onValueChange: fn(),
  },
  render: args => (
    <Select {...args}>
      <SelectTrigger aria-label="Item" className="mtx-w-96">
        <SelectValue placeholder="Select an item" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Item 1</SelectItem>
        <SelectItem value="2">Item 2</SelectItem>
        <SelectItem value="3">Item 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export default meta;
