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
};

const DataGridContext = React.createContext<DataGridContext | null>(null);

const useDataGrid = () => {
  const context = React.useContext(DataGridContext);

  if (!context) {
    throw new Error("useDataGrid should be used within <DataGrid>");
  }

  return context;
};

type DataGridProps = {
  children: React.ReactNode;
};

const DataGrid: React.FC<DataGridProps> = ({ children }) => {
  const gridId = React.useId();
  const [api, setApi] = React.useState<GridApi | null>(null);
  const [rowData, setRowData] = React.useState<any[] | null | undefined>([]);
  const [actionbarHeight, setActionbarHeight] = React.useState(0);

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
      }}
    >
      {children}
    </DataGridContext.Provider>
  );
};

type DataGridContentProps = Omit<AgGridReactProps, "theme"> & {
  theme?: Theme;
};

const DataGridContent = forwardRef<AgGridReact, DataGridContentProps>(
  ({ theme: propTheme, onGridReady, quickFilterText: quickFilterTextProps, rowData: rowDataProps, containerStyle, ...props }, ref) => {
    const context = React.useContext(DataGridContext);

    if (!context) {
      throw new Error("DataGridContent should be used within <DataGrid>");
    }
    const { rowData, setRowData, actionbarExists, setApi, setQuickFilterText, quickFilterText, gridId, actionbarHeight } = context;

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

    return (
      <AgGridReact
        gridId={gridId}
        theme={propTheme ?? theme}
        rowData={rowData}
        quickFilterText={quickFilterText}
        onGridReady={handleGridReady}
        containerStyle={{ height: `calc(100% - ${actionbarHeight}px)`, ...containerStyle }}
        {...props}
        ref={ref}
      />
    );
  },
);

DataGridContent.displayName = "DataGridContent";

type DatagridActionBarProps = HTMLAttributes<HTMLDivElement> & {};

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

type SearchActionProps = HTMLAttributes<HTMLDivElement> & {
  defaultOpen?: boolean;
};

const SearchAction: React.FC<SearchActionProps> = ({ defaultOpen = false, className, ...props }) => {
  const context = React.useContext(DataGridContext);

  if (!context) {
    throw new Error("SearchAction should be used within <DataGrid>");
  }

  const { quickFilterText, setQuickFilterText } = context;

  const [isSearchInputOpen, setIsSearchInputOpen] = React.useState(defaultOpen);
  const [isClosing, setIsClosing] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

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
    if (isSearchInputOpen && inputRef?.current) {
      inputRef.current.focus();
    }
  }, [isSearchInputOpen]);

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
            <IconButton variant="toolbar" className="p-0.5 h-6 w-6 border-none mx-1" onClick={handleClose}>
              <Magnifier className="w-5 h-5" />
            </IconButton>
          }
          endAdornment={
            quickFilterText && (
              <IconButton variant="toolbar" className="p-0.5 w-6 h-6 border-none mx-1" onClick={handleClear}>
                <CircleXmark className="w-5 h-5" />
              </IconButton>
            )
          }
        />
      ) : (
        <IconButton variant="toolbar" className="p-0.5 w-6 h-6 m-1" onClick={handleOpen}>
          <Magnifier className="w-5 h-5" />
        </IconButton>
      )}
    </div>
  );
};

type FreezeActionProps = ButtonProps & {
  freezeText?: string;
  unFreezeText?: string;
};

const FreezeAction: React.FC<FreezeActionProps> = ({ freezeText, unFreezeText, onClick, disabled, ...props }) => {
  const context = React.useContext(DataGridContext);

  if (!context) {
    throw new Error("FreezeAction should be used within <DataGrid>");
  }

  const [pinnedRowCount, setPinnedRowCount] = React.useState(0);
  const [selectedRowsCount, setSelectedRowsCount] = React.useState(0);

  const { api, rowData } = context;

  const freezeRows = () => {
    if (!api) return;

    // Get currently selected rows
    const selectedRows = api.getSelectedNodes();

    if (selectedRows.length > 0) {
      // Pin the selected rows
      api.setGridOption(
        "pinnedTopRowData",
        selectedRows.map(row => row.data),
      );

      // Get current row data
      const allData = api.getRenderedNodes();
      // Filter out pinned rows from the main data
      const updatedNodes = allData.filter(row => !selectedRows.some(pinnedRow => pinnedRow.id === row.id));

      // Update the grid with the filtered data
      api.setGridOption(
        "rowData",
        updatedNodes.map(node => node.data),
      );
    }
  };

  const unfreezeRows = () => {
    if (!api) return;
    api.setGridOption("pinnedTopRowData", []);
    api.setGridOption("rowData", rowData);
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
      startIcon={<Snowflake className="w-4.5 h-4.5" />}
      disabled={(!pinnedRowCount && !selectedRowsCount) || disabled}
      {...props}
    >
      {pinnedRowCount ? (unFreezeText ?? "Unfreeze") : (freezeText ?? "Freeze")}
    </Button>
  );
};

type PrintActionProps = IconButtonProps & {};

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
    <IconButton variant="toolbar" className={cn("p-0.5 w-6 h-6", className)} onClick={handlePrint} {...props}>
      {children ?? <Print className="w-5 h-5" />}
    </IconButton>
  );
};

type RefreshActionProps = Omit<IconButtonProps, "onClick"> & {
  onRefresh: () => void;
};

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

type DeleteActionProps = Omit<ButtonProps, "onClick"> & {
  onDelete: () => void;
};

const DeleteAction: React.FC<DeleteActionProps> = ({ onDelete, children, ...props }) => {
  const handleDelete = () => {
    onDelete();
  };

  return (
    <Button variant="danger" onClick={handleDelete} startIcon={<Trashcan className="w-4.5 h-4.5" />} {...props}>
      {children}
    </Button>
  );
};

type ExtraActionsProps = PopoverContentProps & {
  children: React.ReactNode;
  slotProps?: {
    triggerProps?: PopoverTriggerProps;
    popoverProps?: PopoverProps;
  };
};

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
