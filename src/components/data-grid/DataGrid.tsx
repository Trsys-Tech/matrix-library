"use client";

import React, { forwardRef, HTMLAttributes, useMemo } from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { GridApi, GridReadyEvent, themeQuartz, AllCommunityModule, ModuleRegistry, Theme } from "ag-grid-community";
import { CircleXmark, ElipsisVertical, Magnifier, Print, Refresh, Snowflake, Trashcan } from "@trsys-tech/matrix-icons";

import { cn } from "../../lib/utils";
import { printHtml } from "../../lib/printHtml";
import { TextField } from "../text-field/TextField";
import { Button, ButtonProps } from "../button/Button";
import { IconButton, IconButtonProps } from "../icon-botton/IconButton";
import { Popover, PopoverContent, PopoverContentProps, PopoverProps, PopoverTrigger, PopoverTriggerProps } from "../popover/Popover";

// Register all Community features
// Todo: Register only the required features
ModuleRegistry.registerModules([AllCommunityModule]);

/**
 * Default ag-Grid theme used by DataGrid.
 */
const dataGridDefaultTheme = themeQuartz.withParams({
  fontFamily: "DMSans",
  fontSize: "12px",
  headerFontSize: "12px",
  headerFontWeight: 700,
  headerBackgroundColor: "hsl(var(--primary-50))",
  backgroundColor: "hsl(var(--gray-0))",
  accentColor: "hsl(var(--primary-300))",
  foregroundColor: "hsl(var(--text-500))",
  cellTextColor: "hsl(var(--text-500))",
});

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
};

const DataGridContext = React.createContext<DataGridContext | null>(null);

const useDataGrid = () => {
  const context = React.useContext(DataGridContext);

  if (!context) {
    throw new Error("useDataGrid should be used within <DataGrid>");
  }

  return context;
};

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

const DataGrid: React.FC<DataGridProps> = ({ children }) => {
  const gridId = React.useId();
  const [api, setApi] = React.useState<GridApi | null>(null);
  const [rowData, setRowData] = React.useState<any[] | null | undefined>([]);
  const [actionbarHeight, setActionbarHeight] = React.useState(0);
  const [pinnedRowIds, setPinnedRowIds] = React.useState<Set<string>>(new Set());

  const [quickFilterText, setQuickFilterText] = React.useState("");
  const [actionbarExists, setActionbarExists] = React.useState(false);
  return (
    <DataGridContext.Provider
      value={{
        api,
        setApi,
        rowData,
        setRowData,
        gridId,
        quickFilterText,
        setQuickFilterText,
        actionbarExists,
        setActionbarExists,
        actionbarHeight,
        setActionbarHeight,
        pinnedRowIds,
        setPinnedRowIds,
      }}
    >
      {children}
    </DataGridContext.Provider>
  );
};

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
const DataGridContent = forwardRef<AgGridReact, DataGridContentProps>(
  ({ theme: propTheme, onGridReady, quickFilterText: quickFilterTextProps, rowData: rowDataProps, containerStyle, getRowId, ...props }, ref) => {
    const context = React.useContext(DataGridContext);

    if (!context) {
      throw new Error("DataGridContent should be used within <DataGrid>");
    }
    const { rowData, setRowData, actionbarExists, setApi, setQuickFilterText, quickFilterText, gridId, actionbarHeight, pinnedRowIds } = context;

    const theme = useMemo(() => {
      return dataGridDefaultTheme.withParams({
        headerHeight: 40,
        wrapperBorderRadius: actionbarExists ? "0px 0px 8px 8px" : "8px",
      });
    }, [actionbarExists]);

    const handleGridReady = (e: GridReadyEvent) => {
      setApi(e.api);
      onGridReady?.(e);
    };

    React.useEffect(() => {
      setRowData(rowDataProps);
    }, [rowDataProps, setRowData]);

    React.useEffect(() => {
      if (quickFilterTextProps !== undefined) {
        setQuickFilterText(quickFilterTextProps ?? "");
      }
    }, [quickFilterTextProps, setQuickFilterText]);

    const { finalRowData, finalPinnedTopRowData } = useMemo(() => {
      if (!rowData || pinnedRowIds.size === 0) {
        return { finalRowData: rowData, finalPinnedTopRowData: [] };
      }

      const pinned: any[] = [];
      const unpinned: any[] = [];

      rowData.forEach(data => {
        const id = getRowId ? getRowId({ data, level: 0 } as any) : (data as any).id;
        const stringId = id !== undefined && id !== null ? String(id) : undefined;

        if (stringId !== undefined && pinnedRowIds.has(stringId)) {
          pinned.push(data);
        } else {
          unpinned.push(data);
        }
      });

      return { finalRowData: unpinned, finalPinnedTopRowData: pinned };
    }, [rowData, pinnedRowIds, getRowId]);

    return (
      <AgGridReact
        gridId={gridId}
        theme={propTheme ?? theme}
        rowData={finalRowData}
        pinnedTopRowData={finalPinnedTopRowData}
        quickFilterText={quickFilterText}
        onGridReady={handleGridReady}
        containerStyle={{ height: `calc(100% - ${actionbarHeight}px)`, ...containerStyle }}
        getRowId={getRowId}
        {...props}
        ref={ref}
      />
    );
  },
);

