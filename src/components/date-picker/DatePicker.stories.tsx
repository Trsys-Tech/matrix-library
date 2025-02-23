import React from "react";
import { Meta, StoryObj } from "@storybook/react/*";

import { DatePicker } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  args: {
    className: "w-72",
    closeOnSelect: true,
  },
  argTypes: {
    selected: {
      table: {
        disable: false,
      },
    },
    calendarClassName: {
      table: {
        disable: true,
      },
    },
    disabled: { control: "boolean" },
  },
};

export const Default: StoryObj<typeof meta> = {
  args: {
    selected: new Date(),
  },
  render: args => {
    const Component = () => {
      const [selected, setSelected] = React.useState<Date | undefined>(args.selected);
      return <DatePicker {...args} selected={selected} onSelect={day => setSelected(day)} />;
    };
    return <Component />;
  },
};

export default meta;
