"use client";

import { useCMSSection } from "@/lib/cms/useCMS";
import { DEFAULT_HOME_CONTENT } from "@/lib/cms/defaults";
import TestimonialsSection from "../TestimonialsSection";

interface PageTestimonialsSectionProps {
  pageKey?: string;
}

export default function PageTestimonialsSection({ pageKey = "home" }: PageTestimonialsSectionProps) {
  const query = useCMSSection("testimonials", pageKey);
  const data = query.data ?? DEFAULT_HOME_CONTENT.testimonials;

  return (
    <TestimonialsSection
      badge={data.tag}
      heading={data.tagline}
      subheading={data.subTagline}
      testimonials={data.testimonials}
    />
  );
}
