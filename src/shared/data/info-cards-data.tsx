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
    name: "PDF to text",
    description: "Extract searchable text from your documents.",
  },
  {
    link: "/image-to-text",
    imageOne: <PdfIcon />,
    imageTwo: <DocxIcon />,
    name: "Image to text",
    description: "Read text from screenshots and scanned images.",
  },
];
