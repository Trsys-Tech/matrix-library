import { jsxs as M, jsx as l } from "react/jsx-runtime";
import { useState as P, useRef as h, useEffect as b } from "react";
import { cn as a } from "./utils.es.js";
const k = () => {
  const e = /* @__PURE__ */ new Date(), r = e.getHours();
  return { hour: r % 12 || 12, minute: e.getMinutes(), ampm: r < 12 ? "AM" : "PM" };
}, y = (e, r, n) => Math.min(Math.max(e, r), n), B = (e) => e ? { hour: 0, minute: 0 } : k(), d = (e, r) => {
  if (!e)
    return B(r);
  const n = y(e.minute, 0, 59), c = e.ampm ? e.hour % 12 + (e.ampm === "PM" ? 12 : 0) : e.hour;
  return r ? { hour: y(c, 0, 23), minute: n } : {
    hour: c % 12 || 12,
    minute: n,
    ampm: e.ampm ?? (c >= 12 ? "PM" : "AM")
  };
}, z = ({ isOpen: e, time: r, is24HourMode: n = !1, onTimeChange: c, slotsProps: i }) => {
  const [u, p] = P(() => d(r, n)), o = h(u), g = h(null), w = h(null), x = 32, s = 8, T = n ? Array.from({ length: 24 }, (t, m) => m) : Array.from({ length: 12 }, (t, m) => m + 1), v = (t) => {
    g?.current?.scrollTo({
      top: t * (x + s),
      behavior: "smooth"
    });
  }, S = (t) => {
    w?.current?.scrollTo({
      top: t * (x + s),
      behavior: "smooth"
    });
  }, f = (t) => {
    const m = d(t, n);
    o.current = m, p(m), c(m);
  }, N = (t) => {
    f({ ...o.current, hour: t });
  }, A = (t) => {
    f({ ...o.current, minute: t });
  }, j = (t) => {
    f({ ...o.current, ampm: t });
  };
  return b(() => {
    if (e) {
      const t = d(r, n);
      o.current = t, p(t);
    }
  }, [e, r, n]), b(() => {
    if (!e)
      return;
    const t = window.setTimeout(() => {
      v(n ? o.current.hour : o.current.hour - 1), S(o.current.minute);
    });
    return () => window.clearTimeout(t);
  }, [e, n]), /* @__PURE__ */ M(
    "div",
    {
      ...i?.content ?? {},
      className: a("mtx-py-2 mtx-px-0 mtx-h-52 mtx-w-full mtx-flex mtx-justify-center mtx-gap-1", i?.content?.className),
      children: [
        /* @__PURE__ */ l("div", { className: "mtx-w-24 mtx-px-2 mtx-h-full mtx-relative mtx-overflow-auto mtx-thin-scrollbar", ref: g, children: T.map((t) => /* @__PURE__ */ l(
          "button",
          {
            style: { height: x, marginBottom: s },
            className: a(
              "mtx-w-full mtx-flex mtx-justify-center mtx-items-center mtx-rounded-full mtx-text-xs mtx-font-bold mtx-text-text-400",
              t === u.hour && "mtx-bg-secondary"
            ),
            onClick: () => N(t),
            type: "button",
            children: t.toString().padStart(2, "0")
          },
          t
        )) }),
        /* @__PURE__ */ l("div", { className: "mtx-h-full mtx-w-24 mtx-px-2 mtx-relative mtx-overflow-auto mtx-thin-scrollbar", ref: w, children: Array.from({ length: 60 }, (t, m) => m).map((t) => /* @__PURE__ */ l(
          "button",
          {
            style: { height: x, marginBottom: s },
            className: a(
              "mtx-w-full mtx-flex mtx-justify-center mtx-items-center mtx-rounded-full mtx-text-xs mtx-font-bold mtx-text-text-400",
              t === u.minute && "mtx-bg-secondary"
            ),
            onClick: () => A(t),
            type: "button",
            children: t.toString().padStart(2, "0")
          },
          t
        )) }),
        !n && /* @__PURE__ */ l("div", { className: "mtx-h-full mtx-w-24 mtx-px-2 mtx-relative mtx-overflow-auto mtx-thin-scrollbar", children: ["AM", "PM"].map((t) => /* @__PURE__ */ l(
          "button",
          {
            style: { height: x, marginBottom: s },
            className: a(
              "mtx-w-full mtx-flex mtx-justify-center mtx-items-center mtx-rounded-full mtx-text-xs mtx-font-bold mtx-text-text-400",
              t === u.ampm && "mtx-bg-secondary"
            ),
            onClick: () => j(t),
            type: "button",
            children: t
          },
          t
        )) })
      ]
    }
  );
};
export {
  z as TimePickerContent
};
//# sourceMappingURL=timepickercontent.es.js.map
