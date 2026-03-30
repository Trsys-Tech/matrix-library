import { Meta, StoryObj } from "@storybook/react/*";

import { IconButton } from "../icon-botton/IconButton";
import { Duration } from "./Duration";

const meta = {
  title: "Components/Duration",
  component: Duration,
  args: {
    slotProps: {
      inputProps: {
        // placeholder: "Placeholder",
      },
    },
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Duration>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithEndButton: Story = {
  args: {
    endAdornment: <IconButton className="mtx-m-[1px] focus:mtx-ring-0 mtx-px-1 mtx-w-auto">Button</IconButton>,
  },
};

export default meta;
