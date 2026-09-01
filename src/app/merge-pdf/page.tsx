"use client";
import { ToolWorkspace } from "@/components/ToolWorkspace/ToolWorkspace";
import { mergePdf } from "@/lib/margePdf";
import { useState } from "react";

export default function MargePdf() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState(false);

  const handleFilesSelect = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleMerge = async () => {
    if (selectedFiles.length < 2) return;

    try {
      setIsConverting(true);

      await mergePdf(selectedFiles);
    } catch (error) {
      console.error("Merge PDF error:", error);
    } finally {
      setIsConverting(false);
    }
  };
  return (
    <ToolWorkspace
      title="Merge PDF"
      description="Combine multiple PDF files into one document."
      accept=".pdf,application/pdf"
      acceptedLabel="PDF files"
      multiple
      isConverting={isConverting}
      onFilesSelect={handleFilesSelect}
      onConvert={handleMerge}
    />
  );
}
