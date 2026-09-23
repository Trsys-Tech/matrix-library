import { jsx as a, jsxs as d } from "react/jsx-runtime";
import * as x from "react";
import { XMark as w } from "@trsys-tech/matrix-icons";
import * as m from "@radix-ui/react-dialog";
import { cn as o } from "./utils.es.js";
const b = m.Portal, v = m.Close, i = x.forwardRef(({ className: t, ...e }, s) => /* @__PURE__ */ a(
  m.Overlay,
  {
    ref: s,
    className: o(
      "mtx-fixed mtx-inset-0 mtx-z-50 mtx-bg-black/80  data-[state=open]:mtx-animate-in data-[state=closed]:mtx-animate-out data-[state=closed]:mtx-fade-out-0 data-[state=open]:mtx-fade-in-0",
      t
    ),
    ...e
  }
));
i.displayName = m.Overlay.displayName;
const n = ({ className: t, ...e }) => /* @__PURE__ */ a("div", { className: o("mtx-flex mtx-flex-row mtx-justify-between", t), ...e });
n.displayName = "DialogHeader";
const M = ({ className: t, ...e }) => /* @__PURE__ */ a("div", { className: o("mtx-flex mtx-flex-row mtx-justify-end mtx-gap-2", t), ...e });
M.displayName = "DialogFooter";
const c = x.forwardRef(
  ({ className: t, ...e }, s) => /* @__PURE__ */ a(m.Title, { ref: s, className: o("mtx-text-lg mtx-font-semibold mtx-leading-none mtx-tracking-tight", t), ...e })
);
c.displayName = m.Title.displayName;
const D = x.forwardRef(({ className: t, ...e }, s) => /* @__PURE__ */ a(m.Description, { ref: s, className: o("mtx-text-sm mtx-text-muted-foreground", t), ...e }));
D.displayName = m.Description.displayName;
const P = x.forwardRef((t, e) => {
  const { title: s, className: p, children: f, fullScreen: r, open: g, onOpenChange: u, defaultOpen: N, modal: h, slotProps: l, ...y } = t;
  return /* @__PURE__ */ a(m.Root, { defaultOpen: N, modal: h, open: g, onOpenChange: u, children: /* @__PURE__ */ d(b, { ...l?.portal ?? {}, children: [
    /* @__PURE__ */ a(i, {}),
    /* @__PURE__ */ d(
      m.Content,
      {
        ref: e,
        className: o(
          "mtx-fixed mtx-left-1/2 mtx-top-1/2 -mtx-translate-x-1/2 -mtx-translate-y-1/2 mtx-z-50 mtx-flex mtx-flex-col mtx-gap-2 mtx-w-full mtx-max-w-lg mtx-p-4 mtx-border mtx-bg-background mtx-shadow-lg mtx-duration-200 data-[state=open]:mtx-animate-in data-[state=closed]:mtx-animate-out data-[state=closed]:mtx-fade-out-0 data-[state=open]:mtx-fade-in-0 data-[state=closed]:mtx-zoom-out-95 data-[state=open]:mtx-zoom-in-95 data-[state=closed]:mtx-slide-out-to-left-1/2 data-[state=closed]:mtx-slide-out-to-top-[48%] data-[state=open]:mtx-slide-in-from-left-1/2 data-[state=open]:mtx-slide-in-from-top-[48%] sm:mtx-rounded-lg",
          r ? "mtx-w-screen mtx-h-screen" : "mtx-max-w-lg",
          p
        ),
        ...y,
        "aria-describedby": void 0,
        children: [
          /* @__PURE__ */ d(n, { ...l?.header ?? {}, children: [
            /* @__PURE__ */ a(c, { ...l?.title ?? {}, children: s }),
            /* @__PURE__ */ d(
              v,
              {
                ...l?.close ?? {},
                className: o(
                  "mtx-rounded-sm hover:mtx-bg-primary-50 hover:mtx-ring-2 hover:mtx-ring-primary-50 disabled:mtx-pointer-events-none data-[state=open]:mtx-bg-accent data-[state=open]:mtx-text-muted-foreground mtx-mt-0",
                  l?.close?.className
                ),
                children: [
                  /* @__PURE__ */ a(w, { className: "mtx-h-5 mtx-w-5" }),
                  /* @__PURE__ */ a("span", { className: "mtx-sr-only", children: "Close" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ a(
            "hr",
            {
              ...l?.divider ?? {},
              className: o(
                "mtx-w-full mtx-border-muted -mtx-mt-[1px] mtx-pb-2",
                r && "mtx-w-screen -mtx-mx-4",
                l?.divider?.className
              )
            }
          ),
          f
        ]
      }
    )
  ] }) });
});
export {
  P as Modal,
  M as ModalFooter
};
//# sourceMappingURL=modal.es.js.map
