"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Magnifier } from "@trsys-tech/matrix-icons";
import { type DialogProps } from "@radix-ui/react-dialog";

import { cn } from "../../lib/utils";
import { Dialog, DialogContent } from "../dialog/Dialog";

const Command = React.forwardRef<React.ElementRef<typeof CommandPrimitive>, React.ComponentPropsWithoutRef<typeof CommandPrimitive>>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive
      ref={ref}
      className={cn(
        "mtx-flex mtx-h-full mtx-w-full mtx-flex-col mtx-overflow-hidden mtx-rounded-md mtx-bg-popover mtx-text-popover-foreground",
        className,
      )}
      {...props}
    />
  ),
);
Command.displayName = CommandPrimitive.displayName;

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="mtx-overflow-hidden mtx-p-0">
        <Command className="[&_[cmdk-group-heading]]:mtx-px-2 [&_[cmdk-group-heading]]:mtx-font-medium [&_[cmdk-group-heading]]:mtx-text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:mtx-pt-0 [&_[cmdk-group]]:mtx-px-2 [&_[cmdk-input-wrapper]_svg]:mtx-h-5 [&_[cmdk-input-wrapper]_svg]:mtx-w-5 [&_[cmdk-input]]:mtx-h-12 [&_[cmdk-item]]:mtx-px-2 [&_[cmdk-item]]:mtx-py-3 [&_[cmdk-item]_svg]:mtx-h-5 [&_[cmdk-item]_svg]:mtx-w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<React.ElementRef<typeof CommandPrimitive.Input>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>>(
  ({ className, ...props }, ref) => (
    <div className="mtx-flex mtx-items-center mtx-border-b mtx-border-gray-200 mtx-px-3" cmdk-input-wrapper="">
      <Magnifier className="mtx-mr-2 mtx-h-4 mtx-w-4 mtx-shrink-0 mtx-opacity-50" />
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          "mtx-flex mtx-h-10 mtx-w-full mtx-rounded-md mtx-bg-transparent mtx-py-3 mtx-text-sm mtx-outline-none placeholder:mtx-text-muted-foreground disabled:mtx-cursor-not-allowed disabled:mtx-opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  ),
);

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<React.ElementRef<typeof CommandPrimitive.List>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.List ref={ref} className={cn("mtx-max-h-[300px] mtx-overflow-y-auto mtx-overflow-x-hidden", className)} {...props} />
  ),
);

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<React.ElementRef<typeof CommandPrimitive.Empty>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>>(
  (props, ref) => <CommandPrimitive.Empty ref={ref} className="mtx-py-6 mtx-text-center mtx-text-sm" {...props} />,
);

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<React.ElementRef<typeof CommandPrimitive.Group>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(
        "mtx-overflow-hidden mtx-p-1 mtx-text-foreground [&_[cmdk-group-heading]]:mtx-px-2 [&_[cmdk-group-heading]]:mtx-py-1.5 [&_[cmdk-group-heading]]:mtx-text-xs [&_[cmdk-group-heading]]:mtx-font-medium [&_[cmdk-group-heading]]:mtx-text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
);

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} className={cn("-mtx-mx-1 mtx-h-px mtx-bg-border", className)} {...props} />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  Omit<React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>, "value" | "onSelect"> & {
    value?: string | number;
    onSelect?: (value: string | number) => void;
  }
>(({ className, value, onSelect, ...props }, ref) => {
  const handleSelect = React.useCallback(
    (selectedValue: string) => {
      if (typeof value === "number") {
        onSelect?.(Number(selectedValue));
      } else {
        onSelect?.(selectedValue);
      }
    },
    [value, onSelect],
  );
  return (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        "mtx-relative mtx-flex mtx-cursor-default mtx-gap-2 mtx-select-none mtx-items-center mtx-rounded-sm mtx-px-2 mtx-py-1.5 mtx-text-sm mtx-outline-none data-[disabled=true]:mtx-pointer-events-none data-[selected=true]:mtx-bg-gray-300 data-[selected=true]:mtx-text-accent-foreground data-[disabled=true]:mtx-opacity-50 [&_svg]:mtx-pointer-events-none [&_svg]:mtx-size-4 [&_svg]:mtx-shrink-0",
        className,
      )}
      value={value !== undefined ? String(value) : undefined}
      onSelect={handleSelect}
      {...props}
    />
  );
});

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("mtx-ml-auto mtx-text-xs mtx-tracking-widest mtx-text-muted-foreground", className)} {...props} />;
};
CommandShortcut.displayName = "CommandShortcut";

export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator };
