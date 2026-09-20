import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { useArgs } from "storybook/preview-api";

import { DesktopDatePicker } from "./DesktopDatePicker";

const meta = {
  title: "Components/DesktopDatePicker",
  component: DesktopDatePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    className: "mtx-w-72",
    closeOnSelect: true,
    selected: "2025-12-24",
  },
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
    calendarClassName: {
      table: {
        disable: true,
      },
    },
    disabled: { control: "boolean" },
    disabledDates: {
      control: false,
      description: "Dates after today are disabled in this example.",
    },
  },
} satisfies Meta<typeof DesktopDatePicker>;

type Story = StoryObj<typeof meta>;

const onSelect = fn();

export const Default: Story = {
  args: {
    disabledDates: { after: new Date() },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<NonNullable<Story["args"]>>();

    return (
      <DesktopDatePicker
        {...args}
        onSelect={day => {
          onSelect(day);
          updateArgs({ selected: day });
        }}
      />
    );
  },
};

export default meta;
