import { jsxs as N, jsx as m } from "react/jsx-runtime";
import { useState as S, useRef as i, useEffect as g } from "react";
import { cn as c } from "./utils.es.js";
const b = () => ({ hour: (/* @__PURE__ */ new Date()).getHours() % 12, minute: (/* @__PURE__ */ new Date()).getMinutes(), ampm: (/* @__PURE__ */ new Date()).getHours() < 12 ? "AM" : "PM" }), k = ({ isOpen: l, time: s, onTimeChange: u, slotsProps: f }) => {
  const [r, x] = S(s ?? b()), e = i(r), d = i(null), h = i(null), o = 32, n = 8, w = (t) => {
    d?.current?.scrollTo({
      top: t * (o + n),
      behavior: "smooth"
    });
  }, y = (t) => {
    h?.current?.scrollTo({
      top: t * (o + n),
      behavior: "smooth"
    });
  }, p = (t) => {
    e.current = { ...r, hour: t }, x(e.current), u(e.current);
  }, v = (t) => {
    e.current = { ...r, minute: t }, x(e.current), u(e.current);
  }, M = (t) => {
    e.current = { ...r, ampm: t }, x(e.current), u(e.current);
  };
  return g(() => {
    l && x(s ?? b());
  }, [l, s]), g(() => {
    l && setTimeout(() => {
      w(e.current.hour - 1), y(e.current.minute);
    });
  }, [l]), /* @__PURE__ */ N(
    "div",
    {
      ...f?.content ?? {},
      className: c("mtx-py-2 mtx-px-0 mtx-h-52 mtx-w-full mtx-flex mtx-justify-center mtx-gap-1", f?.content?.className),
      children: [
        /* @__PURE__ */ m("div", { className: "mtx-w-24 mtx-px-2 mtx-h-full mtx-relative mtx-overflow-auto mtx-thin-scrollbar", ref: d, children: Array.from({ length: 12 }, (t, a) => a).map((t) => /* @__PURE__ */ m(
          "button",
          {
            style: { height: o, marginBottom: n },
            className: c(
              "mtx-w-full mtx-flex mtx-justify-center mtx-items-center mtx-rounded-full mtx-text-xs mtx-font-bold mtx-text-text-400",
              t + 1 === r.hour && "mtx-bg-secondary"
            ),
            onClick: () => p(t + 1),
            children: (t + 1).toString().padStart(2, "0")
          },
          t + 1
        )) }),
        /* @__PURE__ */ m("div", { className: "mtx-h-full mtx-w-24 mtx-px-2 mtx-relative mtx-overflow-auto mtx-thin-scrollbar", ref: h, children: Array.from({ length: 60 }, (t, a) => a).map((t) => /* @__PURE__ */ m(
          "button",
          {
            style: { height: o, marginBottom: n },
            className: c(
              "mtx-w-full mtx-flex mtx-justify-center mtx-items-center mtx-rounded-full mtx-text-xs mtx-font-bold mtx-text-text-400",
              t === r.minute && "mtx-bg-secondary"
            ),
            onClick: () => v(t),
            children: t.toString().padStart(2, "0")
          },
          t
        )) }),
        /* @__PURE__ */ m("div", { className: "mtx-h-full mtx-w-24 mtx-px-2 mtx-relative mtx-overflow-auto mtx-thin-scrollbar", children: ["AM", "PM"].map((t) => /* @__PURE__ */ m(
          "button",
          {
            style: { height: o, marginBottom: n },
            className: c(
              "mtx-w-full mtx-flex mtx-justify-center mtx-items-center mtx-rounded-full mtx-text-xs mtx-font-bold mtx-text-text-400",
              t === r.ampm && "mtx-bg-secondary"
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
  k as TimePickerContent
};
//# sourceMappingURL=timepickercontent.es.js.map
