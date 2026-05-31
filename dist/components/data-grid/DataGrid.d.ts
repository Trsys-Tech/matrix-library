import { default as React, HTMLAttributes } from 'react';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { GridApi, Theme, ThemeDefaultParams } from 'ag-grid-community';
import { ButtonProps } from '../button/Button';
import { IconButtonProps } from '../icon-botton/IconButton';
import { PopoverContentProps, PopoverProps, PopoverTriggerProps } from '../popover/Popover';
type ResolveRowId = (data: unknown) => string | undefined;
/**
 * Default ag-Grid theme used by DataGrid.
 */
declare const dataGridDefaultTheme: Theme< ThemeDefaultParams>;
/**
 * Shared DataGrid state exposed through context.
 */
type DataGridContext = {
    api: GridApi | null;
    setApi: (value: GridApi) => void;
    rowData: any[] | null | undefined;
    setRowData: (value: any[] | null | undefined) => void;
    gridId: string;
    quickFilterText: string;
    setQuickFilterText: (value: string) => void;
    actionbarExists: boolean;
    setActionbarExists: (value: boolean) => void;
    actionbarHeight: number;
    setActionbarHeight: (value: number) => void;
    pinnedRowIds: Set<string>;
    setPinnedRowIds: (value: Set<string>) => void;
    resolveRowIdRef: React.MutableRefObject<ResolveRowId>;
};
declare const DataGridContext: React.Context<DataGridContext | null>;
/**
 * Returns the current DataGrid context.
 */
declare const useDataGrid: () => DataGridContext;
/**
 * Props for the root DataGrid provider.
 */
type DataGridProps = {
    /** Content rendered inside the provider. */
    children: React.ReactNode;
};
/**
 * DataGrid provider.
 * Provides shared state for the grid shell, content, and toolbar actions.
 * @param {DataGridProps} props - DataGrid props.
 * @param {React.ReactNode} children - Content rendered inside the provider.
 * @returns {React.ReactElement}
 */
declare const DataGrid: React.FC<DataGridProps>;
/**
 * Props for the Ag Grid content wrapper.
 */
type DataGridContentProps = Omit<AgGridReactProps, "theme"> & {
    /** Optional theme override forwarded to ag-Grid. */
    theme?: Theme;
};
/**
 * DataGridContent component.
 * Connects ag-Grid to the shared DataGrid context and keeps pinned rows separate from the main row set.
 * @param {DataGridContentProps} props - Ag Grid props.
 * @param {Theme} [theme] - Optional ag-Grid theme override.
 * @param {GridReadyEvent} [onGridReady] - Called when the grid becomes ready.
 * @param {any[] | null | undefined} [rowData] - Row data rendered by the grid.
 * @param {string} [quickFilterText] - Quick filter text synced from the search action.
 * @param {React.CSSProperties} [containerStyle] - Inline styles applied to the grid container.
 * @param {Function} [getRowId] - Resolves the row id used to keep pinned rows stable.
 * @param {React.ForwardedRef<AgGridReact>} ref - Grid ref.
 * @returns {React.ReactElement}
 */
declare const DataGridContent: React.ForwardRefExoticComponent<Omit<AgGridReactProps<any>, "theme"> & {
    /** Optional theme override forwarded to ag-Grid. */
    theme?: Theme;
} & React.RefAttributes<AgGridReact<any>>>;
/**
 * Props for the DataGrid action bar container.
 */
type DatagridActionBarProps = HTMLAttributes<HTMLDivElement> & {};
/**
 * DataGrid action bar.
 * Marks the grid as having a toolbar so the grid can adjust border radius and height.
 * @param {DatagridActionBarProps} props - Action bar props.
 * @param {React.ReactNode} children - Action bar content.
 * @param {string} className - Additional classes applied to the action bar.
 * @returns {React.ReactElement}
 */
declare const DataGridActionBar: React.FC<DatagridActionBarProps>;
/**
 * Props for SearchAction.
 */
type SearchActionProps = HTMLAttributes<HTMLDivElement> & {
    /** Opens the search input immediately on mount. */
    defaultOpen?: boolean;
    /** Focuses the input the first time it opens. */
    defaultOpenAutoFocus?: boolean;
};
/**
 * Search action.
 * Toggles the quick filter input and manages its open/close focus behavior.
 * @param {SearchActionProps} props - Search action props.
 * @param {boolean} [defaultOpen] - Opens the search input immediately on mount.
 * @param {boolean} [defaultOpenAutoFocus] - Focuses the input the first time it opens.
 * @param {React.ReactNode} children - Optional wrapper content.
 * @param {string} className - Additional wrapper classes.
 * @returns {React.ReactElement}
 */
