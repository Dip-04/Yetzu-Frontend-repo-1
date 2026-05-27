"use client";

import React from "react";
import { Trophy, Medal, Award, BookOpen, ScrollText, Star } from "lucide-react";

const awards = [
  {
    icon: Trophy,
    title: "World's Youngest Scientist in Medicine",
    org: "High Range Book of World Records, Assam Book of Records, World Record Certification Agency, and Assist World Records, 2019",
    description:
      "At 22, Dr. Yethindra Vityala achieved what many scientists strive for, publishing path-breaking peer-reviewed medical research papers and earning the title of the world's Youngest Scientist in Medicine. Each world record organization assessed and certified his work, marking it as exceptional.",
  },
  {
    icon: Medal,
    title: "Fastest Research Study Accomplished in the World",
    org: "High Range Book of World Records, 2020",
    description:
      "In 2020, Dr. Yethindra Vityala set a world record for the fastest research study, marking a milestone in his medical-science career. Despite the rapid pace, the study met stringent standards, demonstrating that swift execution and academic integrity can coexist and enhance each other when managed effectively.",
  },
  {
    icon: BookOpen,
    title: "First person in the world to complete 20 medical courses at 10 universities in 9 days",
    org: "World Record Certification Agency, 2019",
    description:
      "In 2019, Dr. Yethindra Vityala completed 20 medical courses at 10 universities in 9 days. This challenging endeavor requires intense focus and understanding to meet formal academic standards.",
  },
  {
    icon: Award,
    title: "Youngest person to write a trilingual book",
    org: "World Record Certification Agency, 2019",
    description:
      'In 2019, Dr. Yethindra Vityala received a world record as the youngest person to write a trilingual book, "Essentials of Hematology", in three languages: English, Hindi, and Russian. Writing a medical book in three languages at a young age is an extraordinary achievement.',
  },
  {
    icon: ScrollText,
    title: "Most Medical Related Certificates Received in 9 Days",
    org: "World Record Certification Agency, 2019",
    description:
      "In 2019, Dr. Yethindra Vityala set a world record by obtaining 51 medical-related certificates in 9 days. These certificates were obtained from various universities, organizations, and educational platforms, reflecting consistent academic performance across disciplines in a short period.",
  },
];

export default function AwardsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-amber-100 mb-4 md:mb-6">
            <Trophy className="w-8 h-8 md:w-10 md:h-10 text-amber-600" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">Awards & Recognition</h1>
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
            A collection of world records and honors recognizing contributions to medical science and research.
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {awards.map((award, index) => {
            const Icon = award.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl border border-gray-100 p-5 md:p-8 hover:shadow-lg hover:border-amber-200 transition-all duration-300"
              >
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="shrink-0 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-amber-50 group-hover:bg-amber-100 transition-colors">
                    <Icon className="w-7 h-7 md:w-8 md:h-8 text-amber-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 leading-snug mb-1.5">
                      {award.title}
                    </h2>
                    <p className="text-xs md:text-sm font-medium text-amber-600 mb-3 md:mb-4">
                      {award.org}
                    </p>
                    <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-400">
            <Star className="w-4 h-4" />
            <span>Continuously striving for excellence in medical research and education</span>
          </div>
        </div>
      </div>
    </div>
  );
}
