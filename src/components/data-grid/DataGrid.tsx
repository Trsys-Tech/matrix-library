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

type DataGridRowWithId = {
  id?: string | number | null;
};

type ResolveRowId = (data: unknown) => string | undefined;

/**
 * Default ag-Grid theme used by DataGrid.
 */
const dataGridDefaultTheme = themeQuartz.withParams({
  fontFamily: "DMSans",
  fontSize: "12px",
  headerFontSize: "12px",
  headerFontWeight: 700,
  headerBackgroundColor: "oklch(var(--mtx-primary-50))",
  backgroundColor: "oklch(var(--mtx-gray-0))",
  accentColor: "oklch(var(--mtx-primary-300))",
  foregroundColor: "oklch(var(--mtx-text-500))",
  cellTextColor: "oklch(var(--mtx-text-500))",
});

const fallbackResolveRowId: ResolveRowId = data => {
  const id = (data as DataGridRowWithId | null | undefined)?.id;

  return id !== undefined && id !== null ? String(id) : undefined;
};

const createResolveRowId = (getRowId?: AgGridReactProps["getRowId"]): ResolveRowId => {
  if (!getRowId) {
    return fallbackResolveRowId;
  }

  return data => {
    const id = getRowId({ data, level: 0 } as any);

    return id !== undefined && id !== null ? String(id) : fallbackResolveRowId(data);
  };
};

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

const DataGridContext = React.createContext<DataGridContext | null>(null);

/**
 * Returns the current DataGrid context.
 */
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
  const resolveRowIdRef = React.useRef<ResolveRowId>(fallbackResolveRowId);

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
        resolveRowIdRef,
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
    const {
      rowData,
      setRowData,
      actionbarExists,
      setApi,
      setQuickFilterText,
      quickFilterText,
      gridId,
      actionbarHeight,
      pinnedRowIds,
      resolveRowIdRef,
    } = context;

    const resolveRowId = React.useMemo(() => createResolveRowId(getRowId), [getRowId]);

    const theme = useMemo(() => {
      return dataGridDefaultTheme.withParams({
        headerHeight: 40,
        wrapperBorderRadius: actionbarExists ? "0px 0px 8px 8px" : "8px",
      });
    }, [actionbarExists]);

    React.useEffect(() => {
      resolveRowIdRef.current = resolveRowId;

      return () => {
        resolveRowIdRef.current = fallbackResolveRowId;
      };
    }, [resolveRowId, resolveRowIdRef]);

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
        const id = resolveRowId(data);

        if (id !== undefined && pinnedRowIds.has(id)) {
          pinned.push(data);
        } else {
          unpinned.push(data);
        }
      });

      return { finalRowData: unpinned, finalPinnedTopRowData: pinned };
    }, [rowData, pinnedRowIds, resolveRowId]);

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
        "mtx-relative mtx-flex mtx-items-center mtx-p-2 mtx-h-12 mtx-w-full mtx-bg-gray-0 mtx-border mtx-border-gray-200 mtx-border-b-0 -mtx-mb-[1px] mtx-z-10 mtx-rounded-t-[8px]",
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
const SearchAction: React.FC<SearchActionProps> = ({
  defaultOpen = false,
  defaultOpenAutoFocus = true,
  className,
  ...props
}: SearchActionProps): React.ReactElement => {
  const context = React.useContext(DataGridContext);

  if (!context) {
    throw new Error("SearchAction should be used within <DataGrid>");
  }

  const { quickFilterText, setQuickFilterText } = context;

  const [isSearchInputOpen, setIsSearchInputOpen] = React.useState(defaultOpen);
  const [isClosing, setIsClosing] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const isFirstRender = React.useRef(true);

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
    if (isSearchInputOpen && inputRef?.current && (defaultOpenAutoFocus || !isFirstRender.current)) {
      inputRef.current.focus();
    }
    isFirstRender.current = false;
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
    <div className={cn("mtx-max-w-60", className)} {...props}>
      {isSearchInputOpen || isClosing ? (
        <TextField
          ref={inputRef}
          className={cn(
            "mtx-relative mtx-h-7.5",
            isSearchInputOpen && !isClosing ? "mtx-animate-input-open" : "",
            isClosing && "mtx-animate-input-close",
          )}
          onChange={e => setQuickFilterText(e.target.value)}
          value={quickFilterText}
          startAdornment={
            <IconButton variant="toolbar" type="button" className="mtx-p-0.5 mtx-h-6 mtx-w-6 mtx-border-none mtx-mx-1" onClick={handleClose}>
              <Magnifier className="mtx-w-5 mtx-h-5" />
            </IconButton>
          }
          endAdornment={
            quickFilterText && (
              <IconButton variant="toolbar" type="button" className="mtx-p-0.5 mtx-w-6 mtx-h-6 mtx-border-none mtx-mx-1" onClick={handleClear}>
                <CircleXmark className="mtx-w-5 mtx-h-5" />
              </IconButton>
            )
          }
        />
      ) : (
        <IconButton variant="toolbar" type="button" className="mtx-p-0.5 mtx-w-6 mtx-h-6 mtx-m-1" onClick={handleOpen}>
          <Magnifier className="mtx-w-5 mtx-h-5" />
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
const FreezeAction: React.FC<FreezeActionProps> = ({
  freezeText,
  unFreezeText,
  onClick,
  disabled,
  ...props
}: FreezeActionProps): React.ReactElement => {
  const context = React.useContext(DataGridContext);

  if (!context) {
    throw new Error("FreezeAction should be used within <DataGrid>");
  }

  const [pinnedRowCount, setPinnedRowCount] = React.useState(0);
  const [selectedRowsCount, setSelectedRowsCount] = React.useState(0);

  const { api, pinnedRowIds, setPinnedRowIds, resolveRowIdRef } = context;

  const freezeRows = () => {
    if (!api) return;

    // Get currently selected rows
    const selectedRows = api.getSelectedRows();

    if (selectedRows.length > 0) {
      const newPinnedIds = new Set(pinnedRowIds);
      selectedRows.forEach(row => {
        const rowId = resolveRowIdRef.current(row);

        if (rowId !== undefined) {
          newPinnedIds.add(rowId);
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
      onClick={handleFreezing}
      startIcon={<Snowflake className="mtx-w-4.5 mtx-h-4.5" />}
      disabled={(!pinnedRowCount && !selectedRowsCount) || disabled}
      type="button"
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
    <IconButton variant="toolbar" type="button" className={cn("mtx-p-0.5 mtx-w-6 mtx-h-6", className)} onClick={handlePrint} {...props}>
      {children ?? <Print className="mtx-w-5 mtx-h-5" />}
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
      className={cn("mtx-p-0.5 mtx-w-6 mtx-h-6", loading && "disabled:mtx-bg-transparent", className)}
      variant="toolbar"
      type="button"
      onClick={handleRefresh}
      disabled={loading}
      {...props}
    >
      {children ?? <Refresh className={cn("mtx-w-4.5 mtx-h-4.5", loading && "mtx-animate-spin")} />}
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
    <Button variant="danger" type="button" onClick={handleDelete} startIcon={<Trashcan className="mtx-w-4.5 mtx-h-4.5" />} {...props}>
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
        <ElipsisVertical className="mtx-w-4.5 mtx-h-4.5 mtx-text-primary" />
      </PopoverTrigger>
      <PopoverContent align="end" className={cn("mtx-w-40", className)} {...props}>
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
