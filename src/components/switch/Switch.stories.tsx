import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "../label/Label";
import { Switch } from "./Switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    size: "md",
    disabled: false,
  },
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
    size: {
      control: { type: "inline-radio" },
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
      description: "Whether the switch is disabled.",
    },
    onCheckedChange: {
      action: "checkedChange",
      description: "Event handler for when the switch is toggled.",
    },
  },
} satisfies Meta<typeof Switch>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <div className="mtx-flex mtx-items-center mtx-gap-2">
      <Switch {...args} id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div className="mtx-grid mtx-gap-2">
      <div className="mtx-flex mtx-items-center mtx-gap-2">
        <Switch id="small" size="sm" />
        <Label htmlFor="small">Small</Label>
      </div>
      <div className="mtx-flex mtx-items-center mtx-gap-2">
        <Switch id="medium" size="md" />
        <Label htmlFor="medium">Medium</Label>
      </div>
      <div className="mtx-flex mtx-items-center mtx-gap-2">
        <Switch id="large" size="lg" />
        <Label htmlFor="large">Large</Label>
      </div>
    </div>
  ),
};

export default meta;
