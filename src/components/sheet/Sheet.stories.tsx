import { Meta, StoryObj } from "@storybook/react/*";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./Sheet";
import { Button } from "../button/Button";
import { Label } from "../label/Label";
import { TextField } from "../text-field/TextField";

const meta: Meta<typeof Sheet> = {
  title: "Components/Sheet",
  component: Sheet,
  tags: ["autodocs"],
};

export const Default: StoryObj<typeof meta> = {
  render: () => {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open</Button>
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
              <TextField id="name" slotProps={{ inputProps: { value: "Pedro Duarte" } }} className="mtx-col-span-3" />
            </div>
            <div className="mtx-grid mtx-grid-cols-4 mtx-items-center mtx-gap-4">
              <Label htmlFor="username" className="mtx-text-right">
                Username
              </Label>
              <TextField id="username" slotProps={{ inputProps: { value: "@peduarte" } }} className="mtx-col-span-3" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
};

export default meta;
