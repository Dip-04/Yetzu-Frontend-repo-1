"use client";

import Paragraph from "@/components/Typography/Paragraph";
import SubHeading from "@/components/Typography/SubHeading";
import Image from "next/image";
import Link from "next/link";

export default function PromoCards() {
    const cards = [
        {
            id: 1,
            theme: "light",
            title: "Loren ipsum is free course now",
            description: "Loren Ipsum meta description is display here, so you can lern and grwp with us , can lern and grwp with us",
        },
        {
            id: 2,
            theme: "dark",
            title: "Loren ipsum is free course now",
            description: "Loren Ipsum meta description is display here, so you can lern and grwp with us , can lern and grwp with us",
        },
        {
            id: 3,
            theme: "light",
            title: "Loren ipsum is free course now",
            description: "Loren Ipsum meta description is display here, so you can lern and grwp with us , can lern and grwp with us",
        },
    ];

    return (
        <section className="py-10 md:py-16 bg-white px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px]">
            <div className="w-full max-w-[1224px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card, idx) => (
                        <div
                            key={card.id}
                            className={`relative rounded-[32px] p-6 sm:p-8 md:p-10 h-[384px] flex flex-col justify-between overflow-hidden transition-transform hover:scale-[1.02] duration-300 ${card.theme === "dark"
                                ? "bg-[radial-gradient(circle_at_80%_80%,_#3B82F6_0%,_#042BFD_60%,_#01189C_100%)] text-white"
                                : "text-[#252525] shadow-[0_16px_32px_-12px_rgba(31,30,130,0.1)] bg-[radial-gradient(53.08%_53.08%_at_49.87%_46.92%,#FFFFFF_0%,#F2F4FF_100%)]"
                                }`}
                        >
                            {/* Spherical & concentric rings structure background */}
                            <svg 
                                className="absolute inset-0 w-full h-full pointer-events-none z-0" 
                                viewBox="0 0 392 452" 
                                preserveAspectRatio="xMaxYMax slice"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <defs>
                                    {/* 3D Sphere Gradients */}
                                    <radialGradient id={`sphere-grad-white-${idx}`} cx="30%" cy="30%" r="70%">
                                        <stop offset="0%" stopColor="#FFFFFF" />
                                        <stop offset="30%" stopColor="#FFFFFF" />
                                        <stop offset="70%" stopColor="#E2E8F0" />
                                        <stop offset="100%" stopColor="#94A3B8" />
                                    </radialGradient>
                                    
                                    {/* Shadow Filter for Spheres */}
                                    <filter id={`sphere-shadow-${idx}`} x="-50%" y="-50%" width="200%" height="200%">
                                        <feDropShadow 
                                            dx="1" 
                                            dy="3" 
                                            stdDeviation="2" 
                                            floodColor={card.theme === 'dark' ? '#00083A' : '#0B0A3A'} 
                                            floodOpacity={card.theme === 'dark' ? '0.3' : '0.15'} 
                                        />
                                    </filter>
                                </defs>

                                {/* Concentric Circles */}
                                {card.theme === 'dark' ? (
                                    <>
                                        <circle cx="300" cy="380" r="80" stroke="#FFFFFF" strokeWidth="1" fill="none" strokeOpacity="0.06" />
                                        <circle cx="300" cy="380" r="140" stroke="#FFFFFF" strokeWidth="1" fill="none" strokeOpacity="0.06" />
                                        <circle cx="300" cy="380" r="200" stroke="#FFFFFF" strokeWidth="1" fill="none" strokeOpacity="0.06" />
                                        <circle cx="300" cy="380" r="260" stroke="#FFFFFF" strokeWidth="1" fill="none" strokeOpacity="0.06" />
                                        <circle cx="300" cy="380" r="320" stroke="#FFFFFF" strokeWidth="1" fill="none" strokeOpacity="0.06" />
                                        <circle cx="300" cy="380" r="380" stroke="#FFFFFF" strokeWidth="1" fill="none" strokeOpacity="0.06" />

                                        {/* Floating Spheres (Pearls) with 3D Gradients and Shadows */}
                                        <circle cx="345" cy="410" r="6" fill={`url(#sphere-grad-white-${idx})`} filter={`url(#sphere-shadow-${idx})`} />
                                        <circle cx="150" cy="330" r="6.5" fill={`url(#sphere-grad-white-${idx})`} filter={`url(#sphere-shadow-${idx})`} />
                                        <circle cx="210" cy="420" r="3" fill={`url(#sphere-grad-white-${idx})`} filter={`url(#sphere-shadow-${idx})`} />
                                        <circle cx="245" cy="245" r="4.5" fill={`url(#sphere-grad-white-${idx})`} filter={`url(#sphere-shadow-${idx})`} />
                                        <circle cx="300" cy="190" r="3" fill={`url(#sphere-grad-white-${idx})`} filter={`url(#sphere-shadow-${idx})`} />
                                        <circle cx="275" cy="320" r="2" fill={`url(#sphere-grad-white-${idx})`} filter={`url(#sphere-shadow-${idx})`} />
                                    </>
                                ) : (
                                    <>
                                        <circle cx="300" cy="380" r="80" stroke="#042BFD" strokeWidth="1" fill="none" strokeOpacity="0.05" />
                                        <circle cx="300" cy="380" r="140" stroke="#042BFD" strokeWidth="1" fill="none" strokeOpacity="0.05" />
                                        <circle cx="300" cy="380" r="200" stroke="#042BFD" strokeWidth="1" fill="none" strokeOpacity="0.05" />
                                        <circle cx="300" cy="380" r="260" stroke="#042BFD" strokeWidth="1" fill="none" strokeOpacity="0.05" />
                                        <circle cx="300" cy="380" r="320" stroke="#042BFD" strokeWidth="1" fill="none" strokeOpacity="0.05" />
                                        <circle cx="300" cy="380" r="380" stroke="#042BFD" strokeWidth="1" fill="none" strokeOpacity="0.05" />
                                    </>
                                )}
                            </svg>

                            <div className="relative z-10 flex flex-col gap-4 sm:gap-6">
                                <div className="flex">
                                    <Image
                                        src={idx === 1 ? "/_2700988329728.svg" : "/images/Logo.png"}
                                        alt="Logo"
                                        width={140}
                                        height={32}
                                        className="h-8 w-auto object-contain animate-fade-in"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 sm:gap-3">
                                    <SubHeading 
                                        text={card.title} 
                                        level={3} 
                                        className={`font-semibold tracking-tight !mb-0 leading-[1.2] text-[20px] sm:text-[24px] md:text-[30px] ${card.theme === 'dark' ? 'text-white' : 'text-[#252525]'}`} 
                                    />
                                    <Paragraph 
                                        text={card.description} 
                                        className={`text-xs sm:text-sm md:text-base leading-relaxed max-w-[95%] ${card.theme === 'dark' ? 'text-white/80' : 'text-[#252525]/80'}`} 
                                    />
                                </div>
                            </div>

                            <div className="relative z-10 mt-auto">
                                <Link
                                    href="#"
                                    className={`text-base font-semibold hover:underline flex items-center gap-1 ${card.theme === 'dark' ? 'text-white' : 'text-[#042BFD]'}`}
                                >
                                    Learn more
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
