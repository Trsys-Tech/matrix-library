import { Meta } from "@storybook/react/*";
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
      <PopoverContent className="mtx-w-72" align="start">
        <div className="mtx-grid mtx-gap-4">
          <div className="mtx-space-y-2">
            <h4 className="mtx-font-medium mtx-leading-none">Dimensions</h4>
            <p className="mtx-text-sm mtx-text-muted-foreground">Set the dimensions for the layer.</p>
          </div>
          <div className="mtx-grid mtx-gap-2">
            <div className="mtx-grid mtx-grid-cols-3 mtx-items-center mtx-gap-4">
              <Label htmlFor="width">Width</Label>
              <TextField slotProps={{ inputProps: { id: "width", defaultValue: "200px" } }} className="mtx-col-span-2 mtx-h-8" />
            </div>
            <div className="mtx-grid mtx-grid-cols-3 mtx-items-center mtx-gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <TextField slotProps={{ inputProps: { id: "maxWidth", defaultValue: "300px" } }} className="mtx-col-span-2 mtx-h-8" />
            </div>
            <div className="mtx-grid mtx-grid-cols-3 mtx-items-center mtx-gap-4">
              <Label htmlFor="height">Height</Label>
              <TextField slotProps={{ inputProps: { id: "height", defaultValue: "25px" } }} className="mtx-col-span-2 mtx-h-8" />
            </div>
            <div className="mtx-grid mtx-grid-cols-3 mtx-items-center mtx-gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <TextField slotProps={{ inputProps: { id: "maxHeight", defaultValue: "none" } }} className="mtx-col-span-2 mtx-h-8" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default meta;
