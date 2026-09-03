import { ToolSeoContent } from "@/components/ToolSeoContent/ToolSeoContent";
import { createToolMetadata, TOOL_SEO } from "@/shared/seo/tool-seo";
import type { Metadata } from "next";

const data = TOOL_SEO["split-pdf"];
export const metadata: Metadata = createToolMetadata(data);

export default function SplitPdfLayout({
  children,
}: LayoutProps<"/split-pdf">) {
  return (
    <>
      {children}
      <ToolSeoContent data={data} />
    </>
  );
}
