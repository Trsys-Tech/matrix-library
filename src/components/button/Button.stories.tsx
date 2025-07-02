import { fn } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/react";
import { ChevronDown, Plus } from "@trsys-tech/matrix-icons";

import { Button } from "./Button";

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
    children: <span>Button</span>,
    asChild: false,
    loading: false,
  },
  render: props => <Button {...props} startIcon={<Plus />} endIcon={<ChevronDown className="w-4.5 h-4.5" />} />,
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
      <Button {...props} startIcon={<Plus />} endIcon={<ChevronDown className="w-4.5 h-4.5" />} />
      <Button {...props} variant="outline" startIcon={<Plus />} endIcon={<ChevronDown />} />
      <Button {...props} variant="text" startIcon={<Plus />} endIcon={<ChevronDown />} />
      <Button {...props} variant="danger" startIcon={<Plus />} endIcon={<ChevronDown />} />
      <Button {...props} variant="warning" startIcon={<Plus />} endIcon={<ChevronDown />} />
      <Button {...props} variant="success" startIcon={<Plus />} endIcon={<ChevronDown />} />
      <Button {...props} variant="info" startIcon={<Plus />} endIcon={<ChevronDown />} />
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
      <Button {...props} startIcon={<Plus />} endIcon={<ChevronDown className="w-4.5 h-4.5" />} />
      <Button {...props} variant="outline" startIcon={<Plus />} endIcon={<ChevronDown />} />
      <Button {...props} variant="text" startIcon={<Plus />} endIcon={<ChevronDown />} />
      <Button {...props} variant="danger" startIcon={<Plus />} endIcon={<ChevronDown />} />
      <Button {...props} variant="warning" startIcon={<Plus />} endIcon={<ChevronDown />} />
      <Button {...props} variant="success" startIcon={<Plus />} endIcon={<ChevronDown />} />
      <Button {...props} variant="info" startIcon={<Plus />} endIcon={<ChevronDown />} />
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
      <Button {...props} startIcon={<Plus />} endIcon={<ChevronDown className="w-4.5 h-4.5" />} />
      <Button {...props} variant="outline" startIcon={<Plus />} endIcon={<ChevronDown />} />
      <Button {...props} variant="text" startIcon={<Plus />} endIcon={<ChevronDown />} />
      <Button {...props} variant="danger" startIcon={<Plus />} endIcon={<ChevronDown />} />
      <Button {...props} variant="warning" startIcon={<Plus />} endIcon={<ChevronDown />} />
      <Button {...props} variant="success" startIcon={<Plus />} endIcon={<ChevronDown />} />
      <Button {...props} variant="info" startIcon={<Plus />} endIcon={<ChevronDown />} />
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
      <Button {...props} variant="primary-on-dark" startIcon={<Plus />} endIcon={<ChevronDown className="w-4.5 h-4.5" />} />
      <Button {...props} variant="outline-on-dark" startIcon={<Plus />} endIcon={<ChevronDown />} />
      <Button {...props} variant="text-on-dark" startIcon={<Plus />} endIcon={<ChevronDown />} />
      <Button {...props} variant="danger" startIcon={<Plus />} endIcon={<ChevronDown />} />
      <Button {...props} variant="warning" startIcon={<Plus />} endIcon={<ChevronDown />} />
      <Button {...props} variant="success" startIcon={<Plus />} endIcon={<ChevronDown />} />
      <Button {...props} variant="info" startIcon={<Plus />} endIcon={<ChevronDown />} />
    </div>
  ),
};

export default meta;
