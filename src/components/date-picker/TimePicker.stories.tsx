import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import { Time, TimePicker } from "./TimePicker";

const meta: Meta<typeof TimePicker> = {
  title: "Components/TimePicker",
  component: TimePicker,
  tags: ["autodocs"],
  args: {
    className: "mtx-w-72",
    time: { hour: 9, minute: 16, ampm: "AM" },
  },
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
    disabled: { control: "boolean" },
    is24HourMode: { control: "boolean" },
  },
};

export const Default: StoryObj<typeof meta> = {
  render: args => {
    const Component = () => {
      const [time, setTime] = React.useState<Time | undefined>(args.time);
      return <TimePicker {...args} time={time} onTimeChange={day => setTime(day)} />;
    };
    return <Component />;
  },
};

export default meta;
