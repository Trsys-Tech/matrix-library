import React from "react";

import { cn } from "../../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/Popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "../command/Command";

const Combobox = Popover;
Combobox.displayName = "Combobox";

const ComboboxTrigger = PopoverTrigger;
ComboboxTrigger.displayName = "ComboboxTrigger";

const ComboboxContent = React.forwardRef<React.ElementRef<typeof PopoverContent>, React.ComponentPropsWithoutRef<typeof PopoverContent>>(
  ({ className, children, ...props }, ref) => {
    return (
      <PopoverContent ref={ref} className={cn("w-[200px] p-0", className)} {...props}>
        <Command>{children}</Command>
      </PopoverContent>
    );
  },
);

const ComboboxInput = CommandInput;
ComboboxInput.displayName = "ComboboxInput";

const ComboboxList = CommandList;
ComboboxList.displayName = "ComboboxList";

const ComboboxEmpty = CommandEmpty;
ComboboxEmpty.displayName = "ComboboxEmpty";

const ComboboxGroup = CommandGroup;
ComboboxGroup.displayName = "ComboboxGroup";

const ComboboxSeparator = CommandSeparator;
ComboboxSeparator.displayName = "ComboboxSeparator";

const ComboboxItem = CommandItem;
ComboboxItem.displayName = "ComboboxItem";

export { Combobox, ComboboxTrigger, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxList, ComboboxSeparator };
