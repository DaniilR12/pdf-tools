"use client";

import { useState } from "react";
import Tesseract from "tesseract.js";
import { ToolWorkspace } from "@/components/ToolWorkspace/ToolWorkspace";

export default function ImageToTextPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleConvert = async () => {
    if (!selectedFile) return;

    try {
      const result = await Tesseract.recognize(selectedFile, "eng", {
        logger: (message) => {
          console.log(message);
        },
      });

      const text = result.data.text;

      console.log("Recognized text:", text);

      const blob = new Blob([text], {
        type: "text/plain;charset=utf-8",
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
      console.error("Image to text conversion error:", error);
    }
  };

  return (
    <ToolWorkspace
      onFileSelect={setSelectedFile}
      onConvert={handleConvert}
      title="Image to Text"
      description="Extract text from your images and save it as a TXT file."
      accept=".jpg,.jpeg,.png,image/jpeg,image/png"
      acceptedLabel="JPG or PNG images up to 25 MB"
    />
  );
}
