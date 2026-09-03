import { ToolSeoContent } from "@/components/ToolSeoContent/ToolSeoContent";
import { createToolMetadata, TOOL_SEO } from "@/shared/seo/tool-seo";
import type { Metadata } from "next";

const data = TOOL_SEO["image-to-text"];
export const metadata: Metadata = createToolMetadata(data);

export default function ImageToTextLayout({
  children,
}: LayoutProps<"/image-to-text">) {
  return (
    <>
      {children}
      <ToolSeoContent data={data} />
    </>
  );
}
