import type { DataTableColumnDef, DataTableFilter, DataTableFilterType, DataTableInstance } from "./DataTable.types";

/** Keep the roving tab stop on a mounted row when virtualization changes the viewport. */
export function getActiveDataTableCell(
  focused: { rowId: string; columnId: string } | null,
  renderedIds: readonly string[],
  columnIds: readonly string[],
) {
  if (focused && renderedIds.includes(focused.rowId) && columnIds.includes(focused.columnId)) return focused;
  return { rowId: renderedIds[0], columnId: columnIds[0] };
}

/** Reorder within the current region without changing pinning or dropping hidden column IDs. */
export function moveDataTableColumn<T extends object>(table: DataTableInstance<T>, sourceId: string, targetId: string): boolean {
  if (sourceId === targetId || sourceId.startsWith("__") || targetId.startsWith("__")) return false;
  const source = table.getColumn(sourceId);
  const target = table.getColumn(targetId);
  if (!source || !target || !source.getIsVisible() || !target.getIsVisible() || source.getIsPinned() !== target.getIsPinned()) return false;
  const region = source.getIsPinned();
  const order = region ? (table.atoms.columnPinning.get()[region] ?? []) : table.getAllLeafColumns().map(column => column.id);
  const from = order.indexOf(sourceId);
  const to = order.indexOf(targetId);
  if (from < 0 || to < 0) return false;
  const next = [...order];
  next.splice(from, 1);
  next.splice(to, 0, sourceId);
  if (region) table.setColumnPinning(previous => ({ ...previous, [region]: next }));
  else table.setColumnOrder(next);
  return true;
}

export function getColumnId<T extends object>(column: DataTableColumnDef<T>): string {
  const id = column.colId ?? column.field;
  if (!id || id.startsWith("__")) throw new Error("DataTable columns require a unique field or colId (ids starting with __ are reserved).");
  return id;
}

export function getCellValue<T extends object>(data: T, column: DataTableColumnDef<T>, rowIndex: number): unknown {
  if (column.valueGetter) return column.valueGetter({ data, rowIndex });
  return column.field?.split(".").reduce<unknown>((value, key) => (value as Record<string, unknown> | null)?.[key], data);
}

export function setCellValue<T extends object>(data: T, column: DataTableColumnDef<T>, value: unknown): T {
  if (column.valueSetter) return column.valueSetter(data, value);
  if (!column.field) return data;
  const keys = column.field.split(".");
  const set = (source: unknown, depth: number): unknown => {
    const key = keys[depth];
    const record = source as Record<string, unknown> | undefined;
    const result = (Array.isArray(source) ? [...source] : { ...record }) as Record<string, unknown>;
    result[key] = depth === keys.length - 1 ? value : set(record?.[key], depth + 1);
    return result;
  };
  return set(data, 0) as T;
}

