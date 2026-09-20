import { Plus } from "@trsys-tech/matrix-icons";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { IconButton } from "./IconButton";

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  args: {
    "aria-label": "Add item",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
    variant: {
      control: { type: "inline-radio" },
      options: ["table", "toolbar", "form", "danger", "warning", "success", "info"],
    },
    size: {
      control: { type: "inline-radio" },
      options: ["sm", "md", "lg"],
    },
    children: {
      control: false,
      description: "The icon is fixed in these stories so the button remains an icon-only control.",
    },
    loading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    asChild: {
      control: false,
      description: "Use the AsChild story when the icon button should render as another element.",
    },
  },
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

export const AsChild: Story = {
  args: {
    variant: "toolbar",
    children: <Plus aria-hidden="true" />,
    asChild: true,
    loading: false,
    "aria-label": "Add item",
  },
  render: ({ children, asChild, ...props }) => (
    <IconButton {...props} asChild={asChild}>
      <a href="#icon-button">{children}</a>
    </IconButton>
  ),
};

export default meta;
