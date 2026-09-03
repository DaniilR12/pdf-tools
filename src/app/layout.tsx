import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.png",
  },
  metadataBase: new URL("https://filezeno.vercel.app"),
  title: {
    default: "Filezeno | Online PDF and Image Tools",
    template: "%s | Filezeno",
  },
  description:
    "Convert, merge, split, compress and protect PDF files online. Extract text from PDFs and images with free browser-based tools.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Filezeno | Online PDF and Image Tools",
    description:
      "Convert, merge, split, compress and protect PDF files online with simple browser-based tools.",
    url: "https://filezeno.vercel.app",
    siteName: "Filezeno",
    images: [
      {
        url: "/og/openGraph.jpg",
        width: 1200,
        height: 630,
        alt: "Filezeno file tools",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filezeno | Online PDF and Image Tools",
    description: "Simple browser-based tools for PDF and image files.",
    images: ["/og/openGraph.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
