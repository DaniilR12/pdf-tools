import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const runPdfToDocx = (sourcePath: string, targetPath: string) =>
  new Promise<void>((resolve, reject) => {
    const python = spawn("python", [
      path.join(process.cwd(), "scripts", "pdf_to_docx.py"),
      sourcePath,
      targetPath,
    ]);
    let errorOutput = "";

    python.stderr.on("data", (chunk: Buffer) => {
      errorOutput += chunk.toString();
    });
    python.on("error", reject);
    python.on("close", (code) => {
      if (code === 0) resolve();
      else
        reject(new Error(errorOutput || `pdf2docx exited with code ${code}`));
    });
  });

export async function POST(request: NextRequest) {
  let temporaryDirectory = "";

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "PDF file is required" },
        { status: 400 },
      );
    }

    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      return NextResponse.json(
        { error: "Only PDF files are supported" },
        { status: 400 },
      );
    }

    temporaryDirectory = path.join(os.tmpdir(), `pdf-to-word-${randomUUID()}`);
    await fs.mkdir(temporaryDirectory, { recursive: true });

    const sourcePath = path.join(temporaryDirectory, "source.pdf");
    const targetPath = path.join(temporaryDirectory, "converted.docx");
    await fs.writeFile(sourcePath, Buffer.from(await file.arrayBuffer()));
    await runPdfToDocx(sourcePath, targetPath);

    const document = await fs.readFile(targetPath);
    const fileName = `${file.name.replace(/\.pdf$/i, "") || "converted"}.docx`;
    const asciiFileName = fileName.replace(/[^\x20-\x7E]/g, "_");

    return new NextResponse(document, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${asciiFileName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`,
      },
    });
  } catch (error) {
    console.error("PDF to Word conversion failed:", error);
    return NextResponse.json(
      { error: "Failed to convert PDF to Word" },
      { status: 500 },
    );
  } finally {
    if (temporaryDirectory) {
      await fs.rm(temporaryDirectory, { recursive: true, force: true });
    }
  }
}
