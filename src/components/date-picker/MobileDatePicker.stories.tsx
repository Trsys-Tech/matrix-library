import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { MobileDatePicker } from "./MobileDatePicker";

const meta: Meta<typeof MobileDatePicker> = {
  title: "Components/MobileDatePicker",
  component: MobileDatePicker,
  tags: ["autodocs"],
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
      return <MobileDatePicker {...args} selected={selected} onSelect={day => setSelected(day)} />;
    };
    return <Component />;
  },
};

export default meta;
