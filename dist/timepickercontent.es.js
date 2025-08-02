import { jsxs as N, jsx as o } from "react/jsx-runtime";
import { useState as S, useRef as m, useEffect as g } from "react";
import { cn as u } from "./utils.es.js";
const w = () => ({ hour: (/* @__PURE__ */ new Date()).getHours() % 12, minute: (/* @__PURE__ */ new Date()).getMinutes(), ampm: (/* @__PURE__ */ new Date()).getHours() < 12 ? "AM" : "PM" }), k = ({ isOpen: c, time: a, onTimeChange: i, slotsProps: d }) => {
  const [r, s] = S(a ?? w()), e = m(r), h = m(null), x = m(null), n = 32, l = 8, b = (t) => {
    h?.current?.scrollTo({
      top: t * (n + l),
      behavior: "smooth"
    });
  }, y = (t) => {
    x?.current?.scrollTo({
      top: t * (n + l),
      behavior: "smooth"
    });
  }, p = (t) => {
    e.current = { ...r, hour: t }, s(e.current), i(e.current);
  }, v = (t) => {
    e.current = { ...r, minute: t }, s(e.current), i(e.current);
  }, M = (t) => {
    e.current = { ...r, ampm: t }, s(e.current), i(e.current);
  };
  return g(() => {
    c && s(a ?? w());
  }, [c, a]), g(() => {
    c && setTimeout(() => {
      b(e.current.hour - 1), y(e.current.minute);
    });
  }, [c]), /* @__PURE__ */ N("div", { ...d?.content ?? {}, className: u("py-2 px-0 h-52 w-full flex justify-center gap-1", d?.content?.className), children: [
    /* @__PURE__ */ o("div", { className: "w-24 px-2 h-full relative overflow-auto thin-scrollbar", ref: h, children: Array.from({ length: 12 }, (t, f) => f).map((t) => /* @__PURE__ */ o(
      "button",
      {
        style: { height: n, marginBottom: l },
        className: u(
          "w-full flex justify-center items-center rounded-full text-xs font-bold text-text-400",
          t + 1 === r.hour && "bg-secondary"
        ),
        onClick: () => p(t + 1),
        children: (t + 1).toString().padStart(2, "0")
      },
      t + 1
    )) }),
    /* @__PURE__ */ o("div", { className: "h-full w-24 px-2 relative overflow-auto thin-scrollbar", ref: x, children: Array.from({ length: 60 }, (t, f) => f).map((t) => /* @__PURE__ */ o(
      "button",
      {
        style: { height: n, marginBottom: l },
        className: u(
          "w-full flex justify-center items-center rounded-full text-xs font-bold text-text-400",
          t === r.minute && "bg-secondary"
        ),
        onClick: () => v(t),
        children: t.toString().padStart(2, "0")
      },
      t
    )) }),
    /* @__PURE__ */ o("div", { className: "h-full w-24 px-2 relative overflow-auto thin-scrollbar", children: ["AM", "PM"].map((t) => /* @__PURE__ */ o(
      "button",
      {
        style: { height: n, marginBottom: l },
        className: u(
          "w-full flex justify-center items-center rounded-full text-xs font-bold text-text-400",
          t === r.ampm && "bg-secondary"
        ),
        onClick: () => M(t),
        children: t
      },
      t
    )) })
  ] });
};
export {
  k as TimePickerContent
};
//# sourceMappingURL=timepickercontent.es.js.map
