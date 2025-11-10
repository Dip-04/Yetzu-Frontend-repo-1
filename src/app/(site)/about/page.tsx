"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  const [expandedCard, setExpandedCard] = useState<number | null>(0);

  const educators = [
    {
      name: "John Doe",
      expertise: "Expertise in Cardiology",
      degree: "MBBS",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      name: "John Doe",
      expertise: "Expertise in Cardiology",
      degree: "MBBS",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      name: "John Doe",
      expertise: "Expertise in Cardiology",
      degree: "MBBS",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      name: "John Doe",
      expertise: "Expertise in Cardiology",
      degree: "MBBS",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      name: "John Doe",
      expertise: "Expertise in Cardiology",
      degree: "MBBS",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      name: "John Doe",
      expertise: "Expertise in Cardiology",
      degree: "MBBS",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  // hero images (use encoded names for files with spaces)
  const heroImages = [
    "/Images/Hero Section.png",
    "/Images/Hero Section.png",
    "/Images/Hero Section.png",
    "/Images/Hero Section.png",
    "/Images/Hero Section.png",
    "/Images/Hero Section.png",
  ];

  return (
    <>
      <Navbar />
      {/* === SECTION 1: HERO === */}
      <section
        className="relative w-full bg-white overflow-hidden"
        style={{
          minHeight: "calc(100vh - 68px)",
        }}
      >
        {/* Main Content Container */}
        <div className="w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-14 lg:py-16">
          {/* Headings and Buttons Container */}
          <div className="w-full max-w-[884px] mx-auto mb-6 sm:mb-8 lg:mb-10">
            {/* Headings Section */}
            <div className="flex flex-col items-center gap-3 sm:gap-4 mb-6 sm:mb-7 lg:mb-8">
              <h1
                className="font-semibold text-center w-full"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "clamp(32px, 5vw, 68px)",
                  lineHeight: "clamp(40px, 6vw, 84px)",
                  letterSpacing: "-0.04em",
                  color: "#000000",
                }}
              >
                Meet the <span style={{ color: "#042BFD" }}>Brains</span> Behind
                Yetzu
              </h1>

              <p
                className="text-center w-full max-w-[560px] mx-auto px-4"
                style={{
                  fontFamily:
                    "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(14px, 2vw, 18px)",
                  lineHeight: "clamp(18px, 2.5vw, 21px)",
                  letterSpacing: "-0.03em",
                  color: "#000000",
                }}
              >
                Our approach is simple — partner with passionate people, chase
                excellence, and make learning unforgettable.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-row items-center justify-center gap-2 sm:gap-[18px] flex-wrap">
              <button
                className="flex-1 sm:flex-none transition-all hover:bg-gray-50"
                style={{
                  minWidth: "auto",
                  height: "44px",
                  padding: "10px 20px",
                  background: "#FFFFFF",
                  border: "2px solid #000000",
                  boxShadow: "0px 2px 4px rgba(31, 30, 130, 0.04)",
                  borderRadius: "12px",
                  fontFamily:
                    "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(14px, 2vw, 18px)",
                  lineHeight: "21px",
                  letterSpacing: "-0.03em",
                  color: "#021165",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Get in Touch
              </button>

              <button
                className="flex-1 sm:flex-none transition-all hover:opacity-90"
                style={{
                  minWidth: "auto",
                  height: "44px",
                  padding: "10px 20px",
                  background: "#042BFD",
                  boxShadow: "0px 2px 4px rgba(31, 30, 130, 0.04)",
                  borderRadius: "12px",
                  border: "none",
                  fontFamily:
                    "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(14px, 2vw, 18px)",
                  lineHeight: "21px",
                  letterSpacing: "-0.03em",
                  color: "#FFFFFF",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Join Us
              </button>
            </div>
          </div>

          {/* Cards Section */}
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-7">
              {heroImages.map((img, index) => {
                const isBlue = index === 1 || index === 3 || index === 5;
                const isHidden = index > 1; // Hide cards 3-6 on mobile (only show first 2)

                return (
                  <div
                    key={index}
                    className={`relative flex flex-col justify-end overflow-hidden ${
                      isHidden ? "hidden sm:hidden lg:flex" : ""
                    }`}
                    style={{
                      aspectRatio: "208 / 268.34",
                      width: "100%",
                      minHeight: "200px",
                      maxHeight: "400px",
                      boxShadow:
                        "0px 11.3584px 22.7167px -8.51877px rgba(31, 30, 130, 0.1)",
                    }}
                  >
                    {/* Image with gradient overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(180deg, rgba(0, 0, 0, 0.048) 0%, rgba(0, 0, 0, 0.1464) 36.07%, rgba(0, 0, 0, 0.24) 91.36%), url('${img}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />

                    {/* Info Card */}
                    <div
                      className="relative z-10 flex flex-row justify-center items-center translate-y-[-20px]" // moved slightly up
                      style={{
                        width: "100%",
                        minHeight: "44px",
                        padding: "10px 8px", // slight increase for breathing space
                        background: isBlue ? "#042BFD" : "#FFFFFF",
                      }}
                    >
                      <div className="flex flex-col justify-center items-center gap-[4px]">
                        <p
                          className="whitespace-nowrap"
                          style={{
                            fontFamily:
                              "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                            fontWeight: 700,
                            fontSize: "clamp(10px, 1.2vw, 12.78px)",
                            lineHeight: "clamp(12px, 1.4vw, 15px)",
                            letterSpacing: "-0.03em",
                            color: isBlue ? "#FFFFFF" : "#021165",
                          }}
                        >
                          Dr. Yetinder
                        </p>
                        <p
                          className="whitespace-nowrap"
                          style={{
                            fontFamily:
                              "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                            fontWeight: 400,
                            fontSize: "clamp(9px, 1.1vw, 11.36px)",
                            lineHeight: "clamp(11px, 1.3vw, 14px)",
                            letterSpacing: "-0.03em",
                            color: isBlue ? "#FFFFFF" : "#021165",
                          }}
                        >
                          Expertise in subject
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION 2: FOUNDER STORY === */}
      <section className="w-full flex justify-center px-4 sm:px-6 md:px-12 lg:px-[108px] py-12 md:py-14 lg:py-16">
        <div className="max-w-[1440px] w-full mx-auto text-center lg:text-left">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="w-full lg:w-[46%] flex flex-col gap-6 lg:gap-8">
              {/* Header */}
              <div className="flex flex-col gap-4">
                <p
                  className="text-base sm:text-lg font-normal tracking-[-0.03em] text-[#252525]"
                  style={{
                    fontFamily:
                      "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  }}
                >
                  Founder story
                </p>

                <h2
                  className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] leading-[40px] sm:leading-[48px] md:leading-[60px] lg:leading-[68px] font-semibold tracking-[-0.02em] text-[#252525]"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Founder Name
                </h2>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <p
                    className="text-sm sm:text-base font-normal leading-relaxed tracking-[-0.03em] text-[#252525]"
                    style={{
                      fontFamily:
                        "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                    }}
                  >
                    Lorem ipsum is a free text to use whenever you want content
                    for your design. It is a perfect placeholder text.
                  </p>

                  <p
                    className="text-sm sm:text-base font-normal leading-relaxed tracking-[-0.03em] text-[#252525]"
                    style={{
                      fontFamily:
                        "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                    }}
                  >
                    Lorem ipsum is a free text to use whenever you want content
                    for your design. It is a perfect placeholder text.
                  </p>
                </div>

                {/* Achievement Box */}
                <div className="w-full sm:max-w-[350px] mx-auto lg:mx-0 p-4 bg-[#EDEDED] rounded-xl">
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M18 7L9 16L5 12"
                            stroke="#042BFD"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span
                          className="text-sm sm:text-base font-normal tracking-[-0.03em] text-[#021165]"
                          style={{
                            fontFamily:
                              "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                          }}
                        >
                          Achievements
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="w-full lg:w-[46%]">
              <div className="w-full aspect-[598/415] overflow-hidden rounded-[20px] bg-[#EDEDED]">
                <img
                  src="/Images/Hero Section.png"
                  alt="Founder"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION 3: MEET THE MINDS === */}
      {/* Team Section */}
      <div className="w-full bg-gradient-to-b from-white via-[#E2E7FF] to-white">
        {/* First Section - Takes full viewport with navbar consideration */}
        <section className="px-4 sm:px-6 md:px-12 lg:px-[108px] py-12 md:py-14 lg:py-16 flex flex-col">
          <div className="max-w-[1440px] mx-auto w-full flex flex-col h-full">
            {/* Header and Button */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-start gap-4 lg:gap-12 mb-6 lg:mb-12 w-full">
              <div className="w-full lg:w-[60%] flex flex-col gap-3 lg:gap-4">
                <h2
                  className="text-[#021165] text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-semibold leading-[1.2] lg:leading-[68px] tracking-[-0.02em]"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Meet the Minds Behind Your Success
                </h2>
                <p
                  className="text-[#252525] text-base sm:text-[18px] font-normal leading-relaxed lg:leading-[21px] tracking-[-0.03em]"
                  style={{
                    fontFamily:
                      "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  }}
                >
                  Our team of expert educators, doctors, and mentors bring years
                  of clinical experience and teaching excellence to help you
                  master every concept with clarity.
                </p>
              </div>

              <button className="flex items-center justify-center px-[16px] h-[40px] bg-[#294BFD] border-2 border-[#0325D7] rounded-[8px] transition-all hover:opacity-90 flex-shrink-0 mt-4 lg:mt-0">
                <span
                  className="text-[16px] font-normal leading-[19px] tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-r from-[#F9F9F9] via-[#F0F0FC] to-[#F9F9F9]"
                  style={{
                    fontFamily:
                      "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  }}
                >
                  View All
                </span>
              </button>
            </div>

            {/* First Row of Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-[18.44px] flex-1">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="relative w-full max-w-[395.706px] h-[380px] sm:h-[420px] lg:h-[501.123px] rounded-[15.734px] overflow-hidden shadow-[0_12.587px_25.174px_-9.44px_rgba(31,30,130,0.1)] transition-all duration-500 ease-in-out cursor-pointer group mx-auto"
                >
                  {/* Background Image with gradient overlay - always visible */}
                  <div
                    className="absolute inset-0 transition-all duration-500 ease-in-out group-hover:opacity-0"
                    style={{
                      background: `linear-gradient(180deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.29) 36.07%, rgba(0, 0, 0, 0.48) 91.36%), url('/Images/Hero Section.png')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />

                  {/* Blue overlay - fully opaque on hover */}
                  <div className="absolute inset-0 bg-[#294BFD] transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100" />

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-between p-[22px] lg:p-[31px]">
                    {/* Badge */}
                    <div className="flex">
                      <div className="bg-[#294BFD] transition-all duration-500 rounded-[7px] px-[10px] py-[10px] inline-flex items-center justify-center">
                        <span
                          className="text-white text-[16px] lg:text-[18px] font-normal leading-[21px] tracking-[-0.03em]"
                          style={{
                            fontFamily:
                              "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                          }}
                        >
                          MBBS
                        </span>
                      </div>
                    </div>

                    {/* Bottom Content */}
                    <div className="flex flex-col gap-[18.881px]">
                      {/* Name and Expertise */}
                      <div className="flex flex-col gap-[1.57px]">
                        <h3
                          className="text-white text-[22px] lg:text-[26px] font-semibold leading-[1.2] lg:leading-[31px] tracking-[-0.05em]"
                          style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                        >
                          John Doe
                        </h3>
                        <p
                          className="text-white text-base lg:text-[18px] font-normal leading-[21px] tracking-[-0.03em]"
                          style={{
                            fontFamily:
                              "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                          }}
                        >
                          Expertise in Cardiology
                        </p>
                      </div>

                      {/* Description - only visible on hover with subtle fade */}
                      <p
                        className="text-white text-sm lg:text-[16px] font-normal leading-[1.3] lg:leading-[19px] tracking-[-0.03em] max-h-0 opacity-0 group-hover:max-h-[200px] group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden"
                        style={{
                          fontFamily:
                            "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                        }}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Second Section - Second Row of Cards */}
        <section className="px-4 sm:px-6 md:px-12 lg:px-[108px] pb-12 md:pb-14 lg:pb-16 pt-6 flex items-center">
          <div className="max-w-[1440px] mx-auto w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-[18.44px]">
              {[4, 5, 6].map((index) => (
                <div
                  key={index}
                  className="relative w-full max-w-[395.706px] h-[380px] sm:h-[420px] lg:h-[501.123px] rounded-[15.734px] overflow-hidden shadow-[0_12.587px_25.174px_-9.44px_rgba(31,30,130,0.1)] transition-all duration-500 ease-in-out cursor-pointer group mx-auto"
                >
                  {/* Background Image with gradient overlay - always visible */}
                  <div
                    className="absolute inset-0 transition-all duration-500 ease-in-out group-hover:opacity-0"
                    style={{
                      background: `linear-gradient(180deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.29) 36.07%, rgba(0, 0, 0, 0.48) 91.36%), url('/Images/Hero Section.png')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />

                  {/* Blue overlay - fully opaque on hover */}
                  <div className="absolute inset-0 bg-[#294BFD] transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100" />

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-between p-[22px] lg:p-[31px]">
                    {/* Badge */}
                    <div className="flex">
                      <div className="bg-[#294BFD] transition-all duration-500 rounded-[7px] px-[10px] py-[10px] inline-flex items-center justify-center">
                        <span
                          className="text-white text-[16px] lg:text-[18px] font-normal leading-[21px] tracking-[-0.03em]"
                          style={{
                            fontFamily:
                              "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                          }}
                        >
                          MBBS
                        </span>
                      </div>
                    </div>

                    {/* Bottom Content */}
                    <div className="flex flex-col gap-[18.881px]">
                      {/* Name and Expertise */}
                      <div className="flex flex-col gap-[1.57px]">
                        <h3
                          className="text-white text-[22px] lg:text-[26px] font-semibold leading-[1.2] lg:leading-[31px] tracking-[-0.05em]"
                          style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                        >
                          John Doe
                        </h3>
                        <p
                          className="text-white text-base lg:text-[18px] font-normal leading-[21px] tracking-[-0.03em]"
                          style={{
                            fontFamily:
                              "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                          }}
                        >
                          Expertise in Cardiology
                        </p>
                      </div>

                      {/* Description - only visible on hover with subtle fade */}
                      <p
                        className="text-white text-sm lg:text-[16px] font-normal leading-[1.3] lg:leading-[19px] tracking-[-0.03em] max-h-0 opacity-0 group-hover:max-h-[200px] group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden"
                        style={{
                          fontFamily:
                            "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                        }}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      {/* === SECTION 4: MISSION & VISION === */}
      <section className="w-full px-4 sm:px-6 md:px-12 lg:px-[108px] py-12 md:py-14 lg:py-16">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="flex flex-col gap-12 lg:gap-14">
            {/* Title */}
            <h2 className="text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.2] lg:leading-[68px] font-semibold tracking-[-0.02em] text-[#021165] text-center">
              Mission & Vision
            </h2>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              {/* Left Image */}
              <div className="w-full h-[300px] sm:h-[380px] lg:h-[455px] rounded-[20px] overflow-hidden shadow-[0_16px_32px_-12px_rgba(31,30,130,0.1)]">
                <img
                  src="/Images/Hero Section.png"
                  alt="Mission left"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Middle Cards */}
              <div className="flex flex-col justify-center gap-6">
                {/* Mission Card */}
                <div className="flex flex-col justify-center items-center p-8 pb-6 bg-[#E6EAFF] rounded-[20px] shadow-[0_16px_32px_-12px_rgba(31,30,130,0.1)]">
                  <div className="flex gap-6 w-full">
                    <div className="w-[52px] h-[52px] flex items-center justify-center flex-shrink-0 bg-white rounded-full">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2L2 7L12 12L22 7L12 2Z"
                          stroke="#252525"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2 17L12 22L22 17"
                          stroke="#252525"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2 12L12 17L22 12"
                          stroke="#252525"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-[32px] leading-[39px] font-bold text-[#252525]">
                        Mission
                      </h3>
                      <p className="text-base leading-[19px] tracking-[-0.03em] text-[#252525] font-normal">
                        Loren ipsum is a free text to use whenever you want
                        content for your deogn it , is is a perferct placeholder
                        text for you
                      </p>
                    </div>
                  </div>
                </div>

                {/* Vision Card */}
                <div className="flex flex-col justify-center items-center p-8 pb-6 bg-[#E6EAFF] rounded-[20px] shadow-[0_16px_32px_-12px_rgba(31,30,130,0.1)]">
                  <div className="flex gap-6 w-full">
                    <div className="w-[52px] h-[52px] flex items-center justify-center flex-shrink-0 bg-white rounded-full">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                          stroke="#252525"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="#252525"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-[32px] leading-[39px] font-bold text-[#252525]">
                        Vision
                      </h3>
                      <p className="text-base leading-[19px] tracking-[-0.03em] text-[#252525] font-normal">
                        Loren ipsum is a free text to use whenever you want
                        content for your deogn it , is is a perferct placeholder
                        text for you
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="w-full h-[300px] sm:h-[380px] lg:h-[455px] rounded-[20px] overflow-hidden shadow-[0_16px_32px_-12px_rgba(31,30,130,0.1)]">
                <img
                  src="/Images/Hero Section.png"
                  alt="Mission right"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION 5: INITIATIVES === */}
      <section className="w-full px-4 sm:px-6 md:px-12 lg:px-[108px] py-12 md:py-14 lg:py-16">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="flex flex-col gap-12 lg:gap-14">
            {/* Header */}
            <div className="flex flex-col items-center gap-4 lg:gap-6">
              <h2 className="text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.2] lg:leading-[68px] font-semibold tracking-[-0.02em] text-[#021165] text-center">
                Initiatives
              </h2>
              <p className="text-base leading-[19px] tracking-[-0.03em] text-[#252525] text-center max-w-[500px]">
                Lorem ipsum is a free text to use whenever you want content for
                your design.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="flex flex-col sm:flex-row lg:flex-row items-stretch justify-center gap-4 lg:gap-4 mx-auto flex-wrap">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative flex flex-col justify-center items-center p-6 w-full sm:w-[calc(50%-8px)] lg:w-[280px] h-[320px] sm:h-[350px] lg:h-[376px] bg-[#E6EAFF] rounded-[16px] shadow-[0_16px_32px_-12px_rgba(31,30,130,0.1)] overflow-hidden"
                >
                  {/* Blue Gradient Background Blur */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[280px] h-[280px] bg-gradient-to-br from-blue-400/40 via-blue-500/30 to-blue-600/40 rounded-full blur-3xl opacity-60" />
                  </div>

                  {/* Text Content */}
                  <div className="relative z-10 flex flex-col items-center gap-2 text-center">
                    <p className="text-[14px] leading-[17px] text-[#404040]">
                      Year {i}
                    </p>
                    <h3 className="text-[26px] leading-[31px] font-semibold tracking-[-0.05em] text-[#252525]">
                      Lorem ipsum dolor
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION 6: PURPOSE & BELIEF === */}
      <section className="w-full px-4 sm:px-6 md:px-12 lg:px-[108px] py-12 md:py-14 lg:py-16">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="flex flex-col gap-10 lg:gap-12">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8">
              <div className="flex-1 flex flex-col gap-4 lg:gap-6">
                <h2 className="text-[32px] text-[#021165] sm:text-[40px] lg:text-5xl font-semibold mb-4">
                  Purpose & Belief
                </h2>
                <p className="text-sm sm:text-base max-w-md text-gray-600">
                  Lorem ipsum is a free text to use whenever you want content
                  for your design.
                </p>
              </div>

              <div className="flex flex-col gap-4 lg:gap-6">
                <div className="flex gap-3 lg:gap-4 items-start">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white flex items-center justify-center flex-shrink-0 shadow-sm rounded-full">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 2L2 7L12 12L22 7L12 2Z"
                        stroke="#042BFD"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold mb-2 text-[#021165]">
                      Our Purpose
                    </h3>
                    <p className="text-sm lg:text-base max-w-xs text-gray-600">
                      Lorem ipsum is a free text to use whenever you want
                      content for your design.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 lg:gap-4 items-start">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white flex items-center justify-center flex-shrink-0 shadow-sm rounded-full">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#042BFD"
                        strokeWidth="2"
                      />
                      <path d="M12 6v6l4 2" stroke="#042BFD" strokeWidth="2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold mb-2 text-[#021165]">
                      Core Belief
                    </h3>
                    <p className="text-sm lg:text-base max-w-xs text-gray-600">
                      Lorem ipsum is a free text to use whenever you want
                      content for your design.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-[250px] sm:h-[350px] lg:h-[400px] overflow-hidden rounded-2xl">
              <img
                src="/Images/Hero Section.png"
                alt="Purpose large"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION 7: OUR IMPACT === */}
      <section className="w-full px-4 sm:px-6 md:px-12 lg:px-[108px] py-12 md:py-14 lg:py-16 bg-[linear-gradient(180deg,_#FFFFFF_0%,_#E2E7FF_50.01%,_#FFFFFF_100%)]">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="flex flex-col gap-12 lg:gap-14">
            {/* Header */}
            <div className="flex flex-col items-center justify-center gap-4 lg:gap-6">
              <h2 className="text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.2] lg:leading-[68px] font-semibold tracking-[-0.02em] text-[#021165] text-center">
                Our Impact
              </h2>
              <p className="text-base leading-[19px] tracking-[-0.03em] text-[#252525] text-center max-w-[370px]">
                Loren ipsum is a free text to use whenever you want content for
                your deogn it , is is a perferct placeholder
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {/* Card 1 */}
              <div className="flex flex-col justify-end items-center p-6 lg:p-8 gap-4 lg:gap-6 w-full h-[250px] lg:h-[288px] bg-[#C4C4C4] rounded-[20px] shadow-[0_16px_32px_-12px_rgba(31,30,130,0.1)]">
                {/* Add your content here */}
                <div className="text-center"></div>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col justify-end items-center p-6 lg:p-8 gap-4 lg:gap-6 w-full h-[250px] lg:h-[288px] bg-[#C4C4C4] rounded-[20px] shadow-[0_16px_32px_-12px_rgba(31,30,130,0.1)]">
                {/* Add your content here */}
                <div className="text-center"></div>
              </div>

              {/* Card 3 */}
              <div className="flex flex-col justify-end items-center p-6 lg:p-8 gap-4 lg:gap-6 w-full h-[250px] lg:h-[288px] bg-[#C4C4C4] rounded-[20px] shadow-[0_16px_32px_-12px_rgba(31,30,130,0.1)]">
                {/* Add your content here */}
                <div className="text-center"></div>
              </div>

              {/* Card 4 */}
              <div className="flex flex-col justify-end items-center p-6 lg:p-8 gap-4 lg:gap-6 w-full h-[250px] lg:h-[288px] bg-[#C4C4C4] rounded-[20px] shadow-[0_16px_32px_-12px_rgba(31,30,130,0.1)]">
                {/* Add your content here */}
                <div className="text-center"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Leaders Section - Single Image + Text + Rounded Container */}
      <section className="py-12 md:py-14 lg:py-16 px-4 sm:px-6 md:px-12 lg:px-[108px] min-h-[calc(100vh-68px)] flex items-center justify-center bg-[linear-gradient(180deg,_#FFFFFF_0%,_#F8FAFF_40%,_#F5F8FF_60%,_#FFFFFF_100%)]">
        <div className="w-full max-w-[1440px] mx-auto rounded-3xl overflow-hidden shadow-lg relative">
          {/* Main Combined Image - 16:9 Aspect Ratio */}
          <div className="relative w-full aspect-[16/9] overflow-hidden max-h-[400px] lg:max-h-[500px]">
            <img
              src="/images/testimonals.png"
              alt="Trusted by Leaders from Diverse Educational Institutions and Industries"
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay for fog effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none"></div>
          </div>

          {/* Content: Headline + Subtext + Button - Overlapping the image */}
          <div className="relative -mt-8 sm:-mt-10 md:-mt-12 lg:-mt-16 pt-0 pb-4 px-4 sm:px-6 md:pb-6 md:px-8 lg:pb-8 lg:px-12 text-center bg-white">
            <h2 className="text-[18px] sm:text-[22px] md:text-[26px] lg:text-3xl font-bold text-gray-900 mb-1 md:mb-2 leading-tight">
              Trusted by <span className="text-blue-600">Leaders</span> From
              Diverse
              <br className="hidden md:block" />
              Educational{" "}
              <span className="text-blue-600">
                Institutions And Industries.
              </span>
            </h2>

            <p className="text-gray-600 text-[12px] md:text-sm lg:text-base max-w-full md:max-w-2xl mx-auto mb-4 md:mb-5 lg:mb-6 mt-2 md:mt-3">
              Join a Thriving Community Dedicated to Academic Excellence
              Supported by Cutting-Edge Technology and Expert Mentorship.
            </p>

            <button className="px-4 md:px-6 lg:px-8 py-2 md:py-2.5 lg:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium w-full sm:w-auto text-[12px] md:text-sm lg:text-base">
              Get Invested in Your Academic Success
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
