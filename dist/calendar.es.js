import { jsx as m, jsxs as d } from "react/jsx-runtime";
import * as n from "react";
import { DayPicker as h, Chevron as g } from "react-day-picker";
import { ChevronDown as p, ChevronLeft as y, ChevronRight as w } from "@trsys-tech/matrix-icons";
import { Collapsible as v, CollapsibleTrigger as s, CollapsibleContent as C } from "@radix-ui/react-collapsible";
import { cn as x } from "./utils.es.js";
import { Button as N } from "./button.es.js";
function _({ className: i, classNames: u, showOutsideDays: c = !0, ...r }) {
  const o = n.useRef(null), [l, f] = n.useState({ width: 0, height: 0 });
  return n.useEffect(() => {
    if (o.current) {
      const { width: t, height: a } = o.current.parentElement?.parentElement?.parentElement?.getBoundingClientRect() ?? {
        width: 0,
        height: 0
      };
      f({ width: t, height: a });
    }
  }, []), /* @__PURE__ */ m(
    h,
    {
      showOutsideDays: c,
      className: x("mtx-p-3 mtx-relative mtx-w-full mtx-max-w-sm mtx-group/root mtx-z-10", i),
      classNames: {
        months: x("mtx-relative mtx-flex mtx-flex-col", r.mode === "range" && "md:mtx-flex-row md:mtx-space-x-4 md:mtx-space-y-2"),
        month: "mtx-space-y-4 mtx-peer md:mtx-flex-1",
        month_caption: "mtx-flex mtx-justify-center mtx-pt-1 mtx-relative mtx-items-center",
        dropdowns: "mtx-flex mtx-gap-2",
        caption_label: "mtx-text-sm mtx-font-bold",
        nav: x("mtx-space-x-1 mtx-flex mtx-items-center group-has-[[data-state=open]]/root:mtx-hidden", r.mode !== "range" && "mtx-relative"),
        button_previous: x(
          "mtx-h-7 mtx-w-7 mtx-bg-transparent mtx-p-0 mtx-text-primary hover:mtx-opacity-100 mtx-absolute mtx-left-2 mtx-top-0 md:mtx-top-0.5 mtx-z-10",
          r.mode === "range" && "md:mtx-left-8 md:mtx-top-2"
        ),
        button_next: x(
          "mtx-h-7 mtx-w-7 mtx-bg-transparent mtx-p-0 mtx-text-primary hover:mtx-opacity-100 mtx-absolute mtx-right-2 mtx-top-0 md:mtx-top-0.5 mtx-z-10",
          r.mode === "range" && "md:mtx-top-2"
        ),
        month_grid: x("mtx-w-full mtx-border-collapse mtx-space-y-1"),
        weekdays: "mtx-grid mtx-grid-cols-7 mtx-justify-items-center",
        weekday: "mtx-text-text mtx-rounded-md mtx-w-8 mtx-font-bold mtx-text-sm",
        week: "mtx-mt-2 mtx-h-11 mtx-grid mtx-grid-cols-7 mtx-items-center",
        day: "mtx-relative mtx-p-0 mtx-text-center mtx-text-sm mtx-h-11 mtx-min-w-11 md:mtx-min-w-9 md:mtx-h-9",
        day_button: "mtx-w-11 md:mtx-w-9 mtx-h-full mtx-p-0 mtx-text-sm",
        range_start: "before:mtx-block before:mtx-absolute before:mtx--z-10 before:mtx-content-[''] before:mtx-w-1/2 before:mtx-end-0 before:mtx-h-full before:mtx-bg-secondary/50 after:!mtx-w-0",
        range_end: "after:mtx-block after:mtx-absolute after:mtx-top-0 after:mtx--z-10 after:mtx-content-[''] after:mtx-w-1/2 after:mtx-start-0 after:mtx-h-full after:mtx-bg-secondary/50 before:!mtx-w-0",
        selected: "[&>button]:mtx-bg-secondary [&>button]:mtx-rounded-full mtx-text-text mtx-font-bold [&>button]:hover:mtx-bg-secondary [&>button]:hover:mtx-text-text [&>button]:focus:mtx-bg-secondary [&>button]:focus:mtx-text-text [&>button]:mtx-text-xs",
        today: "mtx-text-primary mtx-font-bold [&>button]:mtx-text-xs",
        outside: "mtx-day-outside mtx-text-muted-foreground mtx-opacity-50 mtx-aria-selected:mtx-bg-accent/50 mtx-aria-selected:mtx-text-muted-foreground mtx-aria-selected:mtx-opacity-30",
        disabled: "mtx-text-muted-foreground mtx-opacity-50",
        range_middle: "mtx-bg-secondary/50 [&>button]:mtx-data-[selected='true']:mtx-bg-secondary/0 [&>button]:mtx-data-[selected='true']:mtx-rounded-none mtx-text-accent-foreground",
        hidden: "mtx-invisible",
        ...u
      },
      components: {
        Chevron: (t) => t.orientation === "left" ? /* @__PURE__ */ m(y, { ...t, className: "mtx-h-6 mtx-w-6" }) : t.orientation === "right" ? /* @__PURE__ */ m(w, { ...t, className: "mtx-h-6 mtx-w-6" }) : /* @__PURE__ */ m(g, { ...t }),
        YearsDropdown: (t) => {
          const a = (e) => {
            t.onChange?.({ target: { value: e } });
          };
          return /* @__PURE__ */ d(v, { ref: o, children: [
            /* @__PURE__ */ d(s, { className: "mtx-group mtx-flex mtx-items-center mtx-gap-1", children: [
              t.value,
              " ",
              /* @__PURE__ */ m(p, { className: "mtx-text-primary mtx-w-5 mtx-h-5 group-data-[state='open']:mtx-rotate-180 mtx-transition-transform mtx-ms-auto" })
            ] }),
            /* @__PURE__ */ m(
              C,
              {
                className: "mtx-overflow-auto mtx-z-50 mtx-absolute mtx-bg-popover mtx-left-2 mtx-top-11 mtx-p-1",
                style: { width: l.width, height: l.height - 44 },
                children: /* @__PURE__ */ m("div", { className: "mtx-flex mtx-flex-row mtx-flex-wrap mtx-gap-4", children: t.options ? [...t.options].sort((e, b) => Number(b.value) - Number(e.value)).map((e) => /* @__PURE__ */ m(s, { asChild: !0, children: /* @__PURE__ */ m(
                  N,
                  {
                    "data-value": e.value,
                    variant: "text",
                    className: x(
                      "mtx-h-6 mtx-w-14 mtx-py-1 mtx-px-3 mtx-rounded-full mtx-font-bold",
                      t.value === e.value && "mtx-bg-secondary"
                    ),
                    onClick: () => a(e.value.toString()),
                    type: "button",
                    children: e.label
                  }
                ) }, e.label)) : null })
              }
            )
          ] });
        }
      },
      ...r
    }
  );
}
_.displayName = "Calendar";
export {
  _ as Calendar
};
//# sourceMappingURL=calendar.es.js.map
