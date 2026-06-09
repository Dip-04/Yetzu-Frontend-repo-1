"use client";

import React from "react";
import { TextField, ImageUpload } from "./CMSField";

interface ResourceBlog {
  title: string;
  excerpt: string;
  image: string;
  avatar: string;
  author: string;
  date: string;
}

interface ResourcesData {
  heading: string;
  subheading: string;
  buttonText: string;
  featured: ResourceBlog;
  blogs: ResourceBlog[];
}

interface Props {
  data: Record<string, unknown>;
  onChange: (data: Record<string, unknown>) => void;
  pageKey: string;
}

export function ResourcesSectionEditor({ data, onChange }: Props) {
  const d = data as unknown as ResourcesData;

  const update = (partial: Partial<ResourcesData>) => {
    onChange({ ...data, ...partial });
  };

  const updateFeatured = (partial: Partial<ResourceBlog>) => {
    update({ featured: { ...d.featured, ...partial } } as Partial<ResourcesData>);
  };

  const updateBlog = (idx: number, partial: Partial<ResourceBlog>) => {
    const blogs = [...(d.blogs ?? [])];
    blogs[idx] = { ...blogs[idx], ...partial };
    update({ blogs });
  };

  const featured = d.featured ?? { title: "", excerpt: "", image: "", avatar: "", author: "", date: "" };
  const blogs = d.blogs ?? Array(3).fill(null).map(() => ({ title: "", excerpt: "", image: "", avatar: "", author: "", date: "" }));

  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Resources Section</h3>
        <TextField label="Heading" value={d.heading ?? ""} onChange={(v) => update({ heading: v })} />
        <TextField label="Subheading" value={d.subheading ?? ""} onChange={(v) => update({ subheading: v })} multiline />
        <TextField label="Button Text" value={d.buttonText ?? ""} onChange={(v) => update({ buttonText: v })} />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Featured Resource</h3>
        <TextField label="Title" value={featured.title ?? ""} onChange={(v) => updateFeatured({ title: v })} multiline />
        <TextField label="Excerpt" value={featured.excerpt ?? ""} onChange={(v) => updateFeatured({ excerpt: v })} multiline />
        <ImageUpload label="Featured Image" dimensions="600 x 400" value={featured.image} onChange={(v) => updateFeatured({ image: v })} />
        <TextField label="Author Name" value={featured.author ?? ""} onChange={(v) => updateFeatured({ author: v })} />
        <TextField label="Date" value={featured.date ?? ""} onChange={(v) => updateFeatured({ date: v })} />
        <ImageUpload label="Author Avatar" dimensions="32 x 32" value={featured.avatar} onChange={(v) => updateFeatured({ avatar: v })} />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Resource Cards</h3>
        {blogs.map((blog, i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-lg mb-4 border border-slate-200">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Card {i + 1}</h4>
            <TextField label="Title" value={blog.title ?? ""} onChange={(v) => updateBlog(i, { title: v })} />
            <TextField label="Excerpt" value={blog.excerpt ?? ""} onChange={(v) => updateBlog(i, { excerpt: v })} multiline />
            <ImageUpload label="Image" dimensions="600 x 400" value={blog.image} onChange={(v) => updateBlog(i, { image: v })} />
            <TextField label="Author" value={blog.author ?? ""} onChange={(v) => updateBlog(i, { author: v })} />
            <TextField label="Date" value={blog.date ?? ""} onChange={(v) => updateBlog(i, { date: v })} />
            <ImageUpload label="Avatar" dimensions="32 x 32" value={blog.avatar} onChange={(v) => updateBlog(i, { avatar: v })} />
          </div>
        ))}
      </section>
    </div>
  );
}
