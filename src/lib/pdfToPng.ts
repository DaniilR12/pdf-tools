import JSZip from "jszip";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export const pdfToPng = async (file: File) => {
  const fileBytes = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({
    data: fileBytes,
  }).promise;

  const zip = new JSZip();

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);

    const viewport = page.getViewport({
      scale: 2,
    });

    const canvas = document.createElement("canvas");

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Could not get canvas context.");
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvas,
      canvasContext: context,
      viewport,
    }).promise;

    const pngBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Could not create PNG."));
        }
      }, "image/png");
    });

    zip.file(`page-${i}.png`, pngBlob);
  }

  const zipBlob = await zip.generateAsync({
    type: "blob",
  });

  const url = URL.createObjectURL(zipBlob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "pdf-to-png.zip";

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
};
