import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";

import { MobileTimePicker } from "./MobileTimePicker";

const meta = {
  title: "Components/MobileTimePicker",
  component: MobileTimePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    className: "mtx-w-72",
    time: { hour: 9, minute: 30, ampm: "AM" },
  },
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
    time: { control: "object" },
    disabled: { control: "boolean" },
    is24HourMode: { control: "boolean" },
    onTimeChange: {
      table: {
        disable: true,
      },
    },
    slotsProps: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof MobileTimePicker>;

type Story = StoryObj<typeof meta>;

const onTimeChange = fn();

export const Default: Story = {
  args: {
    onTimeChange,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<NonNullable<Story["args"]>>();

    return (
      <MobileTimePicker
        {...args}
        onTimeChange={time => {
          onTimeChange(time);
          updateArgs({ time });
        }}
      />
    );
  },
};

export default meta;
