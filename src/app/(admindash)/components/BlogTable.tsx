"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { AdminAPI } from "@/lib/api";
import { toast } from "react-hot-toast";

interface Blog {
  id?: string;
  _id?: string;
  title: string;
  status: string;
  tags?: string[];
  createdAt?: string;
  created_at?: string;
  sections?: any[];
  excerpt?: string;
  content?: string;
}

interface Props {
  data: Blog[];
  showHeader?: boolean;
  title?: string;
  onRowClick?: (blog: Blog) => void;
  selectedBlogId?: string;
  onEdit?: (blog: Blog) => void;
  onDelete?: (blogId: string) => void;
  className?: string;
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-4 h-4"
    >
      <path
        d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusStyles: Record<string, string> = {
    published: "bg-green-100 text-green-800",
    draft: "bg-gray-100 text-gray-600",
    archived: "bg-red-100 text-red-800",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${statusStyles[status] || "bg-gray-100 text-gray-800"}`}>
      {status}
    </span>
  );
}

export default function BlogTable({ data, showHeader = true, title, onRowClick, selectedBlogId, onEdit, onDelete, className = "mt-10" }: Props) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (e: React.MouseEvent, blogId: string) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this blog?")) return;
    setDeletingId(blogId);
    try {
      await AdminAPI.deleteBlog(blogId);
      toast.success("Blog deleted successfully");
      if (onDelete) onDelete(blogId);
    } catch (error) {
      console.error("Failed to delete blog:", error);
      toast.error("Failed to delete blog");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (e: React.MouseEvent, blog: Blog) => {
    e.stopPropagation();
    if (onEdit) onEdit(blog);
  };

  const getBlogId = (blog: Blog) => blog.id || blog._id || "";

  return (
    <div className={`border border-slate-200 rounded-lg overflow-hidden bg-white w-full ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-[#F8F9FA] border-slate-200">
              {["Title", "Status", "Tags", "Created Date", "Actions"].map((col, idx) => (
                <th key={idx} className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {(!data || data.length === 0) ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-500">
                  No blogs found
                </td>
              </tr>
            ) : data.map((item, idx) => {
              const blogId = getBlogId(item);
              return (
                <tr
                  key={blogId || idx}
                  className={`hover:bg-slate-50/50 transition-colors group cursor-pointer ${selectedBlogId === blogId ? "bg-blue-50/50" : ""}`}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">{item.title || "Untitled"}</div>
                    {item.excerpt && (
                      <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">{item.excerpt}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={item.status || "draft"} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {item.tags && item.tags.length > 0 ? (
                        item.tags.slice(0, 3).map((tag: string, i: number) => (
                          <span key={i} className="inline-flex items-center px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs font-medium">
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 text-sm">-</span>
                      )}
                      {item.tags && item.tags.length > 3 && (
                        <span className="text-xs text-slate-500">+{item.tags.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                    {item.createdAt || item.created_at
                      ? new Date(item.createdAt || item.created_at!).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onRowClick) onRowClick(item);
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F0F4FF] text-[#042BFD] hover:bg-[#042BFD] hover:text-white transition-all shadow-sm group/view"
                        title="View"
                      >
                        <EyeIcon />
                      </button>
                      <button
                        onClick={(e) => handleEdit(e, item)}
                        className="p-1.5 rounded-md hover:bg-slate-100 transition-colors text-slate-400 hover:text-blue-600"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, blogId)}
                        disabled={deletingId === blogId}
                        className="p-1.5 rounded-md hover:bg-slate-100 transition-colors text-slate-400 hover:text-red-600 disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
