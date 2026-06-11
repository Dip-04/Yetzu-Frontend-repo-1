"use client";
import Image from "next/image";

interface AvatarStackProps {
    count: number;      // total number of enrolled users
    size?: number;      // px size, default 40
    style?: string;     // dicebear sprite style
    borderColor?: string;
    overlapClass?: string;
    bgClass?: string;
    textClass?: string;
}

export default function AvatarStack({
    count,
    size = 40,
    style = "adventurer", // you can use: bottts, thumbs, identicon, shapes, etc.
    borderColor = "border-[#E6EAFF]",
    overlapClass = "-space-x-3",
    bgClass = "bg-white",
    textClass = "text-[14px] font-normal leading-[17px] text-black font-sans",
}: AvatarStackProps) {
    count = count > 0 ? count : 5;
    const maxVisible = 4;
    const visible = Math.min(count, maxVisible);
    const remaining = count - visible;
    const secondSeed = Math.floor(Date.now() / 1000);

    const avatars = Array.from({ length: visible }).map((_, i) => {
        const seed = `s-${secondSeed}-${i}`;
        return `https://api.dicebear.com/8.x/${style}/svg?seed=${seed}`;
    });


    return (
        <div className={`flex ${overlapClass} items-center`}>
            {avatars.map((src, idx) => (
                <div
                    key={idx}
                    className={`rounded-full border-2 ${borderColor} overflow-hidden bg-gray-200`}
                    style={{ width: size, height: size }}
                >
                    <Image
                        src={src}
                        alt="User Avatar"
                        width={size}
                        height={size}
                    />
                </div>
            ))}

            {remaining > 0 && (
                <div
                    className={`rounded-full border-2 ${borderColor} ${bgClass} flex items-center justify-center ${textClass}`}
                    style={{ width: size, height: size }}
                >
                    +{remaining}
                </div>
            )}
        </div>
    );
}
