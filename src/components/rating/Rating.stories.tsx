import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";

import { Rating } from "./Rating";

const onValueChange = fn();

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
    defaultValue: {
      control: {
        type: "number",
      },
    },
    onValueChange: {
      table: {
        disable: true,
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

export const Controlled: Story = {
  args: {
    value: 3,
    size: "sm",
    precision: "full",
    variant: "default",
    readOnly: false,
    disabled: false,
    onValueChange,
    "aria-label": "Rating",
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<NonNullable<Story["args"]>>();

    return (
      <Rating
        {...args}
        onValueChange={value => {
          onValueChange(value);
          updateArgs({ value });
        }}
      />
    );
  },
};

export const Uncontrolled: Story = {
  args: {
    defaultValue: 3,
    size: "sm",
    precision: "full",
    variant: "default",
    readOnly: false,
    disabled: false,
    onValueChange,
    "aria-label": "Rating",
  },
};

export default meta;