DataGridContent.displayName = "DataGridContent";

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
const DataGridActionBar: React.FC<DatagridActionBarProps> = ({ className, ...props }) => {
  const context = React.useContext(DataGridContext);

  if (!context) {
    throw new Error("DataGridActionBar should be used within <DataGrid>");
  }
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { setActionbarExists, setActionbarHeight } = context;
  const { children } = props;

  React.useEffect(() => {
    setActionbarExists(true);
    return () => setActionbarExists(false);
  }, [setActionbarExists]);

  React.useEffect(() => {
    if (ref.current) {
      setActionbarHeight(ref.current.clientHeight);
    }
  }, [setActionbarHeight]);

  return (
    <div
      className={cn(
        "relative flex items-center p-2 h-12 w-full bg-gray-0 border border-gray-200 border-b-0 -mb-[1px] z-10 rounded-t-[8px]",
        className,
      )}
      ref={ref}
    >
      {children}
    </div>
  );
};

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
const SearchAction: React.FC<SearchActionProps> = ({ defaultOpen = false, defaultOpenAutoFocus = true, className, ...props }) => {
  const context = React.useContext(DataGridContext);

  if (!context) {
    throw new Error("SearchAction should be used within <DataGrid>");
  }

  const { quickFilterText, setQuickFilterText } = context;

  const [isSearchInputOpen, setIsSearchInputOpen] = React.useState(defaultOpen);
  const [isClosing, setIsClosing] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const firstRenderRef = React.useRef(true);

  const handleClear = () => {
    context.setQuickFilterText("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleOpen = () => {
    setIsSearchInputOpen(true);
  };

  React.useEffect(() => {
    if (isSearchInputOpen && inputRef?.current && (defaultOpenAutoFocus || !firstRenderRef.current)) {
      inputRef.current.focus();
    }
    firstRenderRef.current = false;
  }, [isSearchInputOpen, defaultOpenAutoFocus]);

  const handleClose = () => {
    setIsClosing(true);
    context.setQuickFilterText("");
    setTimeout(() => {
      setIsSearchInputOpen(false);
      setIsClosing(false);
    }, 200);
  };

  return (
    <div className={cn("max-w-60", className)} {...props}>
      {isSearchInputOpen || isClosing ? (
        <TextField
          ref={inputRef}
          className={cn("relative h-7.5", isSearchInputOpen && !isClosing ? "animate-input-open" : "", isClosing && "animate-input-close")}
          onChange={e => setQuickFilterText(e.target.value)}
          value={quickFilterText}
          startAdornment={
            <IconButton type="button" variant="toolbar" className="p-0.5 h-6 w-6 border-none mx-1" onClick={handleClose}>
              <Magnifier className="w-5 h-5" />
            </IconButton>
          }
          endAdornment={
            quickFilterText && (
              <IconButton type="button" variant="toolbar" className="p-0.5 w-6 h-6 border-none mx-1" onClick={handleClear}>
                <CircleXmark className="w-5 h-5" />
              </IconButton>
            )
          }
        />
      ) : (
        <IconButton type="button" variant="toolbar" className="p-0.5 w-6 h-6 m-1" onClick={handleOpen}>
          <Magnifier className="w-5 h-5" />
        </IconButton>
      )}
    </div>
  );
};

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
const FreezeAction: React.FC<FreezeActionProps> = ({ freezeText, unFreezeText, onClick, disabled, ...props }) => {
  const context = React.useContext(DataGridContext);

  if (!context) {
    throw new Error("FreezeAction should be used within <DataGrid>");
  }

  const [pinnedRowCount, setPinnedRowCount] = React.useState(0);
  const [selectedRowsCount, setSelectedRowsCount] = React.useState(0);

  const { api, pinnedRowIds, setPinnedRowIds } = context;

  const freezeRows = () => {
    if (!api) return;

    // Get currently selected rows
    const selectedRows = api.getSelectedNodes();

    if (selectedRows.length > 0) {
      const newPinnedIds = new Set(pinnedRowIds);
      selectedRows.forEach(row => {
        if (row.id !== undefined) {
          newPinnedIds.add(row.id);
        }
      });
      setPinnedRowIds(newPinnedIds);
      api.deselectAll();
    }
  };

  const unfreezeRows = () => {
    setPinnedRowIds(new Set());
  };

  const handleFreezing = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (api) {
      const pinnedRowsCount = api.getPinnedTopRowCount();
      if (pinnedRowsCount > 0) {
        unfreezeRows();
      } else {
        freezeRows();
      }
    }
    onClick?.(e);
  };

  React.useEffect(() => {
    api?.addEventListener("pinnedRowDataChanged", () => {
      setPinnedRowCount(api.getPinnedTopRowCount());
    });

    api?.addEventListener("selectionChanged", () => {
      setSelectedRowsCount(api.getSelectedNodes().length);
    });

    return () => {
      if (api?.isDestroyed()) return;
      api?.removeEventListener("pinnedRowDataChanged", () => {
        setPinnedRowCount(api.getPinnedTopRowCount());
      });

      api?.removeEventListener("selectionChanged", () => {
        setSelectedRowsCount(api.getSelectedNodes().length);
      });
    };
  }, [api]);

  return (
    <Button
      variant="text"
      type="button"
      onClick={handleFreezing}
      startIcon={<Snowflake className="w-4.5 h-4.5" />}
      disabled={(!pinnedRowCount && !selectedRowsCount) || disabled}
      {...props}
    >
      {pinnedRowCount ? (unFreezeText ?? "Unfreeze") : (freezeText ?? "Freeze")}
    </Button>
  );
};

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
const PrintAction: React.FC<PrintActionProps> = ({ children, className, onClick, ...props }) => {
  const context = React.useContext(DataGridContext);

  if (!context) {
    throw new Error("PrintAction should be used within <DataGrid>");
  }

  const handlePrint = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (context.api) {
      context.api.setGridOption("domLayout", "print");

      setTimeout(() => {
        const element = document.querySelector("[grid-id='" + context.gridId + "']") as HTMLElement;
        const header = document.head;
        const html = `<html>
        ${header.innerHTML}
        ${element.outerHTML}
        </html>`;
        printHtml(html);
        context?.api?.setGridOption("domLayout", undefined);
      });
    }
    onClick?.(e);
  };

  return (
    <IconButton type="button" variant="toolbar" className={cn("p-0.5 w-6 h-6", className)} onClick={handlePrint} {...props}>
      {children ?? <Print className="w-5 h-5" />}
    </IconButton>
  );
};

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
const RefreshAction: React.FC<RefreshActionProps> = ({ className, onRefresh, children, loading, ...props }) => {
  const context = React.useContext(DataGridContext);

  if (!context) {
    throw new Error("RefreshAction should be used within <DataGrid>");
  }

  const handleRefresh = () => {
    onRefresh();
  };

  return (
    <IconButton
      type="button"
      className={cn("p-0.5 w-6 h-6", loading && "disabled:bg-transparent", className)}
      variant="toolbar"
      onClick={handleRefresh}
      disabled={loading}
      {...props}
    >
      {children ?? <Refresh className={cn("w-4.5 h-4.5", loading && "animate-spin")} />}
    </IconButton>
  );
};

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
const DeleteAction: React.FC<DeleteActionProps> = ({ onDelete, children, ...props }) => {
  const handleDelete = () => {
    onDelete();
  };

  return (
    <Button variant="danger" type="button" onClick={handleDelete} startIcon={<Trashcan className="w-4.5 h-4.5" />} {...props}>
      {children}
    </Button>
  );
};

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
const ExtraActions: React.FC<ExtraActionsProps> = ({ children, slotProps, className, ...props }) => {
  return (
    <Popover {...(slotProps?.popoverProps ?? {})}>
      <PopoverTrigger {...(slotProps?.triggerProps ?? {})}>
        <ElipsisVertical className="w-4.5 h-4.5 text-primary" />
      </PopoverTrigger>
      <PopoverContent align="end" className={cn("w-40", className)} {...props}>
        {children}
      </PopoverContent>
    </Popover>
  );
};

export {
  DataGrid,
  DataGridContent,
  DataGridActionBar,
  SearchAction,
  FreezeAction,
  PrintAction,
  RefreshAction,
  ExtraActions,
  DeleteAction,
  type DataGridProps,
  type DataGridContentProps,
  type DatagridActionBarProps,
  type SearchActionProps,
  type FreezeActionProps,
  type RefreshActionProps,
  type ExtraActionsProps,
  type DeleteActionProps,
  useDataGrid,
  dataGridDefaultTheme,
};
