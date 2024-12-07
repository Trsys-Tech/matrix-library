export function printHtml(html: string) {
  // Create an iframe element
  const iframe = document.createElement("iframe");
  iframe.style.position = "absolute";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "none";

  // Append the iframe to the body
  document.body.appendChild(iframe);

  // Write the content to the iframe
  const doc = iframe.contentWindow?.document;
  if (doc) {
    doc.open();
    doc.write(html);
    doc.close();
  }

  // Wait for the content to load and then trigger the print dialog
  iframe.onload = async function () {
    iframe.contentWindow?.print();
    await new Promise(resolve => setTimeout(resolve, 500)).then(() => {});
    document.body.removeChild(iframe); // Clean up by removing the iframe
  };
}
