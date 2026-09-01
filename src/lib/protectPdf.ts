import { PDFDocument } from "pdf-lib-plus-encrypt";

export const protectPdf = async (file: File, password: string) => {
  const fileBytes = await file.arrayBuffer();

  const pdf = await PDFDocument.load(fileBytes, { ignoreEncryption: true });

  await pdf.encrypt({
    userPassword: password,
    ownerPassword: password,
  });

  const pdfBytes = await pdf.save({ useObjectStreams: false });

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
  link.download = "protected.pdf";

  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
