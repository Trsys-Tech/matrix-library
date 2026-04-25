import { Meta } from "@storybook/react";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { Button } from "../button/Button";
import { TextField } from "../text-field/TextField";
import { Label } from "../label/Label";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
};

export const Default = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Toggle</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="start">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <TextField slotProps={{ inputProps: { id: "width", defaultValue: "200px" } }} className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <TextField slotProps={{ inputProps: { id: "maxWidth", defaultValue: "300px" } }} className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <TextField slotProps={{ inputProps: { id: "height", defaultValue: "25px" } }} className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <TextField slotProps={{ inputProps: { id: "maxHeight", defaultValue: "none" } }} className="col-span-2 h-8" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default meta;
