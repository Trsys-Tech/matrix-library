/** Print an already expanded table; attach load handlers before writing the document. */
export async function printDataTable(element: HTMLElement): Promise<void> {
  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  Object.assign(iframe.style, { position: "fixed", right: "100%", width: "297mm", height: "210mm", border: "0" });
  document.body.appendChild(iframe);
  const clone = element.cloneNode(true) as HTMLElement;
  clone.querySelectorAll("[data-print-hidden]").forEach(node => node.remove());
  // Theme variables may be scoped on an ancestor rather than :root.
  const computed = getComputedStyle(element);
  // The content is detached from the DataTable wrapper and any scoped direction/theme ancestors.
  for (const property of [
    "font-family",
    "font-size",
    "font-weight",
    "font-style",
    "font-variant",
    "line-height",
    "letter-spacing",
    "color",
    "text-align",
    "direction",
  ]) {
    clone.style.setProperty(property, computed.getPropertyValue(property));
  }
  for (let index = 0; index < computed.length; index++) {
    const property = computed[index];
    if (property.startsWith("--mtx-")) clone.style.setProperty(property, computed.getPropertyValue(property));
  }
  clone.style.height = "auto";
  clone.style.overflow = "visible";
  const head = document.head.cloneNode(true) as HTMLElement;
  head.querySelectorAll("script").forEach(node => node.remove());
  await new Promise<void>((resolve, reject) => {
    const cleanup = () => {
      clearTimeout(timeout);
      iframe.remove();
    };
    iframe.onload = async () => {
      try {
        const win = iframe.contentWindow;
        if (!win) throw new Error("Unable to open DataTable print document.");
        await win.document.fonts?.ready;
        const printRoot = win.document.querySelector<HTMLElement>("[data-data-table-content]");
        if (printRoot) {
          const measure = win.document.createElement("div");
          measure.style.width = "277mm";
          win.document.body.appendChild(measure);
          const available = measure.getBoundingClientRect().width;
          measure.remove();
          if (available > 0 && printRoot.scrollWidth > available) printRoot.style.zoom = String(available / printRoot.scrollWidth);
        }
        win.addEventListener("afterprint", cleanup, { once: true });
        win.focus();
        win.print();
        resolve();
      } catch (error) {
        cleanup();
        reject(error);
      }
    };
    const timeout = setTimeout(() => {
      cleanup();
      resolve();
    }, 60_000);
    const doc = iframe.contentDocument;
    if (!doc) {
      cleanup();
      reject(new Error("Unable to create DataTable print document."));
      return;
    }
    doc.open();
    doc.write(`<!doctype html><html><head>${head.innerHTML}<style>
      @page { size: A4 landscape; margin: 10mm; }
      body { margin: 0; } [data-data-table-content] { height: auto !important; overflow: visible !important; }
      [data-data-table-viewport] { height: auto !important; overflow: visible !important; }
      [role="row"] { break-inside: avoid; }
    </style></head><body>${clone.outerHTML}</body></html>`);
    doc.documentElement.dir = document.documentElement.dir;
    doc.documentElement.lang = document.documentElement.lang;
    doc.close();
  });
}
