"use client";

import * as React from "react";

import { DataTableAlignmentContext, type AlignmentState } from "./DataTableContext";

export type DataTableAlignmentProps = {
  children: React.ReactNode;
  initialState?: Partial<AlignmentState>;
};

/** Tables in this provider share column layout and horizontal scroll, but retain independent data and selection. */
export function DataTableAlignment({ children, initialState = {} }: DataTableAlignmentProps) {
  const [state, setState] = React.useState(initialState);
  const viewports = React.useRef(new Set<HTMLDivElement>());
  const value = React.useMemo(() => ({ state, setState, viewports }), [state]);
  return <DataTableAlignmentContext.Provider value={value}>{children}</DataTableAlignmentContext.Provider>;
}
