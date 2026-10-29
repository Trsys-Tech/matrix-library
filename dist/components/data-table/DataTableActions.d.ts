import { ButtonProps } from '../button/Button';
import { IconButtonProps } from '../icon-botton/IconButton';
import { PopoverContentProps } from '../popover/Popover';
import * as React from "react";
export type DataTableSearchActionProps = Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue"> & {
    /** Input value for externally managed search. Use with onValueChange. */
    value?: string;
    /** Initial input value for externally managed search. */
    defaultValue?: string;
    /** Handles search externally instead of applying the table's global filter. */
    onValueChange?: (value: string) => void;
    defaultOpen?: boolean;
    defaultOpenAutoFocus?: boolean;
    placeholder?: string;
    label?: string;
};
export declare function DataTableSearchAction({ value: controlledValue, defaultValue, onValueChange, defaultOpen, defaultOpenAutoFocus, placeholder, label, className, ...props }: DataTableSearchActionProps): React.JSX.Element;
export type DataTableFreezeActionProps = ButtonProps & {
    freezeText?: string;
    unFreezeText?: string;
    position?: "top" | "bottom";
};
export declare function DataTableFreezeAction({ freezeText, unFreezeText, position, disabled, onClick, ...props }: DataTableFreezeActionProps): React.JSX.Element;
export type DataTablePrintActionProps = IconButtonProps & {
    onPrintError?: (error: unknown) => void;
};
export declare function DataTablePrintAction({ onClick, children, disabled, onPrintError, className, ...props }: DataTablePrintActionProps): React.JSX.Element;
export type DataTableRefreshActionProps = Omit<IconButtonProps, "onClick"> & {
    onRefresh: () => void;
};
export declare function DataTableRefreshAction({ onRefresh, loading, children, disabled, className, ...props }: DataTableRefreshActionProps): React.JSX.Element;
export type DataTableDeleteActionProps = Omit<ButtonProps, "onClick"> & {
    onDelete: () => void;
};
export declare function DataTableDeleteAction({ onDelete, ...props }: DataTableDeleteActionProps): React.JSX.Element;
export type DataTableExtraActionsProps = PopoverContentProps & {
    label?: string;
};
export declare function DataTableExtraActions({ children, label, ...props }: DataTableExtraActionsProps): React.JSX.Element;
export type DataTableColumnsActionProps = IconButtonProps;
export declare function DataTableColumnsAction({ children, disabled, className, ...props }: DataTableColumnsActionProps): React.JSX.Element;
//# sourceMappingURL=DataTableActions.d.ts.map