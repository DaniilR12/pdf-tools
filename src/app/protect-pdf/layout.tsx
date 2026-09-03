import { ToolSeoContent } from "@/components/ToolSeoContent/ToolSeoContent";
import { createToolMetadata, TOOL_SEO } from "@/shared/seo/tool-seo";
import type { Metadata } from "next";

const data = TOOL_SEO["protect-pdf"];
export const metadata: Metadata = createToolMetadata(data);

export default function ProtectPdfLayout({
  children,
}: LayoutProps<"/protect-pdf">) {
  return (
    <>
      {children}
      <ToolSeoContent data={data} />
    </>
  );
}
