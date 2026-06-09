interface VideoSectionProps {
  heading?: string;
  youtubeEmbedUrl?: string;
}

export default function VideoSection({
  heading = "A platform built by mentors who've walked your path",
  youtubeEmbedUrl = "https://www.youtube.com/embed/VCPGMjCW0is?rel=0&modestbranding=1",
}: VideoSectionProps) {
  return (
    <section
      className="w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-[108px] 
             flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-10 lg:gap-12 
             bg-white py-12 md:py-14 lg:py-16"
    >
      {/* Heading */}
      <h2 className="font-inter font-semibold text-[26px] sm:text-[32px] md:text-[40px] lg:text-[40px] text-[#021165] text-center leading-[1.2] px-4 tracking-[-0.7%]">
        {heading}
      </h2>

      {/* Video Wrapper */}
      <div
        className="w-full max-w-[1224px] rounded-xl lg:rounded-2xl overflow-hidden shadow-none relative"
        style={{
          // Responsive 16:9 aspect ratio — fallback-friendly
          aspectRatio: "16/9",
          borderRadius: "20px",
          maxHeight: "calc(100vh - 200px)", // avoid overflow on small screens
        }}
      >
        <iframe
          src="https://www.youtube.com/embed/VCPGMjCW0is?rel=0&modestbranding=1"
          title="Educational Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 w-full h-full"
        ></iframe>
      </div>
    </section>
  );
}
