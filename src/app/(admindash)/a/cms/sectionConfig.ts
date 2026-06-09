import { DEFAULT_HOME_CONTENT } from "@/lib/cms/defaults";

export const SECTION_KEY_MAP: Record<string, Record<string, string>> = {
  home: {
    "Hero Section": "hero",
    "Video Section": "video",
    "Webinars Section": "webinars",
    "1:1 Mentorship": "mentorship",
    "Assignment Support": "assignmentSupport",
    "Testimonials": "testimonials",
    "Join Community": "ctaBreak",
    "Programs & Webinars": "programsWebinars",
    "Resources": "resources",
    "FAQs": "faq",
    "Trusted By Leaders": "finalCta",
  },
};

type SectionDefaultMap = Record<string, Record<string, unknown>>;

export const SECTION_DEFAULTS: Record<string, SectionDefaultMap> = {
  home: {
    "Hero Section": DEFAULT_HOME_CONTENT.hero as unknown as Record<string, unknown>,
    "Video Section": DEFAULT_HOME_CONTENT.video as unknown as Record<string, unknown>,
    "Webinars Section": DEFAULT_HOME_CONTENT.webinars as unknown as Record<string, unknown>,
    "1:1 Mentorship": DEFAULT_HOME_CONTENT.mentorship as unknown as Record<string, unknown>,
    "Assignment Support": DEFAULT_HOME_CONTENT.assignmentSupport as unknown as Record<string, unknown>,
    "Testimonials": DEFAULT_HOME_CONTENT.testimonials as unknown as Record<string, unknown>,
    "Join Community": DEFAULT_HOME_CONTENT.ctaBreak as unknown as Record<string, unknown>,
    "Programs & Webinars": DEFAULT_HOME_CONTENT.programsWebinars as unknown as Record<string, unknown>,
    "Resources": DEFAULT_HOME_CONTENT.resources as unknown as Record<string, unknown>,
    "FAQs": DEFAULT_HOME_CONTENT.faq as unknown as Record<string, unknown>,
    "Trusted By Leaders": DEFAULT_HOME_CONTENT.finalCta as unknown as Record<string, unknown>,
  },
};

export function getDefaultSectionData(page: string, displayName: string): Record<string, unknown> {
  const defaults = SECTION_DEFAULTS[page];
  const data = defaults?.[displayName];
  return data ? { ...data } : {};
}
