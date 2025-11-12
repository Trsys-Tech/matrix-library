import { VariantProps, TVReturnType } from 'tailwind-variants';
import { TVConfig } from 'tailwind-variants/dist/config';
import * as React from "react";
/**
 * Variants for the multi-select component to handle different styles.
 * Uses tailwind-variants (cva) to define different styles based on "variant" prop.
 */
declare const multiSelectVariants: TVReturnType<{
    variant: {
        default: string;
        secondary: string;
        destructive: string;
        inverted: string;
    };
}, undefined, "flex gap-1 items-center py-0.5 px-2 rounded-xl", TVConfig<{
    variant: {
        default: string;
        secondary: string;
        destructive: string;
        inverted: string;
    };
}, {
    variant: {
        default: string;
        secondary: string;
        destructive: string;
        inverted: string;
    };
}>, {
    variant: {
        default: string;
        secondary: string;
        destructive: string;
        inverted: string;
    };
}, undefined, TVReturnType<{
    variant: {
        default: string;
        secondary: string;
        destructive: string;
        inverted: string;
    };
}, undefined, "flex gap-1 items-center py-0.5 px-2 rounded-xl", TVConfig<{
    variant: {
        default: string;
        secondary: string;
        destructive: string;
        inverted: string;
    };
}, {
    variant: {
        default: string;
        secondary: string;
        destructive: string;
        inverted: string;
    };
}>, unknown, unknown, undefined>>;
/**
 * Props for MultiSelect component
 */
interface MultiSelectProps<T extends string | number> extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value" | "defaultValue">, VariantProps<typeof multiSelectVariants> {
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
        icon?: React.ComponentType<{
            className?: string;
        }>;
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
declare const ForwardedMultiSelect: (<T extends string | number>(props: MultiSelectProps<T> & {
    ref?: React.Ref<HTMLButtonElement>;
}) => React.ReactElement) & {
    displayName?: string;
};
export { ForwardedMultiSelect as MultiSelect, type MultiSelectProps };
//# sourceMappingURL=MultiSelect.d.ts.map