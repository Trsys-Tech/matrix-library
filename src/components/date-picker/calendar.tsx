"use client";

/* eslint-disable camelcase */
import * as React from "react";
import { Chevron, DayPicker, DayPickerProps } from "react-day-picker";
import { ChevronDown, ChevronLeft, ChevronRight } from "@trsys-tech/matrix-icons";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";

import { cn } from "../../lib/utils";
import { Button } from "../button/Button";

export type CalendarProps = DayPickerProps & {};

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  const yearCollapseRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    if (yearCollapseRef.current) {
      const { width, height } = yearCollapseRef.current.parentElement?.parentElement?.parentElement?.getBoundingClientRect() ?? {
        width: 0,
        height: 0,
      };
      setSize({ width, height });
    }
  }, []);

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("mtx-p-3 mtx-relative mtx-w-full mtx-max-w-sm mtx-group/root mtx-z-10", className)}
      classNames={{
        months: cn("mtx-relative mtx-flex mtx-flex-col", props.mode === "range" && "md:mtx-flex-row md:mtx-space-x-4 md:mtx-space-y-2"),
        month: "mtx-space-y-4 mtx-peer md:mtx-flex-1",
        month_caption: "mtx-flex mtx-justify-center mtx-pt-1 mtx-relative mtx-items-center",
        dropdowns: "mtx-flex mtx-gap-2",
        caption_label: "mtx-text-sm mtx-font-bold",
        nav: cn("mtx-space-x-1 mtx-flex mtx-items-center group-has-[[data-state=open]]/root:mtx-hidden", props.mode !== "range" && "mtx-relative"),
        button_previous: cn(
          "mtx-h-7 mtx-w-7 mtx-bg-transparent mtx-p-0 mtx-text-primary hover:mtx-opacity-100 mtx-absolute mtx-left-2 mtx-top-0 md:mtx-top-0.5 mtx-z-10",
          props.mode === "range" && "md:mtx-left-8 md:mtx-top-2",
        ),
        button_next: cn(
          "mtx-h-7 mtx-w-7 mtx-bg-transparent mtx-p-0 mtx-text-primary hover:mtx-opacity-100 mtx-absolute mtx-right-2 mtx-top-0 md:mtx-top-0.5 mtx-z-10",
          props.mode === "range" && "md:mtx-top-2",
        ),
        month_grid: cn("mtx-w-full mtx-border-collapse mtx-space-y-1"),
        weekdays: "mtx-grid mtx-grid-cols-7 mtx-justify-items-center",
        weekday: "mtx-text-text mtx-rounded-md mtx-w-8 mtx-font-bold mtx-text-sm",
        week: "mtx-mt-2 mtx-h-11 mtx-grid mtx-grid-cols-7 mtx-items-center",
        day: "mtx-relative mtx-p-0 mtx-text-center mtx-text-sm mtx-h-11 mtx-min-w-11 md:mtx-min-w-9 md:mtx-h-9",
        day_button: "mtx-w-11 md:mtx-w-9 mtx-h-full mtx-p-0 mtx-text-sm",
        range_start:
          "before:mtx-block before:mtx-absolute before:mtx--z-10 before:mtx-content-[''] before:mtx-w-1/2 before:mtx-end-0 before:mtx-h-full before:mtx-bg-secondary/50 after:!mtx-w-0",
        range_end:
          "after:mtx-block after:mtx-absolute after:mtx-top-0 after:mtx--z-10 after:mtx-content-[''] after:mtx-w-1/2 after:mtx-start-0 after:mtx-h-full after:mtx-bg-secondary/50 before:!mtx-w-0",
        selected:
          "[&>button]:mtx-bg-secondary [&>button]:mtx-rounded-full mtx-text-text mtx-font-bold [&>button]:hover:mtx-bg-secondary [&>button]:hover:mtx-text-text [&>button]:focus:mtx-bg-secondary [&>button]:focus:mtx-text-text [&>button]:mtx-text-xs",
        today: "mtx-text-primary mtx-font-bold [&>button]:mtx-text-xs",
        outside:
          "mtx-day-outside mtx-text-muted-foreground mtx-opacity-50 mtx-aria-selected:mtx-bg-accent/50 mtx-aria-selected:mtx-text-muted-foreground mtx-aria-selected:mtx-opacity-30",
        disabled: "mtx-text-muted-foreground mtx-opacity-50",
        range_middle:
          "mtx-bg-secondary/50 [&>button]:mtx-data-[selected='true']:mtx-bg-secondary/0 [&>button]:mtx-data-[selected='true']:mtx-rounded-none mtx-text-accent-foreground",
        hidden: "mtx-invisible",
        ...classNames,
      }}
      components={{
        Chevron: props => {
          if (props.orientation === "left") {
            return <ChevronLeft {...props} className="mtx-h-6 mtx-w-6" />;
          } else if (props.orientation === "right") {
            return <ChevronRight {...props} className="mtx-h-6 mtx-w-6" />;
          }
          return <Chevron {...props} />;
        },
        YearsDropdown: params => {
          const handleChange = (value: string) => {
            params.onChange?.({ target: { value: value } } as unknown as React.ChangeEvent<HTMLSelectElement>);
          };
          return (
            <Collapsible ref={yearCollapseRef}>
              <CollapsibleTrigger className="mtx-group mtx-flex mtx-items-center mtx-gap-1">
                {params.value}{" "}
                <ChevronDown className="mtx-text-primary mtx-w-5 mtx-h-5 group-data-[state='open']:mtx-rotate-180 mtx-transition-transform mtx-ms-auto" />
              </CollapsibleTrigger>
              <CollapsibleContent
                className="mtx-overflow-auto mtx-z-50 mtx-absolute mtx-bg-popover mtx-left-2 mtx-top-11 mtx-p-1"
                style={{ width: size.width, height: size.height - 44 }}
              >
                <div className="mtx-flex mtx-flex-row mtx-flex-wrap mtx-gap-4">
                  {params.options
                    ? [...params.options]
                        .sort((a, b) => Number(b.value) - Number(a.value)) // Sort in descending order (newest year first)
                        .map(option => (
                          <CollapsibleTrigger asChild key={option.label}>
                            <Button
                              data-value={option.value}
                              variant="text"
                              className={cn(
                                "mtx-h-6 mtx-w-14 mtx-py-1 mtx-px-3 mtx-rounded-full mtx-font-bold",
                                params.value === option.value && "mtx-bg-secondary",
                              )}
                              onClick={() => handleChange(option.value.toString())}
                            >
                              {option.label}
                            </Button>
                          </CollapsibleTrigger>
                        ))
                    : null}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
