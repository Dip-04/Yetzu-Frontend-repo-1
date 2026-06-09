"use client";

import { useQuery } from "@tanstack/react-query";
import { CMSApi } from "../api/cmsApi";
import type { SectionKey, HomePageContent } from "./types";
import { DEFAULT_HOME_CONTENT } from "./defaults";

type SectionDataMap = {
  hero: HomePageContent["hero"];
  video: HomePageContent["video"];
  webinars: HomePageContent["webinars"];
  mentorship: HomePageContent["mentorship"];
  assignmentSupport: HomePageContent["assignmentSupport"];
  testimonials: HomePageContent["testimonials"];
  ctaBreak: HomePageContent["ctaBreak"];
  programsWebinars: HomePageContent["programsWebinars"];
  resources: HomePageContent["resources"];
  faq: HomePageContent["faq"];
  finalCta: HomePageContent["finalCta"];
};

export function useCMSSection<K extends SectionKey>(
  sectionKey: K,
  pageKey = "home"
) {
  const defaultValue = DEFAULT_HOME_CONTENT[sectionKey] as SectionDataMap[K];

  return useQuery<SectionDataMap[K]>({
    queryKey: ["cms", pageKey, sectionKey],
    queryFn: async () => {
      const section = await CMSApi.getSection<SectionDataMap[K]>(
        pageKey,
        sectionKey
      );
      return section?.data ?? defaultValue;
    },
    placeholderData: defaultValue as any,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useHomeContent() {
  const sections = {
    hero: useCMSSection("hero"),
    video: useCMSSection("video"),
    webinars: useCMSSection("webinars"),
    mentorship: useCMSSection("mentorship"),
    assignmentSupport: useCMSSection("assignmentSupport"),
    testimonials: useCMSSection("testimonials"),
    ctaBreak: useCMSSection("ctaBreak"),
    programsWebinars: useCMSSection("programsWebinars"),
    resources: useCMSSection("resources"),
    faq: useCMSSection("faq"),
    finalCta: useCMSSection("finalCta"),
  };

  const data = {
    hero: sections.hero.data ?? DEFAULT_HOME_CONTENT.hero,
    video: sections.video.data ?? DEFAULT_HOME_CONTENT.video,
    webinars: sections.webinars.data ?? DEFAULT_HOME_CONTENT.webinars,
    mentorship: sections.mentorship.data ?? DEFAULT_HOME_CONTENT.mentorship,
    assignmentSupport:
      sections.assignmentSupport.data ?? DEFAULT_HOME_CONTENT.assignmentSupport,
    testimonials: sections.testimonials.data ?? DEFAULT_HOME_CONTENT.testimonials,
    ctaBreak: sections.ctaBreak.data ?? DEFAULT_HOME_CONTENT.ctaBreak,
    programsWebinars:
      sections.programsWebinars.data ?? DEFAULT_HOME_CONTENT.programsWebinars,
    resources: sections.resources.data ?? DEFAULT_HOME_CONTENT.resources,
    faq: sections.faq.data ?? DEFAULT_HOME_CONTENT.faq,
    finalCta: sections.finalCta.data ?? DEFAULT_HOME_CONTENT.finalCta,
  } as HomePageContent;

  return { data };
}
