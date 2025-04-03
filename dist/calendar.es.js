import { jsx as t, jsxs as i } from "react/jsx-runtime";
import * as d from "react";
import { DayPicker as b, Chevron as g } from "react-day-picker";
import { ChevronLeft as p, ChevronRight as x, ChevronDown as w } from "@trsys-tech/matrix-icons";
import { Collapsible as y, CollapsibleTrigger as c, CollapsibleContent as v } from "@radix-ui/react-collapsible";
import { cn as a } from "./utils.es.js";
import { Button as C } from "./button.es.js";
function N({ className: m, classNames: f, showOutsideDays: u = !0, ...o }) {
  const n = d.useRef(null), [s, h] = d.useState({ width: 0, height: 0 });
  return d.useEffect(() => {
    if (n.current) {
      const { width: e, height: l } = n.current.parentElement?.parentElement?.parentElement?.getBoundingClientRect() ?? {
        width: 0,
        height: 0
      };
      h({ width: e, height: l });
    }
  }, []), /* @__PURE__ */ t(
    b,
    {
      showOutsideDays: u,
      className: a("p-3 relative w-full max-w-sm group/root z-10", m),
      classNames: {
        months: a("relative flex flex-col", o.mode === "range" && "md:flex-row md:space-x-4 md:space-y-2"),
        month: "space-y-4 peer md:flex-1",
        month_caption: "flex justify-center pt-1 relative items-center",
        dropdowns: "flex gap-2",
        caption_label: "text-sm font-bold",
        nav: a("space-x-1 flex items-center group-has-[[data-state=open]]/root:hidden", o.mode !== "range" && "relative"),
        button_previous: a(
          "h-7 w-7 bg-transparent p-0 text-primary hover:opacity-100 absolute left-2 top-0 md:top-0.5 z-10",
          o.mode === "range" && "md:left-8 md:top-2"
        ),
        button_next: a(
          "h-7 w-7 bg-transparent p-0 text-primary hover:opacity-100 absolute right-2 top-0 md:top-0.5 z-10",
          o.mode === "range" && "md:top-2"
        ),
        month_grid: a("w-full border-collapse space-y-1"),
        weekdays: "grid grid-cols-7 justify-items-center",
        weekday: "text-text rounded-md w-8 font-bold text-sm",
        week: "mt-2 h-11 grid grid-cols-7 items-center",
        day: "relative p-0 text-center text-sm h-11 min-w-11 md:min-w-9 md:h-9",
        day_button: "w-11 md:w-9 h-full p-0 text-sm",
        range_start: "before:block before:absolute before:-z-10 before:content-[''] before:w-1/2 before:end-0 before:h-full before:bg-secondary/50 after:!w-0",
        range_end: "after:block after:absolute after:top-0 after:-z-10 after:content-[''] after:w-1/2 after:start-0 after:h-full after:bg-secondary/50 before:!w-0",
        selected: "[&>button]:bg-secondary [&>button]:rounded-full text-text font-bold [&>button]:hover:bg-secondary [&>button]:hover:text-text [&>button]:focus:bg-secondary [&>button]:focus:text-text [&>button]:text-xs",
        today: "text-primary font-bold [&>button]:text-xs",
        outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-50",
        range_middle: "bg-secondary/50 [&>button]:data-[selected='true']:bg-secondary/0 data-[selected='true']:rounded-none text-accent-foreground",
        hidden: "invisible",
        ...f
      },
      components: {
        Chevron: (e) => e.orientation === "left" ? /* @__PURE__ */ t(p, { ...e, className: "h-6 w-6" }) : e.orientation === "right" ? /* @__PURE__ */ t(x, { ...e, className: "h-6 w-6" }) : /* @__PURE__ */ t(g, { ...e }),
        YearsDropdown: (e) => {
          const l = (r) => {
            e.onChange?.({ target: { value: r } });
          };
          return /* @__PURE__ */ i(y, { ref: n, children: [
            /* @__PURE__ */ i(c, { className: "group flex items-center gap-1", children: [
              e.value,
              " ",
              /* @__PURE__ */ t(w, { className: "text-primary w-5 h-5 group-data-[state='open']:rotate-180 transition-transform ms-auto" })
            ] }),
            /* @__PURE__ */ t(
              v,
              {
                className: "overflow-auto z-50 absolute bg-popover left-2 top-11 p-1",
                style: { width: s.width, height: s.height - 44 },
                children: /* @__PURE__ */ t("div", { className: "flex flex-row flex-wrap gap-4", children: e.options?.reverse()?.map((r) => /* @__PURE__ */ t(c, { asChild: !0, children: /* @__PURE__ */ t(
                  C,
                  {
                    "data-value": r.value,
                    variant: "text",
                    className: a("h-6 w-14 py-1 px-3 rounded-full font-bold", e.value === r.value && "bg-secondary"),
                    onClick: () => l(r.value.toString()),
                    children: r.label
                  }
                ) }, r.label)) })
              }
            )
          ] });
        }
      },
      ...o
    }
  );
}
N.displayName = "Calendar";
export {
  N as Calendar
};
//# sourceMappingURL=calendar.es.js.map
