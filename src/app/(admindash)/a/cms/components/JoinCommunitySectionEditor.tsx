"use client";

import React from "react";
import { TextField } from "./CMSField";

interface CtaBreakData {
  tagline: string;
  description: string;
  button1Label: string;
  button2Label: string;
}

interface Props {
  data: Record<string, unknown>;
  onChange: (data: Record<string, unknown>) => void;
  pageKey: string;
}

export function JoinCommunitySectionEditor({ data, onChange }: Props) {
  const d = data as unknown as CtaBreakData;

  const update = (partial: Partial<CtaBreakData>) => {
    onChange({ ...data, ...partial });
  };

  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Join Community (CTA Break)</h3>
        <TextField label="Tagline" value={d.tagline ?? ""} onChange={(v) => update({ tagline: v })} multiline />
        <TextField label="Description" value={d.description ?? ""} onChange={(v) => update({ description: v })} multiline />
        <TextField label="Button 1 Label" value={d.button1Label ?? ""} onChange={(v) => update({ button1Label: v })} />
        <TextField label="Button 2 Label" value={d.button2Label ?? ""} onChange={(v) => update({ button2Label: v })} />
      </section>
    </div>
  );
}
