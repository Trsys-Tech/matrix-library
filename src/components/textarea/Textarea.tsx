import * as React from "react";

import { cn } from "../../lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "mtx-flex mtx-min-h-[60px] mtx-w-full mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-px-3 mtx-py-2 mtx-text-xs mtx-font-medium mtx-text-text",
        "placeholder:mtx-text-text-300 focus-visible:mtx-outline-none focus-visible:mtx-border-primary disabled:mtx-opacity-50 disabled:mtx-text-text-300 disabled:mtx-bg-gray-100 disabled:mtx-border-gray-100",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
