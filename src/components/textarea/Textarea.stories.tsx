import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./Textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  args: {
    disabled: false,
  },
  argTypes: {
    disabled: {
      control: "boolean",
    },
    className: {
      control: false,
      description: "Additional classes to apply to the textarea.",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rows: 4,
    className: "mtx-w-full",
    value: "This is a text area",
    "aria-label": "Textarea",
  },
};

export const VoiceDictation: Story = {
  args: {
    rows: 4,
    voiceMode: true,
    placeholder: "Type or dictate a note",
    "aria-label": "Note",
  },
};

export default meta;
