"use client";

import React from "react";
import { TextField, ImageUpload, StatsField } from "./CMSField";

interface HeroSectionData {
  topMessage: string;
  heading: string;
  subheading: string;
  heroImage: string;
  stats: Array<{ num: string; label: string }>;
  avatars: string[];
}

interface Props {
  data: Record<string, unknown>;
  onChange: (data: Record<string, unknown>) => void;
  pageKey: string;
}

export function HeroSectionEditor({ data, onChange }: Props) {
  const d = data as unknown as HeroSectionData;

  const update = (partial: Partial<HeroSectionData>) => {
    onChange({ ...data, ...partial });
  };

  const avatars = d.avatars ?? ["", "", ""];

  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Top Message</h3>
        <TextField label="Content" value={d.topMessage ?? ""} onChange={(v) => update({ topMessage: v })} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ImageUpload
            label="Avatar 1"
            dimensions="32 x 32"
            value={avatars[0]}
            onChange={(v) => update({ avatars: [v, avatars[1], avatars[2]] })}
          />
          <ImageUpload
            label="Avatar 2"
            dimensions="32 x 32"
            value={avatars[1]}
            onChange={(v) => update({ avatars: [avatars[0], v, avatars[2]] })}
          />
          <ImageUpload
            label="Avatar 3"
            dimensions="32 x 32"
            value={avatars[2]}
            onChange={(v) => update({ avatars: [avatars[0], avatars[1], v] })}
          />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Main Message</h3>
        <TextField
          label="Heading"
          value={d.heading ?? ""}
          onChange={(v) => update({ heading: v })}
          multiline
        />
        <TextField
          label="Sub-heading"
          value={d.subheading ?? ""}
          onChange={(v) => update({ subheading: v })}
          multiline
        />
        <ImageUpload
          label="Hero Image"
          dimensions="1100 x 600"
          value={d.heroImage}
          onChange={(v) => update({ heroImage: v })}
        />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Stats Section</h3>
        <StatsField
          items={d.stats ?? []}
          onChange={(items) => update({ stats: items })}
        />
      </section>
    </div>
  );
}
