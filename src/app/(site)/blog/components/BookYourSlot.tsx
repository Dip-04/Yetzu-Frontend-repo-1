"use client";

export default function BookYourSlot() {
  return (
    <section className="w-full bg-gradient-to-b from-white via-[#E2E7FF] to-white px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] py-12 md:py-16">
      <div className="w-full max-w-[1224px] mx-auto">
        <div className="bg-gradient-to-br from-[#E6EAFF] to-[#F5F7FF] rounded-[28px] px-8 md:px-16 py-12 md:py-16 text-center shadow-lg">
          {/* Heading */}
          <h2 className="font-inter font-semibold text-[28px] md:text-[38px] lg:text-[46px] leading-[1.2] tracking-[-0.04em] text-[#252525] mb-4">
            <span className="text-[#042BFD]">Book</span> Your Slot Today
          </h2>

          {/* Subtitle */}
          <p className="text-[#7C7C7C] font-[SF Pro] text-[14px] md:text-[16px] leading-[150%] tracking-[-0.03em] max-w-2xl mx-auto mb-8">
            Join a Thriving Community Dedicated to Academic Excellence Supported
            by Cutting-Edge Technology and Expert
          </p>

          {/* Button */}
          <button className="px-8 py-3.5 bg-[#042BFD] text-white rounded-[12px] hover:bg-[#0325D7] transition-all duration-300 font-[SF Pro] text-[16px] md:text-[18px] font-medium shadow-md hover:shadow-lg">
            Get Invested In Your Academic Success
          </button>
        </div>
      </div>
    </section>
  );
}
