import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";

import { IconButton } from "../icon-botton/IconButton";
import { Duration } from "./Duration";

const meta = {
  title: "Components/Duration",
  component: Duration,
  args: {
    className: "mtx-w-56",
    disabled: false,
    showSeconds: false,
    size: "md",
    value: "09:30",
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
    defaultValue: {
      control: false,
      description: "Initial value for uncontrolled usage; this story demonstrates the controlled value prop.",
    },
    disabled: { control: "boolean" },
    endAdornment: { control: false },
    onChange: {
      table: {
        disable: true,
      },
    },
    showSeconds: { control: "boolean" },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
    slotProps: {
      table: {
        disable: true,
      },
    },
    startAdornment: { control: false },
    value: { control: "text" },
  },
} satisfies Meta<typeof Duration>;

type Story = StoryObj<typeof meta>;

const onChange = fn();

const renderDuration = (args: Story["args"]) => {
  const [, updateArgs] = useArgs<NonNullable<Story["args"]>>();

  return (
    <Duration
      {...args}
      onChange={event => {
        onChange(event);
        updateArgs({ value: event.target.value });
      }}
    />
  );
};

export const Default: Story = {
  render: renderDuration,
};

export const WithEndButton: Story = {
  args: {
    endAdornment: <IconButton className="mtx-m-[1px] focus:mtx-ring-0 mtx-px-1 mtx-w-auto">Button</IconButton>,
  },
  render: renderDuration,
};

export const WithSeconds: Story = {
  args: {
    showSeconds: true,
    value: "09:30:45",
  },
  render: renderDuration,
};

export default meta;
