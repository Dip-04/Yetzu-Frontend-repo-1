"use client";

import React from "react";
import { TextField, CardField, ImageUpload } from "./CMSField";

interface MentorshipCard {
  title: string;
  desc: string;
  bgColor: string;
  iconBg: string;
  titleColor: string;
  descColor: string;
}

interface MentorshipSectionData {
  heading: string;
  subtext: string;
  buttonText: string;
  featureIcon: string;
  cards: MentorshipCard[];
}

interface Props {
  data: Record<string, unknown>;
  onChange: (data: Record<string, unknown>) => void;
  pageKey: string;
}

export function MentorshipSectionEditor({ data, onChange }: Props) {
  const d = data as unknown as MentorshipSectionData;

  const update = (partial: Partial<MentorshipSectionData>) => {
    onChange({ ...data, ...partial });
  };

  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">1:1 Mentorship Section</h3>
        <TextField
          label="Heading"
          value={d.heading ?? ""}
          onChange={(v) => update({ heading: v })}
          multiline
        />
        <TextField
          label="Subtext"
          value={d.subtext ?? ""}
          onChange={(v) => update({ subtext: v })}
          multiline
        />
        <TextField
          label="Button Text"
          value={d.buttonText ?? ""}
          onChange={(v) => update({ buttonText: v })}
        />
        <ImageUpload
          label="Feature Icon"
          dimensions="20 x 20"
          value={d.featureIcon}
          onChange={(v) => update({ featureIcon: v })}
        />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Cards</h3>
        <CardField
          items={d.cards ?? []}
          onChange={(items) => update({ cards: items })}
        />
      </section>
    </div>
  );
}
