"use client";

import { useQuery } from "@tanstack/react-query";
import { CMSApi } from "../api/cmsApi";
import type { HomePageContent, SectionKey } from "./types";
import { DEFAULT_HOME_CONTENT } from "./defaults";

const SECTION_KEY_MAP: Record<string, keyof HomePageContent> = {
  hero: "hero",
  video: "video",
  webinars: "webinars",
  mentorship: "mentorship",
  assignmentSupport: "assignmentSupport",
  testimonials: "testimonials",
  ctaBreak: "ctaBreak",
  programsWebinars: "programsWebinars",
  resources: "resources",
  faq: "faq",
  finalCta: "finalCta",
};

function cleanMerge(defaultVal: any, incomingVal: any): any {
  if (incomingVal === undefined || incomingVal === null) {
    return defaultVal;
  }
  
  if (Array.isArray(defaultVal)) {
    if (Array.isArray(incomingVal)) {
      if (incomingVal.length === 0) return defaultVal;
      
      const sanitized = incomingVal.map((item, index) => {
        const defaultItem = defaultVal[index] !== undefined ? defaultVal[index] : defaultVal[0];
        if (typeof defaultItem === "object" && defaultItem !== null) {
          return cleanMerge(defaultItem, item);
        }
        return item || defaultItem;
      }).filter(item => item !== "");
      
      return sanitized.length > 0 ? sanitized : defaultVal;
    }
    return defaultVal;
  }

  if (typeof defaultVal === "object" && defaultVal !== null) {
    if (typeof incomingVal === "object" && incomingVal !== null) {
      const merged: any = {};
      for (const k of Object.keys(defaultVal)) {
        merged[k] = cleanMerge(defaultVal[k], incomingVal[k]);
      }
      return merged;
    }
    return defaultVal;
  }

  if (typeof defaultVal === "string") {
    if (typeof incomingVal === "string" && incomingVal.trim() !== "") {
      return incomingVal;
    }
    return defaultVal;
  }

  if (typeof defaultVal === "number") {
    if (typeof incomingVal === "number" && !isNaN(incomingVal)) {
      return incomingVal;
    }
    if (typeof incomingVal === "string" && incomingVal.trim() !== "") {
      const parsed = Number(incomingVal);
      if (!isNaN(parsed)) return parsed;
    }
    return defaultVal;
  }

  return incomingVal !== undefined && incomingVal !== null ? incomingVal : defaultVal;
}

function buildContentFromSections(
  sections?: { sectionKey: string; data: unknown }[]
): HomePageContent {
  const content = { ...DEFAULT_HOME_CONTENT };
  if (!sections) return content;
  for (const section of sections) {
    const key = SECTION_KEY_MAP[section.sectionKey];
    if (key && section.data) {
      (content as any)[key] = cleanMerge(DEFAULT_HOME_CONTENT[key], section.data);
    }
  }
  return content;
}

export function useCMSSection<K extends SectionKey>(
  sectionKey: K,
  pageKey = "home"
) {
  const defaultValue = DEFAULT_HOME_CONTENT[sectionKey];

  return useQuery({
    queryKey: ["cms", "public", pageKey, sectionKey],
    queryFn: async () => {
      const page = await CMSApi.getPublicPage(pageKey);
      const section = page?.sections?.find(
        (s) => s.sectionKey === sectionKey
      );
      return (section?.data ? cleanMerge(defaultValue, section.data) : defaultValue) as HomePageContent[K];
    },
    placeholderData: defaultValue as any,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useHomeContent(pageKey = "home") {
  const query = useQuery({
    queryKey: ["cms", "public", pageKey],
    queryFn: async () => {
      const page = await CMSApi.getPublicPage(pageKey);
      return buildContentFromSections(page?.sections);
    },
    placeholderData: DEFAULT_HOME_CONTENT,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return { data: query.data ?? DEFAULT_HOME_CONTENT };
}
