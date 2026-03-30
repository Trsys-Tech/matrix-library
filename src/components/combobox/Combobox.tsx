"use client";

import React, { useMemo, useRef } from "react";
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
  options: ({ label: string; value: T } | { label: React.ReactElement; value: T; keyword: string })[];

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

  /**
   * Extra content to be displayed in the combobox dropdown.
   */
  extraContent?: React.ReactNode;
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
  extraContent,
  ...props
}: ComboboxProps<T>) => {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const commandRef = useRef<HTMLDivElement>(null);

  const handleInputKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        onValueChange?.(value!);
        if (closeOnSelect) setIsPopoverOpen(false);
      }
    },
    [onValueChange, closeOnSelect, value],
  );

  const handleSelect = React.useCallback(
    (currentValue: T) => {
      onValueChange?.(currentValue);
      if (closeOnSelect) setIsPopoverOpen(false);
    },
    [onValueChange, closeOnSelect],
  );

  const handleClear = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onValueChange?.(undefined as unknown as T);
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

  const showPlaceholder = value === undefined || value === "";

  const label = useMemo(() => {
    if (showPlaceholder && loading) return loadingText;
    if (showPlaceholder) return placeholder;
    return options.find(option => option.value === value)?.label || placeholder;
  }, [showPlaceholder, value, options, placeholder, loading, loadingText]);

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={modalPopover}>
      <PopoverTrigger asChild>
        <Button
          variant="text"
          role="combobox"
          type="button"
          aria-expanded={isPopoverOpen}
          className={cn(
            "mtx-group mtx-flex mtx-h-8 mtx-w-full mtx-items-center mtx-justify-between mtx-whitespace-nowrap mtx-overflow-hidden mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-px-3 mtx-py-1.5 mtx-text-xs mtx-ring-offset-background data-[placeholder]:mtx-text-muted-foreground hover:mtx-border hover:mtx-border-primary hover:mtx-bg-transparent focus:mtx-border focus:mtx-border-primary focus:mtx-outline-none focus:mtx-ring focus:mtx-ring-primary-100 disabled:mtx-cursor-not-allowed disabled:mtx-bg-gray-100 disabled:mtx-text-text-300 disabled:mtx-border-gray-100 [&_svg]:disabled:mtx-text-text-300",
            className,
          )}
          data-value={value}
          data-placeholder={showPlaceholder ? "" : undefined}
          loading={loading}
          disabled={disabled}
          endIcon={
            <ChevronDown
              role="button"
              aria-label="Expand dropdown"
              className="!mtx-h-4.5 !mtx-w-4.5 mtx-cursor-pointer group-data-[state=open]:mtx-rotate-180 mtx-transition-transform mtx-ms-auto"
            />
          }
          {...props}
        >
          <span className="mtx-text-start mtx-text-ellipsis mtx-whitespace-nowrap mtx-overflow-hidden mtx-flex-1 mtx-max-w-[calc(100%-24px)]">
            {label}
          </span>
          {clearable && value !== undefined && value !== null ? (
            <span
              onClick={handleClear}
              className="mtx-p-0 mtx-rounded-sm mtx-text-xs mtx-font-normal mtx-transition-colors focus-visible:mtx-outline-none disabled:mtx-pointer-events-none disabled:mtx-bg-muted disabled:mtx-text-gray-500 mtx-text-primary hover:mtx-bg-primary-50 focus:mtx-bg-transparent focus:mtx-ring active:mtx-bg-primary-50 active:mtx-text-primary-700 [&>svg]:mtx-h-4.5 [&>svg]:mtx-w-4.5"
              role="button"
              aria-label="Clear selection"
            >
              <XMark />
            </span>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="mtx-w-auto mtx-p-0"
        align="start"
        onEscapeKeyDown={() => setIsPopoverOpen(false)}
        onOpenAutoFocus={handleOpenAutoFocus}
      >
        <Command
          className="mtx-w-[--radix-popper-anchor-width] focus-visible:mtx-outline-none"
          filter={handleFilter}
          defaultValue={value !== undefined && value !== null ? String(value) : undefined} // highlight selected value on open
          ref={commandRef}
        >
          {showSearchInput && <CommandInput placeholder={searchText} onKeyDown={handleInputKeyDown} />}
          {extraContent}
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
                  keywords={"keyword" in option ? [option.keyword] : [option.label]}
                  onSelect={handleSelect as React.ComponentProps<typeof CommandItem>["onSelect"]}
                >
                  {option.label}
                  <Check className={cn("mtx-ml-auto", value === option.value ? "mtx-opacity-100" : "mtx-opacity-0")} />
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