const dateInputPrefix = /^\d{4}-\d{2}-\d{2}/;
const dateInputValue = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Native date inputs accept yyyy-MM-dd text only; serialize Date values locally and keep string dates. */
export function toDateInputValue(value: unknown): string {
  if (value instanceof Date && Number.isFinite(value.getTime()))
    return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`;
  if (typeof value === "string") return dateInputPrefix.exec(value)?.[0] ?? "";
  return "";
}

/** Parse date input text back to a Date for date columns; text columns keep the typed string and clearing gives null. */
export function parseDateInputValue(
  rawValue: string,
  previousValue: unknown,
  cellDataType?: DataTableColumnDef<Record<string, unknown>>["cellDataType"],
): unknown {
  if (rawValue === "") return null;
  const match = dateInputValue.exec(rawValue);
  if (!match || (cellDataType !== "date" && !(previousValue instanceof Date))) return rawValue;
  const year = +match[1];
  const month = +match[2] - 1;
  const day = +match[3];
  const date = new Date(year, month, day);
  return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day ? date : rawValue;
}

export function filterType<T extends object>(column: DataTableColumnDef<T>): DataTableFilterType {
  if (typeof column.filter === "string") return column.filter;
  if (column.cellDataType === "number") return "number";
  if (column.cellDataType === "date" || column.cellDataType === "dateString") return "date";
  return "text";
}

export function matchesFilter(value: unknown, filter: DataTableFilter | string | undefined, type: DataTableFilterType): boolean {
  if (filter === undefined || filter === "") return true;
  const condition: DataTableFilter = typeof filter === "string" ? { operator: type === "select" ? "equals" : "contains", value: filter } : filter;
  const blank = value === null || value === undefined || value === "";
  if (condition.operator === "blank") return blank;
  if (condition.operator === "notBlank") return !blank;
  if (condition.value === undefined || condition.value === "") return true;
  if (blank) return false;
  const normalize = (input: unknown): string | number => {
    if (type === "number") return Number(input);
    if (type === "date") {
      if (input instanceof Date) return new Date(input.getFullYear(), input.getMonth(), input.getDate()).getTime();
      const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(input));
      if (!match) return NaN;
      const date = new Date(+match[1], +match[2] - 1, +match[3]);
      return date.getFullYear() === +match[1] && date.getMonth() === +match[2] - 1 && date.getDate() === +match[3] ? date.getTime() : NaN;
    }
    return type === "select" ? String(input) : String(input).toLocaleLowerCase();
  };
  const a = normalize(value);
  const b = normalize(condition.value);
  if ((typeof a === "number" && !Number.isFinite(a)) || (typeof b === "number" && !Number.isFinite(b))) return false;
  switch (condition.operator) {
    case "contains":
      return String(a).includes(String(b));
    case "notContains":
      return !String(a).includes(String(b));
    case "startsWith":
      return String(a).startsWith(String(b));
    case "endsWith":
      return String(a).endsWith(String(b));
    case "equals":
      return a === b;
    case "notEqual":
      return a !== b;
    case "greaterThan":
      return a > b;
    case "greaterThanOrEqual":
      return a >= b;
    case "lessThan":
      return a < b;
    case "lessThanOrEqual":
      return a <= b;
    case "inRange":
      return condition.valueTo !== undefined && condition.valueTo !== "" && a >= b && a <= normalize(condition.valueTo);
    default:
      return true;
  }
}

/** Distribute surplus width without allowing pinned offsets to differ from rendered widths. */
export function getFlexSizes<T extends object>(
  columns: readonly DataTableColumnDef<T>[],
  available: number,
  sizes: Record<string, number>,
): Record<string, number> {
  const result: Record<string, number> = {};
  let remaining = available;
  let flexible = columns.filter(column => (column.flex ?? 0) > 0 && sizes[getColumnId(column)] === undefined);
  for (const column of columns) {
    if (!flexible.includes(column)) {
      remaining -= Math.max(
        column.minWidth ?? 60,
        Math.min(column.maxWidth ?? Number.MAX_SAFE_INTEGER, sizes[getColumnId(column)] ?? column.width ?? 150),
      );
    }
  }
  while (flexible.length) {
    const weight = flexible.reduce((sum, column) => sum + column.flex!, 0);
    const allocations = flexible.map(column => {
      const share = (remaining * column.flex!) / weight;
      const width = Math.max(column.minWidth ?? 60, Math.min(column.maxWidth ?? Number.MAX_SAFE_INTEGER, share));
      return { column, share, width };
    });
    const violation = allocations.reduce((sum, { share, width }) => sum + width - share, 0);
    if (Math.abs(violation) < 1e-8) {
      for (const { column, width } of allocations) result[getColumnId(column)] = width;
      break;
    }
    // Freeze only the bounds causing the net violation. Other columns may fit after redistribution.
    const constrained = allocations.filter(({ share, width }) => (violation > 0 ? width > share : width < share));
    for (const { column, width } of constrained) {
      result[getColumnId(column)] = width;
      remaining -= width;
    }
    flexible = flexible.filter(column => !constrained.some(allocation => allocation.column === column));
  }
  return result;
}
