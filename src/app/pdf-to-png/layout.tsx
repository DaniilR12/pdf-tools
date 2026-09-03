import { ToolSeoContent } from "@/components/ToolSeoContent/ToolSeoContent";
import { createToolMetadata, TOOL_SEO } from "@/shared/seo/tool-seo";
import type { Metadata } from "next";

const data = TOOL_SEO["pdf-to-png"];
export const metadata: Metadata = createToolMetadata(data);

export default function PdfToPngLayout({
  children,
}: LayoutProps<"/pdf-to-png">) {
  return (
    <>
      {children}
      <ToolSeoContent data={data} />
    </>
  );
}
