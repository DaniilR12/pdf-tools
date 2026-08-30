"use client";
import { ToolWorkspace } from "@/components/ToolWorkspace/ToolWorkspace";
import * as pdfjsLib from "pdfjs-dist";
import { useState } from "react";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export default function PdfToTextPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleConvert = async () => {
    if (!selectedFile) return;

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();

      const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer,
      }).promise;

      let text = "";

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);

        const textContent = await page.getTextContent();

        const pageText = textContent.items
          .map((item) => ("str" in item ? item.str : ""))
          .join(" ");

        text += pageText + "\n\n";
      }

      const blob = new Blob([text], {
        type: "text/plain",
      });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "converted.txt";

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF to text conversion error:", error);
    }
  };
  return (
    <ToolWorkspace
      onFileSelect={setSelectedFile}
      onConvert={handleConvert}
      title="PDF to text"
      description="Extract the words from your document into clean, searchable text."
      accept=".pdf,application/pdf"
      acceptedLabel="PDF files up to 25 MB"
    />
  );
}
