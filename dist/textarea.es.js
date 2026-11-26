import { jsxs as y, jsx as l } from "react/jsx-runtime";
import * as o from "react";
import { cn as v } from "./utils.es.js";
import { useVoiceDictation as w, VoiceDictationButton as h } from "./voicedictationbutton.es.js";
const g = typeof window > "u" ? o.useEffect : o.useLayoutEffect, R = o.forwardRef(({ className: n, style: i, voiceMode: p, disabled: c, readOnly: f, ...b }, e) => {
  const s = o.useRef(null), m = w(p, c || f, s), r = m !== null, d = o.useCallback(
    (t) => {
      if (s.current = t, typeof e == "function") return e(t);
      e && (e.current = t);
    },
    [e]
  );
  return g(() => {
    const t = s.current, x = t?.parentElement;
    if (!r || !t || !x) return;
    const u = () => {
      x.style.setProperty("--mtx-textarea-right", `${t.offsetLeft + t.offsetWidth}px`), x.style.setProperty("--mtx-textarea-top", `${t.offsetTop}px`);
    };
    u();
    const a = new ResizeObserver(u);
    return a.observe(t, { box: "border-box" }), a.observe(x, { box: "border-box" }), () => a.disconnect();
  }, [r, n, i]), /* @__PURE__ */ y("div", { className: r ? "mtx-relative mtx-w-full" : "mtx-contents", children: [
    /* @__PURE__ */ l(
      "textarea",
      {
        className: v(
          "mtx-flex mtx-min-h-[60px] mtx-w-full mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-px-3 mtx-py-2 mtx-text-xs mtx-font-medium mtx-text-text",
          "placeholder:mtx-text-text-300 focus-visible:mtx-outline-none focus-visible:mtx-border-primary disabled:mtx-opacity-50 disabled:mtx-text-text-300 disabled:mtx-bg-gray-100 disabled:mtx-border-gray-100",
          n,
          r && "mtx-pr-8"
        ),
        style: i,
        ref: d,
        disabled: c,
        readOnly: f,
        ...b
      }
    ),
    m && /* @__PURE__ */ l(
      h,
      {
        ...m,
        className: "mtx-absolute mtx-left-[var(--mtx-textarea-right)] mtx-top-[var(--mtx-textarea-top)] -mtx-ml-1.5 mtx-mt-1 -mtx-translate-x-full"
      }
    )
  ] });
});
R.displayName = "Textarea";
export {
  R as Textarea
};
//# sourceMappingURL=textarea.es.js.map
