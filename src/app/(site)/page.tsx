"use client";

import { useHomeContent } from "@/lib/cms/useCMS";
import HeroSection from "./components/home/HeroSection";
import VideoSection from "./components/home/VideoSection";
import WebinarsSection from "../../components/WebinarsSection";
import MentorshipSection from "./components/home/MentorshipSection";
import AssignmentSupportSection from "./components/home/AssignmentSupportSection";
import TestimonalsSection from "../../components/TestimonialsSection";
import JoinCommunity from "../../components/shared/JoinCommunity";
import ProgramsWebinarsSection from "../../components/ProgramsWebinarsSection";
import ResourcesSection from "./components/home/ResourcesSection";
import FAQSection from "../../components/shared/FAQSection";
import TrustedByLeaders from "../../components/shared/TrustedByLeaders";

export default function Home() {
  const { data } = useHomeContent();

  return (
    <>
      <HeroSection
        studentCount={data.hero.topMessage}
        studentAvatars={data.hero.avatars}
        headingMobile={[data.hero.blackheader, data.hero.blueheader]}
        headingDesktop={[data.hero.blackheader, data.hero.blueheader]}
        subheading={data.hero.subheading}
        heroImage={data.hero.heroImage}
        kpis={data.hero.stats}
      />
      <VideoSection
        heading={data.video.heading}
        youtubeEmbedUrl={data.video.youtubeEmbedUrl}
      />
      <WebinarsSection />
      <MentorshipSection
        heading={data.mentorship.heading}
        subtext={data.mentorship.subtext}
        ctaLabel={data.mentorship.buttonText}
        cards={data.mentorship.cards}
      />
      <AssignmentSupportSection
        heading={data.assignmentSupport.heading}
        ctaLabel={data.assignmentSupport.buttonText}
        cards={data.assignmentSupport.cards}
      />
      <TestimonalsSection
        badge={data.testimonials.tag}
        heading={data.testimonials.tagline}
        subheading={data.testimonials.subTagline}
        testimonials={data.testimonials.testimonials}
      />
      <JoinCommunity />
      <ProgramsWebinarsSection
        heading={data.programsWebinars.tagline}
        subheading={data.programsWebinars.heroTagline}
      />
      <ResourcesSection
        heading={data.resources.heading}
        subheading={data.resources.subheading}
        ctaLabel={data.resources.buttonText}
        featured={{ tag: "Our Latest", ...data.resources.featured }}
        blogs={data.resources.blogs}
      />
      <FAQSection
        badge={data.faq.tag}
        heading={data.faq.description}
        faqs={data.faq.faqs}
        ctaText={data.faq.ctaText}
        ctaLabel={data.faq.ctaLabel}
      />
      <TrustedByLeaders />
    </>
  );
}
