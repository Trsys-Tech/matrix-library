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
      <div className="mtx-grid mtx-grid-cols-2 mtx-gap-2 mtx-w-44">
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
