function i(n) {
  const e = document.createElement("iframe");
  e.style.position = "absolute", e.style.width = "0", e.style.height = "0", e.style.border = "none", document.body.appendChild(e);
  const t = e.contentWindow?.document;
  t && (t.open(), t.write(n), t.close()), e.onload = async function() {
    e.contentWindow?.print(), await new Promise((o) => setTimeout(o, 500)).then(() => {
    }), document.body.removeChild(e);
  };
}
export {
  i as printHtml
};
//# sourceMappingURL=printhtml.es.js.map
