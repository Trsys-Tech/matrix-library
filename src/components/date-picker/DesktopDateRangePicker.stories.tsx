import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { DesktopDateRangePicker } from "./DesktopDateRangePicker";

const meta: Meta<typeof DesktopDateRangePicker> = {
  title: "Components/DesktopDateRangePicker",
  component: DesktopDateRangePicker,
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
      const [selected, setSelected] = React.useState<{ from?: string; to?: string } | undefined>({ from: "2025-12-24", to: "2025-12-31" });
      return <DesktopDateRangePicker {...args} selected={selected} onSelect={setSelected} />;
    };
    return <Component />;
  },
};

export default meta;
