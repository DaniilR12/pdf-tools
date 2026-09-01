import { DocxIcon, PdfIcon } from "../ui/icons";
import type { ReactNode } from "react";

export type InfoCard = {
  link: string;
  imageOne: ReactNode;
  imageTwo: ReactNode;
  name: string;
  description: string;
};

export const INFO_CARDS: InfoCard[] = [
  {
    link: "/pdf-to-jpg",
    imageOne: <PdfIcon />,
    imageTwo: <DocxIcon />,
    name: "PDF to JPG",
    description: "Turn every PDF page into a crisp JPG image.",
  },
  {
    link: "/jpg-to-pdf",
    imageOne: <PdfIcon />,
    imageTwo: <DocxIcon />,
    name: "JPG to PDF",
    description: "Combine images into a clean, shareable PDF.",
  },
  {
    link: "/pdf-to-text",
    imageOne: <PdfIcon />,
    imageTwo: <DocxIcon />,
    name: "PDF to Text",
    description: "Extract text from PDF files in seconds.",
  },
  {
    link: "/image-to-text",
    imageOne: <PdfIcon />,
    imageTwo: <DocxIcon />,
    name: "Image to Text",
    description: "Extract text from images with OCR.",
  },
  {
    link: "/merge-pdf",
    imageOne: <PdfIcon />,
    imageTwo: <PdfIcon />,
    name: "Merge PDF",
    description: "Combine multiple PDF files into one document.",
  },
  {
    link: "/split-pdf",
    imageOne: <PdfIcon />,
    imageTwo: <PdfIcon />,
    name: "Split PDF",
    description: "Split a PDF into separate files or selected pages.",
  },
  {
    link: "/compress-pdf",
    imageOne: <PdfIcon />,
    imageTwo: <PdfIcon />,
    name: "Compress PDF",
    description: "Reduce PDF file size while keeping it readable.",
  },
  {
    link: "/pdf-to-png",
    imageOne: <PdfIcon />,
    imageTwo: <DocxIcon />,
    name: "PDF to PNG",
    description: "Convert PDF pages into high-quality PNG images.",
  },
  {
    link: "/png-to-pdf",
    imageOne: <PdfIcon />,
    imageTwo: <DocxIcon />,
    name: "PNG to PDF",
    description: "Turn PNG images into a single PDF document.",
  },
  {
    link: "/protect-pdf",
    imageOne: <PdfIcon />,
    imageTwo: <DocxIcon />,
    name: "Protect PDF",
    description: "Secure your PDF with password protection.",
  },
];
