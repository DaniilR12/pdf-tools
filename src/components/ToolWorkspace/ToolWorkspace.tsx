"use client";

import { ChangeEvent, DragEvent, useState } from "react";
import Link from "next/link";
import s from "./ToolWorkspace.module.scss";

type ToolWorkspaceProps = {
  isConverting?: boolean;
  onFileSelect?: (file: File | null) => void;
  onConvert?: () => Promise<void>;
  apiEndpoint?: string;
  title: string;
  description: string;
  accept: string;
  acceptedLabel: string;
  accent?: "blue" | "coral";
};

export const ToolWorkspace = ({
  isConverting,
  onConvert,
  onFileSelect,
  apiEndpoint,
  title,
  description,
  accept,
  acceptedLabel,
  accent = "blue",
}: ToolWorkspaceProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFile = (file?: File) => {
    if (!file) return;

    setSelectedFile(file);
    setFileName(file.name);
    onFileSelect?.(file);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    handleFile(event.target.files?.[0]);

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files?.[0]);
  };

  const handleConvert = async () => {
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      if (!apiEndpoint) return;

      const res = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Conversion error:", error);
        return;
      }

      const blob = await res.blob();

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName?.replace(/\.jpe?g|\.png|image\/jpe?g|image\/png/gi, "")}.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Request error:", error);
    }
  };

  return (
    <main className={s.page}>
      <div className={s.breadcrumb}>
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span>{title}</span>
      </div>
      <section
        className={`${s.workspace} ${accent === "coral" ? s.coral : ""}`}
      >
        <div className={s.heading}>
          <span className={s.kicker}>FILEWISE TOOL</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <label
          className={`${s.dropzone} ${isDragging ? s.dragging : ""}`}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <input type="file" accept={accept} onChange={handleChange} />
          <span className={s.uploadIcon} aria-hidden="true">
            ↑
          </span>
          <strong>{fileName ?? "Drop your file here"}</strong>
          <span>
            {fileName
              ? "Ready to process"
              : "or click to browse from your device"}
          </span>
          <small>{acceptedLabel}</small>
        </label>
        <div className={s.actions}>
          <span className={s.privacy}>
            <span aria-hidden="true">⌁</span> Files are processed securely
          </span>
          <button
            className={s.primaryButton}
            type="button"
            disabled={!selectedFile || isConverting}
            onClick={onConvert ? onConvert : handleConvert}
          >
            {isConverting
              ? "Converting..."
              : selectedFile
                ? "Continue"
                : "Choose a file"}
          </button>
        </div>
      </section>
      <p className={s.note}>
        No account required. Your files stay private and are removed after
        processing.
      </p>
    </main>
  );
};
