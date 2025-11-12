import { Meta, StoryObj } from "@storybook/react/*";

import { TextField } from "./TextField";
import { IconButton } from "../icon-botton/IconButton";

const meta = {
  title: "Components/TextField",
  component: TextField,
  args: {
    slotProps: {
      inputProps: {
        placeholder: "Placeholder",
      },
    },
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextField>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

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
    endAdornment: <IconButton className="m-[1px] focus:ring-0 px-1 w-auto">Button</IconButton>,
  },
};

export default meta;
