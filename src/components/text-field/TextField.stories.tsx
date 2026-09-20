import type { Meta, StoryObj } from "@storybook/react-vite";

import { TextField } from "./TextField";
import { IconButton } from "../icon-botton/IconButton";

const meta = {
  title: "Components/TextField",
  component: TextField,
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
  },
  args: {
    slotProps: {
      inputProps: {
        placeholder: "Placeholder",
        "aria-label": "Text field",
      },
    },
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextField>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSuffix: Story = {
  args: {
    suffix: "SUFFIX",
  },
};

export const NumberType: Story = {
  args: {
    suffix: "SUFFIX",
    type: "number",
  },
};

export const WithEndButton: Story = {
  args: {
    endAdornment: (
      <IconButton type="button" className="mtx-m-[1px] focus:mtx-ring-0 mtx-px-1 mtx-w-auto">
        Button
      </IconButton>
    ),
  },
};

export default meta;
