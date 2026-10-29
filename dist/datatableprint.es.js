async function h(s) {
  const o = document.createElement("iframe");
  o.setAttribute("aria-hidden", "true"), Object.assign(o.style, { position: "fixed", right: "100%", width: "297mm", height: "210mm", border: "0" }), document.body.appendChild(o);
  const n = s.cloneNode(!0);
  n.querySelectorAll("[data-print-hidden]").forEach((t) => t.remove());
  const i = getComputedStyle(s);
  for (const t of [
    "font-family",
    "font-size",
    "font-weight",
    "font-style",
    "font-variant",
    "line-height",
    "letter-spacing",
    "color",
    "text-align",
    "direction"
  ])
    n.style.setProperty(t, i.getPropertyValue(t));
  for (let t = 0; t < i.length; t++) {
    const r = i[t];
    r.startsWith("--mtx-") && n.style.setProperty(r, i.getPropertyValue(r));
  }
  n.style.height = "auto", n.style.overflow = "visible";
  const u = document.head.cloneNode(!0);
  u.querySelectorAll("script").forEach((t) => t.remove()), await new Promise((t, r) => {
    const l = () => {
      clearTimeout(p), o.remove();
    };
    o.onload = async () => {
      try {
        const e = o.contentWindow;
        if (!e) throw new Error("Unable to open DataTable print document.");
        await e.document.fonts?.ready;
        const d = e.document.querySelector("[data-data-table-content]");
        if (d) {
          const c = e.document.createElement("div");
          c.style.width = "277mm", e.document.body.appendChild(c);
          const m = c.getBoundingClientRect().width;
          c.remove(), m > 0 && d.scrollWidth > m && (d.style.zoom = String(m / d.scrollWidth));
        }
        e.addEventListener("afterprint", l, { once: !0 }), e.focus(), e.print(), t();
      } catch (e) {
        l(), r(e);
      }
    };
    const p = setTimeout(() => {
      l(), t();
    }, 6e4), a = o.contentDocument;
    if (!a) {
      l(), r(new Error("Unable to create DataTable print document."));
      return;
    }
    a.open(), a.write(`<!doctype html><html><head>${u.innerHTML}<style>
      @page { size: A4 landscape; margin: 10mm; }
      body { margin: 0; } [data-data-table-content] { height: auto !important; overflow: visible !important; }
      [data-data-table-viewport] { height: auto !important; overflow: visible !important; }
      [role="row"] { break-inside: avoid; }
    </style></head><body>${n.outerHTML}</body></html>`), a.documentElement.dir = document.documentElement.dir, a.documentElement.lang = document.documentElement.lang, a.close();
  });
}
export {
  h as printDataTable
};
//# sourceMappingURL=datatableprint.es.js.map
