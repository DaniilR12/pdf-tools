import { ToolSeoContent } from "@/components/ToolSeoContent/ToolSeoContent";
import { createToolMetadata, TOOL_SEO } from "@/shared/seo/tool-seo";
import type { Metadata } from "next";

const data = TOOL_SEO["compress-pdf"];
export const metadata: Metadata = createToolMetadata(data);

export default function CompressPdfLayout({
  children,
}: LayoutProps<"/compress-pdf">) {
  return (
    <>
      {children}
      <ToolSeoContent data={data} />
    </>
  );
}
