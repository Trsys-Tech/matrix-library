import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";
import { Label } from "../label/Label";

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: "option-one",
    "aria-label": "Options",
  },
  render: args => (
    <RadioGroup {...args}>
      <div className="mtx-flex mtx-items-center mtx-gap-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="mtx-flex mtx-items-center mtx-gap-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
      <div className="mtx-flex mtx-items-center mtx-gap-2">
        <RadioGroupItem value="option-three" id="option-three" disabled />
        <Label htmlFor="option-three">Option Three</Label>
      </div>
    </RadioGroup>
  ),
};

export default meta;
