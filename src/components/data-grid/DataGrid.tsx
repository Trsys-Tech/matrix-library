import React, { HTMLAttributes } from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { GridApi, GridReadyEvent, themeQuartz } from "ag-grid-community";

import { cn } from "../../lib/utils";
import { PrintIcon } from "../Icons/PrintIcon";
import { printHtml } from "../../lib/printHtml";
import { SearchIcon } from "../Icons/SearchIcon";
import { RefreshIcon } from "../Icons/RefreshIcon";
import { TextField } from "../text-field/TextField";
import { SnowflakeIcon } from "../Icons/SnowflakeIcon";
import { Button, ButtonProps } from "../button/Button";
import { CloseCircleIcon } from "../Icons/CloseCircleIcon";
import { ElipsisVerticalIcon } from "../Icons/ElipsisVerticalIcon";
import { IconButton, IconButtonProps } from "../icon-botton/IconButton";
import { Popover, PopoverContent, PopoverContentProps, PopoverProps, PopoverTrigger, PopoverTriggerProps } from "../popover/Popover";

const appTheme = themeQuartz.withParams({
  fontFamily: "DMSans",
  fontSize: "12px",
  headerFontSize: "12px",
  headerFontWeight: 700,
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
      }}
    >
      {children}
    </DataGridContext.Provider>
  );
};

type DataGridContentProps = AgGridReactProps & {};

const DataGridContent: React.FC<DataGridContentProps> = ({
  theme: propTheme,
  onGridReady,
  quickFilterText: quickFilterTextProps,
  rowData: rowDataProps,
  containerStyle,
  ...props
}) => {
  const context = React.useContext(DataGridContext);

  if (!context) {
    throw new Error("DataGridContent should be used within <DataGrid>");
  }
  const { rowData, setRowData, actionbarExists, setApi, setQuickFilterText, quickFilterText, gridId } = context;

  const theme = appTheme.withParams({
    headerHeight: 40,
    wrapperBorderRadius: actionbarExists ? "0px 0px 8px 8px" : "8px",
  });

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
      containerStyle={{ height: `calc(100% - ${actionbarExists ? 3 : 0}rem)`, ...containerStyle }}
      {...props}
    />
  );
};

type DatagridActionBarProps = HTMLAttributes<HTMLDivElement> & {};

const DataGridActionBar: React.FC<DatagridActionBarProps> = ({ className, ...props }) => {
  const context = React.useContext(DataGridContext);

  if (!context) {
    throw new Error("DataGridActionBar should be used within <DataGrid>");
  }
  const { setActionbarExists } = context;
  const { children } = props;

  React.useEffect(() => {
    setActionbarExists(true);
    return () => setActionbarExists(false);
  }, [setActionbarExists]);

  return (
    <div
      className={cn(
        "relative flex items-center p-2 h-12 w-full bg-gray-0 border border-gray-200 border-b-0 -mb-[1px] z-10 rounded-t-[8px]",
        className,
      )}
    >
      {children}
    </div>
  );
};

type SearchActionProps = {
  defaultOpen?: boolean;
};

const SearchAction: React.FC<SearchActionProps> = ({ defaultOpen = false }) => {
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
    <div className="max-w-60">
      {isSearchInputOpen || isClosing ? (
        <TextField
          ref={inputRef}
          className={cn("relative h-7.5", isSearchInputOpen && !isClosing ? "animate-input-open" : "", isClosing && "animate-input-close")}
          onChange={e => setQuickFilterText(e.target.value)}
          value={quickFilterText}
          startButton={
            <Button variant="text" className="p-0 h-6 w-6 border-none mx-1" onClick={handleClose}>
              <SearchIcon className="w-6 h-6" />
            </Button>
          }
          endButton={
            quickFilterText && (
              <Button variant="text" className="p-1 w-6 h-6 border-none mx-1" onClick={handleClear}>
                <CloseCircleIcon className="w-5 h-5" />
              </Button>
            )
          }
        />
      ) : (
        <IconButton variant="toolbar" className="p-0 w-6 h-6 m-1" onClick={handleOpen}>
          <SearchIcon className="w-6 h-6" />
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
      startIcon={<SnowflakeIcon className="w-4.5 h-4.5" />}
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
    <IconButton variant="toolbar" className={cn("p-0 w-6 h-6", className)} onClick={handlePrint} {...props}>
      {children ?? <PrintIcon className="w-4.5 h-4.5" />}
    </IconButton>
  );
};

type RefreshActionProps = Omit<IconButtonProps, "onClick"> & {
  refreshRowData: () => void;
};

const RefreshAction: React.FC<RefreshActionProps> = ({ className, refreshRowData, children, ...props }) => {
  const context = React.useContext(DataGridContext);

  if (!context) {
    throw new Error("RefreshAction should be used within <DataGrid>");
  }

  const handleRefresh = () => {
    refreshRowData();
  };

  return (
    <IconButton className={cn("p-0 w-6 h-6", className)} variant="toolbar" onClick={handleRefresh} {...props}>
      {children ?? <RefreshIcon className="w-4.5 h-4.5" />}
    </IconButton>
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
        <ElipsisVerticalIcon className="w-4.5 h-4.5 text-primary" />
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
  type DataGridProps,
  type DataGridContentProps,
  type DatagridActionBarProps,
  type SearchActionProps,
  type FreezeActionProps,
  type RefreshActionProps,
  type ExtraActionsProps,
  useDataGrid,
};
