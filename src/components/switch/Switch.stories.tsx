import { Meta, StoryObj } from "@storybook/react/*";
import { Label } from "../label/Label";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
};

export const Default: StoryObj<typeof meta> = {
  render: () => {
    return (
      <div className="mtx-flex mtx-items-center mtx-gap-2">
        <Switch id="airplane-mode" size="sm" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
    );
  },
};

export const Sizes: StoryObj<typeof meta> = {
  render: () => {
    return (
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
    );
  },
};

export default meta;
