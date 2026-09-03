import type { ToolSeoData } from "@/shared/seo/tool-seo";
import s from "./ToolSeoContent.module.scss";

type ToolSeoContentProps = {
  data: ToolSeoData;
};

export function ToolSeoContent({ data }: ToolSeoContentProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: data.name,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        url: `https://filezeno.vercel.app/${data.slug}`,
        description: data.description,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "FAQPage",
        mainEntity: data.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <>
      <section className={s.content} aria-labelledby="about-tool">
        <div>
          <h2 id="about-tool">{data.title}</h2>
          <p>{data.intro}</p>
        </div>
        <div className={s.steps}>
          <h2>How to use this tool</h2>
          <ol>
            {data.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <div className={s.faq}>
          <h2>Frequently asked questions</h2>
          {data.faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
