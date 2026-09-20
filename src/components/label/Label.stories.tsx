import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./Label";

const meta = {
  title: "Components/Label",
  component: Label,
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Label",
  },
  render: ({ children, ...props }) => (
    <div className="mtx-flex mtx-w-64 mtx-flex-col mtx-gap-2">
      <Label {...props} htmlFor="label-example">
        {children}
      </Label>
      <input id="label-example" className="mtx-rounded-md mtx-border mtx-border-input mtx-px-3 mtx-py-2" placeholder="Enter a value" />
    </div>
  ),
};

export default meta;
