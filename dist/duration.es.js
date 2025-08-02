import { jsxs as $, jsx as E } from "react/jsx-runtime";
import * as p from "react";
import { tv as F } from "tailwind-variants";
import { cn as y } from "./utils.es.js";
const H = F({
  base: [
    "flex items-center w-full rounded-sm border border-input text-text bg-transparent p-0 text-xs [&_input]:text-xs font-medium shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
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
        let t = a.substring(0, 2), o = a.substring(2, 4), s = u ? a.substring(4, 6) : "";
        parseInt(t, 10) > 23 && (t = "23"), parseInt(o, 10) > 59 && (o = "59"), u && parseInt(s, 10) > 59 && (s = "59");
        let i = t;
        return n >= 4 && (i += `:${o}`), u && (i += `:${s}`), i;
      },
      [u]
    ), [l, m] = p.useState(() => f(A || "")), h = p.useRef(null);
    p.useImperativeHandle(V, () => h.current), p.useEffect(() => {
      d !== void 0 && m(f(d));
    }, [d, f]);
    const M = (e) => {
      e.preventDefault();
      const r = e.currentTarget, { key: n } = e, a = r.selectionStart ?? 0, t = l.substring(0, a) + n + l.substring(a + 1), o = f(t);
      if (m(o), c) {
        const s = { ...e, target: { ...e.target, value: o } };
        c(s);
      }
      requestAnimationFrame(() => {
        let s = a + 1;
        o[s] === ":" && s++, r.setSelectionRange(s, s);
      });
    }, S = (e) => {
      e.preventDefault();
      const r = e.currentTarget, n = r.selectionStart ?? 0;
      if (n === 0) return;
      let a = "", t = n - 1;
      if (l[n - 1] === ":")
        a = `${l.substring(0, n - 2)}0${l.substring(n - 1)}`, t = n - 2;
      else {
        const s = l.replace(/\D/g, ""), i = n - Math.floor((n - 1) / 3), N = `${s.substring(0, i - 1)}0${s.substring(i)}`;
        a = f(N);
      }
      const o = f(a);
      if (m(o), c) {
        const s = { ...e, target: { ...e.target, value: o } };
        c(s);
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
        const i = t[1] + a;
        i >= 60 ? (t[0] = (t[0] + 1) % 24, t[1] = i % 60) : i < 0 ? (t[0] = (t[0] - 1 + 24) % 24, t[1] = 59) : t[1] = i;
      } else if (u && o >= 6) {
        const i = t[2] + a;
        i >= 60 ? (t[1] += 1, t[2] = i % 60) : i < 0 ? (t[1] -= 1, t[2] = 59) : t[2] = i, t[1] >= 60 ? (t[0] = (t[0] + 1) % 24, t[1] %= 60) : t[1] < 0 && (t[0] = (t[0] - 1 + 24) % 24, t[1] = 59);
      }
      const s = t.map((i) => String(i).padStart(2, "0")).join(":");
      m(s), c && c({ target: { value: s } }), requestAnimationFrame(() => {
        r.setSelectionRange(o, o);
      });
    }, I = (e) => {
      const { key: r, currentTarget: n } = e, { selectionStart: a, selectionEnd: t } = n;
      r.length === 1 && /\d/.test(r) ? M(e) : r === "Backspace" ? S(e) : r === "ArrowUp" || r === "ArrowDown" ? k(e) : r === "ArrowRight" || r === "ArrowLeft" || r.length > 1 || a !== t || e.preventDefault();
    };
    return /* @__PURE__ */ $("div", { ...R, className: y(H({ size: D, className: v })), "aria-disabled": b, children: [
      x,
      /* @__PURE__ */ E(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          ref: h,
          onKeyDown: I,
          onChange: () => {
          },
          value: l,
          placeholder: u ? "HH:MM:SS" : "HH:MM",
          disabled: b,
          ...g?.inputProps ?? {},
          className: y(
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
