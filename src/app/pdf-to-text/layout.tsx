import { ToolSeoContent } from "@/components/ToolSeoContent/ToolSeoContent";
import { createToolMetadata, TOOL_SEO } from "@/shared/seo/tool-seo";
import type { Metadata } from "next";

const data = TOOL_SEO["pdf-to-text"];
export const metadata: Metadata = createToolMetadata(data);

export default function PdfToTextLayout({
  children,
}: LayoutProps<"/pdf-to-text">) {
  return (
    <>
      {children}
      <ToolSeoContent data={data} />
    </>
  );
}
