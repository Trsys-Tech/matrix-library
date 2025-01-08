import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Button } from "./Button";
import { PlusIcon } from "../Icons/PlusIcon";
import { ChevronDownIcon } from "../Icons/ChevronDownIcon";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Button",
    asChild: false,
    loading: false,
  },
};

export const Variants: Story = {
  args: {
    variant: "primary",
    children: "Add New",
    asChild: false,
    loading: false,
  },
  render: props => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full lg:min-w-[600px]">
      <Button {...props} startIcon={<PlusIcon />} endIcon={<ChevronDownIcon className="w-4.5 h-4.5" />} />
      <Button {...props} variant="outline" startIcon={<PlusIcon />} endIcon={<ChevronDownIcon />} />
      <Button {...props} variant="text" startIcon={<PlusIcon />} endIcon={<ChevronDownIcon />} />
      <Button {...props} variant="danger" startIcon={<PlusIcon />} endIcon={<ChevronDownIcon />} />
      <Button {...props} variant="warning" startIcon={<PlusIcon />} endIcon={<ChevronDownIcon />} />
      <Button {...props} variant="success" startIcon={<PlusIcon />} endIcon={<ChevronDownIcon />} />
      <Button {...props} variant="info" startIcon={<PlusIcon />} endIcon={<ChevronDownIcon />} />
    </div>
  ),
};

export const Large: Story = {
  args: {
    variant: "primary",
    size: "lg",
    children: "Add New",
    asChild: false,
    loading: false,
  },
  render: props => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full lg:min-w-[650px]">
      <Button {...props} startIcon={<PlusIcon />} endIcon={<ChevronDownIcon className="w-4.5 h-4.5" />} />
      <Button {...props} variant="outline" startIcon={<PlusIcon />} endIcon={<ChevronDownIcon />} />
      <Button {...props} variant="text" startIcon={<PlusIcon />} endIcon={<ChevronDownIcon />} />
      <Button {...props} variant="danger" startIcon={<PlusIcon />} endIcon={<ChevronDownIcon />} />
      <Button {...props} variant="warning" startIcon={<PlusIcon />} endIcon={<ChevronDownIcon />} />
      <Button {...props} variant="success" startIcon={<PlusIcon />} endIcon={<ChevronDownIcon />} />
      <Button {...props} variant="info" startIcon={<PlusIcon />} endIcon={<ChevronDownIcon />} />
    </div>
  ),
};

export const Small: Story = {
  args: {
    variant: "primary",
    size: "sm",
    children: "Add New",
    asChild: false,
    loading: false,
  },
  render: props => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full lg:min-w-[650px]">
      <Button {...props} startIcon={<PlusIcon />} endIcon={<ChevronDownIcon className="w-4.5 h-4.5" />} />
      <Button {...props} variant="outline" startIcon={<PlusIcon />} endIcon={<ChevronDownIcon />} />
      <Button {...props} variant="text" startIcon={<PlusIcon />} endIcon={<ChevronDownIcon />} />
      <Button {...props} variant="danger" startIcon={<PlusIcon />} endIcon={<ChevronDownIcon />} />
      <Button {...props} variant="warning" startIcon={<PlusIcon />} endIcon={<ChevronDownIcon />} />
      <Button {...props} variant="success" startIcon={<PlusIcon />} endIcon={<ChevronDownIcon />} />
      <Button {...props} variant="info" startIcon={<PlusIcon />} endIcon={<ChevronDownIcon />} />
    </div>
  ),
};

export const OnDark: Story = {
  args: {
    variant: "primary",
    children: "Add New",
    asChild: false,
    loading: false,
  },
  render: props => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full lg:min-w-[650px] bg-gray-400 p-4">
      <Button {...props} variant="primaryOnDark" startIcon={<PlusIcon />} endIcon={<ChevronDownIcon className="w-4.5 h-4.5" />} />
      <Button {...props} variant="outlineOnDark" startIcon={<PlusIcon />} endIcon={<ChevronDownIcon />} />
      <Button {...props} variant="textOnDark" startIcon={<PlusIcon />} endIcon={<ChevronDownIcon />} />
      <Button {...props} variant="danger" startIcon={<PlusIcon />} endIcon={<ChevronDownIcon />} />
      <Button {...props} variant="warning" startIcon={<PlusIcon />} endIcon={<ChevronDownIcon />} />
      <Button {...props} variant="success" startIcon={<PlusIcon />} endIcon={<ChevronDownIcon />} />
      <Button {...props} variant="info" startIcon={<PlusIcon />} endIcon={<ChevronDownIcon />} />
    </div>
  ),
};

export default meta;
