"use client";

import ContactForm from "./components/ContactForm";
import OurOffices from "./components/OurOffices";
import ResourceCards from "./components/ResourceCards";
import PageFAQSection from "@/components/shared/PageFAQSection";
import BookSlotSection from "./components/BookSlotSection";

export default function ContactPage() {
  return (
    <>
      <ContactForm />
      <OurOffices />
      <ResourceCards />
      <PageFAQSection pageKey="contact" />
      <BookSlotSection />
    </>
  );
}
