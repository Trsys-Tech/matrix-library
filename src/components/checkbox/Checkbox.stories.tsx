import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { Checkbox } from "./Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    onCheckedChange: fn(),
  },
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
    checked: {
      control: { type: "inline-radio" },
      options: [false, true, "indeterminate"],
    },
    disabled: {
      control: "boolean",
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: false,
  },
};

export const States: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div className="mtx-grid mtx-grid-cols-2 mtx-gap-2 mtx-w-44">
      <Checkbox aria-label="Unchecked" checked={false} />
      <Checkbox aria-label="Unchecked disabled" checked={false} disabled />
      <Checkbox aria-label="Checked" checked />
      <Checkbox aria-label="Checked disabled" checked disabled />
      <Checkbox aria-label="Indeterminate" checked="indeterminate" />
      <Checkbox aria-label="Indeterminate disabled" checked="indeterminate" disabled />
    </div>
  ),
};

export default meta;
