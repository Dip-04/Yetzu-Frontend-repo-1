"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Pradhyumn Dhondi",
    role: "1:1 Mentorship Session",
    avatar: "https://api.dicebear.com/8.x/adventurer/svg?seed=Pradhyumn",
    text: "Lorem ipsum is a good way to start your design. The mentors are extremely helpful and provide step-by-step guidance on all my assignments."
  },
  {
    name: "Sohab alam",
    role: "1:1 Mentorship Session, w/Certification",
    avatar: "https://api.dicebear.com/8.x/adventurer/svg?seed=Sohab",
    text: "I loved the cohort structure and the templates provided. Getting feedback from verified experts helped me secure a high grade on my final project."
  },
  {
    name: "Sohab alam",
    role: "Neurosurgeon",
    avatar: "https://api.dicebear.com/8.x/adventurer/svg?seed=Neuro",
    text: "The curriculum is well-structured and maps directly to real-world applications. Highly recommend to anyone looking to improve their research writing."
  },
  {
    name: "Abhiram Yetzu",
    role: "Academic Writing",
    avatar: "https://api.dicebear.com/8.x/adventurer/svg?seed=Abhiram",
    text: "The templates and guidelines were lifesavers. I went from struggling with essay structure to writing with confidence. Excellent clinic sessions!"
  },
  {
    name: "Mercedes G.",
    role: "Graduate Student",
    avatar: "https://api.dicebear.com/8.x/adventurer/svg?seed=Mercedes",
    text: "Fabulous mentoring! Having a dedicated expert to review my revision plan and outline step-by-step saved me weeks of trial and error."
  },
  {
    name: "Karan Johar",
    role: "Cohort Student",
    avatar: "https://api.dicebear.com/8.x/adventurer/svg?seed=Karan",
    text: "Very structured learning path. The webinars are highly interactive, and the feedback loop is incredibly fast and detailed."
  },
  {
    name: "Sania Mirza",
    role: "1:1 Clinic Session",
    avatar: "https://api.dicebear.com/8.x/adventurer/svg?seed=Sania",
    text: "Superb support on file submissions and grading. The pass/fail criteria are transparent, and the revision instructions are clear."
  },
  {
    name: "Rajesh K.",
    role: "Research Student",
    avatar: "https://api.dicebear.com/8.x/adventurer/svg?seed=Rajesh",
    text: "The proposal writing bootcamp was worth every rupee. Learning how to formulate research methodologies and paper outlines was a game-changer."
  }
];

export default function CustomTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, testimonials.length - 1));
  };

  return (
    <section className="w-full bg-white py-16 md:py-24 overflow-hidden flex flex-col items-center">
      {/* Title */}
      <h2 className="text-[46px] font-semibold text-[#021165] leading-[55px] tracking-tight text-center mb-12 font-sans">
        Testimonials
      </h2>

      {/* Edge-to-Edge Slider Container */}
      <div className="w-screen overflow-x-auto no-scrollbar py-6 flex">
        <div
          className="flex transition-transform duration-500 ease-out gap-[32px] pl-4 sm:pl-6 md:pl-10 lg:pl-16 pr-16"
          style={{ transform: `translateX(-${currentIndex * 418.83}px)` }}
        >
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="w-[280px] sm:w-[320px] md:w-[386.83px] h-[262px] flex-shrink-0 bg-[#E6EAFF] rounded-[20px] p-4 sm:p-[24px] gap-[12px] flex flex-col justify-between shadow-[0_16px_40px_-8px_rgba(31,30,130,0.16)]"
            >
              {/* Text part */}
              <div className="flex flex-col items-start gap-[12px] w-full md:w-[338.83px]">
                {/* Quote Icon */}
                <svg className="w-[25.12px] h-[23.39px] text-[#9BAAFE] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[17px] sm:leading-[19px] md:leading-[21px] tracking-[-0.03em] text-[#252525] line-clamp-4 text-left font-sans">
                  {item.text}
                </p>
              </div>

              {/* User part */}
              <div className="flex flex-row items-center gap-[12px] sm:gap-[16px] w-full md:w-[338.83px] mt-auto">
                <div className="w-[40px] h-[40px] sm:w-[52px] sm:h-[52px] rounded-full overflow-hidden bg-[#E6EAFF] flex-shrink-0">
                  <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center items-start gap-[2px] h-[40px] min-w-0">
                  <h4 className="text-[14px] sm:text-[18px] font-normal leading-[17px] sm:leading-[21px] tracking-[-0.03em] text-[#252525] font-sans truncate w-full">
                    {item.name}
                  </h4>
                  <p className="text-[12px] sm:text-[14px] font-normal leading-[15px] sm:leading-[17px] text-[#252525] opacity-75 font-sans truncate w-full">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls (Right aligned below the carousel) */}
      <div className="w-full max-w-[1600px] px-4 sm:px-6 md:px-10 lg:px-16 flex justify-end gap-4 mt-8">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-200 select-none cursor-pointer ${
            currentIndex === 0
              ? "border-gray-200 text-gray-350 cursor-not-allowed opacity-50"
              : "border-[#042BFD] text-[#042BFD] hover:bg-[#042BFD] hover:text-white"
          }`}
          aria-label="Previous Testimonial"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex >= testimonials.length - 1}
          className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-200 select-none cursor-pointer ${
            currentIndex >= testimonials.length - 1
              ? "border-gray-200 text-gray-350 cursor-not-allowed opacity-50"
              : "border-[#042BFD] text-[#042BFD] hover:bg-[#042BFD] hover:text-white"
          }`}
          aria-label="Next Testimonial"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
