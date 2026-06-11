"use client";

import BlogHeroSection from "./components/BlogHeroSection";
import BlogCardsGrid from "./components/BlogCardsGrid";
import BookSlotSection from "@/app/(site)/contact-us/components/BookSlotSection";

export default function BlogPage() {
  return (
    <>
      <BlogHeroSection />
      <BlogCardsGrid />
      <BookSlotSection />
    </>
  );
}
