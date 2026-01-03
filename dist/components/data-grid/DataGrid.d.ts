import { default as React, HTMLAttributes } from 'react';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { GridApi, Theme, ThemeDefaultParams } from 'ag-grid-community';
import { ButtonProps } from '../button/Button';
import { IconButtonProps } from '../icon-botton/IconButton';
import { PopoverContentProps, PopoverProps, PopoverTriggerProps } from '../popover/Popover';
declare const dataGridDefaultTheme: Theme< ThemeDefaultParams>;
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
};
declare const DataGridContext: React.Context<DataGridContext | null>;
declare const useDataGrid: () => DataGridContext;
type DataGridProps = {
    children: React.ReactNode;
};
declare const DataGrid: React.FC<DataGridProps>;
type DataGridContentProps = Omit<AgGridReactProps, "theme"> & {
    theme?: Theme;
};
declare const DataGridContent: React.ForwardRefExoticComponent<Omit<AgGridReactProps<any>, "theme"> & {
    theme?: Theme;
} & React.RefAttributes<AgGridReact<any>>>;
type DatagridActionBarProps = HTMLAttributes<HTMLDivElement> & {};
declare const DataGridActionBar: React.FC<DatagridActionBarProps>;
type SearchActionProps = HTMLAttributes<HTMLDivElement> & {
    defaultOpen?: boolean;
};
declare const SearchAction: React.FC<SearchActionProps>;
type FreezeActionProps = ButtonProps & {
    freezeText?: string;
    unFreezeText?: string;
};
declare const FreezeAction: React.FC<FreezeActionProps>;
type PrintActionProps = IconButtonProps & {};
declare const PrintAction: React.FC<PrintActionProps>;
type RefreshActionProps = Omit<IconButtonProps, "onClick"> & {
    onRefresh: () => void;
};
declare const RefreshAction: React.FC<RefreshActionProps>;
type DeleteActionProps = Omit<ButtonProps, "onClick"> & {
    onDelete: () => void;
};
declare const DeleteAction: React.FC<DeleteActionProps>;
type ExtraActionsProps = PopoverContentProps & {
    children: React.ReactNode;
    slotProps?: {
        triggerProps?: PopoverTriggerProps;
        popoverProps?: PopoverProps;
    };
};
declare const ExtraActions: React.FC<ExtraActionsProps>;
export { DataGrid, DataGridContent, DataGridActionBar, SearchAction, FreezeAction, PrintAction, RefreshAction, ExtraActions, DeleteAction, type DataGridProps, type DataGridContentProps, type DatagridActionBarProps, type SearchActionProps, type FreezeActionProps, type RefreshActionProps, type ExtraActionsProps, type DeleteActionProps, useDataGrid, dataGridDefaultTheme, };
//# sourceMappingURL=DataGrid.d.ts.map