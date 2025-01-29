import React from "react";
import { Meta, StoryObj } from "@storybook/react/*";

import { Time, TimePicker } from "./TimePicker";

const meta: Meta<typeof TimePicker> = {
  title: "Components/TimePicker",
  component: TimePicker,
  tags: ["autodocs"],
  args: {
    className: "w-72",
  },
  argTypes: {
    disabled: { control: "boolean" },
  },
};

export const Default: StoryObj<typeof meta> = {
  render: args => {
    const Component = () => {
      const [time, setTime] = React.useState<Time | undefined>(undefined);
      return <TimePicker {...args} time={time} onTimeChange={day => setTime(day)} />;
    };
    return <Component />;
  },
};

export default meta;
