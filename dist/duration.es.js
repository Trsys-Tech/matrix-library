import { jsxs as $, jsx as E } from "react/jsx-runtime";
import * as p from "react";
import { tv as F } from "tailwind-variants";
import { cn as h } from "./utils.es.js";
const H = F({
  base: [
    "flex items-center w-full rounded-sm border border-input text-text bg-transparent p-0 text-xs [&_input]:text-xs font-medium transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
    "placeholder:text-text-300 hover:border-primary-400 focus-within:border-primary-400 focus-within:outline-none focus-within:ring focus-within:ring-primary-100",
    "aria-disabled:text-text-300 aria-disabled:bg-gray-100 aria-disabled:border-gray-100"
  ],
  variants: {
    size: {
      sm: "h-7",
      md: "h-8",
      lg: "h-11"
    }
  },
  defaultVariants: {
    size: "md"
  }
}), T = p.forwardRef(
  ({ className: v, slotProps: g, endAdornment: w, startAdornment: x, size: D, value: d, onChange: c, defaultValue: A, disabled: b, showSeconds: u = !1, ...R }, V) => {
    const f = p.useCallback(
      (e) => {
        const r = e.replace(/\D/g, ""), n = u ? 6 : 4, a = r.substring(0, n).padEnd(n, "0");
        let t = a.substring(0, 2), o = a.substring(2, 4), i = u ? a.substring(4, 6) : "";
        parseInt(t, 10) > 23 && (t = "23"), parseInt(o, 10) > 59 && (o = "59"), u && parseInt(i, 10) > 59 && (i = "59");
        let s = t;
        return n >= 4 && (s += `:${o}`), u && (s += `:${i}`), s;
      },
      [u]
    ), [l, m] = p.useState(() => f(A || "")), y = p.useRef(null);
    p.useImperativeHandle(V, () => y.current), p.useEffect(() => {
      d !== void 0 && m(f(d));
    }, [d, f]);
    const M = (e) => {
      e.preventDefault();
      const r = e.currentTarget, { key: n } = e, a = r.selectionStart ?? 0, t = l.substring(0, a) + n + l.substring(a + 1), o = f(t);
      if (m(o), c) {
        const i = { ...e, target: { ...e.target, value: o } };
        c(i);
      }
      requestAnimationFrame(() => {
        let i = a + 1;
        o[i] === ":" && i++, r.setSelectionRange(i, i);
      });
    }, S = (e) => {
      e.preventDefault();
      const r = e.currentTarget, n = r.selectionStart ?? 0;
      if (n === 0) return;
      let a = "", t = n - 1;
      if (l[n - 1] === ":")
        a = `${l.substring(0, n - 2)}0${l.substring(n - 1)}`, t = n - 2;
      else {
        const i = l.replace(/\D/g, ""), s = n - Math.floor((n - 1) / 3), N = `${i.substring(0, s - 1)}0${i.substring(s)}`;
        a = f(N);
      }
      const o = f(a);
      if (m(o), c) {
        const i = { ...e, target: { ...e.target, value: o } };
        c(i);
      }
      requestAnimationFrame(() => {
        r.setSelectionRange(t, t);
      });
    }, k = (e) => {
      e.preventDefault();
      const r = e.currentTarget, { key: n } = e, a = n === "ArrowUp" ? 1 : -1, t = l.split(":").map(Number), o = r.selectionStart ?? 0;
      if (o <= 2)
        t[0] = (t[0] + a + 24) % 24;
      else if (o >= 3 && o <= 5) {
        const s = t[1] + a;
        s >= 60 ? (t[0] = (t[0] + 1) % 24, t[1] = s % 60) : s < 0 ? (t[0] = (t[0] - 1 + 24) % 24, t[1] = 59) : t[1] = s;
      } else if (u && o >= 6) {
        const s = t[2] + a;
        s >= 60 ? (t[1] += 1, t[2] = s % 60) : s < 0 ? (t[1] -= 1, t[2] = 59) : t[2] = s, t[1] >= 60 ? (t[0] = (t[0] + 1) % 24, t[1] %= 60) : t[1] < 0 && (t[0] = (t[0] - 1 + 24) % 24, t[1] = 59);
      }
      const i = t.map((s) => String(s).padStart(2, "0")).join(":");
      m(i), c && c({ target: { value: i } }), requestAnimationFrame(() => {
        r.setSelectionRange(o, o);
      });
    }, I = (e) => {
      const { key: r, currentTarget: n } = e, { selectionStart: a, selectionEnd: t } = n;
      r.length === 1 && /\d/.test(r) ? M(e) : r === "Backspace" ? S(e) : r === "ArrowUp" || r === "ArrowDown" ? k(e) : r === "ArrowRight" || r === "ArrowLeft" || r.length > 1 || a !== t || e.preventDefault();
    };
    return /* @__PURE__ */ $("div", { ...R, className: h(H({ size: D, className: v })), "aria-disabled": b, children: [
      x,
      /* @__PURE__ */ E(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          ref: y,
          onKeyDown: I,
          onChange: () => {
          },
          value: l,
          placeholder: u ? "HH:MM:SS" : "HH:MM",
          disabled: b,
          ...g?.inputProps ?? {},
          className: h(
            "focus:outline-none w-full h-full py-1 rounded-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-text-300",
            x ? "ps-1 pe-3" : "px-3",
            g?.inputProps?.className
          )
        }
      ),
      w
    ] });
  }
);
T.displayName = "Duration";
export {
  T as Duration
};
//# sourceMappingURL=duration.es.js.map
