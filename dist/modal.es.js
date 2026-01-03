import { jsx as t, jsxs as r } from "react/jsx-runtime";
import * as i from "react";
import { XMark as w } from "@trsys-tech/matrix-icons";
import * as o from "@radix-ui/react-dialog";
import { cn as s } from "./utils.es.js";
const b = o.Portal, v = o.Close, c = i.forwardRef(({ className: e, ...a }, l) => /* @__PURE__ */ t(
  o.Overlay,
  {
    ref: l,
    className: s(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      e
    ),
    ...a
  }
));
c.displayName = o.Overlay.displayName;
const m = ({ className: e, ...a }) => /* @__PURE__ */ t("div", { className: s("flex flex-row justify-between", e), ...a });
m.displayName = "DialogHeader";
const M = ({ className: e, ...a }) => /* @__PURE__ */ t("div", { className: s("flex flex-row justify-end gap-2", e), ...a });
M.displayName = "DialogFooter";
const p = i.forwardRef(
  ({ className: e, ...a }, l) => /* @__PURE__ */ t(o.Title, { ref: l, className: s("text-lg font-semibold leading-none tracking-tight", e), ...a })
);
p.displayName = o.Title.displayName;
const D = i.forwardRef(({ className: e, ...a }, l) => /* @__PURE__ */ t(o.Description, { ref: l, className: s("text-sm text-muted-foreground", e), ...a }));
D.displayName = o.Description.displayName;
const P = i.forwardRef((e, a) => {
  const { title: l, className: f, children: g, fullScreen: n, open: u, onOpenChange: N, defaultOpen: x, modal: h, slotProps: d, ...y } = e;
  return /* @__PURE__ */ t(o.Root, { defaultOpen: x, modal: h, open: u, onOpenChange: N, children: /* @__PURE__ */ r(b, { ...d?.portal ?? {}, children: [
    /* @__PURE__ */ t(c, {}),
    /* @__PURE__ */ r(
      o.Content,
      {
        ref: a,
        className: s(
          "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 w-full max-w-lg p-4 border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          n ? "w-screen h-screen" : "max-w-lg",
          f
        ),
        ...y,
        "aria-describedby": void 0,
        children: [
          /* @__PURE__ */ r(m, { ...d?.header ?? {}, children: [
            /* @__PURE__ */ t(p, { ...d?.title ?? {}, children: l }),
            /* @__PURE__ */ r(
              v,
              {
                ...d?.close ?? {},
                className: s(
                  "rounded-sm hover:bg-primary-50 hover:ring-2 hover:ring-primary-50 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground mt-0",
                  d?.close?.className
                ),
                children: [
                  /* @__PURE__ */ t(w, { className: "h-5 w-5" }),
                  /* @__PURE__ */ t("span", { className: "sr-only", children: "Close" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ t(
            "hr",
            {
              ...d?.divider ?? {},
              className: s("w-full border-muted -mt-[1px] pb-2", n && "w-screen -mx-4", d?.divider?.className)
            }
          ),
          g
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
