import { ToolSeoContent } from "@/components/ToolSeoContent/ToolSeoContent";
import { createToolMetadata, TOOL_SEO } from "@/shared/seo/tool-seo";
import type { Metadata } from "next";

const data = TOOL_SEO["pdf-to-jpg"];
export const metadata: Metadata = createToolMetadata(data);

export default function PdfToJpgLayout({
  children,
}: LayoutProps<"/pdf-to-jpg">) {
  return (
    <>
      {children}
      <ToolSeoContent data={data} />
    </>
  );
}
