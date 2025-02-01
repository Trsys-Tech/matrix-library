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
          "group flex h-8 w-full items-center justify-between whitespace-nowrap rounded-sm border border-input bg-transparent px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-none [&>span]:line-clamp-1 [&_svg]:disabled:text-text-300",
          className,
        )}
        data-value={value}
        {...props}
      >
        {children}
        <div className="flex items-center gap-2">
          {clearable && value ? (
            <SelectPrimitive.Icon asChild onPointerDown={handlePointerDown} onClickCapture={onClear}>
              <XMark className="h-4.5 w-4.5" />
            </SelectPrimitive.Icon>
          ) : null}
          <SelectPrimitive.Icon asChild>
            <ChevronDown className="h-4.5 w-4.5 text-primary group-data-[state=open]:rotate-180 transition-transform" />
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
  <SelectPrimitive.ScrollUpButton ref={ref} className={cn("flex cursor-default items-center justify-center py-1", className)} {...props}>
    <ChevronUp />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
type SelectScrollUpButtonProps = React.ComponentProps<typeof SelectScrollUpButton>;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton ref={ref} className={cn("flex cursor-default items-center justify-center py-1", className)} {...props}>
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
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1 max-h-[--radix-select-content-available-height]",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]")}
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
  ({ className, ...props }, ref) => <SelectPrimitive.Label ref={ref} className={cn("px-2 py-1.5 text-sm font-semibold", className)} {...props} />,
);
SelectLabel.displayName = SelectPrimitive.Label.displayName;
type SelectLabelProps = React.ComponentProps<typeof SelectLabel>;

const SelectItem = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Item>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>>(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-gray-200 data-[active=true]:bg-gray-300 data-[active=true]:font-bold data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
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
>(({ className, ...props }, ref) => <SelectPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />);
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
