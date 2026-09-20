import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";

import { DrawerContent, DrawerMain, Drawer } from "./Drawer";
import { Button } from "../button/Button";

const meta = {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    open: false,
    anchor: "right",
    width: 240,
    className: "mtx-bg-gray-50",
  },
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
    __scopeDrawer: {
      table: {
        disable: true,
      },
    },
    anchor: {
      control: "inline-radio",
      options: ["left", "right"],
    },
    asChild: {
      table: {
        disable: true,
      },
    },
    onClose: {
      table: {
        disable: true,
      },
    },
    open: { control: "boolean" },
    width: {
      control: {
        type: "number",
        min: 160,
        step: 16,
      },
    },
  },
} satisfies Meta<typeof Drawer>;

type Story = StoryObj<typeof meta>;

const onClose = fn();

export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<NonNullable<Story["args"]>>();

    const handleClose = () => {
      onClose();
      updateArgs({ open: false });
    };

    return (
      <Drawer {...args} onClose={handleClose}>
        <DrawerMain asChild>
          <div className="mtx-flex mtx-h-96 mtx-items-center mtx-justify-center">
            <Button type="button" onClick={() => updateArgs({ open: !args.open })}>
              {args.open ? "Close Drawer" : "Open Drawer"}
            </Button>
          </div>
        </DrawerMain>
        <DrawerContent title="Add Details">
          <div className="mtx-flex mtx-h-full mtx-w-full mtx-flex-col mtx-items-center mtx-justify-center">This is the content</div>
        </DrawerContent>
      </Drawer>
    );
  },
};

export default meta;
