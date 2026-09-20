import type { Meta, StoryObj } from "@storybook/react-vite";

import { Toast } from "./Toast";
import { toast } from "./use-toast";
import { Button } from "../button/Button";

const meta = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    limit: 3,
    duration: 5000,
  },
  tags: ["autodocs"],
  argTypes: {
    slotProps: {
      description: "Props to pass to the slot components.",
      control: false,
      table: {
        type: { summary: "object" },
      },
    },
  },
} satisfies Meta<typeof Toast>;

type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<div className="mtx-h-96 mtx-flex mtx-flex-col mtx-justify-center mtx-items-start mtx-p-6 mtx-gap-2">
<Button type="button"
  className="mtx-w-36"
  onClick={() => {
    toast("This is a default toast.");
  }} variant="outline">
    Fire a default Toast
  </Button>
<Button type="button"
  className="mtx-w-36"
  onClick={() => {
    toast.success("This is a success toast.");
  }} variant="success">
    Fire a Success Toast
  </Button>
<Button type="button"
  className="mtx-w-36"
  onClick={() => {
    toast.danger("This is a danger toast.");
  }} variant="danger">
    Fire a Danger Toast
  </Button>
<Button type="button"
  className="mtx-w-36"
  onClick={() => {
    toast.warning("This is a warning toast.");
  }} variant="warning">
    Fire a Warning Toast
  </Button>
<Button type="button"
  className="mtx-w-36"
  onClick={() => {
    toast.info("This is an info toast.");
  }} variant="info">
    Fire an Info Toast
  </Button>
  <Toast limit={3} duration={5000} />
</div>
        `,
      },
    },
  },
  render: args => (
    <div className="mtx-h-96 mtx-flex mtx-flex-col mtx-justify-center mtx-items-start mtx-p-6 mtx-gap-2">
      <Button
        type="button"
        className="mtx-w-36"
        onClick={() => {
          toast("This is a default toast.");
        }}
        variant="outline"
      >
        Fire a default Toast
      </Button>
      <Button
        type="button"
        className="mtx-w-36"
        onClick={() => {
          toast.success("This is a success toast.");
        }}
        variant="success"
      >
        Fire a Success Toast
      </Button>
      <Button
        type="button"
        className="mtx-w-36"
        onClick={() => {
          toast.danger("This is a danger toast.");
        }}
        variant="danger"
      >
        Fire a Danger Toast
      </Button>
      <Button
        type="button"
        className="mtx-w-36"
        onClick={() => {
          toast.warning("This is a warning toast.");
        }}
        variant="warning"
      >
        Fire a Warning Toast
      </Button>
      <Button
        type="button"
        className="mtx-w-36"
        onClick={() => {
          toast.info("This is an info toast.");
        }}
        variant="info"
      >
        Fire an Info Toast
      </Button>
      <Toast {...args} />
    </div>
  ),
};

export default meta;
