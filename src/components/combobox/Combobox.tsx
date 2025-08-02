"use client";

import React, { useEffect, useRef } from "react";
import { Check, ChevronDown, XMark } from "@trsys-tech/matrix-icons";

import { cn } from "../../lib/utils";
import { Button } from "../button/Button";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/Popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../command/Command";

type ComboboxProps<T extends string | number> = React.HTMLAttributes<HTMLButtonElement> & {
  /**
   * The options to display in the combobox.
   * Each option should have a label and a value.
   * The label is what is displayed in the combobox.
   * The value is what is returned when the option is selected.
   */
  options: { label: string; value: T }[];

  /**
   * The value of the combobox.
   */
  value?: T;

  /**
   * A function that is called when the value of the combobox changes.
   */
  onValueChange?: (value: T) => void;

  /**
   * Placeholder text to be displayed when no values are selected.
   * @default "Select an option"
   */
  placeholder?: string;

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional
   * @default false
   */
  modalPopover?: boolean;

  /**
   * The text to display in the search input.
   * @default "Search..."
   */
  searchText?: string;

  /**
   * The text to display when no results are found.
   * @default "No results found"
   */
  noResultsText?: string;

  /**
   * Whether the popover should close when an option is selected.
   * @default true
   */
  closeOnSelect?: boolean;

  /**
   * Whether the combobox is loading.
   * @default false
   */
  loading?: boolean;

  /**
   * Whether the combobox is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * The text to display when the combobox is loading.
   * @default "Loading..."
   */
  loadingText?: string;

  /**
   * The text to display when there are no options.
   * @default "No Items"
   */
  emptyOptionsText?: string;

  /**
   * Whether to show the search input.
   * @default true
   */
  showSearchInput?: boolean;

  /**
   * Whether to show the clear button.
   * @default false
   */
  clearable?: boolean;
};

const Combobox = <T extends string | number>({
  onValueChange,
  options,
  value,
  className,
  clearable = false,
  closeOnSelect = true,
  loading,
  disabled,
  placeholder = "Select an option",
  searchText = "Search...",
  noResultsText = "No results found",
  loadingText = "Loading...",
  emptyOptionsText = "No Items",
  showSearchInput = true,
  modalPopover,
  ...props
}: ComboboxProps<T>) => {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const commandRef = useRef<HTMLDivElement>(null);

  const [currentSelectedValue, setCurrentSelectedValue] = React.useState<T | undefined>(value);

  const handleInputKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        setCurrentSelectedValue(currentSelectedValue);
        onValueChange?.(currentSelectedValue!);
        if (closeOnSelect) setIsPopoverOpen(false);
      }
    },
    [currentSelectedValue, onValueChange, closeOnSelect],
  );

  const handleSelect = React.useCallback(
    (currentValue: T) => {
      setCurrentSelectedValue(currentValue);
      onValueChange?.(currentValue);
      if (closeOnSelect) setIsPopoverOpen(false);
    },
    [onValueChange, closeOnSelect],
  );

  const handleClear = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onValueChange?.(undefined as unknown as T);
      setCurrentSelectedValue(undefined);
    },
    [onValueChange],
  );

  const handleFilter = React.useCallback((value: string, search: string, keywords: string[] = [""]) => {
    return keywords.join("").toLocaleLowerCase().includes(search.toLocaleLowerCase()) ? 1 : 0;
  }, []);

  // when search input is not shown, we need to focus on the command manually to enable keyboard navigation
  const handleOpenAutoFocus = React.useCallback(
    (e: Event) => {
      if (!showSearchInput) {
        e.preventDefault();
        commandRef.current?.focus();
      }
    },
    [showSearchInput],
  );

  useEffect(() => {
    setCurrentSelectedValue(value);
  }, [value]);

  const showPlaceholder = currentSelectedValue === undefined || currentSelectedValue === "";

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={modalPopover}>
      <PopoverTrigger asChild>
        <Button
          variant="text"
          role="combobox"
          type="button"
          aria-expanded={isPopoverOpen}
          className={cn(
            "group flex h-8 w-full items-center justify-between whitespace-nowrap overflow-hidden rounded-sm border border-input bg-transparent px-3 py-1.5 text-xs ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-gray-100 [&_svg]:disabled:text-text-300",
            className,
          )}
          data-value={currentSelectedValue}
          data-placeholder={showPlaceholder ? "" : undefined}
          loading={loading}
          disabled={disabled}
          endIcon={
            <ChevronDown
              role="button"
              aria-label="Expand dropdown"
              className="!h-4.5 !w-4.5 cursor-pointer group-data-[state=open]:rotate-180 transition-transform ms-auto"
            />
          }
          {...props}
        >
          <span className="text-start text-ellipsis whitespace-nowrap overflow-hidden flex-1 max-w-[calc(100%-24px)]">
            {!showPlaceholder ? options.find(option => option.value === currentSelectedValue)?.label : loading ? loadingText : placeholder}
          </span>
          {clearable && currentSelectedValue !== undefined && currentSelectedValue !== null ? (
            <span
              onClick={handleClear}
              className="p-0 rounded-sm text-xs font-normal transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:bg-muted disabled:text-gray-500 text-primary hover:bg-primary-50 focus:bg-transparent focus:ring active:bg-primary-50 active:text-primary-700 [&>svg]:h-4.5 [&>svg]:w-4.5"
              role="button"
              aria-label="Clear selection"
            >
              <XMark />
            </span>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start" onEscapeKeyDown={() => setIsPopoverOpen(false)} onOpenAutoFocus={handleOpenAutoFocus}>
        <Command
          className="w-[--radix-popper-anchor-width] focus-visible:outline-none"
          filter={handleFilter}
          defaultValue={currentSelectedValue !== undefined && currentSelectedValue !== null ? String(currentSelectedValue) : undefined} // highlight selected value on open
          ref={commandRef}
        >
          {showSearchInput && <CommandInput placeholder={searchText} onKeyDown={handleInputKeyDown} />}
          <CommandList>
            {!loading && <CommandEmpty>{noResultsText}</CommandEmpty>}
            {!loading && !options.length ? (
              <CommandItem value="8fdcaeb67c8ad943c80fe54c3b1059b700d9254389a38a4a1fc39a6eee7564623" disabled>
                {emptyOptionsText}
              </CommandItem>
            ) : null}
            <CommandGroup>
              {options.map(option => (
                <CommandItem
                  key={String(option.value)}
                  value={option.value}
                  keywords={[option.label]}
                  onSelect={handleSelect as React.ComponentProps<typeof CommandItem>["onSelect"]}
                >
                  {option.label}
                  <Check className={cn("ml-auto", currentSelectedValue === option.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export { Combobox, type ComboboxProps };
