import React from "react";
import { Meta, StoryObj } from "@storybook/react";

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
    disabledDates: { control: "object" },
  },
};

export const Default: StoryObj<typeof meta> = {
  args: {
    selected: "2025-12-24",
  },
  render: args => {
    const Component = () => {
      const [selected, setSelected] = React.useState<string | Date | undefined>(args.selected);
      return <DatePicker {...args} selected={selected} onSelect={day => setSelected(day)} disabledDates={{ after: new Date() }} />;
    };
    return <Component />;
  },
};

export default meta;
