import { PDFDocument } from "pdf-lib";

export const compressPdf = async (file: File) => {
  const fileBytes = await file.arrayBuffer();

  const pdf = await PDFDocument.load(fileBytes);

  const compressedPdfBytes = await pdf.save({
    useObjectStreams: true,
  });

  const arrayBuffer = compressedPdfBytes.buffer.slice(
    compressedPdfBytes.byteOffset,
    compressedPdfBytes.byteOffset + compressedPdfBytes.byteLength,
  ) as ArrayBuffer;

  const blob = new Blob([arrayBuffer], {
    type: "application/pdf",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "compressed.pdf";

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
};
