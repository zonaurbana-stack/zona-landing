"use client";

import { motion } from "framer-motion";
import { coverageLabels, coveragePoints } from "@/lib/coverage";

const labels = coverageLabels(coveragePoints);

export function LocationsMarquee() {
    return (
        <div className="relative overflow-hidden border-y border-white/5 py-5 bg-white/[0.01] backdrop-blur-sm">
            <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="flex w-max whitespace-nowrap"
            >
                {/* Dos copias iguales: al llegar a -50% el loop queda sin salto */}
                {[0, 1].map((copy) => (
                    <div key={copy} className="flex items-center gap-12 pr-12" aria-hidden={copy === 1}>
                        {labels.map((label, i) => (
                            <div key={label} className="flex items-center gap-12">
                                <span
                                    className={`text-2xl md:text-4xl font-black uppercase tracking-tighter ${
                                        i % 2 === 0 ? "text-white" : "text-white/30"
                                    }`}
                                >
                                    {label}
                                </span>
                                <div className={`w-2.5 h-2.5 rotate-45 ${i % 2 === 0 ? "bg-brand-blue" : "bg-white/20"}`} />
                            </div>
                        ))}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
