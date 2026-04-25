import * as React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { DrawerContent, DrawerMain, Drawer } from "./Drawer";
import { cn } from "../../lib/utils";
import { Button } from "../button/Button";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  args: {
    open: true,
  },
  argTypes: {
    __scopeDrawer: {
      table: {
        disable: true,
      },
    },
  },
};

export const Default: StoryFn<typeof Drawer> = () => {
  const [open, setOpen] = React.useState(false);
  const width = 240;

  return (
    <Drawer open={open} onClose={() => setOpen(false)} width={width} anchor="right" className="bg-gray-50">
      <DrawerMain asChild>
        <div className={cn("flex items-center justify-center h-96")}>
          <Button onClick={() => setOpen(prev => !prev)}>Toggle Drawer</Button>
        </div>
      </DrawerMain>
      <DrawerContent title="Add Details">
        <div className={cn("flex flex-col items-center justify-center h-full w-full")}>This is the content</div>
      </DrawerContent>
    </Drawer>
  );
};

export default meta;
