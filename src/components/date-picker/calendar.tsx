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
      className={cn("p-3 relative w-full max-w-sm group/root z-10", className)}
      classNames={{
        months: cn("relative flex flex-col", props.mode === "range" && "md:flex-row md:space-x-4 md:space-y-2"),
        month: "space-y-4 peer md:flex-1",
        month_caption: "flex justify-center pt-1 relative items-center",
        dropdowns: "flex gap-2",
        caption_label: "text-sm font-bold",
        nav: cn("space-x-1 flex items-center group-has-[[data-state=open]]/root:hidden", props.mode !== "range" && "relative"),
        button_previous: cn(
          "h-7 w-7 bg-transparent p-0 text-primary hover:opacity-100 absolute left-2 top-0 md:top-0.5 z-10",
          props.mode === "range" && "md:left-8 md:top-2",
        ),
        button_next: cn(
          "h-7 w-7 bg-transparent p-0 text-primary hover:opacity-100 absolute right-2 top-0 md:top-0.5 z-10",
          props.mode === "range" && "md:top-2",
        ),
        month_grid: cn("w-full border-collapse space-y-1"),
        weekdays: "grid grid-cols-7 justify-items-center",
        weekday: "text-text rounded-md w-8 font-bold text-sm",
        week: "mt-2 h-11 grid grid-cols-7 items-center",
        day: "relative p-0 text-center text-sm h-11 min-w-11 md:min-w-9 md:h-9",
        day_button: "w-11 md:w-9 h-full p-0 text-sm",
        range_start:
          "before:block before:absolute before:-z-10 before:content-[''] before:w-1/2 before:end-0 before:h-full before:bg-secondary/50 after:!w-0",
        range_end:
          "after:block after:absolute after:top-0 after:-z-10 after:content-[''] after:w-1/2 after:start-0 after:h-full after:bg-secondary/50 before:!w-0",
        selected:
          "[&>button]:bg-secondary [&>button]:rounded-full text-text font-bold [&>button]:hover:bg-secondary [&>button]:hover:text-text [&>button]:focus:bg-secondary [&>button]:focus:text-text [&>button]:text-xs",
        today: "text-primary font-bold [&>button]:text-xs",
        outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-50",
        range_middle: "bg-secondary/50 [&>button]:data-[selected='true']:bg-secondary/0 data-[selected='true']:rounded-none text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: props => {
          if (props.orientation === "left") {
            return <ChevronLeft {...props} className="h-6 w-6" />;
          } else if (props.orientation === "right") {
            return <ChevronRight {...props} className="h-6 w-6" />;
          }
          return <Chevron {...props} />;
        },
        YearsDropdown: props => {
          const handleChange = (value: string) => {
            props.onChange?.({ target: { value: value } } as unknown as React.ChangeEvent<HTMLSelectElement>);
          };
          return (
            <Collapsible ref={yearCollapseRef}>
              <CollapsibleTrigger className="group flex items-center gap-1">
                {props.value} <ChevronDown className="text-primary w-5 h-5 group-data-[state='open']:rotate-180 transition-transform ms-auto" />
              </CollapsibleTrigger>
              <CollapsibleContent
                className="overflow-auto z-50 absolute bg-popover left-2 top-11 p-1"
                style={{ width: size.width, height: size.height - 44 }}
              >
                <div className="flex flex-row flex-wrap gap-4">
                  {props.options?.reverse()?.map(option => (
                    <CollapsibleTrigger asChild key={option.label}>
                      <Button
                        data-value={option.value}
                        variant="text"
                        className={cn("h-6 w-14 py-1 px-3 rounded-full font-bold", props.value === option.value && "bg-secondary")}
                        onClick={() => handleChange(option.value.toString())}
                      >
                        {option.label}
                      </Button>
                    </CollapsibleTrigger>
                  ))}
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
