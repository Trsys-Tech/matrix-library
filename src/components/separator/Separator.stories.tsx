import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "./Separator";

const meta = {
  title: "Components/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
    orientation: {
      control: false,
      description: "The orientation of the separator, either horizontal or vertical.",
      table: {
        type: { summary: "horizontal | vertical" },
      },
    },
    decorative: {
      description: "Indicates whether the separator is purely decorative or not.",
      control: false,
      table: {
        type: { summary: "boolean" },
      },
    },
  },
} satisfies Meta<typeof Separator>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <div className="mtx-space-y-1">
        <h4 className="mtx-text-sm mtx-font-medium mtx-leading-none">UI Components</h4>
        <p className="mtx-text-sm mtx-text-muted-foreground">A UI component library.</p>
      </div>
      <Separator className="mtx-my-4" />
      <div className="mtx-flex mtx-h-5 mtx-items-center mtx-space-x-4 mtx-text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
};

export default meta;
