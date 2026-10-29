import { AlignmentState } from './DataTableContext';
import * as React from "react";
export type DataTableAlignmentProps = {
    children: React.ReactNode;
    initialState?: Partial<AlignmentState>;
};
/** Tables in this provider share column layout and horizontal scroll, but retain independent data and selection. */
export declare function DataTableAlignment({ children, initialState }: DataTableAlignmentProps): React.JSX.Element;
//# sourceMappingURL=DataTableAlignment.d.ts.map