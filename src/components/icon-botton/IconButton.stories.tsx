import { Plus } from "@trsys-tech/matrix-icons";
import type { Meta, StoryObj } from "@storybook/react";

import { IconButton } from "./IconButton";

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
    children: <Plus />,
    loading: false,
    disabled: false,
    asChild: false,
  },
};

export const Variants: Story = {
  args: {
    variant: "table",
    children: <Plus />,
    asChild: false,
    loading: false,
  },
  render: props => (
    <div className="mtx-grid mtx-grid-cols-4 lg:mtx-grid-cols-7 mtx-gap-4 mtx-w-full lg:mtx-min-w-[600px]">
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
    children: <Plus />,
    asChild: false,
    loading: false,
  },
  render: props => (
    <div className="mtx-grid mtx-grid-cols-4 lg:mtx-grid-cols-7 mtx-gap-4 mtx-w-full lg:mtx-min-w-[600px]">
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
    children: <Plus />,
    asChild: false,
    loading: false,
  },
  render: props => (
    <div className="mtx-grid mtx-grid-cols-4 lg:mtx-grid-cols-7 mtx-gap-4 mtx-w-full lg:mtx-min-w-[600px]">
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
