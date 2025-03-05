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
interface MultiSelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof multiSelectVariants> {
    /**
     * An array of option objects to be displayed in the multi-select component.
     * Each option object has a label, value, and an optional icon.
     */
    options: {
        /** The text to display for the option. */
        label: string;
        /** The unique value associated with the option. */
        value: string;
        /** Optional icon component to display alongside the option. */
        icon?: React.ComponentType<{
            className?: string;
        }>;
    }[];
    /**
     * Callback function triggered when the selected values change.
     * Receives an array of the new selected values.
     */
    onValueChange: (value: string[]) => void;
    /**
     * selected values in the multi-select component.
     */
    value?: string[];
    /** The default selected values when the component mounts. */
    defaultValue?: string[];
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
     * Text to display on the select all button when the multi-select component is open.
     */
    selectAllText?: string;
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
declare const MultiSelect: React.ForwardRefExoticComponent<MultiSelectProps & React.RefAttributes<HTMLButtonElement>>;
export { MultiSelect, type MultiSelectProps };
//# sourceMappingURL=MultiSelect.d.ts.map