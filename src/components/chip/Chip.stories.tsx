import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { Chip } from "./Chip";

const meta = {
  title: "Components/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
    variant: {
      control: { type: "inline-radio" },
      options: ["primary", "neutral", "table-primary", "table-neutral"],
    },
    size: {
      control: { type: "inline-radio" },
      options: ["sm", "md", "lg"],
    },
    children: {
      control: "text",
    },
    disabled: {
      control: false,
      table: {
        disable: true,
      },
      description: "Chip renders a span by default and does not provide a disabled state.",
    },
    onClose: {
      control: false,
      table: {
        disable: true,
      },
    },
    asChild: {
      control: false,
      description: "Use the AsChild story when the chip should render as another element.",
    },
  },
} satisfies Meta<typeof Chip>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Chips",
  },
};

export const Variants: Story = {
  args: {
    variant: "primary",
    children: "Chips component",
  },
  render: props => (
    <div className="mtx-space-x-2">
      <Chip {...props} />
      <Chip {...props} variant="neutral" />
      <Chip {...props} variant="table-primary" />
      <Chip {...props} variant="table-neutral" />
    </div>
  ),
};

export const WithCloseButton: Story = {
  args: {
    variant: "primary",
    children: "Chips component",
    onClose: fn(),
  },
  render: props => (
    <div className="mtx-space-x-2">
      <Chip {...props} />
      <Chip {...props} variant="neutral" />
      <Chip {...props} variant="table-primary" />
      <Chip {...props} variant="table-neutral" />
    </div>
  ),
};

export const Large: Story = {
  args: {
    variant: "primary",
    children: "Chips component",
    size: "lg",
    onClose: fn(),
  },
  render: props => (
    <div className="mtx-space-x-2">
      <Chip {...props} />
      <Chip {...props} variant="neutral" />
      <Chip {...props} variant="table-primary" />
      <Chip {...props} variant="table-neutral" />
    </div>
  ),
};

export const Small: Story = {
  args: {
    variant: "primary",
    children: "Chips component",
    size: "sm",
    onClose: fn(),
  },
  render: props => (
    <div className="mtx-space-x-2">
      <Chip {...props} />
      <Chip {...props} variant="neutral" />
      <Chip {...props} variant="table-primary" />
      <Chip {...props} variant="table-neutral" />
    </div>
  ),
};

export const AsChild: Story = {
  args: {
    variant: "primary",
    children: "Clickable chip",
    asChild: true,
  },
  render: ({ children, asChild, ...props }) => (
    <Chip {...props} asChild={asChild}>
      <a href="#chip">{children}</a>
    </Chip>
  ),
};

export default meta;
