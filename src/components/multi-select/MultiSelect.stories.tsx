import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";

import { MultiSelect } from "./MultiSelect";
import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";

const frameworksList = [
  { value: "react", label: "React", icon: Turtle },
  { value: "angular", label: "Angular", icon: Cat },
  { value: "vue", label: "Vue", icon: Dog },
  { value: "svelte", label: "Svelte", icon: Rabbit },
  { value: "ember", label: "Ember", icon: Fish },
];

const onValueChange = fn();

const meta = {
  title: "Components/MultiSelect",
  component: MultiSelect,
  parameters: {
    layout: "centered",
  },
  args: {
    disabled: false,
  },
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
    options: {
      control: false,
      table: {
        disable: true,
      },
    },
    value: {
      control: "object",
    },
    defaultValue: {
      control: "object",
    },
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
    showSelectAll: {
      control: "boolean",
    },
    addOptionOnSearchNotFound: {
      control: "boolean",
    },
    modalPopover: {
      control: "boolean",
    },
    maxCount: {
      control: "number",
    },
    onValueChange: {
      table: {
        disable: true,
      },
    },
    asChild: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MultiSelect>;

type Story = StoryObj<typeof meta>;

export const UnControlled: Story = {
  args: {
    options: frameworksList,
    placeholder: "Select your favorite frameworks",
    onValueChange,
    maxCount: 3,
    className: "mtx-w-96",
  },
};

export const AddOptionOnSearchNotFound: Story = {
  args: {
    options: frameworksList,
    placeholder: "Select your favorite frameworks",
    addOptionOnSearchNotFound: true,
    onValueChange,
    maxCount: 3,
    className: "mtx-w-96",
  },
};

export const Controlled: Story = {
  args: {
    options: frameworksList,
    value: [],
    onValueChange,
    placeholder: "Select your favorite frameworks",
    maxCount: 3,
    className: "mtx-w-96",
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<NonNullable<Story["args"]>>();

    return (
      <MultiSelect
        {...args}
        onValueChange={value => {
          onValueChange(value);
          updateArgs({ value });
        }}
      />
    );
  },
};

export default meta;
