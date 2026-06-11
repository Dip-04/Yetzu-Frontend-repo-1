"use client";

import Image from "next/image";

interface HeroSectionProps {
  studentCount?: string;
  studentAvatars?: string[];
  headingMobile?: string[];
  headingDesktop?: string[];
  subheading?: string;
  heroImage?: string;
  kpis?: Array<{ num: string; label: string }>;
}

export default function HeroSection({
  studentCount = "150+ Students Enrolled",
  studentAvatars = ["/images/Avatar (1).png", "/images/Avatar (2).png", "/images/Avatar.png"],
  headingMobile = ["Your Ultimate Academic", "Mentorship & Learning Ecosystem"],
  headingDesktop = ["Your Ultimate Academic", "Mentorship & Learning Ecosystem"],
  subheading = "Unlock Your Potential with Personalized Mentorship, Milestone Based Assignments, and Expert Academic Support-All in One Intuitive Platform.",
  heroImage = "/images/Hero Section.png",
  kpis = [
    { num: "200+", label: "Community Members" },
    { num: "24+", label: "Institutes Affiliated" },
    { num: "30k+", label: "Mentorship Hours" },
    { num: "100+", label: "Students Mentored" },
  ],
}: HeroSectionProps) {
  return (
    <section className="relative text-center min-h-auto md:min-h-[calc(100vh-80px)] flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] overflow-hidden bg-gradient-to-b from-[#F8FAFF] to-white py-8 sm:py-12 md:py-6">
      {/* Background Gradient Behind Hero Image */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFFFFF_0%,#E2E7FF_50.01%,#FFFFFF_100%)] z-0"></div>

      {/* Avatars + Student count */}
      <div className="flex justify-center items-center gap-2 mb-6 md:mb-3 relative z-10 flex-wrap">
        <div className="flex -space-x-2">
          {studentAvatars.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`Student ${i + 1}`}
              width={32}
              height={32}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white"
            />
          ))}
        </div>
        <p className="text-[12px] md:text-base text-[#021165] font-sfpro font-normal">
          {studentCount}
        </p>
      </div>

      {/* Mobile H1 */}
      <h1
        className="md:hidden font-inter font-semibold 
        text-[18px] sm:text-[28px] 
        leading-[24px] sm:leading-[36px] 
        tracking-tight text-[#252525] 
        max-w-[95%] mx-auto mb-4 md:mb-6 relative z-20"
      >
        {headingMobile.map((line, i) => (
          <span key={i} className={`block${i >= 1 ? ' text-[#042BFD]' : ''}`}>
            {line}
          </span>
        ))}
      </h1>

      {/* Desktop H1 */}
      <h1
        className="hidden md:block font-inter font-semibold 
        md:text-[52px] lg:text-[68px] 
        md:leading-[60px] lg:leading-[84px]
        tracking-tight text-[#252525] 
        md:max-w-5xl mx-auto mb-4 md:mb-6 relative z-20"
      >
        {headingDesktop.map((line, i) => (
          <span key={i} className={`block${i >= 1 ? ' text-[#042BFD]' : ''}`}>
            {line}
          </span>
        ))}
      </h1>

      {/* Subheading */}
      <p className="text-[#252525] max-w-[95%] md:max-w-3xl mx-auto text-[13px] sm:text-[16px] md:text-[18px] leading-[1.4] font-sfpro font-normal relative z-20 mb-8 md:mb-6">
        {subheading}
      </p>

      {/* Hero Image */}
      <div className="flex justify-center relative z-20 mb-6 md:mb-8">
        <Image
          src={heroImage}
          alt="Mentors"
          width={1100}
          height={600}
          className="w-[95%] sm:w-[90%] md:w-[950px] lg:w-[1100px] object-contain md:scale-105 max-h-[220px] md:max-h-none"
        />
      </div>

      {/* Stats Section */}
      <div
        className="bg-[#252525] text-white rounded-[16px] py-4 px-3 sm:px-8 w-full max-w-[1224px] mx-auto shadow-none relative z-30 md:-mt-32 lg:-mt-40"
        style={{ marginTop: "-70px" }}
      >
        {/* Mobile: 2x2 Grid */}
        <div className="grid grid-cols-2 gap-2 md:hidden">
          {kpis.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-1 bg-white rounded-[12px] shadow-md p-2 min-h-[85px]"
            >
              <h3 className="font-inter font-bold text-[20px] leading-tight text-center text-[#021165] w-full">
                {item.num}
              </h3>
              <p className="font-sfpro font-normal text-[10px] leading-tight text-center tracking-tight text-[#252525] w-full line-clamp-2">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop: Horizontal Scroll */}
        <div className="hidden md:flex flex-nowrap justify-center gap-6 overflow-x-auto">
          {kpis.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-2 w-[267px] min-w-[267px] flex-shrink-0 h-[164px] bg-white rounded-[16px] shadow-md transition-transform p-[24px]"
            >
              <h3 className="font-inter font-semibold text-[56px] leading-[68px] text-center tracking-[-0.02em] text-[#021165]">
                {item.num}
              </h3>
              <p className="font-inter font-semibold text-[22px] leading-[27px] text-center tracking-[-0.06em] text-[#252525]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
