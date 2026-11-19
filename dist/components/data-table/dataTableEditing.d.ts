export type DataTableEditSession<T extends object> = {
    rowId: string;
    columnId?: string;
    pageIndex: number;
    pageSize: number;
    source: T;
    original: T;
    draft: T;
    changes: Record<string, unknown>;
    parseErrors: Record<string, string>;
    errors: readonly string[];
};
//# sourceMappingURL=dataTableEditing.d.ts.map