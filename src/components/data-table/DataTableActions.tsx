"use client";

import * as React from "react";
import { CircleXmark, ElipsisVertical, Magnifier, Print, Refresh, Snowflake, Trashcan } from "@trsys-tech/matrix-icons";

import { cn } from "../../lib/utils";
import { Button, type ButtonProps } from "../button/Button";
import { IconButton, type IconButtonProps } from "../icon-botton/IconButton";
import { TextField } from "../text-field/TextField";
import { Checkbox } from "../checkbox/Checkbox";
import { Popover, PopoverContent, PopoverTrigger, type PopoverContentProps } from "../popover/Popover";
import { useDataTable } from "./DataTableContext";

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

export function DataTableSearchAction({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  defaultOpen = false,
  defaultOpenAutoFocus = true,
  placeholder = "Search…",
  label = "Search table",
  className,
  ...props
}: DataTableSearchActionProps) {
  const { api, search, setSearch } = useDataTable();
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [open, setOpen] = React.useState(defaultOpen);
  const [isClosing, setIsClosing] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const firstRender = React.useRef(true);
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(
    () => () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    },
    [],
  );

  React.useEffect(() => {
    if (open && (!firstRender.current || defaultOpenAutoFocus)) inputRef.current?.focus();
    firstRender.current = false;
  }, [open, defaultOpenAutoFocus]);

  const update = (value: string) => {
    if (onValueChange) {
      if (controlledValue === undefined) setInternalValue(value);
      onValueChange(value);
      return;
    }
    if (api) api.table.setGlobalFilter(value);
    else setSearch(value);
  };

  const handleClose = () => {
    setIsClosing(true);
    update("");
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
      closeTimeoutRef.current = null;
    }, 200);
  };

  const render = (value: string) => (
    <div className={cn("mtx-max-w-60", className)} {...props}>
      {open || isClosing ? (
        <TextField
          ref={inputRef}
          size="sm"
          className={cn("mtx-relative mtx-h-7.5", open && !isClosing && "mtx-animate-input-open", isClosing && "mtx-animate-input-close")}
          value={value}
          onChange={event => update(event.target.value)}
          slotProps={{ inputProps: { "aria-label": label, placeholder } }}
          startAdornment={
            <IconButton
              type="button"
              variant="toolbar"
              aria-label="Close search"
              className="mtx-p-0.5 mtx-h-6 mtx-w-6 mtx-border-none mtx-mx-1"
              onClick={handleClose}
            >
              <Magnifier className="mtx-w-5 mtx-h-5" />
            </IconButton>
          }
          endAdornment={
            value && (
              <IconButton
                type="button"
                variant="toolbar"
                aria-label="Clear search"
                className="mtx-p-0.5 mtx-w-6 mtx-h-6 mtx-border-none mtx-mx-1"
                onClick={() => {
                  update("");
                  inputRef.current?.focus();
                }}
              >
                <CircleXmark className="mtx-w-5 mtx-h-5" />
              </IconButton>
            )
          }
        />
      ) : (
        <IconButton type="button" variant="toolbar" aria-label={label} className="mtx-p-0.5 mtx-w-6 mtx-h-6 mtx-m-1" onClick={() => setOpen(true)}>
          <Magnifier className="mtx-w-5 mtx-h-5" />
        </IconButton>
      )}
    </div>
  );
  if (onValueChange) return render(controlledValue ?? internalValue);

  return api ? (
    <api.table.Subscribe selector={state => state.globalFilter}>{value => render(String(value ?? ""))}</api.table.Subscribe>
  ) : (
    render(search)
  );
}

export type DataTableFreezeActionProps = ButtonProps & { freezeText?: string; unFreezeText?: string; position?: "top" | "bottom" };
export function DataTableFreezeAction({
  freezeText = "Freeze",
  unFreezeText = "Unfreeze",
  position = "top",
  disabled,
  onClick,
  ...props
}: DataTableFreezeActionProps) {
  const { api, selectedCount, pinnedCount } = useDataTable();
  return (
    <Button
      type="button"
      variant="text"
      startIcon={<Snowflake className="mtx-h-4.5 mtx-w-4.5" />}
      {...props}
      disabled={disabled || !api || (!selectedCount && !pinnedCount)}
      onClick={event => {
        if (api) {
          if (pinnedCount) api.table.setRowPinning({ top: [], bottom: [] });
          else {
            api.pinRows(api.table.getSelectedRowIds(), position);
            api.deselectAll();
          }
        }
        onClick?.(event);
      }}
    >
      {pinnedCount ? unFreezeText : freezeText}
    </Button>
  );
}

