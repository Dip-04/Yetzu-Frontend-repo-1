"use client";

import React from "react";
import { TextField } from "./CMSField";

interface FinalCtaData {
  tagline: string;
  description: string;
  ctaLabel: string;
}

interface Props {
  data: Record<string, unknown>;
  onChange: (data: Record<string, unknown>) => void;
  pageKey: string;
}

export function TrustedByLeadersEditor({ data, onChange }: Props) {
  const d = data as unknown as FinalCtaData;

  const update = (partial: Partial<FinalCtaData>) => {
    onChange({ ...data, ...partial });
  };

  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Trusted By Leaders (Final CTA)</h3>
        <p className="text-sm text-slate-500 mb-4">
          This section uses the shared TrustedByLeaders component. Edit the CTA content below.
        </p>
        <TextField label="Tagline" value={d.tagline ?? ""} onChange={(v) => update({ tagline: v })} multiline />
        <TextField label="Description" value={d.description ?? ""} onChange={(v) => update({ description: v })} multiline />
        <TextField label="CTA Label" value={d.ctaLabel ?? ""} onChange={(v) => update({ ctaLabel: v })} />
      </section>
    </div>
  );
}
