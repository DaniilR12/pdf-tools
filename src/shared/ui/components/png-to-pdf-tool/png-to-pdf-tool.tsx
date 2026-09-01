"use client";

import { useState } from "react";
import { ToolWorkspace } from "@/components/ToolWorkspace/ToolWorkspace";
import { pngToPdf } from "@/lib/pngToPdf";

export default function PngToPdfTool() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState(false);

  const handleFilesSelect = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleConvert = async () => {
    if (selectedFiles.length === 0) return;

    try {
      setIsConverting(true);

      await pngToPdf(selectedFiles);
    } catch (error) {
      console.error("PNG to PDF error:", error);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <ToolWorkspace
      title="PNG to PDF"
      description="Convert PNG images into a single PDF document."
      accept=".png,image/png"
      acceptedLabel="PNG images"
      multiple
      isConverting={isConverting}
      onFilesSelect={handleFilesSelect}
      onConvert={handleConvert}
    />
  );
}
