import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { MobileTimePicker } from "./MobileTimePicker";
import { Time } from "./TimePickerContent";

const meta: Meta<typeof MobileTimePicker> = {
  title: "Components/MobileTimePicker",
  component: MobileTimePicker,
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
      return <MobileTimePicker {...args} time={time} onTimeChange={setTime} />;
    };
    return <Component />;
  },
};

export default meta;
