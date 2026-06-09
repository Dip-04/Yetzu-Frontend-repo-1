"use client";

import React from "react";
import { TextField, ImageUpload } from "./CMSField";

interface AssignmentCard {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

interface AssignmentSupportData {
  heading: string;
  buttonText: string;
  cards: AssignmentCard[];
}

interface Props {
  data: Record<string, unknown>;
  onChange: (data: Record<string, unknown>) => void;
  pageKey: string;
}

export function AssignmentSupportSectionEditor({ data, onChange }: Props) {
  const d = data as unknown as AssignmentSupportData;

  const update = (partial: Partial<AssignmentSupportData>) => {
    onChange({ ...data, ...partial });
  };

  const updateCard = (idx: number, card: Partial<AssignmentCard>) => {
    const cards = [...(d.cards ?? [])];
    cards[idx] = { ...cards[idx], ...card };
    update({ cards });
  };

  const cards = d.cards ?? [
    { title: "", description: "", image: "", imageAlt: "" },
    { title: "", description: "", image: "", imageAlt: "" },
    { title: "", description: "", image: "", imageAlt: "" },
    { title: "", description: "", image: "", imageAlt: "" },
  ];

  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Assignment Support Section</h3>
        <TextField
          label="Heading"
          value={d.heading ?? ""}
          onChange={(v) => update({ heading: v })}
          multiline
        />
        <TextField
          label="Button Text"
          value={d.buttonText ?? ""}
          onChange={(v) => update({ buttonText: v })}
        />
      </section>

      {cards.map((card, i) => (
        <section key={i}>
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Card {i + 1}</h3>
          <TextField
            label="Title"
            value={card.title ?? ""}
            onChange={(v) => updateCard(i, { title: v })}
          />
          <TextField
            label="Description"
            value={card.description ?? ""}
            onChange={(v) => updateCard(i, { description: v })}
            multiline
          />
          <ImageUpload
            label="Image"
            dimensions={i === 0 ? "360 x 360" : i === 3 ? "340 x 330" : "260 x 330"}
            value={card.image}
            onChange={(v) => updateCard(i, { image: v })}
          />
          <TextField
            label="Image Alt Text"
            value={card.imageAlt ?? ""}
            onChange={(v) => updateCard(i, { imageAlt: v })}
          />
        </section>
      ))}
    </div>
  );
}
