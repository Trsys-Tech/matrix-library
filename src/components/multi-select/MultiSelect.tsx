"use client";

import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { Check, ChevronDown, CircleXmark, XMark } from "@trsys-tech/matrix-icons";

import { cn } from "../../lib/utils";
import { Badge } from "../badge/Badge";
import { Button } from "../button/Button";
import { Separator } from "../separator/Separator";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/Popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "../command/Command";

/**
 * Variants for the multi-select component to handle different styles.
 * Uses tailwind-variants (cva) to define different styles based on "variant" prop.
 */
const multiSelectVariants = tv({
  base: "flex gap-1 items-center py-0.5 px-2 rounded-xl",
  variants: {
    variant: {
      default: "border-none shadow-none bg-primary-50 text-primary hover:bg-primary-50",
      secondary: "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      inverted: "inverted",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps<T extends string | number>
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value" | "defaultValue">,
    VariantProps<typeof multiSelectVariants> {
  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   *
   * *Important: Use a constant Array*
   */
  options: {
    /** The text to display for the option. */
    label: string;
    /** The unique value associated with the option. */
    value: T;
    /** Optional icon component to display alongside the option. */
    icon?: React.ComponentType<{ className?: string }>;
  }[];

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange: (value: T[]) => void;

  /**
   * selected values in the multi-select component.
   */
  value?: T[];

  /** The default selected values when the component mounts. */
  defaultValue?: T[];

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string;

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number;

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean;

  /**
   * If true, renders the multi-select component as a child of another component.
   * Optional, defaults to false.
   */
  asChild?: boolean;

  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string;

  /**
   * Text to display on the close button when the multi-select component is open.
   */
  closeText?: string;

  /**
   * Whether to show the select all option or not
   */
  showSelectAll?: boolean;

  /**
   * Text to display on the select all button when the multi-select component is open.
   */
  selectAllText?: string;

  /**
   * Text to display in the search input.
   */
  searchText?: string;

  /**
   * If true, a new option will be added when the user submits a search query if it doesn't already exist.
   * Optional, defaults to false.
   */
  addOptionOnSearchNotFound?: boolean;

  /**
   * Text to display on the clear button when the multi-select component is open.
   */
  clearText?: string;

  /**
   * Text to display on the more button when the multi-select component is open.
   */
  moreText?: string;

  /**
   * Text to display when no results are found in the search input.
   */
  noResultsText?: string;

  /**
   * If true, the multi-select component will be in a loading state.
   */
  loading?: boolean;

  /**
   * Text to display when the multi-select component is in a loading state.
   */
  loadingText?: string;
}

const MultiSelect = <T extends string | number>(
  {
    options: _options,
    onValueChange,
    value,
    variant,
    disabled,
    defaultValue = [],
    placeholder = "Select options",
    maxCount = 3,
    modalPopover = false,
    // asChild = false,
    className,
    moreText = "more",
    clearText = "Clear",
    closeText = "Close",
    selectAllText = "Select All",
    noResultsText = "No results found.",
    searchText = "Search...",
    addOptionOnSearchNotFound = false,
    showSelectAll = true,
    loading,
    loadingText = "Loading...",
    ...props
  }: MultiSelectProps<T>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) => {
  const [selectedValues, setSelectedValues] = React.useState<T[]>(defaultValue ?? value);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [isWrapped, setIsWrapped] = React.useState(false);
  const [options, setOptions] = React.useState<Map<T, MultiSelectProps<T>["options"][number]>>(
    new Map(_options.map(option => [option.value, option])),
  );

  const handleInputKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && addOptionOnSearchNotFound) {
        setIsPopoverOpen(true);
        event.preventDefault();
        event.stopPropagation();
        if (!event.currentTarget.value) return;
        const newOption = { value: event.currentTarget.value as T, label: event.currentTarget.value };
        if (options.get(newOption.value) === undefined) {
          setOptions(prev => {
            return new Map(prev).set(newOption.value, newOption);
          });
          const newSelectedValues = [...selectedValues, newOption.value];
          setSelectedValues(newSelectedValues);
          onValueChange(newSelectedValues);
          setSearchValue("");
        }
      } else if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    },
    [addOptionOnSearchNotFound, onValueChange, options, selectedValues],
  );

  const toggleOption = React.useCallback(
    (option: T) => {
      const newSelectedValues = selectedValues.includes(option) ? selectedValues.filter(value => value !== option) : [...selectedValues, option];
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    },
    [onValueChange, selectedValues],
  );

  const handleClear = React.useCallback(() => {
    setSelectedValues([]);
    onValueChange([]);
    if (addOptionOnSearchNotFound) {
      setOptions(new Map(_options.map(option => [option.value, option])));
    }
  }, [onValueChange, addOptionOnSearchNotFound, _options]);

  const handleTogglePopover = React.useCallback(() => {
    setIsPopoverOpen(prev => !prev);
  }, []);

  const clearExtraOptions = React.useCallback(() => {
    const newSelectedValues = selectedValues.slice(0, maxCount);
    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
  }, [maxCount, selectedValues, onValueChange]);

  const toggleAll = React.useCallback(() => {
    if (selectedValues.length === options.size) {
      handleClear();
    } else {
      const allValues = Array.from(options.keys());
      setSelectedValues(allValues);
      onValueChange(allValues);
    }
  }, [handleClear, onValueChange, options, selectedValues.length]);

  React.useEffect(() => {
    setOptions(new Map(_options.map(option => [option.value, option])));
  }, [_options]);

  React.useEffect(() => {
    setSelectedValues(value ?? []);
  }, [value]);

  React.useLayoutEffect(() => {
    if (containerRef.current) {
      if ((containerRef?.current?.firstChild as HTMLElement)?.offsetTop < (containerRef?.current?.lastChild as HTMLElement)?.offsetTop) {
        setIsWrapped(true);
      } else {
        setIsWrapped(false);
      }
    }
  }, [selectedValues]);

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={modalPopover}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant="text"
          loading={loading}
          disabled={disabled}
          {...props}
          onClick={handleTogglePopover}
          className={cn(
            "group flex max-h-14 h-8 w-full items-center justify-between whitespace-nowrap rounded-sm border border-input bg-transparent px-3 py-1.5 text-sm ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-gray-100 [&>span]:line-clamp-1 [&_svg]:disabled:text-text-300",
            isWrapped && "h-auto",
            className,
          )}
          data-placeholder={!selectedValues.length ? "" : undefined}
          endIcon={
            <ChevronDown
              role="button"
              aria-label="Expand dropdown"
              className="!h-4.5 !w-4.5 cursor-pointer group-data-[state=open]:rotate-180 transition-transform"
            />
          }
        >
          <>
            {selectedValues.length > 0 ? (
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-wrap items-center gap-2" ref={containerRef}>
                  {selectedValues.slice(0, maxCount).map(value => {
                    const option = options.get(value);
                    const IconComponent = option?.icon;
                    return (
                      <Badge key={value} className={cn(multiSelectVariants({ variant }), { "text-gray-400 bg-gray-200": disabled || loading })}>
                        <XMark
                          className="h-4 w-4 cursor-pointer"
                          onClick={event => {
                            event.stopPropagation();
                            toggleOption(value);
                          }}
                        />
                        {IconComponent && <IconComponent className="h-4 w-4 mr-2" />}
                        {option?.label}
                      </Badge>
                    );
                  })}
                  {selectedValues.length > maxCount && (
                    <Badge className={cn(multiSelectVariants({ variant }))}>
                      {`+ ${selectedValues.length - maxCount} ${moreText}`}
                      <CircleXmark
                        role="button"
                        className="ml-2 h-4.5 w-4.5 cursor-pointer"
                        onClick={event => {
                          event.stopPropagation();
                          clearExtraOptions();
                        }}
                      />
                    </Badge>
                  )}
                  {loading && loadingText ? loadingText : null}
                </div>
                <div className="flex items-center justify-between gap-1">
                  <XMark
                    role="button"
                    className="h-5 w-5 text-muted-foreground cursor-pointer"
                    onClick={event => {
                      event.stopPropagation();
                      handleClear();
                    }}
                    aria-label="Clear"
                  />
                  <Separator orientation="vertical" className="flex min-h-5 h-full" />
                </div>
              </div>
            ) : (
              <>{loading && loadingText ? loadingText : placeholder}</>
            )}
          </>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start" onEscapeKeyDown={() => setIsPopoverOpen(false)}>
        <Command className="w-[--radix-popper-anchor-width] max-h-[--radix-popper-available-height]">
          <CommandInput placeholder={searchText} onKeyDown={handleInputKeyDown} value={searchValue} onValueChange={setSearchValue} />
          <CommandList className="">
            <CommandEmpty>{noResultsText}</CommandEmpty>
            <CommandGroup>
              {showSelectAll && (
                <CommandItem key="all" onSelect={toggleAll} className="cursor-pointer">
                  <div
                    className={cn(
                      "mr-2 flex h-4.5 w-4.5 items-center justify-center rounded-sm border border-primary",
                      selectedValues.length === options.size ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible",
                    )}
                  >
                    <Check className="h-4.5 w-4.5" />
                  </div>
                  <span>({selectAllText})</span>
                </CommandItem>
              )}
              {Array.from(options.values()).map(option => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <CommandItem key={option.value} onSelect={() => toggleOption(option.value)} className="cursor-pointer">
                    <div
                      className={cn(
                        "mr-2 flex h-4.5 w-4.5 items-center justify-center rounded-sm border border-primary",
                        isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <Check className="h-4.5 w-4.5" />
                    </div>
                    {option.icon && <option.icon className="mr-2 h-4.5 w-4.5 text-muted-foreground" />}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <div className="flex items-center justify-between">
                {selectedValues.length > 0 && (
                  <>
                    <CommandItem onSelect={handleClear} className="flex-1 justify-center cursor-pointer">
                      {clearText}
                    </CommandItem>
                    <Separator orientation="vertical" className="flex min-h-6 h-full" />
                  </>
                )}
                <CommandItem onSelect={() => setIsPopoverOpen(false)} className="flex-1 justify-center cursor-pointer max-w-full">
                  {closeText}
                </CommandItem>
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const ForwardedMultiSelect = React.forwardRef(MultiSelect) as (<T extends string | number>(
  props: MultiSelectProps<T> & { ref?: React.Ref<HTMLButtonElement> },
) => React.ReactElement) & { displayName?: string };

ForwardedMultiSelect.displayName = "MultiSelect";

export { ForwardedMultiSelect as MultiSelect, type MultiSelectProps };
