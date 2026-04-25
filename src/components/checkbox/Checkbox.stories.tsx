import { StoryObj, Meta } from "@storybook/react";

import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },
};

export const Default: StoryObj<typeof meta> = {};

export const States: StoryObj<typeof meta> = {
  render: () => {
    return (
      <div className="grid grid-cols-2 gap-2 w-44">
        <Checkbox checked={false} />
        <Checkbox checked={false} disabled />
        <Checkbox checked />
        <Checkbox checked disabled />
        <Checkbox checked="indeterminate" />
        <Checkbox checked="indeterminate" disabled />
      </div>
    );
  },
};

export default meta;
