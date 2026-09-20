import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { useArgs } from "storybook/preview-api";

import { MobileDateRangePicker } from "./MobileDateRangePicker";

const meta = {
  title: "Components/MobileDateRangePicker",
  component: MobileDateRangePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    className: "mtx-w-72",
    selected: { from: "2025-12-24", to: "2025-12-31" },
  },
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
    selected: {
      control: "object",
    },
    calendarClassName: {
      table: {
        disable: true,
      },
    },
    disabled: { control: "boolean" },
    disabledDates: {
      control: false,
    },
  },
} satisfies Meta<typeof MobileDateRangePicker>;

type Story = StoryObj<typeof meta>;

const onSelect = fn();

export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<NonNullable<Story["args"]>>();

    return (
      <MobileDateRangePicker
        {...args}
        onSelect={range => {
          onSelect(range);
          updateArgs({ selected: range });
        }}
      />
    );
  },
};

export default meta;
