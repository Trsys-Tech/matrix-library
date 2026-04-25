import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DesktopTimePicker } from "./DesktopTimePicker";
import { Time } from "./TimePickerContent";

const meta: Meta<typeof DesktopTimePicker> = {
  title: "Components/DesktopTimePicker",
  component: DesktopTimePicker,
  tags: ["autodocs"],
  args: {
    className: "w-72",
  },
  argTypes: {},
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
