import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";

import { Modal, ModalFooter } from "./Modal";
import { Button } from "../button/Button";

const meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  args: {
    open: false,
    fullScreen: false,
    title: "Modal Title",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
    open: {
      control: "boolean",
    },
    fullScreen: {
      control: "boolean",
    },
    title: {
      control: "text",
    },
    children: {
      control: false,
    },
    onOpenChange: {
      table: {
        disable: true,
      },
    },
    slotProps: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Modal>;

type Story = StoryObj<typeof meta>;

const onOpenChange = fn();

export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<NonNullable<Story["args"]>>();

    const setOpen = (open: boolean) => {
      onOpenChange(open);
      updateArgs({ open });
    };

    return (
      <>
        <Button type="button" onClick={() => setOpen(true)}>
          Open Modal
        </Button>
        <Modal {...args} onOpenChange={setOpen}>
          <div>
            <p className="mtx-text-sm">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus, maiores! Voluptas, impedit asperiores necessitatibus dolor inventore
              odio exercitationem est id quia delectus expedita quis, fuga quod magnam neque laudantium. Enim!
            </p>
          </div>
          <ModalFooter>
            <Button type="button" className="mtx-w-28" variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button type="button" className="mtx-w-28" variant="success" onClick={() => setOpen(false)}>
              Ok
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export default meta;
