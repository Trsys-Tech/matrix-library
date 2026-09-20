import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { ConfirmProvider, useConfirm } from "./Confirm";
import { Button } from "../button/Button";

const meta = {
  title: "Components/Confirm",
  component: ConfirmProvider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof ConfirmProvider>;

type Story = StoryObj<typeof meta>;

const onConfirmed = fn();
const onCanceled = fn();

const ConfirmExample = () => {
  const confirm = useConfirm();
  const handleConfirm = () => {
    void confirm({ title: "Title", description: "Are you sure you want to do this?" }).then(onConfirmed).catch(onCanceled);
  };

  return (
    <Button type="button" onClick={handleConfirm}>
      Open Confirm
    </Button>
  );
};

export const Default: Story = {
  args: {
    children: null,
  },
  render: () => (
    <ConfirmProvider>
      <ConfirmExample />
    </ConfirmProvider>
  ),
};

export default meta;
