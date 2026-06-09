"use client";

import React from "react";
import { TextField } from "./CMSField";

interface WebinarsData {
  tagline: string;
  subTagline: string;
  ctaLabel: string;
}

interface Props {
  data: Record<string, unknown>;
  onChange: (data: Record<string, unknown>) => void;
  pageKey: string;
}

export function WebinarsSectionEditor({ data, onChange }: Props) {
  const d = data as unknown as WebinarsData;

  const update = (partial: Partial<WebinarsData>) => {
    onChange({ ...data, ...partial });
  };

  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Webinars Section</h3>
        <p className="text-sm text-slate-500 mb-4">
          Section uses shared WebinarsSection component from components folder.
          The course/webinar data is fetched dynamically from the backend.
        </p>
        <TextField label="Heading" value={d.tagline ?? ""} onChange={(v) => update({ tagline: v })} />
        <TextField label="Subheading" value={d.subTagline ?? ""} onChange={(v) => update({ subTagline: v })} />
        <TextField label="CTA Label" value={d.ctaLabel ?? ""} onChange={(v) => update({ ctaLabel: v })} />
      </section>
    </div>
  );
}
