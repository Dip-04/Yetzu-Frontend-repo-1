"use client";

import React from "react";
import { TextField } from "./CMSField";

interface VideoSectionData {
  heading: string;
  youtubeEmbedUrl: string;
}

interface Props {
  data: Record<string, unknown>;
  onChange: (data: Record<string, unknown>) => void;
  pageKey: string;
}

export function VideoSectionEditor({ data, onChange }: Props) {
  const d = data as unknown as VideoSectionData;

  const update = (partial: Partial<VideoSectionData>) => {
    onChange({ ...data, ...partial });
  };

  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Video Section</h3>
        <TextField
          label="Heading"
          value={d.heading ?? ""}
          onChange={(v) => update({ heading: v })}
        />
        <TextField
          label="YouTube Embed URL"
          value={d.youtubeEmbedUrl ?? ""}
          onChange={(v) => update({ youtubeEmbedUrl: v })}
          placeholder="https://www.youtube.com/embed/..."
        />
      </section>
    </div>
  );
}