export type DataTablePrintActionProps = IconButtonProps & { onPrintError?: (error: unknown) => void };
export function DataTablePrintAction({ onClick, children, disabled, onPrintError, className, ...props }: DataTablePrintActionProps) {
  const { api } = useDataTable();
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState(false);
  return (
    <>
      <IconButton
        type="button"
        variant="toolbar"
        aria-label="Print table"
        {...props}
        className={cn("mtx-h-6 mtx-w-6 mtx-p-0.5", className)}
        disabled={disabled || busy || !api}
        onClick={async event => {
          onClick?.(event);
          if (event.defaultPrevented || !api) return;
          setBusy(true);
          setError(false);
          try {
            await api.print();
          } catch (caught) {
            setError(true);
            onPrintError?.(caught);
          } finally {
            setBusy(false);
          }
        }}
      >
        {children ?? <Print className="mtx-h-5 mtx-w-5" />}
      </IconButton>
      {error && (
        <span role="alert" className="mtx-text-danger">
          Unable to print table
        </span>
      )}
    </>
  );
}

export type DataTableRefreshActionProps = Omit<IconButtonProps, "onClick"> & { onRefresh: () => void };
export function DataTableRefreshAction({ onRefresh, loading, children, disabled, className, ...props }: DataTableRefreshActionProps) {
  return (
    <IconButton
      type="button"
      variant="toolbar"
      aria-label="Refresh table"
      {...props}
      className={cn("mtx-h-6 mtx-w-6 mtx-p-0.5", className)}
      disabled={disabled || loading}
      onClick={onRefresh}
    >
      {children ?? <Refresh className={cn("mtx-h-4.5 mtx-w-4.5", loading && "mtx-animate-spin")} />}
    </IconButton>
  );
}

export type DataTableDeleteActionProps = Omit<ButtonProps, "onClick"> & { onDelete: () => void };
export function DataTableDeleteAction({ onDelete, ...props }: DataTableDeleteActionProps) {
  return <Button type="button" variant="danger" startIcon={<Trashcan className="mtx-h-4.5 mtx-w-4.5" />} {...props} onClick={onDelete} />;
}

export type DataTableExtraActionsProps = PopoverContentProps & { label?: string };
export function DataTableExtraActions({ children, label = "More actions", ...props }: DataTableExtraActionsProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton type="button" variant="toolbar" aria-label={label} className="mtx-h-6 mtx-w-6 mtx-p-0.5">
          <ElipsisVertical className="mtx-h-4.5 mtx-w-4.5" />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent align="end" {...props}>
        {children}
      </PopoverContent>
    </Popover>
  );
}

export type DataTableColumnsActionProps = IconButtonProps;
export function DataTableColumnsAction({ children, disabled, className, ...props }: DataTableColumnsActionProps) {
  const { api } = useDataTable();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton
          type="button"
          variant="toolbar"
          aria-label="Show or hide columns"
          {...props}
          className={cn("mtx-h-6 mtx-w-6 mtx-p-0.5", className)}
          disabled={disabled || !api}
        >
          {children ?? <ElipsisVertical className="mtx-h-4.5 mtx-w-4.5" />}
        </IconButton>
      </PopoverTrigger>
      <PopoverContent align="end" className="mtx-w-56 mtx-space-y-2">
        {api && (
          <api.table.Subscribe selector={state => state.columnVisibility}>
            {() =>
              api.table
                .getAllLeafColumns()
                .filter(column => !column.id.startsWith("__"))
                .map(column => (
                  <label key={column.id} className="mtx-flex mtx-items-center mtx-gap-2 mtx-text-xs">
                    <Checkbox
                      checked={column.getIsVisible()}
                      disabled={!column.getCanHide()}
                      onCheckedChange={value => column.toggleVisibility(value === true)}
                    />
                    {typeof column.columnDef.header === "string" ? column.columnDef.header : column.id}
                  </label>
                ))
            }
          </api.table.Subscribe>
        )}
      </PopoverContent>
    </Popover>
  );
}
