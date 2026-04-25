import { Meta } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";
import { Label } from "../label/Label";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
};

export const Default = {
  render: () => {
    return (
      <RadioGroup className="">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="option-one" id="option-one" />
          <Label htmlFor="option-one">Option One</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="option-two" id="option-two" />
          <Label htmlFor="option-two">Option Two</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="option-three" id="option-three" disabled />
          <Label htmlFor="option-three">Option Three</Label>
        </div>
      </RadioGroup>
    );
  },
};

export default meta;
