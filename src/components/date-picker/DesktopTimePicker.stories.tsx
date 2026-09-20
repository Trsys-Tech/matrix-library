import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { DesktopTimePicker } from "./DesktopTimePicker";
import { Time } from "./TimePickerContent";

const meta: Meta<typeof DesktopTimePicker> = {
  title: "Components/DesktopTimePicker",
  component: DesktopTimePicker,
  tags: ["autodocs"],
  args: {
    className: "mtx-w-72",
  },
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
    is24HourMode: { control: "boolean" },
  },
};

export const Default: StoryObj<typeof meta> = {
  render: args => {
    const Component = () => {
      const [time, setTime] = React.useState<Time | undefined>(undefined);
      return <DesktopTimePicker {...args} time={time} onTimeChange={setTime} />;
    };
    return <Component />;
  },
};

export default meta;
