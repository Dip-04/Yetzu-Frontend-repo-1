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
  const finalHeadingMobile = headingMobile && headingMobile[0] && headingMobile[1]
    ? headingMobile
    : ["Your Ultimate Academic", "Mentorship & Learning Ecosystem"];

  const finalHeadingDesktop = headingDesktop && headingDesktop[0] && headingDesktop[1]
    ? headingDesktop
    : ["Your Ultimate Academic", "Mentorship & Learning Ecosystem"];

  return (
    <section className="relative text-center min-h-auto md:min-h-[calc(100vh-80px)] flex flex-col justify-center px-8 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] overflow-hidden bg-gradient-to-b from-[#F8FAFF] to-white py-[52px] md:py-6">
      {/* Background Gradient Behind Hero Image */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFFFFF_0%,#E2E7FF_50.01%,#FFFFFF_100%)] z-0"></div>

      {/* Avatars + Student count */}
      <div className="flex justify-center items-center gap-3 mb-[32px] md:mb-3 relative z-10 flex-wrap">
        <div className="flex -space-x-3">
          {studentAvatars.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`Student ${i + 1}`}
              width={36}
              height={36}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-[#E6EAFF]"
            />
          ))}
        </div>
        <p className="text-[18px] md:text-base text-[#021165] font-sfpro font-normal leading-[21px] tracking-[-0.03em]">
          {studentCount}
        </p>
      </div>

      {/* Mobile H1 */}
      <h1
        className="md:hidden font-inter font-medium 
        text-[18px] min-[360px]:text-[20px] min-[375px]:text-[22px] min-[415px]:text-[25px] sm:text-[32px]
        leading-[1.2] tracking-[-0.06em] text-[#252525] 
        max-w-full mx-auto mb-2 relative z-20 capitalize"
      >
        {finalHeadingMobile.map((line, i) => (
          <span key={i} className={`block whitespace-nowrap${i >= 1 ? ' text-[#042BFD]' : ''}`}>
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
        md:max-w-[1150px] mx-auto mb-4 md:mb-6 relative z-20"
      >
        {finalHeadingDesktop.map((line, i) => (
          <span key={i} className={`block${i >= 1 ? ' text-[#042BFD]' : ''}`}>
            {line}
          </span>
        ))}
      </h1>

      {/* Subheading */}
      <p className="text-[#252525] max-w-full md:max-w-3xl mx-auto text-[16px] leading-[19px] tracking-[-0.03em] font-sfpro font-normal relative z-20 mb-[24px] md:mb-6">
        {subheading}
      </p>

      {/* Hero Image */}
      <div className="flex justify-center relative z-20 mb-[24px] md:mb-2">
        <Image
          src="/three-header-image.png"
          alt="Mentors"
          width={1100}
          height={600}
          className="w-[95%] sm:w-[90%] md:w-[950px] lg:w-[1100px] object-contain md:scale-105 max-h-[220px] md:max-h-none"
        />
      </div>

      {/* Stats Section */}
      <div
        className="bg-[#252525] text-white rounded-[16px] md:rounded-[20px] py-4 px-3 sm:px-8 md:p-[42px] w-full max-w-[1224px] mx-auto shadow-none relative z-30 -mt-[70px] md:-mt-32 lg:-mt-40"
      >
        {/* Mobile: 2x2 Grid */}
        <div className="grid grid-cols-2 gap-4 md:hidden">
          {kpis.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-1 bg-white rounded-[16px] shadow-md py-3 px-2 min-h-[107px] h-auto"
            >
              <h3 className="font-inter font-bold text-[26px] leading-[32px] text-center text-[#021165] w-full">
                {item.num}
              </h3>
              <p className="font-sfpro font-normal text-[14px] leading-[18px] text-center tracking-[-0.03em] text-[#252525] w-full line-clamp-2">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop: Horizontal Row */}
        <div className="hidden md:flex flex-row flex-nowrap gap-[24px]">
          {kpis.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-[8px] flex-1 h-[164px] bg-white rounded-[16px] shadow-md transition-transform p-[24px]"
            >
              <h3 className="font-inter font-medium text-[56px] leading-[68px] text-center tracking-[-0.02em] text-[#021165]">
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
