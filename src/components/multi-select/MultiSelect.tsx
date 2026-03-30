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
  base: "mtx-flex mtx-gap-1 mtx-items-center mtx-py-0.5 mtx-px-2 mtx-rounded-xl",
  variants: {
    variant: {
      default: "mtx-border-none mtx-shadow-none mtx-bg-primary-50 mtx-text-primary hover:mtx-bg-primary-50",
      secondary: "mtx-border-foreground/10 mtx-bg-secondary mtx-text-secondary-foreground hover:mtx-bg-secondary/80",
      destructive: "mtx-border-transparent mtx-bg-destructive mtx-text-destructive-foreground hover:mtx-bg-destructive/80",
      inverted: "mtx-inverted",
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
  const isControlled = value !== undefined;
  const [internalSelectedValues, setInternalSelectedValues] = React.useState<T[]>(defaultValue);
  const selectedValues = isControlled ? value : internalSelectedValues;
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
          if (!isControlled) {
            setInternalSelectedValues(newSelectedValues);
          }
          onValueChange(newSelectedValues);
          setSearchValue("");
        }
      } else if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        if (!isControlled) {
          setInternalSelectedValues(newSelectedValues);
        }
        onValueChange(newSelectedValues);
      }
    },
    [addOptionOnSearchNotFound, onValueChange, options, selectedValues, isControlled],
  );

  const toggleOption = React.useCallback(
    (option: T) => {
      const newSelectedValues = selectedValues.includes(option) ? selectedValues.filter(value => value !== option) : [...selectedValues, option];
      if (!isControlled) {
        setInternalSelectedValues(newSelectedValues);
      }
      onValueChange(newSelectedValues);
    },
    [onValueChange, selectedValues, isControlled],
  );

  const handleClear = React.useCallback(() => {
    if (!isControlled) {
      setInternalSelectedValues([]);
    }
    onValueChange([]);
    if (addOptionOnSearchNotFound) {
      setOptions(new Map(_options.map(option => [option.value, option])));
    }
  }, [onValueChange, addOptionOnSearchNotFound, _options, isControlled]);

  const handleTogglePopover = React.useCallback(() => {
    setIsPopoverOpen(prev => !prev);
  }, []);

  const clearExtraOptions = React.useCallback(() => {
    const newSelectedValues = selectedValues.slice(0, maxCount);
    if (!isControlled) {
      setInternalSelectedValues(newSelectedValues);
    }
    onValueChange(newSelectedValues);
  }, [maxCount, selectedValues, onValueChange, isControlled]);

  const toggleAll = React.useCallback(() => {
    if (selectedValues.length === options.size) {
      handleClear();
    } else {
      const allValues = Array.from(options.keys());
      if (!isControlled) {
        setInternalSelectedValues(allValues);
      }
      onValueChange(allValues);
    }
  }, [handleClear, onValueChange, options, selectedValues.length, isControlled]);

  React.useEffect(() => {
    setOptions(new Map(_options.map(option => [option.value, option])));
  }, [_options]);

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
            "mtx-group mtx-flex mtx-max-h-14 mtx-h-8 mtx-w-full mtx-items-center mtx-justify-between mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-px-3 mtx-py-1.5 mtx-text-sm mtx-ring-offset-background data-[placeholder]:mtx-text-muted-foreground hover:mtx-border hover:mtx-border-primary hover:mtx-bg-transparent focus:mtx-border focus:mtx-border-primary focus:mtx-outline-none focus:mtx-ring focus:mtx-ring-primary-100 disabled:mtx-cursor-not-allowed disabled:mtx-bg-gray-100 disabled:mtx-text-text-300 disabled:mtx-border-gray-100 [&>span]:mtx-line-clamp-1 [&_svg]:disabled:mtx-text-text-300",
            isWrapped && "mtx-h-auto",
            className,
          )}
          data-placeholder={!selectedValues.length ? "" : undefined}
          endIcon={
            <ChevronDown
              role="button"
              aria-label="Expand dropdown"
              className="!mtx-h-4.5 !mtx-w-4.5 mtx-cursor-pointer group-data-[state=open]:mtx-rotate-180 mtx-transition-transform"
            />
          }
        >
          <>
            {selectedValues.length > 0 ? (
              <div className="mtx-flex mtx-justify-between mtx-items-center mtx-w-full">
                <div className="mtx-flex mtx-flex-wrap mtx-items-center mtx-gap-2" ref={containerRef}>
                  {selectedValues.slice(0, maxCount).map(value => {
                    const option = options.get(value);
                    const IconComponent = option?.icon;
                    return (
                      <Badge key={value} className={cn(multiSelectVariants({ variant }), { "text-gray-400 bg-gray-200": disabled || loading })}>
                        <XMark
                          className="mtx-h-4 mtx-w-4 mtx-cursor-pointer"
                          onClick={event => {
                            event.stopPropagation();
                            toggleOption(value);
                          }}
                        />
                        {IconComponent && <IconComponent className="mtx-h-4 mtx-w-4 mtx-mr-2" />}
                        {option?.label}
                      </Badge>
                    );
                  })}
                  {selectedValues.length > maxCount && (
                    <Badge className={cn(multiSelectVariants({ variant }))}>
                      {`+ ${selectedValues.length - maxCount} ${moreText}`}
                      <CircleXmark
                        role="button"
                        className="mtx-ml-2 mtx-h-4.5 mtx-w-4.5 mtx-cursor-pointer"
                        onClick={event => {
                          event.stopPropagation();
                          clearExtraOptions();
                        }}
                      />
                    </Badge>
                  )}
                  {loading && loadingText ? loadingText : null}
                </div>
                <div className="mtx-flex mtx-items-center mtx-justify-between mtx-gap-1">
                  <XMark
                    role="button"
                    className="mtx-h-5 mtx-w-5 mtx-text-muted-foreground mtx-cursor-pointer"
                    onClick={event => {
                      event.stopPropagation();
                      handleClear();
                    }}
                    aria-label="Clear"
                  />
                  <Separator orientation="vertical" className="mtx-flex mtx-min-h-5 mtx-h-full" />
                </div>
              </div>
            ) : (
              <>{loading && loadingText ? loadingText : placeholder}</>
            )}
          </>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mtx-w-auto mtx-p-0" align="start" onEscapeKeyDown={() => setIsPopoverOpen(false)}>
        <Command className="mtx-w-[--radix-popper-anchor-width] mtx-max-h-[--radix-popper-available-height]">
          <CommandInput placeholder={searchText} onKeyDown={handleInputKeyDown} value={searchValue} onValueChange={setSearchValue} />
          <CommandList className="">
            <CommandEmpty>{noResultsText}</CommandEmpty>
            <CommandGroup>
              {showSelectAll && (
                <CommandItem key="all" onSelect={toggleAll} className="mtx-cursor-pointer">
                  <div
                    className={cn(
                      "mtx-mr-2 mtx-flex mtx-h-4.5 mtx-w-4.5 mtx-items-center mtx-justify-center mtx-rounded-sm mtx-border mtx-border-primary",
                      selectedValues.length === options.size ? "mtx-bg-primary mtx-text-primary-foreground" : "mtx-opacity-50 [&_svg]:mtx-invisible",
                    )}
                  >
                    <Check className="mtx-h-4.5 mtx-w-4.5" />
                  </div>
                  <span>({selectAllText})</span>
                </CommandItem>
              )}
              {Array.from(options.values()).map(option => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <CommandItem key={option.value} onSelect={() => toggleOption(option.value)} className="mtx-cursor-pointer">
                    <div
                      className={cn(
                        "mtx-mr-2 mtx-flex mtx-h-4.5 mtx-w-4.5 mtx-items-center mtx-justify-center mtx-rounded-sm mtx-border mtx-border-primary",
                        isSelected ? "mtx-bg-primary mtx-text-primary-foreground" : "mtx-opacity-50 [&_svg]:mtx-invisible",
                      )}
                    >
                      <Check className="mtx-h-4.5 mtx-w-4.5" />
                    </div>
                    {option.icon && <option.icon className="mtx-mr-2 mtx-h-4.5 mtx-w-4.5 mtx-text-muted-foreground" />}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <div className="mtx-flex mtx-items-center mtx-justify-between">
                {selectedValues.length > 0 && (
                  <>
                    <CommandItem onSelect={handleClear} className="mtx-flex-1 mtx-justify-center mtx-cursor-pointer">
                      {clearText}
                    </CommandItem>
                    <Separator orientation="vertical" className="mtx-flex mtx-min-h-6 mtx-h-full" />
                  </>
                )}
                <CommandItem onSelect={() => setIsPopoverOpen(false)} className="mtx-flex-1 mtx-justify-center mtx-cursor-pointer mtx-max-w-full">
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
