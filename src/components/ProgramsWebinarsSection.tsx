"use client";

import Image from "next/image";
import Button from "./ui/Button";

interface ProgramsWebinarsSectionProps {
  heading?: string;
  subheading?: string;
}

export default function ProgramsWebinarsSection({
  heading = "What's happening next on Yetzu",
  subheading = "Explore upcoming webinars and programs led by experienced educators with dates, times, and mentors clearly listed so you can plan with confidence.",
}: ProgramsWebinarsSectionProps) {
  return (
    <div className="w-full bg-white px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] py-12 md:py-14 lg:py-16 flex flex-col items-center">
      {/* Header Section */}
      <div className="text-center mb-[32px] md:mb-[52px]">
        <h2 className="font-inter font-medium text-[26px] sm:text-[32px] md:text-[40px] lg:text-[46px] leading-[100%] tracking-[-0.06em] text-[#021165] mb-[16px] capitalize">
          {heading}
        </h2>
        <p
          className="font-['SF_Pro'] text-[14px] md:text-[16px] leading-[1.4] md:leading-[19px] tracking-[-0.03em] text-[#252525] max-w-[670px] mx-auto"
          style={{ fontFamily: "var(--font-sfpro)" }}
        >
          {subheading}
        </p>
      </div>

      {/* Main Content Grid - 1220x790 */}
      <div className="w-full max-w-[1224px] min-h-auto lg:h-[790px] flex flex-col lg:flex-row gap-[24px]">
        {/* Left Large Card - 598x790 */}
        <div className="relative w-full lg:w-[598px] min-h-[460px] md:min-h-[500px] lg:h-[790px] rounded-[20px] overflow-hidden flex-shrink-0">
          {/* Background Image */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900">
            <Image
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=800&fit=crop"
              alt="Presenter at webinar"
              fill
              className="object-cover"
            />
          </div>

          {/* Date Badge */}
          <div
            className="absolute top-[24px] left-1/2 -translate-x-1/2 bg-white rounded-full px-[16px] py-[8px] md:px-[20px] md:py-[10px] shadow-none w-[90%] md:w-auto text-center"
            style={{ fontFamily: "var(--font-sfpro)" }}
          >
            <span className="text-[#252525] text-[13px] md:text-[16px] leading-tight md:leading-[19px] tracking-[-0.03em]">
              19 Oct, 2024 Sat 7:30pm - 10:00pm
            </span>
          </div>

          {/* Bottom Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-[20px] md:p-[32px] bg-gradient-to-t from-black/95 via-black/80 to-transparent">
            {/* Profile and Time */}
            <div className="flex items-center gap-[10px] md:gap-[12px] mb-[12px] md:mb-[16px]">
              <div className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] rounded-full bg-gray-400 overflow-hidden flex-shrink-0">
                <Image
                  src="https://i.pravatar.cc/150?img=12"
                  alt="John Doe"
                  width={42}
                  height={42}
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-[6px] md:gap-[8px]">
                <span
                  className="text-white text-[14px] md:text-[18px] leading-tight tracking-[-0.03em]"
                  style={{ fontFamily: "var(--font-sfpro)" }}
                >
                  John Doe
                </span>
                <span className="text-white text-[14px] md:text-[18px]">•</span>
                <span
                  className="text-white text-[14px] md:text-[18px] leading-tight tracking-[-0.03em]"
                  style={{ fontFamily: "var(--font-sfpro)" }}
                >
                  Saturday 9:00PM
                </span>
              </div>
            </div>

            {/* Title */}
            <h3
              className="text-white font-inter font-semibold text-[24px] md:text-[38px] leading-tight md:leading-[46px] tracking-[-0.007em] mb-[16px] md:mb-[24px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Loren Ipsum is here to display the title
            </h3>

            {/* Button */}
            <Button
              variant="primary"
              className="w-full !h-[48px] md:!h-[52px] !rounded-[12px] text-[16px] md:text-[18px]"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Right Grid - 598x790 */}
        <div className="w-full lg:w-[598px] min-h-auto grid grid-cols-1 sm:grid-cols-2 gap-[24px]">
          {/* Top Left Card - 287x383 */}
          <div className="relative w-full h-[320px] md:h-[383px] rounded-[16px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800">
              <Image
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=400&fit=crop"
                alt="Webinar"
                fill
                className="object-cover"
              />
            </div>

            {/* Coming Soon Badge */}
            <div
              className="absolute top-[16px] right-[16px] bg-white rounded-full px-[12px] py-[6px] md:px-[16px] md:py-[8px]"
              style={{ fontFamily: "var(--font-sfpro)" }}
            >
              <span className="text-[#021165] text-[11px] md:text-[12px] leading-[14px]">
                Coming soon
              </span>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 p-[16px] md:p-[20px] bg-gradient-to-t from-black/90 to-transparent">
              <h4
                className="text-white font-inter font-bold text-[24px] md:text-[32px] leading-tight mb-[8px]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Title
              </h4>
              <div className="flex items-center gap-[8px] mb-[8px]">
                <div className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full bg-gray-400 overflow-hidden flex-shrink-0">
                  <Image
                    src="https://i.pravatar.cc/150?img=15"
                    alt="John Doe"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <span
                  className="text-white text-[14px] md:text-[18px] leading-tight tracking-[-0.03em]"
                  style={{ fontFamily: "var(--font-sfpro)" }}
                >
                  John Doe
                </span>
              </div>
              <span
                className="text-white text-[14px] md:text-[18px] leading-tight tracking-[-0.03em] block"
                style={{ fontFamily: "var(--font-sfpro)" }}
              >
                Saturday 9:00PM
              </span>
            </div>
          </div>
          {/* Top Right Card - 287x383 */}
          <div className="relative w-full h-[320px] md:h-[383px] rounded-[16px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-700 to-amber-900">
              <Image
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&h=400&fit=crop"
                alt="Webinar"
                fill
                className="object-cover"
              />
            </div>

            {/* Coming Soon Badge */}
            <div
              className="absolute top-[16px] right-[16px] bg-white rounded-full px-[12px] py-[6px] md:px-[16px] md:py-[8px]"
              style={{ fontFamily: "var(--font-sfpro)" }}
            >
              <span className="text-[#021165] text-[11px] md:text-[12px] leading-[14px]">
                Coming soon
              </span>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 p-[16px] md:p-[20px] bg-gradient-to-t from-black/90 to-transparent">
              <h4
                className="text-white font-inter font-bold text-[24px] md:text-[32px] leading-tight mb-[8px]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Title
              </h4>
              <div className="flex items-center gap-[8px] mb-[8px]">
                <div className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full bg-gray-400 overflow-hidden flex-shrink-0">
                  <Image
                    src="https://i.pravatar.cc/150?img=20"
                    alt="John Doe"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <span
                  className="text-white text-[14px] md:text-[18px] leading-tight tracking-[-0.03em]"
                  style={{ fontFamily: "var(--font-sfpro)" }}
                >
                  John Doe
                </span>
              </div>
              <span
                className="text-white text-[14px] md:text-[18px] leading-tight tracking-[-0.03em] block"
                style={{ fontFamily: "var(--font-sfpro)" }}
              >
                Saturday 9:00PM
              </span>
            </div>
          </div>
          {/* Bottom Left Card - 287x383 */}
          <div className="relative w-full h-[320px] md:h-[383px] rounded-[16px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800">
              <Image
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=400&fit=crop"
                alt="Webinar"
                fill
                className="object-cover"
              />
            </div>

            {/* Coming Soon Badge */}
            <div
              className="absolute top-[16px] right-[16px] bg-white rounded-full px-[12px] py-[6px] md:px-[16px] md:py-[8px]"
              style={{ fontFamily: "var(--font-sfpro)" }}
            >
              <span className="text-[#021165] text-[11px] md:text-[12px] leading-[14px]">
                Coming soon
              </span>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 p-[16px] md:p-[20px] bg-gradient-to-t from-black/90 to-transparent">
              <h4
                className="text-white font-inter font-bold text-[24px] md:text-[32px] leading-tight mb-[8px]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Title
              </h4>
              <div className="flex items-center gap-[8px] mb-[8px]">
                <div className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full bg-gray-400 overflow-hidden flex-shrink-0">
                  <Image
                    src="https://i.pravatar.cc/150?img=25"
                    alt="John Doe"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <span
                  className="text-white text-[14px] md:text-[18px] leading-tight tracking-[-0.03em]"
                  style={{ fontFamily: "var(--font-sfpro)" }}
                >
                  John Doe
                </span>
              </div>
              <span
                className="text-white text-[14px] md:text-[18px] leading-tight tracking-[-0.03em] block"
                style={{ fontFamily: "var(--font-sfpro)" }}
              >
                Saturday 9:00PM
              </span>
            </div>
          </div>{" "}
          {/* Bottom Right Card - 287x383 */}
          <div className="relative w-full h-[320px] md:h-[383px] rounded-[16px] overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800">
              <Image
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&h=400&fit=crop"
                alt="Webinar"
                fill
                className="object-cover"
              />
            </div>

            {/* Coming Soon Badge */}
            <div
              className="absolute top-[16px] right-[16px] bg-white rounded-full px-[12px] py-[6px] md:px-[16px] md:py-[8px]"
              style={{ fontFamily: "var(--font-sfpro)" }}
            >
              <span className="text-[#021165] text-[11px] md:text-[12px] leading-[14px]">
                Coming soon
              </span>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 p-[16px] md:p-[20px] bg-gradient-to-t from-black/90 to-transparent">
              <h4
                className="text-white font-inter font-bold text-[24px] md:text-[32px] leading-tight mb-[8px]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Title
              </h4>
              <div className="flex items-center gap-[8px] mb-[8px]">
                <div className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full bg-gray-400 overflow-hidden flex-shrink-0">
                  <Image
                    src="https://i.pravatar.cc/150?img=30"
                    alt="John Doe"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <span
                  className="text-white text-[14px] md:text-[18px] leading-tight tracking-[-0.03em]"
                  style={{ fontFamily: "var(--font-sfpro)" }}
                >
                  John Doe
                </span>
              </div>
              <span
                className="text-white text-[14px] md:text-[18px] leading-tight tracking-[-0.03em] block"
                style={{ fontFamily: "var(--font-sfpro)" }}
              >
                Saturday 9:00PM
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
