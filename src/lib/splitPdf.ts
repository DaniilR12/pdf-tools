import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";

export const splitPdf = async (file: File) => {
  const fileBytes = await file.arrayBuffer();

  const pdf = await PDFDocument.load(fileBytes);

  const pageCount = pdf.getPageCount();

  if (pageCount === 1) {
    const pdfBytes = await pdf.save();

    const arrayBuffer = pdfBytes.buffer.slice(
      pdfBytes.byteOffset,
      pdfBytes.byteOffset + pdfBytes.byteLength,
    ) as ArrayBuffer;

    const blob = new Blob([arrayBuffer], {
      type: "application/pdf",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "page-1.pdf";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);

    return;
  }

  const zip = new JSZip();

  for (let i = 0; i < pageCount; i++) {
    const newPdf = await PDFDocument.create();

    const [page] = await newPdf.copyPages(pdf, [i]);

    newPdf.addPage(page);

    const pdfBytes = await newPdf.save();

    zip.file(`page-${i + 1}.pdf`, pdfBytes);
  }

  const zipBlob = await zip.generateAsync({
    type: "blob",
  });

  const url = URL.createObjectURL(zipBlob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "split-pdf.zip";

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
};
