"use client";

import { useState } from "react";
import { ToolWorkspace } from "@/components/ToolWorkspace/ToolWorkspace";
import { splitPdf } from "@/lib/splitPdf";

export const SplitPdfTool = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleSplit = async () => {
    if (!selectedFile) return;

    try {
      setIsConverting(true);
      await splitPdf(selectedFile);
    } catch (error) {
      console.error("Split PDF error:", error);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <ToolWorkspace
      title="Split PDF"
      description="Split a PDF into separate files, one for each page."
      accept=".pdf,application/pdf"
      acceptedLabel="PDF files"
      isConverting={isConverting}
      onFileSelect={handleFileSelect}
      onConvert={handleSplit}
    />
  );
};
