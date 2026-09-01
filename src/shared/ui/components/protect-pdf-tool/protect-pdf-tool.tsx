"use client";

import { useMemo, useState } from "react";
import { ToolWorkspace } from "@/components/ToolWorkspace/ToolWorkspace";
import { protectPdf } from "@/lib/protectPdf";
import s from "./protect-pdf-tool.module.scss";

const MIN_PASSWORD_LENGTH = 6;

export default function ProtectPdfTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  const passwordError = useMemo(() => {
    if (!isPasswordTouched) return "";

    if (!password) return "Enter a password to continue";

    return password.length < MIN_PASSWORD_LENGTH
      ? `Use at least ${MIN_PASSWORD_LENGTH} characters`
      : "";
  }, [isPasswordTouched, password]);

  const isPasswordValid = password.length >= MIN_PASSWORD_LENGTH;
  const isActionDisabled = !selectedFile || !isPasswordValid || isConverting;

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleProtect = async () => {
    setIsPasswordTouched(true);

    if (!selectedFile || !isPasswordValid) return;

    try {
      setIsConverting(true);

      await protectPdf(selectedFile, password);
    } catch (error) {
      console.error("Protect PDF error:", error);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <ToolWorkspace
      title="Protect PDF"
      description="Protect your PDF with a password and keep your document secure."
      accept=".pdf,application/pdf"
      acceptedLabel="PDF files"
      isConverting={isConverting}
      isPrimaryActionDisabled={isActionDisabled}
      primaryActionLabel={isConverting ? "Encrypting..." : "Protect PDF"}
      onFileSelect={handleFileSelect}
      onConvert={handleProtect}
    >
      <div className={s.fieldGroup}>
        <div className={s.labelRow}>
          <label htmlFor="password">Password</label>
          <span className={s.passwordLength}>{password.length}/8</span>
        </div>

        <div
          className={`${s.inputWrap} ${password ? s.hasValue : ""} ${
            passwordError ? s.error : ""
          }`}
        >
          <span className={s.prefix} aria-hidden="true">
            🔒
          </span>

          <input
            id="password"
            className={s.input}
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setIsPasswordTouched(true);
            }}
            onBlur={() => setIsPasswordTouched(true)}
            placeholder="Enter a password"
            autoComplete="new-password"
            aria-invalid={Boolean(passwordError)}
            aria-describedby="password-help"
          />

          {password ? (
            <button
              type="button"
              className={s.clearButton}
              aria-label="Clear password"
              onClick={() => setPassword("")}
            >
              ×
            </button>
          ) : null}
        </div>

        <p
          id="password-help"
          className={passwordError ? s.errorText : s.helperText}
        >
          {passwordError ||
            "Use at least 6 characters for a secure encryption."}
        </p>
      </div>
    </ToolWorkspace>
  );
}
