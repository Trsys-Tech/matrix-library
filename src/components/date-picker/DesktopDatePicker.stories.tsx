import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { DesktopDatePicker } from "./DesktopDatePicker";

const meta: Meta<typeof DesktopDatePicker> = {
  title: "Components/DesktopDatePicker",
  component: DesktopDatePicker,
  tags: ["autodocs"],
  args: {
    className: "mtx-w-72",
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
  },
} satisfies Meta<typeof DesktopDatePicker>;

export const Default: StoryObj<typeof meta> = {
  args: {
    selected: new Date(),
  },
  render: args => {
    const Component = () => {
      const [selected, setSelected] = React.useState<Date | undefined>(args.selected);
      return <DesktopDatePicker {...args} selected={selected} onSelect={day => setSelected(day)} startMonth={new Date(1970, 0, 1)} />;
    };
    return <Component />;
  },
  parameters: {
    docs: {
      source: {
        code: `const [selected, setSelected] = React.useState<Date | undefined>(new Date());
        
return <DesktopDatePicker selected={selected} onSelect={day => setSelected(day)} startMonth={new Date(1970, 0, 1)} />;`,
      },
    },
  },
};

export default meta;
