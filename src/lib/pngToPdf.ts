import { PDFDocument } from "pdf-lib";

export const pngToPdf = async (files: File[]) => {
  if (files.length === 0) {
    throw new Error("No PNG files selected.");
  }

  const pdf = await PDFDocument.create();

  for (const file of files) {
    const imageBytes = await file.arrayBuffer();

    const image = await pdf.embedPng(imageBytes);

    const page = pdf.addPage([image.width, image.height]);

    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }

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
  link.download = "png-to-pdf.pdf";

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
};
