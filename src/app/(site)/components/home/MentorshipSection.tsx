"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";

interface MentorshipCard {
  title: string;
  desc: string;
  bgColor: string;
  iconBg: string;
  titleColor: string;
  descColor: string;
}

interface MentorshipSectionProps {
  heading?: string;
  subtext?: string;
  ctaLabel?: string;
  cards?: MentorshipCard[];
}

export default function MentorshipSection({
  heading = "1:1 mentorship that makes research feel possible",
  subtext = "Book dedicated time with a verified mentor to clarify your topic, structure your project, and move confidently toward publication.",
  ctaLabel = "Explore 1:1 mentorship sessions",
  cards = [
    {
      title: "Clarity on your path",
      desc: "Define your goals, choose the right project, and understand exactly what to do next.",
      bgColor: "bg-[#E6EAFF]",
      iconBg: "bg-[#9BAAFE]",
      titleColor: "text-[#252525]",
      descColor: "text-[#252525]",
    },
    {
      title: "Line-by-line feedback",
      desc: "Get detailed comments on your drafts, analyses, and structure not vague suggestions.",
      bgColor: "bg-[#506BFE]",
      iconBg: "bg-[#E6EAFF]",
      titleColor: "text-white",
      descColor: "text-white",
    },
    {
      title: "Study-friendly scheduling",
      desc: "Use flexible scheduling and rescheduling to fit mentorship around your workload.",
      bgColor: "bg-[#E6EAFF]",
      iconBg: "bg-[#9BAAFE]",
      titleColor: "text-[#252525]",
      descColor: "text-[#252525]",
    },
    {
      title: "From doubt to readiness",
      desc: "Walk away from each session with concrete tasks, timelines, and measurable progress.",
      bgColor: "bg-[#506BFE]",
      iconBg: "bg-[#E6EAFF]",
      titleColor: "text-white",
      descColor: "text-white",
    },
  ],
}: MentorshipSectionProps) {
  return (
    <section className="flex flex-col justify-center items-center min-h-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] gap-6 sm:gap-8 md:gap-10 lg:gap-12 bg-white w-full py-12 md:py-14 lg:py-16">
      <div className="flex flex-col justify-center items-start gap-6 md:gap-8 w-full max-w-[1224px]">
        {/* Header & Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-4 md:gap-6">
          <h2 className="font-inter font-medium text-[26px] sm:text-[32px] md:text-[40px] lg:text-[46px] leading-[100%] tracking-[-0.06em] text-[#021165] max-w-full md:max-w-[658px] capitalize">
            {heading}
          </h2>

          <Button
            variant="primary"
            className="!w-fit px-8 !h-[48px] whitespace-nowrap"
          >
            {ctaLabel}
          </Button>
        </div>

        {/* Subtext */}
        <p className="font-sfpro font-normal text-[16px] md:text-[18px] leading-[150%] md:leading-[21px] tracking-[-0.03em] text-[#252525] w-full max-w-full md:max-w-[860px]">
          {subtext}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 w-full max-w-[1224px]">
        {cards.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col justify-between items-start p-3 md:p-6 gap-3 md:gap-5 w-full min-h-[180px] md:min-h-[288px] ${item.bgColor} shadow-[0px_16px_32px_-12px_rgba(31,30,130,0.1)] rounded-[16px]`}
          >
            {/* Icon */}
            <div
              className={`flex flex-row items-center justify-center p-[10px] md:p-[16px] gap-[24px] w-[36px] h-[36px] md:w-[52px] md:h-[52px] ${item.iconBg} rounded-full flex-shrink-0`}
            >
              <Image
                src="/images/Icon.png"
                alt="Feature Icon"
                width={20}
                height={20}
                className="w-[16px] h-[16px] md:w-[20px] md:h-[20px]"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col items-start gap-[4px] md:gap-[8px] w-full">
              <h3
                className={`font-inter font-medium text-[15px] md:text-[22px] leading-[1.2] md:leading-[27px] tracking-[-0.06em] ${item.titleColor}`}
              >
                {item.title}
              </h3>
              <p
                className={`font-sfpro font-normal text-[11px] md:text-[16px] leading-[1.3] md:leading-[19px] tracking-[-0.03em] ${item.descColor} line-clamp-3`}
              >
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
