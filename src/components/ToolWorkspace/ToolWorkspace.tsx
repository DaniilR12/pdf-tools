"use client";

import { ChangeEvent, DragEvent, useState } from "react";
import Link from "next/link";
import s from "./ToolWorkspace.module.scss";

type ToolWorkspaceProps = {
  isConverting?: boolean;
  isPrimaryActionDisabled?: boolean;
  primaryActionLabel?: string;

  // For existing single-file tools
  onFileSelect?: (file: File | null) => void;

  // For multiple-file tools such as Merge PDF
  onFilesSelect?: (files: File[]) => void;

  onConvert?: () => Promise<void>;
  apiEndpoint?: string;

  title: string;
  description: string;
  accept: string;
  acceptedLabel: string;

  accent?: "blue" | "coral";

  // Allows selecting multiple files
  multiple?: boolean;
  children?: React.ReactNode;
};

export const ToolWorkspace = ({
  children,
  isConverting,
  isPrimaryActionDisabled,
  primaryActionLabel,
  onConvert,
  onFileSelect,
  onFilesSelect,
  apiEndpoint,
  title,
  description,
  accept,
  acceptedLabel,
  accent = "blue",
  multiple = false,
}: ToolWorkspaceProps) => {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files: FileList | File[]) => {
    const filesArray = Array.from(files);

    if (!filesArray.length) return;

    if (multiple) {
      setSelectedFiles(filesArray);
      setFileNames(filesArray.map((file) => file.name));

      onFilesSelect?.(filesArray);

      return;
    }

    const file = filesArray[0];

    setSelectedFiles([file]);
    setFileNames([file.name]);

    onFileSelect?.(file);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    handleFiles(event.target.files);
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);

    handleFiles(event.dataTransfer.files);
  };

  const handleConvert = async () => {
    const selectedFile = selectedFiles[0];

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

      link.download = `${selectedFile.name.replace(
        /\.jpe?g|\.png|image\/jpe?g|image\/png/gi,
        "",
      )}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Request error:", error);
    }
  };

  const hasFiles = selectedFiles.length > 0;

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
          <span className={s.kicker}>FILEZENO TOOL</span>

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
          <input
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleChange}
          />

          <span className={s.uploadIcon} aria-hidden="true">
            ↑
          </span>

          <strong>
            {multiple
              ? hasFiles
                ? `${selectedFiles.length} ${
                    selectedFiles.length === 1 ? "file" : "files"
                  } selected`
                : "Drop your files here"
              : (fileNames[0] ?? "Drop your file here")}
          </strong>

          <span>
            {hasFiles
              ? "Ready to process"
              : "or click to browse from your device"}
          </span>

          <small>{acceptedLabel}</small>
        </label>

        {children}

        <div className={s.actions}>
          <span className={s.privacy}>
            <span aria-hidden="true">⌁</span>
            Files are processed securely
          </span>

          <button
            className={s.primaryButton}
            type="button"
            disabled={isPrimaryActionDisabled ?? (!hasFiles || isConverting)}
            onClick={onConvert ?? handleConvert}
          >
            {primaryActionLabel ??
              (isConverting
                ? "Converting..."
                : hasFiles
                  ? "Continue"
                  : multiple
                    ? "Choose files"
                    : "Choose a file")}
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
