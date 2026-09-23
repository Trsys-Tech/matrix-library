import { jsxs as S, jsx as c } from "react/jsx-runtime";
import { useMemo as j, useRef as f, useEffect as g } from "react";
import { cn as a } from "./utils.es.js";
const P = () => {
  const e = /* @__PURE__ */ new Date(), r = e.getHours();
  return { hour: r % 12 || 12, minute: e.getMinutes(), ampm: r < 12 ? "AM" : "PM" };
}, w = (e, r, n) => Math.min(Math.max(e, r), n), k = (e) => e ? { hour: 0, minute: 0 } : P(), b = (e, r) => {
  if (!e)
    return k(r);
  const n = w(e.minute, 0, 59), x = e.ampm ? e.hour % 12 + (e.ampm === "PM" ? 12 : 0) : e.hour;
  return r ? { hour: w(x, 0, 23), minute: n } : {
    hour: x % 12 || 12,
    minute: n,
    ampm: e.ampm ?? (x >= 12 ? "PM" : "AM")
  };
}, _ = ({ isOpen: e, time: r, is24HourMode: n = !1, onTimeChange: x, slotsProps: i }) => {
  const l = j(() => b(r, n), [r, n]), m = f(l), d = f(null), p = f(null), s = 32, u = 8, y = n ? Array.from({ length: 24 }, (t, o) => o) : Array.from({ length: 12 }, (t, o) => o + 1), T = (t) => {
    d?.current?.scrollTo({
      top: t * (s + u),
      behavior: "smooth"
    });
  }, v = (t) => {
    p?.current?.scrollTo({
      top: t * (s + u),
      behavior: "smooth"
    });
  }, h = (t) => {
    const o = b(t, n);
    m.current = o, x(o);
  }, N = (t) => {
    h({ ...m.current, hour: t });
  }, A = (t) => {
    h({ ...m.current, minute: t });
  }, M = (t) => {
    h({ ...m.current, ampm: t });
  };
  return g(() => {
    m.current = l;
  }, [l]), g(() => {
    if (!e)
      return;
    const t = window.setTimeout(() => {
      T(n ? m.current.hour : m.current.hour - 1), v(m.current.minute);
    });
    return () => window.clearTimeout(t);
  }, [e, n]), /* @__PURE__ */ S(
    "div",
    {
      ...i?.content ?? {},
      className: a("mtx-py-2 mtx-px-0 mtx-h-52 mtx-w-full mtx-flex mtx-justify-center mtx-gap-1", i?.content?.className),
      children: [
        /* @__PURE__ */ c("div", { className: "mtx-w-24 mtx-px-2 mtx-h-full mtx-relative mtx-overflow-auto mtx-thin-scrollbar", ref: d, children: y.map((t) => /* @__PURE__ */ c(
          "button",
          {
            style: { height: s, marginBottom: u },
            className: a(
              "mtx-w-full mtx-flex mtx-justify-center mtx-items-center mtx-rounded-full mtx-text-xs mtx-font-bold mtx-text-text-400",
              t === l.hour && "mtx-bg-secondary"
            ),
            onClick: () => N(t),
            type: "button",
            children: t.toString().padStart(2, "0")
          },
          t
        )) }),
        /* @__PURE__ */ c("div", { className: "mtx-h-full mtx-w-24 mtx-px-2 mtx-relative mtx-overflow-auto mtx-thin-scrollbar", ref: p, children: Array.from({ length: 60 }, (t, o) => o).map((t) => /* @__PURE__ */ c(
          "button",
          {
            style: { height: s, marginBottom: u },
            className: a(
              "mtx-w-full mtx-flex mtx-justify-center mtx-items-center mtx-rounded-full mtx-text-xs mtx-font-bold mtx-text-text-400",
              t === l.minute && "mtx-bg-secondary"
            ),
            onClick: () => A(t),
            type: "button",
            children: t.toString().padStart(2, "0")
          },
          t
        )) }),
        !n && /* @__PURE__ */ c("div", { className: "mtx-h-full mtx-w-24 mtx-px-2 mtx-relative mtx-overflow-auto mtx-thin-scrollbar", children: ["AM", "PM"].map((t) => /* @__PURE__ */ c(
          "button",
          {
            style: { height: s, marginBottom: u },
            className: a(
              "mtx-w-full mtx-flex mtx-justify-center mtx-items-center mtx-rounded-full mtx-text-xs mtx-font-bold mtx-text-text-400",
              t === l.ampm && "mtx-bg-secondary"
            ),
            onClick: () => M(t),
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
  _ as TimePickerContent
};
//# sourceMappingURL=timepickercontent.es.js.map
