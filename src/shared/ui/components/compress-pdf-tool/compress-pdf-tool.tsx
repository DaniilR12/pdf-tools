"use client";

import { useState } from "react";
import { ToolWorkspace } from "@/components/ToolWorkspace/ToolWorkspace";
import { compressPdf } from "@/lib/compressPdf";

export default function CompressPdfTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleCompress = async () => {
    if (!selectedFile) return;

    try {
      setIsConverting(true);

      await compressPdf(selectedFile);
    } catch (error) {
      console.error("Compress PDF error:", error);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <ToolWorkspace
      title="Compress PDF"
      description="Reduce PDF file size while keeping your document readable."
      accept=".pdf,application/pdf"
      acceptedLabel="PDF files"
      isConverting={isConverting}
      onFileSelect={handleFileSelect}
      onConvert={handleCompress}
    />
  );
}