declare const SearchAction: React.FC<SearchActionProps>;
/**
 * Props for FreezeAction.
 */
type FreezeActionProps = ButtonProps & {
    /** Label shown when rows can be frozen. */
    freezeText?: string;
    /** Label shown when rows are already frozen. */
    unFreezeText?: string;
};
/**
 * Freeze action.
 * Pins the current selection when rows are selected, or clears pinned rows when the grid is already frozen.
 * @param {FreezeActionProps} props - Freeze action props.
 * @param {boolean} [disabled] - Disables the action button.
 * @param {React.MouseEventHandler<HTMLButtonElement>} [onClick] - Called after the freeze toggle runs.
 * @returns {React.ReactElement}
 */
declare const FreezeAction: React.FC<FreezeActionProps>;
/**
 * Props for PrintAction.
 */
type PrintActionProps = IconButtonProps & {};
/**
 * Print action.
 * Switches the grid to print layout, captures the rendered markup, and opens the browser print flow.
 * @param {PrintActionProps} props - Print action props.
 * @param {React.ReactNode} [children] - Custom icon content rendered in the button.
 * @param {string} [className] - Additional button classes.
 * @param {React.MouseEventHandler<HTMLButtonElement>} [onClick] - Called after printing is triggered.
 * @returns {React.ReactElement}
 */
declare const PrintAction: React.FC<PrintActionProps>;
/**
 * Props for RefreshAction.
 */
type RefreshActionProps = Omit<IconButtonProps, "onClick"> & {
    /** Callback invoked when the refresh action is clicked. */
    onRefresh: () => void;
};
/**
 * Refresh action.
 * Calls the provided refresh callback and reflects the loading state in the toolbar button.
 * @param {RefreshActionProps} props - Refresh action props.
 * @param {() => void} onRefresh - Called when the button is clicked.
 * @param {boolean} [loading] - Shows the loading spinner and disables the button.
 * @param {React.ReactNode} [children] - Custom icon content rendered in the button.
 * @param {string} [className] - Additional button classes.
 * @returns {React.ReactElement}
 */
declare const RefreshAction: React.FC<RefreshActionProps>;
/**
 * Props for DeleteAction.
 */
type DeleteActionProps = Omit<ButtonProps, "onClick"> & {
    /** Callback invoked when the delete action is clicked. */
    onDelete: () => void;
};
/**
 * Delete action.
 * Renders a danger button with the delete icon and delegates the click to the provided handler.
 * @param {DeleteActionProps} props - Delete action props.
 * @param {() => void} onDelete - Called when the button is clicked.
 * @param {React.ReactNode} [children] - Button label or custom content.
 * @returns {React.ReactElement}
 */
declare const DeleteAction: React.FC<DeleteActionProps>;
/**
 * Props for ExtraActions.
 */
type ExtraActionsProps = PopoverContentProps & {
    /** Menu items rendered inside the popover. */
    children: React.ReactNode;
    /** Props forwarded to the popover trigger and popover root. */
    slotProps?: {
        triggerProps?: PopoverTriggerProps;
        popoverProps?: PopoverProps;
    };
};
/**
 * Extra actions menu.
 * Wraps overflow actions in a popover anchored to the vertical ellipsis trigger.
 * @param {ExtraActionsProps} props - Extra actions props.
 * @param {React.ReactNode} children - Menu items rendered inside the popover.
 * @param {{ triggerProps?: PopoverTriggerProps; popoverProps?: PopoverProps; }} [slotProps] - Props forwarded to the trigger and popover root.
 * @param {string} [className] - Additional popover content classes.
 * @returns {React.ReactElement}
 */
declare const ExtraActions: React.FC<ExtraActionsProps>;
export { DataGrid, DataGridContent, DataGridActionBar, SearchAction, FreezeAction, PrintAction, RefreshAction, ExtraActions, DeleteAction, type DataGridProps, type DataGridContentProps, type DatagridActionBarProps, type SearchActionProps, type FreezeActionProps, type RefreshActionProps, type ExtraActionsProps, type DeleteActionProps, useDataGrid, dataGridDefaultTheme, };
//# sourceMappingURL=DataGrid.d.ts.map