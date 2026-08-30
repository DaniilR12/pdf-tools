"use client";

import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import JSZip from "jszip";
import { ToolWorkspace } from "@/components/ToolWorkspace/ToolWorkspace";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export default function PdfToJpegPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const handleConvert = async () => {
    if (!selectedFile) return;

    setIsConverting(true);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();

      const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer,
      }).promise;

      const pageCount = pdf.numPages;

      const jpegUrls: string[] = [];

      for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
        const page = await pdf.getPage(pageNumber);

        const viewport = page.getViewport({
          scale: 2,
        });

        const canvas = document.createElement("canvas");

        const context = canvas.getContext("2d");

        if (!context) continue;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvas,
          canvasContext: context,
          viewport,
        }).promise;

        const jpegUrl = canvas.toDataURL("image/jpeg", 0.9);

        jpegUrls.push(jpegUrl);
      }

      if (jpegUrls.length === 1) {
        const link = document.createElement("a");

        link.href = jpegUrls[0];
        link.download = "page-1.jpg";

        document.body.appendChild(link);
        link.click();
        link.remove();

        return;
      }
      const zip = new JSZip();

      jpegUrls.forEach((jpegUrl, index) => {
        const base64 = jpegUrl.split(",")[1];

        zip.file(`page-${index + 1}.jpg`, base64, {
          base64: true,
        });
      });

      const zipBlob = await zip.generateAsync({
        type: "blob",
      });

      const zipUrl = URL.createObjectURL(zipBlob);

      const link = document.createElement("a");

      link.href = zipUrl;
      link.download = "converted.zip";

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(zipUrl);
    } catch (error) {
      console.error("PDF conversion error:", error);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <ToolWorkspace
      isConverting={isConverting}
      onFileSelect={setSelectedFile}
      onConvert={handleConvert}
      title="PDF to JPEG"
      description="Convert your PDF pages into high-quality JPEG images."
      accept=".pdf,application/pdf"
      acceptedLabel="PDF files up to 25 MB"
    />
  );
}
