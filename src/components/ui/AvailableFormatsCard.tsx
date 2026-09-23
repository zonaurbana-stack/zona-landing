"use client";

import React from "react";
import { BillboardFormat } from "@/lib/formats";
import { getFormatIcon } from "@/components/ui/formatIcons";

interface AvailableFormatsCardProps {
    formats: BillboardFormat[];
}

export function AvailableFormatsCard({ formats }: AvailableFormatsCardProps) {
    if (!formats || formats.length === 0) return null;

    const totalCount = formats.reduce((sum, f) => sum + f.count, 0);

    return (
        <div className="flex flex-col bg-[#050505]/70 backdrop-blur-2xl border border-white/[0.06] rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.7)] relative overflow-hidden">
            {/* Subtle top glow */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
            
            <div className="flex justify-between items-start mb-5">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
                        <span className="text-[9px] uppercase tracking-[0.25em] text-white/50 font-semibold">
                            Red en vivo
                        </span>
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-white/30 font-medium ml-3.5">
                        Formatos Activos
                    </div>
                </div>
                <div className="text-3xl font-light text-white tracking-tighter leading-none">
                    {totalCount}
                </div>
            </div>

            <div className="space-y-3">
                {formats.map((item) => {
                    const IconComponent = getFormatIcon(item.type);

                    return (
                        <div
                            key={item.type}
                            className="flex items-center justify-between group cursor-default"
                        >
                            <div className="flex items-center gap-3">
                                <IconComponent 
                                    className="w-[15px] h-[15px] text-white/30 group-hover:text-brand-blue transition-colors duration-300" 
                                    strokeWidth={1.5} 
                                />
                                <span className="text-[11px] text-white/60 font-medium tracking-wide group-hover:text-white/90 transition-colors duration-300">
                                    {item.label}
                                </span>
                            </div>
                            <span className="text-[11px] font-semibold text-white/80">
                                {item.count}
                            </span>
                        </div>
                    );
                })}
            </div>
            
            {/* Ambient background effect */}
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
        </div>
    );
}
