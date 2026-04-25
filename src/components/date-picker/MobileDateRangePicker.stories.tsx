import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { DateRange } from "react-day-picker";
import { MobileDateRangePicker } from "./MobileDateRangePicker";

const meta: Meta<typeof MobileDateRangePicker> = {
  title: "Components/MobileDateRangePicker",
  component: MobileDateRangePicker,
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
      return <MobileDateRangePicker {...args} selected={selected} onSelect={setSelected} />;
    };
    return <Component />;
  },
};

export default meta;
