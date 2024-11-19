import { Meta, StoryObj } from "@storybook/react/*";
import DateRangePicker from "./DateRangePicker";
import React from "react";
import { DateRange } from "react-day-picker";

const meta: Meta<typeof DateRangePicker> = {
  title: "Components/DateRangePicker",
  component: DateRangePicker,
  tags: ["autodocs"],
  args: {
    className: "w-72",
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
      const [selected, setSelected] = React.useState<DateRange | undefined>(undefined);
      return <DateRangePicker {...args} selected={selected} onSelect={setSelected} />;
    };
    return <Component />;
  },
};

export default meta;
