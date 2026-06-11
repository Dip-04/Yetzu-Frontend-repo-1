"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface TopicItem {
    _id: string;
    title: string;
    desc: string;
}

interface CourseTopicsAccordionProps {
    items: TopicItem[];
    firstExpanded?: boolean;
}

export default function CourseTopicsAccordion({ items, firstExpanded = false }: CourseTopicsAccordionProps) {
    const [openId, setOpenId] = useState<string | null>(firstExpanded && items.length > 0 ? items[0]._id : null);

    const toggle = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="flex flex-col space-y-4">
            {items.map((item) => {
                const isOpen = openId === item._id;
                return (
                    <div
                        key={item._id}
                        className={`rounded-xl border border-[#EDF0F7] overflow-hidden transition-all duration-300 ${isOpen ? "bg-white shadow-sm" : "bg-[#F5F6FA]"}`}
                    >
                        <button
                            className="w-full flex justify-between items-center text-left px-6 py-5 text-gray-900 focus:outline-none cursor-pointer"
                            onClick={() => toggle(item._id)}
                        >
                            <span className="font-semibold text-base sm:text-lg text-[#252525]">{item.title}</span>
                            <ChevronDown
                                className={`w-5 h-5 text-[#042BFD] transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="px-6 pb-5 text-sm sm:text-base text-[#5C5C5C] leading-relaxed">
                                        {item.desc}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
