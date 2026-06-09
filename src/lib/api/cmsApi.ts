import { authApi } from "../axios";
import type { CMSSectionResponse } from "../cms/types";

const log = (label: string, error: unknown, meta?: Record<string, unknown>) => {
  console.error(`[CMS:${label}]`, { message: (error as Error)?.message, meta });
};

export const CMSApi = {
  getSection: async <D = Record<string, unknown>>(
    pageKey: string,
    sectionKey: string
  ): Promise<CMSSectionResponse<D> | null> => {
    try {
      const response = await authApi.get(`/api/cms/pages/${pageKey}/sections/${sectionKey}`);
      const data = response?.data?.data || response?.data || response;
      return data as CMSSectionResponse<D>;
    } catch (error) {
      log("getSection", error, { pageKey, sectionKey });
      return null;
    }
  },

  updateSection: async <D = Record<string, unknown>>(
    pageKey: string,
    sectionKey: string,
    payload: {
      sectionTitle?: string;
      sortOrder?: number;
      metadata?: Record<string, unknown>;
      data: D;
    }
  ): Promise<boolean> => {
    try {
      await authApi.put(`/api/cms/pages/${pageKey}/sections/${sectionKey}`, payload);
      return true;
    } catch (error) {
      log("updateSection", error, { pageKey, sectionKey });
      return false;
    }
  },

  getPage: async (pageKey: string) => {
    try {
      const response = await authApi.get(`/api/cms/pages/${pageKey}`);
      return response?.data?.data || response?.data || response;
    } catch (error) {
      log("getPage", error, { pageKey });
      return null;
    }
  },

  uploadMedia: async (file: File, title?: string, altText?: string): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (title) formData.append("title", title);
      if (altText) formData.append("altText", altText);
      const response = await authApi.post("/api/cms/media", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const result = response?.data?.data || response?.data || response;
      return result?.url || result?.fileUrl || result?.path || null;
    } catch (error) {
      log("uploadMedia", error, { title });
      return null;
    }
  },
};
