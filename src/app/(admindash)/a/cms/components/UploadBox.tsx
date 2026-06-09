"use client";

import React, { useRef, useState } from "react";
import { Upload, Image as ImageIcon, X, Loader2 } from "lucide-react";
import { CMSApi } from "@/lib/api/cmsApi";

interface UploadBoxProps {
  label?: string;
  dimensions?: string;
  maxSize?: string;
  value?: string;
  onChange?: (url: string) => void;
}

export function UploadBox({
  label = "Drop a file or click to browse",
  dimensions = "36 x 36",
  maxSize = "10 MB",
  value,
  onChange,
}: UploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onChange) return;

    setUploading(true);
    const url = await CMSApi.uploadMedia(file);
    if (url) {
      onChange(url);
    }
    setUploading(false);
    e.target.value = "";
  };

  if (value) {
    return (
      <div className="relative w-full h-[160px] rounded-xl overflow-hidden bg-slate-100 group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={value}
          alt="Uploaded"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={handleClick}
            className="p-2 bg-white rounded-full hover:bg-slate-100 transition-colors"
            title="Replace image"
          >
            <Upload className="w-4 h-4 text-slate-700" />
          </button>
          <button
            onClick={() => onChange?.("")}
            className="p-2 bg-white rounded-full hover:bg-slate-100 transition-colors"
            title="Remove image"
          >
            <X className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-center justify-center border border-dashed border-blue-300 rounded-xl p-6 h-[160px] w-full hover:bg-slate-50 transition-colors cursor-pointer bg-white relative"
    >
      {uploading ? (
        <Loader2 className="w-5 h-5 text-blue-600 mb-3 animate-spin" />
      ) : (
        <ImageIcon className="w-5 h-5 text-blue-600 mb-3" />
      )}
      <p className="text-[13px] text-slate-600 font-medium">
        {uploading ? "Uploading..." : label}
      </p>
      <p className="text-xs text-slate-400 mt-1">
        {dimensions} ({maxSize} max)
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
