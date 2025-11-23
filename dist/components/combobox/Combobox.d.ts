import { default as React } from 'react';
type ComboboxProps<T extends string | number> = React.HTMLAttributes<HTMLButtonElement> & {
    /**
     * The options to display in the combobox.
     * Each option should have a label and a value.
     * The label is what is displayed in the combobox.
     * The value is what is returned when the option is selected.
     */
    options: ({
        label: string;
        value: T;
    } | {
        label: React.ReactElement;
        value: T;
        keyword: string;
    })[];
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
declare const Combobox: <T extends string | number>({ onValueChange, options, value, className, clearable, closeOnSelect, loading, disabled, placeholder, searchText, noResultsText, loadingText, emptyOptionsText, showSearchInput, modalPopover, extraContent, ...props }: ComboboxProps<T>) => import("react/jsx-runtime").JSX.Element;
export { Combobox, type ComboboxProps };
//# sourceMappingURL=Combobox.d.ts.map