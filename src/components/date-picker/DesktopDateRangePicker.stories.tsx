import React from "react";
import { DateRange } from "react-day-picker";
import { Meta, StoryObj } from "@storybook/react/*";

import { DesktopDateRangePicker } from "./DesktopDateRangePicker";

const meta: Meta<typeof DesktopDateRangePicker> = {
  title: "Components/DesktopDateRangePicker",
  component: DesktopDateRangePicker,
  tags: ["autodocs"],
  args: {
    className: "mtx-w-72",
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
      return <DesktopDateRangePicker {...args} selected={selected} onSelect={setSelected} />;
    };
    return <Component />;
  },
};

export default meta;
