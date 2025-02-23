import * as React from "react";

import { cn } from "../../lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-sm border border-input bg-transparent px-3 py-2 text-xs font-medium shadow-sm text-text",
        "placeholder:text-text-300 focus-visible:outline-none focus-visible:border-primary disabled:opacity-50 disabled:text-text-300 disabled:bg-gray-100 disabled:border-gray-100",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
