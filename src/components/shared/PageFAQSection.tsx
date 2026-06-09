"use client";

import { useCMSSection } from "@/lib/cms/useCMS";
import { DEFAULT_HOME_CONTENT } from "@/lib/cms/defaults";
import FAQSection from "./FAQSection";

interface PageFAQSectionProps {
  pageKey?: string;
}

export default function PageFAQSection({ pageKey = "home" }: PageFAQSectionProps) {
  const query = useCMSSection("faq", pageKey);
  const data = query.data ?? DEFAULT_HOME_CONTENT.faq;

  return (
    <FAQSection
      badge={data.tag}
      heading={data.description}
      faqs={data.faqs}
      ctaText={data.ctaText}
      ctaLabel={data.ctaLabel}
    />
  );
}
