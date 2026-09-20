import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./Sheet";
import { Button } from "../button/Button";
import { Label } from "../label/Label";
import { TextField } from "../text-field/TextField";

const meta = {
  title: "Components/Sheet",
  component: Sheet,
  parameters: {
    layout: "centered",
  },
  args: {
    open: false,
  },
  argTypes: {
    defaultOpen: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sheet>;

type Story = StoryObj<typeof meta>;

const onOpenChange = fn();

export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<NonNullable<Story["args"]>>();

    const handleOpenChange = (open: boolean) => {
      onOpenChange(open);
      updateArgs({ open });
    };

    return (
      <Sheet {...args} onOpenChange={handleOpenChange}>
        <SheetTrigger asChild>
          <Button type="button" variant="outline">
            Open
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
          </SheetHeader>
          <div className="mtx-grid mtx-gap-4 mtx-py-4">
            <div className="mtx-grid mtx-grid-cols-4 mtx-items-center mtx-gap-4">
              <Label htmlFor="name" className="mtx-text-right">
                Name
              </Label>
              <TextField id="name" slotProps={{ inputProps: { defaultValue: "Pedro Duarte" } }} className="mtx-col-span-3" />
            </div>
            <div className="mtx-grid mtx-grid-cols-4 mtx-items-center mtx-gap-4">
              <Label htmlFor="username" className="mtx-text-right">
                Username
              </Label>
              <TextField id="username" slotProps={{ inputProps: { defaultValue: "@peduarte" } }} className="mtx-col-span-3" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="button">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
};

export default meta;
