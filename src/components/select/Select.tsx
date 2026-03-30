"use client";

import * as React from "react";
import { Check, ChevronDown, ChevronUp, XMark } from "@trsys-tech/matrix-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import type { SelectValueProps, SelectGroupProps } from "@radix-ui/react-select";

import { cn } from "../../lib/utils";

type ClearSelectContextValue = {
  onClear: () => void;
  value: string | undefined;
};

const SelectContext = React.createContext<ClearSelectContextValue>({ onClear: () => {}, value: undefined });

const Select = ({ onValueChange, value, ...props }: SelectPrimitive.SelectProps) => {
  const onClear = () => {
    onValueChange?.("");
  };

  return (
    <SelectContext.Provider value={{ onClear, value }}>
      <SelectPrimitive.Root {...props} value={value} onValueChange={onValueChange} />
    </SelectContext.Provider>
  );
};
Select.displayName = SelectPrimitive.Root.displayName;
type SelectProps = React.ComponentProps<typeof Select>;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

type SelectTriggerProps = React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  clearable?: boolean;
};

const SelectTrigger = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Trigger>, SelectTriggerProps>(
  ({ className, children, clearable, ...props }: SelectTriggerProps, ref) => {
    const { onClear, value } = React.useContext(SelectContext);

    const handlePointerDown = (e: React.PointerEvent) => {
      e.stopPropagation();
    };

    return (
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
          "mtx-group mtx-flex mtx-h-8 mtx-w-full mtx-items-center mtx-justify-between mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-px-3 mtx-py-2 mtx-text-xs mtx-ring-offset-background data-[placeholder]:mtx-text-muted-foreground hover:mtx-border hover:mtx-border-primary focus:mtx-border focus:mtx-border-primary focus:mtx-outline-none focus:mtx-ring focus:mtx-ring-primary-100 disabled:mtx-cursor-not-allowed disabled:mtx-bg-gray-100 disabled:mtx-text-text-300 disabled:mtx-border-none [&>span]:mtx-line-clamp-1 [&_svg]:disabled:mtx-text-text-300",
          className,
        )}
        data-value={value}
        {...props}
      >
        {children}
        <div className="mtx-flex mtx-items-center mtx-gap-2">
          {clearable && value ? (
            <SelectPrimitive.Icon asChild onPointerDown={handlePointerDown} onClickCapture={onClear}>
              <XMark className="mtx-h-4.5 mtx-w-4.5" />
            </SelectPrimitive.Icon>
          ) : null}
          <SelectPrimitive.Icon asChild>
            <ChevronDown className="mtx-h-4.5 mtx-w-4.5 mtx-text-primary group-data-[state=open]:mtx-rotate-180 mtx-transition-transform" />
          </SelectPrimitive.Icon>
        </div>
      </SelectPrimitive.Trigger>
    );
  },
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
// type SelectTriggerProps = React.ComponentProps<typeof SelectTrigger>;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("mtx-flex mtx-cursor-default mtx-items-center mtx-justify-center mtx-py-1", className)}
    {...props}
  >
    <ChevronUp />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
type SelectScrollUpButtonProps = React.ComponentProps<typeof SelectScrollUpButton>;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("mtx-flex mtx-cursor-default mtx-items-center mtx-justify-center mtx-py-1", className)}
    {...props}
  >
    <ChevronDown />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
type SelectScrollDownButtonProps = React.ComponentProps<typeof SelectScrollDownButton>;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "mtx-relative mtx-z-50 mtx-max-h-96 mtx-min-w-[8rem] mtx-overflow-hidden mtx-rounded-md mtx-border mtx-bg-popover mtx-text-popover-foreground mtx-shadow-md data-[state=open]:mtx-animate-in data-[state=closed]:mtx-animate-out data-[state=closed]:mtx-fade-out-0 data-[state=open]:mtx-fade-in-0 data-[state=closed]:mtx-zoom-out-95 data-[state=open]:mtx-zoom-in-95 data-[side=bottom]:mtx-slide-in-from-top-2 data-[side=left]:mtx-slide-in-from-right-2 data-[side=right]:mtx-slide-in-from-left-2 data-[side=top]:mtx-slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:mtx-translate-y-1 data-[side=left]:-mtx-translate-x-1 data-[side=right]:mtx-translate-x-1 data-[side=top]:-mtx-translate-y-1 mtx-max-h-[--radix-select-content-available-height]",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "mtx-p-1",
          position === "popper" && "mtx-h-[var(--radix-select-trigger-height)] mtx-w-full mtx-min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;
type SelectContentProps = React.ComponentProps<typeof SelectContent>;

const SelectLabel = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Label>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>>(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.Label ref={ref} className={cn("mtx-px-2 mtx-py-1.5 mtx-text-xs mtx-font-semibold", className)} {...props} />
  ),
);
SelectLabel.displayName = SelectPrimitive.Label.displayName;
type SelectLabelProps = React.ComponentProps<typeof SelectLabel>;

const SelectItem = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Item>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>>(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "mtx-relative mtx-flex mtx-w-full mtx-cursor-default mtx-select-none mtx-items-center mtx-rounded-sm mtx-py-1.5 mtx-pl-2 mtx-pr-8 mtx-text-xs mtx-outline-none focus:mtx-bg-gray-200 data-[active=true]:mtx-bg-gray-300 data-[active=true]:mtx-font-bold data-[disabled]:mtx-pointer-events-none data-[disabled]:mtx-opacity-50",
        className,
      )}
      {...props}
    >
      <span className="mtx-absolute mtx-right-2 mtx-flex mtx-h-3.5 mtx-w-3.5 mtx-items-center mtx-justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="mtx-h-4 mtx-w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  ),
);
SelectItem.displayName = SelectPrimitive.Item.displayName;
type SelectItemProps = React.ComponentProps<typeof SelectItem>;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn("-mtx-mx-1 mtx-my-1 mtx-h-px mtx-bg-muted", className)} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
type SelectSeparatorProps = React.ComponentProps<typeof SelectSeparator>;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  type SelectProps,
  type SelectGroupProps,
  type SelectValueProps,
  type SelectTriggerProps,
  type SelectContentProps,
  type SelectLabelProps,
  type SelectItemProps,
  type SelectSeparatorProps,
  type SelectScrollUpButtonProps,
  type SelectScrollDownButtonProps,
};
