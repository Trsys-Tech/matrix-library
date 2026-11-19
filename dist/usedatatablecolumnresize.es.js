import * as S from "react";
function w(u) {
  const n = S.useRef(null);
  return S.useLayoutEffect(() => {
    if (!u)
      return () => n.current?.();
  }, [u]), (r, o) => {
    if (u || !o.isPrimary || o.button !== 0) return;
    n.current?.();
    const { table: e } = r, { clientX: p, pointerId: a } = o, l = r.getSize(), f = r.getLeafHeaders().map(({ column: t }) => [t.id, t.getSize()]), i = o.currentTarget.ownerDocument, g = new AbortController(), s = () => {
      g.abort(), n.current = null, e.resetHeaderSizeInfo(!0);
    }, z = (t, E) => {
      const L = e.options.columnResizeDirection === "rtl" ? -1 : 1, d = (t - p) * L, R = Math.max(l > 0 ? d / l : 0, -0.999999);
      e.setColumnResizing((m) => ({ ...m, deltaOffset: d, deltaPercentage: R })), E && e.setColumnSizing((m) => ({
        ...m,
        ...Object.fromEntries(
          f.map(([b, C]) => {
            const I = C > 0 ? C * (1 + R) : d / f.length;
            return [b, Math.round(Math.max(I, 0) * 100) / 100];
          })
        )
      }));
    }, c = { signal: g.signal };
    n.current = s, i.addEventListener(
      "pointermove",
      (t) => {
        t.pointerId === a && z(t.clientX, e.options.columnResizeMode === "onChange");
      },
      c
    ), i.addEventListener(
      "pointerup",
      (t) => {
        t.pointerId === a && (z(t.clientX, !0), s());
      },
      c
    ), i.addEventListener(
      "pointercancel",
      (t) => {
        t.pointerId === a && s();
      },
      c
    ), i.defaultView?.addEventListener("blur", s, c), e.setColumnResizing((t) => ({
      ...t,
      startOffset: p,
      startSize: l,
      deltaOffset: 0,
      deltaPercentage: 0,
      columnSizingStart: f,
      isResizingColumn: r.column.id
    }));
  };
}
export {
  w as useDataTableColumnResize
};
//# sourceMappingURL=usedatatablecolumnresize.es.js.map
