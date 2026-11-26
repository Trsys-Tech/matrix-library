import { jsx as l, jsxs as I, Fragment as T } from "react/jsx-runtime";
import * as f from "react";
import { IconButton as k } from "./iconbutton.es.js";
function B() {
  const { SpeechRecognition: t, webkitSpeechRecognition: o } = window;
  if (typeof t == "function") return t;
  if (typeof o == "function") return o;
}
const M = () => () => {
}, C = () => {
};
function L(t) {
  return ["text", "search", "tel", "url"].includes(t?.toLowerCase() || "text");
}
function v(t) {
  return !t.matches(":disabled, [readonly]") && (!(t instanceof HTMLInputElement) || L(t.type));
}
function V(t, o) {
  const { value: r, maxLength: c } = t, e = o.trim();
  if (!e) return;
  const s = r && !/\s$/.test(r) ? " " : "", u = c < 0 ? 1 / 0 : Math.max(0, c - r.length - s.length), d = e.slice(0, u).replace(/[\uD800-\uDBFF]$/, "").trimEnd();
  d && (t.setRangeText(s + d, r.length, r.length), t.dispatchEvent(new Event("input", { bubbles: !0 })));
}
function A(t, o, r) {
  const c = f.useSyncExternalStore(M, B, C), e = f.useRef(null), [s, u] = f.useState("idle"), d = s !== "idle", x = s === "stopping", S = !!(t && c), p = S && !o;
  f.useEffect(() => {
    if (p)
      return () => e.current?.cancel();
  }, [p]);
  const y = (n) => {
    e.current?.recognition === n && (n.onspeechend = null, u("stopping"), n.stop());
  };
  return S ? { isListening: d, isStopping: x, disabled: !p, onClick: () => {
    const n = r.current;
    if (!c || !p || !n || !v(n) || x) return;
    const D = e.current?.recognition;
    if (D) {
      y(D);
      return;
    }
    try {
      const i = new c();
      i.continuous = !1;
      const w = n.closest("[lang]")?.getAttribute("lang");
      w && (i.lang = w);
      const h = () => {
        e.current?.recognition === i && (e.current = null, b.disconnect(), u("idle"));
      }, g = () => {
        e.current?.recognition === i && (h(), i.abort());
      }, b = new MutationObserver(() => {
        v(n) || g();
      });
      i.onend = h, i.onerror = h, i.onspeechend = () => y(i), i.onresult = ({ resultIndex: a, results: R }) => {
        if (e.current?.recognition !== i) return;
        if (!n.isConnected || !v(n)) {
          g();
          return;
        }
        let E = "";
        for (let m = a; m < R.length; m++) {
          const F = R[m];
          F.isFinal && (E += F[0].transcript);
        }
        V(n, E);
      }, e.current = { recognition: i, cancel: g }, b.observe(n, { attributeFilter: ["disabled", "readonly", "type"] });
      for (let a = n.parentElement; a; a = a.parentElement)
        a.tagName === "FIELDSET" && b.observe(a, { attributeFilter: ["disabled"] });
      u("listening"), i.start();
    } catch {
      e.current?.cancel();
    }
  } } : null;
}
function H({ isListening: t, isStopping: o, disabled: r, className: c, onClick: e }) {
  return /* @__PURE__ */ l(
    k,
    {
      type: "button",
      size: "sm",
      variant: t ? "danger" : "table",
      "aria-label": "Voice dictation",
      "aria-pressed": t,
      title: t ? "Stop dictation" : "Start dictation",
      disabled: r,
      "aria-disabled": o || void 0,
      className: c,
      onClick: e,
      children: /* @__PURE__ */ l("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: t ? /* @__PURE__ */ l("rect", { x: "6", y: "6", width: "12", height: "12", rx: "2" }) : /* @__PURE__ */ I(T, { children: [
        /* @__PURE__ */ l("rect", { x: "9", y: "3", width: "6", height: "12", rx: "3" }),
        /* @__PURE__ */ l("path", { d: "M5 11v1a7 7 0 0 0 14 0v-1M12 19v3" })
      ] }) })
    }
  );
}
export {
  H as VoiceDictationButton,
  L as isDictationInputType,
  A as useVoiceDictation
};
//# sourceMappingURL=voicedictationbutton.es.js.map
