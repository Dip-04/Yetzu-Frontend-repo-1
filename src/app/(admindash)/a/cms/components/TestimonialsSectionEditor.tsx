"use client";

import React from "react";
import { TextField } from "./CMSField";

interface Testimonial {
  name: string;
  role: string;
  text: string;
  avatar: string;
}

interface TestimonialsData {
  tag: string;
  tagline: string;
  subTagline: string;
  testimonials: Testimonial[];
}

interface Props {
  data: Record<string, unknown>;
  onChange: (data: Record<string, unknown>) => void;
  pageKey: string;
}

export function TestimonialsSectionEditor({ data, onChange }: Props) {
  const d = data as unknown as TestimonialsData;

  const update = (partial: Partial<TestimonialsData>) => {
    onChange({ ...data, ...partial });
  };

  const updateTestimonial = (idx: number, partial: Partial<Testimonial>) => {
    const testimonials = [...(d.testimonials ?? [])];
    testimonials[idx] = { ...testimonials[idx], ...partial };
    update({ testimonials });
  };

  const testimonials = d.testimonials ?? [];

  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Testimonials Section</h3>
        <TextField label="Badge" value={d.tag ?? ""} onChange={(v) => update({ tag: v })} />
        <TextField label="Heading" value={d.tagline ?? ""} onChange={(v) => update({ tagline: v })} multiline />
        <TextField label="Subheading" value={d.subTagline ?? ""} onChange={(v) => update({ subTagline: v })} multiline />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Testimonials</h3>
        {testimonials.map((t, i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-lg mb-3 border border-slate-200">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Testimonial {i + 1}</h4>
            <TextField label="Name" value={t.name ?? ""} onChange={(v) => updateTestimonial(i, { name: v })} />
            <TextField label="Role" value={t.role ?? ""} onChange={(v) => updateTestimonial(i, { role: v })} />
            <TextField label="Text" value={t.text ?? ""} onChange={(v) => updateTestimonial(i, { text: v })} multiline />
          </div>
        ))}
      </section>
    </div>
  );
}
