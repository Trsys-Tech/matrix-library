import * as React from "react";
type DataTableColumnHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
    columnId: string;
    label: string;
    region: "start" | "end" | false;
    disabled: boolean;
};
/** The header is the drag surface; menus and resizing opt out through the sensor. */
export declare function DataTableColumnHeader({ columnId, label, region, disabled, className, children, onClickCapture, ...props }: DataTableColumnHeaderProps): React.JSX.Element;
export {};
//# sourceMappingURL=DataTableColumnHeader.d.ts.map