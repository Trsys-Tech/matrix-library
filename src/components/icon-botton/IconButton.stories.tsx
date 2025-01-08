import type { Meta, StoryObj } from "@storybook/react";

import { IconButton } from "./IconButton";
import { PlusIcon } from "../Icons/PlusIcon";

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof IconButton>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "table",
    children: <PlusIcon />,
    loading: false,
    disabled: false,
    asChild: false,
  },
};

export const Variants: Story = {
  args: {
    variant: "table",
    children: <PlusIcon />,
    asChild: false,
    loading: false,
  },
  render: props => (
    <div className="grid grid-cols-4 lg:grid-cols-7 gap-4 w-full lg:min-w-[600px]">
      <IconButton {...props} />
      <IconButton {...props} variant="toolbar" />
      <IconButton {...props} variant="form" />
      <IconButton {...props} variant="danger" />
      <IconButton {...props} variant="warning" />
      <IconButton {...props} variant="success" />
      <IconButton {...props} variant="info" />
    </div>
  ),
};

export const Large: Story = {
  args: {
    variant: "table",
    size: "lg",
    children: <PlusIcon />,
    asChild: false,
    loading: false,
  },
  render: props => (
    <div className="grid grid-cols-4 lg:grid-cols-7 gap-4 w-full lg:min-w-[600px]">
      <IconButton {...props} />
      <IconButton {...props} variant="toolbar" />
      <IconButton {...props} variant="form" />
      <IconButton {...props} variant="danger" />
      <IconButton {...props} variant="warning" />
      <IconButton {...props} variant="success" />
      <IconButton {...props} variant="info" />
    </div>
  ),
};

export const Small: Story = {
  args: {
    size: "sm",
    children: <PlusIcon />,
    asChild: false,
    loading: false,
  },
  render: props => (
    <div className="grid grid-cols-4 lg:grid-cols-7 gap-4 w-full lg:min-w-[600px]">
      <IconButton {...props} />
      <IconButton {...props} variant="toolbar" />
      <IconButton {...props} variant="form" />
      <IconButton {...props} variant="danger" />
      <IconButton {...props} variant="warning" />
      <IconButton {...props} variant="success" />
      <IconButton {...props} variant="info" />
    </div>
  ),
};

export default meta;
