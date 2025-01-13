import { Meta, StoryObj } from "@storybook/react/*";
import { MultiSelect } from "./MultiSelect";
import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";
import React from "react";

const meta: Meta<typeof MultiSelect> = {
  title: "Components/MultiSelect",
  component: MultiSelect,
  args: {
    disabled: false,
  },
  argTypes: {
    disabled: {
      control: {
        type: "boolean",
      },
    },
  },
  tags: ["autodocs"],
};

const frameworksList = [
  { value: "react", label: "React", icon: Turtle },
  { value: "angular", label: "Angular", icon: Cat },
  { value: "vue", label: "Vue", icon: Dog },
  { value: "svelte", label: "Svelte", icon: Rabbit },
  { value: "ember", label: "Ember", icon: Fish },
];

export const UnControlled: StoryObj<typeof meta> = {
  args: {
    disabled: false,
    options: frameworksList,
    placeholder: "Select your favorite frameworks",
    onValueChange: () => {},
    maxCount: 3,
    className: "w-96",
  },
};

export const Controlled = () => {
  const [value, setValue] = React.useState<string[]>(["react"]);
  return <MultiSelect options={frameworksList} value={value} onValueChange={setValue} placeholder="Select your favorite frameworks" maxCount={3} />;
};

export default meta;
