import type { MetadataRoute } from "next";
import { SITE_URL, TOOL_SEO } from "@/shared/seo/tool-seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = Object.values(TOOL_SEO).map((tool) => ({
    url: `${SITE_URL}/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...toolPages,
  ];
}
