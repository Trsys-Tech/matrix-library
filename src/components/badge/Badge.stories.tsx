import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    variant: "primary",
    size: "md",
    children: "Badge",
  },
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
    variant: {
      control: { type: "inline-radio" },
      options: ["primary", "outline"],
    },
    size: {
      control: { type: "inline-radio" },
      options: ["sm", "md", "lg"],
    },
    children: {
      control: "text",
    },
    asChild: {
      control: false,
      description: "Use the AsChild story when the badge should render as another element.",
    },
  },
} satisfies Meta<typeof Badge>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
  },
};

export const Variants: Story = {
  args: {
    variant: "primary",
  },
  render: props => (
    <div className="mtx-space-x-2">
      <Badge {...props} />
      <Badge {...props} variant="outline" />
    </div>
  ),
};

export const Large: Story = {
  args: {
    variant: "primary",
    size: "lg",
  },
  render: props => (
    <div className="mtx-space-x-2">
      <Badge {...props} />
      <Badge {...props} variant="outline" />
    </div>
  ),
};

export const Small: Story = {
  args: {
    variant: "primary",
    size: "sm",
  },
  render: props => (
    <div className="mtx-space-x-2">
      <Badge {...props} />
      <Badge {...props} variant="outline" />
    </div>
  ),
};

export const AsChild: Story = {
  args: {
    asChild: true,
  },
  render: ({ children, asChild, ...props }) => (
    <Badge {...props} asChild={asChild}>
      <a href="#badge">{children}</a>
    </Badge>
  ),
};

export default meta;
