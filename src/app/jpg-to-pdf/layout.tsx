import { ToolSeoContent } from "@/components/ToolSeoContent/ToolSeoContent";
import { createToolMetadata, TOOL_SEO } from "@/shared/seo/tool-seo";
import type { Metadata } from "next";

const data = TOOL_SEO["jpg-to-pdf"];
export const metadata: Metadata = createToolMetadata(data);

export default function JpgToPdfLayout({
  children,
}: LayoutProps<"/jpg-to-pdf">) {
  return (
    <>
      {children}
      <ToolSeoContent data={data} />
    </>
  );
}
