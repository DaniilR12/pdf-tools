import { PDFDocument } from "pdf-lib";

export const mergePdf = async (files: File[]) => {
  if (files.length < 2) {
    throw new Error("At least two PDF files are required.");
  }

  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const fileBytes = await file.arrayBuffer();

    const pdf = await PDFDocument.load(fileBytes);

    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

    pages.forEach((page) => {
      mergedPdf.addPage(page);
    });
  }

  const mergedPdfBytes = await mergedPdf.save();

  const arrayBuffer = mergedPdfBytes.buffer.slice(
    mergedPdfBytes.byteOffset,
    mergedPdfBytes.byteOffset + mergedPdfBytes.byteLength,
  ) as ArrayBuffer;

  const blob = new Blob([arrayBuffer], {
    type: "application/pdf",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "merged.pdf";

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
};
