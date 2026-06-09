"use client";

import React from "react";
import { TextField } from "./CMSField";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FAQData {
  tag: string;
  description: string;
  faqs: FAQItem[];
  ctaText: string;
  ctaLabel: string;
}

interface Props {
  data: Record<string, unknown>;
  onChange: (data: Record<string, unknown>) => void;
  pageKey: string;
}

export function FAQSectionEditor({ data, onChange }: Props) {
  const d = data as unknown as FAQData;

  const update = (partial: Partial<FAQData>) => {
    onChange({ ...data, ...partial });
  };

  const updateFaq = (idx: number, partial: Partial<FAQItem>) => {
    const faqs = [...(d.faqs ?? [])];
    faqs[idx] = { ...faqs[idx], ...partial };
    update({ faqs });
  };

  const faqs = d.faqs ?? Array(5).fill(null).map((_, i) => ({
    id: i + 1,
    question: "",
    answer: "",
  }));

  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">FAQ Section</h3>
        <TextField label="Heading (Badge)" value={d.tag ?? ""} onChange={(v) => update({ tag: v })} />
        <TextField label="Subheading" value={d.description ?? ""} onChange={(v) => update({ description: v })} />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Still Have Questions Box</h3>
        <TextField label="Title" value={d.ctaText ?? ""} onChange={(v) => update({ ctaText: v })} />
        <TextField label="Button Text" value={d.ctaLabel ?? ""} onChange={(v) => update({ ctaLabel: v })} />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">FAQ Items</h3>
        {faqs.map((faq, i) => (
          <div key={faq.id ?? i} className="p-4 bg-slate-50 rounded-lg mb-3 border border-slate-200">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">FAQ {i + 1}</h4>
            <TextField label="Question" value={faq.question ?? ""} onChange={(v) => updateFaq(i, { question: v })} />
            <TextField label="Answer" value={faq.answer ?? ""} onChange={(v) => updateFaq(i, { answer: v })} multiline />
          </div>
        ))}
      </section>
    </div>
  );
}
