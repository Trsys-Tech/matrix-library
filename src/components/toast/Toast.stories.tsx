import { Meta } from "@storybook/react";

import { Toast } from "./Toast";
import { toast } from "./use-toast";
import { Button } from "../button/Button";

const meta = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toast>;

export const Variants = {
  parameters: {
    docs: {
      source: {
        code: `
<div className="h-96 flex flex-col justify-center items-start p-6 gap-2">
  <Button 
  className="w-36"
  onClick={() => {
    toast("This is a default toast.");
  }} variant="outline">
    Fire a default Toast
  </Button>
  <Button 
  className="w-36"
  onClick={() => {
    toast.success("This is a success toast.");
  }} variant="success">
    Fire a Success Toast
  </Button>
  <Button 
  className="w-36"
  onClick={() => {
    toast.danger("This is a danger toast.");
  }} variant="danger">
    Fire a Danger Toast
  </Button>
  <Button 
  className="w-36"
  onClick={() => {
    toast.warning("This is a warning toast.");
  }} variant="warning">
    Fire a Warning Toast
  </Button>
  <Button 
  className="w-36"
  onClick={() => {
    toast.info("This is an info toast.");
  }} variant="info">
    Fire an Info Toast
  </Button>
  <Toaster limit={3} duration={5000} />
</div>
        `,
      },
    },
  },
  render: ({ ...args }) => {
    return (
      <div className="h-96 flex flex-col justify-center items-start p-6 gap-2">
        <Button
          className="w-36"
          onClick={() => {
            toast("This is a default toast.");
          }}
          variant="outline"
        >
          Fire a default Toast
        </Button>
        <Button
          className="w-36"
          onClick={() => {
            toast.success("This is a success toast.");
          }}
          variant="success"
        >
          Fire a Success Toast
        </Button>
        <Button
          className="w-36"
          onClick={() => {
            toast.danger("This is a danger toast.");
          }}
          variant="danger"
        >
          Fire a Danger Toast
        </Button>
        <Button
          className="w-36"
          onClick={() => {
            toast.warning("This is a warning toast.");
          }}
          variant="warning"
        >
          Fire a Warning Toast
        </Button>
        <Button
          className="w-36"
          onClick={() => {
            toast.info("This is an info toast.");
          }}
          variant="info"
        >
          Fire an Info Toast
        </Button>
        <Toast {...args} />
      </div>
    );
  },
};

export default meta;
