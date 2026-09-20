import type { Meta, StoryObj } from "@storybook/react-vite";
import { Rating } from "./Rating";

const meta = {
  title: "Components/Rating",
  component: Rating,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
    value: {
      control: {
        type: "number",
      },
    },
    Icon: { control: false },
    children: { control: false },
    variant: {
      control: { type: "inline-radio" },
      options: ["default", "primary", "info", "success", "danger", "warning"],
    },
    size: {
      control: { type: "inline-radio" },
      options: ["sm", "md", "lg"],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Rating>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 3,
    size: "sm",
    precision: "full",
    variant: "default",
    readOnly: false,
    disabled: false,
    "aria-label": "Rating",
  },
};

export default meta;
