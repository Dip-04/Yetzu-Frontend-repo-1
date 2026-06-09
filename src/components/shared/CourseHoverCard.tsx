"use client";

import React from "react";
import { useGetCourseById } from "@/lib/queries/courses/useCoursesService";
import { useCart } from "@/providers/CartProvider";
import { Check, Loader2, Award, Users, Star } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface CourseHoverCardProps {
  courseId: string;
  position: "left" | "right";
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function CourseHoverCard({
  courseId,
  position,
  onMouseEnter,
  onMouseLeave,
}: CourseHoverCardProps) {
  const { data: course, isLoading } = useGetCourseById(courseId);
  const { addToCart, isInCart } = useCart();

  const inCart = isInCart(courseId);

  // Fallback learning outcomes/benefits if none are present in the response
  const benefits = course?.benefits && course.benefits.length > 0
    ? course.benefits
    : [
        "1:1 dedicated support from verified expert mentors",
        "Clear step-by-step guidance on assignments and projects",
        "Flexible study-friendly scheduling and interactive sessions",
      ];

  const arrowClass =
    position === "right"
      ? "absolute top-16 left-[-8px] w-4 h-4 bg-white border-l border-b border-gray-100 rotate-45"
      : "absolute top-16 right-[-8px] w-4 h-4 bg-white border-r border-t border-gray-100 rotate-45";

  if (isLoading) {
    return (
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`absolute top-0 z-50 w-[340px] bg-white border border-gray-100 rounded-xl shadow-2xl p-6 flex items-center justify-center min-h-[200px] transition-all duration-200 pointer-events-auto ${
          position === "right" ? "left-full ml-4" : "right-full mr-4"
        }`}
      >
        <Loader2 className="w-8 h-8 text-[#042BFD] animate-spin" />
      </div>
    );
  }

  if (!course) return null;

  const formattedDate = new Date(course.updatedAt || course.createdAt || Date.now()).toLocaleDateString(
    "en-US",
    { month: "long", year: "numeric" }
  );

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute top-[-20px] z-50 w-[360px] bg-white border border-gray-100 rounded-[12px] shadow-[0px_8px_32px_rgba(0,0,0,0.15)] p-6 text-left transition-all duration-200 pointer-events-auto text-[#252525] ${
        position === "right" ? "left-full ml-4" : "right-full mr-4"
      }`}
      style={{ fontFamily: "var(--font-sfpro)" }}
    >
      {/* Pointing arrow */}
      <div className={arrowClass}></div>

      {/* Course Title */}
      <h3
        className="font-inter font-bold text-[18px] leading-[22px] text-[#021165] mb-2"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {course.title}
      </h3>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 items-center mb-3">
        {course.pricingType === "paid" && (
          <span className="bg-[#042BFD] text-white flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide uppercase">
            Premium
          </span>
        )}
        {course.enrolledCount !== undefined && course.enrolledCount >= 0 && (
          <span className="bg-[#FFF9C4] text-[#827717] px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide uppercase">
            Bestseller
          </span>
        )}
        <span className="text-[12px] text-gray-500 font-medium">
          Updated {formattedDate}
        </span>
      </div>

      {/* Meta details */}
      <div className="flex flex-wrap gap-2 text-[12px] text-[#5C5C5C] mb-4">
        {course.duration ? (
          <span>{course.duration}</span>
        ) : (
          <span>Mentor-Led Sessions</span>
        )}
        <span>•</span>
        <span className="capitalize">{course.mode || "Online"}</span>
        <span>•</span>
        <span>All Levels</span>
      </div>

      {/* Description */}
      <p className="text-[13px] leading-[18px] text-[#5C5C5C] mb-4 line-clamp-3">
        {course.description ||
          "Connect one-on-one with verified expert educators to accelerate your academic journey, clear assignments, and secure your results."}
      </p>

      {/* Learning Outcomes */}
      <div className="mb-5">
        <h4 className="font-semibold text-[13px] text-[#021165] mb-2">
          What you'll get:
        </h4>
        <ul className="space-y-2">
          {benefits.slice(0, 3).map((benefit, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[12px] leading-[16px] text-gray-600">
              <Check className="w-4 h-4 text-[#042BFD] flex-shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Educator Details */}
      {course.educator && (
        <div className="flex items-center gap-3 border-t border-gray-100 pt-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#042BFD] to-[#8b5cf6] flex items-center justify-center text-white font-bold text-sm">
            {course.educator.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#021165]">
              {course.educator}
            </p>
            {course.educatorQualification && (
              <p className="text-[11px] text-gray-500">
                {course.educatorQualification}
              </p>
            )}
            {course.educatorRating && (
              <div className="flex items-center gap-1 mt-0.5">
                <Star className="w-3.5 h-3.5 fill-[#E2E7FF] text-[#042BFD]" />
                <span className="text-[11px] font-semibold text-[#042BFD]">
                  {course.educatorRating} Instructor Rating
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        {inCart ? (
          <Link href="/cart" className="w-full">
            <Button variant="secondary" className="!h-[42px] text-[13px]">
              Go to Cart
            </Button>
          </Link>
        ) : (
          <Button
            onClick={() => addToCart(course)}
            variant="primary"
            className="w-full !h-[42px] text-[13px]"
          >
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
}
