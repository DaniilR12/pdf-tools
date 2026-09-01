"use client";

import { useState } from "react";
import { ToolWorkspace } from "@/components/ToolWorkspace/ToolWorkspace";
import { pdfToPng } from "@/lib/pdfToPng";

export default function PdfToPngTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleConvert = async () => {
    if (!selectedFile) return;

    try {
      setIsConverting(true);

      await pdfToPng(selectedFile);
    } catch (error) {
      console.error("PDF to PNG error:", error);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <ToolWorkspace
      title="PDF to PNG"
      description="Convert PDF pages into high-quality PNG images."
      accept=".pdf,application/pdf"
      acceptedLabel="PDF files"
      isConverting={isConverting}
      onFileSelect={handleFileSelect}
      onConvert={handleConvert}
    />
  );
}
