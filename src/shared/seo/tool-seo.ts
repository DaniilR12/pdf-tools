import type { Metadata } from "next";

export type ToolSeoData = {
  slug: string;
  name: string;
  title: string;
  description: string;
  intro: string;
  steps: string[];
  faqs: { question: string; answer: string }[];
};

export const SITE_URL = "https://filezeno.vercel.app";
export const SITE_NAME = "Filezeno";

export const TOOL_SEO: Record<string, ToolSeoData> = {
  "pdf-to-png": {
    slug: "pdf-to-png",
    name: "PDF to PNG Converter",
    title: "PDF to PNG Converter Online",
    description:
      "Convert PDF pages to high-quality PNG images online. Fast, private, and free with no account required.",
    intro:
      "Turn each page of a PDF document into a clear PNG image directly in your browser. The converter is free to use and does not require an account.",
    steps: [
      "Upload a PDF file using the converter above.",
      "Start the conversion and wait for the pages to render.",
      "Download the PNG images when processing is complete.",
    ],
    faqs: [
      {
        question: "Is this PDF to PNG converter free?",
        answer: "Yes. You can convert PDF pages to PNG images for free.",
      },
      {
        question: "Do I need to install software?",
        answer:
          "No installation is required. The tool works in a modern web browser.",
      },
      {
        question: "What happens to my PDF?",
        answer:
          "Conversion is performed in your browser, so the selected file is not uploaded to a conversion server.",
      },
    ],
  },
  "pdf-to-jpg": {
    slug: "pdf-to-jpg",
    name: "PDF to JPG Converter",
    title: "PDF to JPG Converter Online",
    description:
      "Convert PDF pages to JPG images online. Create crisp image files quickly in your browser with no account required.",
    intro:
      "Convert every page of a PDF into a shareable JPG image. The browser-based tool is simple, private, and free to use.",
    steps: [
      "Choose a PDF file.",
      "Start the conversion.",
      "Download the JPG image or ZIP archive.",
    ],
    faqs: [
      {
        question: "Can I convert a multi-page PDF?",
        answer: "Yes. Each PDF page is converted into a separate JPG image.",
      },
      {
        question: "Is the conversion private?",
        answer:
          "Yes. Processing takes place in your browser and the PDF is not uploaded.",
      },
    ],
  },
  "jpg-to-pdf": {
    slug: "jpg-to-pdf",
    name: "JPG to PDF Converter",
    title: "JPG to PDF Converter Online",
    description:
      "Combine JPG and PNG images into one PDF online. Create a clean PDF quickly without installing software.",
    intro:
      "Turn one or more JPG or PNG images into a single PDF document ready to download and share.",
    steps: [
      "Select your JPG or PNG images.",
      "Arrange the files if needed and continue.",
      "Download your combined PDF.",
    ],
    faqs: [
      {
        question: "Which image formats are supported?",
        answer: "The tool supports JPG, JPEG, and PNG images.",
      },
      {
        question: "Do I need an account?",
        answer: "No account or software installation is required.",
      },
    ],
  },
  "pdf-to-text": {
    slug: "pdf-to-text",
    name: "PDF to Text Converter",
    title: "PDF to Text Converter Online",
    description:
      "Extract text from PDF files online and download it as a TXT document. Simple, fast, and private.",
    intro:
      "Extract selectable text from a PDF and save it as a clean text file directly in your browser.",
    steps: [
      "Upload a PDF document.",
      "Run the text extraction.",
      "Download the resulting TXT file.",
    ],
    faqs: [
      {
        question: "Does it work with scanned PDFs?",
        answer:
          "This tool extracts selectable text. Scanned pages may require OCR instead.",
      },
      {
        question: "Where is my PDF processed?",
        answer:
          "The extraction runs in your browser, without uploading the file.",
      },
    ],
  },
  "image-to-text": {
    slug: "image-to-text",
    name: "Image to Text Converter",
    title: "Image to Text Converter Online",
    description:
      "Extract text from JPG and PNG images with OCR online. Convert image text into a downloadable TXT file.",
    intro:
      "Use optical character recognition to extract readable text from JPG or PNG images in your browser.",
    steps: [
      "Upload a JPG or PNG image.",
      "Start OCR text recognition.",
      "Download the extracted text as a TXT file.",
    ],
    faqs: [
      {
        question: "What image formats can I use?",
        answer: "You can use JPG, JPEG, and PNG images.",
      },
      {
        question: "How accurate is OCR?",
        answer:
          "Recognition quality depends on image resolution, contrast, and text clarity.",
      },
    ],
  },
  "merge-pdf": {
    slug: "merge-pdf",
    name: "Merge PDF Tool",
    title: "Merge PDF Files Online",
    description:
      "Combine multiple PDF files into one document online. Merge PDFs quickly without installing software.",
    intro:
      "Join multiple PDF documents into one organized file for sharing, archiving, or printing.",
    steps: [
      "Select two or more PDF files.",
      "Start merging the documents.",
      "Download the combined PDF.",
    ],
    faqs: [
      {
        question: "Can I merge more than two PDFs?",
        answer:
          "Yes. Select multiple PDF files and combine them into one document.",
      },
      {
        question: "Are my files uploaded?",
        answer:
          "The PDF merge runs in your browser, so files remain on your device.",
      },
    ],
  },
  "split-pdf": {
    slug: "split-pdf",
    name: "Split PDF Tool",
    title: "Split PDF Files Online",
    description:
      "Split a PDF into separate files or selected pages online. Fast PDF splitting with no account required.",
    intro:
      "Separate pages from a PDF document or create smaller PDF files from selected page ranges.",
    steps: [
      "Upload your PDF.",
      "Choose the pages or split option.",
      "Download the new PDF files.",
    ],
    faqs: [
      {
        question: "Can I extract selected pages?",
        answer:
          "Yes. Use the page selection controls to create a PDF from chosen pages.",
      },
      {
        question: "Is PDF splitting free?",
        answer: "Yes. The tool is free and does not require an account.",
      },
    ],
  },
  "compress-pdf": {
    slug: "compress-pdf",
    name: "Compress PDF Tool",
    title: "Compress PDF Online",
    description:
      "Reduce PDF file size online while keeping documents readable. Compress PDFs quickly in your browser.",
    intro:
      "Make a PDF smaller for email, storage, or web upload while preserving practical document quality.",
    steps: [
      "Choose a PDF file.",
      "Start PDF compression.",
      "Download the smaller document.",
    ],
    faqs: [
      {
        question: "Will compression reduce PDF quality?",
        answer:
          "Compression can reduce file size while keeping text and pages readable.",
      },
      {
        question: "Is there a file upload?",
        answer: "The compression tool processes your file in the browser.",
      },
    ],
  },
  "png-to-pdf": {
    slug: "png-to-pdf",
    name: "PNG to PDF Converter",
    title: "PNG to PDF Converter Online",
    description:
      "Convert PNG images into a single PDF online. Create shareable PDF documents without installing software.",
    intro:
      "Turn PNG images into one convenient PDF document for sharing, printing, or archiving.",
    steps: [
      "Select one or more PNG images.",
      "Start the PDF conversion.",
      "Download your new PDF document.",
    ],
    faqs: [
      {
        question: "Can I convert multiple PNG images?",
        answer: "Yes. Multiple PNG images can be combined into one PDF.",
      },
      {
        question: "Does it work on mobile?",
        answer:
          "Yes. The converter works in modern mobile and desktop browsers.",
      },
    ],
  },
  "protect-pdf": {
    slug: "protect-pdf",
    name: "Protect PDF Tool",
    title: "Protect PDF With a Password Online",
    description:
      "Add password protection to a PDF online. Secure your document in your browser without installing software.",
    intro:
      "Add a password to a PDF before sharing it, using a quick browser-based document protection tool.",
    steps: [
      "Upload a PDF file.",
      "Enter and confirm a password.",
      "Download the protected PDF.",
    ],
    faqs: [
      {
        question: "Is my password stored?",
        answer:
          "The password is used for the current browser operation and is not stored by the tool.",
      },
      {
        question: "Can I protect any PDF?",
        answer:
          "Most standard PDF documents can be protected, depending on their existing restrictions.",
      },
    ],
  },
};

export function createToolMetadata(data: ToolSeoData): Metadata {
  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `/${data.slug}` },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `${SITE_URL}/${data.slug}`,
      siteName: SITE_NAME,
      images: [
        { url: "/og/openGraph.jpg", width: 1200, height: 630, alt: data.name },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: ["/og/openGraph.jpg"],
    },
    robots: { index: true, follow: true },
  };
}
