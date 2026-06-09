"use client";

import React from "react";
import { TextField } from "./CMSField";

interface ProgramsWebinarsData {
  tagline: string;
  heroTagline: string;
}

interface Props {
  data: Record<string, unknown>;
  onChange: (data: Record<string, unknown>) => void;
  pageKey: string;
}

export function ProgramsWebinarsSectionEditor({ data, onChange }: Props) {
  const d = data as unknown as ProgramsWebinarsData;

  const update = (partial: Partial<ProgramsWebinarsData>) => {
    onChange({ ...data, ...partial });
  };

  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Programs & Webinars Section</h3>
        <TextField label="Heading" value={d.tagline ?? ""} onChange={(v) => update({ tagline: v })} />
        <TextField label="Subheading" value={d.heroTagline ?? ""} onChange={(v) => update({ heroTagline: v })} multiline />
      </section>
    </div>
  );
}
