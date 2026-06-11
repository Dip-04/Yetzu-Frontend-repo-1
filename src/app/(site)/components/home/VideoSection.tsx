interface VideoSectionProps {
  heading?: string;
  youtubeEmbedUrl?: string;
}

export default function VideoSection({
  heading = "A platform built by mentors who've walked your path",
  youtubeEmbedUrl = "https://www.youtube.com/embed/VCPGMjCW0is?rel=0&modestbranding=1",
}: VideoSectionProps) {
  return (
    <section className="w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] flex flex-col items-center bg-white py-12 md:py-14 lg:py-16">
      <div className="w-full max-w-[1224px] flex flex-col items-center gap-4 sm:gap-6 md:gap-10 lg:gap-12">
        <h2 className="font-inter font-medium text-[26px] sm:text-[32px] md:text-[40px] lg:text-[46px] text-[#021165] text-center leading-[100%] tracking-[-0.06em] capitalize">
          {heading}
        </h2>

        <div
          className="w-full rounded-xl lg:rounded-2xl overflow-hidden shadow-none relative"
          style={{
            aspectRatio: "16/9",
            borderRadius: "20px",
            maxHeight: "calc(100vh - 200px)",
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
      </div>
    </section>
  );
}
