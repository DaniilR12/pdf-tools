import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "File not found" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const imageBytes = new Uint8Array(arrayBuffer);

    const pdfDoc = await PDFDocument.create();

    let image;

    if (file.type === "image/jpeg") {
      image = await pdfDoc.embedJpg(imageBytes);
    } else if (file.type === "image/png") {
      image = await pdfDoc.embedPng(imageBytes);
    } else {
      return NextResponse.json(
        { error: "Only JPG and PNG files are supported" },
        { status: 400 },
      );
    }

    const page = pdfDoc.addPage([image.width, image.height]);

    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });

    const pdfBytes = await pdfDoc.save();
    const responseBuffer = pdfBytes.buffer.slice(
      pdfBytes.byteOffset,
      pdfBytes.byteOffset + pdfBytes.byteLength,
    ) as ArrayBuffer;

    return new Response(new Blob([responseBuffer]).stream(), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="converted.pdf"',
      },
    });
  } catch (error) {
    console.error("Conversion error:", error);

    return NextResponse.json(
      { error: "Failed to convert file" },
      { status: 500 },
    );
  }
}
