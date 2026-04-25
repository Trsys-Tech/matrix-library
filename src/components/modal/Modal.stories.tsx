import * as React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Modal, ModalFooter } from "./Modal";
import { Button } from "../button/Button";

const meta = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    slotProps: {
      table: {
        disable: true,
      },
    },
    title: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Modal>;

export const Default: StoryFn = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal title="Modal Title" open={open} onOpenChange={setOpen}>
        <div>
          <p className="text-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus, maiores! Voluptas, impedit asperiores necessitatibus dolor inventore odio
            exercitationem est id quia delectus expedita quis, fuga quod magnam neque laudantium. Enim!
          </p>
        </div>
        <ModalFooter>
          <Button className="w-28" variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button className="w-28" variant="success" onClick={() => setOpen(false)}>
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default meta;
