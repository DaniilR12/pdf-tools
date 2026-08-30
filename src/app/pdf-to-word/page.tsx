"use client";

import { useState } from "react";
import { ToolWorkspace } from "@/components/ToolWorkspace/ToolWorkspace";

export default function PdfToWordPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleConvert = async () => {
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/api/pdf-to-word", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message =
          errorData && typeof errorData.error === "string"
            ? errorData.error
            : `Conversion failed (HTTP ${response.status})`;
        console.error("PDF to Word API error:", message);
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${selectedFile.name.replace(/\.pdf$/i, "") || "converted"}.docx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF to Word conversion error:", error);
    }
  };

  return (
    <ToolWorkspace
      onFileSelect={setSelectedFile}
      onConvert={handleConvert}
      title="PDF to Word"
      description="Convert your PDF into an editable Word document."
      accept=".pdf,application/pdf"
      acceptedLabel="PDF files up to 25 MB"
    />
  );
}
