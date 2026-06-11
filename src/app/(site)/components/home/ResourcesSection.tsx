"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";

interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  avatar: string;
  author: string;
  date: string;
}

interface ResourcesSectionProps {
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  featured?: BlogPost & { tag: string };
  blogs?: BlogPost[];
}

export default function ResourcesSection({
  heading = "Resources",
  subheading = "In-depth guides, checklists, and explanations on research, publication readiness, and academic careers so you learn the Yetzu way, even before you enroll.",
  ctaLabel = "Explore research guides & blogs",
  featured = {
    tag: "Our Latest",
    title:
      "Lorem ipsum, can be used for free any where for anything. It is effective tool so",
    excerpt:
      "Lorem ipsum, can be used for free any where for anything. It is an effective tool to solve our text-related problems...",
    image: "/images/blog.png",
    avatar: "/images/Avatar (1).png",
    author: "John Doe",
    date: "Saturday 9:00PM",
  },
  blogs = [
    {
      title: "Lorem ipsum, can be used for free any where",
      excerpt:
        "Lorem ipsum, can be used for free any where for anything. It is an effective tool to solve our text-related problems...",
      image: "/images/blog2.png",
      avatar: "/images/Avatar (1).png",
      author: "John Doe",
      date: "Saturday 9:00PM",
    },
    {
      title: "Lorem ipsum, can be used for free any where",
      excerpt:
        "Lorem ipsum, can be used for free any where for anything. It is an effective tool to solve our text-related problems...",
      image: "/images/blog2.png",
      avatar: "/images/Avatar (1).png",
      author: "John Doe",
      date: "Saturday 9:00PM",
    },
    {
      title: "Lorem ipsum, can be used for free any where",
      excerpt:
        "Lorem ipsum, can be used for free any where for anything. It is an effective tool to solve our text-related problems...",
      image: "/images/blog2.png",
      avatar: "/images/Avatar (1).png",
      author: "John Doe",
      date: "Saturday 9:00PM",
    },
  ],
}: ResourcesSectionProps) {
  return (
    <section className="bg-gradient-to-b from-white via-[#E2E7FF] to-white py-[60px] md:py-[80px] px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px]">
      <div className="w-full max-w-[1224px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full mb-[40px] md:mb-[52px] gap-4 md:gap-6">
          <div className="max-w-full md:max-w-[658px]">
            <h2 className="font-inter font-medium text-[26px] sm:text-[32px] md:text-[40px] lg:text-[46px] leading-[100%] tracking-[-0.06em] text-[#021165] capitalize">
              {heading}
            </h2>
            <p className="mt-4 text-[#252525] text-[14px] md:text-base font-[SF Pro] max-w-full md:max-w-2xl">
              {subheading}
            </p>
          </div>
          <Button variant="primary" className="!w-fit px-8 !h-[48px] whitespace-nowrap">
            {ctaLabel}
          </Button>
        </div>

        <div className="bg-white rounded-[20px] shadow-none overflow-hidden mb-[40px] md:mb-[52px] flex flex-col md:flex-row justify-between p-[16px] md:p-[19px] gap-4 md:gap-6 hover:shadow-xl transition-shadow">
          <div className="w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-between">
            <div>
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full mb-3 md:mb-4">
                {featured.tag}
              </span>
              <h3 className="font-[Inter] font-medium text-[18px] md:text-[22px] leading-[120%] lg:leading-[100%] tracking-[-0.06em] text-[#252525] mb-2 md:mb-3">
                {featured.title}
              </h3>
              <p className="font-[SF Pro] font-normal text-[13px] md:text-[14px] leading-[150%] text-[#252525CC]">
                {featured.excerpt}
              </p>
            </div>

            <div className="flex items-end gap-3 mt-6 md:mt-8">
              <Image
                src={featured.avatar}
                alt={featured.author}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-[#252525]">{featured.author}</p>
                <p className="text-xs text-gray-500">{featured.date}</p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 min-h-[200px] md:min-h-0">
              <Image
                src={featured.image}
                alt="Featured Resource"
                width={600}
                height={400}
                className="w-full h-full object-cover rounded-lg"
              />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] md:gap-[24px]">
          {blogs.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-[20px] shadow-none overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-40 md:h-48 overflow-hidden relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 md:p-6">
                <h4 className="font-[Inter] font-medium text-[18px] md:text-[22px] leading-[120%] lg:leading-[100%] tracking-[-0.06em] text-[#252525] mb-2">
                  {item.title}
                </h4>
                <p className="font-[SF Pro] text-[13px] md:text-[14px] font-normal text-[#252525CC] mb-3 md:mb-4 line-clamp-3">
                  {item.excerpt}
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    src={item.avatar}
                    alt={item.author}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
<div className="w-full md:w-3/4">
                    <p className="text-sm font-medium text-[#252525]">
                      {item.author}
                    </p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
