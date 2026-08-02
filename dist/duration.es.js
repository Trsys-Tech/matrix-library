import { jsxs as $, jsx as E } from "react/jsx-runtime";
import * as x from "react";
import { tv as F } from "tailwind-variants";
import { cn as h } from "./utils.es.js";
const H = F({
  base: [
    "mtx-flex mtx-items-center mtx-w-full mtx-rounded-sm mtx-border mtx-border-input mtx-text-text mtx-bg-transparent mtx-p-0 mtx-text-xs [&_input]:mtx-text-xs mtx-font-medium mtx-transition-colors file:mtx-border-0 file:mtx-bg-transparent file:mtx-text-sm file:mtx-font-medium file:mtx-text-foreground",
    "placeholder:mtx-text-text-300 hover:mtx-border-primary-400 focus-within:mtx-border-primary-400 focus-within:mtx-outline-none focus-within:mtx-ring focus-within:mtx-ring-primary-100",
    "aria-disabled:mtx-text-text-300 aria-disabled:mtx-bg-gray-100 aria-disabled:mtx-border-gray-100"
  ],
  variants: {
    size: {
      sm: "mtx-h-7",
      md: "mtx-h-8",
      lg: "mtx-h-11"
    }
  },
  defaultVariants: {
    size: "md"
  }
}), T = x.forwardRef(
  ({ className: v, slotProps: d, endAdornment: w, startAdornment: g, size: D, value: p, onChange: u, defaultValue: A, disabled: b, showSeconds: m = !1, ...R }, V) => {
    const c = x.useCallback(
      (e) => {
        const r = e.replace(/\D/g, ""), n = m ? 6 : 4, a = r.substring(0, n).padEnd(n, "0");
        let t = a.substring(0, 2), o = a.substring(2, 4), i = m ? a.substring(4, 6) : "";
        parseInt(t, 10) > 23 && (t = "23"), parseInt(o, 10) > 59 && (o = "59"), m && parseInt(i, 10) > 59 && (i = "59");
        let s = t;
        return n >= 4 && (s += `:${o}`), m && (s += `:${i}`), s;
      },
      [m]
    ), [l, f] = x.useState(() => c(A || "")), y = x.useRef(null);
    x.useImperativeHandle(V, () => y.current), x.useEffect(() => {
      p !== void 0 && f(c(p));
    }, [p, c]);
    const M = (e) => {
      e.preventDefault();
      const r = e.currentTarget, { key: n } = e, a = r.selectionStart ?? 0, t = l.substring(0, a) + n + l.substring(a + 1), o = c(t);
      if (f(o), u) {
        const i = { ...e, target: { ...e.target, value: o } };
        u(i);
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
        a = c(N);
      }
      const o = c(a);
      if (f(o), u) {
        const i = { ...e, target: { ...e.target, value: o } };
        u(i);
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
      } else if (m && o >= 6) {
        const s = t[2] + a;
        s >= 60 ? (t[1] += 1, t[2] = s % 60) : s < 0 ? (t[1] -= 1, t[2] = 59) : t[2] = s, t[1] >= 60 ? (t[0] = (t[0] + 1) % 24, t[1] %= 60) : t[1] < 0 && (t[0] = (t[0] - 1 + 24) % 24, t[1] = 59);
      }
      const i = t.map((s) => String(s).padStart(2, "0")).join(":");
      f(i), u && u({ target: { value: i } }), requestAnimationFrame(() => {
        r.setSelectionRange(o, o);
      });
    }, I = (e) => {
      const { key: r, currentTarget: n } = e, { selectionStart: a, selectionEnd: t } = n;
      r.length === 1 && /\d/.test(r) ? M(e) : r === "Backspace" ? S(e) : r === "ArrowUp" || r === "ArrowDown" ? k(e) : r === "ArrowRight" || r === "ArrowLeft" || r.length > 1 || a !== t || e.preventDefault();
    };
    return /* @__PURE__ */ $("div", { ...R, className: h(H({ size: D, className: v })), "aria-disabled": b, children: [
      g,
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
          placeholder: m ? "HH:MM:SS" : "HH:MM",
          disabled: b,
          ...d?.inputProps ?? {},
          className: h(
            "focus:mtx-outline-none mtx-w-full mtx-h-full mtx-py-1 mtx-rounded-sm file:mtx-border-0 file:mtx-bg-transparent file:mtx-text-sm file:mtx-font-medium file:mtx-text-foreground placeholder:mtx-text-text-300",
            g ? "mtx-ps-1 mtx-pe-3" : "mtx-px-3",
            d?.inputProps?.className
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
