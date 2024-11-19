import React from "react";
import { Meta, StoryObj } from "@storybook/react/*";
import DatePicker from "./DatePicker";

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
        disable: true,
      },
    },
    calendarClassName: {
      table: {
        disable: true,
      },
    },
  },
};

export const Default: StoryObj<typeof meta> = {
  render: args => {
    const Component = () => {
      const [selected, setSelected] = React.useState<Date | undefined>(undefined);
      return <DatePicker {...args} selected={selected} onSelect={day => setSelected(day)} />;
    };
    return <Component />;
  },
};

export default meta;
