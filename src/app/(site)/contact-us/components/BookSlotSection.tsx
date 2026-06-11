"use client";

import Button from "@/components/ui/Button";

export default function BookSlotSection() {
  return (
    <section className="relative w-full py-12 md:py-[94px] px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] flex justify-center items-center overflow-hidden bg-white">
      {/* Decorative blurred ellipse */}
      <div className="absolute pointer-events-none select-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[896px] h-[896px] blur-[50px] bg-[radial-gradient(circle,#E6EAFF_0%,transparent_70%)] opacity-60" />

      <div className="relative z-10 w-full max-w-[1224px] mx-auto">
        <div className="relative overflow-hidden flex flex-col justify-center items-center gap-12 min-h-[572px] w-full p-8 md:p-16 rounded-[24px] bg-[radial-gradient(95.98%_95.98%_at_50%_50%,#FFFFFF_0%,#F2F4FF_100%)] shadow-[0_16px_40px_-8px_rgba(31,30,130,0.16)]">

          {/* Concentric arches with glowing 3D spheres background - Desktop */}
          <svg
            className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1224 572"
            preserveAspectRatio="xMidYMax slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="arch-sphere-grad-desktop" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#F2F5FF" />
                <stop offset="80%" stopColor="#DEE6FF" />
                <stop offset="100%" stopColor="#C5D2FF" />
              </radialGradient>
              <filter id="arch-sphere-shadow-desktop" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="1" dy="3" stdDeviation="2" floodColor="#0B0A3A" floodOpacity="0.12" />
              </filter>
            </defs>

            {/* Concentric arches */}
            <circle cx="612" cy="572" r="320" stroke="#042BFD" strokeWidth="1" fill="none" strokeOpacity="0.06" />
            <circle cx="612" cy="572" r="440" stroke="#042BFD" strokeWidth="1" fill="none" strokeOpacity="0.06" />
            <circle cx="612" cy="572" r="560" stroke="#042BFD" strokeWidth="1" fill="none" strokeOpacity="0.06" />

            {/* Glowing spheres sitting precisely on the arches */}
            {/* On Arch 1 (R=320) */}
            <circle cx="360" cy="375" r="5.5" fill="url(#arch-sphere-grad-desktop)" filter="url(#arch-sphere-shadow-desktop)" />
            <circle cx="880" cy="397" r="5" fill="url(#arch-sphere-grad-desktop)" filter="url(#arch-sphere-shadow-desktop)" />

            {/* On Arch 2 (R=440) */}
            <circle cx="570" cy="134" r="8" fill="url(#arch-sphere-grad-desktop)" filter="url(#arch-sphere-shadow-desktop)" />
            <circle cx="280" cy="283" r="6" fill="url(#arch-sphere-grad-desktop)" filter="url(#arch-sphere-shadow-desktop)" />
            <circle cx="920" cy="258" r="5" fill="url(#arch-sphere-grad-desktop)" filter="url(#arch-sphere-shadow-desktop)" />

            {/* On Arch 3 (R=560) */}
            <circle cx="220" cy="172" r="5.5" fill="url(#arch-sphere-grad-desktop)" filter="url(#arch-sphere-shadow-desktop)" />
            <circle cx="1050" cy="223" r="7" fill="url(#arch-sphere-grad-desktop)" filter="url(#arch-sphere-shadow-desktop)" />
          </svg>

          {/* Concentric arches with glowing 3D spheres background - Mobile */}
          <svg
            className="block md:hidden absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 360 572"
            preserveAspectRatio="xMidYMax slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="arch-sphere-grad-mobile" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#F2F5FF" />
                <stop offset="80%" stopColor="#DEE6FF" />
                <stop offset="100%" stopColor="#C5D2FF" />
              </radialGradient>
              <filter id="arch-sphere-shadow-mobile" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="1" dy="3" stdDeviation="2" floodColor="#0B0A3A" floodOpacity="0.12" />
              </filter>
            </defs>

            {/* Concentric arches */}
            <circle cx="180" cy="572" r="160" stroke="#042BFD" strokeWidth="1" fill="none" strokeOpacity="0.06" />
            <circle cx="180" cy="572" r="240" stroke="#042BFD" strokeWidth="1" fill="none" strokeOpacity="0.06" />
            <circle cx="180" cy="572" r="320" stroke="#042BFD" strokeWidth="1" fill="none" strokeOpacity="0.06" />
            <circle cx="180" cy="572" r="400" stroke="#042BFD" strokeWidth="1" fill="none" strokeOpacity="0.06" />

            {/* Glowing spheres sitting precisely on the arches */}
            {/* On Arch 1 (R=160) */}
            <circle cx="220" cy="417" r="4" fill="url(#arch-sphere-grad-mobile)" filter="url(#arch-sphere-shadow-mobile)" />

            {/* On Arch 2 (R=240) */}
            <circle cx="100" cy="346" r="5" fill="url(#arch-sphere-grad-mobile)" filter="url(#arch-sphere-shadow-mobile)" />
            <circle cx="260" cy="346" r="5" fill="url(#arch-sphere-grad-mobile)" filter="url(#arch-sphere-shadow-mobile)" />

            {/* On Arch 3 (R=320) */}
            <circle cx="160" cy="253" r="5.5" fill="url(#arch-sphere-grad-mobile)" filter="url(#arch-sphere-shadow-mobile)" />

            {/* On Arch 4 (R=400) */}
            <circle cx="280" cy="185" r="6.5" fill="url(#arch-sphere-grad-mobile)" filter="url(#arch-sphere-shadow-mobile)" />
          </svg>

          <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-[440px]">
            <div className="flex flex-col justify-center items-center gap-3 w-full">
              <h2 className="font-inter font-medium text-[32px] sm:text-[40px] md:text-[46px] leading-[1.2] tracking-[-0.06em] capitalize text-center">
                <span className="text-[#042BFD]">Book</span>{" "}
                <span className="text-[#252525]">Your Slot</span>{" "}
                <span className="text-[#042BFD]">Today</span>
              </h2>

              <p className="font-sfpro font-normal text-[14px] md:text-[16px] leading-[19px] tracking-[-0.03em] text-center text-[#252525] max-w-[440px]">
                Join a Thriving Community Dedicated to Academic Excellence Supported
                by Cutting-Edge Technology and Expert Mentorship.
              </p>
            </div>

            <Button
              variant="primary"
              className="!w-full max-w-[401px] !h-[52px] text-[18px] leading-[21px] tracking-[-0.03em]"
            >
              Get Invested in Your Academic Success
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
